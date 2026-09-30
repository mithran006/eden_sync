import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Droplets, 
  Trees, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  FileText, 
  Sparkles, 
  Filter, 
  Search, 
  ChevronRight, 
  ArrowRight, 
  UserX, 
  Building2, 
  Flame, 
  Skull, 
  Send,
  PlusCircle,
  Eye,
  Check,
  RefreshCw,
  Phone,
  HelpCircle,
  ExternalLink,
  Smartphone,
  MessageSquare
} from 'lucide-react';
import { 
  PollutionComplaint, 
  PollutionDomain, 
  PollutionSeverity, 
  ComplaintStatus, 
  UserProfile,
  LandPollutionCause,
  WaterPollutionCause
} from '../types';
import { ComplaintMilestoneTracker } from './ComplaintMilestoneTracker';
import { QuickUserBanner } from './QuickUserBanner';

interface PollutionComplaintPageProps {
  complaints: PollutionComplaint[];
  currentUser: UserProfile | null;
  onSubmitComplaint: (complaint: Partial<PollutionComplaint>) => Promise<void>;
  onUpdateComplaint?: (complaint: PollutionComplaint) => Promise<void>;
  onOpenAuthModal: () => void;
  onUserRegisteredOrSelected?: (user: UserProfile) => void;
}

const LAND_CAUSES: LandPollutionCause[] = [
  'Chemical & Hazardous Waste Dumping',
  'Industrial Slag & Heavy Metal Leachate',
  'Illegal Plastic & Municipal Solid Waste Dumping',
  'Toxic Open Burning & Ash Contamination',
  'Excessive Chemical Pesticide / Fertilizer Degradation',
  'Saline Water Intrusion & Topsoil Sterilization',
  'Illegal Topsoil Stripping & Quarry Dust',
  'Construction Debris & E-Waste Dumping'
];

const WATER_CAUSES: WaterPollutionCause[] = [
  'Untreated Industrial Chemical Effluent Discharge',
  'Raw Sewage & Urban Drainage Inflow',
  'Agricultural Chemical & Pesticide Runoff (Eutrophication)',
  'Oil, Grease & Petroleum Hydrocarbon Spill',
  'Solid Waste, Plastic & Garbage Dumping in Waterbody',
  'Heavy Metal Siltation & High Turbidity / TDS',
  'Toxic Cyanobacteria / Algal Bloom & Aquatic Mortality',
  'Illegal Encroachment & Wetland Destruction'
];

const RESOURCE_OPTIONS = [
  'Drinking Water Wells / Borewells',
  'Agricultural Paddy / Crop Fields',
  'Cattle Grazing & Fodder Pastures',
  'Village Pond / Lake Aquifer',
  'River Stream & Irrigation Canals',
  'Public Health & Residential Air/Soil'
];

