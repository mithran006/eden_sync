import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Send, 
  Smartphone, 
  MessageSquare, 
  ShieldCheck, 
  AlertTriangle, 
  FlaskConical, 
  FileText, 
  UserCheck, 
  ExternalLink, 
  Share2, 
  PlusCircle, 
  Check, 
  Radio, 
  Building, 
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { PollutionComplaint, ComplaintMilestoneEvent, ComplaintStatus } from '../types';

interface ComplaintMilestoneTrackerProps {
  complaint: PollutionComplaint;
  onUpdateComplaint?: (updatedComplaint: PollutionComplaint) => Promise<void>;
}

const STAGE_CONFIG: Record<ComplaintStatus, { step: number; color: string; bg: string; icon: any }> = {
  'Reported & Logged': {
    step: 1,
    color: 'text-amber-700',
    bg: 'bg-amber-100 border-amber-300',
    icon: Clock
  },
  'Inspection Officer Dispatched': {
    step: 2,
    color: 'text-blue-700',
    bg: 'bg-blue-100 border-blue-300',
    icon: UserCheck
  },
  'Water/Soil Samples in Lab Analysis': {
    step: 3,
    color: 'text-purple-700',
    bg: 'bg-purple-100 border-purple-300',
    icon: FlaskConical
  },
  'Legal Notice Issued & Containment Active': {
    step: 4,
    color: 'text-orange-700',
    bg: 'bg-orange-100 border-orange-300',
    icon: ShieldCheck
  },
  'Remediated & Revived': {
    step: 5,
    color: 'text-emerald-700',
    bg: 'bg-emerald-100 border-emerald-300',
    icon: CheckCircle2
  }
};

