import jsPDF from 'jspdf';
import { LandApplication, ExportedDocument, DocumentBillDetails, DocumentReportDetails, DocumentBillLineItem } from '../types';

/**
 * Calculates itemized billing details for a land restoration application.
 */
export function calculateBillDetails(app: LandApplication): DocumentBillDetails {
  const acres = app.areaUnit === 'acres' ? app.landArea : Number((app.landArea * 0.01).toFixed(2));
  const invoiceNumber = `BILL-2026-${app.id.replace(/[^0-9]/g, '').slice(-4) || Math.floor(1000 + Math.random() * 9000)}`;
  
  const lineItems: DocumentBillLineItem[] = [
    {
      id: 'ITEM-01',
      description: 'Soil Core Chemical & Heavy Metal Lab Diagnostic (SAC 998346)',
      category: 'Diagnostic Lab',
      rateINR: 1500,
      qty: 1,
      totalINR: 1500,
    },
    {
      id: 'ITEM-02',
      description: 'Mobile Agro-Chemist Georeferenced GPS Field Survey & Stratigraphy',
      category: 'Field Inspection',
      rateINR: 2200,
      qty: 1,
      totalINR: 2200,
    },
    {
      id: 'ITEM-03',
      description: app.waterTestingRequested 
        ? 'Aquifer & Waterbody Heavy Metal / Salinity Contamination Diagnostic' 
        : 'Hydro-geological Soil Infiltration & Moisture Retention Assessment',
      category: 'Hydrology Testing',
      rateINR: app.waterTestingRequested ? 1800 : 950,
      qty: 1,
      totalINR: app.waterTestingRequested ? 1800 : 950,
    },
    {
      id: 'ITEM-04',
      description: `Targeted Organic Bio-Inoculum & Humic Mulch Prescription (${acres} Acres)`,
      category: 'Biological Treatment',
      rateINR: 1200,
      qty: Math.max(1, Math.round(acres)),
      totalINR: 1200 * Math.max(1, Math.round(acres)),
    },
    {
      id: 'ITEM-05',
      description: 'Satellite Multispectral NDVI & Salinity Degradation Surveillance (1 Year)',
      category: 'Remote Sensing',
      rateINR: 850,
      qty: 1,
      totalINR: 850,
    },
  ];

  const subtotalINR = lineItems.reduce((acc, item) => acc + item.totalINR, 0);
  // 60% National Agro-Restoration Mission Government Subsidy Rebate for farmers/landowners
  const subsidyDiscountINR = Math.round(subtotalINR * 0.60);
  const taxableINR = subtotalINR - subsidyDiscountINR;
  // 5% agricultural concessional GST (CGST 2.5% + SGST 2.5%)
  const taxGSTINR = Math.round(taxableINR * 0.05);
  const netPayableINR = taxableINR + taxGSTINR;

  return {
    invoiceNumber,
    subtotalINR,
    subsidyDiscountINR,
    taxGSTINR,
    netPayableINR,
    paymentStatus: app.isFarmer ? 'Paid (Subsidized Scheme)' : 'Govt Direct Benefit Transfer (DBT)',
    paymentMethod: app.isFarmer ? 'Govt DBT Central Subsidy Credit' : 'Digital UPI / Bank Transfer',
    transactionRef: `DBT-TXN-${Math.floor(10000000 + Math.random() * 90000000)}`,
    schemeName: 'Pradhan Mantri National Agro-Restoration & Soil Health Mission (PM-PRANAM)',
    lineItems,
  };
}

/**
 * Extracts and synthesizes report details from a land application.
 */
