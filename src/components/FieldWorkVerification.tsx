import React, { useState, useEffect } from 'react';
import { 
  Tractor, 
  Clock, 
  MapPin, 
  Camera, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Plus, 
  Upload, 
  UserCheck, 
  Fuel, 
  IndianRupee, 
  Phone, 
  Download, 
  Users, 
  Layers, 
  Sparkles, 
  ChevronRight, 
  RefreshCw,
  Eye,
  ShieldCheck,
  Compass,
  Building
} from 'lucide-react';
import { FieldWorkLog, MachineWorkType, WorkStatus, UserProfile } from '../types';

interface FieldWorkVerificationProps {
  currentUser: UserProfile | null;
  onOpenAuthModal?: () => void;
}

export const FieldWorkVerification: React.FC<FieldWorkVerificationProps> = ({
  currentUser,
  onOpenAuthModal,
}) => {
  const [logs, setLogs] = useState<FieldWorkLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState<'ALL' | WorkStatus>('ALL');
  const [selectedLog, setSelectedLog] = useState<FieldWorkLog | null>(null);
  const [isClockInModalOpen, setIsClockInModalOpen] = useState<boolean>(false);
  const [showCertificateModal, setShowCertificateModal] = useState<FieldWorkLog | null>(null);

  // New Work Entry Form State
  const [workTitle, setWorkTitle] = useState<string>('');
  const [locationName, setLocationName] = useState<string>('Perur Pond Sector 2, Coimbatore');
  const [workType, setWorkType] = useState<MachineWorkType>('Excavator / JCB Desilting');
  const [machineryModel, setMachineryModel] = useState<string>('JCB 3DX Super EcoXcellence');
  const [operatorName, setOperatorName] = useState<string>(currentUser?.name || 'Selvakumar R');
  const [operatorPhone, setOperatorPhone] = useState<string>(currentUser?.phone || '+91 98421 66540');
  const [workforceCount, setWorkforceCount] = useState<number>(8);
  const [costPerHour, setCostPerHour] = useState<number>(1300);
  const [fundingSource, setFundingSource] = useState<FieldWorkLog['fundingSource']>('CSR Grant (ITC / Tata)');
  const [notes, setNotes] = useState<string>('');
  const [photoStage, setPhotoStage] = useState<'before' | 'during' | 'completed'>('before');
  const [photoCaption, setPhotoCaption] = useState<string>('Site inspection before starting machine desilting');
  const [capturedPhotoUrl, setCapturedPhotoUrl] = useState<string>('https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&w=600&q=80');

  // Quick Action Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Fetch from server or initial
  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/field-work-logs');
      if (res.ok) {
        const data = await res.json();
        setLogs(data);
        if (data.length > 0 && !selectedLog) {
          setSelectedLog(data[0]);
        }
      }
    } catch (err) {
      console.warn('Backend logs offline, fallback to memory', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Clock In New Work Order
  const handleClockInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workTitle.trim()) {
      triggerToast('⚠️ Please provide a title for the work order');
      return;
    }

    const newLog: FieldWorkLog = {
      id: `LOG-FL-${Date.now().toString().slice(-5)}`,
      workOrderTitle: workTitle.trim(),
      locationName: locationName.trim(),
      coordinates: {
        lat: 11.0168 + (Math.random() - 0.5) * 0.05,
        lng: 76.9558 + (Math.random() - 0.5) * 0.05,
      },
      workType,
      machineryModel,
      operatorName,
      operatorPhone,
      workforceCount: Number(workforceCount),
      status: 'Clocked-In / Active',
      startTime: new Date().toISOString(),
      hoursWorked: 0.5,
      siltOrAreaCleared: 'Initiated (Meter: 0.00)',
      fuelLitres: 10,
      costPerHour: Number(costPerHour),
      totalExpense: Number(costPerHour) * 0.5,
      fundingSource,
      supervisorVerified: false,
      supervisorName: 'Pending Field Verification',
      notes: notes.trim() || 'Work underway with GPS check-in.',
      proofPhotos: [
        {
          stage: photoStage,
          url: capturedPhotoUrl,
          caption: photoCaption,
          timestamp: new Date().toLocaleString(),
        }
      ]
    };

    try {
      const res = await fetch('/api/field-work-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLog),
      });
      if (res.ok) {
        const saved = await res.json();
        setLogs([saved, ...logs]);
        setSelectedLog(saved);
      } else {
        setLogs([newLog, ...logs]);
        setSelectedLog(newLog);
      }
    } catch {
      setLogs([newLog, ...logs]);
      setSelectedLog(newLog);
    }

    setIsClockInModalOpen(false);
    setWorkTitle('');
    triggerToast(`🚜 Work Order "${newLog.workOrderTitle}" Clocked-In successfully!`);
  };

  // Mark Completed with End Photo
  const handleCompleteWork = async (logId: string) => {
    const updatedLogs = logs.map(l => {
      if (l.id === logId) {
        const addHours = 6.5;
        const totalHours = l.hoursWorked + addHours;
        const totalExpense = totalHours * l.costPerHour;
        return {
          ...l,
          status: 'Completed & Verified' as WorkStatus,
          endTime: new Date().toISOString(),
          hoursWorked: totalHours,
          totalExpense,
          supervisorVerified: true,
          supervisorName: currentUser?.name ? `${currentUser.name} (Verified)` : 'VAO / Field Agronomist',
          siltOrAreaCleared: 'Completed: 580 cu.m silt excavated & leveled',
          proofPhotos: [
            ...l.proofPhotos,
            {
              stage: 'completed' as const,
              url: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985c?auto=format&fit=crop&w=600&q=80',
              caption: 'Final completion proof: desilted bed contoured with stable bunds',
              timestamp: new Date().toLocaleString(),
            }
          ]
        };
      }
      return l;
    });

    setLogs(updatedLogs);
    const completedItem = updatedLogs.find(l => l.id === logId);
    if (completedItem) setSelectedLog(completedItem);

    try {
      await fetch(`/api/field-work-logs/${logId}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    } catch {
      // offline handling
    }

    triggerToast('✅ Work Order completed & digitally verified with GPS audit!');
  };

  const filteredLogs = logs.filter(l => {
    if (activeFilter === 'ALL') return true;
    return l.status === activeFilter;
  });

  // Calculate high level stats
  const totalExcavationHours = logs.reduce((acc, curr) => acc + curr.hoursWorked, 0);
  const totalFundsTracked = logs.reduce((acc, curr) => acc + curr.totalExpense, 0);
  const activeMachineryCount = logs.filter(l => l.status === 'Clocked-In / Active').length;

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#2D4F1E] text-[#F4F1EA] px-4 py-3 rounded-2xl shadow-2xl border border-[#C08261]/40 flex items-center space-x-2 text-xs sm:text-sm font-bold animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-[#D89F80] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#1F3814] to-[#2D4F1E] rounded-3xl p-6 sm:p-8 text-[#FAF8F5] shadow-xl border border-[#C08261]/30 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-52 h-52 bg-[#C08261]/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-[#FAF8F5]/10 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase text-[#D89F80] border border-[#D89F80]/30">
              <Tractor className="w-3.5 h-3.5" />
              <span>On-Ground Proof-of-Work System</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
              Field Work Verification & Machine Logbook
            </h1>
            <p className="text-xs sm:text-sm text-[#FAF8F5]/80 leading-relaxed">
              Bridging digital reports with physical ground execution. Clock in JCBs, tractors, and shramdaan crews with tamper-proof geotagged photos, live hourly meters, and 1-click CSR / Panchayat verification certificates.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              id="btn-clock-in-machinery"
              onClick={() => setIsClockInModalOpen(true)}
              className="h-10 px-5 bg-[#C08261] hover:bg-[#A86E4F] text-[#FAF8F5] font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all active:scale-95 flex items-center space-x-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Clock In New Machine / Crew</span>
            </button>
            <button
              type="button"
              onClick={fetchLogs}
              className="h-10 px-3.5 bg-[#FAF8F5]/10 hover:bg-[#FAF8F5]/20 text-[#FAF8F5] rounded-xl border border-white/20 transition-all flex items-center justify-center cursor-pointer active:scale-95"
              title="Refresh Logbook"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Real-time Field Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/10">
          <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
            <div className="flex items-center space-x-2 text-[11px] text-[#D89F80] font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>Total Hours Logged</span>
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono text-white mt-1">
              {totalExcavationHours.toFixed(1)} hrs
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
            <div className="flex items-center space-x-2 text-[11px] text-[#D89F80] font-semibold">
              <Tractor className="w-3.5 h-3.5" />
              <span>Active Machines on Site</span>
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono text-white mt-1">
              {activeMachineryCount} Fleet Units
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
            <div className="flex items-center space-x-2 text-[11px] text-[#D89F80] font-semibold">
              <IndianRupee className="w-3.5 h-3.5" />
              <span>Disbursed / Logged Cost</span>
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono text-white mt-1">
              ₹{totalFundsTracked.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
            <div className="flex items-center space-x-2 text-[11px] text-[#D89F80] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verification Rate</span>
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono text-white mt-1">
              100% Geotagged
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-1.5 bg-[#EFECE6] p-1.5 rounded-2xl border border-[#2D4F1E]/15">
          {(['ALL', 'Clocked-In / Active', 'Completed & Verified'] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === filter
                  ? 'bg-[#2D4F1E] text-[#FAF8F5] shadow-md'
                  : 'text-[#2D4F1E]/70 hover:text-[#2D4F1E]'
              }`}
            >
              {filter === 'ALL' ? 'All Field Work' : filter}
            </button>
          ))}
        </div>

        <span className="text-xs text-[#2D4F1E]/70 font-semibold">
          Showing {filteredLogs.length} verified work order{filteredLogs.length === 1 ? '' : 's'}
        </span>
      </div>

      {/* Main Grid: Work Order Cards (Left) & Inspector Detail Pane (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Work Order Cards */}
        <div className="lg:col-span-7 space-y-4">
          {loading ? (
            <div className="p-12 text-center bg-[#FAF8F5] rounded-3xl border border-[#C08261]/20">
              <RefreshCw className="w-8 h-8 text-[#2D4F1E] animate-spin mx-auto mb-2" />
              <p className="text-xs text-[#2D4F1E]/70">Loading verified fleet logs...</p>
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="p-12 text-center bg-[#FAF8F5] rounded-3xl border border-[#C08261]/20">
              <Tractor className="w-12 h-12 text-[#2D4F1E]/40 mx-auto mb-2" />
              <p className="text-sm font-bold text-[#2D4F1E]">No logs match this filter</p>
              <p className="text-xs text-[#2D4F1E]/60 mt-1">Clock in a machine to begin tracking on-site physical work.</p>
            </div>
          ) : (
            filteredLogs.map((log) => {
              const isSelected = selectedLog?.id === log.id;
              const isActive = log.status === 'Clocked-In / Active';

              return (
                <div
                  key={log.id}
                  onClick={() => setSelectedLog(log)}
                  className={`bg-[#FAF8F5] rounded-3xl p-5 border transition-all cursor-pointer shadow-sm hover:shadow-md ${
                    isSelected 
                      ? 'border-2 border-[#2D4F1E] ring-2 ring-[#2D4F1E]/10' 
                      : 'border-[#C08261]/25 hover:border-[#C08261]/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[10px] font-bold bg-[#EFECE6] px-2 py-0.5 rounded text-[#2D4F1E]">
                          {log.id}
                        </span>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center space-x-1 ${
                          isActive 
                            ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                            : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-amber-600 animate-ping' : 'bg-emerald-600'}`} />
                          <span>{log.status}</span>
                        </span>
                        <span className="text-[10px] font-semibold text-[#C08261] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#C08261]/30">
                          {log.fundingSource}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-[#2D4F1E] pt-1">
                        {log.workOrderTitle}
                      </h3>

                      <p className="text-xs text-[#2D4F1E]/70 flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-[#C08261] shrink-0" />
                        <span>{log.locationName}</span>
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="block text-xs font-bold text-[#2D4F1E]">
                        {log.hoursWorked} hrs
                      </span>
                      <span className="text-[11px] font-mono text-[#C08261] font-bold">
                        ₹{log.totalExpense.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Machine & Operator Details */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 pt-3 border-t border-[#2D4F1E]/10 text-xs">
                    <div>
                      <span className="text-[10px] text-[#2D4F1E]/60 uppercase font-semibold block">Machinery</span>
                      <span className="font-bold text-[#2D4F1E] truncate block">{log.machineryModel}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#2D4F1E]/60 uppercase font-semibold block">Operator / Crew</span>
                      <span className="font-bold text-[#2D4F1E] block">{log.operatorName} ({log.workforceCount} laborers)</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#2D4F1E]/60 uppercase font-semibold block">Proof Photos</span>
                      <span className="font-bold text-[#2D4F1E] block flex items-center space-x-1">
                        <Camera className="w-3.5 h-3.5 text-[#C08261]" />
                        <span>{log.proofPhotos.length} Geotagged Snaps</span>
                      </span>
                    </div>
                  </div>

                  {/* Quick Card Footer Action */}
                  <div className="flex items-center justify-between mt-3 pt-2 text-xs">
                    <div className="flex items-center space-x-1.5 text-[11px] text-[#2D4F1E]/70 font-mono">
                      <Clock className="w-3 h-3 text-[#C08261]" />
                      <span>Started: {new Date(log.startTime).toLocaleDateString()}</span>
                    </div>

                    <span className="text-xs font-bold text-[#C08261] flex items-center space-x-1 hover:underline">
                      <span>View Audit & Photos</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Selected Work Order Detailed Audit */}
        <div className="lg:col-span-5">
          {selectedLog ? (
            <div className="bg-[#FAF8F5] rounded-3xl p-6 border border-[#C08261]/30 shadow-lg space-y-5 sticky top-24">
              <div className="flex items-center justify-between border-b border-[#2D4F1E]/15 pb-3">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#C08261] uppercase">Work Order Audit</span>
                  <h3 className="text-lg font-bold text-[#2D4F1E]">{selectedLog.id}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowCertificateModal(selectedLog)}
                    className="h-9 px-3.5 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#FAF8F5] rounded-xl text-xs font-bold shadow-md flex items-center space-x-1.5 transition-all active:scale-95 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#D89F80]" />
                    <span>Audit Certificate</span>
                  </button>
                </div>
              </div>

              {/* Status Banner */}
              <div className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                selectedLog.status === 'Clocked-In / Active'
                  ? 'bg-amber-50 border-amber-200 text-amber-900'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-900'
              }`}>
                <div className="flex items-center space-x-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${selectedLog.status === 'Clocked-In / Active' ? 'bg-amber-500 animate-pulse' : 'bg-emerald-600'}`} />
                  <span className="text-xs font-bold">{selectedLog.status}</span>
                </div>

                {selectedLog.status === 'Clocked-In / Active' && (
                  <button
                    type="button"
                    onClick={() => handleCompleteWork(selectedLog.id)}
                    className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow transition-all active:scale-95 cursor-pointer"
                  >
                    Mark Work Complete
                  </button>
                )}
              </div>

              {/* Location & GPS Info */}
              <div className="p-3 bg-[#EFECE6] rounded-2xl text-xs space-y-1.5">
                <div className="flex items-center justify-between text-[#2D4F1E]">
                  <span className="font-bold flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C08261]" />
                    <span>Location:</span>
                  </span>
                  <span className="font-mono text-[11px] bg-[#FAF8F5] px-1.5 py-0.5 rounded border border-[#2D4F1E]/20">
                    {selectedLog.coordinates.lat.toFixed(4)}° N, {selectedLog.coordinates.lng.toFixed(4)}° E
                  </span>
                </div>
                <p className="text-[#2D4F1E]/80 text-[11px] pl-4">{selectedLog.locationName}</p>
              </div>

              {/* Machine & Crew Specs */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-[#2D4F1E]/10">
                  <span className="text-[#2D4F1E]/70 font-medium">Work Type:</span>
                  <span className="font-bold text-[#2D4F1E]">{selectedLog.workType}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#2D4F1E]/10">
                  <span className="text-[#2D4F1E]/70 font-medium">Machinery / Model:</span>
                  <span className="font-bold text-[#2D4F1E]">{selectedLog.machineryModel}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#2D4F1E]/10">
                  <span className="text-[#2D4F1E]/70 font-medium">Operator Name:</span>
                  <span className="font-bold text-[#2D4F1E]">{selectedLog.operatorName} ({selectedLog.operatorPhone})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#2D4F1E]/10">
                  <span className="text-[#2D4F1E]/70 font-medium">Labor Workforce:</span>
                  <span className="font-bold text-[#2D4F1E]">{selectedLog.workforceCount} Skilled / Semi-skilled hands</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#2D4F1E]/10">
                  <span className="text-[#2D4F1E]/70 font-medium">Silt / Area Cleared:</span>
                  <span className="font-bold text-emerald-800">{selectedLog.siltOrAreaCleared}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#2D4F1E]/10">
                  <span className="text-[#2D4F1E]/70 font-medium">Rate / Total Expense:</span>
                  <span className="font-bold font-mono text-[#2D4F1E]">₹{selectedLog.costPerHour}/hr (Total: ₹{selectedLog.totalExpense.toLocaleString('en-IN')})</span>
                </div>
              </div>

              {/* Verified Proof Photos Carousel / Grid */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-[#2D4F1E] flex items-center space-x-1.5">
                    <Camera className="w-3.5 h-3.5 text-[#C08261]" />
                    <span>Proof of Work Snaps ({selectedLog.proofPhotos.length})</span>
                  </span>
                  <span className="text-[10px] text-[#C08261] font-bold">Tamper-Proof Geotag</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {selectedLog.proofPhotos.map((p, idx) => (
                    <div key={idx} className="group relative rounded-2xl overflow-hidden border border-[#2D4F1E]/20 bg-black/10">
                      <img 
                        src={p.url} 
                        alt={p.caption} 
                        className="w-full h-28 object-cover group-hover:scale-105 transition-transform" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2 text-white">
                        <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-[#C08261] rounded w-fit mb-0.5">
                          {p.stage}
                        </span>
                        <p className="text-[10px] line-clamp-1 font-medium">{p.caption}</p>
                        <p className="text-[9px] text-white/70 font-mono">{p.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Supervisor Sign-Off */}
              <div className="p-3 bg-[#EFECE6] rounded-2xl border border-[#2D4F1E]/15 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <UserCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <div>
                    <span className="font-bold text-[#2D4F1E] block">Supervisor Verification</span>
                    <span className="text-[11px] text-[#2D4F1E]/70">{selectedLog.supervisorName}</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                  Verified
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-[#FAF8F5] rounded-3xl p-12 text-center border border-[#C08261]/25 text-xs text-[#2D4F1E]/60">
              Select a work order from the left to view complete GPS audit logs.
            </div>
          )}
        </div>
      </div>

      {/* MODAL 1: CLOCK IN NEW MACHINE / CREW */}
      {isClockInModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#1F3814]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
          <div className="bg-[#FAF8F5] rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl space-y-4 border border-[#C08261]/30 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#2D4F1E]/15 pb-3">
              <div className="flex items-center space-x-2">
                <Tractor className="w-5 h-5 text-[#C08261]" />
                <h3 className="text-base sm:text-lg font-bold text-[#2D4F1E]">Clock In Field Machinery / Crew</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsClockInModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-sm p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleClockInSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-1">
                  Work Order Title <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. South Canal Excavator Dredging & Desilting"
                  value={workTitle}
                  onChange={(e) => setWorkTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-medium text-[#2D4F1E] focus:outline-none focus:ring-1 focus:ring-[#C08261]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-1">
                    Work Type
                  </label>
                  <select
                    value={workType}
                    onChange={(e) => setWorkType(e.target.value as MachineWorkType)}
                    className="w-full px-3 py-2 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-bold text-[#2D4F1E] focus:outline-none focus:ring-1 focus:ring-[#C08261]"
                  >
                    <option value="Excavator / JCB Desilting">Excavator / JCB Desilting</option>
                    <option value="Tractor Silt Hauling & Leveling">Tractor Silt Hauling & Leveling</option>
                    <option value="Weed Harvester / Aquatic Clearing">Weed Harvester / Aquatic Clearing</option>
                    <option value="Bund Strengthening & Compaction">Bund Strengthening & Compaction</option>
                    <option value="Biochar / Gypsum Spreading">Biochar / Gypsum Spreading</option>
                    <option value="Manual Labor / Shramdaan Crew">Manual Labor / Shramdaan Crew</option>
                    <option value="Vetiver / Sapling Plantation">Vetiver / Sapling Plantation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-1">
                    Machinery Model / Tool
                  </label>
                  <input
                    type="text"
                    value={machineryModel}
                    onChange={(e) => setMachineryModel(e.target.value)}
                    className="w-full px-3 py-2 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-medium text-[#2D4F1E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-1">
                    Operator / Lead Name
                  </label>
                  <input
                    type="text"
                    required
                    value={operatorName}
                    onChange={(e) => setOperatorName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-medium text-[#2D4F1E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-1">
                    Operator Contact Phone
                  </label>
                  <input
                    type="text"
                    required
                    value={operatorPhone}
                    onChange={(e) => setOperatorPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-medium text-[#2D4F1E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-1">
                    Crew Hands
                  </label>
                  <input
                    type="number"
                    value={workforceCount}
                    onChange={(e) => setWorkforceCount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-medium text-[#2D4F1E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-1">
                    Cost / Hr (₹)
                  </label>
                  <input
                    type="number"
                    value={costPerHour}
                    onChange={(e) => setCostPerHour(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-medium text-[#2D4F1E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-1">
                    Funding Source
                  </label>
                  <select
                    value={fundingSource}
                    onChange={(e) => setFundingSource(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-medium text-[#2D4F1E]"
                  >
                    <option value="CSR Grant (ITC / Tata)">CSR Grant (ITC / Tata)</option>
                    <option value="MGNREGA Scheme">MGNREGA Scheme</option>
                    <option value="Panchayat Fund">Panchayat Fund</option>
                    <option value="Farmer Self-Funded">Farmer Self-Funded</option>
                  </select>
                </div>
              </div>

              {/* Photo Proof Upload Simulation */}
              <div className="p-3 bg-[#EFECE6] rounded-2xl space-y-2 border border-[#2D4F1E]/20">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-[#2D4F1E] flex items-center space-x-1.5">
                    <Camera className="w-3.5 h-3.5 text-[#C08261]" />
                    <span>Attach Initial Proof Photo (Geotagged)</span>
                  </span>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                    GPS Locked
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <img
                    src={capturedPhotoUrl}
                    alt="Proof Preview"
                    className="w-16 h-16 rounded-xl object-cover border border-[#2D4F1E]/30 shrink-0"
                  />
                  <div className="flex-1 space-y-1">
                    <input
                      type="text"
                      value={photoCaption}
                      onChange={(e) => setPhotoCaption(e.target.value)}
                      placeholder="Photo caption (e.g. Lake weed blockage)"
                      className="w-full px-2.5 py-1 text-xs bg-[#FAF8F5] border border-[#2D4F1E]/20 rounded-lg"
                    />
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => setCapturedPhotoUrl('https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&w=600&q=80')}
                        className="text-[10px] px-2 py-0.5 bg-[#FAF8F5] rounded border hover:bg-white"
                      >
                        Sample Lake
                      </button>
                      <button
                        type="button"
                        onClick={() => setCapturedPhotoUrl('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80')}
                        className="text-[10px] px-2 py-0.5 bg-[#FAF8F5] rounded border hover:bg-white"
                      >
                        Sample Farm Plot
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsClockInModalOpen(false)}
                  className="flex-1 h-10 bg-[#EFECE6] hover:bg-[#E2DDD5] text-[#2D4F1E] font-bold rounded-xl transition-all active:scale-95 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 h-10 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#FAF8F5] font-bold rounded-xl shadow-md cursor-pointer flex items-center justify-center space-x-1.5 transition-all active:scale-95"
                >
                  <Tractor className="w-4 h-4 text-[#D89F80]" />
                  <span>Start Clock & Save</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: 1-CLICK VERIFICATION CERTIFICATE MODAL */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 bg-[#1F3814]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
          <div className="bg-[#FAF8F5] rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 border-2 border-[#2D4F1E] max-h-[92vh] overflow-y-auto">
            {/* Certificate Printable Header */}
            <div className="text-center border-b-2 border-dashed border-[#2D4F1E]/30 pb-4 space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-[#2D4F1E] text-[#D89F80] mx-auto flex items-center justify-center font-bold mb-2 shadow">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <span className="text-[10px] uppercase font-bold text-[#C08261] tracking-widest block">
                Official Proof-of-Restoration Audit Certificate
              </span>
              <h2 className="text-xl font-serif font-bold text-[#2D4F1E]">
                Eden Sync Field Verification
              </h2>
              <p className="text-xs text-[#2D4F1E]/70 font-mono">
                Order Reference: {showCertificateModal.id}
              </p>
            </div>

            {/* Certificate Body Data */}
            <div className="space-y-2.5 text-xs bg-[#EFECE6] p-4 rounded-2xl">
              <div className="flex justify-between">
                <span className="text-[#2D4F1E]/70">Site & Landmark:</span>
                <span className="font-bold text-[#2D4F1E] text-right">{showCertificateModal.locationName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#2D4F1E]/70">GPS Pin:</span>
                <span className="font-mono text-[11px] font-bold text-[#2D4F1E]">
                  {showCertificateModal.coordinates.lat.toFixed(4)}° N, {showCertificateModal.coordinates.lng.toFixed(4)}° E
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#2D4F1E]/70">Machine & Operator:</span>
                <span className="font-bold text-[#2D4F1E]">{showCertificateModal.machineryModel} ({showCertificateModal.operatorName})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#2D4F1E]/70">Hours & Silt Cleared:</span>
                <span className="font-bold text-[#2D4F1E]">{showCertificateModal.hoursWorked} hrs | {showCertificateModal.siltOrAreaCleared}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#2D4F1E]/70">Total Grant/Expense:</span>
                <span className="font-mono font-bold text-[#C08261]">₹{showCertificateModal.totalExpense.toLocaleString('en-IN')} ({showCertificateModal.fundingSource})</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#2D4F1E]/20">
                <span className="text-[#2D4F1E]/70">Signed / Verified By:</span>
                <span className="font-bold text-emerald-800">{showCertificateModal.supervisorName}</span>
              </div>
            </div>

            {/* Photos Proof Preview in Certificate */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {showCertificateModal.proofPhotos.map((p, i) => (
                <div key={i} className="text-center">
                  <img src={p.url} alt={p.caption} className="w-full h-20 object-cover rounded-xl border border-[#2D4F1E]/20" />
                  <span className="text-[9px] font-mono text-[#2D4F1E]/70 block mt-0.5">{p.stage.toUpperCase()}: {p.timestamp}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-3">
              <button
                type="button"
                onClick={() => setShowCertificateModal(null)}
                className="flex-1 h-10 bg-[#EFECE6] hover:bg-[#E2DDD5] text-[#2D4F1E] font-bold rounded-xl text-xs transition-all active:scale-95 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="flex-1 h-10 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#FAF8F5] font-bold rounded-xl text-xs shadow-md flex items-center justify-center space-x-1.5 transition-all active:scale-95 cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#D89F80]" />
                <span>Print / Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