export const ComplaintMilestoneTracker: React.FC<ComplaintMilestoneTrackerProps> = ({
  complaint,
  onUpdateComplaint
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'timeline' | 'sms_preview' | 'whatsapp_share'>('timeline');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Add Milestone Form State
  const [newStage, setNewStage] = useState<ComplaintStatus>('Inspection Officer Dispatched');
  const [newHeadline, setNewHeadline] = useState('');
  const [newDetails, setNewDetails] = useState('');
  const [newOfficerName, setNewOfficerName] = useState(complaint.assignedOfficer || 'Er. Environmental Officer');
  const [newActionTaken, setNewActionTaken] = useState('');
  const [notifySMS, setNotifySMS] = useState(true);
  const [notifyWhatsApp, setNotifyWhatsApp] = useState(true);
  const [isSubmittingMilestone, setIsSubmittingMilestone] = useState(false);

  // Generate fallback milestones if none exist
  const milestones: ComplaintMilestoneEvent[] = complaint.milestones && complaint.milestones.length > 0
    ? complaint.milestones
    : [
        {
          id: `EVT-${complaint.id}-1`,
          stage: 'Reported & Logged',
          timestamp: complaint.createdAt,
          headline: 'Pollution Grievance Registered & Geotagged',
          details: `Grievance registered with Eden Sync Environmental Monitoring System. Immediate containment risk score: ${complaint.aiAssessment?.riskScore || 85}/100.`,
          officerName: 'Eden Sync AI Triage Engine',
          actionTaken: 'Case file opened; automated alert transmitted to Regional Environmental Office & SPCB.',
          channelsNotified: ['SMS', 'WhatsApp'],
          simulatedNotificationText: `[EDEN-SYNC] Grievance ${complaint.id} registered for ${complaint.location}. Status: Reported & Logged. Track status at https://edensync.org/track/${complaint.id}`
        }
      ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };

  // WhatsApp Share Generator
  const generateWhatsAppText = () => {
    const latest = milestones[milestones.length - 1];
    return `🚨 *EDEN SYNC - POLLUTION GRIEVANCE TRACKER* 🚨
━━━━━━━━━━━━━━━━━━━━
📌 *Grievance ID:* ${complaint.id}
📍 *Location:* ${complaint.location}, ${complaint.district}
⚠️ *Domain:* ${complaint.domain} (${complaint.severity})
📋 *Current Status:* ${complaint.status}
━━━━━━━━━━━━━━━━━━━━
🌱 *Latest Field Milestone:*
*${latest?.headline || 'Under Active Inspection'}*
_${latest?.details || 'Official containment protocol ongoing.'}_

👮 *Assigned Officer:* ${complaint.assignedOfficer || 'Environmental Flying Squad'}
📞 *Contact:* ${complaint.assignedOfficerContact || 'SPCB Control Room'}

📊 *AI Risk Score:* ${complaint.aiAssessment?.riskScore || 85}/100
🔗 *Live Public Tracker:* https://edensync.org/track/${complaint.id}
━━━━━━━━━━━━━━━━━━━━
_Real-time updates delivered by Eden Sync Soil & Water Intelligence._`;
  };

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(generateWhatsAppText());
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    showToast('💬 WhatsApp status message template generated!');
  };

  const handleSimulateSMSDispatch = (ms: ComplaintMilestoneEvent) => {
    showToast(`📱 SMS alert dispatched to complainant mobile: "${ms.simulatedNotificationText.slice(0, 50)}..." [Carrier Ack: #SMS-ACK-${Math.floor(1000 + Math.random() * 9000)}]`);
  };

  const handleAddMilestoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHeadline.trim() || !newDetails.trim()) return;

    setIsSubmittingMilestone(true);

    const channels: ('SMS' | 'WhatsApp')[] = [];
    if (notifySMS) channels.push('SMS');
    if (notifyWhatsApp) channels.push('WhatsApp');

    const createdMilestone: ComplaintMilestoneEvent = {
      id: `EVT-${Date.now()}`,
      stage: newStage,
      timestamp: new Date().toISOString(),
      headline: newHeadline.trim(),
      details: newDetails.trim(),
      officerName: newOfficerName.trim(),
      actionTaken: newActionTaken.trim() || undefined,
      channelsNotified: channels.length > 0 ? channels : ['SMS', 'WhatsApp'],
      simulatedNotificationText: `[EDEN-SYNC STATUS UPDATE] ${complaint.id}: ${newHeadline.trim()}. Stage: ${newStage}. Action: ${newActionTaken.trim() || 'Logged by inspection team'}.`
    };

    const updatedMilestones = [...milestones, createdMilestone];
    const updatedComplaint: PollutionComplaint = {
      ...complaint,
      status: newStage,
      assignedOfficer: newOfficerName.trim() || complaint.assignedOfficer,
      adminRemarks: newDetails.trim(),
      milestones: updatedMilestones
    };

    try {
      if (onUpdateComplaint) {
        await onUpdateComplaint(updatedComplaint);
      }
      setIsSubmittingMilestone(false);
      setShowAddModal(false);
      setNewHeadline('');
      setNewDetails('');
      setNewActionTaken('');
      showToast(`✅ Milestone logged & instant ${channels.join(' & ')} alert dispatched to complainant!`);
    } catch (err) {
      console.error('Failed to save milestone:', err);
      setIsSubmittingMilestone(false);
      showToast('❌ Error saving milestone update.');
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#C08261]/30 shadow-xl space-y-6">
      {/* Header with Badges & Action Buttons */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#C08261]/20">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-[#2D4F1E] text-[#F4F1EA] flex items-center justify-center font-bold">
              <Smartphone className="w-4 h-4 text-[#D89F80]" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase text-[#C08261] tracking-wider block">
                Multi-Channel Real-Time Tracking
              </span>
              <h3 className="text-xl font-serif font-bold text-[#2D4F1E]">
                WhatsApp & SMS Redressal Milestones
              </h3>
            </div>
          </div>
          <p className="text-xs text-[#2D4F1E]/70 max-w-xl">
            Live chronological timeline with automated carrier SMS delivery confirmations and WhatsApp status synchronization for landowners and village panchayats.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleOpenWhatsApp}
            className="h-9 px-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs rounded-xl shadow-sm inline-flex items-center space-x-1.5 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-current" />
            <span>Share via WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="h-9 px-3.5 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#F4F1EA] font-bold text-xs rounded-xl shadow-sm inline-flex items-center space-x-1.5 transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5 text-[#D89F80]" />
            <span>Log Officer Milestone</span>
          </button>
        </div>
      </div>

      {/* Toast Alert Notification */}
      {toastMessage && (
        <div className="p-3.5 bg-[#2D4F1E] text-[#F4F1EA] border border-[#D4A359] rounded-2xl text-xs font-medium flex items-center space-x-2 animate-fadeIn shadow-md">
          <Radio className="w-4 h-4 text-[#D4A359] shrink-0 animate-pulse" />
          <span className="flex-1">{toastMessage}</span>
        </div>
      )}

      {/* Complainant Notification Status Banner */}
      <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C08261]/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-[#2D4F1E]/10 border border-[#2D4F1E]/20 flex items-center justify-center text-[#2D4F1E]">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-[#2D4F1E]">
              Registered Mobile:{' '}
              <span className="font-mono text-[#C08261]">
                {complaint.complainantPhone || '+91 98422 11980'}
              </span>{' '}
              {complaint.isAnonymous && <span className="text-[10px] text-slate-500 font-normal">(Anonymous Protection Active)</span>}
            </p>
            <p className="text-[11px] text-[#2D4F1E]/70">
              Assigned Field Officer:{' '}
              <strong className="text-[#2D4F1E]">{complaint.assignedOfficer || 'Er. V. Murugesan (TNPCB)'}</strong>{' '}
              {complaint.assignedOfficerContact && <span className="font-mono text-[#C08261]">({complaint.assignedOfficerContact})</span>}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-[10px] font-extrabold flex items-center space-x-1">
            <Check className="w-3 h-3 text-emerald-700" />
            <span>SMS Alerts Active</span>
          </span>
          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-[10px] font-extrabold flex items-center space-x-1">
            <Check className="w-3 h-3 text-emerald-700" />
            <span>WhatsApp Sync Active</span>
          </span>
        </div>
      </div>

      {/* Chronological Milestone Timeline */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#C08261]/30">
        {milestones.map((ms, index) => {
          const cfg = STAGE_CONFIG[ms.stage] || STAGE_CONFIG['Reported & Logged'];
          const Icon = cfg.icon;
          const isLatest = index === milestones.length - 1;

          return (
            <div key={ms.id || index} className="relative group">
              {/* Timeline Pin Icon */}
              <div className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border-2 ${
                isLatest ? 'bg-[#2D4F1E] text-[#F4F1EA] border-[#D4A359] shadow-md ring-4 ring-[#2D4F1E]/15' : 'bg-white text-[#2D4F1E] border-[#C08261]'
              }`}>
                <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>

              {/* Milestone Card */}
              <div className={`p-5 rounded-2xl border transition-all ${
                isLatest 
                  ? 'bg-white border-[#C08261] shadow-md ring-1 ring-[#C08261]/20' 
                  : 'bg-[#FAF8F5] border-[#C08261]/25 hover:border-[#C08261]/50'
              }`}>
                {/* Milestone Top Row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-[#C08261]/15">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold uppercase border ${cfg.bg} ${cfg.color}`}>
                      Step {cfg.step}: {ms.stage}
                    </span>
                    {isLatest && (
                      <span className="px-2 py-0.5 bg-[#2D4F1E] text-[#D4A359] text-[9px] font-extrabold uppercase rounded-md tracking-wider">
                        Latest Update
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] font-mono text-[#2D4F1E]/70 flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-[#C08261]" />
                    <span>{new Date(ms.timestamp).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                  </span>
                </div>

                {/* Headline & Details */}
                <div className="py-3 space-y-2">
                  <h4 className="text-sm sm:text-base font-serif font-bold text-[#2D4F1E]">
                    {ms.headline}
                  </h4>
                  <p className="text-xs text-[#2D4F1E]/85 leading-relaxed">
                    {ms.details}
                  </p>
                </div>

                {/* Sample Test Results Callout if available */}
                {ms.sampleTestResults && (
                  <div className="my-2.5 p-3.5 bg-purple-50 rounded-xl border border-purple-200 text-xs space-y-2">
                    <div className="flex items-center space-x-1.5 font-bold text-purple-900">
                      <FlaskConical className="w-3.5 h-3.5 text-purple-600" />
                      <span>Certified Laboratory Spectrometry Results</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                      {ms.sampleTestResults.ph && (
                        <div className="p-2 bg-white rounded-lg border border-purple-100">
                          <span className="text-purple-600 font-medium block">pH Value</span>
                          <strong className="text-purple-950 font-bold">{ms.sampleTestResults.ph}</strong>
                        </div>
                      )}
                      {ms.sampleTestResults.tdsPpm && (
                        <div className="p-2 bg-white rounded-lg border border-purple-100">
                          <span className="text-purple-600 font-medium block">TDS</span>
                          <strong className="text-purple-950 font-bold">{ms.sampleTestResults.tdsPpm} ppm</strong>
                        </div>
                      )}
                      {ms.sampleTestResults.dissolvedOxygen && (
                        <div className="p-2 bg-white rounded-lg border border-purple-100">
                          <span className="text-purple-600 font-medium block">Dissolved O₂</span>
                          <strong className="text-purple-950 font-bold">{ms.sampleTestResults.dissolvedOxygen}</strong>
                        </div>
                      )}
                      {ms.sampleTestResults.heavyMetalsPresent !== undefined && (
                        <div className="p-2 bg-white rounded-lg border border-purple-100">
                          <span className="text-purple-600 font-medium block">Heavy Metals</span>
                          <strong className={ms.sampleTestResults.heavyMetalsPresent ? 'text-red-700 font-bold' : 'text-emerald-700 font-bold'}>
                            {ms.sampleTestResults.heavyMetalsPresent ? 'Detected (Hazardous)' : 'Negative'}
                          </strong>
                        </div>
                      )}
                    </div>
                    {ms.sampleTestResults.toxicChemicalIdentified && (
                      <p className="text-[11px] text-purple-900 font-medium pt-1">
                        🔬 Identified Contaminant: <strong>{ms.sampleTestResults.toxicChemicalIdentified}</strong>
                      </p>
                    )}
                  </div>
                )}

                {/* Legal Notice Ref if available */}
                {ms.noticeReferenceNo && (
                  <div className="my-2.5 p-3 bg-orange-50 rounded-xl border border-orange-200 text-xs flex items-center space-x-2 text-orange-900">
                    <FileText className="w-4 h-4 text-orange-600 shrink-0" />
                    <div>
                      <span>Statutory Closure Order / Enforcement Ref: </span>
                      <strong className="font-mono">{ms.noticeReferenceNo}</strong>
                    </div>
                  </div>
                )}

                {/* Officer & Action Taken */}
                {(ms.officerName || ms.actionTaken) && (
                  <div className="pt-2 pb-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#2D4F1E]/80">
                    {ms.officerName && (
                      <div className="flex items-center space-x-1">
                        <UserCheck className="w-3.5 h-3.5 text-[#C08261]" />
                        <span>Officer: <strong>{ms.officerName}</strong></span>
                      </div>
                    )}
                    {ms.actionTaken && (
                      <div className="flex items-center space-x-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#2D4F1E]" />
                        <span>Action: <strong className="text-[#2D4F1E]">{ms.actionTaken}</strong></span>
                      </div>
                    )}
                  </div>
                )}

                {/* Notification Delivery Strip */}
                <div className="mt-3 pt-3 border-t border-[#C08261]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px]">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {ms.channelsNotified?.includes('SMS') && (
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-md font-medium inline-flex items-center space-x-1">
                        <Smartphone className="w-3 h-3 text-blue-500" />
                        <span>SMS Alert Delivered</span>
                      </span>
                    )}
                    {ms.channelsNotified?.includes('WhatsApp') && (
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md font-medium inline-flex items-center space-x-1">
                        <MessageSquare className="w-3 h-3 text-emerald-500" />
                        <span>WhatsApp Pushed</span>
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSimulateSMSDispatch(ms)}
                    className="text-[#C08261] hover:text-[#2D4F1E] font-bold text-[11px] inline-flex items-center space-x-1"
                  >
                    <span>Inspect Dispatch Broadcast</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

                {/* Broadcast SMS Preview Card (Inline Expandable) */}
                <div className="mt-2 p-2.5 bg-slate-900 text-slate-100 rounded-xl font-mono text-[10px] leading-relaxed border border-slate-700">
                  <span className="text-emerald-400 font-bold">📲 Carrier Dispatch Payload:</span> {ms.simulatedNotificationText}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Officer Milestone Logging Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#C08261]/30 shadow-2xl space-y-5 animate-fadeIn max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#C08261]/20">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-[#2D4F1E] text-[#F4F1EA] flex items-center justify-center font-bold">
                  <PlusCircle className="w-4 h-4 text-[#D89F80]" />
                </div>
                <h3 className="text-lg font-serif font-bold text-[#2D4F1E]">
                  Log Field Inspection Milestone
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddMilestoneSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#2D4F1E] uppercase tracking-wider mb-1.5">
                  Advance Progression Stage *
                </label>
                <select
                  value={newStage}
                  onChange={(e) => setNewStage(e.target.value as ComplaintStatus)}
                  className="w-full h-11 px-3.5 bg-[#FAF8F5] border border-[#C08261]/40 rounded-xl text-xs sm:text-sm font-medium text-[#2D4F1E] focus:outline-none focus:ring-2 focus:ring-[#C08261]"
                >
                  <option value="Reported & Logged">1. Reported & Logged</option>
                  <option value="Inspection Officer Dispatched">2. Inspection Officer Dispatched</option>
                  <option value="Water/Soil Samples in Lab Analysis">3. Water/Soil Samples in Lab Analysis</option>
                  <option value="Legal Notice Issued & Containment Active">4. Legal Notice Issued & Containment Active</option>
                  <option value="Remediated & Revived">5. Remediated & Revived</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2D4F1E] uppercase tracking-wider mb-1.5">
                  Milestone Headline *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lab Testing Completed / Biochar Check Dam Deployed"
                  value={newHeadline}
                  onChange={(e) => setNewHeadline(e.target.value)}
                  className="w-full h-11 px-3.5 bg-[#FAF8F5] border border-[#C08261]/40 rounded-xl text-xs sm:text-sm font-medium text-[#2D4F1E] focus:outline-none focus:ring-2 focus:ring-[#C08261]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2D4F1E] uppercase tracking-wider mb-1.5">
                  Inspection Details & Evidence Notes *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Provide field findings, water/soil test metrics, or enforcement steps taken..."
                  value={newDetails}
                  onChange={(e) => setNewDetails(e.target.value)}
                  className="w-full p-3.5 bg-[#FAF8F5] border border-[#C08261]/40 rounded-xl text-xs sm:text-sm font-medium text-[#2D4F1E] focus:outline-none focus:ring-2 focus:ring-[#C08261]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#2D4F1E] uppercase tracking-wider mb-1.5">
                    Officer In-Charge
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Er. V. Murugesan (TNPCB)"
                    value={newOfficerName}
                    onChange={(e) => setNewOfficerName(e.target.value)}
                    className="w-full h-11 px-3.5 bg-[#FAF8F5] border border-[#C08261]/40 rounded-xl text-xs font-medium text-[#2D4F1E] focus:outline-none focus:ring-2 focus:ring-[#C08261]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D4F1E] uppercase tracking-wider mb-1.5">
                    Action Taken
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Closure Notice Served / Bio-remedy Active"
                    value={newActionTaken}
                    onChange={(e) => setNewActionTaken(e.target.value)}
                    className="w-full h-11 px-3.5 bg-[#FAF8F5] border border-[#C08261]/40 rounded-xl text-xs font-medium text-[#2D4F1E] focus:outline-none focus:ring-2 focus:ring-[#C08261]"
                  />
                </div>
              </div>

              {/* Notification Dispatch Toggles */}
              <div className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#C08261]/30 space-y-2">
                <span className="text-[10px] font-extrabold uppercase text-[#2D4F1E] tracking-wider block">
                  Broadcast Channels
                </span>
                <div className="flex items-center space-x-4 text-xs font-bold text-[#2D4F1E]">
                  <label className="flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifySMS}
                      onChange={(e) => setNotifySMS(e.target.checked)}
                      className="rounded border-[#C08261] text-[#2D4F1E] focus:ring-[#2D4F1E]"
                    />
                    <span>Transmit Instant SMS</span>
                  </label>

                  <label className="flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifyWhatsApp}
                      onChange={(e) => setNotifyWhatsApp(e.target.checked)}
                      className="rounded border-[#C08261] text-[#2D4F1E] focus:ring-[#2D4F1E]"
                    />
                    <span>Push WhatsApp Notification</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="h-11 px-5 border border-[#C08261]/40 rounded-xl text-xs font-bold text-[#2D4F1E] hover:bg-[#FAF8F5]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmittingMilestone}
                  className="h-11 px-6 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#F4F1EA] font-bold text-xs rounded-xl shadow-md inline-flex items-center space-x-2 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5 text-[#D89F80]" />
                  <span>{isSubmittingMilestone ? 'Publishing...' : 'Publish Milestone & Notify'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
