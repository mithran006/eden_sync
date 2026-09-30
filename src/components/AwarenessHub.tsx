import React, { useState } from 'react';
import { 
  BookOpen, 
  Droplets, 
  Sprout, 
  Search, 
  Lightbulb, 
  Check, 
  ChevronRight, 
  Activity, 
  HelpCircle,
  Calculator,
  FlaskConical,
  ShieldCheck,
  Volume2,
  VolumeX,
  Printer,
  Download,
  Sparkles,
  Layers,
  Trees,
  Compass,
  FileText,
  Share2,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Sliders,
  X,
  ArrowRight,
  Info,
  Clock,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Tag,
  Scale,
  Coins,
  Star,
  ThumbsUp
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AwarenessArticle } from '../types';
import { copyToClipboard } from '../utils/safeClipboard';
import { 
  EXTENDED_AWARENESS_ARTICLES, 
  INDIGENOUS_FIELD_RECIPES, 
  MYTHS_VS_SCIENCE, 
  BIO_FENCE_PLANS,
  FieldRecipe,
  MythVsScience,
  BioFenceSpeciesPlan
} from '../data/awarenessData';

interface AwarenessHubProps {
  articles?: AwarenessArticle[];
}

export const AwarenessHub: React.FC<AwarenessHubProps> = ({ articles = [] }) => {
  const { t, language } = useLanguage();

  // Combine props articles with our extensive dataset to guarantee a rich library
  const allArticles = articles && articles.length >= 6 
    ? articles 
    : EXTENDED_AWARENESS_ARTICLES;

  // 1-10 Rating State for Articles and Recipes
  const [ratingsMap, setRatingsMap] = useState<Record<string, { rating: number; count: number; userRated?: number }>>(() => {
    const map: Record<string, { rating: number; count: number; userRated?: number }> = {};
    // Seed initial realistic 10-point ratings for articles
    allArticles.forEach((art, i) => {
      const baseScores = [9.8, 9.6, 9.4, 9.9, 9.2, 9.5, 9.7, 9.3, 9.8, 9.6, 9.5, 9.7];
      map[`art-${art.id}`] = {
        rating: baseScores[i % baseScores.length],
        count: 140 + (i * 23) % 80
      };
    });
    // Seed initial realistic 10-point ratings for 20 recipes
    INDIGENOUS_FIELD_RECIPES.forEach((rec, i) => {
      const baseScores = [9.9, 9.8, 9.7, 9.6, 9.5, 9.8, 9.4, 9.6, 9.7, 9.9, 9.5, 9.8, 9.6, 9.7, 9.9, 9.4, 9.6, 9.8, 9.7, 9.9];
      map[`rec-${rec.id}`] = {
        rating: baseScores[i % baseScores.length],
        count: 210 + (i * 37) % 120
      };
    });
    return map;
  });

  const handleRateItem = (key: string, userScore: number) => {
    setRatingsMap(prev => {
      const current = prev[key] || { rating: 9.5, count: 50 };
      const alreadyRated = current.userRated !== undefined;
      const newCount = alreadyRated ? current.count : current.count + 1;
      const totalScore = (current.rating * current.count) + (alreadyRated ? (userScore - (current.userRated || 0)) : userScore);
      const newRating = Number((totalScore / newCount).toFixed(1));

      return {
        ...prev,
        [key]: {
          rating: Math.min(10, Math.max(1, newRating)),
          count: newCount,
          userRated: userScore
        }
      };
    });
  };

  // Active Main Tab
  const [activeMainTab, setActiveMainTab] = useState<'articles' | 'recipes' | 'calculators' | 'myths' | 'biofence'>('articles');

  // Article Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticleModal, setActiveArticleModal] = useState<AwarenessArticle | null>(null);

  // Natural Fertilizer / Bio-Recipes State (20 Formulations)
  const [recipeCategory, setRecipeCategory] = useState<string>('All');
  const [recipeSearchQuery, setRecipeSearchQuery] = useState<string>('');
  const [recipeScaleAcres, setRecipeScaleAcres] = useState<number>(1); // Scale multiplier for smallholder farmers (0.25, 0.5, 1, 2, 5)

  // Audio Voice Narrator State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioTopic, setAudioTopic] = useState('Overview of Soil Organic Carbon & Water Resilience');

  // Interactive Diagnostic Tool State
  const [soilType, setSoilType] = useState<string>('Hard Clay');
  const [waterSource, setWaterSource] = useState<string>('Tube Well Saline Water');
  const [yieldLoss, setYieldLoss] = useState<string>('20-40% Reduction');
  const [diagnosticResult, setDiagnosticResult] = useState<{ score: number; riskLevel: string; advice: string } | null>(null);

  // Calculator 1: Rainwater Pond Sizer State
  const [calcAcres, setCalcAcres] = useState<number>(3);
  const [calcRainfallMm, setCalcRainfallMm] = useState<number>(850);
  const [calcRunoffCoeff, setCalcRunoffCoeff] = useState<number>(0.35); // 0.2 to 0.6

  // Calculator 2: Bio-Input Dosage Estimator State
  const [calcSoilAcres, setCalcSoilAcres] = useState<number>(2);
  const [calcDegradationLevel, setCalcDegradationLevel] = useState<'mild' | 'moderate' | 'severe' | 'saline'>('moderate');

  // Recipe Detail Modal
  const [selectedRecipe, setSelectedRecipe] = useState<FieldRecipe | null>(null);

  // Copied Alert State for Sharing
  const [copiedShareItem, setCopiedShareItem] = useState<string | null>(null);

  const handleShareItem = async (title: string, summary: string, category: string) => {
    const shareText = `🌾 *Field Guide from Eden Sync Awareness Hub*\n\n📌 *${title}* (${category})\n\n${summary}\n\n🌿 Read full protocol & interactive calculators: ${window.location.origin}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: shareText,
          url: window.location.origin,
        });
        return;
      } catch {
        // Fallback to safe clipboard
      }
    }

    const copied = await copyToClipboard(shareText);
    if (copied) {
      setCopiedShareItem(title);
      setTimeout(() => setCopiedShareItem(null), 2500);
    }
  };

  // Selected Bio-Fence Plan
  const [selectedZoneIndex, setSelectedZoneIndex] = useState<number>(0);

  // Expanded Myth ID
  const [expandedMythId, setExpandedMythId] = useState<string | null>('MYTH-01');

  // Categories
  const categories = ['All', 'Soil Revival', 'Waterbodies', 'Agroecology', 'Rainwater Harvesting', 'Bio-fencing', 'Climate Adaptation'];

  const recipeCategories = [
    'All',
    'Microbial Soil Inoculant',
    'Growth Hormone Tonic',
    'Bio-Fungicide & Disease Shield',
    'Organic Pest Repellent',
    'Potassium & Calcium Booster',
    'Composting & Decomposition',
    'Carbon Sponge'
  ];

  const filteredRecipes = INDIGENOUS_FIELD_RECIPES.filter((rec) => {
    const matchesCat = recipeCategory === 'All' || rec.category === recipeCategory;
    const q = recipeSearchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      rec.name.toLowerCase().includes(q) ||
      rec.kannadaTamilName.toLowerCase().includes(q) ||
      rec.purpose.toLowerCase().includes(q) ||
      rec.category.toLowerCase().includes(q) ||
      rec.ingredients.some(ing => ing.item.toLowerCase().includes(q) || ing.role.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  });

  const filteredArticles = allArticles.filter((art) => {
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const runDiagnostic = () => {
    let score = 50;
    if (soilType === 'Hard Clay') score += 20;
    if (soilType === 'Arid Sandy') score += 15;
    if (soilType === 'Saline White Soil') score += 30;
    if (soilType === 'Waterlogged Bog') score += 18;
    if (waterSource === 'Tube Well Saline Water') score += 20;
    if (yieldLoss === 'Over 40% Reduction') score += 25;

    let riskLevel = 'Moderate Soil & Water Stress';
    let advice = 'Recommended: Inoculate green manure crops (Sesbania/Daincha), introduce agricultural gypsum conditioners, and establish silt trap swales for rainwater catchment.';

    if (score >= 80) {
      riskLevel = 'Severe Salinity & Topsoil Degradation';
      advice = 'Urgent Intervention Required: Deep bio-remediation using mycorrhizal fungi, sub-surface drainage installation, high-carbon biochar mulching, and immediate desilting of local percolation ponds.';
    } else if (score <= 40) {
      riskLevel = 'Mild Micronutrient Deficit';
      advice = 'Maintenance Guidance: Introduce crop rotation with leguminous pulses, apply 200L/acre Liquid Jeevamrutha, and construct a 1-acre farm pond for groundwater stability.';
    }

    setDiagnosticResult({ score: Math.min(100, score), riskLevel, advice });
  };

  // Calculations for Rainwater Pond
  const totalCatchmentLiters = Math.round(calcAcres * 4046.86 * (calcRainfallMm / 1000) * calcRunoffCoeff * 1000);
  const catchmentLakhLiters = (totalCatchmentLiters / 100000).toFixed(2);
  const recommendedPondVolumeM3 = Math.round(totalCatchmentLiters * 0.25 / 1000); // Sized to hold 25% of annual runoff at any point
  const pondLengthM = Math.round(Math.sqrt(recommendedPondVolumeM3 / 2.5));
  const pondWidthM = Math.round(pondLengthM * 0.8);
  const supplementalIrrigationDays = Math.round(totalCatchmentLiters / (calcAcres * 12000)); // ~12k L/day/acre for micro-irrigation

  // Calculations for Bio-Input Dosage
  const getBioInputMetrics = () => {
    let compostMultiplier = 3; // tons per acre
    let biocharKgMultiplier = 500; // kg per acre
    let seedKgMultiplier = 25; // kg daincha/sunn hemp per acre
    let jeevamruthaLitersMultiplier = 200; // liters per month
    let carbonSeqEstimate = 450; // kg CO2e sequestered per acre

    if (calcDegradationLevel === 'mild') {
      compostMultiplier = 1.5;
      biocharKgMultiplier = 250;
      seedKgMultiplier = 15;
      carbonSeqEstimate = 280;
    } else if (calcDegradationLevel === 'severe') {
      compostMultiplier = 5;
      biocharKgMultiplier = 1000;
      seedKgMultiplier = 35;
      carbonSeqEstimate = 850;
    } else if (calcDegradationLevel === 'saline') {
      compostMultiplier = 4;
      biocharKgMultiplier = 800;
      seedKgMultiplier = 30; // Sesbania aculeata
      carbonSeqEstimate = 720;
    }

    return {
      compostTons: (calcSoilAcres * compostMultiplier).toFixed(1),
      biocharKg: Math.round(calcSoilAcres * biocharKgMultiplier),
      greenManureSeedKg: Math.round(calcSoilAcres * seedKgMultiplier),
      jeevamruthaLiters: Math.round(calcSoilAcres * jeevamruthaLitersMultiplier),
      carbonSeqKg: Math.round(calcSoilAcres * carbonSeqEstimate),
      gypsumRequirementTons: calcDegradationLevel === 'saline' ? (calcSoilAcres * 2.5).toFixed(1) : '0.0'
    };
  };

  const bioInputMetrics = getBioInputMetrics();

  const handlePrintArticle = (art: AwarenessArticle) => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header Hero Banner */}
      <div className="bg-[#2D4F1E] text-[#F4F1EA] p-8 sm:p-12 rounded-3xl border border-[#C08261]/40 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-[#1F3814] rounded-full text-xs font-bold text-[#D89F80] border border-[#C08261]/30">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Eden Sync Ecological Knowledge & Farmer Empowerment Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight leading-tight">
            The Science & Practice of <br className="hidden sm:inline" />
            <span className="text-[#D89F80] italic">Soil, Water & Living Agroecology</span>
          </h1>
          <p className="text-sm sm:text-base text-[#F4F1EA]/90 leading-relaxed">
            Practical, field-tested intelligence for landowners, farmers, and conservationists. Discover soil organic carbon replenishment, community tank de-silting, indigenous bio-formulations, and rainwater catchment engineering.
          </p>

          {/* Quick Voice Briefing Player Banner */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="px-4 py-2 bg-[#FAF8F5] text-[#2D4F1E] hover:bg-[#EFECE6] font-bold text-xs rounded-xl shadow-md inline-flex items-center space-x-2 transition-all active:scale-95"
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-4 h-4 text-red-600 animate-pulse" />
                  <span>Pause Field Audio Briefing</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-[#2D4F1E]" />
                  <span>Listen to Audio Voice Briefing</span>
                </>
              )}
            </button>
            <span className="text-[11px] text-[#F4F1EA]/75 font-mono">
              🎧 Available in English, தமிழ், हिन्दी, తెలుగు
            </span>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-12 translate-y-12">
          <Sprout className="w-96 h-96 text-[#F4F1EA]" />
        </div>
      </div>

      {/* Audio Playback Floating Bar if active */}
      {isPlayingAudio && (
        <div className="p-4 bg-[#1F3814] text-[#F4F1EA] rounded-2xl border border-[#D4A359] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-[#2D4F1E] border border-[#D4A359]/40 flex items-center justify-center text-[#D4A359] shrink-0">
              <Volume2 className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase text-[#D89F80] tracking-wider block">
                Live Agroecology Audio Stream
              </span>
              <p className="text-xs font-bold text-[#F4F1EA]">
                {audioTopic} (Field Agronomist Commentary)
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <div className="h-1.5 w-32 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-[#D4A359] w-2/3 animate-pulse" />
            </div>
            <button
              onClick={() => setIsPlayingAudio(false)}
              className="p-1.5 text-xs text-white/70 hover:text-white rounded-lg hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Knowledge Hub Navigation Bar */}
      <div className="bg-[#FAF8F5] p-1.5 rounded-2xl border border-[#C08261]/25 shadow-sm flex items-center justify-start sm:justify-center overflow-x-auto gap-1.5 scrollbar-thin">
        <button
          onClick={() => setActiveMainTab('articles')}
          className={`h-9 px-3.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 cursor-pointer ${
            activeMainTab === 'articles'
              ? 'bg-[#2D4F1E] text-[#F4F1EA] shadow-sm'
              : 'text-[#2D4F1E] hover:bg-[#EFECE6]'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-[#D89F80]" />
          <span>Illustrated Guides ({allArticles.length})</span>
        </button>

        <button
          onClick={() => setActiveMainTab('recipes')}
          className={`h-9 px-3.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 cursor-pointer ${
            activeMainTab === 'recipes'
              ? 'bg-[#2D4F1E] text-[#F4F1EA] shadow-sm'
              : 'text-[#2D4F1E] hover:bg-[#EFECE6]'
          }`}
        >
          <FlaskConical className="w-3.5 h-3.5 text-[#D89F80]" />
          <span>Indigenous Field Recipes ({INDIGENOUS_FIELD_RECIPES.length})</span>
        </button>

        <button
          onClick={() => setActiveMainTab('calculators')}
          className={`h-9 px-3.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 cursor-pointer ${
            activeMainTab === 'calculators'
              ? 'bg-[#2D4F1E] text-[#F4F1EA] shadow-sm'
              : 'text-[#2D4F1E] hover:bg-[#EFECE6]'
          }`}
        >
          <Calculator className="w-3.5 h-3.5 text-[#D89F80]" />
          <span>Eco Calculators & Sizers (3)</span>
        </button>

        <button
          onClick={() => setActiveMainTab('myths')}
          className={`h-9 px-3.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 cursor-pointer ${
            activeMainTab === 'myths'
              ? 'bg-[#2D4F1E] text-[#F4F1EA] shadow-sm'
              : 'text-[#2D4F1E] hover:bg-[#EFECE6]'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5 text-[#D89F80]" />
          <span>Myth vs Science ({MYTHS_VS_SCIENCE.length})</span>
        </button>

        <button
          onClick={() => setActiveMainTab('biofence')}
          className={`h-9 px-3.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 cursor-pointer ${
            activeMainTab === 'biofence'
              ? 'bg-[#2D4F1E] text-[#F4F1EA] shadow-sm'
              : 'text-[#2D4F1E] hover:bg-[#EFECE6]'
          }`}
        >
          <Trees className="w-3.5 h-3.5 text-[#D89F80]" />
          <span>Bio-Fence Blueprints ({BIO_FENCE_PLANS.length})</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* SECTION 1: ILLUSTRATED ARTICLES & GUIDES                 */}
      {/* ========================================================= */}
      {activeMainTab === 'articles' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Interactive Soil & Water Health Self-Assessment Diagnostic Tool */}
          <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 shadow-xl border border-[#C08261]/25">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-[#2D4F1E]/10 text-[#2D4F1E] rounded-2xl flex items-center justify-center font-bold">
                <Activity className="w-5 h-5 text-[#C08261]" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-[#2D4F1E]">
                  Instant Soil & Water Health Self-Assessment
                </h3>
                <p className="text-xs text-[#2D4F1E]/70">Answer 3 field questions to evaluate your land degradation risk score & receive immediate restoration advice.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-2">1. Current Soil Condition</label>
                <select
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  className="w-full p-3 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-semibold text-[#2D4F1E] focus:outline-none focus:ring-2 focus:ring-[#C08261]"
                >
                  <option value="Hard Clay">Hard Crusted Clay (Low infiltration)</option>
                  <option value="Arid Sandy">Arid Sandy Soil (Low organic matter)</option>
                  <option value="Saline White Soil">Saline White Crust Soil (High salts)</option>
                  <option value="Waterlogged Bog">Waterlogged / Swampy Soil (Anaerobic)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-2">2. Water Source Quality</label>
                <select
                  value={waterSource}
                  onChange={(e) => setWaterSource(e.target.value)}
                  className="w-full p-3 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-semibold text-[#2D4F1E] focus:outline-none focus:ring-2 focus:ring-[#C08261]"
                >
                  <option value="Tube Well Saline Water">Deep Tube Well (High salinity/hard water)</option>
                  <option value="Seasonal Pond">Seasonal Rainfed Pond (Dries in summer)</option>
                  <option value="Canal Water">River Canal Runoff Water</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-2">3. Crop / Yield Trend</label>
                <select
                  value={yieldLoss}
                  onChange={(e) => setYieldLoss(e.target.value)}
                  className="w-full p-3 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-semibold text-[#2D4F1E] focus:outline-none focus:ring-2 focus:ring-[#C08261]"
                >
                  <option value="20-40% Reduction">20% - 40% Yield Reduction</option>
                  <option value="Over 40% Reduction">Over 40% Yield Reduction / Barren</option>
                  <option value="Stable Yield">Stable Yield with high chemical cost</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between flex-wrap gap-4">
              <button
                onClick={runDiagnostic}
                className="px-6 py-3 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#F4F1EA] font-bold rounded-xl text-xs shadow-md flex items-center space-x-2"
              >
                <Activity className="w-4 h-4 text-[#D89F80]" />
                <span>Calculate Degradation Risk</span>
              </button>

              {diagnosticResult && (
                <div className="flex-1 bg-[#EFECE6] p-4 rounded-2xl border border-[#2D4F1E]/20 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#2D4F1E] uppercase">Diagnosis Result</span>
                    <span className="text-xs font-bold px-2.5 py-0.5 bg-[#C08261] text-[#F4F1EA] rounded-full">
                      Risk Score: {diagnosticResult.score}/100 ({diagnosticResult.riskLevel})
                    </span>
                  </div>
                  <p className="text-xs font-medium text-[#2D4F1E]/90">{diagnosticResult.advice}</p>
                </div>
              )}
            </div>
          </div>

          {/* Category Filter Pills & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#2D4F1E] text-[#F4F1EA] shadow-md'
                      : 'bg-[#FAF8F5] hover:bg-[#EFECE6] text-[#2D4F1E] border border-[#2D4F1E]/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-[#2D4F1E]/40 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search articles, biochar, swales, ponds..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-[#FAF8F5] border border-[#2D4F1E]/20 rounded-xl text-xs font-medium text-[#2D4F1E] focus:outline-none focus:ring-2 focus:ring-[#C08261]"
              />
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((art) => (
              <div
                key={art.id}
                className="bg-[#FAF8F5] rounded-3xl overflow-hidden shadow-lg border border-[#C08261]/20 flex flex-col hover:shadow-2xl transition-all group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-[#2D4F1E]/90 backdrop-blur-md text-[#D89F80] font-bold text-[10px] uppercase rounded-full border border-[#C08261]/30">
                    {art.category}
                  </span>
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/60 text-[#F4F1EA] text-[10px] font-medium rounded-md">
                    {art.readTime}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-[#2D4F1E] group-hover:text-[#C08261] transition-colors line-clamp-2">
                      {art.title}
                    </h3>
                    <p className="text-xs text-[#2D4F1E]/70 mt-2 line-clamp-3 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>

                  {/* Key Tips Bullet Teasers */}
                  {art.keyTips && art.keyTips.length > 0 && (
                    <div className="bg-[#EFECE6] p-3 rounded-xl border border-[#2D4F1E]/10 space-y-1">
                      <p className="text-[10px] font-bold uppercase text-[#C08261] flex items-center space-x-1">
                        <Lightbulb className="w-3 h-3 text-[#D4A359]" />
                        <span>Key Field Protocol:</span>
                      </p>
                      <p className="text-[11px] text-[#2D4F1E] truncate font-medium">
                        • {art.keyTips[0]}
                      </p>
                    </div>
                  )}

                  {/* 1-10 Farmer & Agronomist Rating Bar */}
                  <div className="p-2.5 bg-[#FAF8F5] rounded-xl border border-[#C08261]/20 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center space-x-1 font-bold text-[#2D4F1E]">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span>Rating: <strong className="text-[#C08261] font-mono text-xs">{ratingsMap[`art-${art.id}`]?.rating || 9.5}</strong> / 10</span>
                      </div>
                      <span className="text-[10px] text-[#2D4F1E]/60">({ratingsMap[`art-${art.id}`]?.count || 120} reviews)</span>
                    </div>

                    {/* Rate 1-10 Interactive Selector */}
                    <div className="pt-1 border-t border-[#C08261]/15 flex items-center justify-between gap-1">
                      <span className="text-[9px] font-bold text-[#2D4F1E]/70 uppercase">Rate (1-10):</span>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                          <button
                            key={score}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRateItem(`art-${art.id}`, score);
                            }}
                            title={`Rate ${score}/10`}
                            className={`w-5 h-5 rounded-md text-[9px] font-bold flex items-center justify-center transition-all ${
                              ratingsMap[`art-${art.id}`]?.userRated === score
                                ? 'bg-amber-500 text-white font-extrabold shadow-sm scale-110'
                                : 'bg-[#EFECE6] text-[#2D4F1E] hover:bg-[#2D4F1E] hover:text-white'
                            }`}
                          >
                            {score}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-1">
                    <button
                      onClick={() => setActiveArticleModal(art)}
                      className="flex-1 h-9 bg-[#EFECE6] hover:bg-[#2D4F1E] hover:text-[#F4F1EA] text-[#2D4F1E] font-bold text-xs rounded-xl transition-all flex items-center justify-center space-x-2 active:scale-95 cursor-pointer shadow-sm"
                    >
                      <span>Read Full Guide</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleShareItem(art.title, art.summary, art.category)}
                      title="Share this guide with other farmers"
                      className="w-9 h-9 flex items-center justify-center bg-[#EFECE6] hover:bg-[#C08261] hover:text-[#F4F1EA] text-[#2D4F1E] rounded-xl transition-all cursor-pointer active:scale-95 shrink-0 shadow-sm"
                    >
                      {copiedShareItem === art.title ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => {
                        setAudioTopic(art.title);
                        setIsPlayingAudio(true);
                      }}
                      title="Listen to audio briefing"
                      className="w-9 h-9 flex items-center justify-center bg-[#EFECE6] hover:bg-[#2D4F1E] hover:text-[#F4F1EA] text-[#2D4F1E] rounded-xl transition-all cursor-pointer active:scale-95 shrink-0 shadow-sm"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 2: INDIGENOUS ORGANIC FIELD RECIPES (20 RECIPES)  */}
      {/* ========================================================= */}
      {activeMainTab === 'recipes' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header Banner & Farmer Guidance */}
          <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-3xl border border-[#C08261]/25 space-y-4 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <FlaskConical className="w-5 h-5 text-[#C08261]" />
                  <h3 className="text-xl font-serif font-bold text-[#2D4F1E]">
                    Natural Fertilizer & Indigenous Bio-Input Formulations ({INDIGENOUS_FIELD_RECIPES.length} Master Recipes)
                  </h3>
                </div>
                <p className="text-xs text-[#2D4F1E]/80 max-w-3xl leading-relaxed">
                  Tailored for new and small-land farmers (0.25 to 2 acres). Prepare zero-chemical biological stimulants, botanical pest repellents, and organic liquid composts using low-cost locally available farm ingredients.
                </p>
              </div>

              {/* Smallholder Quick Badge */}
              <div className="flex items-center gap-2 bg-[#EFECE6] px-4 py-2 rounded-2xl border border-[#C08261]/30 shrink-0">
                <Coins className="w-4 h-4 text-[#C08261]" />
                <div className="text-left">
                  <span className="text-[10px] font-extrabold uppercase text-[#C08261] block">Average Cost</span>
                  <span className="text-xs font-bold text-[#2D4F1E]">₹20 - ₹90 / acre</span>
                </div>
              </div>
            </div>

            {/* Search and Category Filter Bar */}
            <div className="pt-2 flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2D4F1E]/50" />
                <input
                  type="text"
                  value={recipeSearchQuery}
                  onChange={(e) => setRecipeSearchQuery(e.target.value)}
                  placeholder="Search 20 recipes (e.g. Jeevamrutha, Neem, Caterpillar, Calcium, Buttermilk)..."
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#C08261]/30 rounded-xl text-xs text-[#2D4F1E] placeholder:text-[#2D4F1E]/40 focus:outline-none focus:ring-2 focus:ring-[#2D4F1E]"
                />
                {recipeSearchQuery && (
                  <button
                    onClick={() => setRecipeSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#2D4F1E]/50 hover:text-[#2D4F1E]"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {recipeCategories.map((cat) => {
                const count = cat === 'All' 
                  ? INDIGENOUS_FIELD_RECIPES.length 
                  : INDIGENOUS_FIELD_RECIPES.filter(r => r.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setRecipeCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap text-[11px] transition-all flex items-center space-x-1.5 ${
                      recipeCategory === cat
                        ? 'bg-[#2D4F1E] text-[#F4F1EA] shadow-sm'
                        : 'bg-white text-[#2D4F1E] border border-[#C08261]/25 hover:bg-[#EFECE6]'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${recipeCategory === cat ? 'bg-[#D89F80] text-[#1F3814]' : 'bg-[#EFECE6] text-[#2D4F1E]'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recipe Cards Grid */}
          {filteredRecipes.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#C08261]/20 space-y-3">
              <FlaskConical className="w-12 h-12 text-[#C08261] mx-auto opacity-50" />
              <h4 className="text-base font-bold text-[#2D4F1E]">No formulations found</h4>
              <p className="text-xs text-[#2D4F1E]/70 max-w-md mx-auto">
                No natural fertilizer matching your search "{recipeSearchQuery}". Try browsing all 20 recipes.
              </p>
              <button
                onClick={() => { setRecipeCategory('All'); setRecipeSearchQuery(''); }}
                className="px-4 py-2 bg-[#2D4F1E] text-white text-xs font-bold rounded-xl"
              >
                Reset Recipe Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-white rounded-3xl p-6 border border-[#C08261]/30 shadow-lg hover:shadow-xl transition-all space-y-5 flex flex-col justify-between"
                >
                  <div className="space-y-3.5">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <span className="px-2.5 py-0.5 bg-[#2D4F1E]/10 text-[#2D4F1E] text-[10px] font-extrabold uppercase rounded-md tracking-wider border border-[#2D4F1E]/20">
                          {recipe.category}
                        </span>
                        <h4 className="text-base sm:text-lg font-serif font-bold text-[#2D4F1E]">
                          {recipe.name}
                        </h4>
                        <p className="text-xs text-[#C08261] font-bold">
                          {recipe.kannadaTamilName}
                        </p>
                      </div>
                      <div className="text-right shrink-0 space-y-1">
                        <span className="px-2 py-1 bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-bold rounded-lg block">
                          ⏱️ {recipe.prepTimeDays}
                        </span>
                        {recipe.estimatedCostPerBatch && (
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-semibold rounded-md block">
                            💰 {recipe.estimatedCostPerBatch}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-[#2D4F1E]/80 leading-relaxed line-clamp-2">
                      {recipe.purpose}
                    </p>

                    {/* Small Farm Scale Callout */}
                    {recipe.smallFarmBatchSize && (
                      <div className="p-2.5 bg-emerald-50/70 rounded-xl border border-emerald-200 flex items-center justify-between text-[11px]">
                        <span className="text-emerald-900 font-bold flex items-center space-x-1">
                          <Scale className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Small-Farm Batch:</span>
                        </span>
                        <strong className="text-emerald-950 font-mono">{recipe.smallFarmBatchSize}</strong>
                      </div>
                    )}

                    {/* Ingredients Preview */}
                    <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-[#C08261]/20 space-y-1.5">
                      <span className="text-[10px] font-extrabold uppercase text-[#2D4F1E] tracking-wider block">
                        Core Ingredients:
                      </span>
                      <ul className="text-xs text-[#2D4F1E]/80 space-y-1">
                        {recipe.ingredients.slice(0, 3).map((ing, idx) => (
                          <li key={idx} className="flex items-center justify-between text-[11px]">
                            <span className="truncate pr-2">• {ing.item}</span>
                            <strong className="font-mono text-[#C08261] shrink-0">{ing.quantity}</strong>
                          </li>
                        ))}
                        {recipe.ingredients.length > 3 && (
                          <li className="text-[10px] text-[#2D4F1E]/60 italic">
                            + {recipe.ingredients.length - 3} more ingredients...
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Application Metrics */}
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2.5 bg-[#EFECE6] rounded-xl">
                        <span className="text-[#C08261] font-bold block text-[10px] uppercase">Dilution Rate</span>
                        <strong className="text-[#2D4F1E] truncate block">{recipe.dilutionRatio}</strong>
                      </div>
                      <div className="p-2.5 bg-[#EFECE6] rounded-xl">
                        <span className="text-[#C08261] font-bold block text-[10px] uppercase">Shelf Life</span>
                        <strong className="text-[#2D4F1E] truncate block">{recipe.shelfLife}</strong>
                      </div>
                    </div>

                    {/* 1-10 Farmer Efficacy Rating Bar */}
                    <div className="p-2.5 bg-[#FAF8F5] rounded-xl border border-[#C08261]/20 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <div className="flex items-center space-x-1 font-bold text-[#2D4F1E]">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                          <span>Farmer Field Efficacy: <strong className="text-[#C08261] font-mono text-xs">{ratingsMap[`rec-${recipe.id}`]?.rating || 9.8}</strong> / 10</span>
                        </div>
                        <span className="text-[10px] text-[#2D4F1E]/60">({ratingsMap[`rec-${recipe.id}`]?.count || 180} verified farms)</span>
                      </div>

                      {/* Rate 1-10 Interactive Selector */}
                      <div className="pt-1 border-t border-[#C08261]/15 flex items-center justify-between gap-1">
                        <span className="text-[9px] font-bold text-[#2D4F1E]/70 uppercase">Rate (1-10):</span>
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                            <button
                              key={score}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRateItem(`rec-${recipe.id}`, score);
                              }}
                              title={`Rate ${score}/10`}
                              className={`w-5 h-5 rounded-md text-[9px] font-bold flex items-center justify-center transition-all ${
                                ratingsMap[`rec-${recipe.id}`]?.userRated === score
                                  ? 'bg-amber-500 text-white font-extrabold shadow-sm scale-110'
                                  : 'bg-[#EFECE6] text-[#2D4F1E] hover:bg-[#2D4F1E] hover:text-white'
                              }`}
                            >
                              {score}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setSelectedRecipe(recipe);
                        setRecipeScaleAcres(1);
                      }}
                      className="flex-1 py-3 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#F4F1EA] font-bold text-xs rounded-xl shadow-md flex items-center justify-center space-x-2 transition-all active:scale-[0.98] cursor-pointer"
                    >
                      <FlaskConical className="w-4 h-4 text-[#D89F80]" />
                      <span>View Recipe & Scaling</span>
                    </button>
                    <button
                      onClick={() => handleShareItem(recipe.name, `${recipe.purpose} - Dilution: ${recipe.dilutionRatio}, Shelf life: ${recipe.shelfLife}`, recipe.category)}
                      title="Share recipe with other farmers"
                      className="p-3 bg-[#EFECE6] hover:bg-[#C08261] hover:text-[#F4F1EA] text-[#2D4F1E] font-bold rounded-xl transition-all active:scale-95 cursor-pointer"
                    >
                      {copiedShareItem === recipe.name ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 3: INTERACTIVE ECO CALCULATORS & SIZERS          */}
      {/* ========================================================= */}
      {activeMainTab === 'calculators' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Calculator 1: Rainwater Harvesting & Farm Pond Sizer */}
          <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 border border-[#C08261]/30 shadow-xl space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-[#C08261]/20">
              <div className="w-10 h-10 rounded-2xl bg-[#2D4F1E] text-[#F4F1EA] flex items-center justify-center">
                <Droplets className="w-5 h-5 text-[#D89F80]" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase text-[#C08261] tracking-wider block">
                  Hydrological Sizing Tool
                </span>
                <h3 className="text-xl font-serif font-bold text-[#2D4F1E]">
                  Farm Pond (Jal Kund) & Rainwater Runoff Sizer
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-1">
                    Land Catchment Area (Acres): <strong className="font-mono text-[#C08261]">{calcAcres} Acres</strong>
                  </label>
                  <input
                    type="range"
                    min={0.5}
                    max={25}
                    step={0.5}
                    value={calcAcres}
                    onChange={(e) => setCalcAcres(parseFloat(e.target.value))}
                    className="w-full accent-[#2D4F1E]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>0.5 Ac</span>
                    <span>12 Ac</span>
                    <span>25 Ac</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-1">
                    Average Annual Rainfall: <strong className="font-mono text-[#C08261]">{calcRainfallMm} mm</strong>
                  </label>
                  <input
                    type="range"
                    min={300}
                    max={2500}
                    step={50}
                    value={calcRainfallMm}
                    onChange={(e) => setCalcRainfallMm(parseInt(e.target.value))}
                    className="w-full accent-[#2D4F1E]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>300 mm (Arid)</span>
                    <span>1000 mm (Moderate)</span>
                    <span>2500 mm (Wet)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-1">
                    Soil Texture & Runoff Coefficient
                  </label>
                  <select
                    value={calcRunoffCoeff}
                    onChange={(e) => setCalcRunoffCoeff(parseFloat(e.target.value))}
                    className="w-full p-2.5 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-semibold text-[#2D4F1E]"
                  >
                    <option value={0.25}>Sandy Loam / High Permeability (25% Runoff)</option>
                    <option value={0.35}>Medium Loam Farmland (35% Runoff)</option>
                    <option value={0.45}>Clay Soil / Hard Surface (45% Runoff)</option>
                    <option value={0.60}>Compacted Hardpan / Rocky Watershed (60% Runoff)</option>
                  </select>
                </div>
              </div>

              {/* Calculated Results */}
              <div className="md:col-span-2 bg-[#2D4F1E] text-[#F4F1EA] p-6 rounded-2xl border border-[#D4A359] flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-[#D89F80] tracking-wider block">
                    Calculated Annual Catchment Capacity
                  </span>
                  <div className="flex items-baseline space-x-2 mt-1">
                    <span className="text-3xl sm:text-4xl font-serif font-bold text-[#F4F1EA]">
                      {catchmentLakhLiters}
                    </span>
                    <span className="text-sm font-bold text-[#D89F80]">Lakh Litres/Year</span>
                  </div>
                  <p className="text-xs text-[#F4F1EA]/80 mt-1">
                    Total surface runoff water that can be intercepted and stored across your {calcAcres} acre parcel.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/15 text-xs">
                  <div className="p-3 bg-[#1F3814] rounded-xl border border-white/10">
                    <span className="text-[10px] text-[#D89F80] font-bold block uppercase">Recommended Pond Dimensions</span>
                    <strong className="text-sm font-mono text-white block mt-0.5">{pondLengthM}m × {pondWidthM}m × 2.5m</strong>
                    <span className="text-[10px] text-white/70">~{recommendedPondVolumeM3} m³ holding</span>
                  </div>

                  <div className="p-3 bg-[#1F3814] rounded-xl border border-white/10">
                    <span className="text-[10px] text-[#D89F80] font-bold block uppercase">Supplemental Drip Irrigation</span>
                    <strong className="text-sm font-mono text-emerald-400 block mt-0.5">{supplementalIrrigationDays} Days</strong>
                    <span className="text-[10px] text-white/70">For {calcAcres} acres standing crop</span>
                  </div>

                  <div className="p-3 bg-[#1F3814] rounded-xl border border-white/10">
                    <span className="text-[10px] text-[#D89F80] font-bold block uppercase">Aquifer Recharge Radius</span>
                    <strong className="text-sm font-mono text-white block mt-0.5">1.5 to 2.5 km</strong>
                    <span className="text-[10px] text-white/70">Hydraulic head boost</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Calculator 2: Soil Organic Carbon & Bio-Input Formulation Estimator */}
          <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 border border-[#C08261]/30 shadow-xl space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-[#C08261]/20">
              <div className="w-10 h-10 rounded-2xl bg-[#2D4F1E] text-[#F4F1EA] flex items-center justify-center">
                <Sprout className="w-5 h-5 text-[#D89F80]" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase text-[#C08261] tracking-wider block">
                  Agronomic Soil Carbon Calculator
                </span>
                <h3 className="text-xl font-serif font-bold text-[#2D4F1E]">
                  Bio-Input Formulation & Organic Carbon Rejuvenation Estimator
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-1">
                    Land Area to Rejuvenate: <strong className="font-mono text-[#C08261]">{calcSoilAcres} Acres</strong>
                  </label>
                  <input
                    type="range"
                    min={0.5}
                    max={20}
                    step={0.5}
                    value={calcSoilAcres}
                    onChange={(e) => setCalcSoilAcres(parseFloat(e.target.value))}
                    className="w-full accent-[#2D4F1E]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>0.5 Ac</span>
                    <span>10 Ac</span>
                    <span>20 Ac</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-1">
                    Current Degradation / Salinity Tier
                  </label>
                  <select
                    value={calcDegradationLevel}
                    onChange={(e) => setCalcDegradationLevel(e.target.value as any)}
                    className="w-full p-2.5 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-semibold text-[#2D4F1E]"
                  >
                    <option value="mild">Mild Depletion (Organic Carbon ~0.6%)</option>
                    <option value="moderate">Moderate Compaction & Chemical Lockout (Carbon ~0.4%)</option>
                    <option value="severe">Severe Barren Hardpan (Carbon &lt;0.25%)</option>
                    <option value="saline">Saline / White Alkali Crust (High Sodium)</option>
                  </select>
                </div>
              </div>

              {/* Calculated Bio-Inputs */}
              <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-4 bg-white rounded-2xl border border-[#C08261]/30 shadow-sm flex flex-col justify-between">
                  <span className="text-[10px] font-extrabold uppercase text-[#C08261] block">Farmyard Compost (FYM)</span>
                  <strong className="text-2xl font-serif text-[#2D4F1E] my-1">{bioInputMetrics.compostTons} Tons</strong>
                  <span className="text-[10px] text-[#2D4F1E]/70">Apply during basal land prep</span>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-[#C08261]/30 shadow-sm flex flex-col justify-between">
                  <span className="text-[10px] font-extrabold uppercase text-[#C08261] block">Charged Biochar</span>
                  <strong className="text-2xl font-serif text-[#2D4F1E] my-1">{bioInputMetrics.biocharKg} kg</strong>
                  <span className="text-[10px] text-[#2D4F1E]/70">Inoculated with cow dung slurry</span>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-[#C08261]/30 shadow-sm flex flex-col justify-between">
                  <span className="text-[10px] font-extrabold uppercase text-[#C08261] block">Green Manure Seeds</span>
                  <strong className="text-2xl font-serif text-[#2D4F1E] my-1">{bioInputMetrics.greenManureSeedKg} kg</strong>
                  <span className="text-[10px] text-[#2D4F1E]/70">Daincha / Sunn Hemp seed mix</span>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-[#C08261]/30 shadow-sm flex flex-col justify-between">
                  <span className="text-[10px] font-extrabold uppercase text-[#C08261] block">Liquid Jeevamrutha</span>
                  <strong className="text-2xl font-serif text-[#2D4F1E] my-1">{bioInputMetrics.jeevamruthaLiters} L/Mo</strong>
                  <span className="text-[10px] text-[#2D4F1E]/70">Apply every 15-21 days</span>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-[#C08261]/30 shadow-sm flex flex-col justify-between">
                  <span className="text-[10px] font-extrabold uppercase text-[#C08261] block">Carbon Sequestration</span>
                  <strong className="text-2xl font-serif text-emerald-700 my-1">{bioInputMetrics.carbonSeqKg} kg CO₂e</strong>
                  <span className="text-[10px] text-[#2D4F1E]/70">Trapped permanently in topsoil</span>
                </div>

                {calcDegradationLevel === 'saline' && (
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-300 shadow-sm flex flex-col justify-between">
                    <span className="text-[10px] font-extrabold uppercase text-amber-800 block">Agricultural Gypsum</span>
                    <strong className="text-2xl font-serif text-amber-950 my-1">{bioInputMetrics.gypsumRequirementTons} Tons</strong>
                    <span className="text-[10px] text-amber-800">To displace sodium hardpan</span>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 4: MYTH VS SCIENCE FACT-CHECKER                  */}
      {/* ========================================================= */}
      {activeMainTab === 'myths' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-3xl border border-[#C08261]/25 space-y-2">
            <div className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-[#C08261]" />
              <h3 className="text-xl font-serif font-bold text-[#2D4F1E]">
                Agronomic Myth vs. Ecological Science
              </h3>
            </div>
            <p className="text-xs text-[#2D4F1E]/80 max-w-3xl">
              Clarifying common agricultural fallacies that lead to soil compaction, aquifer depletion, and high debt burdens with scientifically proven natural remedies.
            </p>
          </div>

          <div className="space-y-4">
            {MYTHS_VS_SCIENCE.map((item) => {
              const isExpanded = expandedMythId === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl border border-[#C08261]/30 overflow-hidden shadow-md transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedMythId(isExpanded ? null : item.id)}
                    className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-[#FAF8F5] transition-colors"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-0.5 bg-red-100 text-red-800 border border-red-200 rounded-md text-[10px] font-extrabold uppercase">
                          ❌ Common Myth
                        </span>
                        <span className="text-xs font-bold text-[#C08261]">
                          Category: {item.category}
                        </span>
                      </div>
                      <h4 className="text-base sm:text-lg font-serif font-bold text-[#2D4F1E]">
                        "{item.myth}"
                      </h4>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-[#EFECE6] flex items-center justify-center shrink-0 text-[#2D4F1E]">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-6 pb-6 pt-2 border-t border-[#C08261]/20 bg-[#FAF8F5] space-y-4 animate-fadeIn text-xs sm:text-sm">
                      {/* Truth Callout */}
                      <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-300 text-emerald-950 space-y-1">
                        <span className="text-[10px] font-extrabold uppercase text-emerald-800 tracking-wider flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                          <span>The Proven Ecological Truth</span>
                        </span>
                        <p className="font-bold text-xs sm:text-sm text-emerald-900">
                          {item.scienceTruth}
                        </p>
                      </div>

                      {/* Deep Scientific Explanation */}
                      <div className="space-y-2 text-[#2D4F1E]/85 leading-relaxed text-xs">
                        <h5 className="font-bold text-[#2D4F1E] uppercase text-[11px]">Scientific Mechanism:</h5>
                        <p>{item.explanation}</p>
                      </div>

                      {/* Actionable Solution */}
                      <div className="p-3.5 bg-[#2D4F1E] text-[#F4F1EA] rounded-2xl border border-[#D4A359] text-xs space-y-1">
                        <span className="text-[10px] font-extrabold uppercase text-[#D89F80] tracking-wider block">
                          🌱 Recommended Field Alternative:
                        </span>
                        <p className="text-[#F4F1EA]/90 leading-relaxed">
                          {item.actionableAlternative}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 5: BIO-FENCE BLUEPRINTS                          */}
      {/* ========================================================= */}
      {activeMainTab === 'biofence' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-3xl border border-[#C08261]/25 space-y-2">
            <div className="flex items-center space-x-2">
              <Trees className="w-5 h-5 text-[#C08261]" />
              <h3 className="text-xl font-serif font-bold text-[#2D4F1E]">
                Living Bio-Fence & Windbreak Engineering Blueprints
              </h3>
            </div>
            <p className="text-xs text-[#2D4F1E]/80 max-w-3xl">
              Replace rusting barbed wire with multi-tier living perimeter walls. Prevent wild boar incursions, fix soil nitrogen, generate 10 tons of organic green mulch per kilometer, and shield crops from high evaporation winds.
            </p>
          </div>

          {/* Zone Selector Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {BIO_FENCE_PLANS.map((plan, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedZoneIndex(idx)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedZoneIndex === idx
                    ? 'bg-[#2D4F1E] text-[#F4F1EA] shadow-md'
                    : 'bg-white hover:bg-[#FAF8F5] text-[#2D4F1E] border border-[#C08261]/30'
                }`}
              >
                {plan.zone.split('(')[0]}
              </button>
            ))}
          </div>

          {/* Selected Plan Display */}
          {(() => {
            const plan = BIO_FENCE_PLANS[selectedZoneIndex];
            return (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#C08261]/30 shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#C08261]/20">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-[#C08261] tracking-wider block">
                      Agro-Climatic Specification
                    </span>
                    <h4 className="text-xl font-serif font-bold text-[#2D4F1E]">
                      {plan.zone}
                    </h4>
                    <p className="text-xs text-[#2D4F1E]/70 mt-0.5">Primary Target: <strong>{plan.purpose}</strong></p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1.5 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-xl text-xs font-bold">
                      💰 Est. Cost: {plan.estimatedCostPer100m}
                    </span>
                  </div>
                </div>

                {/* 3-Tier Layering System */}
                <div className="space-y-4">
                  <h5 className="text-xs font-extrabold uppercase text-[#2D4F1E] tracking-wider">
                    3-Tier Concentric Planting Architecture
                  </h5>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {plan.recommendedCombination.map((layer, lIdx) => (
                      <div
                        key={lIdx}
                        className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#C08261]/25 space-y-3 flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <span className="px-2 py-0.5 bg-[#2D4F1E] text-[#D89F80] rounded-md text-[10px] font-extrabold uppercase block w-fit">
                            {layer.layer}
                          </span>
                          <h6 className="font-serif font-bold text-sm text-[#2D4F1E]">
                            {layer.species}
                          </h6>
                          <p className="text-[10px] text-[#C08261] font-mono italic">
                            {layer.botanicalName}
                          </p>
                          <p className="text-xs text-[#2D4F1E]/80 leading-relaxed">
                            {layer.keyTrait}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-[#C08261]/15 text-[11px] font-bold text-[#2D4F1E]">
                          Spacing: <span className="font-mono text-[#C08261]">{layer.spacing}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline & Maintenance Strip */}
                <div className="p-4 bg-[#EFECE6] rounded-2xl border border-[#2D4F1E]/20 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <strong className="text-[#2D4F1E] block">🌱 Maturation Timeline:</strong>
                    <span className="text-[#2D4F1E]/80">{plan.growthSpeed}</span>
                  </div>
                  <div>
                    <strong className="text-[#2D4F1E] block">✂️ Maintenance & Harvesting:</strong>
                    <span className="text-[#2D4F1E]/80">{plan.maintenanceNeeds}</span>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ========================================================= */}
      {/* ARTICLE DETAIL MODAL                                      */}
      {/* ========================================================= */}
      {activeArticleModal && (
        <div className="fixed inset-0 z-50 bg-[#1F3814]/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6 border border-[#C08261]/30 animate-fadeIn">
            
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-inner">
              <img
                src={activeArticleModal.imageUrl}
                alt={activeArticleModal.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 px-3.5 py-1 bg-[#2D4F1E] text-[#D89F80] font-bold text-xs rounded-full border border-[#C08261]/30">
                {activeArticleModal.category}
              </span>
              <button
                onClick={() => setActiveArticleModal(null)}
                className="absolute top-4 right-4 w-9 h-9 bg-black/60 hover:bg-black text-white rounded-full flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D4F1E] leading-tight">
                {activeArticleModal.title}
              </h2>
              <p className="text-xs text-[#2D4F1E]/60 mt-1 font-medium">
                {activeArticleModal.readTime} • Eden Sync Ecological Knowledge Hub
              </p>
            </div>

            <div className="prose prose-sm max-w-none text-[#2D4F1E]/90 leading-relaxed whitespace-pre-line text-xs sm:text-sm">
              {activeArticleModal.content}
            </div>

            {activeArticleModal.keyTips && activeArticleModal.keyTips.length > 0 && (
              <div className="bg-[#EFECE6] p-5 rounded-2xl border border-[#2D4F1E]/20 space-y-2.5">
                <h4 className="text-xs font-bold text-[#2D4F1E] uppercase flex items-center space-x-1.5">
                  <Lightbulb className="w-4 h-4 text-[#C08261]" />
                  <span>Field Implementation Protocol for Landowners</span>
                </h4>
                <ul className="space-y-2 text-xs text-[#2D4F1E]/85">
                  {activeArticleModal.keyTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5">
                      <Check className="w-4 h-4 text-[#2D4F1E] shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-[#C08261]/20 flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePrintArticle(activeArticleModal)}
                  className="px-4 py-2.5 border border-[#C08261]/40 hover:bg-[#EFECE6] text-[#2D4F1E] font-bold text-xs rounded-xl inline-flex items-center space-x-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-[#C08261]" />
                  <span>Print Protocol</span>
                </button>
                <button
                  onClick={() => handleShareItem(activeArticleModal.title, activeArticleModal.summary, activeArticleModal.category)}
                  className="px-4 py-2.5 bg-[#C08261] hover:bg-[#A86E4F] text-[#F4F1EA] font-bold text-xs rounded-xl inline-flex items-center space-x-2 cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{copiedShareItem === activeArticleModal.title ? 'Copied to Clipboard!' : 'Share with Farmers'}</span>
                </button>
              </div>

              <button
                onClick={() => setActiveArticleModal(null)}
                className="px-6 py-2.5 bg-[#2D4F1E] text-[#F4F1EA] font-bold text-xs rounded-xl hover:bg-[#1F3814] cursor-pointer"
              >
                Close Guide
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* RECIPE DETAIL MODAL (WITH SMALLHOLDER FARM SCALING)       */}
      {/* ========================================================= */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 bg-[#1F3814]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6 border border-[#C08261]/30 animate-fadeIn">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#C08261]/20">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 bg-[#2D4F1E]/10 text-[#2D4F1E] text-[10px] font-extrabold uppercase rounded-md tracking-wider">
                  {selectedRecipe.category}
                </span>
                <h3 className="text-xl font-serif font-bold text-[#2D4F1E]">
                  {selectedRecipe.name}
                </h3>
                <p className="text-xs text-[#C08261] font-bold">{selectedRecipe.kannadaTamilName}</p>
                {selectedRecipe.estimatedCostPerBatch && (
                  <span className="inline-block mt-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Estimated Cost: {selectedRecipe.estimatedCostPerBatch}
                  </span>
                )}
              </div>
              <button
                onClick={() => setSelectedRecipe(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            {/* Smallholder Farm Scale Selector */}
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C08261]/25 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#2D4F1E] flex items-center space-x-1.5">
                  <Scale className="w-4 h-4 text-[#C08261]" />
                  <span>Farm Plot Scale Multiplier:</span>
                </span>
                <span className="text-xs font-mono font-bold text-[#C08261]">
                  {recipeScaleAcres} {recipeScaleAcres === 1 ? 'Acre' : 'Acres'} / Plot
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {[0.25, 0.5, 1, 2, 5].map((scale) => (
                  <button
                    key={scale}
                    onClick={() => setRecipeScaleAcres(scale)}
                    className={`px-3 py-1 text-xs font-bold rounded-xl transition-all ${
                      recipeScaleAcres === scale
                        ? 'bg-[#2D4F1E] text-[#F4F1EA] shadow-sm'
                        : 'bg-white text-[#2D4F1E] border border-[#C08261]/25 hover:bg-[#EFECE6]'
                    }`}
                  >
                    {scale === 0.25 ? '0.25 Acre (Small plot)' : scale === 0.5 ? '0.5 Acre' : `${scale} Acre${scale > 1 ? 's' : ''}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Ingredients Table with Dynamic Scaling */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#2D4F1E] uppercase tracking-wider flex items-center justify-between">
                <span>1. Formulated Ingredient Quantities</span>
                <span className="text-[10px] text-[#C08261] lowercase font-normal">(scaled for {recipeScaleAcres} acre)</span>
              </h4>
              <div className="bg-[#FAF8F5] rounded-2xl border border-[#C08261]/20 divide-y divide-[#C08261]/15 overflow-hidden">
                {selectedRecipe.ingredients.map((ing, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between text-xs">
                    <div>
                      <strong className="text-[#2D4F1E]">{ing.item}</strong>
                      <span className="text-[10px] text-[#2D4F1E]/70 block">{ing.role}</span>
                    </div>
                    <span className="font-mono font-bold text-[#C08261] bg-white px-2.5 py-1 rounded-lg border border-[#C08261]/20 shrink-0 ml-2">
                      {recipeScaleAcres === 1 
                        ? ing.quantity 
                        : `${ing.quantity} (× ${recipeScaleAcres})`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#2D4F1E] uppercase tracking-wider">
                2. Step-by-Step Preparation & Fermentation
              </h4>
              <ol className="space-y-2 text-xs text-[#2D4F1E]/90 bg-[#FAF8F5] p-4 rounded-2xl border border-[#C08261]/20">
                {selectedRecipe.stepByStep.map((step, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="w-5 h-5 rounded-full bg-[#2D4F1E] text-[#F4F1EA] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Key Benefits */}
            {selectedRecipe.keyBenefits && selectedRecipe.keyBenefits.length > 0 && (
              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1.5">
                <span className="text-[10px] font-extrabold uppercase text-emerald-800 block">Agronomic Advantages:</span>
                <ul className="text-xs text-emerald-950 space-y-1">
                  {selectedRecipe.keyBenefits.map((b, i) => (
                    <li key={i} className="flex items-start space-x-1.5">
                      <span className="text-emerald-700">✔</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Precautions */}
            {selectedRecipe.precautions && selectedRecipe.precautions.length > 0 && (
              <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 space-y-1.5">
                <span className="text-[10px] font-extrabold uppercase text-amber-800 block">Critical Precautions:</span>
                <ul className="text-xs text-amber-950 space-y-1">
                  {selectedRecipe.precautions.map((p, i) => (
                    <li key={i} className="flex items-start space-x-1.5">
                      <span className="text-amber-700">⚠️</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Application & Storage */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200">
                <span className="text-[10px] font-extrabold uppercase text-emerald-800 block">Dosage & Field Application</span>
                <strong className="text-emerald-950 font-bold block mt-1">{selectedRecipe.dilutionRatio}</strong>
                <p className="text-[11px] text-emerald-900 mt-1">{selectedRecipe.applicationMethod}</p>
              </div>

              <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200">
                <span className="text-[10px] font-extrabold uppercase text-amber-800 block">Shelf Life & Storage</span>
                <strong className="text-amber-950 font-bold block mt-1">{selectedRecipe.shelfLife}</strong>
                <p className="text-[11px] text-amber-900 mt-1">Keep strictly in deep shade under a damp jute cloth.</p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-[#C08261]/20 flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.print()}
                  className="h-10 px-4 border border-[#C08261]/40 hover:bg-[#EFECE6] text-[#2D4F1E] font-bold text-xs rounded-xl inline-flex items-center space-x-2 transition-all active:scale-95 cursor-pointer shadow-sm"
                >
                  <Printer className="w-4 h-4 text-[#C08261]" />
                  <span>Print Guide</span>
                </button>

                <button
                  onClick={() => handleShareItem(selectedRecipe.name, `${selectedRecipe.purpose} - Dilution: ${selectedRecipe.dilutionRatio}, Shelf life: ${selectedRecipe.shelfLife}`, selectedRecipe.category)}
                  className="h-10 px-4 bg-[#C08261] hover:bg-[#A86E4F] text-[#F4F1EA] font-bold text-xs rounded-xl inline-flex items-center space-x-2 transition-all active:scale-95 cursor-pointer shadow-md"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{copiedShareItem === selectedRecipe.name ? 'Copied to Clipboard!' : 'Share Recipe'}</span>
                </button>
              </div>

              <button
                onClick={() => setSelectedRecipe(null)}
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
