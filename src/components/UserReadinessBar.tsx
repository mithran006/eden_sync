import React, { useState } from 'react';
import { 
  User, 
  CheckCircle2, 
  ShieldCheck, 
  KeyRound, 
  Copy, 
  LogOut, 
  Sparkles, 
  RefreshCw, 
  ChevronDown, 
  ChevronUp, 
  MapPin, 
  Phone, 
  Mail, 
  Zap, 
  Layers, 
  Check,
  UserCheck,
  ArrowUpRight
} from 'lucide-react';
import { UserProfile } from '../types';
import { copyToClipboard } from '../utils/safeClipboard';

interface UserReadinessBarProps {
  currentUser: UserProfile | null;
  onOpenAuthModal: () => void;
  onSelectUser: (user: UserProfile) => void;
  onLogout: () => void;
  onNavigateToTab: (tab: string) => void;
}

export const UserReadinessBar: React.FC<UserReadinessBarProps> = ({
  currentUser,
  onOpenAuthModal,
  onSelectUser,
  onLogout,
  onNavigateToTab,
}) => {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // When not signed in, do not render guest mode
  if (!currentUser) {
    return null;
  }

  const handleCopyPassword = async () => {
    const pwd = currentUser.quickPassword || 'eden123';
    const ok = await copyToClipboard(pwd);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <>
      {/* High-Contrast, Elevated Operational Readiness Bar */}
      <aside 
        id="operational-user-readiness-bar"
        aria-label="User Account Readiness and Active Session Indicator"
        className="w-full bg-white border-b-2 border-[#C08261]/40 shadow-md text-[#2D4F1E] relative z-20"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3">
          
          {/* LOGGED IN VIEW */}
          <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-3.5">
              
              {/* Left: Prominent Identity Box with High Visual Pop */}
              <div className="flex items-center space-x-3.5 w-full xl:w-auto">
                
                {/* User Avatar with High-Visibility Live Beacon */}
                <div className="relative shrink-0">
                  {currentUser.avatarUrl ? (
                    <img
                      src={currentUser.avatarUrl}
                      alt={currentUser.name}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-cover border-2 border-[#2D4F1E] shadow-sm bg-white"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#2D4F1E] text-[#F4F1EA] font-serif font-bold text-xl flex items-center justify-center border-2 border-[#C08261] shadow-sm">
                      {(currentUser.name || 'U').charAt(0).toUpperCase()}
                    </div>
                  )}
                  {/* Glowing Green Online Beacon */}
                  <span 
                    title="Active Authenticated Session"
                    className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white shadow-sm"
                  >
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <CheckCircle2 className="w-3.5 h-3.5 text-white relative z-10" />
                  </span>
                </div>

                {/* Identity Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    {/* Clear "Logged Person" Eye-Catching Header Tag */}
                    <span className="px-2 py-0.5 bg-[#2D4F1E] text-[#F4F1EA] rounded-md text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-2xs">
                      <UserCheck className="w-3 h-3 text-[#D89F80]" />
                      <span>Logged Person:</span>
                    </span>

                    {/* Name: Crisp, High-Contrast Font */}
                    <span className="text-base sm:text-lg font-serif font-extrabold text-[#1F3814] tracking-tight">
                      {currentUser.name}
                    </span>
                    
                    {/* Role Badge */}
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1 border shadow-2xs ${
                      currentUser.role === 'admin'
                        ? 'bg-amber-100 text-amber-900 border-amber-400'
                        : 'bg-emerald-100 text-emerald-900 border-emerald-400'
                    }`}>
                      {currentUser.role === 'admin' ? (
                        <>
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                          <span>Central Admin</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Verified Landowner</span>
                        </>
                      )}
                    </span>

                    {/* Account ID Tag */}
                    <span className="font-mono text-[10px] sm:text-[11px] font-bold bg-[#EFECE6] text-[#2D4F1E] px-2 py-0.5 rounded-md border border-[#2D4F1E]/20">
                      #{currentUser.id}
                    </span>
                  </div>

                  {/* Sub-line: Phone + District + System Readiness */}
                  <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 text-xs text-[#2D4F1E] mt-1 font-medium">
                    {currentUser.phone && (
                      <span className="flex items-center gap-1 font-mono font-bold text-[#1F3814]">
                        <Phone className="w-3 h-3 text-[#C08261]" />
                        {currentUser.phone}
                      </span>
                    )}
                    {currentUser.address && (
                      <span className="flex items-center gap-1 text-[#2D4F1E]/80">
                        <MapPin className="w-3 h-3 text-[#C08261]" />
                        <span>{currentUser.address}</span>
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 border border-emerald-300 rounded-md text-emerald-800 font-bold text-[11px]">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Ready for 1-Click Auto-Fill</span>
                    </span>
                  </div>
                </div>

              </div>

              {/* Right: Quick Action Controls & Password Pill */}
              <div className="flex flex-wrap items-center gap-2 w-full xl:w-auto pt-2 xl:pt-0 border-t xl:border-t-0 border-[#C08261]/20 justify-between xl:justify-end">
                {/* Quick Password Pill with 1-Click Copy */}
                <div 
                  onClick={handleCopyPassword}
                  title="Click to copy your 1-click password for easy login anywhere"
                  className="bg-[#FAF8F5] hover:bg-emerald-50 text-[#2D4F1E] border-2 border-[#C08261]/40 hover:border-emerald-500 rounded-xl px-2.5 py-1 text-xs flex items-center space-x-1.5 cursor-pointer transition-all shadow-2xs group"
                >
                  <KeyRound className="w-3.5 h-3.5 text-[#C08261] group-hover:text-emerald-700 shrink-0" />
                  <span className="text-[11px] font-bold text-[#2D4F1E]/75">Pass:</span>
                  <code className="font-mono font-extrabold text-[#1F3814] bg-white px-1.5 py-0.5 rounded border border-[#2D4F1E]/15 text-[11px]">
                    {currentUser.quickPassword || 'eden123'}
                  </code>
                  <span className="text-[10px] font-bold text-[#C08261] group-hover:text-emerald-700 underline flex items-center gap-0.5">
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700 font-extrabold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </span>
                </div>

                {/* My Applications / Portal Shortcut */}
                <button
                  type="button"
                  onClick={() => onNavigateToTab('portal')}
                  className="px-3 py-1.5 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#F4F1EA] text-xs font-bold rounded-xl shadow-xs transition-all active:scale-95 flex items-center space-x-1 cursor-pointer"
                  title="View your registered parcels and restoration status"
                >
                  <Layers className="w-3.5 h-3.5 text-[#D89F80]" />
                  <span>My Portal</span>
                </button>

                {/* Logout Button */}
                <button
                  type="button"
                  onClick={onLogout}
                  className="px-2.5 py-1.5 bg-red-50 hover:bg-red-600 text-red-700 hover:text-white border border-red-200 text-xs font-bold rounded-xl transition-all flex items-center space-x-1 cursor-pointer shadow-2xs"
                  title="Sign out of this session"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>

            </div>
        </div>
      </aside>

      {/* FLOATING PERSISTENT OPERATOR BADGE (Guarantees visible readiness indicator when scrolling) */}
      {currentUser && (
        <div 
          id="floating-logged-person-badge"
          className="fixed bottom-4 right-4 z-40 bg-[#1F3814]/95 text-[#F4F1EA] backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-xl border border-[#C08261]/50 flex items-center space-x-2.5 transition-all hover:scale-105 group"
        >
          <div className="relative">
            {currentUser.avatarUrl ? (
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.name}
                className="w-7 h-7 rounded-xl object-cover border border-[#D89F80]"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-7 h-7 rounded-xl bg-[#C08261] text-white font-bold text-xs flex items-center justify-center">
                {(currentUser.name || 'U').charAt(0)}
              </div>
            )}
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-1 ring-white" />
          </div>

          <div className="text-left text-xs leading-tight pr-1">
            <div className="flex items-center space-x-1">
              <span className="font-extrabold text-[#F4F1EA] text-xs max-w-[120px] truncate">
                {currentUser.name}
              </span>
              <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-[#C08261] text-[#F4F1EA]">
                {currentUser.role === 'admin' ? 'Admin' : 'Landowner'}
              </span>
            </div>
            <div className="text-[10px] text-[#D89F80] font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              <span>Session Active • Ready</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-6 h-6 rounded-lg bg-[#2D4F1E] hover:bg-[#C08261] flex items-center justify-center text-[#F4F1EA] transition-colors cursor-pointer"
            title="Scroll to top & see operator control bar"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </>
  );
};
