import React from 'react';
import { Sprout, Droplets, ArrowRight, ShieldCheck, Sparkles, Trees, Activity, HeartHandshake, Phone, ShieldAlert, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  onRegisterClick: () => void;
  onExploreGovtClick: () => void;
  onAwarenessClick: () => void;
  onReportPollutionClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onRegisterClick,
  onExploreGovtClick,
  onAwarenessClick,
  onReportPollutionClick,
}) => {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-full relative overflow-hidden bg-gradient-to-b from-[#1F3814] via-[#2D4F1E] to-[#1F3814] text-[#F4F1EA] pt-12 pb-20 border-b border-[#C08261]/25">
      
      {/* Background Decorative Warm Tone Radial Orbs & Natural Vignette */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#C08261]/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[600px] h-[600px] bg-[#D4A359]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-10 w-96 h-96 bg-[#2D4F1E]/40 rounded-full blur-2xl pointer-events-none" />
      
      {/* Subtle fine topography grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #F4F1EA 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Announcement Pill */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#1F3814]/90 border border-[#C08261]/40 text-[#D89F80] text-xs sm:text-sm font-medium shadow-inner backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-[#D4A359] animate-pulse" />
            <span>Eden Sync Revival — Land & Water Body Restoration Ecosystem</span>
          </div>

          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#1F3814]/90 border border-[#C08261]/50 text-[#F4F1EA] text-xs sm:text-sm font-bold shadow-md backdrop-blur-sm">
            <Phone className="w-3.5 h-3.5 text-[#D4A359]" />
            <span className="text-[#F4F1EA]/90">Helpline:</span>
            <a href="tel:8056192997" className="text-[#D89F80] hover:text-[#F4F1EA] transition-colors underline-offset-2 hover:underline">8056192997</a>
            <span className="text-[#C08261]">/</span>
            <a href="tel:6381811657" className="text-[#D89F80] hover:text-[#F4F1EA] transition-colors underline-offset-2 hover:underline">6381811657</a>
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight leading-[1.15] text-[#F4F1EA]">
            {t('hero.title1', 'Eden Sync Revival:')} <br className="hidden sm:inline" />
            <span className="text-[#D89F80] italic">
              {t('hero.title2', 'Land & Water Body Restoration')}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#F4F1EA]/85 font-normal max-w-3xl mx-auto leading-relaxed">
            {t('hero.subtitle', 'Register your agricultural land, barren soil, pond, or lake for systematic eco-restoration, or file pollution complaints against illegal chemical dumping and wastewater discharge. We connect landowners and communities with AI-guided soil/water triage, ecological experts, and government restoration programs.')}
          </p>

          {/* Call To Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              id="hero-register-land-cta"
              onClick={onRegisterClick}
              className="h-12 px-6 bg-[#C08261] hover:bg-[#A86E4F] text-[#F4F1EA] font-bold rounded-xl shadow-lg shadow-[#1F3814]/50 hover:shadow-xl transition-all text-xs sm:text-sm inline-flex items-center justify-center space-x-2 group active:scale-95 cursor-pointer border border-[#D89F80]/30"
            >
              <Sprout className="w-4 h-4 group-hover:rotate-12 transition-transform text-[#F4F1EA] shrink-0" />
              <span>{t('hero.btnRegister', 'Register Land / Water Body')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
            </button>

            <button
              id="hero-report-pollution-cta"
              onClick={onReportPollutionClick}
              className="h-12 px-6 bg-red-900/90 hover:bg-red-800 text-[#F4F1EA] font-bold rounded-xl border border-red-400/40 shadow-lg hover:shadow-xl transition-all text-xs sm:text-sm inline-flex items-center justify-center space-x-2 group active:scale-95 cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4 text-red-200 group-hover:scale-110 transition-transform shrink-0" />
              <span>{t('hero.btnReportPollution', 'Report Pollution (Land/Water)')}</span>
            </button>

            <button
              id="hero-govt-projects-cta"
              onClick={onExploreGovtClick}
              className="h-12 px-5 bg-[#1F3814]/90 hover:bg-[#2D4F1E] text-[#F4F1EA] font-bold rounded-xl border border-[#C08261]/50 shadow-md hover:border-[#C08261] transition-all text-xs sm:text-sm inline-flex items-center justify-center space-x-2 active:scale-95 cursor-pointer backdrop-blur-sm"
            >
              <ShieldCheck className="w-4 h-4 text-[#D4A359] shrink-0" />
              <span>{t('hero.btnGovt', 'Govt Restoration')}</span>
            </button>
          </div>
        </div>

        {/* High Impact Key Statistics Grid */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="bg-[#1F3814]/85 backdrop-blur-md p-6 rounded-3xl border border-[#C08261]/35 text-center hover:border-[#C08261] hover:-translate-y-1 transition-all shadow-lg">
            <div className="w-12 h-12 mx-auto bg-[#C08261]/20 text-[#D89F80] rounded-2xl flex items-center justify-center mb-3">
              <Trees className="w-6 h-6" />
            </div>
            <p className="text-3xl sm:text-4xl font-serif font-extrabold text-[#F4F1EA] tracking-tight">{t('hero.stat1Val', '14,280+')}</p>
            <p className="text-xs sm:text-sm font-semibold text-[#D89F80] mt-1">{t('hero.stat1Title', 'Acres Land Restored')}</p>
            <p className="text-[11px] text-[#F4F1EA]/70 mt-1">{t('hero.stat1Sub', 'Organic carbon & pH balanced')}</p>
          </div>

          <div className="bg-[#1F3814]/85 backdrop-blur-md p-6 rounded-3xl border border-[#C08261]/35 text-center hover:border-[#C08261] hover:-translate-y-1 transition-all shadow-lg">
            <div className="w-12 h-12 mx-auto bg-[#C08261]/20 text-[#D89F80] rounded-2xl flex items-center justify-center mb-3">
              <Droplets className="w-6 h-6" />
            </div>
            <p className="text-3xl sm:text-4xl font-serif font-extrabold text-[#F4F1EA] tracking-tight">{t('hero.stat2Val', '890+')}</p>
            <p className="text-xs sm:text-sm font-semibold text-[#D89F80] mt-1">{t('hero.stat2Title', 'Lakes & Ponds Revived')}</p>
            <p className="text-[11px] text-[#F4F1EA]/70 mt-1">{t('hero.stat2Sub', 'Desilted & groundwater recharged')}</p>
          </div>

          <div className="bg-[#1F3814]/85 backdrop-blur-md p-6 rounded-3xl border border-[#C08261]/35 text-center hover:border-[#C08261] hover:-translate-y-1 transition-all shadow-lg">
            <div className="w-12 h-12 mx-auto bg-[#C08261]/20 text-[#D4A359] rounded-2xl flex items-center justify-center mb-3">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <p className="text-3xl sm:text-4xl font-serif font-extrabold text-[#F4F1EA] tracking-tight">{t('hero.stat3Val', '1,450+')}</p>
            <p className="text-xs sm:text-sm font-semibold text-[#D89F80] mt-1">{t('hero.stat3Title', 'Pollution Grievances Solved')}</p>
            <p className="text-[11px] text-[#F4F1EA]/70 mt-1">{t('hero.stat3Sub', 'Industrial & chemical triage')}</p>
          </div>

          <div className="bg-[#1F3814]/85 backdrop-blur-md p-6 rounded-3xl border border-[#C08261]/35 text-center hover:border-[#C08261] hover:-translate-y-1 transition-all shadow-lg">
            <div className="w-12 h-12 mx-auto bg-[#C08261]/20 text-[#D89F80] rounded-2xl flex items-center justify-center mb-3">
              <Activity className="w-6 h-6" />
            </div>
            <p className="text-3xl sm:text-4xl font-serif font-extrabold text-[#F4F1EA] tracking-tight">{t('hero.stat4Val', '₹48.2 Cr')}</p>
            <p className="text-xs sm:text-sm font-semibold text-[#D89F80] mt-1">{t('hero.stat4Title', 'Govt Funds Facilitated')}</p>
            <p className="text-[11px] text-[#F4F1EA]/70 mt-1">{t('hero.stat4Sub', 'Direct ecological subsidies')}</p>
          </div>

        </div>

        {/* Feature Offerings Banner */}
        <div className="mt-14 bg-[#1F3814]/95 rounded-3xl p-6 sm:p-8 border border-[#C08261]/40 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase text-[#D4A359] tracking-widest">How Eden Sync Revival Works</span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#F4F1EA]">
                Comprehensive Land & Water Restoration Ecosystem
              </h3>
              <p className="text-sm text-[#F4F1EA]/85">
                Register degraded plots or report active pollution → Get AI ecological safety diagnosis → Coordinate with field inspectors & bio-remediation experts → Track real-time recovery.
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
              <button
                onClick={onReportPollutionClick}
                className="h-11 px-5 bg-red-900/90 hover:bg-red-800 text-[#F4F1EA] font-bold text-xs sm:text-sm rounded-xl border border-red-400/40 transition-colors inline-flex items-center justify-center whitespace-nowrap active:scale-95 cursor-pointer"
              >
                Report Pollution
              </button>
              <button
                onClick={onRegisterClick}
                className="h-11 px-5 bg-[#C08261] hover:bg-[#A06445] text-[#F4F1EA] font-extrabold text-xs sm:text-sm rounded-xl transition-colors shadow-md inline-flex items-center justify-center whitespace-nowrap active:scale-95 cursor-pointer"
              >
                Start Registration Now
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
