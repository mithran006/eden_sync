import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';

export interface WebSocketEvent<T = any> {
  type: string;
  payload: T;
  timestamp: string;
}

interface WebSocketContextType {
  isConnected: boolean;
  isConnecting: boolean;
  onlineCount: number;
  lastEvent: WebSocketEvent | null;
  send: (type: string, payload?: any) => void;
  subscribe: (eventType: string, callback: (payload: any) => void) => () => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(true);
  const [onlineCount, setOnlineCount] = useState<number>(1);
  const [lastEvent, setLastEvent] = useState<WebSocketEvent | null>(null);

  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef<number>(0);
  const listenersRef = useRef<Map<string, Set<(payload: any) => void>>>(new Map());
  const outgoingQueueRef = useRef<{ type: string; payload: any; timestamp: string }[]>([]);
  const isUnmountedRef = useRef<boolean>(false);

  const flushQueue = useCallback((ws: WebSocket) => {
    if (ws.readyState !== WebSocket.OPEN) return;
    while (outgoingQueueRef.current.length > 0) {
      const msg = outgoingQueueRef.current.shift();
      if (msg) {
        try {
          ws.send(JSON.stringify(msg));
        } catch (err) {
          console.warn('[WebSocket] Queue flush send failed, re-queuing:', err);
          outgoingQueueRef.current.unshift(msg);
          break;
        }
      }
    }
  }, []);

  const subscribe = useCallback((eventType: string, callback: (payload: any) => void) => {
    if (!listenersRef.current.has(eventType)) {
      listenersRef.current.set(eventType, new Set());
    }
    listenersRef.current.get(eventType)!.add(callback);

    return () => {
      const set = listenersRef.current.get(eventType);
      if (set) {
        set.delete(callback);
        if (set.size === 0) {
          listenersRef.current.delete(eventType);
        }
      }
    };
  }, []);

  const send = useCallback((type: string, payload: any = {}) => {
    const messageObj = { type, payload, timestamp: new Date().toISOString() };
    const socket = socketRef.current;

    if (socket && socket.readyState === WebSocket.OPEN) {
      try {
        socket.send(JSON.stringify(messageObj));
        return;
      } catch (err) {
        console.warn('[WebSocket] Send failed, buffering to queue:', err);
      }
    }

    // Buffer to outgoing queue (bounded to 100 items to prevent memory bloat)
    if (outgoingQueueRef.current.length < 100) {
      outgoingQueueRef.current.push(messageObj);
    } else {
      outgoingQueueRef.current.shift(); // Drop oldest message
      outgoingQueueRef.current.push(messageObj);
    }
  }, []);

  const connect = useCallback(() => {
    if (isUnmountedRef.current) return;
    if (socketRef.current && (socketRef.current.readyState === WebSocket.OPEN || socketRef.current.readyState === WebSocket.CONNECTING)) {
      return;
    }

    setIsConnecting(true);

    try {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const host = window.location.host;
      const wsUrl = `${protocol}//${host}/ws`;

      const ws = new WebSocket(wsUrl);
      socketRef.current = ws;

      ws.onopen = () => {
        if (isUnmountedRef.current) {
          ws.close();
          return;
        }
        setIsConnected(true);
        setIsConnecting(false);
        reconnectAttemptsRef.current = 0;
        console.log('[WebSocket] Connected to EdenSync Realtime Engine at', wsUrl);

        // Direct presence ping to notify server and get latest count
        try {
          ws.send(JSON.stringify({ type: 'presence:ping', payload: {}, timestamp: new Date().toISOString() }));
        } catch {
          // ignore
        }

        // Flush all queued messages sent while socket was connecting
        flushQueue(ws);
      };

      ws.onmessage = (event) => {
        if (isUnmountedRef.current) return;
        try {
          const data: WebSocketEvent = JSON.parse(event.data);
          setLastEvent(data);

          // Built-in system handling
          if (data.type === 'connected' && data.payload?.onlineCount) {
            setOnlineCount(data.payload.onlineCount);
          } else if (data.type === 'presence:count' && typeof data.payload?.onlineCount === 'number') {
            setOnlineCount(data.payload.onlineCount);
          }

          // Trigger specific listeners
          const handlers = listenersRef.current.get(data.type);
          if (handlers) {
            handlers.forEach((fn) => {
              try {
                fn(data.payload);
              } catch (handlerErr) {
                console.error(`[WebSocket] Error in handler for ${data.type}:`, handlerErr);
              }
            });
          }

          // Trigger wildcard listeners
          const wildcardHandlers = listenersRef.current.get('*');
          if (wildcardHandlers) {
            wildcardHandlers.forEach((fn) => {
              try {
                fn(data);
              } catch (wildcardErr) {
                console.error('[WebSocket] Error in wildcard handler:', wildcardErr);
              }
            });
          }
        } catch {
          // Non-JSON message, ignore
        }
      };

      ws.onerror = () => {
        // Will trigger onclose next
      };

      ws.onclose = () => {
        if (isUnmountedRef.current) return;
        setIsConnected(false);
        setIsConnecting(false);
        socketRef.current = null;

        // Exponential backoff reconnection with random jitter (prevents thundering herd with 1000 users)
        const jitter = Math.random() * 500;
        const delay = Math.min(1000 * Math.pow(1.3, reconnectAttemptsRef.current) + jitter, 10000);
        reconnectAttemptsRef.current += 1;

        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
        }

        reconnectTimeoutRef.current = setTimeout(() => {
          connect();
        }, delay);
      };
    } catch (err) {
      console.warn('[WebSocket] Init failed, retrying in 3s:', err);
      setIsConnecting(false);
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = setTimeout(() => connect(), 3000);
    }
  }, [flushQueue]);

  useEffect(() => {
    isUnmountedRef.current = false;
    connect();

    // Reconnect immediately if tab becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        if (!socketRef.current || socketRef.current.readyState === WebSocket.CLOSED) {
          connect();
        }
      }
    };

    // Reconnect immediately if network returns online
    const handleOnline = () => {
      if (!socketRef.current || socketRef.current.readyState === WebSocket.CLOSED) {
        connect();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('online', handleOnline);

    // Heartbeat ping every 25 seconds
    const pingInterval = setInterval(() => {
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        send('ping');
      }
    }, 25000);

    return () => {
      isUnmountedRef.current = true;
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('online', handleOnline);
      clearInterval(pingInterval);
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [connect, send]);

  return (
    <WebSocketContext.Provider
      value={{
        isConnected,
        isConnecting,
        onlineCount,
        lastEvent,
        send,
        subscribe,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};
