import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { RegistrationFlow } from './components/RegistrationFlow';
import { AwarenessHub } from './components/AwarenessHub';
import { GovtProjectsPage } from './components/GovtProjectsPage';
import { UserPortal } from './components/UserPortal';
import { AdminPortal } from './components/AdminPortal';
import { AuthModal } from './components/AuthModal';
import { CustomerDatabasePage } from './components/CustomerDatabasePage';
import { ElNinoClimateHub } from './components/ElNinoClimateHub';
import { PollutionComplaintPage } from './components/PollutionComplaintPage';
import { SoilScannerPage } from './components/SoilScannerPage';
import { FarmerIdeasPage } from './components/FarmerIdeasPage';
import { FieldWorkVerification } from './components/FieldWorkVerification';
import { WasteMetalRestorationPage } from './components/WasteMetalRestorationPage';
import { SatelliteImageryPage } from './components/SatelliteImageryPage';
import { WasteEcosystemGapPage } from './components/WasteEcosystemGapPage';
import { UserReadinessBar } from './components/UserReadinessBar';

import { LandApplication, GovtProject, AwarenessArticle, UserProfile, CustomerRecord, PollutionComplaint } from './types';
import { INITIAL_APPLICATIONS, INITIAL_GOVT_PROJECTS, INITIAL_AWARENESS_ARTICLES } from './data/seedData';
import { INITIAL_CUSTOMERS } from './data/customerData';
import { INITIAL_COMPLAINTS } from './data/complaintData';
import { useWebSocket } from './context/WebSocketContext';
import { Sprout, Droplets, ShieldCheck, Phone, Headset, Users, Globe, ArrowRight, ShieldAlert, AlertTriangle, Sparkles, Tractor, Recycle, Satellite, Scale } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('eden_sync_current_user');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return null;
  });

  const [applications, setApplications] = useState<LandApplication[]>(INITIAL_APPLICATIONS);
  const [govtProjects, setGovtProjects] = useState<GovtProject[]>(INITIAL_GOVT_PROJECTS);
  const [awarenessArticles, setAwarenessArticles] = useState<AwarenessArticle[]>(INITIAL_AWARENESS_ARTICLES);
  const [customers, setCustomers] = useState<CustomerRecord[]>(INITIAL_CUSTOMERS);
  const [complaints, setComplaints] = useState<PollutionComplaint[]>(INITIAL_COMPLAINTS);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalInitialTab, setAuthModalInitialTab] = useState<'user' | 'admin' | 'password-alone'>('password-alone');

  const handleLogout = () => {
    if (currentUser) {
      localStorage.setItem('eden_sync_last_user', JSON.stringify(currentUser));
    }
    localStorage.removeItem('eden_sync_current_user');
    setCurrentUser(null);
  };

  const handleSelectUser = (user: UserProfile) => {
    setCurrentUser(user);
    localStorage.setItem('eden_sync_current_user', JSON.stringify(user));
    localStorage.setItem('eden_sync_last_user', JSON.stringify(user));
  };

  const handleUpdatePassword = async (newPassword: string) => {
    if (!currentUser) return;
    const updated = { ...currentUser, quickPassword: newPassword };
    setCurrentUser(updated);
    localStorage.setItem('eden_sync_current_user', JSON.stringify(updated));
    localStorage.setItem('eden_sync_last_user', JSON.stringify(updated));
    try {
      await fetch('/api/auth/update-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser.id, newPassword }),
      });
    } catch (e) {
      console.warn('Failed to sync updated password to server:', e);
    }
  };

  const handleTriggerPasswordAloneLogin = () => {
    if (currentUser) {
      localStorage.setItem('eden_sync_last_user', JSON.stringify(currentUser));
    }
    localStorage.removeItem('eden_sync_current_user');
    setCurrentUser(null);
    setAuthModalInitialTab('password-alone');
    setIsAuthModalOpen(true);
  };

  // Fetch API data from server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appsRes, prjRes, artRes, custRes, compRes] = await Promise.all([
          fetch('/api/applications'),
          fetch('/api/projects'),
          fetch('/api/awareness'),
          fetch('/api/customers'),
          fetch('/api/complaints'),
        ]);

        if (appsRes.ok) {
          const appsData = await appsRes.json();
          if (Array.isArray(appsData) && appsData.length > 0) setApplications(appsData);
        }
        if (prjRes.ok) {
          const prjData = await prjRes.json();
          if (Array.isArray(prjData) && prjData.length > 0) setGovtProjects(prjData);
        }
        if (artRes.ok) {
          const artData = await artRes.json();
          if (Array.isArray(artData) && artData.length > 0) setAwarenessArticles(artData);
        }
        if (custRes.ok) {
          const custData = await custRes.json();
          if (Array.isArray(custData) && custData.length > 0) setCustomers(custData);
        }
        if (compRes.ok) {
          const compData = await compRes.json();
          if (Array.isArray(compData) && compData.length > 0) setComplaints(compData);
        }
      } catch (err) {
        console.log('Using local client seed data:', err);
      }
    };

    fetchData();
  }, []);

  const { subscribe } = useWebSocket();

  // Real-time synchronization listeners
  useEffect(() => {
    const unsubAppCreated = subscribe('application:created', (newApp: LandApplication) => {
      if (!newApp?.id) return;
      setApplications((prev) => {
        if (prev.some((a) => a.id === newApp.id)) return prev;
        return [newApp, ...prev];
      });
    });

    const unsubAppUpdated = subscribe('application:updated', (updatedApp: LandApplication) => {
      if (!updatedApp?.id) return;
      setApplications((prev) => prev.map((a) => (a.id === updatedApp.id ? updatedApp : a)));
    });

    const unsubAppDeleted = subscribe('application:deleted', ({ id }: { id: string }) => {
      if (!id) return;
      setApplications((prev) => prev.filter((a) => a.id !== id));
    });

    const unsubCompCreated = subscribe('complaint:created', (newComp: PollutionComplaint) => {
      if (!newComp?.id) return;
      setComplaints((prev) => {
        if (prev.some((c) => c.id === newComp.id)) return prev;
        return [newComp, ...prev];
      });
    });

    const unsubCompUpdated = subscribe('complaint:updated', (updatedComp: PollutionComplaint) => {
      if (!updatedComp?.id) return;
      setComplaints((prev) => prev.map((c) => (c.id === updatedComp.id ? updatedComp : c)));
    });

    const unsubCompDeleted = subscribe('complaint:deleted', ({ id }: { id: string }) => {
      if (!id) return;
      setComplaints((prev) => prev.filter((c) => c.id !== id));
    });

    return () => {
      unsubAppCreated();
      unsubAppUpdated();
      unsubAppDeleted();
      unsubCompCreated();
      unsubCompUpdated();
      unsubCompDeleted();
    };
  }, [subscribe]);

  // Application Handlers
  const handleApplicationCreated = (newApp: LandApplication) => {
    setApplications((prev) => [newApp, ...prev]);
    // Auto login as applicant if not logged in
    if (!currentUser || currentUser.role !== 'admin') {
      setCurrentUser({
        id: `USR-${Math.floor(100 + Math.random() * 900)}`,
        name: newApp.applicantName,
        phone: newApp.phone,
        address: newApp.applicantAddress,
        role: 'user',
      });
    }
  };

  const handleUpdateApplication = async (updatedApp: LandApplication) => {
    // Optimistic UI update
    setApplications((prev) => prev.map((a) => (a.id === updatedApp.id ? updatedApp : a)));

    try {
      await fetch(`/api/applications/${updatedApp.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedApp),
      });
    } catch (err) {
      console.error('Failed to update application on server:', err);
    }
  };

  const handleDeleteApplication = async (id: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
    try {
      await fetch(`/api/applications/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Failed to delete application on server:', err);
    }
  };

  // Pollution Complaint Handlers
  const handleCreateComplaint = async (newCompData: Partial<PollutionComplaint>) => {
    try {
      const res = await fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCompData),
      });
      if (res.ok) {
        const created: PollutionComplaint = await res.json();
        setComplaints((prev) => [created, ...prev]);
      } else {
        const fallbackId = `POL-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
        const fallbackComp: PollutionComplaint = {
          id: fallbackId,
          createdAt: new Date().toISOString(),
          domain: newCompData.domain || 'Land Pollution',
          specificCause: newCompData.specificCause || 'Chemical & Hazardous Waste Dumping',
          title: newCompData.title || 'Pollution Incident Report',
          description: newCompData.description || 'Reported pollution incident.',
          location: newCompData.location || 'Local Site',
          district: newCompData.district || 'District',
          state: newCompData.state || 'State',
          surveyNumberOrLandmark: newCompData.surveyNumberOrLandmark,
          affectedAreaOrVolume: newCompData.affectedAreaOrVolume || '1 Acre / Stream',
          severity: newCompData.severity || 'High (Active Damage)',
          status: 'Reported & Logged',
          evidencePhotoUrl: newCompData.evidencePhotoUrl,
          complainantName: newCompData.complainantName || 'Anonymous Citizen',
          complainantPhone: newCompData.complainantPhone || '',
          isAnonymous: Boolean(newCompData.isAnonymous),
          affectedResources: newCompData.affectedResources || ['Topsoil', 'Groundwater'],
          aiAssessment: {
            riskScore: 82,
            containmentPriority: 'Immediate (< 24h)',
            immediateSafetyMeasures: [
              'Erect warning cordon around contaminated zone.',
              'Prevent livestock grazing or human contact with contaminated soil/water.'
            ],
            recommendedBioRemediation: [
              'Bio-augmentation with microbial inoculants.',
              'Phytoremediation with deep-rooted hyper-accumulator grasses.'
            ],
            responsibleAuthorities: ['State Pollution Control Board', 'District Environmental Officer'],
            estimatedEcologicalRecoveryWeeks: 10,
            environmentalHazardSummary: 'Pollution incident registered. Inspection team dispatched.'
          }
        };
        setComplaints((prev) => [fallbackComp, ...prev]);
      }
    } catch (err) {
      console.error('Failed to submit complaint:', err);
    }
  };

  const handleUpdateComplaint = async (updatedComp: PollutionComplaint) => {
    setComplaints((prev) => prev.map((c) => (c.id === updatedComp.id ? updatedComp : c)));
    try {
      await fetch(`/api/complaints/${updatedComp.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedComp),
      });
    } catch (err) {
      console.error('Failed to update complaint on server:', err);
    }
  };

  // Customer DB Handlers
  const handleCreateCustomer = async (newCustData: Partial<CustomerRecord>) => {
    try {
      const res = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCustData),
      });
      if (res.ok) {
        const created: CustomerRecord = await res.json();
        setCustomers((prev) => [created, ...prev]);
      } else {
        const fallback: CustomerRecord = {
          id: `CUST-2026-${Math.floor(100 + Math.random() * 900)}`,
          name: newCustData.name || 'New Customer',
          phone: newCustData.phone || '',
          email: newCustData.email || '',
          category: newCustData.category || 'Smallholder Farmer',
          district: newCustData.district || 'State District',
          state: newCustData.state || 'State',
          country: newCustData.country || 'India',
          surveyNumber: newCustData.surveyNumber || 'SF/101',
          landArea: newCustData.landArea || 2,
          areaUnit: newCustData.areaUnit || 'acres',
          landType: newCustData.landType || 'Agricultural Farmland',
          primaryRequirements: newCustData.primaryRequirements || ['Soil organic matter restoration.'],
          soilMetrics: newCustData.soilMetrics || {
            ph: 7.2,
            organicCarbonPct: 0.45,
            salinityEC: 1.2,
            waterTableDepthFt: 40,
            primaryDeficiency: 'Nitrogen & Zinc deficiency'
          },
          budgetPreference: newCustData.budgetPreference || 'Self-Funded / Subsidized',
          urgency: newCustData.urgency || 'Immediate (< 30 Days)',
          status: newCustData.status || 'Active In-Progress',
          registeredDate: new Date().toISOString().split('T')[0],
          assignedAgronomist: 'Dr. Anita Roy (Soil Bio-Chemist)',
          notes: 'Customer registered with requirements.',
          aiRecommendationSummary: 'Apply green manure crop and micro-drip fertigation.'
        };
        setCustomers((prev) => [fallback, ...prev]);
      }
    } catch (err) {
      console.error('Failed to create customer:', err);
    }
  };

  const handleUpdateCustomer = async (updatedCust: CustomerRecord) => {
    setCustomers((prev) => prev.map((c) => (c.id === updatedCust.id ? updatedCust : c)));
    try {
      await fetch(`/api/customers/${updatedCust.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCust),
      });
    } catch (err) {
      console.error('Failed to update customer on server:', err);
    }
  };

  const handleDeleteCustomer = async (id: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    try {
      await fetch(`/api/customers/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Failed to delete customer on server:', err);
    }
  };

  // Govt Project Handlers
  const handleUpdateGovtProject = async (updatedPrj: GovtProject) => {
    setGovtProjects((prev) => prev.map((p) => (p.id === updatedPrj.id ? updatedPrj : p)));
    try {
      await fetch(`/api/projects/${updatedPrj.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPrj),
      });
    } catch (err) {
      console.error('Failed to update project on server:', err);
    }
  };

  const handleDeleteGovtProject = async (id: string) => {
    setGovtProjects((prev) => prev.filter((p) => p.id !== id));
    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Failed to delete project on server:', err);
    }
  };

  const handleClearAllGovtProjects = () => {
    setGovtProjects([]);
  };

  const handleRestoreGovtProjects = () => {
    setGovtProjects(INITIAL_GOVT_PROJECTS);
  };

  const handleAddGovtProject = async (newPrjData: Partial<GovtProject>) => {
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPrjData),
      });
      if (res.ok) {
        const created: GovtProject = await res.json();
        setGovtProjects((prev) => [created, ...prev]);
      }
    } catch (err) {
      console.error('Failed to create project on server:', err);
    }
  };

  const handleAddAwarenessArticle = async (newArtData: Partial<AwarenessArticle>) => {
    try {
      const res = await fetch('/api/awareness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newArtData),
      });
      if (res.ok) {
        const created: AwarenessArticle = await res.json();
        setAwarenessArticles((prev) => [created, ...prev]);
      }
    } catch (err) {
      console.error('Failed to create article on server:', err);
    }
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#FAF8F5] text-[#2D4F1E] flex flex-col font-sans selection:bg-[#C08261] selection:text-[#F4F1EA]">
      
      {/* Top Sticky Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onOpenAuthModal={() => {
          setAuthModalInitialTab('password-alone');
          setIsAuthModalOpen(true);
        }}
        onLogout={() => {
          handleLogout();
          setActiveTab('home');
        }}
        onSelectUser={handleSelectUser}
      />

      {/* Prominent User Identity & Operational Readiness Bar */}
      <UserReadinessBar
        currentUser={currentUser}
        onOpenAuthModal={() => {
          setAuthModalInitialTab('password-alone');
          setIsAuthModalOpen(true);
        }}
        onSelectUser={handleSelectUser}
        onLogout={handleLogout}
        onNavigateToTab={(tab) => setActiveTab(tab)}
      />

      {/* Main Page View Switcher */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div>
            <HeroSection
              onRegisterClick={() => setActiveTab('register')}
              onExploreGovtClick={() => setActiveTab('govt')}
              onAwarenessClick={() => setActiveTab('awareness')}
              onReportPollutionClick={() => setActiveTab('complaints')}
            />

            {/* Quick Overview Section on Home */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <span className="text-xs font-bold uppercase text-[#C08261] tracking-wider">Restoration Pillars & Grievance Redressal</span>
                <h2 className="text-3xl font-serif font-bold text-[#2D4F1E]">
                  Eden Sync Revival: Land & Water Body Restoration Ecosystem
                </h2>
                <p className="text-xs sm:text-sm text-[#2D4F1E]/80">
                  A seamless digital bridge uniting landowner restoration registrations, pollution complaint triage, verified customer requirements, real-time climate shift awareness, and government ecological restoration funds.
                </p>
              </div>

              {/* 5 Feature Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Card 0: Soil AI Scanner */}
                <div 
                  onClick={() => setActiveTab('soil-scan')}
                  className="bg-[#FAF8F5] p-6 rounded-3xl shadow-md border-2 border-[#C08261]/60 hover:border-[#2D4F1E] hover:shadow-xl transition-all space-y-4 cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-[#2D4F1E] text-[#D89F80] rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-md">
                      <Sparkles className="w-6 h-6 text-[#D4A359]" />
                    </div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-serif font-bold text-[#2D4F1E] group-hover:text-[#C08261] transition-colors">
                        Soil AI Photo Scanner
                      </h3>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 bg-[#C08261]/20 text-[#A06445] rounded-full border border-[#C08261]/30">
                        Dry • Clay • Healthy • Heavy
                      </span>
                    </div>
                    <p className="text-xs text-[#2D4F1E]/80 leading-relaxed">
                      Snap or upload a photo of your field soil. AI detects whether it's Dry, Clay, Healthy, or Heavy, estimates moisture %, and delivers immediate agronomic advice.
                    </p>
                  </div>
                  <div className="pt-2 flex items-center text-xs font-bold text-[#C08261] space-x-1">
                    <span>Scan Soil Photo Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Card 1: Pollution Grievances (Land & Water) */}
                <div 
                  onClick={() => setActiveTab('complaints')}
                  className="bg-[#FAF8F5] p-6 rounded-3xl shadow-md border-2 border-red-200/80 hover:border-red-500 hover:shadow-xl transition-all space-y-4 cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-red-800 text-[#F4F1EA] rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-md">
                      <ShieldAlert className="w-6 h-6" />
                    </div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-serif font-bold text-[#2D4F1E] group-hover:text-red-700 transition-colors">
                        Land & Water Pollution Grievances
                      </h3>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 bg-red-100 text-red-800 rounded-full border border-red-300">
                        AI Triage Active
                      </span>
                    </div>
                    <p className="text-xs text-[#2D4F1E]/80 leading-relaxed">
                      Report toxic chemical dumping, industrial effluents, illegal plastic dumping, and sewage discharge. Get immediate AI hazard containment and bio-remediation protocols.
                    </p>
                  </div>
                  <div className="pt-2 flex items-center text-xs font-bold text-red-700 space-x-1">
                    <span>File or Track Grievance</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Card 2: Customer DB */}
                <div 
                  onClick={() => {
                    if (currentUser?.role === 'admin') {
                      setActiveTab('customers');
                    } else {
                      setAuthModalInitialTab('admin');
                      setIsAuthModalOpen(true);
                    }
                  }}
                  className="bg-[#FAF8F5] p-6 rounded-3xl shadow-md border border-[#C08261]/25 hover:border-[#C08261] hover:shadow-xl transition-all space-y-4 cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-[#2D4F1E] text-[#D89F80] rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Users className="w-6 h-6" />
                    </div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-serif font-bold text-[#2D4F1E] group-hover:text-[#C08261] transition-colors">
                        Customer Database
                      </h3>
                      {currentUser?.role !== 'admin' && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#C08261]/15 text-[#C08261] rounded-full border border-[#C08261]/30">
                          Admin Only
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#2D4F1E]/80 leading-relaxed">
                      Secure directory of landowner profiles, specific soil health diagnostics (pH, carbon), budget preferences, and AI restoration blueprints.
                    </p>
                  </div>
                  <div className="pt-2 flex items-center text-xs font-bold text-[#C08261] space-x-1">
                    <span>{currentUser?.role === 'admin' ? 'View Customer DB' : 'Admin Login to View'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Card 3: El Niño & Climate */}
                <div 
                  onClick={() => setActiveTab('elnino')}
                  className="bg-[#FAF8F5] p-6 rounded-3xl shadow-md border border-[#C08261]/25 hover:border-[#C08261] hover:shadow-xl transition-all space-y-4 cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-[#2D4F1E] text-[#D89F80] rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Globe className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-serif font-bold text-[#2D4F1E] group-hover:text-[#C08261] transition-colors">
                      El Niño & Climate Shift
                    </h3>
                    <p className="text-xs text-[#2D4F1E]/80 leading-relaxed">
                      Live ENSO telemetry, global regional temperature/rainfall anomalies, interactive farm vulnerability simulator, and nature-based adaptation guides.
                    </p>
                  </div>
                  <div className="pt-2 flex items-center text-xs font-bold text-[#C08261] space-x-1">
                    <span>Explore Climate Hub</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Card 4: Soil & Agriculture */}
                <div 
                  onClick={() => setActiveTab('register')}
                  className="bg-[#FAF8F5] p-6 rounded-3xl shadow-md border border-[#C08261]/25 hover:border-[#C08261] hover:shadow-xl transition-all space-y-4 cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-[#2D4F1E] text-[#D89F80] rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Sprout className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-serif font-bold text-[#2D4F1E] group-hover:text-[#C08261] transition-colors">
                      Agricultural Land Revival
                    </h3>
                    <p className="text-xs text-[#2D4F1E]/80 leading-relaxed">
                      Register degraded, saline, or barren land for comprehensive soil testing, organic enrichment, bio-mulching, and high-carbon crop rotation.
                    </p>
                  </div>
                  <div className="pt-2 flex items-center text-xs font-bold text-[#C08261] space-x-1">
                    <span>Register Your Land</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Card 5: Water Body Rejuvenation */}
                <div 
                  onClick={() => setActiveTab('govt')}
                  className="bg-[#FAF8F5] p-6 rounded-3xl shadow-md border border-[#C08261]/25 hover:border-[#C08261] hover:shadow-xl transition-all space-y-4 cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-[#2D4F1E] text-[#D89F80] rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Droplets className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-serif font-bold text-[#2D4F1E] group-hover:text-[#C08261] transition-colors">
                      Water Body Rejuvenation
                    </h3>
                    <p className="text-xs text-[#2D4F1E]/80 leading-relaxed">
                      Eco-dredging, floating vetiver wetlands, catchment swales, and interactive satellite mapping tracking live government restoration milestones.
                    </p>
                  </div>
                  <div className="pt-2 flex items-center text-xs font-bold text-[#C08261] space-x-1">
                    <span>View Govt Projects</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Card 6: Restoration Science & Awareness */}
                <div 
                  onClick={() => setActiveTab('awareness')}
                  className="bg-[#FAF8F5] p-6 rounded-3xl shadow-md border border-[#C08261]/25 hover:border-[#C08261] hover:shadow-xl transition-all space-y-4 cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-[#2D4F1E] text-[#D89F80] rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-serif font-bold text-[#2D4F1E] group-hover:text-[#C08261] transition-colors">
                      Science & Policy Guides
                    </h3>
                    <p className="text-xs text-[#2D4F1E]/80 leading-relaxed">
                      Best practices for desilting, rainwater harvesting bunds, saline soil reclamation, and legal frameworks under the Water & Air Acts.
                    </p>
                  </div>
                  <div className="pt-2 flex items-center text-xs font-bold text-[#C08261] space-x-1">
                    <span>Read Knowledge Hub</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Card 7: Farmer Ideas & Field Hacks Sharing */}
                <div 
                  id="home-card-farmer-ideas"
                  onClick={() => setActiveTab('farmer-ideas')}
                  className="bg-[#FAF8F5] p-6 rounded-3xl shadow-md border border-[#C08261]/25 hover:border-[#C08261] hover:shadow-xl transition-all space-y-4 cursor-pointer group flex flex-col justify-between sm:col-span-2 lg:col-span-3 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5] to-[#EFECE6]"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-[#2D4F1E] text-[#D89F80] rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                        <Sparkles className="w-6 h-6 text-[#D4A359]" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-serif font-bold text-[#2D4F1E] group-hover:text-[#C08261] transition-colors">
                            Farmer Ideas & Field Hacks Hub
                          </h3>
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-full text-[10px] font-extrabold uppercase">
                            Community Powered
                          </span>
                        </div>
                        <p className="text-xs text-[#2D4F1E]/80 leading-relaxed max-w-2xl mt-1">
                          Share your field-tested indigenous formulations, low-cost bio-pesticides, water saving tricks, and farm hacks with fellow farmers across India. Easily share any tip to WhatsApp or SMS!
                        </p>
                      </div>
                    </div>
                    <div className="pt-2 sm:pt-0 flex items-center text-xs font-bold text-[#C08261] space-x-1.5 shrink-0 bg-white px-4 py-2 rounded-xl border border-[#C08261]/30 group-hover:bg-[#C08261] group-hover:text-white transition-colors">
                      <span>Explore & Share Tips</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Card 8: Field Work Verification & Machine Logbook */}
                <div 
                  id="home-card-field-work"
                  onClick={() => setActiveTab('field-work')}
                  className="bg-[#FAF8F5] p-6 rounded-3xl shadow-md border border-[#C08261]/25 hover:border-[#2D4F1E] hover:shadow-xl transition-all space-y-4 cursor-pointer group flex flex-col justify-between sm:col-span-2 lg:col-span-3 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5] to-[#EAE7DF]"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-[#C08261] text-[#FAF8F5] rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 shadow">
                        <Tractor className="w-6 h-6 text-[#FAF8F5]" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-serif font-bold text-[#2D4F1E] group-hover:text-[#C08261] transition-colors">
                            Field Work Verification & Machine Logbook
                          </h3>
                          <span className="px-2 py-0.5 bg-[#2D4F1E] text-[#FAF8F5] rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                            Play Store Ready
                          </span>
                        </div>
                        <p className="text-xs text-[#2D4F1E]/80 leading-relaxed max-w-2xl mt-1">
                          Track on-site physical execution: clock in JCBs, tractors, and shramdaan labor crews with tamper-proof geotagged photos, hourly digital logs, and 1-click CSR audit certificates.
                        </p>
                      </div>
                    </div>
                    <div className="pt-2 sm:pt-0 flex items-center text-xs font-bold text-[#2D4F1E] space-x-1.5 shrink-0 bg-[#EFECE6] px-4 py-2 rounded-xl border border-[#2D4F1E]/20 group-hover:bg-[#2D4F1E] group-hover:text-[#FAF8F5] transition-colors">
                      <span>Open Machine Logbook</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Card 9: Waste Collection & Restoration of Metals */}
                <div 
                  id="home-card-metal-waste"
                  onClick={() => setActiveTab('metal-waste')}
                  className="bg-[#FAF8F5] p-6 rounded-3xl shadow-md border-2 border-[#C08261]/35 hover:border-[#2D4F1E] hover:shadow-xl transition-all space-y-4 cursor-pointer group flex flex-col justify-between sm:col-span-2 lg:col-span-3 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5] to-[#E5EDE0]"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-[#2D4F1E] text-[#FAF8F5] rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 shadow">
                        <Recycle className="w-6 h-6 text-[#D89F80]" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-serif font-bold text-[#2D4F1E] group-hover:text-[#C08261] transition-colors">
                            Waste Collection & Restoration of Metals
                          </h3>
                          <span className="px-2 py-0.5 bg-emerald-700 text-white rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                            New Feature • Cash Payouts
                          </span>
                        </div>
                        <p className="text-xs text-[#2D4F1E]/80 leading-relaxed max-w-2xl mt-1">
                          Book doorstep farm collection for rusted plows, burnt pump windings, old tractor batteries, and scrap metals. Instant electronic scale weighing & UPI cash payout combined with AI soil phytoremediation plans (Mustard, Sunflower & Vetiver) to clear heavy metal contaminants from soil & aquifers.
                        </p>
                      </div>
                    </div>
                    <div className="pt-2 sm:pt-0 flex items-center text-xs font-bold text-[#2D4F1E] space-x-1.5 shrink-0 bg-[#C08261] text-[#F4F1EA] px-4 py-2 rounded-xl group-hover:bg-[#2D4F1E] transition-colors shadow">
                      <span>Book Metal Collection</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Card 10: Satellite Multi-spectral Analysis & Destruction Ledger */}
                <div 
                  id="home-card-satellite"
                  onClick={() => setActiveTab('satellite')}
                  className="bg-[#FAF8F5] p-6 rounded-3xl shadow-md border-2 border-[#2D4F1E]/30 hover:border-[#2D4F1E] hover:shadow-xl transition-all space-y-4 cursor-pointer group flex flex-col justify-between sm:col-span-2 lg:col-span-3 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5] to-[#E2F0D9]"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-[#1C3317] text-[#4ADE80] rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 shadow">
                        <Satellite className="w-6 h-6 text-[#4ADE80] animate-pulse" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-serif font-bold text-[#2D4F1E] group-hover:text-[#1C3317] transition-colors">
                            Satellite Multi-Spectral Analysis & Land Destruction Ledger
                          </h3>
                          <span className="px-2 py-0.5 bg-[#2D4F1E] text-[#A7F3D0] rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                            Sentinel-2 & Landsat-9
                          </span>
                        </div>
                        <p className="text-xs text-[#2D4F1E]/80 leading-relaxed max-w-2xl mt-1">
                          Authoritative real-world satellite data tracking destroyed arable land across 40+ countries. Run multi-spectral remote sensing scans on any coordinate to measure NDVI vegetative vigour, soil degradation index (0-100), and topsoil loss in tons/ha.
                        </p>
                      </div>
                    </div>
                    <div className="pt-2 sm:pt-0 flex items-center text-xs font-bold text-white space-x-1.5 shrink-0 bg-[#2D4F1E] px-4 py-2 rounded-xl group-hover:bg-[#1C3317] transition-colors shadow">
                      <span>Inspect Satellite Telemetry</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Card 11: Waste Ecosystem & The All-in-One Gap */}
                <div 
                  id="home-card-waste-gap"
                  onClick={() => setActiveTab('waste-gap')}
                  className="bg-[#FAF8F5] p-6 rounded-3xl shadow-md border-2 border-[#2D4F1E]/35 hover:border-[#2D4F1E] hover:shadow-xl transition-all space-y-4 cursor-pointer group flex flex-col justify-between sm:col-span-2 lg:col-span-3 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5] to-[#EAE6DF]"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-[#1F3814] text-[#D89F80] rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 shadow">
                        <Scale className="w-6 h-6 text-[#D89F80]" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-serif font-bold text-[#2D4F1E] group-hover:text-[#1F3814] transition-colors">
                            The "All-in-One" Gap in Waste Management
                          </h3>
                          <span className="px-2 py-0.5 bg-[#2D4F1E] text-[#D89F80] rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                            Industry Intelligence
                          </span>
                        </div>
                        <p className="text-xs text-[#2D4F1E]/80 leading-relaxed max-w-2xl mt-1">
                          Examine why Digital Clearing Apps (Aakri, Ecowrap, Kabadiwalla Connect, Mitti) bleed on micro-logistics while Environmental Infrastructure Giants (Veolia, Suez, Jacobs, Ramky) fail at citizen engagement — and how Eden Sync unites both.
                        </p>
                      </div>
                    </div>
                    <div className="pt-2 sm:pt-0 flex items-center text-xs font-bold text-[#F4F1EA] space-x-1.5 shrink-0 bg-[#2D4F1E] px-4 py-2 rounded-xl group-hover:bg-[#1F3814] transition-colors shadow">
                      <span>Explore Market Gap Audit</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

              </div>

              {/* Direct Helpline & Contact Card */}
              <div className="bg-[#1F3814] text-[#F4F1EA] p-8 sm:p-10 rounded-3xl border border-[#C08261]/40 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-2 text-center md:text-left">
                  <span className="px-3 py-1 bg-[#2D4F1E] text-[#D89F80] text-xs font-bold uppercase rounded-full border border-[#C08261]/30 inline-flex items-center space-x-1">
                    <Headset className="w-3.5 h-3.5" />
                    <span>Direct Landowner Support & Emergency Pollution Helpline</span>
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold">Need Immediate Assistance?</h3>
                  <p className="text-xs sm:text-sm text-[#F4F1EA]/80 max-w-xl">
                    Our ecological restoration field officers and environmental triage team are available to help you with land registration, soil testing reports, pollution incidents, or government project status.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full md:w-auto">
                  <a
                    href="tel:8056192997"
                    className="w-full sm:w-auto px-6 py-4 bg-[#C08261] hover:bg-[#A86E4F] text-[#F4F1EA] font-bold text-sm rounded-2xl shadow-lg flex items-center justify-center space-x-3 transition-transform active:scale-95"
                  >
                    <Phone className="w-4 h-4 text-[#F4F1EA]" />
                    <span>Call: 8056192997</span>
                  </a>

                  <a
                    href="tel:6381811657"
                    className="w-full sm:w-auto px-6 py-4 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#F4F1EA] font-bold text-sm rounded-2xl border border-[#C08261]/40 shadow-lg flex items-center justify-center space-x-3 transition-transform active:scale-95"
                  >
                    <Phone className="w-4 h-4 text-[#D89F80]" />
                    <span>Call: 6381811657</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        )}

        {activeTab === 'soil-scan' && (
          <SoilScannerPage
            onRegisterLandClick={() => setActiveTab('register')}
          />
        )}

        {activeTab === 'complaints' && (
          <PollutionComplaintPage
            complaints={complaints}
            currentUser={currentUser}
            onSubmitComplaint={handleCreateComplaint}
            onUpdateComplaint={handleUpdateComplaint}
            onOpenAuthModal={() => {
              setAuthModalInitialTab('user');
              setIsAuthModalOpen(true);
            }}
            onUserRegisteredOrSelected={handleSelectUser}
          />
        )}

        {activeTab === 'customers' && (
          <CustomerDatabasePage
            customers={customers}
            currentUser={currentUser}
            onOpenAdminLogin={() => {
              setAuthModalInitialTab('admin');
              setIsAuthModalOpen(true);
            }}
            onCreateCustomer={handleCreateCustomer}
            onAddCustomer={handleCreateCustomer}
            onUpdateCustomer={handleUpdateCustomer}
            onDeleteCustomer={handleDeleteCustomer}
          />
        )}

        {activeTab === 'elnino' && (
          <ElNinoClimateHub />
        )}

        {activeTab === 'register' && (
          <RegistrationFlow
            currentUser={currentUser}
            onUserRegisteredOrSelected={handleSelectUser}
            onOpenAuthModal={() => {
              setAuthModalInitialTab('user');
              setIsAuthModalOpen(true);
            }}
            onSubmitSuccess={(newApp) => {
              handleApplicationCreated(newApp);
            }}
            onCancel={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'awareness' && (
          <AwarenessHub articles={awarenessArticles} />
        )}

        {activeTab === 'farmer-ideas' && (
          <FarmerIdeasPage
            currentUser={currentUser}
            onOpenAuthModal={() => {
              setAuthModalInitialTab('user');
              setIsAuthModalOpen(true);
            }}
          />
        )}

        {activeTab === 'field-work' && (
          <FieldWorkVerification
            currentUser={currentUser}
            onOpenAuthModal={() => {
              setAuthModalInitialTab('password-alone');
              setIsAuthModalOpen(true);
            }}
          />
        )}

        {activeTab === 'metal-waste' && (
          <WasteMetalRestorationPage
            currentUser={currentUser}
            onUserRegisteredOrSelected={handleSelectUser}
            onOpenAuthModal={() => {
              setAuthModalInitialTab('user');
              setIsAuthModalOpen(true);
            }}
          />
        )}

        {activeTab === 'govt' && (
          <GovtProjectsPage
            projects={govtProjects}
            userRole={currentUser?.role || 'user'}
            onUpdateProject={handleUpdateGovtProject}
            onAddProject={handleAddGovtProject}
            onDeleteProject={handleDeleteGovtProject}
            onClearAllProjects={handleClearAllGovtProjects}
            onRestoreSampleProjects={handleRestoreGovtProjects}
          />
        )}

        {activeTab === 'portal' && (
          <UserPortal
            applications={applications}
            currentUser={currentUser}
            onRegisterNew={() => setActiveTab('register')}
            onLoginClick={() => {
              setAuthModalInitialTab('password-alone');
              setIsAuthModalOpen(true);
            }}
            onUpdatePassword={handleUpdatePassword}
            onTriggerPasswordAloneLogin={handleTriggerPasswordAloneLogin}
          />
        )}

        {activeTab === 'satellite' && (
          <SatelliteImageryPage
            currentUser={currentUser ? { name: currentUser.name, phone: currentUser.phone, address: currentUser.address } : undefined}
            onNavigateToRestoration={() => {
              setActiveTab('farmer-ideas');
            }}
          />
        )}

        {activeTab === 'waste-gap' && (
          <WasteEcosystemGapPage />
        )}

        {activeTab === 'admin' && (
          <AdminPortal
            applications={applications}
            govtProjects={govtProjects}
            awarenessArticles={awarenessArticles}
            onUpdateApplication={handleUpdateApplication}
            onDeleteApplication={handleDeleteApplication}
            onUpdateGovtProject={handleUpdateGovtProject}
            onAddGovtProject={handleAddGovtProject}
            onDeleteGovtProject={handleDeleteGovtProject}
            onClearAllGovtProjects={handleClearAllGovtProjects}
            onRestoreGovtProjects={handleRestoreGovtProjects}
            onAddAwarenessArticle={handleAddAwarenessArticle}
          />
        )}
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialTab={authModalInitialTab}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(profile) => {
          setCurrentUser(profile);
          if (profile.role === 'admin') setActiveTab('admin');
          else setActiveTab('portal');
        }}
      />

      {/* Footer */}
      <footer className="bg-[#1F3814] text-[#F4F1EA] border-t border-[#C08261]/30 mt-16 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#C08261] rounded-xl flex items-center justify-center text-[#F4F1EA] font-bold shadow-md">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <p className="text-lg font-serif font-bold tracking-tight text-[#F4F1EA]">Eden Sync Revival</p>
              <p className="text-xs text-[#D89F80]">Land & Water Body Restoration Platform</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs font-bold text-[#F4F1EA]">
            <span className="flex items-center space-x-1 text-[#D89F80]">
              <Phone className="w-3.5 h-3.5 text-[#C08261]" />
              <span>Helpline & Pollution Incident Line:</span>
            </span>
            <div className="flex items-center space-x-2">
              <a href="tel:8056192997" className="px-3 py-1.5 bg-[#2D4F1E] rounded-lg border border-[#C08261]/30 hover:bg-[#C08261] transition-colors">
                8056192997
              </a>
              <span className="text-[#C08261]">|</span>
              <a href="tel:6381811657" className="px-3 py-1.5 bg-[#2D4F1E] rounded-lg border border-[#C08261]/30 hover:bg-[#C08261] transition-colors">
                6381811657
              </a>
            </div>
          </div>

          <div className="text-xs text-[#F4F1EA]/70 text-center md:text-right space-y-1">
            <p className="font-semibold text-[#D89F80]">"Restoring Earth, Syncing Lives with Nature."</p>
            <p className="text-[#F4F1EA]/50">© 2026 Eden Sync Revival. Land & Water Restoration Network.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
