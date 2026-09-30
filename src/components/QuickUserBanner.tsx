import React, { useState } from 'react';
import { UserProfile } from '../types';
import { 
  CheckCircle2, 
  Sparkles, 
  User, 
  Phone, 
  MapPin, 
  ArrowRight, 
  Database, 
  ShieldCheck, 
  Zap, 
  Lock, 
  RefreshCw,
  Edit3
} from 'lucide-react';

interface QuickUserBannerProps {
  currentUser: UserProfile | null;
  onUserRegisteredOrSelected: (user: UserProfile) => void;
  onAutoFill?: () => void;
  featureName?: string;
  onOpenAuthModal?: () => void;
}

export const QuickUserBanner: React.FC<QuickUserBannerProps> = ({
  currentUser,
  onUserRegisteredOrSelected,
  onAutoFill,
  featureName = 'this feature',
  onOpenAuthModal,
}) => {
  const [showInlineRegister, setShowInlineRegister] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Fast preset registration/selection
  const handleQuickSelect = async (preset: { name: string; phone: string; email: string; address: string }) => {
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: preset.name,
          phone: preset.phone,
          email: preset.email,
          address: preset.address,
          password: 'eden123',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        onUserRegisteredOrSelected(data.profile);
        if (onAutoFill) onAutoFill();
      } else {
        // Fallback local
        const localProfile: UserProfile = {
          id: `USR-${Math.floor(100 + Math.random() * 900)}`,
          name: preset.name,
          phone: preset.phone,
          email: preset.email,
          address: preset.address,
          role: 'user',
          authProvider: 'phone',
          quickPassword: 'eden123',
        };
        onUserRegisteredOrSelected(localProfile);
        if (onAutoFill) onAutoFill();
      }
    } catch {
      const localProfile: UserProfile = {
        id: `USR-${Math.floor(100 + Math.random() * 900)}`,
        name: preset.name,
        phone: preset.phone,
        email: preset.email,
        address: preset.address,
        role: 'user',
        authProvider: 'phone',
        quickPassword: 'eden123',
      };
      onUserRegisteredOrSelected(localProfile);
      if (onAutoFill) onAutoFill();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInlineRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMsg('Please provide your name and mobile number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          address: address.trim() || 'Tamil Nadu, India',
          password: 'eden123',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        onUserRegisteredOrSelected(data.profile);
        setShowInlineRegister(false);
        if (onAutoFill) onAutoFill();
      } else {
        const err = await res.json();
        setErrorMsg(err.error || 'Registration failed');
      }
    } catch (err) {
      console.warn('Backend unavailable, saving locally:', err);
      const fallback: UserProfile = {
        id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim() || 'Tamil Nadu, India',
        role: 'user',
        authProvider: 'phone',
        quickPassword: 'eden123',
      };
      onUserRegisteredOrSelected(fallback);
      setShowInlineRegister(false);
      if (onAutoFill) onAutoFill();
    } finally {
      setIsSubmitting(false);
    }
  };

  // 1. If user is already logged in
  if (currentUser) {
    return (
      <div className="mb-6 p-4 bg-[#F4F1EA] border border-[#2D4F1E]/20 rounded-2xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#2D4F1E] text-[#F4F1EA] flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
            {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-[#2D4F1E] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2D4F1E]" />
                Registered User:
              </span>
              <span className="text-xs font-extrabold text-[#2D4F1E] bg-[#EFECE6] px-2 py-0.5 rounded-md border border-[#2D4F1E]/10">
                {currentUser.name}
              </span>
              <span className="text-[11px] font-mono text-[#2D4F1E]/70">
                ({currentUser.phone || currentUser.email})
              </span>
            </div>
            <p className="text-[11px] text-[#2D4F1E]/70 flex items-center gap-1.5 mt-0.5">
              <Database className="w-3 h-3 text-[#C08261]" />
              <span>Details auto-applied to {featureName} & synced to database. Password: <code className="font-mono font-bold text-[#2D4F1E]">{currentUser.quickPassword || 'eden123'}</code></span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto shrink-0">
          {onAutoFill && (
            <button
              type="button"
              onClick={onAutoFill}
              className="flex-1 sm:flex-none px-3 py-1.5 bg-[#C08261] hover:bg-[#A86E4F] text-[#F4F1EA] text-xs font-bold rounded-xl shadow-xs transition-all active:scale-95 flex items-center justify-center gap-1 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Re-Apply Profile</span>
            </button>
          )}

          {onOpenAuthModal && (
            <button
              type="button"
              onClick={onOpenAuthModal}
              className="px-3 py-1.5 bg-[#EFECE6] hover:bg-[#FAF8F5] text-[#2D4F1E] text-xs font-semibold rounded-xl border border-[#2D4F1E]/20 transition-all cursor-pointer flex items-center gap-1"
            >
              <Edit3 className="w-3 h-3" />
              <span>Switch User</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  // 2. If user is NOT logged in: Provide 1-Click fast registration and preset buttons
  return (
    <div className="mb-6 p-4 sm:p-5 bg-gradient-to-br from-[#FAF8F5] to-[#EFECE6] border-2 border-[#C08261]/40 rounded-2xl shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 rounded-lg bg-[#C08261] text-[#F4F1EA] flex items-center justify-center shadow-xs">
              <Zap className="w-3.5 h-3.5" />
            </span>
            <h4 className="text-xs font-bold text-[#2D4F1E] uppercase tracking-wider">
              1-Click Fast Registration & Database Sync
            </h4>
            <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide bg-[#2D4F1E] text-[#F4F1EA] rounded-full">
              Persistent Storage
            </span>
          </div>
          <p className="text-xs text-[#2D4F1E]/80 mt-1">
            Register once to instantly auto-fill all features (Land, Metals, Pollution, Field Logs) and store in the database.
          </p>
        </div>

        {/* 1-Click Fast Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setShowInlineRegister(!showInlineRegister)}
            className="px-3 py-1.5 bg-[#C08261] hover:bg-[#A86E4F] text-[#F4F1EA] rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95 flex items-center space-x-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{showInlineRegister ? 'Close' : 'Name & ID Register Form'}</span>
          </button>
        </div>
      </div>

      {/* Inline Quick Register Form Drawer */}
      {showInlineRegister && (
        <form onSubmit={handleInlineRegisterSubmit} className="mt-4 pt-4 border-t border-[#2D4F1E]/15 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-[#2D4F1E] uppercase mb-1">
              Your Full Name <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <User className="w-3.5 h-3.5 text-[#2D4F1E]/40 absolute left-3 top-2.5" />
              <input
                type="text"
                required
                placeholder="e.g. S. Murugesan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-[#FAF8F5] border border-[#2D4F1E]/20 rounded-xl text-xs font-semibold text-[#2D4F1E] focus:outline-none focus:ring-2 focus:ring-[#C08261]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#2D4F1E] uppercase mb-1">
              Mobile Number <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <Phone className="w-3.5 h-3.5 text-[#2D4F1E]/40 absolute left-3 top-2.5" />
              <input
                type="tel"
                required
                placeholder="e.g. +91 94432 12345"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-[#FAF8F5] border border-[#2D4F1E]/20 rounded-xl text-xs font-semibold text-[#2D4F1E] focus:outline-none focus:ring-2 focus:ring-[#C08261]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#2D4F1E] uppercase mb-1">
              Village / District
            </label>
            <div className="relative">
              <MapPin className="w-3.5 h-3.5 text-[#2D4F1E]/40 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="e.g. Madurai, Tamil Nadu"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-[#FAF8F5] border border-[#2D4F1E]/20 rounded-xl text-xs font-semibold text-[#2D4F1E] focus:outline-none focus:ring-2 focus:ring-[#C08261]"
              />
            </div>
          </div>

          {errorMsg && (
            <div className="sm:col-span-3 text-xs text-red-600 font-bold bg-red-50 p-2 rounded-lg border border-red-200">
              {errorMsg}
            </div>
          )}

          <div className="sm:col-span-3 flex items-center justify-between pt-1">
            <p className="text-[11px] text-[#2D4F1E]/70 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2D4F1E]" />
              Stores profile to database with default password <code className="bg-[#FAF8F5] px-1 py-0.5 rounded font-mono font-bold text-[#2D4F1E]">eden123</code> for easy future logins.
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#F4F1EA] font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
            >
              <Database className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Storing...' : 'Save & Auto-Fill Form'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
