import React, { useState } from 'react';
import { 
  CloudRain, Sun, Flame, Wind, Globe, AlertTriangle, ThermometerSun, 
  Droplets, ShieldAlert, CheckCircle2, ChevronRight, Activity, 
  Layers, Compass, Info, Sprout, ArrowRight, Sparkles, Bug, Snowflake,
  Fish, History, BookOpen, Clock, BarChart3, ExternalLink
} from 'lucide-react';
import { 
  CLIMATE_REGION_IMPACTS, 
  ENSO_HISTORICAL_TIMELINE, 
  GLOBAL_CLIMATE_METRICS, 
  EL_NINO_AWARENESS_FACTS,
  CLIMATE_REAL_CASE_STUDIES,
  ENSO_BEFORE_VS_NOW
} from '../data/climateData';
import { ClimateRegionImpact, EnsoPhase, ClimateCaseStudy } from '../types';

export const ElNinoClimateHub: React.FC = () => {
  const [selectedContinent, setSelectedContinent] = useState<string>('All');
  const [activeRegionModal, setActiveRegionModal] = useState<ClimateRegionImpact | null>(null);
  const [selectedEnsoTab, setSelectedEnsoTab] = useState<'elnino' | 'lanina' | 'neutral'>('elnino');
  
  // Real Climate Case Studies State
  const [activeCaseStudy, setActiveCaseStudy] = useState<ClimateCaseStudy | null>(null);
  const [selectedCaseCategory, setSelectedCaseCategory] = useState<string>('All');
  const [historyTab, setHistoryTab] = useState<'timeline' | 'before-vs-now'>('timeline');
  
  // Interactive Simulator State
  const [simRegion, setSimRegion] = useState<string>('South Asia (Monsoon Zone)');
  const [simLandType, setSimLandType] = useState<string>('Agricultural Farmland');
  const [simWaterSource, setSimWaterSource] = useState<string>('Rainfed / Ground Wells');
  const [simResult, setSimResult] = useState<{
    droughtRiskScore: number;
    rainfallShiftPct: number;
    tempRise: string;
    vulnerabilityKey: string;
    tailoredActions: string[];
  } | null>(null);

  const continents = ['All', 'Asia', 'Africa', 'Americas', 'Europe', 'Oceania'];

  const filteredRegions = CLIMATE_REGION_IMPACTS.filter(r => {
    return selectedContinent === 'All' || r.continent === selectedContinent;
  });

  const handleRunSimulator = () => {
    let risk = 75;
    let rainfall = -28;
    let temp = '+1.8°C';
    let vuln = 'High soil desiccation and delayed monsoon rainfall leading to root scorch and deep aquifer depletion.';
    let actions = [
      'Apply 8-10 tons/acre of organic bio-mulch to reduce surface soil evaporation by up to 55%.',
      'Incorporate 5% biochar into topsoil to create permanent subterranean moisture sponges.',
      'Construct a 0.5-acre farm pond with silt traps to capture erratic high-intensity cloudbursts.',
      'Shift 40% of acreage to drought-hardy Millets (Pearl Millet / Finger Millet) or Sorghum.'
    ];

    if (simRegion.includes('East Africa') || simRegion.includes('South America (Peru)')) {
      risk = 88;
      rainfall = +140;
      temp = '+2.2°C';
      vuln = 'Torrential flash floods and extreme topsoil erosion stripping 2 to 4 inches of fertile humus layer.';
      actions = [
        'Build deep contour swales (bunds) across slopes to slow down and infiltrate torrential runoff.',
        'Plant Vetiver grass hedges along farm borders to mechanically arrest topsoil wash-off.',
        'Dig emergency diversion channels to direct storm overflows safely into recharge wells.',
        'Elevate crop seed nurseries and grain storage structures to prevent flood loss.'
      ];
    } else if (simRegion.includes('Southern Africa') || simRegion.includes('Australia')) {
      risk = 92;
      rainfall = -50;
      temp = '+2.8°C';
      vuln = 'Severe multi-month drought and bushfire atmospheric conditions with high livestock water stress.';
      actions = [
        'Adopt zero-tillage / minimum disturbance farming to conserve residual seedbed moisture.',
        'Implement sub-surface solar drip irrigation operating only during nocturnal cooler hours.',
        'Establish perimeter firebreaks and windbreaks with deep-root native tree species.',
        'Stockpile drought-resistant leguminous fodder crops (Cowpea, Stylo).'
      ];
    }

    setSimResult({
      droughtRiskScore: risk,
      rainfallShiftPct: rainfall,
      tempRise: temp,
      vulnerabilityKey: vuln,
      tailoredActions: actions
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Hero Awareness Banner */}
      <div className="bg-[#1F3814] text-[#F4F1EA] p-8 sm:p-12 rounded-3xl border border-[#C08261]/40 shadow-2xl relative overflow-hidden">
        
        {/* Background Accent Glow */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#C08261]/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-[#2D4F1E] rounded-full text-xs font-bold text-[#D89F80] border border-[#C08261]/30">
            <Globe className="w-3.5 h-3.5" />
            <span>Global Climate Observatory & ENSO Awareness Center</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight leading-tight">
            Understanding <span className="text-[#D89F80]">El Niño</span> & Global Climate Shifts
          </h1>

          <p className="text-xs sm:text-sm text-[#F4F1EA]/85 leading-relaxed">
            El Niño Southern Oscillation (ENSO) drives worldwide weather anomalies — triggering severe droughts, catastrophic downpours, and agricultural disruptions. Learn how to protect land, conserve water bodies, and adapt agricultural systems.
          </p>
        </div>

      </div>

      {/* Global Climate Telemetry Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#C08261]/20 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#2D4F1E]/70 uppercase tracking-wider">Current ENSO Status</span>
            <ThermometerSun className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-xl font-serif font-extrabold text-[#2D4F1E]">{GLOBAL_CLIMATE_METRICS.currentEnsoPhase.split('(')[0]}</p>
          <p className="text-[11px] font-semibold text-[#C08261]">ONI Index: +{GLOBAL_CLIMATE_METRICS.currentOniValue}°C</p>
        </div>

        <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#C08261]/20 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#2D4F1E]/70 uppercase tracking-wider">Pacific SST Anomaly</span>
            <Flame className="w-4 h-4 text-orange-600" />
          </div>
          <p className="text-xl font-serif font-extrabold text-[#2D4F1E]">+1.6°C</p>
          <p className="text-[11px] font-semibold text-[#2D4F1E]/80">Niño 3.4 Key Equatorial Zone</p>
        </div>

        <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#C08261]/20 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#2D4F1E]/70 uppercase tracking-wider">Global Mean Temp Rise</span>
            <Activity className="w-4 h-4 text-red-600" />
          </div>
          <p className="text-xl font-serif font-extrabold text-[#2D4F1E]">+1.48°C</p>
          <p className="text-[11px] font-semibold text-red-700">Above 1850–1900 Baseline</p>
        </div>

        <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#C08261]/20 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#2D4F1E]/70 uppercase tracking-wider">Atmospheric CO₂</span>
            <Wind className="w-4 h-4 text-teal-700" />
          </div>
          <p className="text-xl font-serif font-extrabold text-[#2D4F1E]">{GLOBAL_CLIMATE_METRICS.atmosphericCO2Ppm} ppm</p>
          <p className="text-[11px] font-semibold text-emerald-800">Mauna Loa Observatory</p>
        </div>

      </div>

      {/* ENSO Phenomenon Science Explainer (Interactive Tabs) */}
      <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-3xl border border-[#C08261]/20 shadow-lg space-y-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#2D4F1E]/10 pb-4">
          <div>
            <span className="text-[10px] font-bold text-[#C08261] uppercase tracking-wider">The Ocean-Atmosphere Engine</span>
            <h2 className="text-2xl font-serif font-bold text-[#2D4F1E]">How the ENSO Cycle Alters Worldwide Weather</h2>
          </div>

          <div className="flex items-center bg-[#EFECE6] p-1 rounded-2xl border border-[#2D4F1E]/20 shrink-0">
            <button
              onClick={() => setSelectedEnsoTab('elnino')}
              className={`h-9 px-4 text-xs font-bold rounded-xl inline-flex items-center justify-center space-x-1.5 transition-all ${
                selectedEnsoTab === 'elnino'
                  ? 'bg-[#C08261] text-[#F4F1EA] shadow-md'
                  : 'text-[#2D4F1E]/80 hover:text-[#2D4F1E]'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>El Niño (Warm)</span>
            </button>

            <button
              onClick={() => setSelectedEnsoTab('lanina')}
              className={`h-9 px-4 text-xs font-bold rounded-xl inline-flex items-center justify-center space-x-1.5 transition-all ${
                selectedEnsoTab === 'lanina'
                  ? 'bg-[#2D4F1E] text-[#F4F1EA] shadow-md'
                  : 'text-[#2D4F1E]/80 hover:text-[#2D4F1E]'
              }`}
            >
              <CloudRain className="w-3.5 h-3.5" />
              <span>La Niña (Cool)</span>
            </button>

            <button
              onClick={() => setSelectedEnsoTab('neutral')}
              className={`h-9 px-4 text-xs font-bold rounded-xl inline-flex items-center justify-center space-x-1.5 transition-all ${
                selectedEnsoTab === 'neutral'
                  ? 'bg-[#2D4F1E] text-[#F4F1EA] shadow-md'
                  : 'text-[#2D4F1E]/80 hover:text-[#2D4F1E]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Neutral / Normal</span>
            </button>
          </div>
        </div>

        {/* Dynamic Tab Description */}
        {selectedEnsoTab === 'elnino' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-3">
              <div className="inline-block px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-lg">
                Phase Characteristics: Weakened Trade Winds • Warm Water Surges Eastward
              </div>
              <h3 className="text-lg font-serif font-bold text-[#2D4F1E]">
                What Happens During El Niño?
              </h3>
              <p className="text-xs sm:text-sm text-[#2D4F1E]/90 leading-relaxed">
                During El Niño, the typical easterly trade winds blowing across the tropical Pacific weaken or reverse. This allows a massive pool of warm ocean surface water to slosh eastward from the Western Pacific (near Indonesia/Australia) toward South America.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 bg-[#EFECE6] rounded-xl border border-[#2D4F1E]/10 space-y-1">
                  <p className="text-xs font-bold text-red-800 flex items-center space-x-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Drought & Heat Regions:</span>
                  </p>
                  <p className="text-xs text-[#2D4F1E]/80">
                    India (weakened monsoons), Indonesia, Australia, Southern Africa, Northern Brazil.
                  </p>
                </div>

                <div className="p-3.5 bg-[#EFECE6] rounded-xl border border-[#2D4F1E]/10 space-y-1">
                  <p className="text-xs font-bold text-blue-800 flex items-center space-x-1">
                    <CloudRain className="w-3.5 h-3.5" />
                    <span>Extreme Flood Regions:</span>
                  </p>
                  <p className="text-xs text-[#2D4F1E]/80">
                    Coastal Peru/Ecuador, East Africa (Kenya/Somalia), Southern US / California storms.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#2D4F1E] text-[#F4F1EA] rounded-2xl border border-[#C08261]/30 space-y-3">
              <span className="text-[10px] font-bold uppercase text-[#D89F80] tracking-wider">Land & Water Alert</span>
              <h4 className="text-base font-serif font-bold">Farmland Vulnerability</h4>
              <p className="text-xs text-[#F4F1EA]/80 leading-relaxed">
                Topsoil loses moisture 40% faster due to higher evaporative demand. Without biochar or mulch cover, rainfed soils crack and lose beneficial microbial consortia.
              </p>
              <div className="pt-2 border-t border-[#C08261]/20 flex items-center justify-between text-xs text-[#D89F80] font-bold">
                <span>Recommended Action:</span>
                <span>Water Banking & Mulch</span>
              </div>
            </div>
          </div>
        )}

        {selectedEnsoTab === 'lanina' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-3">
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-900 text-xs font-bold rounded-lg">
                Phase Characteristics: Strengthened Trade Winds • Intense Cold Upwelling along South America
              </div>
              <h3 className="text-lg font-serif font-bold text-[#2D4F1E]">
                What Happens During La Niña?
              </h3>
              <p className="text-xs sm:text-sm text-[#2D4F1E]/90 leading-relaxed">
                During La Niña, trade winds become exceptionally powerful, pushing warm water far into the western Pacific. Cold, deep water rises to the surface in the eastern Pacific, causing the opposite global climate impacts.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 bg-[#EFECE6] rounded-xl border border-[#2D4F1E]/10 space-y-1">
                  <p className="text-xs font-bold text-blue-800 flex items-center space-x-1">
                    <CloudRain className="w-3.5 h-3.5" />
                    <span>Heavy Rain & Flooding:</span>
                  </p>
                  <p className="text-xs text-[#2D4F1E]/80">
                    Eastern Australia, Indonesia, South Asia (heavy monsoons), Southern Africa.
                  </p>
                </div>

                <div className="p-3.5 bg-[#EFECE6] rounded-xl border border-[#2D4F1E]/10 space-y-1">
                  <p className="text-xs font-bold text-red-800 flex items-center space-x-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Prolonged Drought:</span>
                  </p>
                  <p className="text-xs text-[#2D4F1E]/80">
                    Horn of Africa, US Southwest / Texas, coastal Peru/Chile (arid cold).
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#1F3814] text-[#F4F1EA] rounded-2xl border border-[#C08261]/30 space-y-3">
              <span className="text-[10px] font-bold uppercase text-[#D89F80] tracking-wider">Land & Water Alert</span>
              <h4 className="text-base font-serif font-bold">Flood & Silt Management</h4>
              <p className="text-xs text-[#F4F1EA]/80 leading-relaxed">
                Excess rainfall causes soil waterlogging and washes massive silt into lakes. Pre-monsoon pond de-silting and vegetative bio-swales are vital.
              </p>
              <div className="pt-2 border-t border-[#C08261]/20 flex items-center justify-between text-xs text-[#D89F80] font-bold">
                <span>Recommended Action:</span>
                <span>De-silting & Infiltration</span>
              </div>
            </div>
          </div>
        )}

        {selectedEnsoTab === 'neutral' && (
          <div className="p-6 bg-[#EFECE6] rounded-2xl border border-[#2D4F1E]/10 space-y-2 text-xs text-[#2D4F1E]">
            <h4 className="text-sm font-bold text-[#2D4F1E]">ENSO Neutral (Standard Baseline)</h4>
            <p className="leading-relaxed text-[#2D4F1E]/90">
              During neutral conditions, sea surface temperatures across the equatorial Pacific remain close to the long-term average (within ±0.5°C). Normal seasonal monsoon patterns and trade winds prevail, though localized climate shifts still occur due to Indian Ocean Dipole (IOD) and Atlantic Multi-decadal Oscillation (AMO).
            </p>
          </div>
        )}

      </div>

      {/* Global Regional Impact Navigator */}
      <div className="space-y-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-[#C08261] uppercase tracking-wider">Worldwide Impact Explorer</span>
            <h2 className="text-2xl font-serif font-bold text-[#2D4F1E]">
              Regional Climate Shifts Across Continents
            </h2>
            <p className="text-xs text-[#2D4F1E]/70">Explore specific temperature anomalies, rainfall deficits, and tailored ecological interventions by continent.</p>
          </div>

          {/* Continent Filter Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 max-w-full">
            {continents.map(cont => (
              <button
                key={cont}
                onClick={() => setSelectedContinent(cont)}
                className={`h-8 px-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedContinent === cont
                    ? 'bg-[#2D4F1E] text-[#F4F1EA] shadow-sm'
                    : 'bg-[#FAF8F5] text-[#2D4F1E] border border-[#2D4F1E]/20 hover:bg-[#EFECE6]'
                }`}
              >
                {cont}
              </button>
            ))}
          </div>
        </div>

        {/* Region Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRegions.map((region) => (
            <div
              key={region.id}
              className="bg-[#FAF8F5] rounded-3xl border border-[#C08261]/20 p-6 shadow-md hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 bg-[#2D4F1E]/10 text-[#2D4F1E] text-[10px] font-bold uppercase rounded-md mb-1">
                      {region.continent}
                    </span>
                    <h3 className="text-base font-serif font-bold text-[#2D4F1E] group-hover:text-[#C08261] transition-colors leading-tight">
                      {region.regionName}
                    </h3>
                  </div>

                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-lg shrink-0 ${
                    region.severity === 'Critical' ? 'bg-red-100 text-red-800 border border-red-300' :
                    region.severity === 'High' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {region.severity} Risk
                  </span>
                </div>

                {/* Anomalies Meter */}
                <div className="grid grid-cols-2 gap-2 bg-[#EFECE6] p-3 rounded-2xl border border-[#2D4F1E]/10 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-[#2D4F1E]/60 uppercase block">Temp Anomaly</span>
                    <span className="font-bold text-red-700 text-[11px]">{region.temperatureAnomaly}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#2D4F1E]/60 uppercase block">Precipitation Shift</span>
                    <span className="font-bold text-blue-800 text-[11px]">{region.precipitationShift}</span>
                  </div>
                </div>

                {/* Primary Vulnerability */}
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-[#2D4F1E]/60 uppercase">Primary Vulnerability</p>
                  <p className="text-xs text-[#2D4F1E]/90 line-clamp-2 leading-relaxed">
                    {region.primaryVulnerability}
                  </p>
                </div>

                {/* Crops at Risk */}
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-[#C08261] uppercase">Vulnerable Crops & Resources:</p>
                  <div className="flex flex-wrap gap-1">
                    {region.affectedCrops.map((c, i) => (
                      <span key={i} className="px-2 py-0.5 bg-[#FAF8F5] border border-[#2D4F1E]/15 text-[10px] font-medium text-[#2D4F1E] rounded-md">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Card Footer Button */}
              <div className="pt-3 border-t border-[#2D4F1E]/10">
                <button
                  onClick={() => setActiveRegionModal(region)}
                  className="w-full h-9 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#F4F1EA] font-bold text-xs rounded-xl inline-flex items-center justify-center space-x-1.5 transition-transform active:scale-95 shadow-sm"
                >
                  <span>Explore Action Blueprint</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive Landowner Climate Risk Simulator */}
      <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-3xl border border-[#C08261]/30 shadow-xl space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#2D4F1E] text-[#D89F80] rounded-2xl flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-serif font-bold text-[#2D4F1E]">
              Interactive Land & Crop Climate Shift Simulator
            </h3>
            <p className="text-xs text-[#2D4F1E]/70">Select your geographical eco-zone and farm parameters to calculate projected El Niño impact & generate adaptive soil/water steps.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-1.5">1. Geographical Eco-Zone</label>
            <select
              value={simRegion}
              onChange={(e) => setSimRegion(e.target.value)}
              className="w-full h-10 px-3 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-semibold text-[#2D4F1E] focus:outline-none focus:ring-2 focus:ring-[#C08261]"
            >
              <option value="South Asia (Monsoon Zone)">South Asia (India, Bangladesh, Pakistan)</option>
              <option value="Southeast Asia (Equatorial Zone)">Southeast Asia (Indonesia, Vietnam, Thailand)</option>
              <option value="East Africa (Rift Valley / Horn)">East Africa (Kenya, Ethiopia, Somalia)</option>
              <option value="Southern Africa (Drought Belt)">Southern Africa (Zimbabwe, South Africa)</option>
              <option value="South America (Peru Coastal Zone)">South America (Peru / Ecuador)</option>
              <option value="North America (California / Southwest)">North America (California / Southwest)</option>
              <option value="Australia (Murray-Darling Basin)">Australia (Murray-Darling Basin)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-1.5">2. Land & Soil Classification</label>
            <select
              value={simLandType}
              onChange={(e) => setSimLandType(e.target.value)}
              className="w-full h-10 px-3 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-semibold text-[#2D4F1E] focus:outline-none focus:ring-2 focus:ring-[#C08261]"
            >
              <option value="Agricultural Farmland">Agricultural Farmland (Intensive Crop)</option>
              <option value="Pond / Water Body">Pond / Lake Catchment Zone</option>
              <option value="Barren / Fallow Land">Barren / Arid Fallow Land</option>
              <option value="River Bank / Coastal">River Bank / Coastal Estuary</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-1.5">3. Water Supply Source</label>
            <select
              value={simWaterSource}
              onChange={(e) => setSimWaterSource(e.target.value)}
              className="w-full h-10 px-3 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-semibold text-[#2D4F1E] focus:outline-none focus:ring-2 focus:ring-[#C08261]"
            >
              <option value="Rainfed / Ground Wells">Rainfed & Shallow Borewells</option>
              <option value="Canal Irrigation Network">Canal Irrigation Reservoir Network</option>
              <option value="Farm Pond Storage">Dedicated On-Farm Pond Storage</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
          <button
            onClick={handleRunSimulator}
            className="h-11 px-6 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#F4F1EA] font-bold text-xs rounded-xl shadow-md inline-flex items-center justify-center space-x-2 shrink-0 active:scale-95 transition-transform"
          >
            <Activity className="w-4 h-4 text-[#D89F80]" />
            <span>Simulate Climate Impact & Generate Plan</span>
          </button>

          {simResult && (
            <div className="flex-1 bg-[#EFECE6] p-4 rounded-2xl border border-[#2D4F1E]/20 text-xs text-[#2D4F1E] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold uppercase text-[10px] text-[#2D4F1E]/70">Simulation Output</span>
                <span className="px-2.5 py-0.5 bg-[#C08261] text-[#F4F1EA] text-[10px] font-bold rounded-full">
                  Risk Level: {simResult.droughtRiskScore}/100 • Temp Anomaly: {simResult.tempRise}
                </span>
              </div>
              <p className="font-medium text-xs">{simResult.vulnerabilityKey}</p>
              
              <div className="space-y-1 pt-1">
                <p className="text-[10px] font-bold uppercase text-[#C08261]">Prescribed Climate Adaptation Steps:</p>
                <ul className="space-y-1 text-xs">
                  {simResult.tailoredActions.map((act, i) => (
                    <li key={i} className="flex items-start space-x-1.5">
                      <span className="text-[#2D4F1E] font-bold">•</span>
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Real-World Climate & Ecological Case Studies Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 bg-[#2D4F1E]/10 text-[#2D4F1E] rounded-full text-[10px] font-bold uppercase tracking-wider mb-1">
              <BookOpen className="w-3.5 h-3.5 text-[#C08261]" />
              <span>Grounded Scientific Field Studies</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#2D4F1E]">
              Real-World Climate Case Studies & Planetary Shifts
            </h2>
            <p className="text-xs text-[#2D4F1E]/70">
              Examining empirical phenological mismatches, dairy herd hyperthermia, cryosphere basal ablation, and marine collapses.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 max-w-full">
            {['All', 'Biodiversity & Phenology', 'Livestock & Agriculture', 'Cryosphere & Glaciology', 'Marine Ecosystems', 'Food Security & Prices'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCaseCategory(cat)}
                className={`h-8 px-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCaseCategory === cat
                    ? 'bg-[#2D4F1E] text-[#F4F1EA] shadow-sm'
                    : 'bg-[#FAF8F5] text-[#2D4F1E] border border-[#2D4F1E]/20 hover:bg-[#EFECE6]'
                }`}
              >
                {cat === 'Biodiversity & Phenology' ? '🦋 Biodiversity' :
                 cat === 'Livestock & Agriculture' ? '🐄 Dairy & Cattle' :
                 cat === 'Cryosphere & Glaciology' ? '🧊 Ice Sheet Melt' :
                 cat === 'Marine Ecosystems' ? '🐟 Marine Collapse' :
                 cat === 'Food Security & Prices' ? '🫒 Food Prices' : 'All Case Studies (6)'}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLIMATE_REAL_CASE_STUDIES
            .filter(c => selectedCaseCategory === 'All' || c.category === selectedCaseCategory)
            .map((study) => (
              <div
                key={study.id}
                className="bg-[#FAF8F5] rounded-3xl border border-[#C08261]/25 p-6 shadow-md hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2.5 py-0.5 bg-[#2D4F1E]/10 text-[#2D4F1E] text-[10px] font-bold uppercase rounded-md">
                      {study.category}
                    </span>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-lg shrink-0 ${
                      study.severityLevel.includes('Severe Tipping') ? 'bg-red-100 text-red-900 border border-red-300' :
                      study.severityLevel.includes('High Economic') ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                      'bg-blue-100 text-blue-900 border border-blue-200'
                    }`}>
                      {study.severityLevel}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-serif font-bold text-[#2D4F1E] leading-snug">
                      {study.title}
                    </h3>
                    <p className="text-[11px] font-semibold text-[#C08261] mt-0.5 line-clamp-1">
                      {study.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-[#2D4F1E]/80 line-clamp-3 leading-relaxed">
                    {study.phenomenon}
                  </p>

                  {/* Scientific Data Highlights */}
                  <div className="grid grid-cols-2 gap-2 bg-[#EFECE6] p-3 rounded-2xl border border-[#2D4F1E]/10 text-xs">
                    <div>
                      <span className="text-[9px] font-bold uppercase text-[#2D4F1E]/60 block line-clamp-1">
                        {study.scientificData[0].label}
                      </span>
                      <span className="font-bold text-red-700 text-xs">
                        {study.scientificData[0].value}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold uppercase text-[#2D4F1E]/60 block line-clamp-1">
                        {study.scientificData[1].label}
                      </span>
                      <span className="font-bold text-blue-800 text-xs">
                        {study.scientificData[1].value}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#2D4F1E]/10">
                  <button
                    onClick={() => setActiveCaseStudy(study)}
                    className="w-full h-9 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#F4F1EA] font-bold text-xs rounded-xl inline-flex items-center justify-center space-x-1.5 transition-transform active:scale-95 shadow-sm cursor-pointer"
                  >
                    <span>Read Field Study & Actions</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Historical Super El Niño Timeline & Before vs Now Matrix */}
      <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-3xl border border-[#C08261]/20 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#2D4F1E]/10 pb-4">
          <div>
            <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-[#C08261]/15 text-[#C08261] text-[10px] font-bold uppercase rounded-md mb-1">
              <History className="w-3 h-3" />
              <span>Historical Paleoclimate Telemetry</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2D4F1E]">
              El Niño History: Then (Pre-Industrial) vs. Now (Supercharged Era)
            </h3>
            <p className="text-xs text-[#2D4F1E]/70">
              Tracking how thermodynamic global warming accelerates ENSO intensity and societal disruption across centuries.
            </p>
          </div>

          <div className="flex items-center bg-[#EFECE6] p-1 rounded-2xl border border-[#2D4F1E]/20 shrink-0">
            <button
              onClick={() => setHistoryTab('timeline')}
              className={`h-8 px-3 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                historyTab === 'timeline' ? 'bg-[#2D4F1E] text-[#F4F1EA]' : 'text-[#2D4F1E]/75 hover:text-[#2D4F1E]'
              }`}
            >
              Historical Timeline (1789–2026)
            </button>
            <button
              onClick={() => setHistoryTab('before-vs-now')}
              className={`h-8 px-3 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                historyTab === 'before-vs-now' ? 'bg-[#2D4F1E] text-[#F4F1EA]' : 'text-[#2D4F1E]/75 hover:text-[#2D4F1E]'
              }`}
            >
              Then vs. Now Comparison
            </button>
          </div>
        </div>

        {historyTab === 'timeline' ? (
          <div className="space-y-4">
            {ENSO_HISTORICAL_TIMELINE.map((item, idx) => (
              <div key={idx} className="p-4 sm:p-5 bg-[#EFECE6] rounded-2xl border border-[#2D4F1E]/10 space-y-2 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-[#2D4F1E] font-serif">{item.year}</span>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${
                      item.classification.includes('Very Strong') ? 'bg-red-100 text-red-900 border border-red-300' :
                      item.classification.includes('Strong La Niña') ? 'bg-blue-100 text-blue-900' : 'bg-amber-100 text-amber-900'
                    }`}>
                      {item.classification} (Peak: {item.oniPeak > 0 ? `+${item.oniPeak}` : item.oniPeak}°C)
                    </span>
                  </div>

                  <span className="text-[11px] font-mono font-bold text-[#2D4F1E]/70 bg-[#FAF8F5] px-2.5 py-1 rounded-lg border border-[#2D4F1E]/15 shrink-0 self-start sm:self-auto">
                    ONI Peak {item.oniPeak > 0 ? `+${item.oniPeak}` : item.oniPeak}°C
                  </span>
                </div>

                <p className="text-xs text-[#2D4F1E]/90 leading-relaxed font-medium">
                  {item.globalImpactNote}
                </p>

                {item.humanSocietalImpact && (
                  <div className="p-2.5 bg-[#FAF8F5] rounded-xl border border-red-200/60 text-xs text-[#2D4F1E]">
                    <span className="font-bold text-red-800 uppercase text-[10px] block mb-0.5">Societal & Geopolitical Impact:</span>
                    <p className="text-[11px] text-[#2D4F1E]/85 leading-relaxed">{item.humanSocietalImpact}</p>
                  </div>
                )}

                {item.paleoClimateEvidence && (
                  <p className="text-[10px] text-[#2D4F1E]/60 italic">
                    <span className="font-semibold text-[#C08261]">Scientific Verification:</span> {item.paleoClimateEvidence}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#2D4F1E] text-[#F4F1EA]">
                  <th className="p-3.5 rounded-tl-xl font-serif font-bold">Climate Parameter</th>
                  <th className="p-3.5 font-serif font-bold">Pre-Industrial Baseline (Before)</th>
                  <th className="p-3.5 font-serif font-bold">Supercharged Modern Era (Now)</th>
                  <th className="p-3.5 font-serif font-bold">Amplifying Mechanism</th>
                  <th className="p-3.5 rounded-tr-xl font-serif font-bold">Ecological Consequence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2D4F1E]/10 bg-[#FAF8F5]">
                {ENSO_BEFORE_VS_NOW.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#EFECE6]/75 transition-colors">
                    <td className="p-3.5 font-bold text-[#2D4F1E] align-top whitespace-nowrap">
                      {row.parameter}
                    </td>
                    <td className="p-3.5 text-[#2D4F1E]/80 align-top max-w-[200px] leading-relaxed">
                      {row.preIndustrial}
                    </td>
                    <td className="p-3.5 text-red-900 font-semibold align-top max-w-[220px] leading-relaxed bg-red-50/50">
                      {row.modernEra}
                    </td>
                    <td className="p-3.5 text-[#C08261] font-medium align-top max-w-[200px] leading-relaxed">
                      {row.amplifyingFactor}
                    </td>
                    <td className="p-3.5 text-[#2D4F1E]/90 align-top max-w-[220px] leading-relaxed">
                      {row.ecologicalConsequence}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Nature-based Climate Resilience Deep-Dive Cards */}
      <div className="space-y-6">
        <div>
          <span className="text-[10px] font-bold text-[#C08261] uppercase tracking-wider">Farmer Survival Guide</span>
          <h3 className="text-2xl font-serif font-bold text-[#2D4F1E]">
            Building Climate-Proof Land & Water Ecosystems
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EL_NINO_AWARENESS_FACTS.map((fact, idx) => (
            <div key={idx} className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#C08261]/20 shadow-md space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-[#2D4F1E] text-[#D89F80] flex items-center justify-center font-bold text-xs">
                  0{idx + 1}
                </div>
                <h4 className="text-base font-serif font-bold text-[#2D4F1E]">{fact.title}</h4>
              </div>
              <p className="text-xs font-semibold text-[#C08261]">{fact.summary}</p>
              <p className="text-xs text-[#2D4F1E]/80 leading-relaxed">{fact.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Region Action Detail Modal */}
      {activeRegionModal && (
        <div className="fixed inset-0 z-50 bg-[#1F3814]/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6 border border-[#C08261]/30">
            
            <div className="flex items-start justify-between border-b border-[#2D4F1E]/10 pb-3">
              <div>
                <span className="px-2.5 py-0.5 bg-[#2D4F1E] text-[#D89F80] text-[10px] font-bold uppercase rounded-md">
                  {activeRegionModal.continent} • {activeRegionModal.severity} Risk
                </span>
                <h2 className="text-2xl font-serif font-bold text-[#2D4F1E] mt-1">
                  {activeRegionModal.regionName}
                </h2>
              </div>

              <button
                onClick={() => setActiveRegionModal(null)}
                className="h-8 px-3 bg-[#EFECE6] text-[#2D4F1E] font-bold text-xs rounded-xl"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-[#EFECE6] p-4 rounded-2xl border border-[#2D4F1E]/10 text-xs">
              <div>
                <span className="text-[10px] font-bold text-[#2D4F1E]/60 uppercase block">Temperature Anomaly</span>
                <span className="font-bold text-red-700">{activeRegionModal.temperatureAnomaly}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#2D4F1E]/60 uppercase block">Precipitation Deviation</span>
                <span className="font-bold text-blue-800">{activeRegionModal.precipitationShift}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-[#2D4F1E]">
              <h4 className="font-bold uppercase text-[10px] text-[#2D4F1E]/60">Ecological Vulnerability Analysis</h4>
              <p className="p-3 bg-[#EFECE6] rounded-xl border border-[#2D4F1E]/10 leading-relaxed">
                {activeRegionModal.primaryVulnerability}
              </p>
            </div>

            <div className="space-y-2 text-xs text-[#2D4F1E]">
              <h4 className="font-bold uppercase text-[10px] text-[#2D4F1E]/60">Water Body & Aquifer Stress</h4>
              <p className="p-3 bg-[#EFECE6] rounded-xl border border-[#2D4F1E]/10 leading-relaxed">
                {activeRegionModal.waterBodyStress}
              </p>
            </div>

            <div className="p-4 bg-[#2D4F1E] text-[#F4F1EA] rounded-2xl border border-[#C08261]/30 space-y-2">
              <h4 className="font-bold uppercase text-xs text-[#D89F80] flex items-center space-x-1.5">
                <Sprout className="w-4 h-4" />
                <span>Actionable On-Field Ecological Intervention Blueprint</span>
              </h4>
              <p className="text-xs text-[#F4F1EA]/90 leading-relaxed">
                {activeRegionModal.actionableIntervention}
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveRegionModal(null)}
                className="h-10 px-6 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#F4F1EA] font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Climate Case Study Detail Modal */}
      {activeCaseStudy && (
        <div className="fixed inset-0 z-50 bg-[#1F3814]/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6 border border-[#C08261]/30 animate-fadeIn">
            
            <div className="flex items-start justify-between border-b border-[#2D4F1E]/10 pb-3">
              <div>
                <span className="px-2.5 py-0.5 bg-[#2D4F1E] text-[#D89F80] text-[10px] font-bold uppercase rounded-md">
                  {activeCaseStudy.category} • {activeCaseStudy.location}
                </span>
                <h2 className="text-2xl font-serif font-bold text-[#2D4F1E] mt-1">
                  {activeCaseStudy.title}
                </h2>
                <p className="text-xs font-semibold text-[#C08261]">
                  {activeCaseStudy.subtitle} • Period: {activeCaseStudy.timeframe}
                </p>
              </div>

              <button
                onClick={() => setActiveCaseStudy(null)}
                className="h-8 px-3 bg-[#EFECE6] text-[#2D4F1E] font-bold text-xs rounded-xl hover:bg-[#E2DED7] cursor-pointer"
              >
                Close
              </button>
            </div>

            {/* Phenomenon Overview */}
            <div className="space-y-1.5">
              <h4 className="text-[10px] font-bold uppercase text-[#2D4F1E]/60 tracking-wider">Observed Phenomenon & Crisis Overview</h4>
              <p className="p-3.5 bg-[#EFECE6] rounded-2xl border border-[#2D4F1E]/10 text-xs text-[#2D4F1E] leading-relaxed">
                {activeCaseStudy.phenomenon}
              </p>
            </div>

            {/* Key Scientific Data & Metrics Grid */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold uppercase text-[#C08261] tracking-wider">Empirical Measurements & Data Log</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeCaseStudy.scientificData.map((dataPoint, idx) => (
                  <div key={idx} className="p-3 bg-[#EFECE6] rounded-xl border border-[#2D4F1E]/10 space-y-1">
                    <span className="text-[10px] font-bold text-[#2D4F1E]/60 uppercase block leading-tight">{dataPoint.label}</span>
                    <span className="text-sm font-bold text-[#2D4F1E] block font-mono">{dataPoint.value}</span>
                    {dataPoint.source && (
                      <span className="text-[9px] text-[#2D4F1E]/50 italic block">{dataPoint.source}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Biophysical / Thermodynamic Mechanism */}
            <div className="space-y-1.5">
              <h4 className="text-[10px] font-bold uppercase text-red-800 tracking-wider">Underlying Physical & Biological Mechanism</h4>
              <div className="p-3.5 bg-red-50/60 rounded-2xl border border-red-200/60 text-xs text-[#2D4F1E] leading-relaxed">
                {activeCaseStudy.mechanism}
              </div>
            </div>

            {/* Ecological Breakdown & Cascading Impacts */}
            <div className="space-y-1.5">
              <h4 className="text-[10px] font-bold uppercase text-amber-800 tracking-wider">Trophic & Socioeconomic Cascades</h4>
              <div className="p-3.5 bg-[#EFECE6] rounded-2xl border border-[#2D4F1E]/10 text-xs text-[#2D4F1E] leading-relaxed">
                {activeCaseStudy.ecologicalImpact}
              </div>
            </div>

            {/* Farmer / Ecosystem Action Blueprint */}
            <div className="p-4 bg-[#2D4F1E] text-[#F4F1EA] rounded-2xl border border-[#C08261]/30 space-y-2">
              <h4 className="text-xs font-bold uppercase text-[#D89F80] flex items-center space-x-1.5">
                <Sprout className="w-4 h-4" />
                <span>Field Mitigation & Practical Adaptation Blueprint</span>
              </h4>
              <p className="text-xs text-[#F4F1EA]/90 leading-relaxed">
                {activeCaseStudy.actionBlueprint}
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveCaseStudy(null)}
                className="h-10 px-6 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#F4F1EA] font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
