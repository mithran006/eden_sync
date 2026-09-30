import React, { useState } from 'react';
import { 
  Sparkles, 
  Sprout, 
  Droplets, 
  Sun, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  BookOpen, 
  CheckCircle2, 
  RefreshCw, 
  Waves, 
  FileDown, 
  Share2, 
  Fish, 
  Zap, 
  AlertTriangle,
  Database
} from 'lucide-react';
import { SoilPhotoDetector } from './SoilPhotoDetector';
import { WaterPhotoDetector } from './WaterPhotoDetector';
import { KaggleAgriIntelligence } from './KaggleAgriIntelligence';
import { SoilConditionCategory } from '../types';

interface SoilScannerPageProps {
  onRegisterLandClick: () => void;
}

export const SoilScannerPage: React.FC<SoilScannerPageProps> = ({ onRegisterLandClick }) => {
  const [activeDiagnosticMode, setActiveDiagnosticMode] = useState<'soil' | 'water' | 'kaggle'>('soil');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Hero Header */}
      <div className="bg-[#2D4F1E] text-[#F4F1EA] rounded-3xl p-8 sm:p-12 shadow-2xl border border-[#C08261]/30 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#1F3814] rounded-full border border-[#C08261]/40 text-xs font-bold text-[#D89F80]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A359]" />
            <span>Ecological Computer Vision & Agronomic ML Suite</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#F4F1EA] tracking-tight">
            {activeDiagnosticMode === 'soil' 
              ? 'AI Soil Photo Detection & Health Card' 
              : activeDiagnosticMode === 'water' 
              ? 'AI Water Body Limnological Diagnostic'
              : 'Kaggle Trained Agricultural & Water Model'}
          </h1>

          <p className="text-sm sm:text-base text-[#F4F1EA]/85 leading-relaxed">
            {activeDiagnosticMode === 'soil'
              ? "Upload any soil photograph or field snapshot. Eden Sync's computer vision diagnostic classifies the soil condition into Dry, Clay, Healthy, or Heavy, calculates moisture indices, generates tailored agronomic restoration protocols, and creates an official 1-Click Downloadable Soil Health Card (PDF)."
              : activeDiagnosticMode === 'water'
              ? "Upload photos of your village pond, irrigation tank, lake, or drainage canal. Eden Sync's limnological vision engine detects Algal Blooms, Turbidity & Silt, Chemical / Oil Slicks, Sewage Inflow, or Pristine Water, computing Water Quality Index (WQI) and floating wetland bio-remediation."
              : "Trained on Kaggle's bhadramohit/agriculture-and-farming-dataset. Simulates crop yields, water footprints (m³), and irrigation efficiencies across 50 real farms, correlating visual soil types (Clay, Loamy, Peaty, Silty, Sandy) with machine learning benchmarks."}
          </p>

          {/* Mode Switcher Tabs */}
          <div className="pt-2 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveDiagnosticMode('soil')}
              className={`h-10 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all inline-flex items-center space-x-2 cursor-pointer shadow-md active:scale-95 ${
                activeDiagnosticMode === 'soil'
                  ? 'bg-[#C08261] text-[#F4F1EA] border border-white/20'
                  : 'bg-[#1F3814]/80 text-[#F4F1EA]/80 hover:bg-[#1F3814] hover:text-[#F4F1EA]'
              }`}
            >
              <Sprout className="w-4 h-4 text-[#D89F80]" />
              <span>Soil AI Diagnostic & Health Card</span>
            </button>

            <button
              onClick={() => setActiveDiagnosticMode('water')}
              className={`h-10 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all inline-flex items-center space-x-2 cursor-pointer shadow-md active:scale-95 ${
                activeDiagnosticMode === 'water'
                  ? 'bg-[#38BDF8] text-[#1F3814] border border-white/20'
                  : 'bg-[#1F3814]/80 text-[#F4F1EA]/80 hover:bg-[#1F3814] hover:text-[#F4F1EA]'
              }`}
            >
              <Waves className="w-4 h-4 text-[#38BDF8]" />
              <span>Water Body Visual Diagnostic</span>
            </button>

            <button
              onClick={() => setActiveDiagnosticMode('kaggle')}
              className={`h-10 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all inline-flex items-center space-x-2 cursor-pointer shadow-md active:scale-95 ${
                activeDiagnosticMode === 'kaggle'
                  ? 'bg-[#D4A359] text-[#1F3814] border border-white/20 font-black'
                  : 'bg-[#1F3814]/80 text-[#F4F1EA]/80 hover:bg-[#1F3814] hover:text-[#F4F1EA]'
              }`}
            >
              <Database className="w-4 h-4 text-[#D4A359]" />
              <span>Kaggle ML Yield & Water Model</span>
            </button>
          </div>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none hidden lg:flex items-center justify-center">
          {activeDiagnosticMode === 'soil' ? (
            <Sprout className="w-96 h-96 text-[#F4F1EA]" />
          ) : activeDiagnosticMode === 'water' ? (
            <Waves className="w-96 h-96 text-[#F4F1EA]" />
          ) : (
            <Database className="w-96 h-96 text-[#F4F1EA]" />
          )}
        </div>
      </div>

      {/* Main Interactive Scanner Component */}
      <div>
        {activeDiagnosticMode === 'soil' ? (
          <SoilPhotoDetector
            title="Instant Soil Condition & Health Card Scanner"
            subtitle="Test with your own photo or click any sample soil condition below for immediate classification, 1-Click PDF Soil Health Card, and Kaggle ML Yield predictions."
            showUploadSection={true}
          />
        ) : activeDiagnosticMode === 'water' ? (
          <WaterPhotoDetector
            title="Instant Water Body & Limnological Scanner"
            subtitle="Upload a pond or canal snapshot to detect algal blooms, siltation, petroleum sheens, or sewage with bio-remediation protocols."
            showUploadSection={true}
          />
        ) : (
          <KaggleAgriIntelligence
            initialSoilType="Loamy"
            initialFarmArea={5}
          />
        )}
      </div>

      {/* Reference Guides Section */}
      {activeDiagnosticMode === 'soil' ? (
        /* 4 Soil Condition Categories Deep Dive */
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase text-[#C08261] tracking-wider">Classification Reference Guide</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D4F1E]">
              The 4 Primary Soil Conditions Explained
            </h2>
            <p className="text-xs text-[#2D4F1E]/80">
              Learn the visual indicators, physical attributes, and restorative techniques for each condition category.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* DRY */}
            <div className="bg-[#FAF8F5] p-6 rounded-3xl border-2 border-[#C08261]/40 shadow-md space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#C08261] text-[#F4F1EA] flex items-center justify-center shadow">
                  <Sun className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#C08261]/20 text-[#A06445] rounded-md">
                    Condition 01
                  </span>
                  <h3 className="text-lg font-serif font-bold text-[#2D4F1E] mt-1">Dry / Arid Soil</h3>
                </div>
                <p className="text-xs text-[#2D4F1E]/80 leading-relaxed">
                  Parched, moisture-deficit soil characterized by pale hues, deep polygonal shrinkage fissures, low organic carbon, and high evaporative loss.
                </p>
                <div className="bg-[#EFECE6] p-3 rounded-xl space-y-1 text-[11px] text-[#2D4F1E]">
                  <p className="font-bold text-[#C08261]">Key Rejuvenation:</p>
                  <p>• High-porosity Biochar micro-sponges</p>
                  <p>• 3-inch biomass straw mulch cover</p>
                  <p>• Rainwater harvesting contour swales</p>
                </div>
              </div>
            </div>

            {/* CLAY */}
            <div className="bg-[#FAF8F5] p-6 rounded-3xl border-2 border-[#A85A32]/40 shadow-md space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#A85A32] text-[#F4F1EA] flex items-center justify-center shadow">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#A85A32]/20 text-[#7D3E1E] rounded-md">
                    Condition 02
                  </span>
                  <h3 className="text-lg font-serif font-bold text-[#2D4F1E] mt-1">Dense Clay Soil</h3>
                </div>
                <p className="text-xs text-[#2D4F1E]/80 leading-relaxed">
                  Fine colloidal clay particles that form dense sticky clods when wet and rock-hard crusts when dry, causing root impedance and slow water infiltration.
                </p>
                <div className="bg-[#EFECE6] p-3 rounded-xl space-y-1 text-[11px] text-[#2D4F1E]">
                  <p className="font-bold text-[#A85A32]">Key Rejuvenation:</p>
                  <p>• Agricultural Gypsum (CaSO4) aggregation</p>
                  <p>• Daikon tillage radish deep root aeration</p>
                  <p>• Strict zero-wet-tillage conservation</p>
                </div>
              </div>
            </div>

            {/* HEALTHY */}
            <div className="bg-[#FAF8F5] p-6 rounded-3xl border-2 border-[#2D4F1E]/40 shadow-md space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#2D4F1E] text-[#F4F1EA] flex items-center justify-center shadow">
                  <Sprout className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#2D4F1E]/20 text-[#1F3814] rounded-md">
                    Condition 03
                  </span>
                  <h3 className="text-lg font-serif font-bold text-[#2D4F1E] mt-1">Healthy Fertile Loam</h3>
                </div>
                <p className="text-xs text-[#2D4F1E]/80 leading-relaxed">
                  Dark, spongy, crumbly topsoil rich in humus and mycorrhizae with ideal 35-50% field capacity moisture, thriving earthworm activity, and balanced pH.
                </p>
                <div className="bg-[#EFECE6] p-3 rounded-xl space-y-1 text-[11px] text-[#2D4F1E]">
                  <p className="font-bold text-[#2D4F1E]">Key Maintenance:</p>
                  <p>• Continuous multi-species cover cropping</p>
                  <p>• Compost tea & liquid vermiwash feeds</p>
                  <p>• Permanent no-till mycorrhizal shelter</p>
                </div>
              </div>
            </div>

            {/* HEAVY */}
            <div className="bg-[#FAF8F5] p-6 rounded-3xl border-2 border-[#3B6978]/40 shadow-md space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#3B6978] text-[#F4F1EA] flex items-center justify-center shadow">
                  <Droplets className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#3B6978]/20 text-[#20404C] rounded-md">
                    Condition 04
                  </span>
                  <h3 className="text-lg font-serif font-bold text-[#2D4F1E] mt-1">Heavy / Waterlogged</h3>
                </div>
                <p className="text-xs text-[#2D4F1E]/80 leading-relaxed">
                  Supersaturated colloidal silt and clay with poor hydraulic conductivity, anaerobic subsurface conditions, and surface water pooling risks.
                </p>
                <div className="bg-[#EFECE6] p-3 rounded-xl space-y-1 text-[11px] text-[#2D4F1E]">
                  <p className="font-bold text-[#3B6978]">Key Rejuvenation:</p>
                  <p>• Graded French drains & relief ditches</p>
                  <p>• Vetiver phytoremediation bio-rafts</p>
                  <p>• Coarse river sand & organic porosity</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      ) : (
        /* 5 Water Body Condition Categories Deep Dive */
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase text-[#38BDF8] tracking-wider">Limnological Reference Guide</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D4F1E]">
              The 5 Primary Water Body Conditions Explained
            </h2>
            <p className="text-xs text-[#2D4F1E]/80">
              Visual diagnostic signatures and environmental remediation protocols for freshwater ecosystems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            
            {/* ALGAL */}
            <div className="bg-[#FAF8F5] p-5 rounded-3xl border-2 border-emerald-600/30 shadow-md space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md">
                  Condition 01
                </span>
                <h3 className="text-base font-serif font-bold text-[#2D4F1E]">Algal Bloom</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Dense green pea-soup surface mat of cyanobacteria from fertilizer runoff. Causes night hypoxia and fish kills.
                </p>
              </div>
              <div className="bg-[#EFECE6] p-2.5 rounded-xl text-[11px] space-y-1">
                <p className="font-bold text-emerald-800">Remedy:</p>
                <p>• Floating Vetiver wetlands</p>
                <p>• Solar surface aerators</p>
              </div>
            </div>

            {/* TURBID */}
            <div className="bg-[#FAF8F5] p-5 rounded-3xl border-2 border-amber-600/30 shadow-md space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md">
                  Condition 02
                </span>
                <h3 className="text-base font-serif font-bold text-[#2D4F1E]">Turbid & Silt-Laden</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  High suspended colloidal sediment from bank erosion. Blocks sunlight penetration and chokes pond depth.
                </p>
              </div>
              <div className="bg-[#EFECE6] p-2.5 rounded-xl text-[11px] space-y-1">
                <p className="font-bold text-amber-800">Remedy:</p>
                <p>• Silt traps & check dams</p>
                <p>• Riparian vegetative buffer</p>
              </div>
            </div>

            {/* SHEEN */}
            <div className="bg-[#FAF8F5] p-5 rounded-3xl border-2 border-purple-600/30 shadow-md space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-purple-100 text-purple-800 rounded-md">
                  Condition 03
                </span>
                <h3 className="text-base font-serif font-bold text-[#2D4F1E]">Chemical / Oil Sheen</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Iridescent surface film from industrial runoff or vehicle wash. Chokes atmospheric gas exchange.
                </p>
              </div>
              <div className="bg-[#EFECE6] p-2.5 rounded-xl text-[11px] space-y-1">
                <p className="font-bold text-purple-800">Remedy:</p>
                <p>• Oleophilic absorbent booms</p>
                <p>• Hydrocarbon bio-digesters</p>
              </div>
            </div>

            {/* CLEAR */}
            <div className="bg-[#FAF8F5] p-5 rounded-3xl border-2 border-sky-600/30 shadow-md space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-sky-100 text-sky-800 rounded-md">
                  Condition 04
                </span>
                <h3 className="text-base font-serif font-bold text-[#2D4F1E]">Pristine Freshwater</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Clear, odor-free water with submerged aquatic flora, balanced dissolved oxygen, and thriving fish ecology.
                </p>
              </div>
              <div className="bg-[#EFECE6] p-2.5 rounded-xl text-[11px] space-y-1">
                <p className="font-bold text-sky-800">Maintenance:</p>
                <p>• Catchment protection zone</p>
                <p>• Native fingerling seeding</p>
              </div>
            </div>

            {/* SEWAGE */}
            <div className="bg-[#FAF8F5] p-5 rounded-3xl border-2 border-rose-600/30 shadow-md space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-rose-100 text-rose-800 rounded-md">
                  Condition 05
                </span>
                <h3 className="text-base font-serif font-bold text-[#2D4F1E]">Raw Sewage Inflow</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Greyish-black anaerobic wastewater with sulfide odor and dangerous coliform levels. Immediate hazard.
                </p>
              </div>
              <div className="bg-[#EFECE6] p-2.5 rounded-xl text-[11px] space-y-1">
                <p className="font-bold text-rose-800">Remedy:</p>
                <p>• Inflow diversion & baffle DEWATS</p>
                <p>• Effective Microorganisms (EM-1)</p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Call to Action: Register Land or Water Body */}
      <div className="bg-[#FAF8F5] rounded-3xl p-8 sm:p-10 border border-[#C08261]/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="space-y-2">
          <h3 className="text-2xl font-serif font-bold text-[#2D4F1E]">
            Ready to Enroll Your Land or Water Body for Full Restoration?
          </h3>
          <p className="text-xs sm:text-sm text-[#2D4F1E]/80 max-w-2xl">
            Register your agricultural parcel or waterbody with Eden Sync Revival to receive on-site chemical testing, verified inspection reports, and dedicated rejuvenation support.
          </p>
        </div>

        <button
          type="button"
          onClick={onRegisterLandClick}
          className="h-12 px-6 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#F4F1EA] font-bold text-sm rounded-xl shadow-xl flex items-center space-x-2 shrink-0 transition-all active:scale-95 cursor-pointer"
        >
          <Sprout className="w-4 h-4 text-[#D89F80]" />
          <span>Register Land or Water Body</span>
          <ArrowRight className="w-4 h-4 text-[#F4F1EA]" />
        </button>
      </div>

    </div>
  );
};