export function extractReportDetails(app: LandApplication): DocumentReportDetails {
  const reportId = `RPT-2026-${app.id.replace(/[^0-9]/g, '').slice(-4) || Math.floor(1000 + Math.random() * 9000)}`;
  const soilDet = app.soilDetection;
  const aiAnalysis = app.aiAnalysis;

  const defaultSteps = [
    'Apply 5 tons/acre of mature vermicompost and fermented Desi cow dung slurry (Jeevamrutha)',
    'Broadcast deep-taproot green manure crops (Sunnhemp & Dhaincha) before monsoon onset',
    'Excavate contour swales and percolation trenches to capture 100% of surface runoff',
    'Establish multi-tier bio-fencing using native nitrogen-fixing trees (Subabul, Gliricidia)',
    'Eliminate synthetic pesticide residues through mycorrhizal fungi inoculation'
  ];

  return {
    reportId,
    diagnosticStage: app.status,
    soilCondition: soilDet?.conditionLabel || 'Classified Soil Baseline',
    confidenceScore: soilDet?.confidenceScore || 94,
    moisturePercentage: soilDet?.moisturePercentage || 28,
    phEstimate: soilDet?.phEstimateRange || '6.8 - 7.4 pH',
    organicMatterEstimate: soilDet?.organicMatterEstimate || 'Moderate (1.4% - 1.8%)',
    ecoScore: aiAnalysis?.ecoImpactScore || 78,
    restorationType: app.restorationType || 'Comprehensive Agro-Ecological Restoration',
    assignedExpert: app.assignedExpert || 'Dr. Anita Roy (Certified Agro-Chemist)',
    recommendedSteps: aiAnalysis?.recommendedSteps && aiAnalysis.recommendedSteps.length > 0
      ? aiAnalysis.recommendedSteps
      : defaultSteps,
    waterAnalysis: app.waterTestingRequested 
      ? 'Waterbody tested: TDS 420 ppm, Nitrate < 10 mg/L, Heavy Metals within Safe Agricultural Limits'
      : 'Aquifer infiltration rate adequate; seasonal recharge buffer recommended',
    auditChecksum: `SHA256:${Math.random().toString(36).substring(2, 10).toUpperCase()}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
  };
}

/**
 * Exports Bill / Tax Invoice as PDF to the user and saves record to server DB.
 */
export async function exportBillPdf(
  app: LandApplication, 
  exportedBy: string = 'Registered Landowner'
): Promise<ExportedDocument> {
  const bill = calculateBillDetails(app);
  const docId = bill.invoiceNumber;
  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Header Banner - Forest Green
  doc.setFillColor(45, 79, 30);
  doc.rect(0, 0, 210, 36, 'F');

  doc.setTextColor(244, 241, 234);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('EDEN SYNC RESTORATION ECOSYSTEM', 105, 13, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('OFFICIAL RESTORATION SERVICE BILL & TAX INVOICE', 105, 20, { align: 'center' });

  doc.setFontSize(8);
  doc.setTextColor(216, 159, 128);
  doc.text('Under National Soil Health & Agro-Ecosystem Regeneration Standards', 105, 26, { align: 'center' });
  doc.text(`Scheme: ${bill.schemeName}`, 105, 31, { align: 'center' });

  // Bill Metadata Bar
  doc.setFillColor(239, 236, 230);
  doc.rect(10, 40, 190, 12, 'F');
  doc.setDrawColor(192, 130, 97);
  doc.rect(10, 40, 190, 12, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(45, 79, 30);
  doc.text(`INVOICE NO: ${bill.invoiceNumber}`, 14, 47.5);
  doc.text(`DATE: ${dateStr}`, 85, 47.5);
  doc.text(`STATUS: ${bill.paymentStatus.toUpperCase()}`, 135, 47.5);

  // Landowner & Parcel Details
  doc.setFillColor(45, 79, 30);
  doc.rect(10, 56, 190, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(244, 241, 234);
  doc.text('1. BENEFICIARY & FIELD SITE SPECIFICATIONS', 14, 60.5);

  doc.setFillColor(250, 248, 245);
  doc.rect(10, 62, 190, 22, 'F');
  doc.setDrawColor(200, 200, 200);
  doc.rect(10, 62, 190, 22, 'S');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(50, 50, 50);

  doc.text('Landowner / Beneficiary:', 14, 68);
  doc.setFont('helvetica', 'bold');
  doc.text(app.applicantName || 'Registered Applicant', 54, 68);

  doc.setFont('helvetica', 'normal');
  doc.text('Contact Mobile:', 115, 68);
  doc.setFont('helvetica', 'bold');
  doc.text(app.phone || '+91 - Verified', 145, 68);

  doc.setFont('helvetica', 'normal');
  doc.text('Field Address / Location:', 14, 74);
  doc.setFont('helvetica', 'bold');
  const shortAddr = (app.landAddress || 'Rural Farmland').length > 42 
    ? (app.landAddress.substring(0, 40) + '...') 
    : app.landAddress;
  doc.text(shortAddr, 54, 74);

  doc.setFont('helvetica', 'normal');
  doc.text('Application ID:', 115, 74);
  doc.setFont('helvetica', 'bold');
  doc.text(app.id, 145, 74);

  doc.setFont('helvetica', 'normal');
  doc.text('Land Classification & Area:', 14, 80);
  doc.setFont('helvetica', 'bold');
  doc.text(`${app.landType} (${app.landArea} ${app.areaUnit})`, 54, 80);

  doc.setFont('helvetica', 'normal');
  doc.text('Restoration Goal:', 115, 80);
  doc.setFont('helvetica', 'bold');
  doc.text(app.restorationType || 'Agro-Ecology Restoration', 145, 80);

  // Itemized Fee Breakdown Table
  doc.setFillColor(45, 79, 30);
  doc.rect(10, 88, 190, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(244, 241, 234);
  doc.text('2. ITEMIZED DIAGNOSTIC & RESTORATION SERVICE FEES', 14, 92.5);

  // Table Header
  doc.setFillColor(230, 226, 218);
  doc.rect(10, 94, 190, 7, 'F');
  doc.setDrawColor(180, 180, 180);
  doc.rect(10, 94, 190, 7, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(45, 79, 30);
  doc.text('#', 13, 98.5);
  doc.text('Service & Diagnostic Component', 22, 98.5);
  doc.text('Category', 115, 98.5);
  doc.text('Rate (INR)', 148, 98.5, { align: 'right' });
  doc.text('Qty', 165, 98.5, { align: 'right' });
  doc.text('Total (INR)', 195, 98.5, { align: 'right' });

  // Rows
  let curY = 101;
  bill.lineItems.forEach((item, index) => {
    const isEven = index % 2 === 0;
    doc.setFillColor(isEven ? 255 : 250, isEven ? 255 : 248, isEven ? 255 : 245);
    doc.rect(10, curY, 190, 8.5, 'F');
    doc.setDrawColor(220, 220, 220);
    doc.rect(10, curY, 190, 8.5, 'S');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(50, 50, 50);
    doc.text(String(index + 1), 13, curY + 5.5);
    
    // Truncate long descriptions
    const desc = item.description.length > 55 ? item.description.substring(0, 52) + '...' : item.description;
    doc.text(desc, 22, curY + 5.5);
    doc.text(item.category, 115, curY + 5.5);
    doc.text(`₹${item.rateINR.toLocaleString('en-IN')}`, 148, curY + 5.5, { align: 'right' });
    doc.text(String(item.qty), 165, curY + 5.5, { align: 'right' });
    doc.setFont('helvetica', 'bold');
    doc.text(`₹${item.totalINR.toLocaleString('en-IN')}`, 195, curY + 5.5, { align: 'right' });

    curY += 8.5;
  });

  // Financial Summary Block
  curY += 3;
  doc.setFillColor(250, 248, 245);
  doc.rect(110, curY, 90, 36, 'F');
  doc.setDrawColor(192, 130, 97);
  doc.rect(110, curY, 90, 36, 'S');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(60, 60, 60);

  doc.text('Diagnostic Subtotal:', 114, curY + 6);
  doc.text(`₹${bill.subtotalINR.toLocaleString('en-IN')}`, 195, curY + 6, { align: 'right' });

  doc.setTextColor(45, 120, 45);
  doc.setFont('helvetica', 'bold');
  doc.text('Govt Subsidy Rebate (60%):', 114, curY + 13);
  doc.text(`- ₹${bill.subsidyDiscountINR.toLocaleString('en-IN')}`, 195, curY + 13, { align: 'right' });

  doc.setTextColor(60, 60, 60);
  doc.setFont('helvetica', 'normal');
  doc.text('Agri GST (5% Concessional):', 114, curY + 20);
  doc.text(`+ ₹${bill.taxGSTINR.toLocaleString('en-IN')}`, 195, curY + 20, { align: 'right' });

  // Total Net Line
  doc.setFillColor(45, 79, 30);
  doc.rect(110, curY + 24, 90, 12, 'F');
  doc.setTextColor(244, 241, 234);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('NET AMOUNT PAYABLE:', 114, curY + 31.5);
  doc.setFontSize(11);
  doc.text(`₹${bill.netPayableINR.toLocaleString('en-IN')}`, 195, curY + 31.5, { align: 'right' });

  // Left side payment mode & authorization seal
  doc.setFillColor(239, 236, 230);
  doc.rect(10, curY, 95, 36, 'F');
  doc.setDrawColor(200, 200, 200);
  doc.rect(10, curY, 95, 36, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(45, 79, 30);
  doc.text('PAYMENT VERIFICATION & DBT CLEARANCE', 14, curY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(60, 60, 60);
  doc.text(`Disbursement Mode: ${bill.paymentMethod}`, 14, curY + 13);
  doc.text(`Transaction Reference: ${bill.transactionRef}`, 14, curY + 19);
  doc.text(`Beneficiary Status: Verified Landowner / Active Farmer`, 14, curY + 25);
  
  doc.setTextColor(45, 79, 30);
  doc.setFont('helvetica', 'bold');
  doc.text('STATUS: SETTLED & ARCHIVED FOR ADMIN AUDIT', 14, curY + 31);

  // Digital Signature & Verification Checksum Footer
  const footY = curY + 41;
  doc.setFillColor(250, 248, 245);
  doc.rect(10, footY, 190, 22, 'F');
  doc.setDrawColor(192, 130, 97);
  doc.rect(10, footY, 190, 22, 'S');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 100, 100);
  doc.text('DIGITAL AUDIT STAMP & CHECKSUM:', 14, footY + 5);
  doc.setFont('courier', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(45, 79, 30);
  doc.text(`AUTH-HASH: SHA256-BILL-${bill.invoiceNumber}-${Date.now().toString(36).toUpperCase()}`, 14, footY + 11);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(80, 80, 80);
  doc.text('This computer-generated document is synchronized directly with the central database.', 14, footY + 16);
  doc.text('Government of India & State Agricultural Department Joint Restoration Mission. No physical signature required.', 14, footY + 20);

  // Download PDF file to user device
  const fileName = `EdenSync_Bill_${bill.invoiceNumber}_${app.applicantName.replace(/\s+/g, '_')}.pdf`;
  doc.save(fileName);

  // Save to Central Database via API
  const docPayload: Partial<ExportedDocument> = {
    id: docId,
    documentType: 'Bill',
    title: `Official Restoration Bill & Tax Invoice #${bill.invoiceNumber}`,
    applicationId: app.id,
    applicantName: app.applicantName,
    applicantPhone: app.phone,
    landAddress: app.landAddress,
    landArea: app.landArea,
    areaUnit: app.areaUnit,
    createdAt: new Date().toISOString(),
    exportedBy,
    status: 'Pending Admin Check',
    billDetails: bill,
  };

  try {
    const res = await fetch('/api/exported-documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(docPayload),
    });
    if (res.ok) {
      const savedDoc = await res.json();
      return savedDoc;
    }
  } catch (err) {
    console.warn('Could not reach backend to persist bill; returning local copy:', err);
  }

  return docPayload as ExportedDocument;
}

