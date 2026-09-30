import React, { useState } from 'react';
import { CustomerRecord, CustomerCategory, CustomerUrgency, CustomerStatus, LandType, UserProfile } from '../types';
import { 
  Users, Search, Filter, Plus, FileText, Download, CheckCircle2, 
  AlertTriangle, Clock, MapPin, Phone, Mail, Droplets, Sprout, 
  Layers, ChevronRight, X, Sparkles, SlidersHorizontal, ShieldCheck,
  Building2, Trees, Landmark, Lock, KeyRound
} from 'lucide-react';

interface CustomerDatabasePageProps {
  customers: CustomerRecord[];
  onAddCustomer?: (newCustomer: Partial<CustomerRecord>) => Promise<void>;
  onCreateCustomer?: (newCustomer: Partial<CustomerRecord>) => Promise<void>;
  onUpdateCustomer: (updatedCustomer: CustomerRecord) => Promise<void>;
  onDeleteCustomer: (id: string) => Promise<void>;
  currentUser?: UserProfile | null;
  onOpenAdminLogin?: () => void;
}

export const CustomerDatabasePage: React.FC<CustomerDatabasePageProps> = ({
  customers,
  onAddCustomer,
  onCreateCustomer,
  onUpdateCustomer,
  onDeleteCustomer,
  currentUser,
  onOpenAdminLogin
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLandType, setSelectedLandType] = useState<string>('All');
  const [selectedUrgency, setSelectedUrgency] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [activeCustomerDetail, setActiveCustomerDetail] = useState<CustomerRecord | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // If user is not admin, show restricted message
  const isAdmin = currentUser?.role === 'admin';

  // Add Customer Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: 'Smallholder Farmer' as CustomerCategory,
    district: '',
    state: '',
    country: 'India',
    surveyNumber: '',
    landArea: 0,
    areaUnit: 'acres' as 'acres' | 'cents' | 'hectares',
    landType: 'Agricultural Farmland' as LandType,
    primaryRequirementsText: '',
    budgetPreference: 'Govt Subsidy / Eco Grant',
    urgency: 'Immediate (< 30 Days)' as CustomerUrgency,
    status: 'Active In-Progress' as CustomerStatus,
    assignedAgronomist: 'Dr. Anita Roy (Soil Bio-Chemist)',
    notes: '',
    ph: 0,
    organicCarbonPct: 0,
    salinityEC: 0,
    waterTableDepthFt: 0
  });

  // Extract unique countries
  const countries = ['All', ...Array.from(new Set(customers.map(c => c.country)))];
  const categories = ['All', 'Smallholder Farmer', 'Commercial Agro-Forestry', 'Village Panchayat Collective', 'Eco-Trust / Agro-Enterprise', 'Salt-Affected Landholder'];
  const landTypes = ['All', 'Agricultural Farmland', 'Pond / Water Body', 'Barren / Fallow Land', 'Degraded Forest Border', 'River Bank / Coastal'];
  const urgencies = ['All', 'Immediate (< 30 Days)', 'Medium (1-3 Months)', 'Long Term Planning'];
  const statuses = ['All', 'Active In-Progress', 'Assessment Completed', 'Site Inspection Scheduled', 'Restored & Monitored', 'Funding / Subsidy Approved'];

  // Filtering
  const filteredCustomers = customers.filter(c => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      c.name.toLowerCase().includes(query) ||
      c.district.toLowerCase().includes(query) ||
      c.state.toLowerCase().includes(query) ||
      c.surveyNumber.toLowerCase().includes(query) ||
      c.primaryRequirements.some(r => r.toLowerCase().includes(query));

    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesLand = selectedLandType === 'All' || c.landType === selectedLandType;
    const matchesUrg = selectedUrgency === 'All' || c.urgency === selectedUrgency;
    const matchesStat = selectedStatus === 'All' || c.status === selectedStatus;
    const matchesCtry = selectedCountry === 'All' || c.country === selectedCountry;

    return matchesSearch && matchesCat && matchesLand && matchesUrg && matchesStat && matchesCtry;
  });

  // Aggregate Metrics
  const totalLandArea = customers.reduce((acc, c) => acc + (c.landArea || 0), 0);
  const immediateUrgentCount = customers.filter(c => c.urgency.includes('Immediate')).length;
  const inProgressCount = customers.filter(c => c.status === 'Active In-Progress').length;
  const restoredCount = customers.filter(c => c.status === 'Restored & Monitored').length;

  const handleExportCSV = () => {
    const headers = ['ID,Customer Name,Phone,Email,Category,District,State,Country,Survey No,Land Area,Unit,Land Type,Urgency,Status,Primary Requirements,Assigned Agronomist'];
    const rows = filteredCustomers.map(c => 
      `"${c.id}","${c.name}","${c.phone}","${c.email}","${c.category}","${c.district}","${c.state}","${c.country}","${c.surveyNumber}","${c.landArea}","${c.areaUnit}","${c.landType}","${c.urgency}","${c.status}","${c.primaryRequirements.join('; ')}","${c.assignedAgronomist}"`
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `EdenSync_Customers_Requirements_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateCustomerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const requirementsArray = formData.primaryRequirementsText
        .split('\n')
        .map(r => r.trim())
        .filter(r => r.length > 0);

      const newCustomerData: Partial<CustomerRecord> = {
        name: formData.name || 'New Customer',
        phone: formData.phone,
        email: formData.email,
        category: formData.category,
        district: formData.district || 'State District',
        state: formData.state || 'State',
        country: formData.country || 'India',
        surveyNumber: formData.surveyNumber || `SF/${Math.floor(100 + Math.random() * 900)}`,
        landArea: Number(formData.landArea) || 0,
        areaUnit: formData.areaUnit,
        landType: formData.landType,
        primaryRequirements: requirementsArray.length > 0 ? requirementsArray : ['Soil nutrient analysis and organic carbon restoration plan.'],
        budgetPreference: formData.budgetPreference,
        urgency: formData.urgency,
        status: formData.status,
        assignedAgronomist: formData.assignedAgronomist,
        notes: formData.notes || 'Registered in database for technical inspection.',
        soilMetrics: {
          ph: Number(formData.ph) || 0,
          organicCarbonPct: Number(formData.organicCarbonPct) || 0,
          salinityEC: Number(formData.salinityEC) || 0,
          waterTableDepthFt: Number(formData.waterTableDepthFt) || 0,
          primaryDeficiency: 'Nutrient imbalance and reduced water retention.'
        },
        aiRecommendationSummary: `Tailored plan for ${formData.landArea} ${formData.areaUnit} ${formData.landType}: Inoculate microbial consortia, apply organic bio-mulch, and implement contour rainwater catchment.`
      };

      if (onCreateCustomer) {
        await onCreateCustomer(newCustomerData);
      } else if (onAddCustomer) {
        await onAddCustomer(newCustomerData);
      }
      setShowAddModal(false);
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        category: 'Smallholder Farmer',
        district: '',
        state: '',
        country: 'India',
        surveyNumber: '',
        landArea: 0,
        areaUnit: 'acres',
        landType: 'Agricultural Farmland',
        primaryRequirementsText: '',
        budgetPreference: 'Govt Subsidy / Eco Grant',
        urgency: 'Immediate (< 30 Days)',
        status: 'Active In-Progress',
        assignedAgronomist: 'Dr. Anita Roy (Soil Bio-Chemist)',
        notes: '',
        ph: 0,
        organicCarbonPct: 0,
        salinityEC: 0,
        waterTableDepthFt: 0
      });
    } catch (err) {
      console.error('Failed to add customer:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // If Not Admin, render restricted access screen
  if (!isAdmin) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="bg-[#FAF8F5] p-8 sm:p-12 rounded-3xl border border-[#C08261]/30 shadow-2xl space-y-6">
          <div className="w-16 h-16 bg-[#1F3814] text-[#D89F80] rounded-3xl mx-auto flex items-center justify-center shadow-lg">
            <Lock className="w-8 h-8 text-[#C08261]" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 bg-[#2D4F1E]/10 text-[#C08261] text-xs font-bold uppercase rounded-full tracking-wider border border-[#C08261]/20">
              Restricted Admin View
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#2D4F1E]">
              Customer Database Access Locked
            </h2>
            <p className="text-sm text-[#2D4F1E]/80 max-w-lg mx-auto">
              Per data privacy and administrative protocols, the full customer database and private land requirement dossiers are only visible to authorized Eden Sync Administrators.
            </p>
          </div>

          <div className="p-4 bg-[#EFECE6] rounded-2xl border border-[#2D4F1E]/20 text-xs text-[#2D4F1E] max-w-md mx-auto space-y-1.5 text-left">
            <p className="font-bold flex items-center space-x-1.5 text-[#2D4F1E]">
              <ShieldCheck className="w-4 h-4 text-[#C08261]" />
              <span>Authorized Admin Credentials</span>
            </p>
            <p className="text-[11px] text-[#2D4F1E]/80">
              Admin IDs: <code className="font-mono font-bold bg-[#FAF8F5] px-1 py-0.5 rounded border border-[#2D4F1E]/15">edensync01@gmail.com</code> to <code className="font-mono font-bold bg-[#FAF8F5] px-1 py-0.5 rounded border border-[#2D4F1E]/15">edensync10@gmail.com</code>
            </p>
            <p className="text-[11px] text-[#2D4F1E]/80">
              Master Password: <code className="font-mono font-bold bg-[#FAF8F5] px-1 py-0.5 rounded border border-[#2D4F1E]/15">EDEN@#sync</code>
            </p>
          </div>

          {onOpenAdminLogin && (
            <button
              onClick={onOpenAdminLogin}
              className="h-11 px-6 bg-[#C08261] hover:bg-[#A06445] text-[#F4F1EA] font-bold text-xs rounded-xl shadow-lg transition-all active:scale-95 inline-flex items-center justify-center space-x-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Sign In as Admin (edensync01 – edensync10)</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-[#2D4F1E] text-[#F4F1EA] p-8 sm:p-10 rounded-3xl border border-[#C08261]/40 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-[#1F3814] rounded-full text-xs font-bold text-[#D89F80] border border-[#C08261]/30">
            <Users className="w-3.5 h-3.5" />
            <span>Landowner & Community Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight">
            Customer Database & Requirements Master
          </h1>
          <p className="text-xs sm:text-sm text-[#F4F1EA]/90 leading-relaxed">
            Real customer records tracking specific land coordinates, soil salinity diagnostics, pond de-silting requirements, and on-field agronomist assignments.
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
          <button
            onClick={handleExportCSV}
            title="Download Customer Database as CSV"
            className="h-10 px-4 bg-[#1F3814] hover:bg-[#16290E] text-[#F4F1EA] font-bold text-xs rounded-xl border border-[#C08261]/40 transition-all inline-flex items-center justify-center space-x-2 shadow-md active:scale-95 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#D89F80] shrink-0" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="h-10 px-5 bg-[#C08261] hover:bg-[#A86E4F] text-[#F4F1EA] font-bold text-xs rounded-xl shadow-lg transition-all inline-flex items-center justify-center space-x-2 active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4 shrink-0" />
            <span>+ Add Customer Requirement</span>
          </button>
        </div>
      </div>

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#C08261]/20 shadow-sm space-y-1">
          <p className="text-[11px] font-bold text-[#2D4F1E]/70 uppercase tracking-wider">Total Registered Customers</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-serif font-extrabold text-[#2D4F1E]">{customers.length}</span>
            <span className="text-xs font-semibold text-[#C08261]">Landowners & Collectives</span>
          </div>
        </div>

        <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#C08261]/20 shadow-sm space-y-1">
          <p className="text-[11px] font-bold text-[#2D4F1E]/70 uppercase tracking-wider">Total Land Area In Scope</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-serif font-extrabold text-[#2D4F1E]">{totalLandArea.toFixed(1)}</span>
            <span className="text-xs font-semibold text-[#2D4F1E]/80">Acres / Hectares</span>
          </div>
        </div>

        <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#C08261]/20 shadow-sm space-y-1">
          <p className="text-[11px] font-bold text-[#2D4F1E]/70 uppercase tracking-wider">Immediate (&lt; 30 Days) Urgency</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-serif font-extrabold text-amber-700">{immediateUrgentCount}</span>
            <span className="text-xs font-semibold text-amber-800/80">Priority Interventions</span>
          </div>
        </div>

        <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#C08261]/20 shadow-sm space-y-1">
          <p className="text-[11px] font-bold text-[#2D4F1E]/70 uppercase tracking-wider">Active Field Works</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-serif font-extrabold text-[#2D4F1E]">{inProgressCount}</span>
            <span className="text-xs font-semibold text-emerald-700">({restoredCount} Restored & Monitored)</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-[#FAF8F5] p-5 rounded-3xl border border-[#C08261]/20 shadow-md space-y-4">
        
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#2D4F1E]/50 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by customer name, district, survey number, or requirement..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-semibold text-[#2D4F1E] placeholder-[#2D4F1E]/50 focus:outline-none focus:ring-2 focus:ring-[#C08261]"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-[#EFECE6] p-1 rounded-2xl border border-[#2D4F1E]/20 h-10 shrink-0">
            <button
              onClick={() => setViewMode('cards')}
              className={`h-8 px-3 text-xs font-bold rounded-xl inline-flex items-center justify-center space-x-1.5 transition-all ${
                viewMode === 'cards'
                  ? 'bg-[#2D4F1E] text-[#F4F1EA] shadow-sm'
                  : 'text-[#2D4F1E]/80 hover:text-[#2D4F1E]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`h-8 px-3 text-xs font-bold rounded-xl inline-flex items-center justify-center space-x-1.5 transition-all ${
                viewMode === 'table'
                  ? 'bg-[#2D4F1E] text-[#F4F1EA] shadow-sm'
                  : 'text-[#2D4F1E]/80 hover:text-[#2D4F1E]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
          </div>

        </div>

        {/* Dropdown Filters Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-2 border-t border-[#2D4F1E]/10">
          
          <div>
            <label className="block text-[10px] font-bold text-[#2D4F1E]/60 uppercase mb-1">Customer Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full h-9 px-2 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-lg text-xs font-medium text-[#2D4F1E] focus:outline-none focus:ring-1 focus:ring-[#C08261]"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#2D4F1E]/60 uppercase mb-1">Land Type</label>
            <select
              value={selectedLandType}
              onChange={(e) => setSelectedLandType(e.target.value)}
              className="w-full h-9 px-2 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-lg text-xs font-medium text-[#2D4F1E] focus:outline-none focus:ring-1 focus:ring-[#C08261]"
            >
              {landTypes.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#2D4F1E]/60 uppercase mb-1">Urgency</label>
            <select
              value={selectedUrgency}
              onChange={(e) => setSelectedUrgency(e.target.value)}
              className="w-full h-9 px-2 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-lg text-xs font-medium text-[#2D4F1E] focus:outline-none focus:ring-1 focus:ring-[#C08261]"
            >
              {urgencies.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#2D4F1E]/60 uppercase mb-1">Restoration Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full h-9 px-2 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-lg text-xs font-medium text-[#2D4F1E] focus:outline-none focus:ring-1 focus:ring-[#C08261]"
            >
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#2D4F1E]/60 uppercase mb-1">Country / Region</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full h-9 px-2 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-lg text-xs font-medium text-[#2D4F1E] focus:outline-none focus:ring-1 focus:ring-[#C08261]"
            >
              {countries.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

        </div>

      </div>

      {/* Customer Results List */}
      {filteredCustomers.length === 0 ? (
        <div className="bg-[#FAF8F5] p-12 text-center rounded-3xl border border-[#C08261]/20 space-y-3">
          <AlertTriangle className="w-10 h-10 text-[#C08261] mx-auto" />
          <h3 className="text-lg font-serif font-bold text-[#2D4F1E]">No customer records matched your query</h3>
          <p className="text-xs text-[#2D4F1E]/70 max-w-md mx-auto">
            Try adjusting your search keywords or resetting filters to view all registered landowners and community water collectives.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedLandType('All');
              setSelectedUrgency('All');
              setSelectedStatus('All');
              setSelectedCountry('All');
            }}
            className="h-9 px-4 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#F4F1EA] font-bold text-xs rounded-xl inline-flex items-center justify-center mt-2 shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'cards' ? (
        /* Cards View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((cust) => (
            <div
              key={cust.id}
              className="bg-[#FAF8F5] rounded-3xl border border-[#C08261]/20 p-6 shadow-md hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                {/* Card Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 bg-[#2D4F1E]/10 text-[#2D4F1E] text-[10px] font-bold uppercase rounded-md mb-1">
                      {cust.category}
                    </span>
                    <h3 className="text-base font-serif font-bold text-[#2D4F1E] group-hover:text-[#C08261] transition-colors leading-tight">
                      {cust.name}
                    </h3>
                  </div>
                  <span className={`px-2.5 py-1 text-[10px] font-bold rounded-lg shrink-0 ${
                    cust.urgency.includes('Immediate') ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                    cust.urgency.includes('Medium') ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {cust.urgency}
                  </span>
                </div>

                {/* Location & Survey Details */}
                <div className="space-y-1 text-xs text-[#2D4F1E]/80">
                  <p className="flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C08261] shrink-0" />
                    <span>{cust.district}, {cust.state} ({cust.country})</span>
                  </p>
                  <p className="flex items-center space-x-1.5 text-[11px] font-mono text-[#2D4F1E]/70 pl-5">
                    <span>Survey: {cust.surveyNumber} • </span>
                    <span className="font-bold text-[#2D4F1E]">{cust.landArea} {cust.areaUnit}</span>
                    <span>({cust.landType})</span>
                  </p>
                </div>

                {/* Primary Requirements Highlights */}
                <div className="bg-[#EFECE6] p-3.5 rounded-2xl border border-[#2D4F1E]/10 space-y-1.5">
                  <p className="text-[10px] font-bold uppercase text-[#C08261] flex items-center space-x-1">
                    <Droplets className="w-3 h-3 text-[#C08261]" />
                    <span>Key Ecological Requirements:</span>
                  </p>
                  <ul className="space-y-1 text-xs text-[#2D4F1E]/90">
                    {cust.primaryRequirements.slice(0, 2).map((req, idx) => (
                      <li key={idx} className="flex items-start space-x-1.5">
                        <span className="text-[#C08261] font-bold">•</span>
                        <span className="line-clamp-1">{req}</span>
                      </li>
                    ))}
                    {cust.primaryRequirements.length > 2 && (
                      <li className="text-[11px] font-bold text-[#2D4F1E]/60 italic pl-2.5">
                        +{cust.primaryRequirements.length - 2} more requirements...
                      </li>
                    )}
                  </ul>
                </div>

                {/* Soil & Water Metrics Badge */}
                {cust.soilMetrics && (
                  <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] font-bold text-[#2D4F1E]">
                    <div className="bg-[#FAF8F5] p-1.5 rounded-lg border border-[#2D4F1E]/15">
                      <span className="text-[#2D4F1E]/60 block">pH Level</span>
                      <span className="font-mono">{cust.soilMetrics.ph}</span>
                    </div>
                    <div className="bg-[#FAF8F5] p-1.5 rounded-lg border border-[#2D4F1E]/15">
                      <span className="text-[#2D4F1E]/60 block">Organic C</span>
                      <span className="font-mono">{cust.soilMetrics.organicCarbonPct}%</span>
                    </div>
                    <div className="bg-[#FAF8F5] p-1.5 rounded-lg border border-[#2D4F1E]/15">
                      <span className="text-[#2D4F1E]/60 block">Water Table</span>
                      <span className="font-mono">{cust.soilMetrics.waterTableDepthFt} ft</span>
                    </div>
                  </div>
                )}

              </div>

              {/* Card Footer & Action */}
              <div className="pt-3 border-t border-[#2D4F1E]/10 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#2D4F1E]/70 truncate max-w-[150px]">
                  Agronomist: {cust.assignedAgronomist.split('(')[0]}
                </span>

                <button
                  onClick={() => setActiveCustomerDetail(cust)}
                  className="h-8 px-3 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#F4F1EA] font-bold text-xs rounded-xl inline-flex items-center justify-center space-x-1 transition-transform active:scale-95 shadow-sm"
                >
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-[#FAF8F5] rounded-3xl border border-[#C08261]/20 shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#2D4F1E] text-[#F4F1EA] font-bold uppercase tracking-wider text-[10px]">
                  <th className="p-3.5 pl-6">Customer / Contact</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Location & Survey</th>
                  <th className="p-3.5">Land Area & Type</th>
                  <th className="p-3.5">Primary Requirements</th>
                  <th className="p-3.5">Urgency</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 pr-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2D4F1E]/10 text-[#2D4F1E]">
                {filteredCustomers.map((cust) => (
                  <tr key={cust.id} className="hover:bg-[#EFECE6]/60 transition-colors">
                    <td className="p-3.5 pl-6">
                      <p className="font-bold text-sm text-[#2D4F1E]">{cust.name}</p>
                      <p className="text-[11px] text-[#2D4F1E]/70">{cust.phone}</p>
                      <p className="text-[10px] text-[#2D4F1E]/50 truncate max-w-[140px]">{cust.email}</p>
                    </td>

                    <td className="p-3.5">
                      <span className="px-2 py-0.5 bg-[#2D4F1E]/10 text-[#2D4F1E] text-[10px] font-bold rounded-md whitespace-nowrap">
                        {cust.category}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <p className="font-medium">{cust.district}, {cust.state}</p>
                      <p className="text-[10px] font-mono text-[#2D4F1E]/70">{cust.surveyNumber}</p>
                    </td>

                    <td className="p-3.5">
                      <p className="font-bold">{cust.landArea} {cust.areaUnit}</p>
                      <p className="text-[11px] text-[#2D4F1E]/70 whitespace-nowrap">{cust.landType}</p>
                    </td>

                    <td className="p-3.5 max-w-xs">
                      <p className="line-clamp-2 text-xs font-medium text-[#2D4F1E]/90">
                        {cust.primaryRequirements.join(', ')}
                      </p>
                    </td>

                    <td className="p-3.5 whitespace-nowrap">
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${
                        cust.urgency.includes('Immediate') ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {cust.urgency}
                      </span>
                    </td>

                    <td className="p-3.5 whitespace-nowrap">
                      <span className="px-2.5 py-1 bg-[#2D4F1E] text-[#F4F1EA] text-[10px] font-bold rounded-lg shadow-sm">
                        {cust.status}
                      </span>
                    </td>

                    <td className="p-3.5 pr-6 text-center">
                      <button
                        onClick={() => setActiveCustomerDetail(cust)}
                        className="h-8 px-3 bg-[#EFECE6] hover:bg-[#2D4F1E] hover:text-[#F4F1EA] text-[#2D4F1E] font-bold text-xs rounded-xl inline-flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-sm"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Customer Detail Inspection Modal */}
      {activeCustomerDetail && (
        <div className="fixed inset-0 z-50 bg-[#1F3814]/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6 border border-[#C08261]/30">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#2D4F1E]/10 pb-4">
              <div>
                <span className="px-2.5 py-0.5 bg-[#2D4F1E] text-[#D89F80] text-[10px] font-bold uppercase rounded-md">
                  {activeCustomerDetail.id} • {activeCustomerDetail.category}
                </span>
                <h2 className="text-2xl font-serif font-bold text-[#2D4F1E] mt-1">
                  {activeCustomerDetail.name}
                </h2>
                <p className="text-xs text-[#2D4F1E]/70">
                  Registered on {activeCustomerDetail.registeredDate} • Assigned: {activeCustomerDetail.assignedAgronomist}
                </p>
              </div>

              <button
                onClick={() => setActiveCustomerDetail(null)}
                className="w-8 h-8 rounded-full bg-[#EFECE6] hover:bg-[#2D4F1E] hover:text-[#F4F1EA] text-[#2D4F1E] inline-flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Contact & Location Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#EFECE6] p-4 rounded-2xl border border-[#2D4F1E]/10 text-xs text-[#2D4F1E]">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-[#2D4F1E]/60 uppercase">Phone & Email</span>
                <p className="font-semibold flex items-center space-x-1">
                  <Phone className="w-3 h-3 text-[#C08261]" />
                  <span>{activeCustomerDetail.phone}</span>
                </p>
                <p className="text-[11px] text-[#2D4F1E]/70 truncate">{activeCustomerDetail.email}</p>
              </div>

              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-[#2D4F1E]/60 uppercase">Location & Region</span>
                <p className="font-semibold">{activeCustomerDetail.district}, {activeCustomerDetail.state}</p>
                <p className="text-[11px] text-[#2D4F1E]/70">{activeCustomerDetail.country}</p>
              </div>

              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-[#2D4F1E]/60 uppercase">Land & Survey</span>
                <p className="font-semibold">{activeCustomerDetail.landArea} {activeCustomerDetail.areaUnit} ({activeCustomerDetail.landType})</p>
                <p className="text-[11px] font-mono text-[#2D4F1E]/70">Survey: {activeCustomerDetail.surveyNumber}</p>
              </div>
            </div>

            {/* Requirements Master Checklist */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#2D4F1E] uppercase tracking-wider flex items-center space-x-1.5">
                <Droplets className="w-4 h-4 text-[#C08261]" />
                <span>Customer's Registered Ecological Requirements</span>
              </h4>

              <div className="space-y-2">
                {activeCustomerDetail.primaryRequirements.map((req, i) => (
                  <div key={i} className="p-3 bg-[#FAF8F5] border border-[#2D4F1E]/20 rounded-xl flex items-start space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2D4F1E] shrink-0 mt-0.5" />
                    <span className="text-xs font-medium text-[#2D4F1E]">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Diagnostic Metrics & Lab Report */}
            {activeCustomerDetail.soilMetrics && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#2D4F1E] uppercase tracking-wider flex items-center space-x-1.5">
                  <Sprout className="w-4 h-4 text-[#2D4F1E]" />
                  <span>Soil & Hydrology Diagnostic Metrics</span>
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
                  <div className="p-3 bg-[#EFECE6] rounded-xl border border-[#2D4F1E]/15">
                    <span className="text-[10px] font-bold text-[#2D4F1E]/60 uppercase block">Soil pH</span>
                    <span className="text-base font-bold font-mono text-[#2D4F1E]">{activeCustomerDetail.soilMetrics.ph}</span>
                    <span className="text-[9px] text-[#2D4F1E]/70 block">{activeCustomerDetail.soilMetrics.ph > 8.0 ? 'Alkaline' : 'Neutral'}</span>
                  </div>

                  <div className="p-3 bg-[#EFECE6] rounded-xl border border-[#2D4F1E]/15">
                    <span className="text-[10px] font-bold text-[#2D4F1E]/60 uppercase block">Organic Carbon</span>
                    <span className="text-base font-bold font-mono text-[#2D4F1E]">{activeCustomerDetail.soilMetrics.organicCarbonPct}%</span>
                    <span className="text-[9px] text-[#2D4F1E]/70 block">{activeCustomerDetail.soilMetrics.organicCarbonPct < 0.5 ? 'Deficit' : 'Optimal'}</span>
                  </div>

                  <div className="p-3 bg-[#EFECE6] rounded-xl border border-[#2D4F1E]/15">
                    <span className="text-[10px] font-bold text-[#2D4F1E]/60 uppercase block">Salinity (EC)</span>
                    <span className="text-base font-bold font-mono text-[#2D4F1E]">{activeCustomerDetail.soilMetrics.salinityEC} <span className="text-[9px]">dS/m</span></span>
                    <span className="text-[9px] text-[#2D4F1E]/70 block">Electrical Cond.</span>
                  </div>

                  <div className="p-3 bg-[#EFECE6] rounded-xl border border-[#2D4F1E]/15">
                    <span className="text-[10px] font-bold text-[#2D4F1E]/60 uppercase block">Water Table</span>
                    <span className="text-base font-bold font-mono text-[#2D4F1E]">{activeCustomerDetail.soilMetrics.waterTableDepthFt} <span className="text-[9px]">ft</span></span>
                    <span className="text-[9px] text-[#2D4F1E]/70 block">Aquifer Depth</span>
                  </div>
                </div>
              </div>
            )}

            {/* AI Recommendation Summary */}
            {activeCustomerDetail.aiRecommendationSummary && (
              <div className="p-4 bg-[#2D4F1E]/10 rounded-2xl border border-[#2D4F1E]/20 space-y-1">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-[#2D4F1E]">
                  <Sparkles className="w-3.5 h-3.5 text-[#C08261]" />
                  <span>AI Agronomist Restoration Prescription</span>
                </div>
                <p className="text-xs text-[#2D4F1E]/90 leading-relaxed">
                  {activeCustomerDetail.aiRecommendationSummary}
                </p>
              </div>
            )}

            {/* Notes & Actions */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[#2D4F1E]/60 uppercase">Field Agronomist Notes</span>
              <p className="text-xs p-3 bg-[#FAF8F5] border border-[#2D4F1E]/20 rounded-xl text-[#2D4F1E]">
                {activeCustomerDetail.notes || 'No extra notes recorded.'}
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-[#2D4F1E]/10">
              <button
                onClick={async () => {
                  if (confirm(`Are you sure you want to remove customer record for ${activeCustomerDetail.name}?`)) {
                    await onDeleteCustomer(activeCustomerDetail.id);
                    setActiveCustomerDetail(null);
                  }
                }}
                className="h-9 px-4 bg-red-100 hover:bg-red-200 text-red-800 font-bold text-xs rounded-xl transition-all active:scale-95 cursor-pointer shadow-sm"
              >
                Delete Record
              </button>

              <button
                onClick={() => setActiveCustomerDetail(null)}
                className="h-9 px-5 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#F4F1EA] font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
              >
                Close Customer File
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Add New Customer & Requirements Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-[#1F3814]/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6 border border-[#C08261]/30">
            
            <div className="flex items-start justify-between border-b border-[#2D4F1E]/10 pb-3">
              <div>
                <h3 className="text-xl font-serif font-bold text-[#2D4F1E]">
                  Register New Customer & Land Requirements
                </h3>
                <p className="text-xs text-[#2D4F1E]/70">Add a new landowner, panchayat collective, or commercial agro-forest holder to the database.</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-[#EFECE6] text-[#2D4F1E] inline-flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomerSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-1">Customer / Entity Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Patel / Cauvery Eco Trust"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-10 px-3 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-semibold text-[#2D4F1E] focus:ring-2 focus:ring-[#C08261] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-10 px-3 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-semibold text-[#2D4F1E] focus:ring-2 focus:ring-[#C08261] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. customer@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-10 px-3 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-semibold text-[#2D4F1E] focus:ring-2 focus:ring-[#C08261] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-1">Customer Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as CustomerCategory })}
                    className="w-full h-10 px-3 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-semibold text-[#2D4F1E] focus:ring-2 focus:ring-[#C08261] focus:outline-none"
                  >
                    <option value="Smallholder Farmer">Smallholder Farmer</option>
                    <option value="Commercial Agro-Forestry">Commercial Agro-Forestry</option>
                    <option value="Village Panchayat Collective">Village Panchayat Collective</option>
                    <option value="Eco-Trust / Agro-Enterprise">Eco-Trust / Agro-Enterprise</option>
                    <option value="Salt-Affected Landholder">Salt-Affected Landholder</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-1">District *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Thanjavur / Coimbatore"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full h-10 px-3 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-semibold text-[#2D4F1E] focus:ring-2 focus:ring-[#C08261] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-1">State / Province *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tamil Nadu / Gujarat"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full h-10 px-3 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-semibold text-[#2D4F1E] focus:ring-2 focus:ring-[#C08261] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-1">Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full h-10 px-3 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-semibold text-[#2D4F1E] focus:ring-2 focus:ring-[#C08261] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-1">Survey Number</label>
                  <input
                    type="text"
                    placeholder="e.g. SF/214-B"
                    value={formData.surveyNumber}
                    onChange={(e) => setFormData({ ...formData, surveyNumber: e.target.value })}
                    className="w-full h-10 px-3 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-semibold text-[#2D4F1E] focus:ring-2 focus:ring-[#C08261] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-1">Land Area</label>
                  <div className="flex space-x-1">
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      required
                      value={formData.landArea}
                      onChange={(e) => setFormData({ ...formData, landArea: Number(e.target.value) })}
                      className="w-2/3 h-10 px-3 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-semibold text-[#2D4F1E] focus:ring-2 focus:ring-[#C08261] focus:outline-none"
                    />
                    <select
                      value={formData.areaUnit}
                      onChange={(e) => setFormData({ ...formData, areaUnit: e.target.value as any })}
                      className="w-1/3 h-10 px-1 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-bold text-[#2D4F1E]"
                    >
                      <option value="acres">Acres</option>
                      <option value="cents">Cents</option>
                      <option value="hectares">Ha</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-1">Land Type</label>
                  <select
                    value={formData.landType}
                    onChange={(e) => setFormData({ ...formData, landType: e.target.value as LandType })}
                    className="w-full h-10 px-3 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-semibold text-[#2D4F1E] focus:ring-2 focus:ring-[#C08261] focus:outline-none"
                  >
                    <option value="Agricultural Farmland">Agricultural Farmland</option>
                    <option value="Pond / Water Body">Pond / Water Body</option>
                    <option value="Barren / Fallow Land">Barren / Fallow Land</option>
                    <option value="Lake / Wetland">Lake / Wetland</option>
                    <option value="River Bank / Coastal">River Bank / Coastal</option>
                    <option value="Degraded Forest Border">Degraded Forest Border</option>
                  </select>
                </div>
              </div>

              {/* Requirements Textarea */}
              <div>
                <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-1">
                  Customer Ecological Requirements (Enter 1 requirement per line) *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g.&#10;• Topsoil Salinity Treatment (pH 8.5)&#10;• Farm pond de-silting and bio-filter installation&#10;• Drip irrigation and green manure inoculation"
                  value={formData.primaryRequirementsText}
                  onChange={(e) => setFormData({ ...formData, primaryRequirementsText: e.target.value })}
                  className="w-full p-3 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-semibold text-[#2D4F1E] focus:ring-2 focus:ring-[#C08261] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-1">Urgency Level</label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value as CustomerUrgency })}
                    className="w-full h-10 px-3 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-semibold text-[#2D4F1E]"
                  >
                    <option value="Immediate (< 30 Days)">Immediate (&lt; 30 Days)</option>
                    <option value="Medium (1-3 Months)">Medium (1-3 Months)</option>
                    <option value="Long Term Planning">Long Term Planning</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-1">Budget Model</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹2.0 Lakhs / Govt Water Subsidy"
                    value={formData.budgetPreference}
                    onChange={(e) => setFormData({ ...formData, budgetPreference: e.target.value })}
                    className="w-full h-10 px-3 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-semibold text-[#2D4F1E]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-[#2D4F1E]/10">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="h-10 px-5 bg-[#EFECE6] hover:bg-[#E2DDD5] text-[#2D4F1E] font-bold text-xs rounded-xl transition-all active:scale-95 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-10 px-6 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#F4F1EA] font-bold text-xs rounded-xl shadow-md active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : 'Create Customer Record'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
