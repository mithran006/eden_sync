import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Receipt, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Search, 
  Filter, 
  Download, 
  Trash2, 
  Eye, 
  ShieldCheck, 
  RefreshCw, 
  FileSpreadsheet, 
  X, 
  MapPin, 
  Check, 
  Building2, 
  Landmark, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { ExportedDocument, LandApplication } from '../types';
import { exportBillPdf, exportReportPdf } from '../utils/documentExportPdf';

interface AdminDocumentAuditProps {
  applications: LandApplication[];
}

export const AdminDocumentAudit: React.FC<AdminDocumentAuditProps> = ({ applications }) => {
  const [documents, setDocuments] = useState<ExportedDocument[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  
  // Inspection & Verification Modal State
  const [inspectingDoc, setInspectingDoc] = useState<ExportedDocument | null>(null);
  const [adminStatusInput, setAdminStatusInput] = useState<'Pending Admin Check' | 'Verified & Approved' | 'Flagged for Review'>('Verified & Approved');
  const [adminNotesInput, setAdminNotesInput] = useState<string>('');
  const [isSavingAudit, setIsSavingAudit] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const fetchDocuments = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/exported-documents');
      if (res.ok) {
        const data = await res.json();
        setDocuments(data);
      }
    } catch (err) {
      console.error('Error fetching exported documents:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const filteredDocs = documents.filter((doc) => {
    const matchesType = typeFilter === 'All' || doc.documentType === typeFilter;
    const matchesStatus = statusFilter === 'All' || doc.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || (
      doc.id.toLowerCase().includes(q) ||
      doc.title.toLowerCase().includes(q) ||
      doc.applicantName.toLowerCase().includes(q) ||
      doc.applicantPhone.toLowerCase().includes(q) ||
      doc.applicationId.toLowerCase().includes(q) ||
      doc.landAddress.toLowerCase().includes(q)
    );
    return matchesType && matchesStatus && matchesSearch;
  });

  const handleOpenInspect = (doc: ExportedDocument) => {
    setInspectingDoc(doc);
    setAdminStatusInput(doc.status);
    setAdminNotesInput(doc.adminNotes || '');
  };

  const handleSaveVerification = async () => {
    if (!inspectingDoc) return;
    setIsSavingAudit(true);
    try {
      const res = await fetch(`/api/exported-documents/${inspectingDoc.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: adminStatusInput,
          adminNotes: adminNotesInput,
          verifiedBy: 'Central Admin Auditor',
          verifiedAt: new Date().toISOString(),
        }),
      });
      if (res.ok) {
        const updated = await res.json();
        setDocuments(prev => prev.map(d => d.id === updated.id ? updated : d));
        setInspectingDoc(null);
        triggerToast(`Document #${updated.id} verified as ${adminStatusInput}`);
      } else {
        triggerToast('Failed to update document audit status');
      }
    } catch (err) {
      console.error('Error saving verification:', err);
      triggerToast('Network error while updating audit log');
    } finally {
      setIsSavingAudit(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(`Permanently remove document record #${id} from the database?`)) return;
    try {
      const res = await fetch(`/api/exported-documents/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setDocuments(prev => prev.filter(d => d.id !== id));
        triggerToast(`Document #${id} removed from database`);
      }
    } catch (err) {
      console.error('Error deleting document:', err);
    }
  };

  const handleDownloadPdf = async (doc: ExportedDocument) => {
    // Find matching application or synthesize one
    let targetApp = applications.find(a => a.id === doc.applicationId);
    if (!targetApp) {
      targetApp = {
        id: doc.applicationId,
        applicantName: doc.applicantName,
        phone: doc.applicantPhone,
        applicantAddress: 'Verified Address',
        landAddress: doc.landAddress,
        landArea: doc.landArea,
        areaUnit: doc.areaUnit,
        landType: 'Farmland & Agro-forestry',
        isFarmer: true,
        willingToLease: false,
        restorationType: 'Agro-Ecological Restoration',
        soilTestingRequested: true,
        waterTestingRequested: true,
        photoUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
        registerCopyUrl: 'Title_Deed_Certified.pdf',
        status: 'Restoration In-Progress',
        createdAt: doc.createdAt,
      };
    }

    if (doc.documentType === 'Bill') {
      await exportBillPdf(targetApp, 'Admin Auditor (Verification Download)');
      triggerToast(`Official Bill #${doc.id} downloaded for audit`);
    } else {
      await exportReportPdf(targetApp, 'Admin Auditor (Verification Download)');
      triggerToast(`Official Report #${doc.id} downloaded for audit`);
    }
  };

  const handleExportCsv = () => {
    if (documents.length === 0) {
      triggerToast('No documents to export');
      return;
    }
    const headers = ['Document ID', 'Type', 'Application ID', 'Applicant', 'Phone', 'Location', 'Status', 'Created At', 'Admin Notes'];
    const rows = documents.map(d => [
      `"${d.id}"`,
      `"${d.documentType}"`,
      `"${d.applicationId}"`,
      `"${d.applicantName}"`,
      `"${d.applicantPhone}"`,
      `"${d.landAddress.replace(/"/g, '""')}"`,
      `"${d.status}"`,
      `"${new Date(d.createdAt).toLocaleString('en-IN')}"`,
      `"${(d.adminNotes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `EdenSync_Document_Audit_Register_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Document audit register exported as CSV');
  };

  // KPIs
  const totalDocs = documents.length;
  const verifiedCount = documents.filter(d => d.status === 'Verified & Approved').length;
  const pendingCount = documents.filter(d => d.status === 'Pending Admin Check').length;
  const totalBilledINR = documents
    .filter(d => d.documentType === 'Bill' && d.billDetails)
    .reduce((acc, d) => acc + (d.billDetails?.netPayableINR || 0), 0);
  const totalSubsidyINR = documents
    .filter(d => d.documentType === 'Bill' && d.billDetails)
    .reduce((acc, d) => acc + (d.billDetails?.subsidyDiscountINR || 0), 0);

  return (
    <div className="space-y-6">
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2D4F1E] text-[#F4F1EA] px-5 py-3 rounded-2xl shadow-2xl border border-[#C08261] text-xs font-bold animate-bounce flex items-center space-x-2">
          <Check className="w-4 h-4 text-[#D4A359]" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#2D4F1E]/20 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-[#2D4F1E]/70 text-xs font-bold uppercase">
            <span>Audit Registry</span>
            <FileText className="w-4 h-4 text-[#2D4F1E]" />
          </div>
          <p className="text-2xl font-serif font-bold text-[#2D4F1E]">{totalDocs}</p>
          <p className="text-[11px] text-[#2D4F1E]/60">Total user-exported PDFs in DB</p>
        </div>

        <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#2D4F1E]/20 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-[#2D4F1E]/70 text-xs font-bold uppercase">
            <span>Verified & Approved</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-serif font-bold text-emerald-800">{verifiedCount}</p>
          <p className="text-[11px] text-[#2D4F1E]/60">Authenticated by Agro-Audit</p>
        </div>

        <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#2D4F1E]/20 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-[#2D4F1E]/70 text-xs font-bold uppercase">
            <span>Pending Check</span>
            <Clock className="w-4 h-4 text-[#C08261]" />
          </div>
          <p className="text-2xl font-serif font-bold text-[#C08261]">{pendingCount}</p>
          <p className="text-[11px] text-[#2D4F1E]/60">Awaiting admin review</p>
        </div>

        <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#2D4F1E]/20 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-[#2D4F1E]/70 text-xs font-bold uppercase">
            <span>Govt Subsidy Disbursed</span>
            <Landmark className="w-4 h-4 text-[#2D4F1E]" />
          </div>
          <p className="text-2xl font-serif font-bold text-[#2D4F1E]">₹{totalSubsidyINR.toLocaleString('en-IN')}</p>
          <p className="text-[11px] text-[#2D4F1E]/60">Net User DBT: ₹{totalBilledINR.toLocaleString('en-IN')}</p>
        </div>
      </div>

      {/* Control Bar: Search, Filters & Export */}
      <div className="bg-[#FAF8F5] p-4 sm:p-5 rounded-2xl border border-[#2D4F1E]/20 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2D4F1E]/50" />
          <input
            type="text"
            placeholder="Search by Landowner, Phone, Doc #BILL / #RPT, or Location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs text-[#2D4F1E] placeholder-[#2D4F1E]/50 focus:outline-none focus:ring-2 focus:ring-[#2D4F1E]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center space-x-1.5 bg-[#EFECE6] px-3 py-1.5 rounded-xl border border-[#2D4F1E]/20 text-xs text-[#2D4F1E]">
            <Filter className="w-3.5 h-3.5 text-[#C08261]" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-transparent font-bold text-xs focus:outline-none cursor-pointer"
            >
              <option value="All">All Types</option>
              <option value="Bill">Bills / Invoices</option>
              <option value="Report">Restoration Reports</option>
            </select>
          </div>

          <div className="flex items-center space-x-1.5 bg-[#EFECE6] px-3 py-1.5 rounded-xl border border-[#2D4F1E]/20 text-xs text-[#2D4F1E]">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent font-bold text-xs focus:outline-none cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Pending Admin Check">Pending Admin Check</option>
              <option value="Verified & Approved">Verified & Approved</option>
              <option value="Flagged for Review">Flagged for Review</option>
            </select>
          </div>

          <button
            onClick={fetchDocuments}
            title="Refresh database records"
            className="p-2 bg-[#EFECE6] hover:bg-[#E2DDD5] text-[#2D4F1E] rounded-xl border border-[#2D4F1E]/20 transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleExportCsv}
            className="h-8 px-3.5 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#F4F1EA] text-xs font-bold rounded-xl shadow transition-all active:scale-95 flex items-center space-x-1.5 cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#D4A359]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-[#FAF8F5] rounded-2xl shadow-xl border border-[#C08261]/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#2D4F1E]">
            <thead className="bg-[#EFECE6] text-[#2D4F1E] uppercase font-bold tracking-wider border-b border-[#2D4F1E]/20">
              <tr>
                <th className="p-4">Document ID & Date</th>
                <th className="p-4">Document Type</th>
                <th className="p-4">Landowner & Phone</th>
                <th className="p-4">Key Assessment / Amount</th>
                <th className="p-4">Admin Audit Status</th>
                <th className="p-4 text-center">Audit Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2D4F1E]/10">
              {filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-[#2D4F1E]/60">
                    <FileText className="w-10 h-10 mx-auto text-[#C08261] mb-2 opacity-50" />
                    <p className="font-bold text-sm">No exported documents found</p>
                    <p className="text-xs text-[#2D4F1E]/60 mt-1">
                      When users export Bills or Reports in the Landowner Portal, their PDF records will be permanently archived here for administrative check.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc) => {
                  const isBill = doc.documentType === 'Bill';
                  return (
                    <tr key={doc.id} className="hover:bg-[#EFECE6]/50 transition-colors">
                      <td className="p-4 font-mono font-bold text-[#2D4F1E]">
                        <span className="bg-[#EFECE6] text-[#2D4F1E] px-2.5 py-1 rounded-md border border-[#2D4F1E]/20">
                          {doc.id}
                        </span>
                        <p className="text-[10px] text-[#2D4F1E]/60 mt-1 font-sans">
                          {new Date(doc.createdAt).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                        <p className="text-[10px] text-[#2D4F1E]/50 font-sans">
                          App: {doc.applicationId}
                        </p>
                      </td>

                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-md font-bold text-[11px] inline-flex items-center space-x-1.5 ${
                          isBill 
                            ? 'bg-[#C08261]/15 text-[#8E4B28] border border-[#C08261]/30' 
                            : 'bg-[#2D4F1E]/15 text-[#2D4F1E] border border-[#2D4F1E]/30'
                        }`}>
                          {isBill ? <Receipt className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
                          <span>{isBill ? 'Restoration Bill / Invoice' : 'Comprehensive Report'}</span>
                        </span>
                      </td>

                      <td className="p-4">
                        <p className="font-bold text-[#2D4F1E]">{doc.applicantName}</p>
                        <p className="text-[11px] text-[#2D4F1E]/70">{doc.applicantPhone || 'Verified Landowner'}</p>
                        <p className="text-[10px] text-[#2D4F1E]/60 truncate max-w-xs">{doc.landAddress}</p>
                      </td>

                      <td className="p-4">
                        {isBill && doc.billDetails ? (
                          <div>
                            <p className="font-bold text-[#2D4F1E] text-xs">
                              Net: ₹{doc.billDetails.netPayableINR.toLocaleString('en-IN')}
                            </p>
                            <p className="text-[10px] text-emerald-700 font-semibold">
                              Subsidy: -₹{doc.billDetails.subsidyDiscountINR.toLocaleString('en-IN')} (60%)
                            </p>
                            <p className="text-[10px] text-[#2D4F1E]/60">
                              {doc.billDetails.paymentStatus}
                            </p>
                          </div>
                        ) : doc.reportDetails ? (
                          <div>
                            <p className="font-bold text-[#2D4F1E] text-xs">
                              Eco Score: {doc.reportDetails.ecoScore}/100
                            </p>
                            <p className="text-[10px] text-[#2D4F1E]/80">
                              Soil: {doc.reportDetails.soilCondition}
                            </p>
                            <p className="text-[10px] text-[#2D4F1E]/60">
                              Moisture: {doc.reportDetails.moisturePercentage}% • {doc.reportDetails.phEstimate}
                            </p>
                          </div>
                        ) : (
                          <span className="text-[11px] text-[#2D4F1E]/60">{doc.title}</span>
                        )}
                      </td>

                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] uppercase border inline-flex items-center space-x-1 ${
                          doc.status === 'Verified & Approved'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : doc.status === 'Flagged for Review'
                            ? 'bg-red-100 text-red-800 border-red-300'
                            : 'bg-amber-100 text-amber-800 border-amber-300'
                        }`}>
                          {doc.status === 'Verified & Approved' ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : doc.status === 'Flagged for Review' ? (
                            <AlertTriangle className="w-3 h-3" />
                          ) : (
                            <Clock className="w-3 h-3" />
                          )}
                          <span>{doc.status}</span>
                        </span>
                        {doc.verifiedBy && (
                          <p className="text-[9px] text-[#2D4F1E]/60 mt-1">
                            By {doc.verifiedBy} on {new Date(doc.verifiedAt || '').toLocaleDateString()}
                          </p>
                        )}
                      </td>

                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center space-x-1.5">
                          <button
                            onClick={() => handleOpenInspect(doc)}
                            title="Inspect Details & Sign Off"
                            className="h-8 px-2.5 bg-[#EFECE6] hover:bg-[#2D4F1E] hover:text-[#F4F1EA] text-[#2D4F1E] rounded-xl transition-all font-bold text-xs inline-flex items-center space-x-1 active:scale-95 cursor-pointer shadow-sm"
                          >
                            <ShieldCheck className="w-3.5 h-3.5 text-[#C08261]" />
                            <span>Audit</span>
                          </button>

                          <button
                            onClick={() => handleDownloadPdf(doc)}
                            title="Download PDF Copy for Verification"
                            className="h-8 w-8 bg-[#EFECE6] hover:bg-[#C08261] hover:text-[#F4F1EA] text-[#2D4F1E] rounded-xl transition-all inline-flex items-center justify-center active:scale-95 cursor-pointer shadow-sm"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDelete(doc.id)}
                            title="Delete from Database"
                            className="h-8 w-8 bg-[#EFECE6] hover:bg-red-700 hover:text-white text-red-700 rounded-xl transition-all inline-flex items-center justify-center active:scale-95 cursor-pointer shadow-sm"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Inspection & Verification Modal */}
      {inspectingDoc && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl border border-[#2D4F1E]/20 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-[#2D4F1E]/10 pb-4">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 bg-[#2D4F1E] text-[#F4F1EA] rounded-xl flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-[#D4A359]" />
                </div>
                <div>
                  <h3 className="text-base font-serif font-bold text-[#2D4F1E]">
                    Document Audit & Integrity Verification
                  </h3>
                  <p className="text-xs text-[#2D4F1E]/60">
                    {inspectingDoc.documentType} #{inspectingDoc.id} • Registered to {inspectingDoc.applicantName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setInspectingDoc(null)}
                className="w-8 h-8 rounded-full bg-[#EFECE6] hover:bg-[#E2DDD5] text-[#2D4F1E] flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Document Specific Content Preview */}
            {inspectingDoc.documentType === 'Bill' && inspectingDoc.billDetails ? (
              <div className="space-y-4">
                <div className="bg-[#EFECE6] p-4 rounded-2xl border border-[#2D4F1E]/10 space-y-2 text-xs">
                  <p className="font-bold text-[#2D4F1E] uppercase text-[11px]">Invoice Financial Summary</p>
                  <div className="grid grid-cols-2 gap-2 text-[#2D4F1E]">
                    <p><span className="font-semibold">Gross Subtotal:</span> ₹{inspectingDoc.billDetails.subtotalINR.toLocaleString('en-IN')}</p>
                    <p className="text-emerald-700 font-bold"><span className="text-[#2D4F1E] font-normal">Govt Subsidy (60%):</span> -₹{inspectingDoc.billDetails.subsidyDiscountINR.toLocaleString('en-IN')}</p>
                    <p><span className="font-semibold">GST (5% Concessional):</span> ₹{inspectingDoc.billDetails.taxGSTINR.toLocaleString('en-IN')}</p>
                    <p className="font-bold text-sm"><span className="font-normal text-xs">Net Payable:</span> ₹{inspectingDoc.billDetails.netPayableINR.toLocaleString('en-IN')}</p>
                    <p><span className="font-semibold">Payment Mode:</span> {inspectingDoc.billDetails.paymentMethod}</p>
                    <p><span className="font-semibold">Ref:</span> {inspectingDoc.billDetails.transactionRef}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold text-[#2D4F1E] uppercase">Itemized Service Line Items:</p>
                  <div className="bg-white rounded-xl border border-[#2D4F1E]/10 overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#EFECE6] text-[#2D4F1E] font-bold">
                        <tr>
                          <th className="p-2.5">Item Description</th>
                          <th className="p-2.5 text-right">Rate</th>
                          <th className="p-2.5 text-right">Qty</th>
                          <th className="p-2.5 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#2D4F1E]/10">
                        {inspectingDoc.billDetails.lineItems.map(item => (
                          <tr key={item.id}>
                            <td className="p-2.5 text-[#2D4F1E] font-medium">{item.description}</td>
                            <td className="p-2.5 text-right text-[#2D4F1E]/70">₹{item.rateINR}</td>
                            <td className="p-2.5 text-right text-[#2D4F1E]/70">{item.qty}</td>
                            <td className="p-2.5 text-right font-bold text-[#2D4F1E]">₹{item.totalINR}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : inspectingDoc.reportDetails ? (
              <div className="space-y-4">
                <div className="bg-[#EFECE6] p-4 rounded-2xl border border-[#2D4F1E]/10 space-y-2 text-xs">
                  <p className="font-bold text-[#2D4F1E] uppercase text-[11px]">Ecological Diagnostic Baseline</p>
                  <div className="grid grid-cols-2 gap-2 text-[#2D4F1E]">
                    <p><span className="font-semibold">Soil Condition:</span> {inspectingDoc.reportDetails.soilCondition}</p>
                    <p><span className="font-semibold">Eco-Score:</span> {inspectingDoc.reportDetails.ecoScore}/100</p>
                    <p><span className="font-semibold">Moisture %:</span> {inspectingDoc.reportDetails.moisturePercentage}%</p>
                    <p><span className="font-semibold">pH Range:</span> {inspectingDoc.reportDetails.phEstimate}</p>
                    <p><span className="font-semibold">Organic Carbon:</span> {inspectingDoc.reportDetails.organicMatterEstimate}</p>
                    <p><span className="font-semibold">Lead Expert:</span> {inspectingDoc.reportDetails.assignedExpert}</p>
                  </div>
                  <p className="text-[11px] text-[#2D4F1E]/70 pt-1 border-t border-[#2D4F1E]/10">
                    <span className="font-semibold">Aquifer Status:</span> {inspectingDoc.reportDetails.waterAnalysis}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold text-[#2D4F1E] uppercase">Prescribed Protocol Steps:</p>
                  <ul className="space-y-1.5 text-xs text-[#2D4F1E]">
                    {inspectingDoc.reportDetails.recommendedSteps.map((step, i) => (
                      <li key={i} className="flex items-start space-x-2 bg-white p-2 rounded-lg border border-[#2D4F1E]/10">
                        <span className="w-4 h-4 rounded-full bg-[#2D4F1E] text-[#F4F1EA] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}

            {/* Admin Audit & Sign-off Form */}
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border-2 border-[#C08261]/40 space-y-3">
              <p className="text-xs font-bold text-[#2D4F1E] uppercase flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C08261]" />
                <span>Administrator Verification & Sign-Off</span>
              </p>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#2D4F1E]">Audit Status Decision:</label>
                <select
                  value={adminStatusInput}
                  onChange={(e) => setAdminStatusInput(e.target.value as any)}
                  className="w-full p-2 bg-white border border-[#2D4F1E]/20 rounded-xl text-xs font-bold text-[#2D4F1E] focus:outline-none focus:ring-2 focus:ring-[#2D4F1E]"
                >
                  <option value="Verified & Approved">Verified & Approved (All Metrics Validated)</option>
                  <option value="Pending Admin Check">Pending Admin Check (Queued for Lab Cross-Check)</option>
                  <option value="Flagged for Review">Flagged for Review (Discrepancy in Coordinates or Lab)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#2D4F1E]">Admin Auditor Notes / Stamp:</label>
                <textarea
                  rows={2}
                  value={adminNotesInput}
                  onChange={(e) => setAdminNotesInput(e.target.value)}
                  placeholder="Enter audit remarks, lab voucher numbers, or verification endorsement..."
                  className="w-full p-2.5 bg-white border border-[#2D4F1E]/20 rounded-xl text-xs text-[#2D4F1E] placeholder-[#2D4F1E]/50 focus:outline-none focus:ring-2 focus:ring-[#2D4F1E]"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => handleDownloadPdf(inspectingDoc)}
                className="h-10 px-4 bg-[#EFECE6] hover:bg-[#E2DDD5] text-[#2D4F1E] rounded-xl text-xs font-bold inline-flex items-center space-x-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Re-Download PDF</span>
              </button>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setInspectingDoc(null)}
                  className="h-10 px-4 bg-transparent hover:bg-gray-100 text-[#2D4F1E] rounded-xl text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveVerification}
                  disabled={isSavingAudit}
                  className="h-10 px-5 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#F4F1EA] rounded-xl text-xs font-bold inline-flex items-center space-x-1.5 shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  <Check className="w-4 h-4 text-[#D4A359]" />
                  <span>{isSavingAudit ? 'Saving Audit...' : 'Save & Sign Off'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