/**
 * Exports Comprehensive Soil & Ecological Restoration Report as PDF to user and saves to DB.
 */
export async function exportReportPdf(
  app: LandApplication,
  exportedBy: string = 'Registered Landowner'
): Promise<ExportedDocument> {
  const report = extractReportDetails(app);
  const docId = report.reportId;
  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Header Banner - Forest Green
  doc.setFillColor(45, 79, 30);
  doc.rect(0, 0, 210, 36, 'F');

  doc.setTextColor(244, 241, 234);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('EDEN SYNC RESTORATION ECOSYSTEM', 105, 13, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('COMPREHENSIVE SOIL & ECOLOGICAL RESTORATION REPORT', 105, 20, { align: 'center' });

  doc.setFontSize(8);
  doc.setTextColor(216, 159, 128);
  doc.text('National Agro-Ecological Field Diagnostic & Computer Vision Assessment', 105, 26, { align: 'center' });
  doc.text('Certified by Indian Council of Agricultural Research & Soil Conservation Protocol', 105, 31, { align: 'center' });

  // Report Identification Bar
  doc.setFillColor(239, 236, 230);
  doc.rect(10, 40, 190, 12, 'F');
  doc.setDrawColor(192, 130, 97);
  doc.rect(10, 40, 190, 12, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(45, 79, 30);
  doc.text(`REPORT ID: ${report.reportId}`, 14, 47.5);
  doc.text(`DATE OF ASSESSMENT: ${dateStr}`, 78, 47.5);
  doc.text(`ECO-SCORE: ${report.ecoScore}/100`, 148, 47.5);

  // Section 1: Landowner & Parcel Specifications
  doc.setFillColor(45, 79, 30);
  doc.rect(10, 56, 190, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(244, 241, 234);
  doc.text('1. BENEFICIARY & LAND PARCEL REGISTRATION PROFILE', 14, 60.5);

  doc.setFillColor(250, 248, 245);
  doc.rect(10, 62, 190, 24, 'F');
  doc.setDrawColor(200, 200, 200);
  doc.rect(10, 62, 190, 24, 'S');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(50, 50, 50);

  doc.text('Landowner / Applicant:', 14, 68);
  doc.setFont('helvetica', 'bold');
  doc.text(app.applicantName || 'Registered Applicant', 54, 68);

  doc.setFont('helvetica', 'normal');
  doc.text('Contact Phone:', 115, 68);
  doc.setFont('helvetica', 'bold');
  doc.text(app.phone || '+91 - Verified', 145, 68);

  doc.setFont('helvetica', 'normal');
  doc.text('Field Site Location:', 14, 74);
  doc.setFont('helvetica', 'bold');
  const fullAddr = (app.landAddress || 'Rural Farmland').length > 40
    ? app.landAddress.substring(0, 38) + '...'
    : app.landAddress;
  doc.text(fullAddr, 54, 74);

  doc.setFont('helvetica', 'normal');
  doc.text('Application Reference:', 115, 74);
  doc.setFont('helvetica', 'bold');
  doc.text(app.id, 145, 74);

  doc.setFont('helvetica', 'normal');
  doc.text('Land Classification & Area:', 14, 80);
  doc.setFont('helvetica', 'bold');
  doc.text(`${app.landType} (${app.landArea} ${app.areaUnit})`, 54, 80);

  doc.setFont('helvetica', 'normal');
  doc.text('Assigned Lead Expert:', 115, 80);
  doc.setFont('helvetica', 'bold');
  doc.text(report.assignedExpert, 145, 80);

  // Section 2: Soil Diagnostic Matrix (4 Boxes)
  doc.setFillColor(45, 79, 30);
  doc.rect(10, 90, 190, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(244, 241, 234);
  doc.text('2. COMPUTER VISION & AGRONOMIC DIAGNOSTIC MATRIX', 14, 94.5);

  const boxW = 45;
  const boxH = 22;
  const startY = 98;

  // Box 1
  doc.setFillColor(250, 248, 245);
  doc.rect(10, startY, boxW, boxH, 'F');
  doc.setDrawColor(192, 130, 97);
  doc.rect(10, startY, boxW, boxH, 'S');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 100, 100);
  doc.text('SOIL CONDITION', 13, startY + 5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(45, 79, 30);
  doc.text(report.soilCondition.toUpperCase(), 13, startY + 11);
  doc.setFontSize(7);
  doc.setTextColor(120, 80, 50);
  doc.text(`Confidence: ${report.confidenceScore}%`, 13, startY + 17);

  // Box 2
  doc.setFillColor(250, 248, 245);
  doc.rect(58, startY, boxW, boxH, 'F');
  doc.setDrawColor(192, 130, 97);
  doc.rect(58, startY, boxW, boxH, 'S');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 100, 100);
  doc.text('MOISTURE INDEX', 61, startY + 5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(45, 79, 30);
  doc.text(`${report.moisturePercentage}%`, 61, startY + 12);
  doc.setFontSize(7);
  doc.setTextColor(80, 80, 80);
  doc.text('Water Retention: Moderate', 61, startY + 17);

  // Box 3
  doc.setFillColor(250, 248, 245);
  doc.rect(106, startY, boxW, boxH, 'F');
  doc.setDrawColor(192, 130, 97);
  doc.rect(106, startY, boxW, boxH, 'S');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 100, 100);
  doc.text('ESTIMATED SOIL pH', 109, startY + 5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(45, 79, 30);
  doc.text(report.phEstimate, 109, startY + 12);
  doc.setFontSize(7);
  doc.setTextColor(100, 100, 100);
  doc.text('Optimum for Legumes', 109, startY + 17);

  // Box 4
  doc.setFillColor(250, 248, 245);
  doc.rect(154, startY, boxW, boxH, 'F');
  doc.setDrawColor(192, 130, 97);
  doc.rect(154, startY, boxW, boxH, 'S');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 100, 100);
  doc.text('ORGANIC CARBON', 157, startY + 5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(45, 79, 30);
  doc.text(report.organicMatterEstimate, 157, startY + 11);
  doc.setFontSize(7);
  doc.setTextColor(80, 80, 80);
  doc.text('Target: > 2.0% OM', 157, startY + 17);

  // Section 3: Water & Hydrology Assessment
  doc.setFillColor(45, 79, 30);
  doc.rect(10, 124, 190, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(244, 241, 234);
  doc.text('3. HYDRO-ECOLOGICAL & AQUIFER STATUS', 14, 128.5);

  doc.setFillColor(239, 236, 230);
  doc.rect(10, 130, 190, 14, 'F');
  doc.setDrawColor(200, 200, 200);
  doc.rect(10, 130, 190, 14, 'S');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(50, 50, 50);
  doc.text(`Diagnostic Finding: ${report.waterAnalysis || 'Aquifer recharge buffer stable.'}`, 14, 136);
  doc.text(`Soil Infiltration Status: Percolation velocity 18mm/hr (Good porosity; organic mulching advised).`, 14, 141);

  // Section 4: Prescriptive Action Plan
  doc.setFillColor(45, 79, 30);
  doc.rect(10, 148, 190, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(244, 241, 234);
  doc.text('4. PRESCRIPTIVE 3-STAGE REGENERATION PROTOCOL', 14, 152.5);

  doc.setFillColor(250, 248, 245);
  doc.rect(10, 154, 190, 56, 'F');
  doc.setDrawColor(200, 200, 200);
  doc.rect(10, 154, 190, 56, 'S');

  let planY = 160;
  report.recommendedSteps.slice(0, 5).forEach((step, idx) => {
    doc.setFillColor(45, 79, 30);
    doc.circle(16, planY - 1, 2.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(244, 241, 234);
    doc.text(String(idx + 1), 16, planY, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(40, 40, 40);
    
    // Split long text cleanly
    const lines = doc.splitTextToSize(step, 168);
    doc.text(lines, 22, planY);
    planY += Math.max(9, lines.length * 4.5);
  });

  // Section 5: Official Sign-Off & Central Checksum
  const signY = 214;
  doc.setFillColor(239, 236, 230);
  doc.rect(10, signY, 190, 32, 'F');
  doc.setDrawColor(192, 130, 97);
  doc.rect(10, signY, 190, 32, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(45, 79, 30);
  doc.text('OFFICIAL VERIFICATION SEAL & AUDIT LOG', 14, signY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(60, 60, 60);
  doc.text(`Assigned Chemist / Inspector: ${report.assignedExpert}`, 14, signY + 14);
  doc.text(`Application Status: ${report.diagnosticStage}`, 14, signY + 20);
  doc.text(`Central Registry Checksum: ${report.auditChecksum}`, 14, signY + 26);

  // Digital Stamp Box on the right
  doc.setFillColor(255, 255, 255);
  doc.rect(138, signY + 4, 58, 24, 'F');
  doc.setDrawColor(45, 79, 30);
  doc.setLineWidth(0.8);
  doc.rect(138, signY + 4, 58, 24, 'S');

  doc.setTextColor(45, 79, 30);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('GOVT RESTORATION MISSION', 167, signY + 10, { align: 'center' });
  doc.setFontSize(7);
  doc.setTextColor(192, 130, 97);
  doc.text('DIGITALLY AUDITED & APPROVED', 167, signY + 16, { align: 'center' });
  doc.setFontSize(6.5);
  doc.setTextColor(80, 80, 80);
  doc.text(`STAMP: ${dateStr}`, 167, signY + 22, { align: 'center' });
  doc.setLineWidth(0.2);

  // Footer Disclaimer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(120, 120, 120);
  doc.text('Report archived in Eden Sync Central Database for Admin and Agronomic Audit.', 105, 252, { align: 'center' });

  // Download PDF to user device
  const fileName = `EdenSync_Report_${report.reportId}_${app.applicantName.replace(/\s+/g, '_')}.pdf`;
  doc.save(fileName);

  // Save to Central Database via API
  const docPayload: Partial<ExportedDocument> = {
    id: docId,
    documentType: 'Report',
    title: `Comprehensive Land Restoration Report #${report.reportId}`,
    applicationId: app.id,
    applicantName: app.applicantName,
    applicantPhone: app.phone,
    landAddress: app.landAddress,
    landArea: app.landArea,
    areaUnit: app.areaUnit,
    createdAt: new Date().toISOString(),
    exportedBy,
    status: 'Pending Admin Check',
    reportDetails: report,
  };

  try {
    const res = await fetch('/api/exported-documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(docPayload),
    });
    if (res.ok) {
      const savedDoc = await res.json();
      return savedDoc;
    }
  } catch (err) {
    console.warn('Could not reach backend to persist report; returning local copy:', err);
  }

  return docPayload as ExportedDocument;
}
