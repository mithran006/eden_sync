import React, { useState, useMemo } from 'react';
import { 
  Lightbulb, 
  Share2, 
  ThumbsUp, 
  CheckCircle2, 
  Sparkles, 
  PlusCircle, 
  Search, 
  Filter, 
  Bookmark, 
  BookmarkCheck, 
  Phone, 
  MapPin, 
  Clock, 
  DollarSign, 
  Layers, 
  AlertCircle, 
  MessageSquare, 
  Send, 
  X, 
  ExternalLink, 
  FlaskConical, 
  Sprout, 
  Droplets, 
  ShieldCheck, 
  HelpCircle, 
  ChevronRight, 
  Check, 
  TrendingUp, 
  Copy, 
  Info,
  Wrench,
  Award,
  Calendar,
  Globe,
  CloudRain,
  Landmark,
  History,
  Flag,
  UserCheck
} from 'lucide-react';
import { FarmerIdea, FarmerTipCategory, ImplementationCost, DifficultyLevel, FarmerIdeaFeedback, UserProfile } from '../types';
import { INITIAL_FARMER_IDEAS } from '../data/farmerIdeasData';
import { copyToClipboard } from '../utils/safeClipboard';

interface FarmerIdeasPageProps {
  currentUser: UserProfile | null;
  onOpenAuthModal?: () => void;
}

const CATEGORIES: { label: string; value: FarmerTipCategory | 'all'; icon: React.ElementType }[] = [
  { label: 'All Categories', value: 'all', icon: Layers },
  { label: 'Indian Indigenous Systems', value: 'Indigenous Indian Farming Systems', icon: Landmark },
  { label: 'Global & Foreign Regenerative', value: 'Global & Foreign Regenerative Farming', icon: Globe },
  { label: 'El Niño & Climate Resilience', value: 'El Niño History & Climate Resilience', icon: CloudRain },
  { label: 'Organic Pest & Disease', value: 'Organic Pest & Disease Control', icon: FlaskConical },
  { label: 'Water Conservation & Drip', value: 'Water Conservation & Low-Cost Drip', icon: Droplets },
  { label: 'Soil Health & Bio-Inputs', value: 'Soil Health & Bio-Fertilizers', icon: Sprout },
  { label: 'Farm Tools & DIY Jugaad', value: 'Farm Tools & DIY Jugaad', icon: Wrench },
  { label: 'Seed Treatment & Storage', value: 'Seed Treatment & Storage', icon: Award },
  { label: 'Weed & Mulching', value: 'Weed & Mulching Techniques', icon: Layers },
];

