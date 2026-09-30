import React, { useState } from 'react';
import { 
  Sprout, 
  Droplets, 
  ShieldCheck, 
  User, 
  LayoutDashboard, 
  BookOpen, 
  Landmark, 
  PlusCircle, 
  LogOut, 
  Phone, 
  Users, 
  Globe, 
  ShieldAlert, 
  Sparkles, 
  ChevronDown, 
  Lightbulb, 
  KeyRound, 
  Tractor,
  Recycle,
  CheckCircle2,
  Copy,
  ExternalLink,
  Shield,
  FileText,
  Satellite,
  Scale
} from 'lucide-react';
import { useLanguage, SUPPORTED_LANGUAGES, LanguageCode } from '../context/LanguageContext';
import { UserProfile } from '../types';
import { GoogleGLogo } from './AuthModal';
import { copyToClipboard } from '../utils/safeClipboard';
import { useWebSocket } from '../context/WebSocketContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: UserProfile | null;
  onOpenAuthModal: () => void;
  onLogout: () => void;
  onSelectUser?: (user: UserProfile) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenAuthModal,
  onLogout,
  onSelectUser,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const { isConnected, isConnecting, onlineCount } = useWebSocket();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);
  const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);

  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  const isResourcesActive = ['awareness', 'farmer-ideas', 'elnino', 'customers', 'govt', 'waste-gap', 'satellite'].includes(activeTab);

  const handleCopyPassword = async () => {
    if (currentUser?.quickPassword) {
      const ok = await copyToClipboard(currentUser.quickPassword);
      if (ok) {
        setCopiedPassword(true);
        setTimeout(() => setCopiedPassword(false), 2500);
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#2D4F1E] border-b-2 border-[#C08261]/40 shadow-xl transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Main Navbar Bar */}
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          
          {/* Brand Logo & Tagline */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer group shrink-0"
            title="Eden Sync Revival Home"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#1F3814] flex items-center justify-center border-2 border-[#C08261]/50 shadow-md group-hover:border-[#D89F80] transition-colors shrink-0">
              <Sprout className="w-6 h-6 sm:w-7 sm:h-7 text-[#D89F80] group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-left">
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <span className="font-serif font-bold text-lg sm:text-2xl text-[#F4F1EA] tracking-tight">
                  Eden Sync
                </span>
                <span className="text-[9px] sm:text-[10px] font-extrabold uppercase px-1.5 sm:px-2 py-0.5 bg-[#C08261]/25 text-[#D89F80] border border-[#C08261]/40 rounded-full tracking-wider">
                  Revival
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-[#F4F1EA]/85 font-medium hidden md:block">
                Land & Water Body Restoration
              </p>
            </div>
          </div>

          {/* Desktop Navigation Items */}
          <nav className="hidden xl:flex items-center space-x-1 bg-[#1F3814]/75 p-1 rounded-2xl border border-[#C08261]/30">
            {/* 1. Home */}
            <button
              id="nav-btn-home"
              onClick={() => setActiveTab('home')}
              className={`h-9 px-2.5 2xl:px-3 rounded-xl text-xs 2xl:text-sm font-bold transition-all inline-flex items-center justify-center space-x-1.5 active:scale-95 cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-[#C08261] text-[#F4F1EA] shadow-md shadow-[#1F3814]/50'
                  : 'text-[#F4F1EA]/80 hover:text-[#F4F1EA] hover:bg-[#2D4F1E]'
              }`}
            >
              <Sprout className="w-3.5 h-3.5 text-[#D89F80] shrink-0" />
              <span>{t('nav_home')}</span>
            </button>

            {/* 2. Soil AI Scanner */}
            <button
              id="nav-btn-soil-scanner"
              onClick={() => setActiveTab('soil-scan')}
              className={`h-9 px-2.5 2xl:px-3 rounded-xl text-xs 2xl:text-sm font-bold transition-all inline-flex items-center justify-center space-x-1.5 active:scale-95 cursor-pointer ${
                activeTab === 'soil-scan'
                  ? 'bg-[#C08261] text-[#F4F1EA] shadow-md shadow-[#1F3814]/50'
                  : 'text-[#F4F1EA]/80 hover:text-[#F4F1EA] hover:bg-[#2D4F1E]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4A359] shrink-0" />
              <span>{t('nav_soil_scan')}</span>
            </button>

            {/* 3. Waste Collection & Restoration of Metals (New Feature) */}
            <button
              id="nav-btn-waste-metal"
              onClick={() => setActiveTab('metal-waste')}
              className={`h-9 px-2.5 2xl:px-3 rounded-xl text-xs 2xl:text-sm font-bold transition-all inline-flex items-center justify-center space-x-1.5 active:scale-95 cursor-pointer ${
                activeTab === 'metal-waste'
                  ? 'bg-[#C08261] text-[#F4F1EA] shadow-md shadow-[#1F3814]/50'
                  : 'text-[#F4F1EA]/80 hover:text-[#F4F1EA] hover:bg-[#2D4F1E]'
              }`}
              title="Waste Collection & Restoration of Metals from Farmland & Water Bodies"
            >
              <Recycle className="w-3.5 h-3.5 text-[#D89F80] shrink-0" />
              <span>Waste & Metals</span>
            </button>

            {/* 4. Field Work Log (Perfect Placement alongside operational field modules) */}
            <button
              id="nav-btn-field-work"
              onClick={() => setActiveTab('field-work')}
              className={`h-9 px-2.5 2xl:px-3 rounded-xl text-xs 2xl:text-sm font-bold transition-all inline-flex items-center justify-center space-x-1.5 active:scale-95 cursor-pointer ${
                activeTab === 'field-work'
                  ? 'bg-[#C08261] text-[#F4F1EA] shadow-md shadow-[#1F3814]/50 ring-1 ring-[#D89F80]'
                  : 'text-[#F4F1EA]/80 hover:text-[#F4F1EA] hover:bg-[#2D4F1E]'
              }`}
              title="Field Work Log & Machinery Verification"
            >
              <Tractor className="w-3.5 h-3.5 text-[#D89F80] shrink-0" />
              <span>Field Work Log</span>
            </button>

            {/* 5. Pollution Grievances */}
            <button
              id="nav-btn-pollution-complaints"
              onClick={() => setActiveTab('complaints')}
              className={`h-9 px-2.5 2xl:px-3 rounded-xl text-xs 2xl:text-sm font-bold transition-all inline-flex items-center justify-center space-x-1.5 active:scale-95 cursor-pointer ${
                activeTab === 'complaints'
                  ? 'bg-red-800 text-[#F4F1EA] shadow-md shadow-[#1F3814]/50'
                  : 'text-[#F4F1EA]/80 hover:text-[#F4F1EA] hover:bg-[#2D4F1E]'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-red-300 shrink-0" />
              <span>{t('nav_grievances')}</span>
            </button>

            {/* 6. Register Land / Water */}
            <button
              id="nav-btn-register"
              onClick={() => setActiveTab('register')}
              className={`h-9 px-2.5 2xl:px-3 rounded-xl text-xs 2xl:text-sm font-bold transition-all inline-flex items-center justify-center space-x-1.5 active:scale-95 cursor-pointer ${
                activeTab === 'register'
                  ? 'bg-[#C08261] text-[#F4F1EA] shadow-md shadow-[#1F3814]/50'
                  : 'text-[#F4F1EA]/80 hover:text-[#F4F1EA] hover:bg-[#2D4F1E]'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#D89F80] shrink-0" />
              <span>{t('nav_register')}</span>
            </button>

            {/* 7. Knowledge Hub & Projects Dropdown */}
            <div className="relative">
              <button
                id="nav-btn-resources-dropdown"
                onClick={() => setIsResourcesDropdownOpen(!isResourcesDropdownOpen)}
                className={`h-9 px-2.5 2xl:px-3 rounded-xl text-xs 2xl:text-sm font-bold transition-all inline-flex items-center justify-center space-x-1 active:scale-95 cursor-pointer ${
                  isResourcesActive
                    ? 'bg-[#C08261] text-[#F4F1EA] shadow-md shadow-[#1F3814]/50'
                    : 'text-[#F4F1EA]/80 hover:text-[#F4F1EA] hover:bg-[#2D4F1E]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-[#D89F80] shrink-0" />
                <span>Knowledge</span>
                <ChevronDown className="w-3 h-3 text-[#D89F80] shrink-0" />
              </button>

              {isResourcesDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsResourcesDropdownOpen(false)} 
                  />
                  <div className="absolute left-0 mt-2 w-64 bg-[#FAF8F5] text-[#2D4F1E] rounded-2xl shadow-2xl border border-[#C08261]/30 py-2 z-50 animate-fadeIn divide-y divide-[#C08261]/15">
                    <div className="p-1.5 space-y-1">
                      <button
                        onClick={() => {
                          setActiveTab('farmer-ideas');
                          setIsResourcesDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-2 rounded-xl text-left text-xs font-bold flex items-center space-x-2.5 transition-colors cursor-pointer ${
                          activeTab === 'farmer-ideas' ? 'bg-[#2D4F1E] text-[#F4F1EA]' : 'hover:bg-[#EFECE6] text-[#2D4F1E]'
                        }`}
                      >
                        <Lightbulb className="w-4 h-4 text-[#D4A359] shrink-0" />
                        <div>
                          <div>Farmer Tips & Hacks</div>
                          <div className={`text-[10px] font-normal ${activeTab === 'farmer-ideas' ? 'text-[#D89F80]' : 'text-[#2D4F1E]/70'}`}>Indigenous recipes & field hacks</div>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab('awareness');
                          setIsResourcesDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-2 rounded-xl text-left text-xs font-bold flex items-center space-x-2.5 transition-colors cursor-pointer ${
                          activeTab === 'awareness' ? 'bg-[#2D4F1E] text-[#F4F1EA]' : 'hover:bg-[#EFECE6] text-[#2D4F1E]'
                        }`}
                      >
                        <BookOpen className="w-4 h-4 text-[#C08261] shrink-0" />
                        <div>
                          <div>Awareness & Guides</div>
                          <div className={`text-[10px] font-normal ${activeTab === 'awareness' ? 'text-[#D89F80]' : 'text-[#2D4F1E]/70'}`}>Audio summaries & restoration guides</div>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab('govt');
                          setIsResourcesDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-2 rounded-xl text-left text-xs font-bold flex items-center space-x-2.5 transition-colors cursor-pointer ${
                          activeTab === 'govt' ? 'bg-[#2D4F1E] text-[#F4F1EA]' : 'hover:bg-[#EFECE6] text-[#2D4F1E]'
                        }`}
                      >
                        <Landmark className="w-4 h-4 text-[#D89F80] shrink-0" />
                        <div>
                          <div>Govt Projects</div>
                          <div className={`text-[10px] font-normal ${activeTab === 'govt' ? 'text-[#D89F80]' : 'text-[#2D4F1E]/70'}`}>Subsidies & de-silting schemes</div>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab('elnino');
                          setIsResourcesDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-2 rounded-xl text-left text-xs font-bold flex items-center space-x-2.5 transition-colors cursor-pointer ${
                          activeTab === 'elnino' ? 'bg-[#2D4F1E] text-[#F4F1EA]' : 'hover:bg-[#EFECE6] text-[#2D4F1E]'
                        }`}
                      >
                        <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
                        <div>
                          <div>El Niño & Climate Shift</div>
                          <div className={`text-[10px] font-normal ${activeTab === 'elnino' ? 'text-[#D89F80]' : 'text-[#2D4F1E]/70'}`}>Monsoon forecast & heat resilience</div>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab('satellite');
                          setIsResourcesDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-2 rounded-xl text-left text-xs font-bold flex items-center space-x-2.5 transition-colors cursor-pointer ${
                          activeTab === 'satellite' ? 'bg-[#2D4F1E] text-[#F4F1EA]' : 'hover:bg-[#EFECE6] text-[#2D4F1E]'
                        }`}
                      >
                        <Satellite className="w-4 h-4 text-[#4ADE80] shrink-0" />
                        <div>
                          <div>Satellite & Soil Destruction</div>
                          <div className={`text-[10px] font-normal ${activeTab === 'satellite' ? 'text-[#D89F80]' : 'text-[#2D4F1E]/70'}`}>Global land loss & multispectral scans</div>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab('waste-gap');
                          setIsResourcesDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-2 rounded-xl text-left text-xs font-bold flex items-center space-x-2.5 transition-colors cursor-pointer ${
                          activeTab === 'waste-gap' ? 'bg-[#2D4F1E] text-[#F4F1EA]' : 'hover:bg-[#EFECE6] text-[#2D4F1E]'
                        }`}
                      >
                        <Scale className="w-4 h-4 text-[#D89F80] shrink-0" />
                        <div>
                          <div>All-in-One Waste Gap</div>
                          <div className={`text-[10px] font-normal ${activeTab === 'waste-gap' ? 'text-[#D89F80]' : 'text-[#2D4F1E]/70'}`}>Apps vs Infra Giants competitive audit</div>
                        </div>
                      </button>

                      {currentUser?.role === 'admin' && (
                        <button
                          onClick={() => {
                            setActiveTab('customers');
                            setIsResourcesDropdownOpen(false);
                          }}
                          className={`w-full px-3 py-2 rounded-xl text-left text-xs font-bold flex items-center space-x-2.5 transition-colors cursor-pointer ${
                            activeTab === 'customers' ? 'bg-[#2D4F1E] text-[#F4F1EA]' : 'hover:bg-[#EFECE6] text-[#2D4F1E]'
                          }`}
                        >
                          <Users className="w-4 h-4 text-blue-600 shrink-0" />
                          <div>
                            <div>Customer Requirements</div>
                            <div className={`text-[10px] font-normal ${activeTab === 'customers' ? 'text-[#D89F80]' : 'text-[#2D4F1E]/70'}`}>Commercial restoration leads</div>
                          </div>
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Satellite Analysis Tab */}
            <button
              id="nav-btn-satellite-telemetry"
              onClick={() => setActiveTab('satellite')}
              className={`h-9 px-2.5 2xl:px-3 rounded-xl text-xs 2xl:text-sm font-bold transition-all inline-flex items-center justify-center space-x-1.5 active:scale-95 cursor-pointer ${
                activeTab === 'satellite'
                  ? 'bg-[#C08261] text-[#F4F1EA] shadow-md shadow-[#1F3814]/50'
                  : 'text-[#F4F1EA]/80 hover:text-[#F4F1EA] hover:bg-[#2D4F1E]'
              }`}
              title="Satellite Telemetry & Global Soil Degradation Ledger"
            >
              <Satellite className="w-3.5 h-3.5 text-[#4ADE80] shrink-0" />
              <span>Satellite</span>
            </button>

            {/* 8. Portal Tab */}
            <button
              id="nav-btn-user-portal"
              onClick={() => setActiveTab('portal')}
              className={`h-9 px-2.5 2xl:px-3 rounded-xl text-xs 2xl:text-sm font-bold transition-all inline-flex items-center justify-center space-x-1.5 active:scale-95 cursor-pointer ${
                activeTab === 'portal'
                  ? 'bg-[#C08261] text-[#F4F1EA] shadow-md shadow-[#1F3814]/50'
                  : 'text-[#F4F1EA]/80 hover:text-[#F4F1EA] hover:bg-[#2D4F1E]'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#D89F80] shrink-0" />
              <span>{t('nav_portal')}</span>
            </button>

            {/* 9. Admin Portal */}
            {currentUser?.role === 'admin' && (
              <button
                id="nav-btn-admin-portal"
                onClick={() => setActiveTab('admin')}
                className={`h-9 px-3 rounded-xl text-xs 2xl:text-sm font-bold transition-all inline-flex items-center justify-center space-x-1.5 active:scale-95 cursor-pointer ${
                  activeTab === 'admin'
                    ? 'bg-[#D4A359] text-[#1F3814] shadow-md'
                    : 'text-[#D4A359] hover:text-[#F4F1EA] hover:bg-[#1F3814]'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>{t('nav_admin')}</span>
              </button>
            )}
          </nav>

          {/* Right Action Bar: Language Selector + User Profile / Login */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                id="language-selector-btn"
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="h-9 sm:h-10 px-2.5 sm:px-3 bg-[#1F3814] hover:bg-[#1F3814]/80 text-[#F4F1EA] text-xs font-bold rounded-xl border border-[#C08261]/40 shadow-inner flex items-center space-x-1 sm:space-x-1.5 transition-all cursor-pointer"
                title="Select language / மொழி தேர்வு / भाषा चुनें"
              >
                <Globe className="w-3.5 h-3.5 text-[#D89F80] shrink-0" />
                <span className="max-w-[55px] sm:max-w-none truncate text-[11px] sm:text-xs">
                  {currentLangObj.nativeLabel}
                </span>
                <ChevronDown className="w-3 h-3 text-[#D89F80] shrink-0" />
              </button>

              {isLangDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsLangDropdownOpen(false)} 
                  />
                  <div className="absolute right-0 mt-2 w-52 bg-[#FAF8F5] text-[#2D4F1E] rounded-2xl shadow-2xl border border-[#C08261]/30 py-2 z-50 animate-fadeIn divide-y divide-[#C08261]/10">
                    <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#C08261]">
                      Choose App Language / மொழி
                    </div>
                    <div className="max-h-64 overflow-y-auto py-1">
                      {SUPPORTED_LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code as LanguageCode);
                            setIsLangDropdownOpen(false);
                          }}
                          className={`w-full px-3.5 py-2 text-left text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                            language === lang.code
                              ? 'bg-[#2D4F1E] text-[#F4F1EA]'
                              : 'hover:bg-[#EFECE6] text-[#2D4F1E]'
                          }`}
                        >
                          <span>{lang.nativeLabel}</span>
                          <span className={`text-[10px] ${language === lang.code ? 'text-[#D89F80]' : 'text-[#2D4F1E]/60'}`}>
                            {lang.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Realtime WebSocket Status Indicator */}
            <div 
              id="ws-sync-status-pill"
              className={`hidden lg:inline-flex items-center space-x-1.5 h-9 sm:h-10 px-2.5 sm:px-3 text-xs font-bold rounded-xl border shadow-inner transition-all ${
                isConnected 
                  ? 'bg-[#1F3814] text-[#F4F1EA] border-emerald-500/40' 
                  : 'bg-[#1F3814]/80 text-[#F4F1EA]/70 border-[#C08261]/20'
              }`}
              title={isConnected ? `Real-Time WebSocket Sync Active (${onlineCount} peer${onlineCount !== 1 ? 's' : ''} connected)` : isConnecting ? 'Connecting to EdenSync Realtime Engine...' : 'Reconnecting to Realtime Engine...'}
            >
              <span className="relative flex h-2 w-2">
                {isConnected && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                )}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isConnected ? 'bg-emerald-500' : isConnecting ? 'bg-amber-400 animate-pulse' : 'bg-red-400'}`} />
              </span>
              <span className="text-[11px] font-semibold text-emerald-300 hidden xl:inline">
                {isConnected ? `Live Sync (${onlineCount})` : isConnecting ? 'Connecting...' : 'Reconnecting...'}
              </span>
            </div>

            {/* Quick Helpline Pill (Shown on Desktop) */}
            <div className="hidden 2xl:inline-flex items-center space-x-1.5 h-10 px-3 bg-[#1F3814] text-[#F4F1EA] text-xs font-bold rounded-xl border border-[#C08261]/30 shadow-inner">
              <Phone className="w-3.5 h-3.5 text-[#D89F80] shrink-0" />
              <a href="tel:8056192997" className="text-[#D89F80] hover:underline">8056192997</a>
            </div>

            {/* LOGGED IN USER PROFILE - HIGH-CONTRAST & PROMINENT UI/UX */}
            {currentUser ? (
              <div className="relative">
                {/* User Trigger Chip - High Contrast Ivory Card that Pops Out */}
                <button 
                  id="user-profile-chip"
                  type="button"
                  onClick={() => setIsUserProfileModalOpen(true)}
                  className="inline-flex items-center space-x-2 bg-[#FAF8F5] hover:bg-white text-[#2D4F1E] h-10 sm:h-11 px-2.5 sm:px-3 rounded-2xl border-2 border-[#D4A359] shadow-md hover:shadow-lg cursor-pointer transition-all hover:scale-[1.02] active:scale-95 group shrink-0 ring-2 ring-emerald-500/20"
                  title={`Logged in as ${currentUser.name || 'User'} (${currentUser.role === 'admin' ? 'Admin' : 'Landowner'}) - Click to view profile & readiness`}
                >
                  {/* Avatar with Live Beacon */}
                  <div className="relative shrink-0">
                    {currentUser.avatarUrl ? (
                      <img
                        src={currentUser.avatarUrl}
                        alt={currentUser.name || 'User'}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl object-cover border border-[#2D4F1E]/30 shrink-0 bg-white"
                        referrerPolicy="no-referrer"
                      />
                    ) : currentUser.authProvider === 'google' ? (
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white flex items-center justify-center shrink-0 border border-gray-200">
                        <GoogleGLogo className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#2D4F1E] text-[#D89F80] font-bold text-xs flex items-center justify-center border border-[#C08261]/40 shrink-0">
                        {(currentUser.name || 'U').charAt(0).toUpperCase()}
                      </div>
                    )}
                    {/* Live Online Green Beacon */}
                    <span 
                      title="Active Session"
                      className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center"
                    >
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600 ring-1 ring-white" />
                    </span>
                  </div>

                  {/* Name and Role text - Crisp Dark Forest Green on Light Background */}
                  <div className="text-left leading-tight pr-0.5">
                    <div className="flex items-center space-x-1">
                      <p className="text-xs sm:text-sm font-serif font-extrabold text-[#1F3814] truncate max-w-[120px] sm:max-w-[170px] 2xl:max-w-[210px]" title={currentUser.name}>
                        {currentUser.name || 'User'}
                      </p>
                      <ChevronDown className="w-3 h-3 text-[#C08261] group-hover:translate-y-0.5 transition-transform shrink-0" />
                    </div>
                    <div className="flex items-center space-x-1 mt-0.5">
                      <span className={`text-[9px] font-extrabold uppercase tracking-wide px-1.5 py-0.2 rounded-md ${
                        currentUser.role === 'admin' 
                          ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                          : 'bg-[#2D4F1E] text-[#F4F1EA]'
                      }`}>
                        {currentUser.role === 'admin' ? '🛡️ Admin' : '🌱 Landowner'}
                      </span>
                      <span className="text-[9px] font-bold text-emerald-700 hidden sm:inline">
                        • Ready
                      </span>
                    </div>
                  </div>

                  {/* Direct Fast Logout Icon */}
                  <span
                    id="user-logout-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onLogout();
                    }}
                    title="Sign Out / Switch"
                    className="w-6 h-6 inline-flex items-center justify-center bg-[#EFECE6] hover:bg-red-600 hover:text-white text-[#2D4F1E] rounded-lg transition-colors shrink-0 cursor-pointer ml-1"
                  >
                    <LogOut className="w-3 h-3" />
                  </span>
                </button>
              </div>
            ) : (
              /* NOT LOGGED IN */
              <div className="flex items-center">
                <button
                  id="nav-google-quick-btn"
                  onClick={onOpenAuthModal}
                  className="h-9 sm:h-10 px-3 sm:px-3.5 bg-white hover:bg-gray-50 text-gray-800 font-bold rounded-xl shadow-md border border-gray-200 inline-flex items-center space-x-2 text-xs sm:text-sm transition-all active:scale-95 cursor-pointer"
                  title="Google Sign In"
                >
                  <GoogleGLogo className="w-4 h-4 shrink-0" />
                  <span className="font-bold">Google</span>
                </button>
              </div>
            )}

          </div>
        </div>

        {/* PERSISTENT LOGGED-IN STATUS RIBBON (Guarantees logged person is NEVER hiding on mobile or tablet) */}
        {currentUser && (
          <div className="xl:hidden flex items-center justify-between py-1 px-2.5 my-1 bg-[#1F3814]/90 rounded-xl border border-[#C08261]/30 text-xs">
            <div 
              onClick={() => setIsUserProfileModalOpen(true)}
              className="flex items-center space-x-2 truncate cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span className="text-[#F4F1EA] font-bold truncate">
                Logged in: <b className="text-[#D89F80]">{currentUser.name}</b> ({currentUser.role === 'admin' ? 'Admin' : 'Landowner'})
              </span>
            </div>
            <button
              onClick={() => setIsUserProfileModalOpen(true)}
              className="text-[10px] font-bold text-[#D89F80] hover:text-[#F4F1EA] underline cursor-pointer shrink-0 ml-2"
            >
              View Credentials
            </button>
          </div>
        )}

        {/* Mobile Navigation Row (Horizontal Scroll with all major tabs) */}
        <div className="xl:hidden flex items-center py-2 border-t border-[#C08261]/20 overflow-x-auto text-xs gap-1.5 scrollbar-none">
          <button
            onClick={() => setActiveTab('home')}
            className={`h-8 px-2.5 rounded-xl inline-flex items-center justify-center space-x-1 font-bold whitespace-nowrap cursor-pointer ${
              activeTab === 'home' ? 'bg-[#C08261] text-[#F4F1EA] shadow-sm' : 'text-[#F4F1EA]/80'
            }`}
          >
            <Sprout className="w-3 h-3 shrink-0" />
            <span>{t('nav_home')}</span>
          </button>

          <button
            onClick={() => setActiveTab('soil-scan')}
            className={`h-8 px-2.5 rounded-xl inline-flex items-center justify-center space-x-1 font-bold whitespace-nowrap cursor-pointer ${
              activeTab === 'soil-scan' ? 'bg-[#C08261] text-[#F4F1EA] shadow-sm' : 'text-[#F4F1EA]/80'
            }`}
          >
            <Sparkles className="w-3 h-3 text-[#D4A359] shrink-0" />
            <span>{t('nav_soil_scan')}</span>
          </button>

          {/* Waste & Metals (New Feature Mobile Button) */}
          <button
            onClick={() => setActiveTab('metal-waste')}
            className={`h-8 px-2.5 rounded-xl inline-flex items-center justify-center space-x-1 font-bold whitespace-nowrap cursor-pointer ${
              activeTab === 'metal-waste' ? 'bg-[#C08261] text-[#F4F1EA] shadow-sm' : 'text-[#F4F1EA]/80'
            }`}
          >
            <Recycle className="w-3 h-3 text-[#D89F80] shrink-0" />
            <span>Waste & Metals</span>
          </button>

          {/* Field Work Log (Mobile Button - Explicitly Perfect Placement) */}
          <button
            onClick={() => setActiveTab('field-work')}
            className={`h-8 px-2.5 rounded-xl inline-flex items-center justify-center space-x-1 font-bold whitespace-nowrap cursor-pointer ${
              activeTab === 'field-work' ? 'bg-[#C08261] text-[#F4F1EA] shadow-sm ring-1 ring-[#D89F80]' : 'text-[#F4F1EA]/80'
            }`}
          >
            <Tractor className="w-3 h-3 shrink-0 text-[#D89F80]" />
            <span>Field Work Log</span>
          </button>

          <button
            onClick={() => setActiveTab('complaints')}
            className={`h-8 px-2.5 rounded-xl inline-flex items-center justify-center space-x-1 font-bold whitespace-nowrap cursor-pointer ${
              activeTab === 'complaints' ? 'bg-red-800 text-[#F4F1EA] shadow-sm' : 'text-[#F4F1EA]/80'
            }`}
          >
            <ShieldAlert className="w-3 h-3 text-red-300 shrink-0" />
            <span>{t('nav_grievances')}</span>
          </button>

          <button
            onClick={() => setActiveTab('register')}
            className={`h-8 px-2.5 rounded-xl inline-flex items-center justify-center space-x-1 font-bold whitespace-nowrap cursor-pointer ${
              activeTab === 'register' ? 'bg-[#C08261] text-[#F4F1EA] shadow-sm' : 'text-[#F4F1EA]/80'
            }`}
          >
            <PlusCircle className="w-3 h-3 shrink-0" />
            <span>{t('nav_register')}</span>
          </button>

          <button
            onClick={() => setActiveTab('farmer-ideas')}
            className={`h-8 px-2.5 rounded-xl inline-flex items-center justify-center space-x-1 font-bold whitespace-nowrap cursor-pointer ${
              activeTab === 'farmer-ideas' ? 'bg-[#C08261] text-[#F4F1EA] shadow-sm' : 'text-[#F4F1EA]/80'
            }`}
          >
            <Lightbulb className="w-3 h-3 shrink-0 text-[#D89F80]" />
            <span>Farmer Tips</span>
          </button>

          <button
            onClick={() => setActiveTab('awareness')}
            className={`h-8 px-2.5 rounded-xl inline-flex items-center justify-center space-x-1 font-bold whitespace-nowrap cursor-pointer ${
              activeTab === 'awareness' ? 'bg-[#C08261] text-[#F4F1EA] shadow-sm' : 'text-[#F4F1EA]/80'
            }`}
          >
            <BookOpen className="w-3 h-3 shrink-0" />
            <span>Guides</span>
          </button>

          <button
            onClick={() => setActiveTab('govt')}
            className={`h-8 px-2.5 rounded-xl inline-flex items-center justify-center space-x-1 font-bold whitespace-nowrap cursor-pointer ${
              activeTab === 'govt' ? 'bg-[#C08261] text-[#F4F1EA] shadow-sm' : 'text-[#F4F1EA]/80'
            }`}
          >
            <Landmark className="w-3 h-3 shrink-0" />
            <span>Govt Projects</span>
          </button>

          <button
            onClick={() => setActiveTab('satellite')}
            className={`h-8 px-2.5 rounded-xl inline-flex items-center justify-center space-x-1 font-bold whitespace-nowrap cursor-pointer ${
              activeTab === 'satellite' ? 'bg-[#C08261] text-[#F4F1EA] shadow-sm' : 'text-[#F4F1EA]/80'
            }`}
          >
            <Satellite className="w-3 h-3 text-[#4ADE80] shrink-0" />
            <span>Satellite</span>
          </button>

          <button
            onClick={() => setActiveTab('waste-gap')}
            className={`h-8 px-2.5 rounded-xl inline-flex items-center justify-center space-x-1 font-bold whitespace-nowrap cursor-pointer ${
              activeTab === 'waste-gap' ? 'bg-[#C08261] text-[#F4F1EA] shadow-sm' : 'text-[#F4F1EA]/80'
            }`}
          >
            <Scale className="w-3 h-3 text-[#D89F80] shrink-0" />
            <span>Waste Gap</span>
          </button>

          <button
            onClick={() => setActiveTab('portal')}
            className={`h-8 px-2.5 rounded-xl inline-flex items-center justify-center space-x-1 font-bold whitespace-nowrap cursor-pointer ${
              activeTab === 'portal' ? 'bg-[#C08261] text-[#F4F1EA] shadow-sm' : 'text-[#F4F1EA]/80'
            }`}
          >
            <LayoutDashboard className="w-3 h-3 shrink-0" />
            <span>{t('nav_portal')}</span>
          </button>

          {currentUser?.role === 'admin' && (
            <button
              onClick={() => setActiveTab('admin')}
              className={`h-8 px-2.5 rounded-xl inline-flex items-center justify-center space-x-1 font-bold whitespace-nowrap cursor-pointer ${
                activeTab === 'admin' ? 'bg-[#D4A359] text-[#1F3814] shadow-sm' : 'text-[#D4A359]'
              }`}
            >
              <ShieldCheck className="w-3 h-3 shrink-0" />
              <span>{t('nav_admin')}</span>
            </button>
          )}
        </div>

      </div>

      {/* FULL USER PROFILE & CREDENTIALS MODAL (Fixes "the logged person is hiding") */}
      {isUserProfileModalOpen && currentUser && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#FAF8F5] w-full max-w-md rounded-3xl border-2 border-[#2D4F1E] shadow-2xl p-6 sm:p-7 space-y-5 text-[#2D4F1E] relative">
            <div className="flex items-center justify-between border-b border-[#C08261]/20 pb-3">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-[#C08261]" />
                <h3 className="font-serif font-bold text-lg">Logged User Profile</h3>
              </div>
              <button
                onClick={() => setIsUserProfileModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold flex items-center justify-center cursor-pointer text-sm"
              >
                ✕
              </button>
            </div>

            {/* Profile Avatar & Header */}
            <div className="flex items-center space-x-4 p-4 bg-[#EFECE6] rounded-2xl border border-[#C08261]/25">
              {currentUser.avatarUrl ? (
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#C08261]"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-[#2D4F1E] text-[#D89F80] font-bold text-xl flex items-center justify-center border-2 border-[#C08261]">
                  {(currentUser.name || 'U').charAt(0).toUpperCase()}
                </div>
              )}
              <div className="space-y-0.5">
                <h4 className="font-serif font-bold text-base text-[#2D4F1E]">{currentUser.name}</h4>
                <div className="flex items-center space-x-1.5">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#2D4F1E] text-[#F4F1EA]">
                    {currentUser.role === 'admin' ? '🛡️ Central Admin' : '🌱 Registered Landowner'}
                  </span>
                  <span className="font-mono text-[10px] text-[#2D4F1E]/60">#{currentUser.id}</span>
                </div>
              </div>
            </div>

            {/* Details List */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-[#C08261]/15">
                <span className="text-[#2D4F1E]/70 font-semibold">Registered Email:</span>
                <span className="font-mono font-bold">{currentUser.email || 'None'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#C08261]/15">
                <span className="text-[#2D4F1E]/70 font-semibold">Mobile Phone:</span>
                <span className="font-mono font-bold">{currentUser.phone || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#C08261]/15">
                <span className="text-[#2D4F1E]/70 font-semibold">Location / District:</span>
                <span className="font-bold">{currentUser.address || 'Anand, Gujarat'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#C08261]/15">
                <span className="text-[#2D4F1E]/70 font-semibold">Authentication Type:</span>
                <span className="capitalize font-bold text-[#C08261]">{currentUser.authProvider || 'Password-Alone'}</span>
              </div>
            </div>

            {/* System Readiness Box */}
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-300 text-xs flex items-center space-x-2.5">
              <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </span>
              <div>
                <p className="font-bold text-emerald-950">System Ready & Persistent</p>
                <p className="text-[11px] text-emerald-800">
                  Your identity auto-fills Land Revival, Metal Scrap Collection, Field Logs, and Grievance submissions.
                </p>
              </div>
            </div>

            {/* Quick Password Alone Display & Copy */}
            {currentUser.quickPassword && (
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-300 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-950 flex items-center space-x-1">
                    <KeyRound className="w-3.5 h-3.5 text-amber-700" />
                    <span>Your Quick-Login Password:</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyPassword}
                    className="px-2 py-0.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-[10px] font-bold flex items-center space-x-1 cursor-pointer"
                  >
                    {copiedPassword ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-white" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Password</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="font-mono text-sm font-extrabold text-amber-950 bg-white/80 px-3 py-1.5 rounded-xl border border-amber-200">
                  {currentUser.quickPassword}
                </div>
                <p className="text-[10px] text-amber-850">
                  You can log in from any device by entering this password alone without typing email or username.
                </p>
              </div>
            )}

            {/* Quick Navigation Shortcuts */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => {
                  setActiveTab('portal');
                  setIsUserProfileModalOpen(false);
                }}
                className="p-2.5 bg-[#EFECE6] hover:bg-[#2D4F1E] hover:text-[#FAF8F5] rounded-xl font-bold transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#C08261]" />
                <span>My Applications</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('metal-waste');
                  setIsUserProfileModalOpen(false);
                }}
                className="p-2.5 bg-[#EFECE6] hover:bg-[#2D4F1E] hover:text-[#FAF8F5] rounded-xl font-bold transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Recycle className="w-3.5 h-3.5 text-[#C08261]" />
                <span>My Metal Bookings</span>
              </button>
            </div>

            {/* Logout / Switch User */}
            <div className="pt-2 border-t border-[#C08261]/20 flex items-center justify-between">
              <button
                onClick={() => {
                  setIsUserProfileModalOpen(false);
                  onOpenAuthModal();
                }}
                className="text-xs font-bold text-[#C08261] hover:underline cursor-pointer"
              >
                Switch User / Login as Other
              </button>

              <button
                onClick={() => {
                  setIsUserProfileModalOpen(false);
                  onLogout();
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shadow"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
