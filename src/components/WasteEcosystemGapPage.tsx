import React, { useState } from 'react';
import { 
  Building2, 
  Smartphone, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  Truck, 
  Factory, 
  Scale, 
  Sparkles, 
  TrendingUp, 
  ShieldAlert, 
  ChevronRight, 
  ArrowRight, 
  Coins, 
  HelpCircle,
  Tractor,
  Activity,
  Globe2
} from 'lucide-react';
import { 
  DIGITAL_WASTE_APPS, 
  ENVIRONMENTAL_INFRASTRUCTURE_GIANTS, 
  THE_ALL_IN_ONE_GAP_ANALYSIS 
} from '../data/wasteEcosystemData';
import { WastePlatformProfile } from '../types';

export const WasteEcosystemGapPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'digital-apps' | 'infrastructure-giants'>('all');
  const [selectedProfile, setSelectedProfile] = useState<WastePlatformProfile | null>(null);

  const displayedPlatforms = activeCategory === 'all'
    ? [...DIGITAL_WASTE_APPS, ...ENVIRONMENTAL_INFRASTRUCTURE_GIANTS]
    : activeCategory === 'digital-apps'
      ? DIGITAL_WASTE_APPS
      : ENVIRONMENTAL_INFRASTRUCTURE_GIANTS;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-[#1F3814] text-[#F4F1EA] p-8 sm:p-12 rounded-3xl border border-[#C08261]/40 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#C08261]/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-[#2D4F1E] rounded-full text-xs font-bold text-[#D89F80] border border-[#C08261]/30">
            <Scale className="w-3.5 h-3.5" />
            <span>Market Intelligence & Architectural Gap Analysis</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight leading-tight">
            The <span className="text-[#D89F80]">"All-in-One" Gap</span> in Waste & Environmental Restoration
          </h1>

          <p className="text-xs sm:text-sm text-[#F4F1EA]/85 leading-relaxed">
            Why digital waste apps bleed capital on micro-logistics while engineering infrastructure behemoths fail at citizen engagement — and how a unified operating system bridges the multi-billion dollar divide.
          </p>
        </div>
      </div>

      {/* The Core Diagnosis: The Great Divide */}
      <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-3xl border border-[#C08261]/20 shadow-lg space-y-6">
        <div className="border-b border-[#2D4F1E]/10 pb-4">
          <span className="text-[10px] font-bold text-[#C08261] uppercase tracking-wider">Executive Synthesis</span>
          <h2 className="text-2xl font-serif font-bold text-[#2D4F1E]">
            The Structural Paradox of Modern Waste Management
          </h2>
          <p className="text-xs sm:text-sm text-[#2D4F1E]/80 mt-1 leading-relaxed">
            {THE_ALL_IN_ONE_GAP_ANALYSIS.coreDiagnosis}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Camp 1: Digital Clearing Apps */}
          <div className="p-6 bg-[#EFECE6] rounded-2xl border border-[#2D4F1E]/15 space-y-4">
            <div className="flex items-center space-x-2 text-[#2D4F1E]">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
                <Smartphone className="w-4 h-4" />
              </div>
              <h3 className="text-base font-serif font-bold">1. Digital Waste Clearing Apps</h3>
            </div>
            <p className="text-xs text-[#2D4F1E]/80 leading-relaxed">
              Focus on on-demand pickup apps, user engagement, and informal sector mapping (Aakri, Ecowrap, Kabadiwalla Connect, Mitti).
            </p>
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase text-red-800 tracking-wider">Fatal Flaws & Bottlenecks:</span>
              <ul className="space-y-2">
                {THE_ALL_IN_ONE_GAP_ANALYSIS.softwareCampFlaws.map((flaw, idx) => (
                  <li key={idx} className="text-xs text-[#2D4F1E]/90 flex items-start space-x-2">
                    <span className="text-red-700 font-bold shrink-0">•</span>
                    <div>
                      <strong className="text-[#2D4F1E]">{flaw.title}:</strong> {flaw.detail}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Camp 2: Infrastructure Giants */}
          <div className="p-6 bg-[#EFECE6] rounded-2xl border border-[#2D4F1E]/15 space-y-4">
            <div className="flex items-center space-x-2 text-[#2D4F1E]">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
              <h3 className="text-base font-serif font-bold">2. Environmental Infrastructure Giants</h3>
            </div>
            <p className="text-xs text-[#2D4F1E]/80 leading-relaxed">
              Heavy civil engineering, optical sorting plants, mega-landfills, and hazardous treatment facilities (Veolia, Suez, Jacobs, Aecom, Ramky / Re Sustainability).
            </p>
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase text-red-800 tracking-wider">Fatal Flaws & Bottlenecks:</span>
              <ul className="space-y-2">
                {THE_ALL_IN_ONE_GAP_ANALYSIS.infrastructureCampFlaws.map((flaw, idx) => (
                  <li key={idx} className="text-xs text-[#2D4F1E]/90 flex items-start space-x-2">
                    <span className="text-red-700 font-bold shrink-0">•</span>
                    <div>
                      <strong className="text-[#2D4F1E]">{flaw.title}:</strong> {flaw.detail}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* The Unified Closed-Loop Solution */}
      <div className="bg-[#2D4F1E] text-[#F4F1EA] p-6 sm:p-10 rounded-3xl border border-[#C08261]/30 shadow-xl space-y-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#1F3814] rounded-full text-xs font-bold text-[#D89F80] border border-[#C08261]/30 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Winning Unified Paradigm</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight">
            {THE_ALL_IN_ONE_GAP_ANALYSIS.theWinningAllInOneArchitecture.name}
          </h2>
          <p className="text-xs sm:text-sm text-[#F4F1EA]/80 mt-1 max-w-3xl leading-relaxed">
            By fusing consumer-grade mobile clearing software with on-demand heavy machinery dispatch and biological soil revival, the platform transforms negative-margin waste collection into a high-margin circular recovery engine.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {THE_ALL_IN_ONE_GAP_ANALYSIS.theWinningAllInOneArchitecture.pillars.map((pillar, i) => (
            <div key={i} className="p-5 bg-[#1F3814] rounded-2xl border border-[#C08261]/25 space-y-2.5 flex flex-col justify-between">
              <div>
                <h4 className="font-serif font-bold text-sm text-[#D89F80] leading-snug">{pillar.pillarName}</h4>
                <p className="text-xs text-[#F4F1EA]/85 mt-2 leading-relaxed">{pillar.description}</p>
              </div>
              <div className="pt-2 border-t border-[#C08261]/15 text-[10px] uppercase font-bold text-emerald-400">
                Active Operational Module
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deep-Dive Competitor & Player Profiles */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-[#C08261] uppercase tracking-wider">Comparative Roster</span>
            <h2 className="text-2xl font-serif font-bold text-[#2D4F1E]">
              Ecosystem Players & Strategic Blindspots
            </h2>
            <p className="text-xs text-[#2D4F1E]/70">Click on any platform to inspect its business model, strengths, and exact reason for missing the "All-in-One" standard.</p>
          </div>

          {/* Category Filter */}
          <div className="flex items-center bg-[#EFECE6] p-1 rounded-2xl border border-[#2D4F1E]/20">
            <button
              onClick={() => setActiveCategory('all')}
              className={`h-8 px-3 text-xs font-bold rounded-xl transition-all ${
                activeCategory === 'all' ? 'bg-[#2D4F1E] text-[#F4F1EA]' : 'text-[#2D4F1E]/75 hover:text-[#2D4F1E]'
              }`}
            >
              All Players (7)
            </button>
            <button
              onClick={() => setActiveCategory('digital-apps')}
              className={`h-8 px-3 text-xs font-bold rounded-xl transition-all ${
                activeCategory === 'digital-apps' ? 'bg-[#2D4F1E] text-[#F4F1EA]' : 'text-[#2D4F1E]/75 hover:text-[#2D4F1E]'
              }`}
            >
              Digital Apps (4)
            </button>
            <button
              onClick={() => setActiveCategory('infrastructure-giants')}
              className={`h-8 px-3 text-xs font-bold rounded-xl transition-all ${
                activeCategory === 'infrastructure-giants' ? 'bg-[#2D4F1E] text-[#F4F1EA]' : 'text-[#2D4F1E]/75 hover:text-[#2D4F1E]'
              }`}
            >
              Infrastructure Giants (3)
            </button>
          </div>
        </div>

        {/* Platform Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedPlatforms.map((platform) => (
            <div
              key={platform.id}
              className="bg-[#FAF8F5] rounded-3xl border border-[#C08261]/25 p-6 shadow-md hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className={`inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-md mb-1 ${
                      platform.category === 'Digital Waste Clearing App'
                        ? 'bg-amber-100 text-amber-900 border border-amber-200'
                        : 'bg-blue-100 text-blue-900 border border-blue-200'
                    }`}>
                      {platform.category}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-[#2D4F1E]">
                      {platform.name}
                    </h3>
                  </div>

                  <span className="text-[11px] font-medium text-[#2D4F1E]/60 shrink-0">
                    {platform.headquarters.split(',')[0]}
                  </span>
                </div>

                <p className="text-xs text-[#2D4F1E]/85 line-clamp-3 leading-relaxed">
                  {platform.coreModel}
                </p>

                <div className="bg-[#EFECE6] p-3 rounded-2xl border border-[#2D4F1E]/10 space-y-1.5 text-xs">
                  <p className="text-[10px] font-bold text-red-800 uppercase flex items-center space-x-1">
                    <AlertTriangle className="w-3 h-3 text-red-700 shrink-0" />
                    <span>Fatal Flaw / Blindspot:</span>
                  </p>
                  <p className="text-[11px] text-[#2D4F1E]/90 leading-snug">
                    {platform.fatalFlawsOrBlindspots[0]}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#2D4F1E]/10">
                <button
                  onClick={() => setSelectedProfile(platform)}
                  className="w-full h-9 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#F4F1EA] font-bold text-xs rounded-xl inline-flex items-center justify-center space-x-1.5 transition-transform active:scale-95 shadow-sm cursor-pointer"
                >
                  <span>Inspect Strategic Audit</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Detailed Modal */}
      {selectedProfile && (
        <div className="fixed inset-0 z-50 bg-[#1F3814]/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6 border border-[#C08261]/30">
            
            <div className="flex items-start justify-between border-b border-[#2D4F1E]/10 pb-3">
              <div>
                <span className="px-2.5 py-0.5 bg-[#2D4F1E] text-[#D89F80] text-[10px] font-bold uppercase rounded-md">
                  {selectedProfile.category} • HQ: {selectedProfile.headquarters}
                </span>
                <h2 className="text-2xl font-serif font-bold text-[#2D4F1E] mt-1">
                  {selectedProfile.name}
                </h2>
                <p className="text-xs text-[#2D4F1E]/70">Coverage: {selectedProfile.coverage}</p>
              </div>

              <button
                onClick={() => setSelectedProfile(null)}
                className="h-8 px-3 bg-[#EFECE6] text-[#2D4F1E] font-bold text-xs rounded-xl hover:bg-[#E2DED7] cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="space-y-2">
              <h4 className="text-[10px] font-bold uppercase text-[#C08261] tracking-wider">Operational Business Model</h4>
              <p className="p-3 bg-[#EFECE6] rounded-xl border border-[#2D4F1E]/10 text-xs text-[#2D4F1E] leading-relaxed">
                {selectedProfile.coreModel}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-[10px] font-bold uppercase text-emerald-800 tracking-wider">Key Strengths & Assets</h4>
              <ul className="space-y-1.5">
                {selectedProfile.keyStrengths.map((str, idx) => (
                  <li key={idx} className="text-xs text-[#2D4F1E] flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-[10px] font-bold uppercase text-red-800 tracking-wider">Fatal Flaws & Structural Blindspots</h4>
              <ul className="space-y-1.5">
                {selectedProfile.fatalFlawsOrBlindspots.map((flaw, idx) => (
                  <li key={idx} className="text-xs text-[#2D4F1E] flex items-start space-x-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-700 shrink-0 mt-0.5" />
                    <span>{flaw}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-[#2D4F1E] text-[#F4F1EA] rounded-2xl border border-[#C08261]/30 space-y-1.5">
              <h4 className="text-xs font-bold uppercase text-[#D89F80] flex items-center space-x-1.5">
                <Scale className="w-4 h-4" />
                <span>Why They Miss The "All-in-One" Architecture</span>
              </h4>
              <p className="text-xs text-[#F4F1EA]/90 leading-relaxed">
                {selectedProfile.whyTheyStruggleOrMissAllInOne}
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedProfile(null)}
                className="h-10 px-6 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#F4F1EA] font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
              >
                Dismiss Audit
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