export const PollutionComplaintPage: React.FC<PollutionComplaintPageProps> = ({
  complaints,
  currentUser,
  onSubmitComplaint,
  onUpdateComplaint,
  onOpenAuthModal,
  onUserRegisteredOrSelected,
}) => {
  const [activeTab, setActiveTab] = useState<'report' | 'directory' | 'track'>('report');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDomain, setFilterDomain] = useState<'All' | PollutionDomain>('All');
  const [filterSeverity, setFilterSeverity] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [selectedComplaint, setSelectedComplaint] = useState<PollutionComplaint | null>(complaints[0] || null);
  const [trackingIdInput, setTrackingIdInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<PollutionComplaint | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [trackingError, setTrackingError] = useState<string | null>(null);

  // Form State
  const [domain, setDomain] = useState<PollutionDomain>('Land Pollution');
  const [specificCause, setSpecificCause] = useState<string>(LAND_CAUSES[0]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('Tamil Nadu');
  const [surveyNumberOrLandmark, setSurveyNumberOrLandmark] = useState('');
  const [affectedAreaOrVolume, setAffectedAreaOrVolume] = useState('1 Acre');
  const [severity, setSeverity] = useState<PollutionSeverity>('High (Active Damage)');
  const [evidencePhotoUrl, setEvidencePhotoUrl] = useState('https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80');
  const [complainantName, setComplainantName] = useState(currentUser?.name || '');
  const [complainantPhone, setComplainantPhone] = useState(currentUser?.phone || '');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [smsAlertsEnabled, setSmsAlertsEnabled] = useState(true);
  const [whatsappAlertsEnabled, setWhatsappAlertsEnabled] = useState(true);
  const [selectedResources, setSelectedResources] = useState<string[]>([
    'Drinking Water Wells / Borewells',
    'Agricultural Paddy / Crop Fields'
  ]);

  // Auto-sync when currentUser changes
  useEffect(() => {
    if (currentUser) {
      if (!complainantName) setComplainantName(currentUser.name || '');
      if (!complainantPhone) setComplainantPhone(currentUser.phone || '');
    }
  }, [currentUser]);

  const handleAutoFill = () => {
    if (currentUser) {
      setComplainantName(currentUser.name || '');
      setComplainantPhone(currentUser.phone || '');
      if (!location && currentUser.address) {
        setLocation(currentUser.address);
      }
    }
  };

  // Handle Domain Change
  const handleDomainChange = (newDomain: PollutionDomain) => {
    setDomain(newDomain);
    if (newDomain === 'Land Pollution') {
      setSpecificCause(LAND_CAUSES[0]);
      setEvidencePhotoUrl('https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80');
    } else if (newDomain === 'Water Pollution') {
      setSpecificCause(WATER_CAUSES[0]);
      setEvidencePhotoUrl('https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=800&q=80');
    } else {
      setSpecificCause('Chemical & Hazardous Waste Dumping');
      setEvidencePhotoUrl('https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80');
    }
  };

  // Toggle Resource
  const toggleResource = (resource: string) => {
    if (selectedResources.includes(resource)) {
      setSelectedResources(selectedResources.filter(r => r !== resource));
    } else {
      setSelectedResources([...selectedResources, resource]);
    }
  };

  // Quick Preset Handlers
  const applyPreset = (presetType: 'chemical_land' | 'textile_water' | 'plastic_burn' | 'sewage_lake') => {
    if (presetType === 'chemical_land') {
      handleDomainChange('Land Pollution');
      setSpecificCause('Chemical & Hazardous Waste Dumping');
      setTitle('Hazardous Chemical Tanker Sludge Dumped on Farmland');
      setDescription('Unidentified tanker dumped toxic acidic sludge overnight on the border of our farm plot. Soil has turned black with sulfur fumes and vegetation has scorched.');
      setLocation('Pachapalayam Road, Sulur Taluk');
      setDistrict('Coimbatore');
      setState('Tamil Nadu');
      setSurveyNumberOrLandmark('SF/204 near Canal Bank');
      setAffectedAreaOrVolume('2.0 Acres Topsoil');
      setSeverity('Critical (Immediate Hazard)');
      setEvidencePhotoUrl('https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80');
    } else if (presetType === 'textile_water') {
      handleDomainChange('Water Pollution');
      setSpecificCause('Untreated Industrial Chemical Effluent Discharge');
      setTitle('Midnight Dark Chemical Dye Discharge into Irrigation Canal');
      setDescription('Continuous release of untreated colored wastewater into the feeder channel. Water is steaming with chemical foam and nearby borewell water has developed chemical odor.');
      setLocation('Kalingarayan Canal Stretch, Bhavani');
      setDistrict('Erode');
      setState('Tamil Nadu');
      setSurveyNumberOrLandmark('Bridge near SF/88 Sluice');
      setAffectedAreaOrVolume('3.5 km Canal Stream');
      setSeverity('Critical (Immediate Hazard)');
      setEvidencePhotoUrl('https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=800&q=80');
    } else if (presetType === 'plastic_burn') {
      handleDomainChange('Land Pollution');
      setSpecificCause('Illegal Plastic & Municipal Solid Waste Dumping');
      setTitle('Open Burning of Commercial Plastic Waste near Farmland');
      setDescription('Piles of unsegregated plastic waste, medical foil, and industrial packaging dumped and set on fire. Toxic black smoke and unlined ash are polluting the groundwater recharge pit.');
      setLocation('Kundrathur Outer Ring Road Junction');
      setDistrict('Kanchipuram');
      setState('Tamil Nadu');
      setSurveyNumberOrLandmark('Opposite Govt High School Ground');
      setAffectedAreaOrVolume('1.5 Acres Buffer Land');
      setSeverity('High (Active Damage)');
      setEvidencePhotoUrl('https://images.unsplash.com/photo-1528323273322-d81458248d40?auto=format&fit=crop&w=800&q=80');
    } else if (presetType === 'sewage_lake') {
      handleDomainChange('Water Pollution');
      setSpecificCause('Raw Sewage & Urban Drainage Inflow');
      setTitle('Untreated Sewage Discharge & Massive Weed Choking in Village Lake');
      setDescription('Direct sewer pipe bypass draining into the community lake. Massive algal bloom, high fish mortality, and foul stench impacting surrounding farm cattle.');
      setLocation('Singanallur Lake Southern Inlet');
      setDistrict('Coimbatore');
      setState('Tamil Nadu');
      setSurveyNumberOrLandmark('Near Southern Wetland Weir');
      setAffectedAreaOrVolume('Entire 15-Acre Waterbody');
      setSeverity('High (Active Damage)');
      setEvidencePhotoUrl('https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80');
    }
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!title.trim() || !description.trim() || !location.trim()) {
      setFormError('Please fill out the incident title, description, and location.');
      return;
    }

    setIsSubmitting(true);
    try {
      const complaintData: Partial<PollutionComplaint> = {
        domain,
        specificCause,
        title,
        description,
        location,
        district: district || 'Local District',
        state,
        surveyNumberOrLandmark: surveyNumberOrLandmark || 'Near Landmark',
        affectedAreaOrVolume: affectedAreaOrVolume || '1 Acre',
        severity,
        evidencePhotoUrl,
        complainantName: isAnonymous ? 'Anonymous Citizen' : (complainantName || 'Concerned Landowner'),
        complainantPhone: isAnonymous ? 'Confidential' : complainantPhone,
        isAnonymous,
        affectedResources: selectedResources
      };

      await onSubmitComplaint(complaintData);

      // Create synthetic preview for confirmation banner
      const createdPreview: PollutionComplaint = {
        id: `POL-2026-${Math.floor(100 + Math.random() * 900)}`,
        createdAt: new Date().toISOString(),
        domain,
        specificCause,
        title,
        description,
        location,
        district: district || 'Local District',
        state,
        surveyNumberOrLandmark: surveyNumberOrLandmark || 'Near Landmark',
        affectedAreaOrVolume: affectedAreaOrVolume || '1 Acre',
        severity,
        status: 'Reported & Logged',
        evidencePhotoUrl,
        complainantName: isAnonymous ? 'Anonymous Citizen' : (complainantName || 'Concerned Landowner'),
        complainantPhone: isAnonymous ? 'Confidential' : complainantPhone,
        isAnonymous,
        affectedResources: selectedResources,
        assignedOfficer: 'Field Inspection Queued',
        adminRemarks: 'Complaint logged. AI Environmental Triage initialized.'
      };

      setSubmissionSuccess(createdPreview);
      setSelectedComplaint(createdPreview);
      setIsSubmitting(false);

      // Reset fields
      setTitle('');
      setDescription('');
      setLocation('');
      setSurveyNumberOrLandmark('');
    } catch (err) {
      console.warn('Complaint logged into local queue:', err);
      setIsSubmitting(false);
    }
  };

  // Filtered Directory
  const filteredComplaints = complaints.filter(c => {
    const matchesSearch = 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.specificCause.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDomain = filterDomain === 'All' || c.domain === filterDomain;
    const matchesSeverity = filterSeverity === 'All' || c.severity === filterSeverity;
    const matchesStatus = filterStatus === 'All' || c.status === filterStatus;

    return matchesSearch && matchesDomain && matchesSeverity && matchesStatus;
  });

  // Track Handler
  const handleTrackSearch = () => {
    setTrackingError(null);
    if (!trackingIdInput.trim()) return;
    const found = complaints.find(c => 
      c.id.toLowerCase() === trackingIdInput.trim().toLowerCase() ||
      c.complainantPhone.includes(trackingIdInput.trim())
    );
    if (found) {
      setSelectedComplaint(found);
    } else {
      setTrackingError(`No grievance found matching ID or Phone "${trackingIdInput}". Please verify your Tracking ID.`);
    }
  };

  // Status Progression Helper
  const getStatusStepIndex = (status: ComplaintStatus) => {
    switch (status) {
      case 'Reported & Logged': return 0;
      case 'Inspection Officer Dispatched': return 1;
      case 'Water/Soil Samples in Lab Analysis': return 2;
      case 'Legal Notice Issued & Containment Active': return 3;
      case 'Remediated & Revived': return 4;
      default: return 0;
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#2D4F1E] pb-24">
      
      {/* Hero Header */}
      <div className="bg-[#2D4F1E] text-[#F4F1EA] pt-10 pb-12 border-b border-[#C08261]/30 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C08261]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-[#1F3814] text-[#D89F80] text-xs font-bold uppercase rounded-full border border-[#C08261]/40">
                  Eden Sync Revival
                </span>
                <span className="text-xs font-semibold text-[#F4F1EA]/70">
                  Land & Water Body Restoration
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#F4F1EA] mt-2">
                Pollution Grievance & Complaint Redressal
              </h1>
              <p className="text-sm sm:text-base text-[#F4F1EA]/85 max-w-3xl mt-2 leading-relaxed">
                Report illegal dumping, industrial chemical effluent, hazardous sludge, sewage overflows, and soil sterilization. 
                Our platform triggers AI emergency bio-triage, notifies State Environmental Officers, and tracks remediation back to health.
              </p>
            </div>

            {/* Emergency Hotline Box */}
            <div className="bg-[#1F3814] p-4 rounded-2xl border border-[#C08261]/40 shadow-xl shrink-0 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-[#D4A359]">
                <ShieldAlert className="w-4 h-4 text-[#C08261] animate-pulse" />
                <span>24/7 Pollution Incident Line</span>
              </div>
              <div className="flex items-center space-x-2">
                <a href="tel:8056192997" className="px-3 py-1.5 bg-[#2D4F1E] hover:bg-[#C08261] text-[#F4F1EA] text-xs font-bold rounded-lg border border-[#C08261]/30 transition-colors">
                  8056192997
                </a>
                <a href="tel:6381811657" className="px-3 py-1.5 bg-[#2D4F1E] hover:bg-[#C08261] text-[#F4F1EA] text-xs font-bold rounded-lg border border-[#C08261]/30 transition-colors">
                  6381811657
                </a>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#C08261]/25">
            <div className="bg-[#1F3814]/70 p-3 rounded-2xl border border-[#C08261]/20">
              <p className="text-[11px] font-semibold text-[#D89F80] uppercase">Total Complaints</p>
              <p className="text-2xl font-serif font-extrabold text-[#F4F1EA]">{complaints.length}</p>
            </div>
            <div className="bg-[#1F3814]/70 p-3 rounded-2xl border border-[#C08261]/20">
              <p className="text-[11px] font-semibold text-[#D89F80] uppercase">Land Contaminations</p>
              <p className="text-2xl font-serif font-extrabold text-[#F4F1EA]">
                {complaints.filter(c => c.domain === 'Land Pollution' || c.domain === 'Combined Land & Water').length}
              </p>
            </div>
            <div className="bg-[#1F3814]/70 p-3 rounded-2xl border border-[#C08261]/20">
              <p className="text-[11px] font-semibold text-[#D89F80] uppercase">Waterbody Incidents</p>
              <p className="text-2xl font-serif font-extrabold text-[#F4F1EA]">
                {complaints.filter(c => c.domain === 'Water Pollution' || c.domain === 'Combined Land & Water').length}
              </p>
            </div>
            <div className="bg-[#1F3814]/70 p-3 rounded-2xl border border-[#C08261]/20">
              <p className="text-[11px] font-semibold text-[#D4A359] uppercase">Remediation In-Action</p>
              <p className="text-2xl font-serif font-extrabold text-[#D4A359]">
                {complaints.filter(c => c.status === 'Legal Notice Issued & Containment Active' || c.status === 'Remediated & Revived').length}
              </p>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <button
              onClick={() => setActiveTab('report')}
              className={`h-10 px-4 rounded-xl font-bold text-xs sm:text-sm inline-flex items-center space-x-2 transition-all active:scale-95 cursor-pointer ${
                activeTab === 'report'
                  ? 'bg-[#C08261] text-[#F4F1EA] shadow-md shadow-[#1F3814]/50'
                  : 'bg-[#1F3814] text-[#F4F1EA]/80 hover:text-[#F4F1EA] hover:bg-[#2D4F1E]'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>Report Pollution Incident</span>
            </button>

            <button
              onClick={() => setActiveTab('directory')}
              className={`h-10 px-4 rounded-xl font-bold text-xs sm:text-sm inline-flex items-center space-x-2 transition-all active:scale-95 cursor-pointer ${
                activeTab === 'directory'
                  ? 'bg-[#C08261] text-[#F4F1EA] shadow-md shadow-[#1F3814]/50'
                  : 'bg-[#1F3814] text-[#F4F1EA]/80 hover:text-[#F4F1EA] hover:bg-[#2D4F1E]'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Grievance Directory ({complaints.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('track')}
              className={`h-10 px-4 rounded-xl font-bold text-xs sm:text-sm inline-flex items-center space-x-2 transition-all active:scale-95 cursor-pointer ${
                activeTab === 'track'
                  ? 'bg-[#C08261] text-[#F4F1EA] shadow-md shadow-[#1F3814]/50'
                  : 'bg-[#1F3814] text-[#F4F1EA]/80 hover:text-[#F4F1EA] hover:bg-[#2D4F1E]'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Track Complaint Status</span>
            </button>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* ========================================================================= */}
        {/* TAB 1: REPORT POLLUTION INCIDENT */}
        {/* ========================================================================= */}
        {activeTab === 'report' && (
          <div className="space-y-8">
            
            {/* Success Banner */}
            {submissionSuccess && (
              <div className="bg-[#2D4F1E] text-[#F4F1EA] p-6 rounded-3xl border border-[#D4A359] shadow-2xl space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#D4A359] text-[#1F3814] rounded-xl flex items-center justify-center font-bold">
                    <Check className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-[#F4F1EA]">
                      Pollution Complaint Successfully Logged!
                    </h3>
                    <p className="text-xs text-[#D89F80]">
                      Tracking ID: <span className="font-mono font-bold text-[#F4F1EA] text-sm">{submissionSuccess.id}</span> • AI Environmental Safety Assessment Dispatched
                    </p>
                  </div>
                </div>

                <div className="bg-[#1F3814] p-4 rounded-2xl border border-[#C08261]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-[#F4F1EA]/85 space-y-1">
                    <p className="font-bold text-[#D4A359]">Immediate Next Actions:</p>
                    <p>• Inspection officer notified for priority location verification in {submissionSuccess.district}.</p>
                    <p>• Check AI-guided safety containment steps below to prevent contaminant spread.</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedComplaint(submissionSuccess);
                      setActiveTab('track');
                    }}
                    className="h-10 px-5 bg-[#C08261] hover:bg-[#A06445] text-[#F4F1EA] font-bold text-xs rounded-xl inline-flex items-center space-x-2 shrink-0 shadow-md"
                  >
                    <span>View Tracking Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Quick Presets Section */}
            <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#C08261]/30 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Flame className="w-5 h-5 text-[#C08261]" />
                  <h3 className="text-base font-serif font-bold text-[#2D4F1E]">
                    Fast-Fill Common Pollution Scenarios
                  </h3>
                </div>
                <span className="text-[11px] text-[#2D4F1E]/70">Click to autofill form</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <button
                  type="button"
                  onClick={() => applyPreset('chemical_land')}
                  className="p-3 bg-white hover:bg-[#FAF8F5] text-left rounded-2xl border border-[#C08261]/25 hover:border-[#C08261] transition-all space-y-1 group"
                >
                  <p className="text-xs font-bold text-[#2D4F1E] group-hover:text-[#C08261] flex items-center justify-between">
                    <span>Chemical Soil Dumping</span>
                    <Trees className="w-3.5 h-3.5 text-[#C08261]" />
                  </p>
                  <p className="text-[11px] text-[#2D4F1E]/70 leading-snug">Acidic sludge & spent chemical tankers on farm border</p>
                </button>

                <button
                  type="button"
                  onClick={() => applyPreset('textile_water')}
                  className="p-3 bg-white hover:bg-[#FAF8F5] text-left rounded-2xl border border-[#C08261]/25 hover:border-[#C08261] transition-all space-y-1 group"
                >
                  <p className="text-xs font-bold text-[#2D4F1E] group-hover:text-[#C08261] flex items-center justify-between">
                    <span>Industrial Dye Inflow</span>
                    <Droplets className="w-3.5 h-3.5 text-[#C08261]" />
                  </p>
                  <p className="text-[11px] text-[#2D4F1E]/70 leading-snug">Untreated textile effluent in canal & well water</p>
                </button>

                <button
                  type="button"
                  onClick={() => applyPreset('plastic_burn')}
                  className="p-3 bg-white hover:bg-[#FAF8F5] text-left rounded-2xl border border-[#C08261]/25 hover:border-[#C08261] transition-all space-y-1 group"
                >
                  <p className="text-xs font-bold text-[#2D4F1E] group-hover:text-[#C08261] flex items-center justify-between">
                    <span>Plastic Waste Burning</span>
                    <Flame className="w-3.5 h-3.5 text-[#C08261]" />
                  </p>
                  <p className="text-[11px] text-[#2D4F1E]/70 leading-snug">Toxic open burning & leachate in riparian buffer</p>
                </button>

                <button
                  type="button"
                  onClick={() => applyPreset('sewage_lake')}
                  className="p-3 bg-white hover:bg-[#FAF8F5] text-left rounded-2xl border border-[#C08261]/25 hover:border-[#C08261] transition-all space-y-1 group"
                >
                  <p className="text-xs font-bold text-[#2D4F1E] group-hover:text-[#C08261] flex items-center justify-between">
                    <span>Lake Sewage Overflow</span>
                    <AlertTriangle className="w-3.5 h-3.5 text-[#C08261]" />
                  </p>
                  <p className="text-[11px] text-[#2D4F1E]/70 leading-snug">Raw drainage, weed choking, and cattle risk</p>
                </button>
              </div>
            </div>

            {/* Main Form Box */}
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-[#C08261]/30 shadow-xl space-y-8">
              {/* 1-Click Fast Registration & Auto-Fill Banner */}
              <QuickUserBanner
                currentUser={currentUser || null}
                featureName="Pollution Grievance Report"
                onUserRegisteredOrSelected={(user) => {
                  if (onUserRegisteredOrSelected) onUserRegisteredOrSelected(user);
                  setComplainantName(user.name);
                  setComplainantPhone(user.phone);
                  if (user.address) setLocation(user.address);
                }}
                onAutoFill={handleAutoFill}
                onOpenAuthModal={onOpenAuthModal}
              />
              
              {/* Step 1: Select Pollution Domain */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="w-7 h-7 bg-[#2D4F1E] text-[#F4F1EA] text-xs font-bold rounded-full flex items-center justify-center">1</span>
                  <h3 className="text-lg font-serif font-bold text-[#2D4F1E]">Select Contamination Domain</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div
                    onClick={() => handleDomainChange('Land Pollution')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center space-x-3 ${
                      domain === 'Land Pollution'
                        ? 'border-[#C08261] bg-[#FAF8F5] shadow-md'
                        : 'border-[#C08261]/20 hover:border-[#C08261]/50 bg-white'
                    }`}
                  >
                    <div className="w-10 h-10 bg-[#2D4F1E] text-[#D89F80] rounded-xl flex items-center justify-center shrink-0">
                      <Trees className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#2D4F1E]">Land & Soil Pollution</p>
                      <p className="text-[11px] text-[#2D4F1E]/70">Chemical sludge, plastic, salt, quarry dust</p>
                    </div>
                  </div>

                  <div
                    onClick={() => handleDomainChange('Water Pollution')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center space-x-3 ${
                      domain === 'Water Pollution'
                        ? 'border-[#C08261] bg-[#FAF8F5] shadow-md'
                        : 'border-[#C08261]/20 hover:border-[#C08261]/50 bg-white'
                    }`}
                  >
                    <div className="w-10 h-10 bg-[#2D4F1E] text-[#D89F80] rounded-xl flex items-center justify-center shrink-0">
                      <Droplets className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#2D4F1E]">Waterbody Pollution</p>
                      <p className="text-[11px] text-[#2D4F1E]/70">Lake sewage, effluent, toxic foam, spills</p>
                    </div>
                  </div>

                  <div
                    onClick={() => handleDomainChange('Combined Land & Water')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center space-x-3 ${
                      domain === 'Combined Land & Water'
                        ? 'border-[#C08261] bg-[#FAF8F5] shadow-md'
                        : 'border-[#C08261]/20 hover:border-[#C08261]/50 bg-white'
                    }`}
                  >
                    <div className="w-10 h-10 bg-[#2D4F1E] text-[#D4A359] rounded-xl flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#2D4F1E]">Combined Land & Water</p>
                      <p className="text-[11px] text-[#2D4F1E]/70">Agricultural watershed & soil combined</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Specific Cause & Severity */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="w-7 h-7 bg-[#2D4F1E] text-[#F4F1EA] text-xs font-bold rounded-full flex items-center justify-center">2</span>
                  <h3 className="text-lg font-serif font-bold text-[#2D4F1E]">Pollution Source & Severity Classification</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#2D4F1E] uppercase tracking-wider mb-1.5">
                      Specific Contamination Cause *
                    </label>
                    <select
                      value={specificCause}
                      onChange={(e) => setSpecificCause(e.target.value)}
                      className="w-full h-11 px-3.5 bg-[#FAF8F5] border border-[#C08261]/40 rounded-xl text-xs sm:text-sm font-medium text-[#2D4F1E] focus:outline-none focus:ring-2 focus:ring-[#C08261]"
                    >
                      {domain === 'Water Pollution' ? (
                        WATER_CAUSES.map((c) => <option key={c} value={c}>{c}</option>)
                      ) : domain === 'Land Pollution' ? (
                        LAND_CAUSES.map((c) => <option key={c} value={c}>{c}</option>)
                      ) : (
                        [...LAND_CAUSES, ...WATER_CAUSES].map((c) => <option key={c} value={c}>{c}</option>)
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2D4F1E] uppercase tracking-wider mb-1.5">
                      Pollution Hazard Severity *
                    </label>
                    <select
                      value={severity}
                      onChange={(e) => setSeverity(e.target.value as PollutionSeverity)}
                      className="w-full h-11 px-3.5 bg-[#FAF8F5] border border-[#C08261]/40 rounded-xl text-xs sm:text-sm font-medium text-[#2D4F1E] focus:outline-none focus:ring-2 focus:ring-[#C08261]"
                    >
                      <option value="Critical (Immediate Hazard)">🔴 Critical (Immediate Hazard - Toxic / Pungent / Active Inflow)</option>
                      <option value="High (Active Damage)">🟠 High (Active Damage to Crops / Waterbody)</option>
                      <option value="Moderate">🟡 Moderate (Ongoing accumulation / dumping)</option>
                      <option value="Low / Initial Stage">🟢 Low / Initial Stage (Early warning)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 3: Incident Details */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="w-7 h-7 bg-[#2D4F1E] text-[#F4F1EA] text-xs font-bold rounded-full flex items-center justify-center">3</span>
                  <h3 className="text-lg font-serif font-bold text-[#2D4F1E]">Incident Location & Evidence</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#2D4F1E] uppercase tracking-wider mb-1.5">
                      Grievance Title / Headline *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hazardous Chemical Sludge Dumped on Fallow Farmland"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full h-11 px-3.5 bg-[#FAF8F5] border border-[#C08261]/40 rounded-xl text-xs sm:text-sm font-medium text-[#2D4F1E] focus:outline-none focus:ring-2 focus:ring-[#C08261]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2D4F1E] uppercase tracking-wider mb-1.5">
                        Specific Location / Street *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Near Arulpuram Bridge"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full h-11 px-3.5 bg-[#FAF8F5] border border-[#C08261]/40 rounded-xl text-xs sm:text-sm font-medium text-[#2D4F1E] focus:outline-none focus:ring-2 focus:ring-[#C08261]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2D4F1E] uppercase tracking-wider mb-1.5">
                        District *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tirupur, Coimbatore, Vadodara"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full h-11 px-3.5 bg-[#FAF8F5] border border-[#C08261]/40 rounded-xl text-xs sm:text-sm font-medium text-[#2D4F1E] focus:outline-none focus:ring-2 focus:ring-[#C08261]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2D4F1E] uppercase tracking-wider mb-1.5">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tamil Nadu, Gujarat, Karnataka"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full h-11 px-3.5 bg-[#FAF8F5] border border-[#C08261]/40 rounded-xl text-xs sm:text-sm font-medium text-[#2D4F1E] focus:outline-none focus:ring-2 focus:ring-[#C08261]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2D4F1E] uppercase tracking-wider mb-1.5">
                        Survey No. / GPS Landmark
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. SF/342 near Sluice Gate or GPS"
                        value={surveyNumberOrLandmark}
                        onChange={(e) => setSurveyNumberOrLandmark(e.target.value)}
                        className="w-full h-11 px-3.5 bg-[#FAF8F5] border border-[#C08261]/40 rounded-xl text-xs sm:text-sm font-medium text-[#2D4F1E] focus:outline-none focus:ring-2 focus:ring-[#C08261]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2D4F1E] uppercase tracking-wider mb-1.5">
                        Estimated Affected Area / Volume
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 2.5 Acres, 3 km Canal, 50,000 Liters"
                        value={affectedAreaOrVolume}
                        onChange={(e) => setAffectedAreaOrVolume(e.target.value)}
                        className="w-full h-11 px-3.5 bg-[#FAF8F5] border border-[#C08261]/40 rounded-xl text-xs sm:text-sm font-medium text-[#2D4F1E] focus:outline-none focus:ring-2 focus:ring-[#C08261]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2D4F1E] uppercase tracking-wider mb-1.5">
                      Detailed Incident Description & Observed Impact *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe what happened: Odor, discoloration, dead crops/fish, suspected vehicle/factory source, time of dumping, threat to surrounding drinking water..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full p-3.5 bg-[#FAF8F5] border border-[#C08261]/40 rounded-xl text-xs sm:text-sm font-medium text-[#2D4F1E] focus:outline-none focus:ring-2 focus:ring-[#C08261]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2D4F1E] uppercase tracking-wider mb-1.5">
                      Affected Critical Natural Resources (Multi-select)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {RESOURCE_OPTIONS.map((res) => {
                        const isSelected = selectedResources.includes(res);
                        return (
                          <button
                            key={res}
                            type="button"
                            onClick={() => toggleResource(res)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                              isSelected
                                ? 'bg-[#2D4F1E] text-[#F4F1EA] shadow-sm'
                                : 'bg-[#FAF8F5] text-[#2D4F1E]/70 border border-[#C08261]/30 hover:border-[#C08261]'
                            }`}
                          >
                            {isSelected ? '✓ ' : '+ '} {res}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2D4F1E] uppercase tracking-wider mb-1.5">
                      Evidence Photo / Proof Image URL
                    </label>
                    <input
                      type="url"
                      value={evidencePhotoUrl}
                      onChange={(e) => setEvidencePhotoUrl(e.target.value)}
                      className="w-full h-11 px-3.5 bg-[#FAF8F5] border border-[#C08261]/40 rounded-xl text-xs sm:text-sm font-medium text-[#2D4F1E] focus:outline-none focus:ring-2 focus:ring-[#C08261]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 4: Complainant Information */}
              <div className="space-y-4 pt-4 border-t border-[#C08261]/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-7 h-7 bg-[#2D4F1E] text-[#F4F1EA] text-xs font-bold rounded-full flex items-center justify-center">4</span>
                    <h3 className="text-lg font-serif font-bold text-[#2D4F1E]">Complainant Details</h3>
                  </div>

                  <label className="flex items-center space-x-2 cursor-pointer text-xs font-bold text-[#C08261]">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="rounded border-[#C08261] text-[#C08261] focus:ring-[#C08261]"
                    />
                    <span>File Anonymously (Identity Protected)</span>
                  </label>
                </div>

                {!isAnonymous && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2D4F1E] uppercase tracking-wider mb-1.5">
                        Your Name / Organization
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Ramesh Patel"
                        value={complainantName}
                        onChange={(e) => setComplainantName(e.target.value)}
                        className="w-full h-11 px-3.5 bg-[#FAF8F5] border border-[#C08261]/40 rounded-xl text-xs sm:text-sm font-medium text-[#2D4F1E] focus:outline-none focus:ring-2 focus:ring-[#C08261]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2D4F1E] uppercase tracking-wider mb-1.5">
                        Phone Number (For inspection team SMS updates)
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +91 98765 43210"
                        value={complainantPhone}
                        onChange={(e) => setComplainantPhone(e.target.value)}
                        className="w-full h-11 px-3.5 bg-[#FAF8F5] border border-[#C08261]/40 rounded-xl text-xs sm:text-sm font-medium text-[#2D4F1E] focus:outline-none focus:ring-2 focus:ring-[#C08261]"
                      />
                    </div>
                  </div>
                )}

                {/* Instant SMS & WhatsApp Opt-In */}
                <div className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#C08261]/30 space-y-2">
                  <span className="text-[10px] font-extrabold uppercase text-[#2D4F1E] tracking-wider block">
                    Real-time Milestone Dispatch Preferences
                  </span>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-[#2D4F1E]">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={smsAlertsEnabled}
                        onChange={(e) => setSmsAlertsEnabled(e.target.checked)}
                        className="rounded border-[#C08261] text-[#2D4F1E] focus:ring-[#2D4F1E]"
                      />
                      <span className="flex items-center space-x-1">
                        <Smartphone className="w-3.5 h-3.5 text-[#C08261]" />
                        <span>Instant SMS Milestone Alerts</span>
                      </span>
                    </label>

                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={whatsappAlertsEnabled}
                        onChange={(e) => setWhatsappAlertsEnabled(e.target.checked)}
                        className="rounded border-[#C08261] text-[#2D4F1E] focus:ring-[#2D4F1E]"
                      />
                      <span className="flex items-center space-x-1">
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                        <span>WhatsApp Grievance Progress Updates</span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Form Error Banner */}
              {formError && (
                <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-xl">
                  {formError}
                </div>
              )}

              {/* Submit Action */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-2 text-xs text-[#2D4F1E]/75">
                  <Sparkles className="w-4 h-4 text-[#D4A359]" />
                  <span>Submitting triggers instant AI ecological risk assessment & authority notification.</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto h-11 px-6 bg-[#C08261] hover:bg-[#A86E4F] text-[#F4F1EA] font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-[#1F3814]/40 inline-flex items-center justify-center space-x-2 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Transmitting & AI Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Grievance & Dispatch Triage</span>
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: LIVE GRIEVANCE DIRECTORY */}
        {/* ========================================================================= */}
        {activeTab === 'directory' && (
          <div className="space-y-6">
            
            {/* Filter and Search Bar */}
            <div className="bg-white p-4 sm:p-6 rounded-3xl border border-[#C08261]/30 shadow-md space-y-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative w-full md:w-96">
                  <Search className="w-4 h-4 text-[#2D4F1E]/50 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="Search by ID, District, Cause, Location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 bg-[#FAF8F5] border border-[#C08261]/40 rounded-xl text-xs sm:text-sm font-medium text-[#2D4F1E] focus:outline-none focus:ring-2 focus:ring-[#C08261]"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                  <select
                    value={filterDomain}
                    onChange={(e) => setFilterDomain(e.target.value as any)}
                    className="h-10 px-3 bg-[#FAF8F5] border border-[#C08261]/40 rounded-xl text-xs font-bold text-[#2D4F1E]"
                  >
                    <option value="All">All Domains</option>
                    <option value="Land Pollution">Land / Soil Only</option>
                    <option value="Water Pollution">Waterbody Only</option>
                    <option value="Combined Land & Water">Combined</option>
                  </select>

                  <select
                    value={filterSeverity}
                    onChange={(e) => setFilterSeverity(e.target.value)}
                    className="h-10 px-3 bg-[#FAF8F5] border border-[#C08261]/40 rounded-xl text-xs font-bold text-[#2D4F1E]"
                  >
                    <option value="All">All Severities</option>
                    <option value="Critical (Immediate Hazard)">Critical Only</option>
                    <option value="High (Active Damage)">High Damage</option>
                    <option value="Moderate">Moderate</option>
                  </select>

                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="h-10 px-3 bg-[#FAF8F5] border border-[#C08261]/40 rounded-xl text-xs font-bold text-[#2D4F1E]"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Reported & Logged">Reported</option>
                    <option value="Inspection Officer Dispatched">Dispatched</option>
                    <option value="Water/Soil Samples in Lab Analysis">In Lab</option>
                    <option value="Legal Notice Issued & Containment Active">Containment Active</option>
                    <option value="Remediated & Revived">Remediated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Complaint Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredComplaints.length === 0 ? (
                <div className="col-span-2 bg-white p-12 rounded-3xl border border-[#C08261]/25 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-[#2D4F1E] mx-auto opacity-40" />
                  <h4 className="text-lg font-serif font-bold text-[#2D4F1E]">No Matching Pollution Reports Found</h4>
                  <p className="text-xs text-[#2D4F1E]/70">Try adjusting your filters or search terms.</p>
                </div>
              ) : (
                filteredComplaints.map((item) => {
                  const isCritical = item.severity.includes('Critical');
                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-3xl border border-[#C08261]/30 shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between"
                    >
                      <div>
                        {/* Card Image Banner */}
                        <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                          <img
                            src={item.evidencePhotoUrl}
                            alt={item.title}
                            className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                          
                          <div className="absolute top-3 left-3 flex items-center space-x-2">
                            <span className="px-2.5 py-1 bg-[#1F3814]/90 text-[#F4F1EA] text-[10px] font-bold rounded-lg uppercase tracking-wider backdrop-blur-sm border border-[#C08261]/40">
                              {item.domain}
                            </span>
                            <span className="px-2.5 py-1 bg-black/60 text-[#F4F1EA] text-[10px] font-mono rounded-lg">
                              {item.id}
                            </span>
                          </div>

                          <div className="absolute top-3 right-3">
                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${
                              isCritical ? 'bg-red-600 text-white' : 'bg-[#C08261] text-[#F4F1EA]'
                            }`}>
                              {item.severity.split(' ')[0]}
                            </span>
                          </div>

                          <div className="absolute bottom-3 left-3 right-3">
                            <h4 className="text-base font-serif font-bold text-white leading-snug line-clamp-1">
                              {item.title}
                            </h4>
                            <p className="text-[11px] text-white/80 flex items-center space-x-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-[#D89F80] shrink-0" />
                              <span>{item.location}, {item.district}</span>
                            </p>
                          </div>
                        </div>

                        {/* Card Content Body */}
                        <div className="p-5 space-y-4">
                          <div className="space-y-1">
                            <span className="text-[10px] font-extrabold uppercase text-[#C08261] tracking-wider">
                              Specific Cause
                            </span>
                            <p className="text-xs font-bold text-[#2D4F1E]">
                              {item.specificCause}
                            </p>
                          </div>

                          <p className="text-xs text-[#2D4F1E]/80 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>

                          {/* AI Risk Score Pill & Status */}
                          <div className="flex items-center justify-between pt-2 border-t border-[#C08261]/15 text-xs">
                            <div className="flex items-center space-x-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-[#D4A359]" />
                              <span className="text-[11px] font-semibold text-[#2D4F1E]">
                                AI Risk Score: <strong className="text-[#C08261]">{item.aiAssessment?.riskScore || 85}/100</strong>
                              </span>
                            </div>

                            <span className="px-2.5 py-0.5 bg-[#FAF8F5] text-[#2D4F1E] border border-[#C08261]/30 rounded-full text-[10px] font-bold">
                              {item.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="p-4 bg-[#FAF8F5] border-t border-[#C08261]/20 flex items-center justify-between">
                        <span className="text-[10px] text-[#2D4F1E]/70">
                          Reported: {item.createdAt.split('T')[0]}
                        </span>

                        <button
                          onClick={() => {
                            setSelectedComplaint(item);
                            setActiveTab('track');
                          }}
                          className="h-8 px-3.5 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#F4F1EA] text-xs font-bold rounded-xl inline-flex items-center space-x-1.5 transition-colors shadow-sm"
                        >
                          <span>Full Triage & AI Bio-Remedy</span>
                          <ChevronRight className="w-3 h-3 text-[#D89F80]" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: TRACK COMPLAINT & AI DIAGNOSTIC DASHBOARD */}
        {/* ========================================================================= */}
        {activeTab === 'track' && (
          <div className="space-y-8">
            
            {/* Search Track Header */}
            <div className="bg-white p-6 rounded-3xl border border-[#C08261]/30 shadow-md space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-[#2D4F1E]/50 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="Enter Tracking ID (e.g. POL-2026-081) or Complainant Phone..."
                    value={trackingIdInput}
                    onChange={(e) => setTrackingIdInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleTrackSearch()}
                    className="w-full h-11 pl-10 pr-4 bg-[#FAF8F5] border border-[#C08261]/40 rounded-xl text-xs sm:text-sm font-medium text-[#2D4F1E] focus:outline-none focus:ring-2 focus:ring-[#C08261]"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleTrackSearch}
                  className="w-full sm:w-auto h-11 px-6 bg-[#C08261] hover:bg-[#A06445] text-[#F4F1EA] font-bold text-xs rounded-xl shadow-md inline-flex items-center justify-center space-x-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Track Status</span>
                </button>
              </div>
              {trackingError && (
                <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold rounded-xl">
                  {trackingError}
                </div>
              )}
            </div>

            {selectedComplaint ? (
              <div className="space-y-8">
                
                {/* Top Details Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#C08261]/30 shadow-xl space-y-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#C08261]/20">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-0.5 bg-[#2D4F1E] text-[#F4F1EA] text-xs font-bold rounded-lg">
                          {selectedComplaint.domain}
                        </span>
                        <span className="px-2.5 py-0.5 bg-[#FAF8F5] text-[#C08261] border border-[#C08261]/30 font-mono text-xs font-bold rounded-lg">
                          {selectedComplaint.id}
                        </span>
                        <span className="text-xs text-[#2D4F1E]/70">
                          Filed on {selectedComplaint.createdAt.split('T')[0]}
                        </span>
                      </div>

                      <h2 className="text-2xl font-serif font-bold text-[#2D4F1E]">
                        {selectedComplaint.title}
                      </h2>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase text-[#C08261] tracking-wider block">
                        Assigned Field Officer
                      </span>
                      <p className="text-xs sm:text-sm font-bold text-[#2D4F1E]">
                        {selectedComplaint.assignedOfficer || 'Queued for Assignment'}
                      </p>
                    </div>
                  </div>

                  {/* 5-Step Lifecycle Progression Tracker */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-extrabold uppercase text-[#2D4F1E] tracking-wider">
                      Redressal & Restoration Lifecycle
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                      {[
                        'Reported & Logged',
                        'Inspection Officer Dispatched',
                        'Water/Soil Samples in Lab Analysis',
                        'Legal Notice Issued & Containment Active',
                        'Remediated & Revived'
                      ].map((step, idx) => {
                        const currentIdx = getStatusStepIndex(selectedComplaint.status);
                        const isDone = idx <= currentIdx;
                        const isCurrent = idx === currentIdx;

                        return (
                          <div
                            key={step}
                            className={`p-3 rounded-2xl border text-center transition-all ${
                              isCurrent
                                ? 'bg-[#2D4F1E] text-[#F4F1EA] border-[#D4A359] shadow-md'
                                : isDone
                                ? 'bg-[#FAF8F5] text-[#2D4F1E] border-[#C08261]'
                                : 'bg-slate-50 text-slate-400 border-slate-200'
                            }`}
                          >
                            <p className="text-[10px] font-bold mb-1">Step {idx + 1}</p>
                            <p className="text-xs font-semibold leading-tight">{step}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Incident Snapshot & Evidence */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#C08261]/20">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-extrabold uppercase text-[#C08261] tracking-wider">
                          Incident Location & Extent
                        </h4>
                        <p className="text-sm font-bold text-[#2D4F1E] mt-0.5">
                          {selectedComplaint.location}, {selectedComplaint.district}, {selectedComplaint.state}
                        </p>
                        <p className="text-xs text-[#2D4F1E]/80">
                          Landmark: {selectedComplaint.surveyNumberOrLandmark} • Area/Volume: <strong>{selectedComplaint.affectedAreaOrVolume}</strong>
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xs font-extrabold uppercase text-[#C08261] tracking-wider">
                          Description of Contamination
                        </h4>
                        <p className="text-xs text-[#2D4F1E]/85 leading-relaxed mt-1">
                          {selectedComplaint.description}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xs font-extrabold uppercase text-[#C08261] tracking-wider">
                          Affected Community Resources
                        </h4>
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {selectedComplaint.affectedResources.map(r => (
                            <span key={r} className="px-2.5 py-1 bg-[#FAF8F5] text-[#2D4F1E] border border-[#C08261]/30 rounded-lg text-[11px] font-semibold">
                              • {r}
                            </span>
                          ))}
                        </div>
                      </div>

                      {selectedComplaint.adminRemarks && (
                        <div className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#C08261]/30 space-y-1">
                          <p className="text-[10px] font-extrabold uppercase text-[#2D4F1E] tracking-wider">
                            Official Environmental Officer Log
                          </p>
                          <p className="text-xs text-[#2D4F1E]/85">
                            {selectedComplaint.adminRemarks}
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="text-xs font-extrabold uppercase text-[#C08261] tracking-wider mb-2">
                        Field Evidence Photo
                      </h4>
                      <div className="rounded-2xl overflow-hidden border border-[#C08261]/30 shadow-inner h-64 bg-slate-900">
                        <img
                          src={selectedComplaint.evidencePhotoUrl}
                          alt="Field Evidence"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                </div>

                {/* WhatsApp & SMS Redressal Milestone Tracker */}
                <ComplaintMilestoneTracker
                  complaint={selectedComplaint}
                  onUpdateComplaint={async (updated) => {
                    setSelectedComplaint(updated);
                    if (onUpdateComplaint) {
                      await onUpdateComplaint(updated);
                    }
                  }}
                />

                {/* AI Bio-Remediation & Emergency Triage Box */}
                {selectedComplaint.aiAssessment && (
                  <div className="bg-[#2D4F1E] text-[#F4F1EA] rounded-3xl p-6 sm:p-8 border border-[#D4A359] shadow-2xl space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-11 h-11 bg-[#D4A359] text-[#1F3814] rounded-2xl flex items-center justify-center font-bold">
                          <Sparkles className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-[10px] font-extrabold uppercase text-[#D89F80] tracking-widest">
                            Eden Sync AI Environmental Intelligence
                          </span>
                          <h3 className="text-xl font-serif font-bold text-[#F4F1EA]">
                            Emergency Bio-Remediation & Safety Blueprint
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-[#D89F80] uppercase">Risk Assessment</p>
                          <p className="text-xl font-serif font-extrabold text-[#D4A359]">
                            {selectedComplaint.aiAssessment.riskScore}/100
                          </p>
                        </div>
                        <div className="text-right pl-3 border-l border-[#C08261]/30">
                          <p className="text-[10px] font-bold text-[#D89F80] uppercase">Priority</p>
                          <p className="text-xs font-bold text-[#F4F1EA]">
                            {selectedComplaint.aiAssessment.containmentPriority}
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#F4F1EA]/90 leading-relaxed italic bg-[#1F3814] p-4 rounded-2xl border border-[#C08261]/30">
                      "{selectedComplaint.aiAssessment.environmentalHazardSummary}"
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Safety Measures */}
                      <div className="bg-[#1F3814] p-5 rounded-2xl border border-[#C08261]/30 space-y-3">
                        <h4 className="text-xs font-extrabold uppercase text-[#D4A359] tracking-wider flex items-center space-x-2">
                          <ShieldAlert className="w-4 h-4" />
                          <span>Immediate Safety Containment Steps</span>
                        </h4>
                        <ul className="space-y-2 text-xs text-[#F4F1EA]/85">
                          {selectedComplaint.aiAssessment.immediateSafetyMeasures.map((measure, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <span className="text-[#D4A359] font-bold">⚠️</span>
                              <span>{measure}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Bio Remediation */}
                      <div className="bg-[#1F3814] p-5 rounded-2xl border border-[#C08261]/30 space-y-3">
                        <h4 className="text-xs font-extrabold uppercase text-[#D89F80] tracking-wider flex items-center space-x-2">
                          <Trees className="w-4 h-4" />
                          <span>Scientifically Recommended Bio-Remediation</span>
                        </h4>
                        <ul className="space-y-2 text-xs text-[#F4F1EA]/85">
                          {selectedComplaint.aiAssessment.recommendedBioRemediation.map((bio, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <span className="text-[#D89F80] font-bold">🌱</span>
                              <span>{bio}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#C08261]/30 text-xs text-[#F4F1EA]/80">
                      <div>
                        <span>Notified Regulatory Bodies: </span>
                        <strong className="text-[#D89F80]">
                          {selectedComplaint.aiAssessment.responsibleAuthorities.join(' • ')}
                        </strong>
                      </div>
                      <div>
                        <span>Est. Ecological Recovery: </span>
                        <strong className="text-[#D4A359]">
                          {selectedComplaint.aiAssessment.estimatedEcologicalRecoveryWeeks} Weeks
                        </strong>
                      </div>
                    </div>

                  </div>
                )}

              </div>
            ) : (
              <div className="bg-white p-12 rounded-3xl border border-[#C08261]/30 text-center space-y-4">
                <Search className="w-12 h-12 text-[#C08261] mx-auto opacity-50" />
                <h3 className="text-lg font-serif font-bold text-[#2D4F1E]">
                  Select a Complaint from Directory or Search by ID
                </h3>
                <p className="text-xs text-[#2D4F1E]/70 max-w-md mx-auto">
                  Click on any incident in the Live Grievance Directory to inspect full lifecycle tracking, official inspection remarks, and AI bio-remediation advice.
                </p>
                <button
                  onClick={() => setActiveTab('directory')}
                  className="h-10 px-5 bg-[#2D4F1E] text-[#F4F1EA] font-bold text-xs rounded-xl shadow-md inline-flex items-center space-x-2"
                >
                  <span>Browse Directory</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
};
