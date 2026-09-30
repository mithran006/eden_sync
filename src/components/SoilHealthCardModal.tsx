import React, { useState } from 'react';
import { 
  FileDown, 
  Share2, 
  X, 
  Sparkles, 
  Sprout, 
  CheckCircle2, 
  Layers, 
  Droplets, 
  Activity, 
  ShieldCheck, 
  Download, 
  Printer,
  Copy,
  Check,
  Phone
} from 'lucide-react';
import { SoilPhotoDetection } from '../types';
import { generateSoilHealthCardPdf, createSoilHealthCardWhatsAppText } from '../utils/soilHealthCardPdf';
import { copyToClipboard } from '../utils/safeClipboard';

interface SoilHealthCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  detection: SoilPhotoDetection;
  farmerName?: string;
  phone?: string;
  location?: string;
  surveyNumber?: string;
  landArea?: string | number;
  landType?: string;
}

export const SoilHealthCardModal: React.FC<SoilHealthCardModalProps> = ({
  isOpen,
  onClose,
  detection,
  farmerName = 'Landowner',
  phone = '+91 98421 77340',
  location = 'Coimbatore, Tamil Nadu',
  surveyNumber = 'SF/204-B',
  landArea = '3.5',
  landType = 'Agricultural Farmland'
}) => {
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const cardId = `SHC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  const cardData = {
    farmerName,
    phone,
    location,
    surveyNumber,
    landArea,
    landType,
    detection,
    cardId,
    issuedDate: dateStr
  };

  const handleDownloadPdf = () => {
    setIsDownloading(true);
    try {
      generateSoilHealthCardPdf(cardData);
    } catch (err) {
      console.error('Error generating PDF:', err);
    } finally {
      setTimeout(() => setIsDownloading(false), 800);
    }
  };

  const handleShareWhatsApp = () => {
    const text = createSoilHealthCardWhatsAppText(cardData);
    const encodedText = encodeURIComponent(text);
    const url = `https://api.whatsapp.com/send?text=${encodedText}`;
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      window.location.href = url;
    }
  };

  const handleCopySummary = async () => {
    const text = createSoilHealthCardWhatsAppText(cardData);
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-[#FAF8F5] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#C08261]/30 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Bar */}
        <div className="bg-[#2D4F1E] text-[#F4F1EA] px-6 py-4 flex items-center justify-between border-b border-[#C08261]/30 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#C08261] flex items-center justify-center text-[#F4F1EA] shadow-md">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-serif font-bold tracking-tight">
                  One-Click Soil Health Card
                </h3>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-[#1F3814] text-[#D89F80] rounded-full border border-[#C08261]/30">
                  Govt Format
                </span>
              </div>
              <p className="text-xs text-[#F4F1EA]/80">
                Official Digital Soil Health Report for Field Officers & Agri Supply Subsidies
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1F3814] hover:bg-[#C08261] transition-colors flex items-center justify-center text-[#F4F1EA]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Printable Card Preview */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-[#FAF8F5]">
          
          {/* Action Quick Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#EFECE6] p-3.5 rounded-2xl border border-[#C08261]/30">
            <div className="flex items-center space-x-2 text-xs font-semibold text-[#2D4F1E]">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Card ID: <strong>{cardId}</strong> • Date: <strong>{dateStr}</strong></span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleDownloadPdf}
                disabled={isDownloading}
                className="h-9 px-4 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#F4F1EA] rounded-xl text-xs font-bold shadow-sm transition-all flex items-center space-x-1.5 active:scale-95 cursor-pointer disabled:opacity-50"
              >
                <Download className="w-4 h-4 text-[#D89F80]" />
                <span>{isDownloading ? 'Generating PDF...' : 'Download PDF Card'}</span>
              </button>

              <button
                onClick={handleShareWhatsApp}
                className="h-9 px-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center space-x-1.5 active:scale-95 cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Share WhatsApp</span>
              </button>

              <button
                onClick={handleCopySummary}
                className="w-9 h-9 flex items-center justify-center bg-[#FAF8F5] hover:bg-white text-[#2D4F1E] rounded-xl text-xs font-bold border border-[#C08261]/30 transition-all active:scale-95 cursor-pointer shadow-sm"
                title="Copy Text Summary"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#2D4F1E]" />}
              </button>
            </div>
          </div>

          {/* Printable Card Preview Wrapper */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-[#C08261]/40 shadow-lg space-y-6 text-[#2D4F1E]">
            
            {/* Header section in card */}
            <div className="border-b-2 border-[#2D4F1E] pb-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-[#2D4F1E] text-[#F4F1EA] flex items-center justify-center shrink-0">
                  <Sprout className="w-7 h-7 text-[#D89F80]" />
                </div>
                <div>
                  <h4 className="text-xl font-serif font-bold text-[#2D4F1E]">
                    SOIL HEALTH CARD (SHC)
                  </h4>
                  <p className="text-xs font-semibold text-[#C08261] uppercase tracking-wider">
                    Eden Sync AI Agronomic Suite • National Soil Standards
                  </p>
                </div>
              </div>

              <div className="text-right text-xs space-y-0.5">
                <p className="font-bold text-[#2D4F1E]">Reference: {cardId}</p>
                <p className="text-slate-500">Date: {dateStr}</p>
                <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-md">
                  VERIFIED DIAGNOSTIC
                </span>
              </div>
            </div>

            {/* Farmer Profile Grid */}
            <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#C08261]/30 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500">Farmer / Landowner</span>
                <p className="font-bold text-[#2D4F1E] text-sm mt-0.5">{farmerName}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500">Survey No. / Plot</span>
                <p className="font-bold text-[#2D4F1E] text-sm mt-0.5">{surveyNumber}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500">Area & Land Type</span>
                <p className="font-bold text-[#2D4F1E] text-sm mt-0.5">{landArea} Acres • {landType}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500">Location</span>
                <p className="font-bold text-[#2D4F1E] text-sm mt-0.5">{location}</p>
              </div>
            </div>

            {/* Diagnostic Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#C08261]/30">
                <span className="text-[10px] uppercase font-bold text-[#C08261]">Detected Condition</span>
                <p className="font-serif font-bold text-base text-[#2D4F1E] mt-0.5">{detection.conditionLabel}</p>
                <span className="text-[10px] font-extrabold uppercase text-[#A06445]">Cat: {detection.condition}</span>
              </div>

              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#C08261]/30">
                <span className="text-[10px] uppercase font-bold text-[#C08261]">Health Index Score</span>
                <p className="font-serif font-bold text-2xl text-[#2D4F1E] mt-0.5">{detection.soilHealthIndex || 78}<span className="text-xs font-normal text-slate-500">/100</span></p>
                <span className="text-[10px] font-semibold text-emerald-700">Drainage: {detection.drainageClass}</span>
              </div>

              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#C08261]/30">
                <span className="text-[10px] uppercase font-bold text-[#C08261]">Moisture Status</span>
                <p className="font-serif font-bold text-base text-[#2D4F1E] mt-0.5">{detection.moisturePercentage}%</p>
                <span className="text-[10px] font-semibold text-slate-600">{detection.moistureStatus}</span>
              </div>

              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#C08261]/30">
                <span className="text-[10px] uppercase font-bold text-[#C08261]">pH & Organic Matter</span>
                <p className="font-serif font-bold text-sm text-[#2D4F1E] mt-0.5">{detection.phEstimateRange}</p>
                <span className="text-[10px] font-semibold text-slate-600">OM: {detection.organicMatterEstimate}</span>
              </div>
            </div>

            {/* Geological type & summary */}
            <div className="p-3.5 bg-[#EFECE6] rounded-xl text-xs space-y-1">
              <p className="font-bold text-[#2D4F1E]">Geological Classification: <span className="font-normal text-slate-800">{detection.soilType}</span></p>
              <p className="text-slate-700 leading-relaxed">{detection.textureSummary}</p>
            </div>

            {/* Visual Markers */}
            <div className="space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#C08261]">
                Surface & Subsurface Markers Detected:
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {(detection.visualMarkers || []).map((marker, i) => (
                  <div key={i} className="flex items-center space-x-2 bg-[#FAF8F5] p-2 rounded-lg border border-[#C08261]/20">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="text-slate-800 font-medium">{marker}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rejuvenation Regimen */}
            <div className="space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#2D4F1E] flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D4A359]" />
                <span>Custom Agronomic Soil Rejuvenation Action Plan:</span>
              </h5>
              <div className="space-y-2">
                {(detection.tailoredRejuvenation || []).map((step, idx) => (
                  <div key={idx} className="bg-[#FAF8F5] p-3 rounded-xl border-l-4 border-[#C08261] text-xs">
                    <p className="font-bold text-[#2D4F1E]">Step {idx + 1}:</p>
                    <p className="text-slate-700 mt-0.5 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Crops */}
            <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#C08261]/30 space-y-1 text-xs">
              <span className="font-bold text-[#2D4F1E]">Recommended Crops & Agroforestry:</span>
              <p className="text-slate-800">
                {(detection.recommendedCrops || []).join('  •  ')}
              </p>
            </div>

            {/* Sign off */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
              <div>
                <p className="font-bold text-[#2D4F1E]">Issued by Eden Sync Agronomic Services</p>
                <p>Helpline: +91 1800-425-EDEN • email: soilcare@edensync.org</p>
              </div>
              <div className="text-center sm:text-right border border-dashed border-slate-300 p-2 rounded-lg">
                <p className="font-bold text-[#2D4F1E]">Dr. Anita Roy</p>
                <p className="text-[10px]">Chief Soil Bio-Chemist & Extension Officer</p>
              </div>
            </div>

          </div>

        </div>

        {/* Footer actions */}
        <div className="bg-[#EFECE6] px-6 py-4 flex items-center justify-between border-t border-[#C08261]/30 shrink-0">
          <p className="text-xs text-[#2D4F1E]/80 hidden sm:block">
            Print or download as official 1-page PDF for your agricultural records.
          </p>

          <div className="flex items-center space-x-3 ml-auto">
            <button
              onClick={onClose}
              className="h-10 px-5 bg-transparent hover:bg-[#FAF8F5] text-[#2D4F1E] rounded-xl text-xs font-bold transition-all border border-[#C08261]/30 active:scale-95 cursor-pointer"
            >
              Close
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="h-10 px-5 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#F4F1EA] rounded-xl text-xs font-bold shadow-lg transition-all flex items-center space-x-2 active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <FileDown className="w-4 h-4 text-[#D89F80]" />
              <span>{isDownloading ? 'Preparing PDF...' : 'Download Official PDF Card'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
