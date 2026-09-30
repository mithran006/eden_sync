import React, { useState } from 'react';
import { LayoutDashboard, CheckCircle2, Clock, MapPin, Phone, FileText, Sparkles, PlusCircle, Sprout, Droplets, ShieldCheck, User, Sun, Layers, ChevronDown, ChevronUp, KeyRound, Lock, Eye, EyeOff, Receipt, Download, Check, Landmark, X } from 'lucide-react';
import { LandApplication, ApplicationStatus, UserProfile, SoilConditionCategory, ExportedDocument } from '../types';
import { SoilPhotoDetector } from './SoilPhotoDetector';
import { exportBillPdf, exportReportPdf, calculateBillDetails, extractReportDetails } from '../utils/documentExportPdf';

interface UserPortalProps {
  applications: LandApplication[];
  currentUser: UserProfile | null;
  onRegisterNew: () => void;
  onLoginClick: () => void;
  onUpdatePassword?: (newPassword: string) => void;
  onTriggerPasswordAloneLogin?: () => void;
}

export const UserPortal: React.FC<UserPortalProps> = ({
  applications,
  currentUser,
  onRegisterNew,
  onLoginClick,
  onUpdatePassword,
  onTriggerPasswordAloneLogin,
}) => {
  const [expandedSoilDetectorId, setExpandedSoilDetectorId] = useState<string | null>(null);
  const [showQuickPass, setShowQuickPass] = useState<boolean>(false);
  const [isEditingPassword, setIsEditingPassword] = useState<boolean>(false);
  const [newPasswordInput, setNewPasswordInput] = useState<string>('');
  const [passwordSavedToast, setPasswordSavedToast] = useState<string | null>(null);

  // PDF Export & DB Storing State
  const [exportingKey, setExportingKey] = useState<string | null>(null);
  const [exportToast, setExportToast] = useState<string | null>(null);
  const [previewBillApp, setPreviewBillApp] = useState<LandApplication | null>(null);
  const [previewReportApp, setPreviewReportApp] = useState<LandApplication | null>(null);
  const [exportedRecords, setExportedRecords] = useState<Record<string, { bill?: boolean; report?: boolean; at?: string }>>({});

  const triggerExportToast = (msg: string) => {
    setExportToast(msg);
    setTimeout(() => setExportToast(null), 4000);
  };

  const handleExportBill = async (app: LandApplication) => {
    setExportingKey(`${app.id}-bill`);
    try {
      const uName = currentUser?.name || app.applicantName || 'Registered Landowner';
      const doc = await exportBillPdf(app, uName);
      setExportedRecords(prev => ({
        ...prev,
        [app.id]: {
          ...prev[app.id],
          bill: true,
          at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      }));
      triggerExportToast(`Official Bill #${doc.id} downloaded & stored in database for admin check!`);
    } catch (err) {
      console.error('Error exporting bill:', err);
      triggerExportToast('Error exporting bill PDF. Please retry.');
    } finally {
      setExportingKey(null);
    }
  };

  const handleExportReport = async (app: LandApplication) => {
    setExportingKey(`${app.id}-report`);
    try {
      const uName = currentUser?.name || app.applicantName || 'Registered Landowner';
      const doc = await exportReportPdf(app, uName);
      setExportedRecords(prev => ({
        ...prev,
        [app.id]: {
          ...prev[app.id],
          report: true,
          at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      }));
      triggerExportToast(`Comprehensive Report #${doc.id} downloaded & stored in database for admin check!`);
    } catch (err) {
      console.error('Error exporting report:', err);
      triggerExportToast('Error exporting report PDF. Please retry.');
    } finally {
      setExportingKey(null);
    }
  };

  // Filter user applications matching current user's phone or name, or show all if logged in as user
  const userApps = currentUser
    ? applications.filter(a => {
        if (!a) return false;
        const curPhone = (currentUser.phone || '').trim();
        const aPhone = (a.phone || '').trim();
        const phoneMatch = Boolean(curPhone && aPhone && curPhone === aPhone);

        const curName = (currentUser.name || '').trim().toLowerCase();
        const aName = (a.applicantName || '').trim().toLowerCase();
        const nameMatch = Boolean(curName && aName && aName.includes(curName));

        return phoneMatch || nameMatch;
      })
    : applications;

  const STATUS_STEPS: ApplicationStatus[] = [
    'Pending Review',
    'Inspection Scheduled',
    'Soil/Water Sample Collected',
    'Restoration Action Plan Ready',
    'Restoration In-Progress',
    'Restored & Revived',
  ];

  const getStepIndex = (status: ApplicationStatus) => {
    return STATUS_STEPS.indexOf(status);
  };

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 bg-[#2D4F1E]/10 text-[#2D4F1E] rounded-full flex items-center justify-center mx-auto shadow-inner">
          <User className="w-10 h-10 text-[#C08261]" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-serif font-bold text-[#2D4F1E]">Landowner Portal Access</h2>
          <p className="text-sm text-[#2D4F1E]/80 max-w-md mx-auto">
            Please login with your registered name and phone number to track your land applications, view soil test reports, and download restoration certificates.
          </p>
        </div>
        <button
          onClick={onLoginClick}
          className="px-8 py-3.5 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#F4F1EA] font-bold rounded-2xl shadow-xl text-sm inline-flex items-center space-x-2"
        >
          <User className="w-4 h-4 text-[#D89F80]" />
          <span>Login / Register Phone</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 shadow-xl border border-[#C08261]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase text-[#C08261] tracking-wider">Landowner Dashboard</span>
            <span className="px-2.5 py-0.5 bg-[#EFECE6] text-[#2D4F1E] font-bold text-[10px] rounded-full uppercase border border-[#2D4F1E]/20">
              {currentUser.name || 'Landowner'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D4F1E]">
            My Land Restoration Applications ({userApps.length})
          </h1>
          <p className="text-xs text-[#2D4F1E]/70">
            Account Contact: <span className="font-bold text-[#2D4F1E]">{currentUser.phone || currentUser.email || 'Verified User'}</span>
          </p>
        </div>

        <button
          onClick={onRegisterNew}
          className="h-10 px-5 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#F4F1EA] font-bold rounded-2xl shadow-lg text-xs sm:text-sm inline-flex items-center justify-center space-x-2 shrink-0 active:scale-95 transition-transform"
        >
          <PlusCircle className="w-4 h-4 text-[#D89F80] shrink-0" />
          <span>+ Register Another Land</span>
        </button>
      </div>

      {/* 🔑 AFTER LOGIN: PASSWORD ALONE QUICK LOGIN CARD */}
      <div className="bg-[#FAF8F5] rounded-3xl p-5 sm:p-6 shadow-md border border-[#C08261]/25 flex flex-col md:flex-row md:items-center justify-between gap-5 animate-fadeIn">
        <div className="flex items-start space-x-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#2D4F1E]/10 flex items-center justify-center text-[#2D4F1E] shrink-0 mt-0.5">
            <KeyRound className="w-5 h-5 text-[#C08261]" />
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-[#2D4F1E]">Quick Login: <strong>Password Alone</strong></span>
              <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full border border-emerald-300 inline-flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                <span>Active & Ready</span>
              </span>
              {currentUser.authProvider === 'google' && (
                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full border border-blue-200">
                  Google Linked
                </span>
              )}
            </div>

            <p className="text-xs text-[#2D4F1E]/75 max-w-xl">
              Next time you visit Eden Sync, you can sign in simply by typing your <strong>Password Alone</strong> — no need to re-enter your full name or phone number.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1.5 text-xs">
              <span className="text-[#2D4F1E]/70 font-semibold">Your Quick Password:</span>
              <code className="font-mono bg-[#EFECE6] px-2.5 py-1 rounded-lg font-bold text-[#2D4F1E] border border-[#2D4F1E]/20 text-xs">
                {showQuickPass ? (currentUser.quickPassword || 'eden123') : '••••••••'}
              </code>
              <button
                type="button"
                onClick={() => setShowQuickPass(!showQuickPass)}
                className="text-[11px] text-[#C08261] font-bold hover:underline flex items-center space-x-1 cursor-pointer"
              >
                {showQuickPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showQuickPass ? 'Hide' : 'Reveal'}</span>
              </button>
            </div>

            {passwordSavedToast && (
              <p className="text-xs text-emerald-700 font-bold pt-1 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{passwordSavedToast}</span>
              </p>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2 shrink-0 md:justify-end">
          {isEditingPassword ? (
            <div className="flex items-center gap-1.5 bg-[#EFECE6] p-1.5 rounded-2xl border border-[#2D4F1E]/20">
              <input
                type="text"
                value={newPasswordInput}
                onChange={(e) => setNewPasswordInput(e.target.value)}
                placeholder="New password"
                className="w-32 px-2.5 py-1 text-xs font-mono font-bold bg-[#FAF8F5] border border-[#2D4F1E]/30 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C08261]"
              />
              <button
                type="button"
                onClick={() => {
                  if (newPasswordInput.trim().length >= 3) {
                    if (onUpdatePassword) onUpdatePassword(newPasswordInput.trim());
                    setIsEditingPassword(false);
                    setPasswordSavedToast('New password saved! Use it for Password-Alone login.');
                    setTimeout(() => setPasswordSavedToast(null), 3000);
                  }
                }}
                className="h-8 px-3.5 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#F4F1EA] text-xs font-bold rounded-xl shadow transition-all active:scale-95 cursor-pointer"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditingPassword(false)}
                className="h-8 px-2.5 text-xs font-bold text-[#2D4F1E]/70 hover:text-[#2D4F1E] transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                setNewPasswordInput(currentUser.quickPassword || 'eden123');
                setIsEditingPassword(true);
              }}
              className="h-9 px-3.5 bg-[#EFECE6] hover:bg-[#E2DDD5] text-[#2D4F1E] font-bold rounded-xl text-xs border border-[#2D4F1E]/20 transition-all active:scale-95 cursor-pointer"
            >
              Change Password
            </button>
          )}

          {onTriggerPasswordAloneLogin && (
            <button
              type="button"
              onClick={onTriggerPasswordAloneLogin}
              className="h-9 px-3.5 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#F4F1EA] font-bold rounded-xl text-xs shadow-md transition-all active:scale-95 flex items-center space-x-1.5 cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#D89F80]" />
              <span>Test Password Alone</span>
            </button>
          )}
        </div>
      </div>

      {userApps.length === 0 ? (
        <div className="bg-[#FAF8F5] rounded-3xl p-12 text-center border border-[#C08261]/20 shadow-md space-y-4">
          <Sprout className="w-12 h-12 text-[#2D4F1E] mx-auto" />
          <h3 className="text-xl font-serif font-bold text-[#2D4F1E]">No Land Applications Found for {currentUser.name}</h3>
          <p className="text-xs text-[#2D4F1E]/70 max-w-sm mx-auto">
            You haven't registered any land or water body yet. Register your farmland, pond, or barren soil to start restoration!
          </p>
          <button
            onClick={onRegisterNew}
            className="h-10 px-6 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#F4F1EA] font-bold text-xs rounded-xl shadow-md inline-flex items-center justify-center transition-all active:scale-95 cursor-pointer"
          >
            Start First Land Registration
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {userApps.map((app) => {
            const currentStepIdx = getStepIndex(app.status);

            return (
              <div
                key={app.id}
                className="bg-[#FAF8F5] rounded-3xl shadow-xl border border-[#C08261]/20 overflow-hidden space-y-6 p-6 sm:p-8"
              >
                
                {/* Top Info Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#2D4F1E]/10 pb-6 gap-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-bold bg-[#EFECE6] text-[#2D4F1E] px-2.5 py-0.5 rounded-md border border-[#2D4F1E]/20">
                        {app.id}
                      </span>
                      <span className="text-xs text-[#2D4F1E]/60">
                        Registered on {new Date(app.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h2 className="text-xl font-serif font-bold text-[#2D4F1E] mt-1">
                      {app.landType} ({app.landArea} {app.areaUnit})
                    </h2>
                    <p className="text-xs text-[#2D4F1E]/80 flex items-center space-x-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#C08261]" />
                      <span>{app.landAddress}</span>
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {app.soilDetection && (
                      <span className={`px-3 py-1.5 rounded-2xl font-bold text-xs shadow-sm flex items-center space-x-1.5 border ${
                        app.soilDetection.condition === 'dry'
                          ? 'bg-[#C08261] text-[#F4F1EA] border-[#A06445]'
                          : app.soilDetection.condition === 'clay'
                          ? 'bg-[#A85A32] text-[#F4F1EA] border-[#7D3E1E]'
                          : app.soilDetection.condition === 'heavy'
                          ? 'bg-[#3B6978] text-[#F4F1EA] border-[#20404C]'
                          : 'bg-[#2D4F1E] text-[#F4F1EA] border-[#1F3814]'
                      }`}>
                        <span>
                          {app.soilDetection.condition === 'dry' ? '🏜️' : app.soilDetection.condition === 'clay' ? '🧱' : app.soilDetection.condition === 'heavy' ? '🌊' : '🌱'}
                        </span>
                        <span>Soil: {app.soilDetection.condition.toUpperCase()}</span>
                      </span>
                    )}

                    <span className="px-4 py-2 bg-[#2D4F1E] text-[#D89F80] font-bold text-xs rounded-2xl shadow">
                      Status: {app.status}
                    </span>
                  </div>
                </div>

                {/* Status Stepper Timeline */}
                <div className="bg-[#EFECE6] p-6 rounded-2xl border border-[#2D4F1E]/10">
                  <p className="text-xs font-bold text-[#2D4F1E] uppercase mb-4">Real-Time Restoration Timeline</p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {STATUS_STEPS.map((statusStep, idx) => {
                      const isDone = idx <= currentStepIdx;
                      const isCurrent = idx === currentStepIdx;

                      return (
                        <div
                          key={statusStep}
                          className={`p-3 rounded-xl border text-center transition-all ${
                            isCurrent
                              ? 'bg-[#2D4F1E] text-[#F4F1EA] font-bold border-[#2D4F1E] shadow-md ring-2 ring-[#C08261]'
                              : isDone
                              ? 'bg-[#FAF8F5] text-[#2D4F1E] font-bold border-[#2D4F1E]/40'
                              : 'bg-[#FAF8F5]/60 text-[#2D4F1E]/40 border-[#2D4F1E]/10'
                          }`}
                        >
                          <div className="w-6 h-6 mx-auto mb-1.5 rounded-full flex items-center justify-center text-[10px] font-bold">
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-[#C08261]" />
                            ) : (
                              <Clock className="w-3.5 h-3.5" />
                            )}
                          </div>
                          <p className="text-[10px] leading-tight font-semibold">{statusStep}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Land & Owner Specifications */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Photo & Docs */}
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-[#2D4F1E] uppercase">Registered Site Photo</p>
                    <img
                      src={app.photoUrl}
                      alt="Registered Land"
                      className="w-full h-40 object-cover rounded-2xl shadow"
                    />
                    <div className="p-2.5 bg-[#EFECE6] rounded-xl border border-[#2D4F1E]/20 text-xs flex items-center justify-between">
                      <span className="font-bold text-[#2D4F1E] truncate">{app.registerCopyUrl}</span>
                      <span className="text-[10px] font-bold text-[#2D4F1E] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#2D4F1E]/20">Verified</span>
                    </div>
                  </div>

                  {/* Profile Specs */}
                  <div className="space-y-3 bg-[#EFECE6] p-4 rounded-2xl border border-[#2D4F1E]/10 text-xs">
                    <p className="font-bold text-[#2D4F1E] uppercase text-[11px] border-b border-[#2D4F1E]/20 pb-1">Application Specs</p>
                    <div className="space-y-1.5 text-[#2D4F1E]/80">
                      <p><span className="font-bold text-[#2D4F1E]">Applicant:</span> {app.applicantName}</p>
                      <p><span className="font-bold text-[#2D4F1E]">Farmer Status:</span> {app.isFarmer ? 'Active Farmer' : 'Non-Farmer'}</p>
                      <p><span className="font-bold text-[#2D4F1E]">Lease Option:</span> {app.willingToLease ? 'Willing to Lease' : 'Owner Managed'}</p>
                      <p><span className="font-bold text-[#2D4F1E]">Goal:</span> {app.restorationType}</p>
                      <p><span className="font-bold text-[#2D4F1E]">Soil Check:</span> {app.soilTestingRequested ? 'Requested' : 'Not Requested'}</p>
                      <p><span className="font-bold text-[#2D4F1E]">Water Check:</span> {app.waterTestingRequested ? 'Requested' : 'Not Requested'}</p>
                    </div>
                  </div>

                  {/* Expert Notes */}
                  <div className="space-y-3 bg-[#EFECE6] p-4 rounded-2xl border border-[#C08261]/30 text-xs">
                    <p className="font-bold text-[#2D4F1E] uppercase text-[11px] border-b border-[#2D4F1E]/20 pb-1 flex items-center space-x-1">
                      <ShieldCheck className="w-4 h-4 text-[#C08261]" />
                      <span>Inspector & Expert Notes</span>
                    </p>
                    <p className="text-[#2D4F1E]/90 font-medium leading-relaxed">
                      {app.adminNotes || 'Site inspection queued. An Eden Sync eco-chemist will visit within 3 business days.'}
                    </p>
                    <p className="text-[11px] text-[#C08261] font-bold pt-2">
                      Assigned Expert: <span className="text-[#2D4F1E]">{app.assignedExpert || 'Dr. Anita Roy'}</span>
                    </p>
                  </div>

                </div>

                {/* AI Ecological Diagnosis Report */}
                {app.aiAnalysis && (
                  <div className="bg-[#2D4F1E] text-[#F4F1EA] p-6 rounded-2xl space-y-3 border border-[#C08261]/30">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase text-[#D89F80] flex items-center space-x-1">
                        <Sparkles className="w-4 h-4 text-[#D4A359]" />
                        <span>AI Soil & Water Health Diagnosis</span>
                      </span>
                      <span className="text-xs font-bold px-3 py-1 bg-[#C08261] text-[#F4F1EA] rounded-full">
                        Eco Score: {app.aiAnalysis.ecoImpactScore}/100
                      </span>
                    </div>

                    <p className="text-xs text-[#F4F1EA]/90 font-medium">
                      {app.aiAnalysis.soilWaterHealthSummary}
                    </p>

                    <div className="pt-2">
                      <p className="text-xs font-bold text-[#D89F80] mb-1">Custom Action Plan:</p>
                      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-[#F4F1EA]/80">
                        {app.aiAnalysis.recommendedSteps.map((step, i) => (
                          <li key={i} className="bg-[#1F3814] p-2 rounded-lg border border-[#C08261]/30">
                            • {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* AI Soil Photo Detection & Classification Details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setExpandedSoilDetectorId(expandedSoilDetectorId === app.id ? null : app.id)}
                      className="text-xs font-bold text-[#2D4F1E] hover:text-[#1F3814] flex items-center space-x-2 bg-[#EFECE6] hover:bg-[#E2DDD5] px-4 py-2 rounded-xl border border-[#2D4F1E]/20 transition-all active:scale-95 cursor-pointer shadow-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#C08261]" />
                      <span>
                        {expandedSoilDetectorId === app.id ? 'Hide Soil Photo Diagnostics' : 'Open Soil Photo AI Classification (Dry / Clay / Healthy / Heavy)'}
                      </span>
                      {expandedSoilDetectorId === app.id ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {app.soilDetection && (
                      <span className="text-xs text-[#2D4F1E]/70 font-semibold hidden sm:inline">
                        Type: <span className="text-[#2D4F1E] font-bold">{app.soilDetection.soilType}</span> ({app.soilDetection.confidenceScore}% match)
                      </span>
                    )}
                  </div>

                  {expandedSoilDetectorId === app.id && (
                    <div className="pt-2">
                      <SoilPhotoDetector
                        initialPhotoUrl={app.photoUrl}
                        initialDetection={app.soilDetection}
                        landType={app.landType}
                        location={app.landAddress}
                        title={`Soil Analysis for Survey ID: ${app.id}`}
                        subtitle={`Classified condition: ${app.soilDetection?.conditionLabel || 'Soil Sample'} with moisture & texture profile`}
                        showUploadSection={true}
                        onDetectionChange={(newDetection) => {
                          app.soilDetection = newDetection;
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Official Documentation: Bill & Report Export with Database Sync */}
                <div className="bg-[#FAF8F5] p-5 rounded-2xl border-2 border-[#C08261]/40 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2D4F1E]/10 pb-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#C08261] flex items-center space-x-1.5">
                          <Receipt className="w-4 h-4" />
                          <span>Official Documentation & Certification</span>
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300">
                          Central DB Synced
                        </span>
                      </div>
                      <p className="text-xs text-[#2D4F1E]/80 mt-0.5">
                        Download certified PDF copies for your records. Exported files are automatically archived in the system database for administrator audit and DBT subsidy validation.
                      </p>
                    </div>

                    {exportedRecords[app.id]?.at && (
                      <span className="text-[11px] text-[#2D4F1E]/70 bg-[#EFECE6] px-2.5 py-1 rounded-lg border border-[#2D4F1E]/10 shrink-0">
                        Exported at {exportedRecords[app.id]?.at}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Bill Export Card */}
                    <div className="bg-[#EFECE6] p-4 rounded-xl border border-[#2D4F1E]/15 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-[#2D4F1E] flex items-center space-x-1.5">
                            <Receipt className="w-3.5 h-3.5 text-[#C08261]" />
                            <span>Restoration Tax Invoice & Subsidy Bill</span>
                          </span>
                          <span className="text-[10px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-300">
                            60% Govt Subsidy
                          </span>
                        </div>
                        <p className="text-[11px] text-[#2D4F1E]/70 mt-1">
                          Includes itemized laboratory testing rates, soil amendments, GST, and direct beneficiary transfer (DBT) deductions.
                        </p>
                      </div>

                      <div className="flex items-center space-x-2 pt-1">
                        <button
                          onClick={() => handleExportBill(app)}
                          disabled={exportingKey === `${app.id}-bill`}
                          className="flex-1 h-9 px-3 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#F4F1EA] rounded-xl text-xs font-bold inline-flex items-center justify-center space-x-1.5 shadow active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                        >
                          <Download className="w-3.5 h-3.5 text-[#D4A359]" />
                          <span>{exportingKey === `${app.id}-bill` ? 'Generating Bill...' : 'Export Bill (PDF)'}</span>
                        </button>
                        <button
                          onClick={() => setPreviewBillApp(app)}
                          className="h-9 px-3 bg-white hover:bg-gray-50 text-[#2D4F1E] rounded-xl text-xs font-semibold border border-[#2D4F1E]/20 inline-flex items-center space-x-1 transition-all cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#C08261]" />
                          <span>Preview</span>
                        </button>
                      </div>
                    </div>

                    {/* Report Export Card */}
                    <div className="bg-[#EFECE6] p-4 rounded-xl border border-[#2D4F1E]/15 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-[#2D4F1E] flex items-center space-x-1.5">
                            <FileText className="w-3.5 h-3.5 text-[#2D4F1E]" />
                            <span>Comprehensive Ecological & Soil Report</span>
                          </span>
                          <span className="text-[10px] font-bold text-[#2D4F1E] bg-white px-2 py-0.5 rounded border border-[#2D4F1E]/20">
                            Certified Lab Diagnostic
                          </span>
                        </div>
                        <p className="text-[11px] text-[#2D4F1E]/70 mt-1">
                          Official soil physical & chemical baseline, moisture levels, microbial quotient, and 12-week restoration action roadmap.
                        </p>
                      </div>

                      <div className="flex items-center space-x-2 pt-1">
                        <button
                          onClick={() => handleExportReport(app)}
                          disabled={exportingKey === `${app.id}-report`}
                          className="flex-1 h-9 px-3 bg-[#C08261] hover:bg-[#A86E4F] text-[#F4F1EA] rounded-xl text-xs font-bold inline-flex items-center justify-center space-x-1.5 shadow active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>{exportingKey === `${app.id}-report` ? 'Generating Report...' : 'Export Report (PDF)'}</span>
                        </button>
                        <button
                          onClick={() => setPreviewReportApp(app)}
                          className="h-9 px-3 bg-white hover:bg-gray-50 text-[#2D4F1E] rounded-xl text-xs font-semibold border border-[#2D4F1E]/20 inline-flex items-center space-x-1 transition-all cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#2D4F1E]" />
                          <span>Preview</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Bill Preview Modal */}
      {previewBillApp && (() => {
        const b = calculateBillDetails(previewBillApp);
        return (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#FAF8F5] rounded-3xl max-w-xl w-full p-6 space-y-5 shadow-2xl border border-[#2D4F1E]/20 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-[#2D4F1E]/10 pb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#2D4F1E] text-[#F4F1EA] rounded-xl flex items-center justify-center">
                    <Receipt className="w-4 h-4 text-[#D4A359]" />
                  </div>
                  <div>
                    <h3 className="text-base font-serif font-bold text-[#2D4F1E]">
                      Official Invoice & Subsidy Statement
                    </h3>
                    <p className="text-xs text-[#2D4F1E]/60">
                      Invoice #{b.invoiceNumber} • App: {previewBillApp.id}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setPreviewBillApp(null)}
                  className="w-8 h-8 rounded-full bg-[#EFECE6] hover:bg-[#E2DDD5] text-[#2D4F1E] flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-[#EFECE6] p-4 rounded-2xl border border-[#2D4F1E]/10 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="font-semibold text-[#2D4F1E]">Landowner:</span>
                  <span className="font-bold text-[#2D4F1E]">{previewBillApp.applicantName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-[#2D4F1E]">Land Parcel:</span>
                  <span className="text-[#2D4F1E]">{previewBillApp.landArea} {previewBillApp.areaUnit} ({previewBillApp.landType})</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-[#2D4F1E]">Survey Location:</span>
                  <span className="text-[#2D4F1E]">{previewBillApp.landAddress}</span>
                </div>
              </div>

              {/* Itemized Table */}
              <div className="bg-white rounded-xl border border-[#2D4F1E]/10 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#EFECE6] text-[#2D4F1E] font-bold">
                    <tr>
                      <th className="p-2.5">Description</th>
                      <th className="p-2.5 text-right">Rate</th>
                      <th className="p-2.5 text-right">Qty</th>
                      <th className="p-2.5 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2D4F1E]/10">
                    {b.lineItems.map(item => (
                      <tr key={item.id}>
                        <td className="p-2.5 text-[#2D4F1E]">{item.description}</td>
                        <td className="p-2.5 text-right text-[#2D4F1E]/70">₹{item.rateINR}</td>
                        <td className="p-2.5 text-right text-[#2D4F1E]/70">{item.qty}</td>
                        <td className="p-2.5 text-right font-semibold text-[#2D4F1E]">₹{item.totalINR}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total Calculation */}
              <div className="bg-[#EFECE6] p-4 rounded-2xl border border-[#2D4F1E]/10 space-y-1.5 text-xs text-[#2D4F1E]">
                <div className="flex justify-between">
                  <span>Gross Services Subtotal:</span>
                  <span className="font-semibold">₹{b.subtotalINR.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>PM Krishi / State Subsidy Rebate (60%):</span>
                  <span>-₹{b.subsidyDiscountINR.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Concessional GST (5%):</span>
                  <span>₹{b.taxGSTINR.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#2D4F1E]/20 text-sm font-bold text-[#2D4F1E]">
                  <span>Net Payable by Landowner:</span>
                  <span className="text-base text-[#2D4F1E]">₹{b.netPayableINR.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-[#2D4F1E]/60 flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Audit copy auto-synced with central database</span>
                </span>
                <button
                  onClick={async () => {
                    await handleExportBill(previewBillApp);
                    setPreviewBillApp(null);
                  }}
                  className="h-10 px-5 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#F4F1EA] rounded-xl text-xs font-bold inline-flex items-center space-x-1.5 shadow active:scale-95 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#D4A359]" />
                  <span>Download Bill PDF</span>
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Report Preview Modal */}
      {previewReportApp && (() => {
        const r = extractReportDetails(previewReportApp);
        return (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#FAF8F5] rounded-3xl max-w-xl w-full p-6 space-y-5 shadow-2xl border border-[#2D4F1E]/20 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-[#2D4F1E]/10 pb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#2D4F1E] text-[#F4F1EA] rounded-xl flex items-center justify-center">
                    <FileText className="w-4 h-4 text-[#D4A359]" />
                  </div>
                  <div>
                    <h3 className="text-base font-serif font-bold text-[#2D4F1E]">
                      Certified Ecological & Soil Report
                    </h3>
                    <p className="text-xs text-[#2D4F1E]/60">
                      Report #{r.reportNumber || r.reportId} • Lead: {r.assignedExpert}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setPreviewReportApp(null)}
                  className="w-8 h-8 rounded-full bg-[#EFECE6] hover:bg-[#E2DDD5] text-[#2D4F1E] flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Baseline Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-[#EFECE6] p-3 rounded-xl border border-[#2D4F1E]/10">
                  <p className="text-[10px] uppercase font-bold text-[#2D4F1E]/60">Eco Score</p>
                  <p className="text-lg font-bold text-[#2D4F1E]">{r.ecoScore}/100</p>
                </div>
                <div className="bg-[#EFECE6] p-3 rounded-xl border border-[#2D4F1E]/10">
                  <p className="text-[10px] uppercase font-bold text-[#2D4F1E]/60">Soil Class</p>
                  <p className="text-sm font-bold text-[#2D4F1E] truncate">{r.soilCondition}</p>
                </div>
                <div className="bg-[#EFECE6] p-3 rounded-xl border border-[#2D4F1E]/10">
                  <p className="text-[10px] uppercase font-bold text-[#2D4F1E]/60">Moisture</p>
                  <p className="text-lg font-bold text-[#2D4F1E]">{r.moisturePercentage}%</p>
                </div>
              </div>

              <div className="bg-[#EFECE6] p-4 rounded-2xl border border-[#2D4F1E]/10 space-y-1.5 text-xs text-[#2D4F1E]">
                <p><span className="font-bold">Soil & Water Diagnostic:</span> {r.summary || r.restorationType}</p>
                <p className="pt-1"><span className="font-bold">Aquifer & Subsurface Hydrology:</span> {r.waterAnalysis}</p>
                <p><span className="font-bold">Soil pH Range:</span> {r.phEstimate} • <span className="font-bold">Organic Carbon:</span> {r.organicMatterEstimate}</p>
              </div>

              {/* Recommended Steps */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-[#2D4F1E] uppercase">12-Week Action Protocol:</p>
                <ul className="space-y-1.5 text-xs text-[#2D4F1E]">
                  {r.recommendedSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start space-x-2 bg-white p-2.5 rounded-xl border border-[#2D4F1E]/10">
                      <span className="w-5 h-5 rounded-full bg-[#2D4F1E] text-[#F4F1EA] text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-[#2D4F1E]/60 flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Report stored in central db for admin review</span>
                </span>
                <button
                  onClick={async () => {
                    await handleExportReport(previewReportApp);
                    setPreviewReportApp(null);
                  }}
                  className="h-10 px-5 bg-[#C08261] hover:bg-[#A86E4F] text-[#F4F1EA] rounded-xl text-xs font-bold inline-flex items-center space-x-1.5 shadow active:scale-95 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Report PDF</span>
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Global Toast Notification */}
      {exportToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2D4F1E] text-[#F4F1EA] px-5 py-3 rounded-2xl shadow-2xl border border-[#C08261] text-xs font-bold animate-bounce flex items-center space-x-2">
          <Check className="w-4 h-4 text-[#D4A359]" />
          <span>{exportToast}</span>
        </div>
      )}

    </div>
  );
};