const SAMPLE_PHOTO_PRESETS = [
  { label: 'Organic Sprayer & Leaves', url: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb228cc?auto=format&fit=crop&w=800&q=80' },
  { label: 'Sub-surface Clay Pots', url: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80' },
  { label: 'Boundary Repellent / Field', url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80' },
  { label: 'Yellow Trap / Insects', url: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80' },
  { label: 'Rich Compost / Bio-Culture', url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80' },
  { label: 'Seed Sprouting / Sap', url: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=800&q=80' },
];

export const FarmerIdeasPage: React.FC<FarmerIdeasPageProps> = ({ currentUser, onOpenAuthModal }) => {
  const [ideas, setIdeas] = useState<FarmerIdea[]>(() => {
    try {
      const saved = localStorage.getItem('eden_farmer_ideas');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const existingIds = new Set(parsed.map((p: FarmerIdea) => p.id));
          const missing = INITIAL_FARMER_IDEAS.filter(item => !existingIds.has(item.id));
          return [...parsed, ...missing];
        }
      }
    } catch (e) {
      console.log('Error reading local farmer ideas:', e);
    }
    return INITIAL_FARMER_IDEAS;
  });

  const [selectedCategory, setSelectedCategory] = useState<FarmerTipCategory | 'all'>('all');
  const [originFilter, setOriginFilter] = useState<'all' | 'Indian' | 'Foreign / Global' | 'El Niño & Climate History'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [costFilter, setCostFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'tried' | 'newest'>('popular');
  const [onlySaved, setOnlySaved] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const s = localStorage.getItem('eden_saved_tips');
      return s ? JSON.parse(s) : ['TIP-2026-001', 'TIP-2026-004'];
    } catch {
      return ['TIP-2026-001'];
    }
  });

  // Sync Logged Person info to form when currentUser changes
  React.useEffect(() => {
    if (currentUser?.name) {
      setFormFarmerName(currentUser.name);
      setNewCommentName(currentUser.name);
    }
    if (currentUser?.phone) {
      setFormPhone(currentUser.phone);
    }
    if (currentUser?.address) {
      setFormDistrict(currentUser.address);
    }
  }, [currentUser]);

  // Modal States
  const [activeIdeaModal, setActiveIdeaModal] = useState<FarmerIdea | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copiedTipId, setCopiedTipId] = useState<string | null>(null);

  // New Idea Form State
  const [formCategory, setFormCategory] = useState<FarmerTipCategory>('Organic Pest & Disease Control');
  const [formTitle, setFormTitle] = useState('');
  const [formSummary, setFormSummary] = useState('');
  const [formFarmerName, setFormFarmerName] = useState(currentUser?.name || '');
  const [formVillage, setFormVillage] = useState('Anand');
  const [formDistrict, setFormDistrict] = useState('Anand');
  const [formState, setFormState] = useState('Gujarat');
  const [formPhone, setFormPhone] = useState(currentUser?.phone || '');
  const [formExpYears, setFormExpYears] = useState('12');
  const [formCost, setFormCost] = useState<ImplementationCost>('Zero Cost (Farm Waste)');
  const [formSavings, setFormSavings] = useState('Saves ₹2,500/acre in chemical inputs');
  const [formTime, setFormTime] = useState('48 to 72 Hours');
  const [formDifficulty, setFormDifficulty] = useState<DifficultyLevel>('Easy (Any Farmer)');
  const [formCrops, setFormCrops] = useState('Tomatoes, Chilli, Cotton, Paddy');
  const [formMaterials, setFormMaterials] = useState<string[]>([
    '5 Liters Sour Buttermilk (Fermented 5 days)',
    '50g Asafoetida (Hing)',
    '15 Liters clean unchlorinated water'
  ]);
  const [newMaterialInput, setNewMaterialInput] = useState('');
  const [formSteps, setFormSteps] = useState<string[]>([
    'Store fresh buttermilk in a clay pot in shade for 5 days until sour.',
    'Dissolve Hing in warm water and mix into the sour buttermilk.',
    'Filter thoroughly through a cotton cloth to prevent sprayer clogging.',
    'Dilute 500ml in 15L water and spray early morning on foliage.'
  ]);
  const [newStepInput, setNewStepInput] = useState('');
  const [formReason, setFormReason] = useState('Lactic acid bacteria and volatile sulfur compounds naturally suppress fungal spores and repel sucking insects.');
  const [formCautions, setFormCautions] = useState('Do not spray in harsh midday sun (>35°C). Always filter through cloth.');
  const [formImageUrl, setFormImageUrl] = useState(SAMPLE_PHOTO_PRESETS[0].url);
  const [isAiEnhancing, setIsAiEnhancing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // New Comment / Review in Modal
  const [newCommentName, setNewCommentName] = useState(currentUser?.name || '');
  const [newCommentLocation, setNewCommentLocation] = useState('My Village, District');
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentRating, setNewCommentRating] = useState(5);
  const [newCommentTried, setNewCommentTried] = useState(true);

  // Save to LocalStorage whenever ideas change
  const saveIdeasState = (updated: FarmerIdea[]) => {
    setIdeas(updated);
    try {
      localStorage.setItem('eden_farmer_ideas', JSON.stringify(updated));
    } catch (e) {
      console.log('Error saving ideas:', e);
    }
  };

  // Toggle Bookmark
  const toggleBookmark = (id: string) => {
    setSavedIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      try {
        localStorage.setItem('eden_saved_tips', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  // Handle Like
  const handleLike = async (id: string) => {
    const updated = ideas.map(idea => {
      if (idea.id === id) {
        return { ...idea, likesCount: idea.likesCount + 1 };
      }
      return idea;
    });
    saveIdeasState(updated);

    if (activeIdeaModal?.id === id) {
      setActiveIdeaModal(prev => prev ? { ...prev, likesCount: prev.likesCount + 1 } : null);
    }

    try {
      await fetch(`/api/farmer-ideas/${id}/like`, { method: 'POST' });
    } catch (e) {
      // client update is already optimistic
    }
  };

  // Handle Feedback Submission
  const handleAddFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeIdeaModal || !newCommentText.trim()) return;

    const newFeedback: FarmerIdeaFeedback = {
      id: `FB-${Date.now()}`,
      farmerName: newCommentName.trim() || 'Fellow Farmer',
      farmerLocation: newCommentLocation.trim() || 'Farm Location',
      comment: newCommentText.trim(),
      rating: newCommentRating,
      triedOnFarm: newCommentTried,
      date: new Date().toISOString().split('T')[0]
    };

    const targetId = activeIdeaModal.id;
    const updated = ideas.map(idea => {
      if (idea.id === targetId) {
        const comments = [newFeedback, ...(idea.comments || [])];
        let triedCount = idea.triedCount;
        let successRate = idea.successRatePercentage;
        if (newFeedback.triedOnFarm) {
          triedCount += 1;
          const triedItems = comments.filter(c => c.triedOnFarm);
          const positive = triedItems.filter(c => c.rating >= 4);
          successRate = Math.round((positive.length / triedItems.length) * 100);
        }
        return {
          ...idea,
          comments,
          triedCount,
          successRatePercentage: successRate
        };
      }
      return idea;
    });

    saveIdeasState(updated);
    const updatedModal = updated.find(i => i.id === targetId) || null;
    setActiveIdeaModal(updatedModal);
    setNewCommentText('');

    try {
      await fetch(`/api/farmer-ideas/${targetId}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFeedback)
      });
    } catch (err) {}
  };

  // Add Item to Form Materials List
  const handleAddMaterial = () => {
    if (newMaterialInput.trim()) {
      setFormMaterials([...formMaterials, newMaterialInput.trim()]);
      setNewMaterialInput('');
    }
  };

  const handleRemoveMaterial = (index: number) => {
    setFormMaterials(formMaterials.filter((_, i) => i !== index));
  };

  // Add Step to Form Steps List
  const handleAddStep = () => {
    if (newStepInput.trim()) {
      setFormSteps([...formSteps, newStepInput.trim()]);
      setNewStepInput('');
    }
  };

  const handleRemoveStep = (index: number) => {
    setFormSteps(formSteps.filter((_, i) => i !== index));
  };

  // AI Tip Enhancer Assistant
  const handleAiEnhanceTip = async () => {
    setFormError(null);
    if (!formTitle.trim() && !formSummary.trim()) {
      setFormError('Please enter at least a rough Title or Summary first for the AI agronomist to refine.');
      return;
    }

    setIsAiEnhancing(true);
    try {
      const res = await fetch('/api/ai/enhance-farmer-tip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawTitle: formTitle,
          rawDescription: formSummary,
          category: formCategory
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.refinedTitle) setFormTitle(data.refinedTitle);
        if (data.refinedSummary) setFormSummary(data.refinedSummary);
        if (Array.isArray(data.materialsNeeded) && data.materialsNeeded.length > 0) setFormMaterials(data.materialsNeeded);
        if (Array.isArray(data.stepByStepGuide) && data.stepByStepGuide.length > 0) setFormSteps(data.stepByStepGuide);
        if (data.scientificReason) setFormReason(data.scientificReason);
        if (Array.isArray(data.cautionsOrDoNotDo) && data.cautionsOrDoNotDo.length > 0) setFormCautions(data.cautionsOrDoNotDo.join(' '));
        if (data.estimatedSavings) setFormSavings(data.estimatedSavings);
        if (data.timeToSeeResults) setFormTime(data.timeToSeeResults);
        if (Array.isArray(data.suitableCrops) && data.suitableCrops.length > 0) setFormCrops(data.suitableCrops.join(', '));
      }
    } catch (err) {
      console.warn('AI enhancement server unavailable; keeping current input');
    } finally {
      setIsAiEnhancing(false);
    }
  };

  // Submit New Farmer Idea
  const handleCreateIdea = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!formTitle.trim() || !formSummary.trim() || !formFarmerName.trim()) {
      setFormError('Please provide a Title, Summary, and Farmer Name.');
      return;
    }

    setIsSubmitting(true);
    const newIdea: FarmerIdea = {
      id: `TIP-2026-${Math.floor(100 + Math.random() * 900)}`,
      title: formTitle.trim(),
      category: formCategory,
      summary: formSummary.trim(),
      farmerName: formFarmerName.trim(),
      village: formVillage.trim() || 'Village',
      district: formDistrict.trim() || 'District',
      state: formState.trim() || 'State',
      phone: formPhone.trim(),
      isVerifiedFarmer: true,
      experienceYears: Number(formExpYears) || 10,
      costToImplement: formCost,
      estimatedSavings: formSavings.trim() || 'Saves significant input costs',
      timeToSeeResults: formTime.trim() || '3 to 5 Days',
      difficulty: formDifficulty,
      suitableCrops: formCrops.split(',').map(s => s.trim()).filter(Boolean),
      materialsNeeded: formMaterials.length > 0 ? formMaterials : ['Natural farm organic materials', 'Clean water'],
      stepByStepGuide: formSteps.length > 0 ? formSteps : ['Mix in appropriate proportions in shade.', 'Apply early morning on crops.'],
      scientificReason: formReason.trim() || 'Natural biological synergy enriches soil microbiome and triggers plant systemic resistance.',
      cautionsOrDoNotDo: formCautions.split('.').map(s => s.trim()).filter(Boolean),
      imageUrl: formImageUrl,
      likesCount: 1,
      triedCount: 0,
      successRatePercentage: 100,
      createdAt: new Date().toISOString().split('T')[0],
      comments: []
    };

    const updated = [newIdea, ...ideas];
    saveIdeasState(updated);

    try {
      await fetch('/api/farmer-ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newIdea)
      });
    } catch (err) {}

    setIsSubmitting(false);
    setIsShareModalOpen(false);
    setActiveIdeaModal(newIdea);
  };

  // WhatsApp Share Helper
  const shareToWhatsApp = (idea: FarmerIdea) => {
    const text = `🌾 *Farmer Tip from Eden Sync Revival:*\n\n💡 *${idea.title}*\n\n👨‍🌾 By: ${idea.farmerName} (${idea.village}, ${idea.state})\n💰 Cost: ${idea.costToImplement}\n📈 Savings: ${idea.estimatedSavings}\n⏱️ Results in: ${idea.timeToSeeResults}\n\n📝 *Summary:*\n${idea.summary}\n\n🌿 View complete step-by-step recipe on Eden Sync: ${window.location.origin}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      window.location.href = url;
    }
  };

  // Copy Link / Text
  const copyTipDetails = async (idea: FarmerIdea) => {
    const text = `${idea.title} - Shared by ${idea.farmerName} on Eden Sync.\nSavings: ${idea.estimatedSavings}\nRecipe: ${idea.summary}`;
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedTipId(idea.id);
      setTimeout(() => setCopiedTipId(null), 2500);
    }
  };

  // Filtered Ideas
  const filteredIdeas = useMemo(() => {
    return ideas.filter(idea => {
      if (onlySaved && !savedIds.includes(idea.id)) return false;
      if (selectedCategory !== 'all' && idea.category !== selectedCategory) return false;
      if (originFilter !== 'all' && idea.originType !== originFilter) return false;
      if (costFilter === 'zero' && idea.costToImplement !== 'Zero Cost (Farm Waste)') return false;
      if (costFilter === 'low' && !idea.costToImplement.includes('Low Cost') && idea.costToImplement !== 'Zero Cost (Farm Waste)') return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = idea.title.toLowerCase().includes(q);
        const matchSum = idea.summary.toLowerCase().includes(q);
        const matchFarmer = idea.farmerName.toLowerCase().includes(q);
        const matchPlace = ((idea.district || '') + ' ' + (idea.state || '') + ' ' + (idea.country || '')).toLowerCase().includes(q);
        const matchOrigin = (idea.originType || '').toLowerCase().includes(q);
        const matchYear = (idea.historicalYear || '').toLowerCase().includes(q);
        const matchCrop = (idea.suitableCrops || []).some(c => c.toLowerCase().includes(q));
        if (!matchTitle && !matchSum && !matchFarmer && !matchPlace && !matchOrigin && !matchYear && !matchCrop) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'popular') return b.likesCount - a.likesCount;
      if (sortBy === 'tried') return b.triedCount - a.triedCount;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [ideas, selectedCategory, originFilter, costFilter, searchQuery, sortBy, onlySaved, savedIds]);

  // Overall statistics
  const totalUpvotes = ideas.reduce((acc, curr) => acc + (curr.likesCount || 0), 0);
  const totalTriedReports = ideas.reduce((acc, curr) => acc + (curr.triedCount || 0), 0);
  const zeroCostCount = ideas.filter(i => i.costToImplement === 'Zero Cost (Farm Waste)').length;
  const indianCount = ideas.filter(i => i.originType === 'Indian').length;
  const globalCount = ideas.filter(i => i.originType === 'Foreign / Global').length;
  const climateCount = ideas.filter(i => i.originType === 'El Niño & Climate History').length;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2D4F1E] pb-24">
      {/* Top Banner Header */}
      <div className="bg-[#2D4F1E] text-[#F4F1EA] pt-8 pb-12 px-4 sm:px-6 lg:px-8 border-b border-[#C08261]/30">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#C08261]/25 border border-[#C08261]/40 rounded-full text-xs font-extrabold text-[#D89F80] mb-3">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Grassroots & Historical Agronomy Archive</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#F4F1EA] tracking-tight leading-tight">
                Farmers' Idea & Field Tips Hub
              </h1>
              <p className="mt-2 text-sm sm:text-base text-[#F4F1EA]/85 leading-relaxed">
                Discover over 110+ field-tested solutions: indigenous Indian Vedic & sub-surface practices, world regenerative methods (Fukuoka, Zai pits, Incan waru waru), and El Niño climate-drought survival history.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                id="btn-open-share-idea-modal"
                onClick={() => setIsShareModalOpen(true)}
                className="h-11 px-5 bg-[#C08261] hover:bg-[#A86E4F] text-[#F4F1EA] font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-[#1F3814]/40 inline-flex items-center justify-center space-x-2 transition-all active:scale-95 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Share Your Farmer Tip</span>
              </button>

              <button
                onClick={() => setOnlySaved(!onlySaved)}
                className={`h-11 px-4 rounded-xl text-xs sm:text-sm font-bold border transition-all inline-flex items-center justify-center space-x-2 cursor-pointer ${
                  onlySaved
                    ? 'bg-[#FAF8F5] text-[#2D4F1E] border-[#FAF8F5]'
                    : 'bg-[#1F3814] text-[#F4F1EA] border-[#C08261]/30 hover:bg-[#1F3814]/80'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${onlySaved ? 'fill-current text-[#C08261]' : 'text-[#D89F80]'}`} />
                <span>Saved ({savedIds.length})</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar: Indian + Global + El Niño counts */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-6 border-t border-[#C08261]/20">
            <div className="bg-[#1F3814]/70 p-3 rounded-xl border border-[#C08261]/25">
              <p className="text-[10px] sm:text-[11px] font-bold text-[#D89F80] uppercase tracking-wider flex items-center gap-1">
                <span>🌾 Total Field Tips</span>
              </p>
              <p className="text-lg sm:text-2xl font-serif font-bold text-[#F4F1EA] mt-0.5">{ideas.length} Practical Hacks</p>
            </div>
            <div className="bg-[#1F3814]/70 p-3 rounded-xl border border-[#C08261]/25">
              <p className="text-[10px] sm:text-[11px] font-bold text-[#D89F80] uppercase tracking-wider flex items-center gap-1">
                <span>🇮🇳 Indian Systems</span>
              </p>
              <p className="text-lg sm:text-2xl font-serif font-bold text-[#F4F1EA] mt-0.5">{indianCount} Heritage Tips</p>
            </div>
            <div className="bg-[#1F3814]/70 p-3 rounded-xl border border-[#C08261]/25">
              <p className="text-[10px] sm:text-[11px] font-bold text-[#D89F80] uppercase tracking-wider flex items-center gap-1">
                <span>🌍 Foreign / Global</span>
              </p>
              <p className="text-lg sm:text-2xl font-serif font-bold text-[#F4F1EA] mt-0.5">{globalCount} World Recipes</p>
            </div>
            <div className="bg-[#1F3814]/70 p-3 rounded-xl border border-[#C08261]/25">
              <p className="text-[10px] sm:text-[11px] font-bold text-[#D89F80] uppercase tracking-wider flex items-center gap-1">
                <span>☀️ El Niño History</span>
              </p>
              <p className="text-lg sm:text-2xl font-serif font-bold text-[#F4F1EA] mt-0.5">{climateCount} Climate Lessons</p>
            </div>
            <div className="bg-[#1F3814]/70 p-3 rounded-xl border border-[#C08261]/25 col-span-2 sm:col-span-1">
              <p className="text-[10px] sm:text-[11px] font-bold text-[#D89F80] uppercase tracking-wider flex items-center gap-1">
                <span>💰 Zero-Cost Recipes</span>
              </p>
              <p className="text-lg sm:text-2xl font-serif font-bold text-[#F4F1EA] mt-0.5">{zeroCostCount} Farm-Waste</p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
        
        {/* Search, Category Chips & Controls Bar */}
        <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#C08261]/30 shadow-md mb-6 space-y-3.5">
          
          {/* Active Logged Contributor Banner */}
          <div className="flex flex-wrap items-center justify-between p-3 bg-white rounded-xl border border-[#C08261]/25 shadow-2xs gap-2">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#2D4F1E] text-[#F4F1EA] flex items-center justify-center font-bold text-xs shrink-0">
                <UserCheck className="w-4 h-4 text-[#D89F80]" />
              </div>
              <div className="text-xs">
                <span className="font-semibold text-[#2D4F1E]/70">Contributor Status: </span>
                <span className="font-serif font-extrabold text-[#1F3814] text-sm">
                  {currentUser ? currentUser.name : 'Community Contributor'}
                </span>
                <span className="ml-1.5 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-900 border border-emerald-300">
                  {currentUser?.role === 'admin' ? '🛡️ Central Admin' : currentUser ? '🌱 Registered Landowner' : '🌱 Agro-Ecology Network'}
                </span>
                <span className="ml-2 text-emerald-700 font-bold hidden sm:inline">
                  • Ready to upvote, bookmark & post
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs">
              <span className="text-[11px] text-[#2D4F1E]/75 font-medium">
                Viewing <b className="text-[#2D4F1E]">{filteredIdeas.length}</b> of {ideas.length} tips
              </span>
            </div>
          </div>

          {/* Origin Quick-Filter Tab Bar */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-thin pt-0.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#C08261] px-1 shrink-0 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" />
              <span>Origin:</span>
            </span>
            <button
              onClick={() => setOriginFilter('all')}
              className={`h-8 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 cursor-pointer shrink-0 ${
                originFilter === 'all'
                  ? 'bg-[#2D4F1E] text-[#F4F1EA] shadow-sm'
                  : 'bg-[#EFECE6] text-[#2D4F1E] hover:bg-white border border-[#2D4F1E]/10'
              }`}
            >
              <span>🌾 All Ecosystems ({ideas.length})</span>
            </button>

            <button
              onClick={() => setOriginFilter('Indian')}
              className={`h-8 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 cursor-pointer shrink-0 ${
                originFilter === 'Indian'
                  ? 'bg-[#2D4F1E] text-[#F4F1EA] shadow-sm ring-1 ring-[#D89F80]'
                  : 'bg-[#EFECE6] text-[#2D4F1E] hover:bg-white border border-[#2D4F1E]/10'
              }`}
            >
              <span>🇮🇳 Indian Heritage ({indianCount})</span>
            </button>

            <button
              onClick={() => setOriginFilter('Foreign / Global')}
              className={`h-8 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 cursor-pointer shrink-0 ${
                originFilter === 'Foreign / Global'
                  ? 'bg-[#2D4F1E] text-[#F4F1EA] shadow-sm ring-1 ring-[#D89F80]'
                  : 'bg-[#EFECE6] text-[#2D4F1E] hover:bg-white border border-[#2D4F1E]/10'
              }`}
            >
              <span>🌍 Foreign & Global ({globalCount})</span>
            </button>

            <button
              onClick={() => setOriginFilter('El Niño & Climate History')}
              className={`h-8 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 cursor-pointer shrink-0 ${
                originFilter === 'El Niño & Climate History'
                  ? 'bg-[#2D4F1E] text-[#F4F1EA] shadow-sm ring-1 ring-[#D89F80]'
                  : 'bg-[#EFECE6] text-[#2D4F1E] hover:bg-white border border-[#2D4F1E]/10'
              }`}
            >
              <span>☀️ El Niño & Climate History ({climateCount})</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-3 items-center justify-between pt-1 border-t border-[#C08261]/15">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-[#C08261] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search tips by crop (paddy, tomato), pest, neem, drip, etc..."
                className="w-full h-10 pl-10 pr-4 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs sm:text-sm text-[#2D4F1E] focus:bg-[#FAF8F5] focus:border-[#2D4F1E] outline-none transition-all placeholder:text-[#2D4F1E]/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#2D4F1E]/60 hover:text-[#2D4F1E]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filters: Cost + Sort */}
            <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              <div className="flex items-center space-x-1 bg-[#EFECE6] p-1 rounded-xl border border-[#2D4F1E]/15 text-xs font-bold shrink-0">
                <span className="px-2 text-[11px] text-[#2D4F1E]/70">Cost:</span>
                <button
                  onClick={() => setCostFilter('all')}
                  className={`h-7 px-2.5 rounded-lg transition-all ${costFilter === 'all' ? 'bg-[#2D4F1E] text-[#F4F1EA] shadow-xs' : 'text-[#2D4F1E] hover:bg-[#FAF8F5]'}`}
                >
                  All
                </button>
                <button
                  onClick={() => setCostFilter('zero')}
                  className={`h-7 px-2.5 rounded-lg transition-all ${costFilter === 'zero' ? 'bg-[#2D4F1E] text-[#F4F1EA] shadow-xs' : 'text-[#2D4F1E] hover:bg-[#FAF8F5]'}`}
                >
                  Zero-Cost Only
                </button>
                <button
                  onClick={() => setCostFilter('low')}
                  className={`h-7 px-2.5 rounded-lg transition-all ${costFilter === 'low' ? 'bg-[#2D4F1E] text-[#F4F1EA] shadow-xs' : 'text-[#2D4F1E] hover:bg-[#FAF8F5]'}`}
                >
                  &lt; ₹500
                </button>
              </div>

              <div className="flex items-center space-x-1 bg-[#EFECE6] p-1 rounded-xl border border-[#2D4F1E]/15 text-xs font-bold shrink-0">
                <span className="px-2 text-[11px] text-[#2D4F1E]/70">Sort:</span>
                <button
                  onClick={() => setSortBy('popular')}
                  className={`h-7 px-2.5 rounded-lg transition-all ${sortBy === 'popular' ? 'bg-[#C08261] text-[#F4F1EA] shadow-xs' : 'text-[#2D4F1E] hover:bg-[#FAF8F5]'}`}
                >
                  Most Popular
                </button>
                <button
                  onClick={() => setSortBy('tried')}
                  className={`h-7 px-2.5 rounded-lg transition-all ${sortBy === 'tried' ? 'bg-[#C08261] text-[#F4F1EA] shadow-xs' : 'text-[#2D4F1E] hover:bg-[#FAF8F5]'}`}
                >
                  Most Verified
                </button>
                <button
                  onClick={() => setSortBy('newest')}
                  className={`h-7 px-2.5 rounded-lg transition-all ${sortBy === 'newest' ? 'bg-[#C08261] text-[#F4F1EA] shadow-xs' : 'text-[#2D4F1E] hover:bg-[#FAF8F5]'}`}
                >
                  Newest
                </button>
              </div>
            </div>

          </div>

          {/* Category Chips Bar */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-thin pt-1 border-t border-[#C08261]/15">
            {CATEGORIES.map(cat => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.value;
              const count = cat.value === 'all' 
                ? ideas.length 
                : ideas.filter(i => i.category === cat.value).length;

              return (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`h-8 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-[#2D4F1E] text-[#F4F1EA] shadow-sm'
                      : 'bg-[#EFECE6] text-[#2D4F1E] hover:bg-[#FAF8F5] border border-[#2D4F1E]/10'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#D89F80]' : 'text-[#C08261]'}`} />
                  <span>{cat.label} ({count})</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Ideas Grid */}
        {filteredIdeas.length === 0 ? (
          <div className="bg-[#FAF8F5] p-12 rounded-2xl border border-dashed border-[#C08261]/40 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#EFECE6] flex items-center justify-center mx-auto text-[#C08261]">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#2D4F1E]">No farmer tips match your current filter</h3>
            <p className="text-xs text-[#2D4F1E]/75 max-w-md mx-auto">
              Try clearing your search query or selecting "All Categories", or be the first farmer to share a tip for this category!
            </p>
            <div className="pt-2">
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setCostFilter('all'); setOnlySaved(false); }}
                className="h-9 px-4 bg-[#2D4F1E] text-[#F4F1EA] font-bold text-xs rounded-xl shadow-xs cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredIdeas.map(idea => {
              const isSaved = savedIds.includes(idea.id);

              return (
                <div
                  key={idea.id}
                  id={`farmer-tip-card-${idea.id}`}
                  className="bg-[#FAF8F5] rounded-2xl border border-[#C08261]/30 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden group"
                >
                  {/* Card Image & Quick Category Banner */}
                  <div className="relative h-44 w-full bg-[#1F3814] overflow-hidden">
                    <img
                      src={idea.imageUrl}
                      alt={idea.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1F3814] via-transparent to-black/30" />

                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-[#2D4F1E]/90 text-[#F4F1EA] border border-[#C08261]/40 rounded-lg backdrop-blur-xs">
                        {idea.category}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleBookmark(idea.id); }}
                        title={isSaved ? "Remove bookmark" : "Save this tip"}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                          isSaved ? 'bg-[#C08261] text-[#F4F1EA] shadow-md' : 'bg-[#1F3814]/70 text-[#F4F1EA] hover:bg-[#1F3814]'
                        }`}
                      >
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>

                    {/* Bottom Author Tag on Image */}
                    <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[#F4F1EA]">
                      <div className="flex items-center space-x-1.5 text-xs">
                        <div className="w-5 h-5 rounded-full bg-[#C08261] flex items-center justify-center font-bold text-[10px] text-[#F4F1EA]">
                          {idea.farmerName.charAt(0)}
                        </div>
                        <span className="font-bold text-xs truncate max-w-[130px]">{idea.farmerName}</span>
                        {idea.isVerifiedFarmer && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A359] shrink-0" title="Verified Practicing Farmer" />
                        )}
                      </div>
                      <div className="flex items-center space-x-1 text-[11px] text-[#D89F80]">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate max-w-[100px]">{idea.district}, {idea.state}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center flex-wrap gap-1.5">
                        {idea.originType === 'Indian' && (
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-50 text-amber-900 border border-amber-300/80 rounded-md inline-flex items-center gap-1">
                            <span>🇮🇳</span>
                            <span>{idea.state ? `${idea.state}, India` : 'Indian Heritage'}</span>
                          </span>
                        )}
                        {idea.originType === 'Foreign / Global' && (
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-900 border border-blue-300/80 rounded-md inline-flex items-center gap-1">
                            <span>🌍</span>
                            <span>{idea.country || 'Global Regenerative'}</span>
                          </span>
                        )}
                        {idea.originType === 'El Niño & Climate History' && (
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-rose-50 text-rose-900 border border-rose-300/80 rounded-md inline-flex items-center gap-1">
                            <span>☀️</span>
                            <span>El Niño History {idea.country ? `(${idea.country})` : ''}</span>
                          </span>
                        )}
                        {idea.historicalYear && (
                          <span className="text-[10px] font-semibold px-1.5 py-0.5 bg-[#EFECE6] text-[#2D4F1E] rounded-md inline-flex items-center gap-1">
                            <History className="w-3 h-3 text-[#C08261]" />
                            <span>{idea.historicalYear}</span>
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-bold font-serif text-[#2D4F1E] leading-snug line-clamp-2">
                        {idea.title}
                      </h3>
                      <p className="text-xs text-[#2D4F1E]/80 line-clamp-3 leading-relaxed">
                        {idea.summary}
                      </p>
                    </div>

                    {/* Key Attributes Tags */}
                    <div className="space-y-2 pt-2 border-t border-[#C08261]/15 text-[11px]">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#C08261] flex items-center space-x-1">
                          <DollarSign className="w-3.5 h-3.5" />
                          <span>{idea.costToImplement}</span>
                        </span>
                        <span className="text-[#2D4F1E]/75 flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-[#C08261]" />
                          <span>{idea.timeToSeeResults}</span>
                        </span>
                      </div>

                      <div className="bg-[#EFECE6] p-2 rounded-xl text-[11px] text-[#2D4F1E] flex items-center justify-between">
                        <span className="font-semibold text-emerald-800 flex items-center space-x-1">
                          <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate max-w-[150px]">{idea.estimatedSavings}</span>
                        </span>
                        <span className="font-extrabold text-[10px] bg-[#2D4F1E]/10 px-1.5 py-0.5 rounded text-[#2D4F1E]">
                          {idea.successRatePercentage}% Success
                        </span>
                      </div>

                      {/* Suitable Crops Chips */}
                      <div className="flex items-center gap-1 flex-wrap">
                        <span className="text-[10px] text-[#2D4F1E]/60 font-semibold">Crops:</span>
                        {idea.suitableCrops.slice(0, 3).map((crop, idx) => (
                          <span key={idx} className="text-[10px] px-1.5 py-0.2 bg-[#EFECE6] text-[#2D4F1E] rounded-md font-medium">
                            {crop}
                          </span>
                        ))}
                        {idea.suitableCrops.length > 3 && (
                          <span className="text-[10px] text-[#C08261] font-bold">+{idea.suitableCrops.length - 3}</span>
                        )}
                      </div>
                    </div>

                    {/* Card Actions Footer */}
                    <div className="pt-2 border-t border-[#C08261]/15 flex items-center justify-between gap-1.5">
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleLike(idea.id)}
                          className="h-8 px-2.5 bg-[#EFECE6] hover:bg-[#E2DDD5] text-[#2D4F1E] font-bold text-xs rounded-xl flex items-center space-x-1 transition-all active:scale-95 cursor-pointer"
                          title="Upvote / Helpful Tip"
                        >
                          <ThumbsUp className="w-3.5 h-3.5 text-[#C08261]" />
                          <span>{idea.likesCount}</span>
                        </button>

                        <button
                          onClick={() => shareToWhatsApp(idea)}
                          className="w-8 h-8 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-xl flex items-center justify-center transition-all active:scale-95 cursor-pointer"
                          title="Share to WhatsApp"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => copyTipDetails(idea)}
                          className="w-8 h-8 bg-[#EFECE6] hover:bg-[#E2DDD5] text-[#2D4F1E] rounded-xl flex items-center justify-center transition-all active:scale-95 cursor-pointer"
                          title="Copy Tip Details"
                        >
                          {copiedTipId === idea.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      <button
                        onClick={() => setActiveIdeaModal(idea)}
                        className="h-8 px-3 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#F4F1EA] font-bold text-xs rounded-xl flex items-center space-x-1 shadow-xs transition-all active:scale-95 cursor-pointer shrink-0"
                      >
                        <span>View Recipe</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* DETAIL MODAL: Full Step-by-Step Recipe & Farmer Verification */}
      {activeIdeaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
          <div className="bg-[#FAF8F5] w-full max-w-3xl rounded-2xl shadow-2xl border border-[#C08261]/30 my-8 overflow-hidden text-[#2D4F1E]">
            
            {/* Modal Header Banner */}
            <div className="bg-[#2D4F1E] text-[#F4F1EA] p-5 sm:p-6 relative">
              <button
                onClick={() => setActiveIdeaModal(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#1F3814] hover:bg-[#C08261] text-[#F4F1EA] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="pr-10 space-y-2">
                <div className="flex items-center space-x-2 flex-wrap gap-1">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 bg-[#C08261] text-[#F4F1EA] rounded-full">
                    {activeIdeaModal.category}
                  </span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-[#1F3814] text-[#D89F80] border border-[#C08261]/30 rounded-full">
                    {activeIdeaModal.difficulty}
                  </span>
                  {activeIdeaModal.originType && (
                    <span className="text-[10px] font-bold px-2.5 py-0.5 bg-white/20 text-[#F4F1EA] border border-white/30 rounded-full inline-flex items-center gap-1">
                      {activeIdeaModal.originType === 'Indian' 
                        ? `🇮🇳 Indian Heritage (${activeIdeaModal.state || 'Indigenous'})` 
                        : activeIdeaModal.originType === 'Foreign / Global' 
                          ? `🌍 ${activeIdeaModal.country || 'Global Regenerative'}` 
                          : `☀️ El Niño Resilience (${activeIdeaModal.country || 'Climate History'})`}
                    </span>
                  )}
                  {activeIdeaModal.historicalYear && (
                    <span className="text-[10px] font-semibold px-2.5 py-0.5 bg-amber-400/25 text-amber-200 border border-amber-400/40 rounded-full inline-flex items-center gap-1">
                      <History className="w-3 h-3 text-amber-300" />
                      <span>Historical Era: {activeIdeaModal.historicalYear}</span>
                    </span>
                  )}
                </div>
                <h2 className="text-lg sm:text-2xl font-serif font-bold text-[#F4F1EA] leading-tight">
                  {activeIdeaModal.title}
                </h2>
                <p className="text-xs text-[#F4F1EA]/80">
                  Documented & Tested by <span className="font-bold text-[#D89F80]">{activeIdeaModal.farmerName}</span> ({activeIdeaModal.village}, {activeIdeaModal.district}, {activeIdeaModal.state}) • {activeIdeaModal.experienceYears} Years Farming Experience
                </p>
              </div>
            </div>

            {/* Modal Body with Recipe Details */}
            <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto space-y-6">
              
              {/* Summary & Impact Banner */}
              <div className="bg-[#EFECE6] p-4 rounded-xl border border-[#2D4F1E]/15 space-y-3">
                <p className="text-xs sm:text-sm text-[#2D4F1E] leading-relaxed">
                  {activeIdeaModal.summary}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-[#2D4F1E]/10 text-xs">
                  <div>
                    <span className="text-[10px] text-[#2D4F1E]/60 uppercase font-bold block">Cost:</span>
                    <span className="font-bold text-[#C08261]">{activeIdeaModal.costToImplement}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#2D4F1E]/60 uppercase font-bold block">Savings Potential:</span>
                    <span className="font-bold text-emerald-800">{activeIdeaModal.estimatedSavings}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#2D4F1E]/60 uppercase font-bold block">Response Time:</span>
                    <span className="font-bold text-[#2D4F1E]">{activeIdeaModal.timeToSeeResults}</span>
                  </div>
                </div>
              </div>

              {/* Materials Needed */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#C08261] flex items-center space-x-1.5">
                  <FlaskConical className="w-3.5 h-3.5" />
                  <span>Materials & Ingredients Checklist</span>
                </h4>
                <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#C08261]/25 space-y-1.5">
                  {activeIdeaModal.materialsNeeded.map((mat, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                        ✓
                      </div>
                      <span className="text-[#2D4F1E] font-medium">{mat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Implementation Guide */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#2D4F1E] flex items-center space-x-1.5">
                  <Sprout className="w-3.5 h-3.5 text-[#C08261]" />
                  <span>Step-by-Step Preparation & Application Guide</span>
                </h4>
                <div className="space-y-2.5">
                  {activeIdeaModal.stepByStepGuide.map((step, idx) => (
                    <div key={idx} className="flex items-start space-x-3 bg-[#EFECE6]/70 p-3 rounded-xl border border-[#2D4F1E]/10">
                      <div className="w-6 h-6 rounded-full bg-[#2D4F1E] text-[#F4F1EA] flex items-center justify-center shrink-0 font-bold text-xs">
                        {idx + 1}
                      </div>
                      <p className="text-xs sm:text-sm text-[#2D4F1E] leading-relaxed">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scientific Mechanism */}
              <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200/80 space-y-1.5">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-900 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>Why This Works (Agronomy & Science)</span>
                </h4>
                <p className="text-xs text-amber-950 leading-relaxed">
                  {activeIdeaModal.scientificReason}
                </p>
              </div>

              {/* Precautions / What NOT to do */}
              {activeIdeaModal.cautionsOrDoNotDo.length > 0 && (
                <div className="bg-red-50/60 p-4 rounded-xl border border-red-200/70 space-y-1.5">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-red-800 flex items-center space-x-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                    <span>Important Precautions & Common Mistakes</span>
                  </h4>
                  <ul className="list-disc list-inside text-xs text-red-950 space-y-1">
                    {activeIdeaModal.cautionsOrDoNotDo.map((caut, i) => (
                      <li key={i}>{caut}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Farmer Profile & Contact Info */}
              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#C08261]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="text-xs font-bold text-[#2D4F1E]">{activeIdeaModal.farmerName}</p>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">Verified Farmer</span>
                  </div>
                  <p className="text-[11px] text-[#2D4F1E]/70 mt-0.5">
                    {activeIdeaModal.village}, {activeIdeaModal.district}, {activeIdeaModal.state}
                  </p>
                </div>
                {activeIdeaModal.phone && (
                  <a
                    href={`tel:${activeIdeaModal.phone}`}
                    className="h-9 px-3.5 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#F4F1EA] font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 transition-all active:scale-95 cursor-pointer shrink-0"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#D89F80]" />
                    <span>Call Farmer: {activeIdeaModal.phone}</span>
                  </a>
                )}
              </div>

              {/* Community Feedback & Field Test Reports */}
              <div className="space-y-3 pt-4 border-t border-[#C08261]/20">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#2D4F1E] flex items-center space-x-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#C08261]" />
                    <span>Farmer Field Feedback & Reviews ({activeIdeaModal.comments?.length || 0})</span>
                  </h4>
                  <span className="text-[11px] font-bold text-[#C08261]">
                    {activeIdeaModal.triedCount} farmers tested this
                  </span>
                </div>

                {/* Form to submit review */}
                <form onSubmit={handleAddFeedback} className="bg-[#EFECE6] p-3.5 rounded-xl border border-[#2D4F1E]/15 space-y-2.5">
                  <p className="text-xs font-bold text-[#2D4F1E]">Tried this on your farm? Share your field result:</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={newCommentName}
                      onChange={e => setNewCommentName(e.target.value)}
                      placeholder="Your Name (Farmer)"
                      className="h-8 px-3 bg-[#FAF8F5] border border-[#2D4F1E]/20 rounded-lg text-xs text-[#2D4F1E] outline-none"
                    />
                    <input
                      type="text"
                      value={newCommentLocation}
                      onChange={e => setNewCommentLocation(e.target.value)}
                      placeholder="Village / District"
                      className="h-8 px-3 bg-[#FAF8F5] border border-[#2D4F1E]/20 rounded-lg text-xs text-[#2D4F1E] outline-none"
                    />
                  </div>

                  <textarea
                    rows={2}
                    value={newCommentText}
                    onChange={e => setNewCommentText(e.target.value)}
                    placeholder="How did this work on your crop? Mention crop name and results..."
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#2D4F1E]/20 rounded-lg text-xs text-[#2D4F1E] outline-none resize-none"
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                    <div className="flex items-center space-x-4 text-xs">
                      <label className="flex items-center space-x-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newCommentTried}
                          onChange={e => setNewCommentTried(e.target.checked)}
                          className="rounded text-[#2D4F1E]"
                        />
                        <span className="text-[11px] font-medium">I tested this on my farm</span>
                      </label>

                      <div className="flex items-center space-x-1">
                        <span className="text-[11px] text-[#2D4F1E]/70 font-semibold">Rating:</span>
                        <select
                          value={newCommentRating}
                          onChange={e => setNewCommentRating(Number(e.target.value))}
                          className="h-7 px-1.5 bg-[#FAF8F5] border border-[#2D4F1E]/20 rounded text-xs font-bold"
                        >
                          <option value={5}>⭐⭐⭐⭐⭐ (5/5 Worked Great)</option>
                          <option value={4}>⭐⭐⭐⭐ (4/5 Good)</option>
                          <option value={3}>⭐⭐⭐ (3/5 Average)</option>
                          <option value={2}>⭐⭐ (2/5 Low effect)</option>
                          <option value={1}>⭐ (1/5 Did not work)</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={!newCommentText.trim()}
                      className="h-8 px-4 bg-[#C08261] hover:bg-[#A86E4F] text-[#F4F1EA] font-bold text-xs rounded-xl shadow-xs flex items-center justify-center space-x-1 disabled:opacity-50 transition-all cursor-pointer shrink-0"
                    >
                      <Send className="w-3 h-3" />
                      <span>Post Feedback</span>
                    </button>
                  </div>
                </form>

                {/* Existing comments list */}
                <div className="space-y-2 pt-1">
                  {activeIdeaModal.comments && activeIdeaModal.comments.length > 0 ? (
                    activeIdeaModal.comments.map(c => (
                      <div key={c.id} className="bg-[#FAF8F5] p-3 rounded-xl border border-[#C08261]/20 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center space-x-1.5">
                            <span className="font-bold text-[#2D4F1E]">{c.farmerName}</span>
                            <span className="text-[10px] text-[#2D4F1E]/60">({c.farmerLocation})</span>
                            {c.triedOnFarm && (
                              <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">Tested on Farm</span>
                            )}
                          </div>
                          <span className="text-[10px] text-amber-700 font-bold">{'★'.repeat(c.rating)}</span>
                        </div>
                        <p className="text-xs text-[#2D4F1E]/85 leading-relaxed">{c.comment}</p>
                        <p className="text-[10px] text-[#2D4F1E]/50 text-right">{c.date}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-[#2D4F1E]/60 italic">No community reviews yet. Be the first to share your test report!</p>
                  )}
                </div>
              </div>

            </div>

            {/* Modal Action Bar Footer */}
            <div className="bg-[#EFECE6] p-4 border-t border-[#2D4F1E]/15 flex items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleLike(activeIdeaModal.id)}
                  className="h-9 px-3.5 bg-[#FAF8F5] hover:bg-[#FAF8F5]/80 text-[#2D4F1E] font-bold text-xs rounded-xl border border-[#2D4F1E]/20 flex items-center space-x-1.5 transition-all active:scale-95 cursor-pointer"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-[#C08261]" />
                  <span>Found Helpful ({activeIdeaModal.likesCount})</span>
                </button>
                <button
                  onClick={() => shareToWhatsApp(activeIdeaModal)}
                  className="h-9 px-3.5 bg-emerald-700 hover:bg-emerald-800 text-[#F4F1EA] font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-all active:scale-95 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
              </div>

              <button
                onClick={() => setActiveIdeaModal(null)}
                className="h-9 px-5 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#F4F1EA] font-bold text-xs rounded-xl shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                Close Guide
              </button>
            </div>

          </div>
        </div>
      )}

      {/* SHARE TIP MODAL: Farmer Submission Wizard */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
          <div className="bg-[#FAF8F5] w-full max-w-3xl rounded-2xl shadow-2xl border border-[#C08261]/30 my-8 overflow-hidden text-[#2D4F1E]">
            
            {/* Header */}
            <div className="bg-[#2D4F1E] text-[#F4F1EA] p-5 sm:p-6 relative">
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#1F3814] hover:bg-[#C08261] text-[#F4F1EA] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="pr-10 space-y-1">
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 bg-[#C08261]/30 border border-[#C08261]/40 rounded-full text-[10px] font-extrabold text-[#D89F80]">
                  <Lightbulb className="w-3 h-3" />
                  <span>Contribute Grassroots Knowledge</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#F4F1EA]">
                  Share Your Farming Idea or Field Tip
                </h2>
                <p className="text-xs text-[#F4F1EA]/80">
                  Help fellow farmers cut input costs, save water, and eliminate toxic pesticides by documenting your working field innovation.
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateIdea} className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto space-y-5">
              
              {/* Category & Title */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#2D4F1E] mb-1">
                      Tip Category *
                    </label>
                    <select
                      value={formCategory}
                      onChange={e => setFormCategory(e.target.value as FarmerTipCategory)}
                      className="w-full h-10 px-3 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-semibold text-[#2D4F1E] outline-none"
                    >
                      <option value="Organic Pest & Disease Control">Organic Pest & Disease Control</option>
                      <option value="Water Conservation & Low-Cost Drip">Water Conservation & Low-Cost Drip</option>
                      <option value="Soil Health & Bio-Fertilizers">Soil Health & Bio-Fertilizers</option>
                      <option value="Farm Tools & DIY Jugaad">Farm Tools & DIY Jugaad</option>
                      <option value="Seed Treatment & Storage">Seed Treatment & Storage</option>
                      <option value="Weed & Mulching Techniques">Weed & Mulching Techniques</option>
                      <option value="Animal Husbandry & Bio-Inputs">Animal Husbandry & Bio-Inputs</option>
                      <option value="Drought & Heatwave Resilience">Drought & Heatwave Resilience</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2D4F1E] mb-1">
                      Implementation Cost *
                    </label>
                    <select
                      value={formCost}
                      onChange={e => setFormCost(e.target.value as ImplementationCost)}
                      className="w-full h-10 px-3 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-semibold text-[#2D4F1E] outline-none"
                    >
                      <option value="Zero Cost (Farm Waste)">Zero Cost (Farm Waste)</option>
                      <option value="Low Cost (< ₹500)">Low Cost (&lt; ₹500)</option>
                      <option value="Moderate (₹500 - ₹2,000)">Moderate (₹500 - ₹2,000)</option>
                      <option value="Investment (> ₹2,000)">Investment (&gt; ₹2,000)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D4F1E] mb-1">
                    Tip / Idea Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={e => setFormTitle(e.target.value)}
                    placeholder="e.g. Fermented Buttermilk & Hing Spray for Powdery Mildew"
                    className="w-full h-10 px-3.5 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs sm:text-sm text-[#2D4F1E] font-medium outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D4F1E] mb-1">
                    Short Summary (What it does & how it helps) *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formSummary}
                    onChange={e => setFormSummary(e.target.value)}
                    placeholder="Explain briefly what problem this solves and what result you saw..."
                    className="w-full p-3 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs sm:text-sm text-[#2D4F1E] outline-none resize-none"
                  />
                </div>

                {/* AI Assistant Button */}
                <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-2 text-xs text-amber-950">
                    <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Have a rough idea? Agronomy AI can polish the steps and scientific rationale for you!</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAiEnhanceTip}
                    disabled={isAiEnhancing}
                    className="h-8 px-3.5 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#F4F1EA] font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 transition-all active:scale-95 disabled:opacity-50 cursor-pointer shrink-0"
                  >
                    {isAiEnhancing ? (
                      <>
                        <div className="w-3 h-3 border-2 border-t-transparent border-white rounded-full animate-spin" />
                        <span>Polishing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3 h-3 text-[#D89F80]" />
                        <span>Enhance with AI</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Farmer Info */}
              <div className="pt-3 border-t border-[#C08261]/20 space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#C08261]">
                  Farmer Profile & Location
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#2D4F1E] mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formFarmerName}
                      onChange={e => setFormFarmerName(e.target.value)}
                      placeholder="e.g. Ramesh Patel"
                      className="w-full h-9 px-3 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs text-[#2D4F1E] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#2D4F1E] mb-1">Village & District *</label>
                    <input
                      type="text"
                      required
                      value={formDistrict}
                      onChange={e => setFormDistrict(e.target.value)}
                      placeholder="e.g. Anand District"
                      className="w-full h-9 px-3 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs text-[#2D4F1E] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#2D4F1E] mb-1">State *</label>
                    <input
                      type="text"
                      required
                      value={formState}
                      onChange={e => setFormState(e.target.value)}
                      placeholder="e.g. Gujarat"
                      className="w-full h-9 px-3 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs text-[#2D4F1E] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#2D4F1E] mb-1">Phone Number (Optional for farmer inquiries)</label>
                    <input
                      type="text"
                      value={formPhone}
                      onChange={e => setFormPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full h-9 px-3 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs text-[#2D4F1E] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#2D4F1E] mb-1">Suitable Crops (comma separated)</label>
                    <input
                      type="text"
                      value={formCrops}
                      onChange={e => setFormCrops(e.target.value)}
                      placeholder="Tomatoes, Chilli, Paddy, Cotton"
                      className="w-full h-9 px-3 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs text-[#2D4F1E] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Materials Needed Interactive List */}
              <div className="pt-3 border-t border-[#C08261]/20 space-y-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#C08261]">
                  Materials & Quantities Needed
                </h4>
                <div className="space-y-1.5">
                  {formMaterials.map((mat, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-[#EFECE6] px-3 py-1.5 rounded-lg text-xs">
                      <span>• {mat}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveMaterial(idx)}
                        className="text-red-700 hover:text-red-900 font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2 pt-1">
                    <input
                      type="text"
                      value={newMaterialInput}
                      onChange={e => setNewMaterialInput(e.target.value)}
                      placeholder="Add an ingredient / tool (e.g. 5L Sour Buttermilk)"
                      className="flex-1 h-8 px-3 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-lg text-xs text-[#2D4F1E] outline-none"
                      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddMaterial(); } }}
                    />
                    <button
                      type="button"
                      onClick={handleAddMaterial}
                      className="h-8 px-3 bg-[#2D4F1E] text-[#F4F1EA] font-bold text-xs rounded-lg cursor-pointer"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Instructions Interactive List */}
              <div className="pt-3 border-t border-[#C08261]/20 space-y-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#C08261]">
                  Step-by-Step Instructions
                </h4>
                <div className="space-y-1.5">
                  {formSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start justify-between bg-[#EFECE6] p-2 rounded-lg text-xs gap-2">
                      <span className="font-bold shrink-0">{idx + 1}.</span>
                      <span className="flex-1">{step}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveStep(idx)}
                        className="text-red-700 hover:text-red-900 font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2 pt-1">
                    <input
                      type="text"
                      value={newStepInput}
                      onChange={e => setNewStepInput(e.target.value)}
                      placeholder="Add next step in the recipe..."
                      className="flex-1 h-8 px-3 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-lg text-xs text-[#2D4F1E] outline-none"
                      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddStep(); } }}
                    />
                    <button
                      type="button"
                      onClick={handleAddStep}
                      className="h-8 px-3 bg-[#2D4F1E] text-[#F4F1EA] font-bold text-xs rounded-lg cursor-pointer"
                    >
                      + Add Step
                    </button>
                  </div>
                </div>
              </div>

              {/* Estimated Savings & Science */}
              <div className="pt-3 border-t border-[#C08261]/20 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#2D4F1E] mb-1">Estimated Savings per Acre</label>
                  <input
                    type="text"
                    value={formSavings}
                    onChange={e => setFormSavings(e.target.value)}
                    placeholder="Saves ₹3,000/acre in pesticide"
                    className="w-full h-9 px-3 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs text-[#2D4F1E] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#2D4F1E] mb-1">Time to see result</label>
                  <input
                    type="text"
                    value={formTime}
                    onChange={e => setFormTime(e.target.value)}
                    placeholder="48 to 72 Hours"
                    className="w-full h-9 px-3 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs text-[#2D4F1E] outline-none"
                  />
                </div>
              </div>

              {/* Photo Preset Selector */}
              <div className="pt-3 border-t border-[#C08261]/20 space-y-2">
                <label className="block text-[11px] font-bold text-[#2D4F1E]">Choose a Representative Photo</label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {SAMPLE_PHOTO_PRESETS.map((preset, i) => (
                    <div
                      key={i}
                      onClick={() => setFormImageUrl(preset.url)}
                      className={`relative h-16 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                        formImageUrl === preset.url ? 'border-[#C08261] ring-2 ring-[#C08261]/50 scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                      {formImageUrl === preset.url && (
                        <div className="absolute inset-0 bg-[#C08261]/30 flex items-center justify-center text-white">
                          <Check className="w-4 h-4 font-bold" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Error Banner */}
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-xl">
                  {formError}
                </div>
              )}

              {/* Form Action Bar */}
              <div className="pt-4 border-t border-[#C08261]/30 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsShareModalOpen(false)}
                  className="h-10 px-5 bg-[#EFECE6] hover:bg-[#E2DDD5] text-[#2D4F1E] font-bold rounded-xl text-xs transition-all active:scale-95 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-10 px-6 bg-[#C08261] hover:bg-[#A86E4F] text-[#F4F1EA] font-bold rounded-xl text-xs sm:text-sm shadow-md flex items-center space-x-2 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Farmer Tip</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
