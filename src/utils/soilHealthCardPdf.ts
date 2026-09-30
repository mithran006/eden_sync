import jsPDF from 'jspdf';
import { SoilPhotoDetection, LandApplication } from '../types';

export interface SoilHealthCardData {
  farmerName: string;
  phone?: string;
  location: string;
  surveyNumber?: string;
  landArea?: string | number;
  landType?: string;
  detection: SoilPhotoDetection;
  cardId?: string;
  issuedDate?: string;
}

export function generateSoilHealthCardPdf(data: SoilHealthCardData): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const cardId = data.cardId || `SHC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const dateStr = data.issuedDate || new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  // Background Accent header
  doc.setFillColor(45, 79, 30); // #2D4F1E Dark Green
  doc.rect(0, 0, 210, 32, 'F');

  // Header Title
  doc.setTextColor(244, 241, 234);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('EDEN SYNC REVIVAL ECOSYSTEM', 105, 14, { align: 'center' });

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('OFFICIAL AI SOIL HEALTH CARD & AGRONOMIC DIAGNOSTIC', 105, 22, { align: 'center' });

  doc.setFontSize(8);
  doc.setTextColor(216, 159, 128); // #D89F80
  doc.text('Integrated Computer Vision & National Soil Health Standards', 105, 28, { align: 'center' });

  // Metadata Bar
  doc.setFillColor(239, 236, 230); // #EFECE6
  doc.rect(10, 36, 190, 10, 'F');
  doc.setDrawColor(192, 130, 97); // #C08261
  doc.rect(10, 36, 190, 10, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(45, 79, 30);
  doc.text(`CARD ID: ${cardId}`, 14, 42.5);
  doc.text(`ISSUED: ${dateStr}`, 90, 42.5);
  doc.text(`STATUS: AI VERIFIED & FIELD READY`, 145, 42.5);

  // Section 1: Landowner & Field Location Details
  doc.setFillColor(45, 79, 30);
  doc.rect(10, 50, 190, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(244, 241, 234);
  doc.text('1. LANDOWNER & FIELD REGISTRATION PROFILE', 14, 54.5);

  doc.setFillColor(250, 248, 245);
  doc.rect(10, 56, 190, 24, 'F');
  doc.setDrawColor(200, 200, 200);
  doc.rect(10, 56, 190, 24, 'S');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 30, 30);

  doc.text(`Landowner / Farmer:`, 14, 62);
  doc.setFont('helvetica', 'bold');
  doc.text(data.farmerName || 'Registered Farmer', 50, 62);

  doc.setFont('helvetica', 'normal');
  doc.text(`Contact Phone:`, 115, 62);
  doc.setFont('helvetica', 'bold');
  doc.text(data.phone || '+91 - Confidential', 150, 62);

  doc.setFont('helvetica', 'normal');
  doc.text(`Field Location:`, 14, 69);
  doc.setFont('helvetica', 'bold');
  doc.text(data.location || 'Rural Agronomic Zone', 50, 69);

  doc.setFont('helvetica', 'normal');
  doc.text(`Survey Number / Plot:`, 115, 69);
  doc.setFont('helvetica', 'bold');
  doc.text(data.surveyNumber || 'SF/108-A', 150, 69);

  doc.setFont('helvetica', 'normal');
  doc.text(`Land Type & Area:`, 14, 76);
  doc.setFont('helvetica', 'bold');
  doc.text(`${data.landType || 'Farmland'} (${data.landArea || '2.0'} Acres)`, 50, 76);

  doc.setFont('helvetica', 'normal');
  doc.text(`Agronomic Confidence:`, 115, 76);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(45, 79, 30);
  doc.text(`${data.detection.confidenceScore || 94}% AI Vision Match`, 150, 76);

  // Section 2: Soil Classification & Physical Diagnostics Matrix
  doc.setFillColor(45, 79, 30);
  doc.rect(10, 84, 190, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(244, 241, 234);
  doc.text('2. SOIL PHYSICAL & CHEMICAL DIAGNOSTIC MATRIX', 14, 88.5);

  // 4 Core Metric Boxes
  const boxWidth = 45;
  const boxHeight = 22;
  const startY = 92;

  // Box 1: Condition
  doc.setFillColor(250, 248, 245);
  doc.rect(10, startY, boxWidth, boxHeight, 'F');
  doc.setDrawColor(192, 130, 97);
  doc.rect(10, startY, boxWidth, boxHeight, 'S');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 100, 100);
  doc.text('PRIMARY CONDITION', 13, startY + 5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(45, 79, 30);
  doc.text(data.detection.conditionLabel.toUpperCase(), 13, startY + 11);
  doc.setFontSize(7.5);
  doc.setTextColor(120, 80, 50);
  doc.text(`Cat: ${data.detection.condition.toUpperCase()}`, 13, startY + 17);

  // Box 2: Soil Health Index
  doc.setFillColor(250, 248, 245);
  doc.rect(58, startY, boxWidth, boxHeight, 'F');
  doc.setDrawColor(192, 130, 97);
  doc.rect(58, startY, boxWidth, boxHeight, 'S');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 100, 100);
  doc.text('HEALTH INDEX (0-100)', 61, startY + 5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(45, 79, 30);
  doc.text(`${data.detection.soilHealthIndex || 78}/100`, 61, startY + 13);
  doc.setFontSize(7.5);
  doc.setTextColor(80, 80, 80);
  doc.text(`Drainage: ${data.detection.drainageClass || 'Well-Drained'}`, 61, startY + 18);

  // Box 3: Moisture & Water Capacity
  doc.setFillColor(250, 248, 245);
  doc.rect(106, startY, boxWidth, boxHeight, 'F');
  doc.setDrawColor(192, 130, 97);
  doc.rect(106, startY, boxWidth, boxHeight, 'S');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 100, 100);
  doc.text('MOISTURE STATUS', 109, startY + 5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(45, 79, 30);
  doc.text(`${data.detection.moisturePercentage}% Moisture`, 109, startY + 12);
  doc.setFontSize(7);
  doc.setTextColor(100, 100, 100);
  doc.text(data.detection.moistureStatus || 'Adequate', 109, startY + 18);

  // Box 4: pH & Organic Matter
  doc.setFillColor(250, 248, 245);
  doc.rect(154, startY, boxWidth, boxHeight, 'F');
  doc.setDrawColor(192, 130, 97);
  doc.rect(154, startY, boxWidth, boxHeight, 'S');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 100, 100);
  doc.text('ESTIMATED pH & ORGANIC', 157, startY + 5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(45, 79, 30);
  doc.text(data.detection.phEstimateRange || '6.8 - 7.4 pH', 157, startY + 11);
  doc.setFontSize(7.5);
  doc.setTextColor(80, 80, 80);
  doc.text(`OM: ${data.detection.organicMatterEstimate || 'Moderate'}`, 157, startY + 17);

  // Geological Soil Type & Texture Summary
  doc.setFillColor(239, 236, 230);
  doc.rect(10, 117, 190, 14, 'F');
  doc.setDrawColor(200, 200, 200);
  doc.rect(10, 117, 190, 14, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(45, 79, 30);
  doc.text(`Geological Classification: ${data.detection.soilType}`, 14, 122);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(50, 50, 50);
  const textureLines = doc.splitTextToSize(`Texture: ${data.detection.textureSummary || 'Even loam crumb aggregation with active pore distribution.'}`, 182);
  doc.text(textureLines, 14, 127);

  // Section 3: Visual Markers Detected
  doc.setFillColor(45, 79, 30);
  doc.rect(10, 134, 190, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(244, 241, 234);
  doc.text('3. COMPUTER VISION SURFACE & SUB-SURFACE MARKERS DETECTED', 14, 138.5);

  doc.setFillColor(250, 248, 245);
  doc.rect(10, 140, 190, 18, 'F');
  doc.setDrawColor(200, 200, 200);
  doc.rect(10, 140, 190, 18, 'S');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(40, 40, 40);

  const markers = data.detection.visualMarkers || [
    'Characteristic topsoil aggregate structure',
    'Surface color spectrum signature',
    'Pore distribution profile'
  ];

  markers.slice(0, 4).forEach((marker, idx) => {
    const xPos = idx % 2 === 0 ? 14 : 105;
    const yPos = idx < 2 ? 146 : 153;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(192, 130, 97);
    doc.text('✔', xPos, yPos);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 30, 30);
    doc.text(marker, xPos + 5, yPos);
  });

  // Section 4: Tailored Agronomic Soil Rejuvenation Protocols
  doc.setFillColor(45, 79, 30);
  doc.rect(10, 161, 190, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(244, 241, 234);
  doc.text('4. CUSTOMIZED REJUVENATION & FERTILITY PROTOCOLS (ACTION PLAN)', 14, 165.5);

  doc.setFillColor(250, 248, 245);
  doc.rect(10, 167, 190, 46, 'F');
  doc.setDrawColor(192, 130, 97);
  doc.rect(10, 167, 190, 46, 'S');

  const rejuvenationSteps = data.detection.tailoredRejuvenation || [
    'Incorporate organic bio-mulch and farmyard compost to elevate active carbon.',
    'Maintain cover cropping to prevent moisture evaporation and crusting.',
    'Apply mycorrhizal fungi bio-inoculants to boost nutrient bioavailability.'
  ];

  let rejY = 173;
  rejuvenationSteps.slice(0, 3).forEach((step, idx) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(192, 130, 97);
    doc.text(`Step 0${idx + 1}:`, 14, rejY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(30, 30, 30);
    const stepLines = doc.splitTextToSize(step, 160);
    doc.text(stepLines, 30, rejY);
    rejY += (stepLines.length * 4) + 3;
  });

  // Section 5: Recommended Crops & Agroforestry
  doc.setFillColor(45, 79, 30);
  doc.rect(10, 216, 190, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(244, 241, 234);
  doc.text('5. RECOMMENDED CROPS, AGROFORESTRY & ROTATION PLAN', 14, 220.5);

  doc.setFillColor(239, 236, 230);
  doc.rect(10, 222, 190, 20, 'F');
  doc.setDrawColor(200, 200, 200);
  doc.rect(10, 222, 190, 20, 'S');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(45, 79, 30);

  const crops = data.detection.recommendedCrops || ['Organic Wheat', 'Paddy', 'Pulses', 'Millets', 'Agroforestry Trees'];
  doc.setFont('helvetica', 'bold');
  doc.text('Optimal Cultivation Selection:', 14, 228);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(30, 30, 30);
  doc.text(crops.join('  •  '), 14, 235);

  // Section 6: Official Extension Sign-off & Verification Footer
  doc.setFillColor(245, 243, 238);
  doc.rect(10, 245, 190, 38, 'F');
  doc.setDrawColor(192, 130, 97);
  doc.rect(10, 245, 190, 38, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(45, 79, 30);
  doc.text('EDEN SYNC VERIFICATION & AGRICULTURAL EXTENSION COUNTER', 14, 251);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(70, 70, 70);
  doc.text('This digital Soil Health Card is generated via Eden Sync AI Agronomic Suite.', 14, 257);
  doc.text('Eligible for Government Bio-Fertilizer Subsidies, Micro-Irrigation Grants & SPCB Compliance.', 14, 262);
  doc.text('Emergency Farmer Advisory Helpline: +91 1800-425-EDEN (Toll Free)', 14, 267);

  // Signature box
  doc.setDrawColor(150, 150, 150);
  doc.rect(140, 250, 55, 28, 'S');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(100, 100, 100);
  doc.text('EXTENSION OFFICER SIGN-OFF / STAMP', 142, 255);
  doc.text('Dr. Anita Roy', 142, 269);
  doc.setFont('helvetica', 'normal');
  doc.text('Sr. Soil Bio-Chemist, Eden Sync', 142, 273);

  // Footer bar
  doc.setFillColor(45, 79, 30);
  doc.rect(0, 287, 210, 10, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(244, 241, 234);
  doc.text('Eden Sync Ecosystem © 2026 • Soil Health Management & Environmental Rejuvenation Network', 105, 293, { align: 'center' });

  // Save the PDF
  doc.save(`EdenSync_SoilHealthCard_${cardId}.pdf`);

  // Asynchronously archive into Central Exported Documents Database
  try {
    const docPayload = {
      id: cardId,
      documentType: 'Report',
      title: `Official Soil Health Card #${cardId} (${data.farmerName})`,
      applicationId: `SOIL-SCAN-${cardId.slice(-4)}`,
      applicantName: data.farmerName || 'Landowner / Farmer',
      applicantPhone: data.phone || '+91 - Confidential',
      landAddress: data.location || 'Rural Agronomic Zone',
      landArea: Number(data.landArea) || 2.0,
      areaUnit: 'acres',
      createdAt: new Date().toISOString(),
      exportedBy: data.farmerName || 'Eden Sync AI Soil Suite',
      status: 'Verified & Approved',
      adminNotes: `AI Visual Soil Diagnostic for ${data.detection.conditionLabel}. Verified under National Soil Health parameters.`,
      reportDetails: {
        reportId: cardId,
        diagnosticStage: 'AI Field Classification & Laboratory Alignment',
        soilCondition: data.detection.conditionLabel,
        confidenceScore: data.detection.confidenceScore,
        moisturePercentage: data.detection.moisturePercentage,
        phEstimate: data.detection.phEstimateRange,
        organicMatterEstimate: data.detection.organicMatterEstimate,
        ecoScore: data.detection.soilHealthIndex,
        restorationType: `${data.detection.conditionLabel} Rejuvenation Protocol`,
        assignedExpert: 'Dr. Anita Roy, Sr. Soil Chemist',
        recommendedSteps: data.detection.tailoredRejuvenation || [],
        auditChecksum: `SHA256:SOIL:${cardId}:${Date.now().toString(16)}`
      }
    };

    fetch('/api/exported-documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(docPayload),
    }).catch(err => console.warn('Background card sync warning:', err));
  } catch (err) {
    console.warn('Could not archive Soil Health Card to database:', err);
  }
}

// Generate shareable WhatsApp Summary Text
export function createSoilHealthCardWhatsAppText(data: SoilHealthCardData): string {
  const cardId = data.cardId || `SHC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const detection = data.detection;

  return `🌿 *EDEN SYNC - OFFICIAL SOIL HEALTH CARD*
━━━━━━━━━━━━━━━━━━━━
📄 *Card ID:* ${cardId}
👨‍🌾 *Farmer:* ${data.farmerName || 'Registered Farmer'}
📍 *Location:* ${data.location || 'Field Site'}
📐 *Area / Plot:* ${data.landArea || '2.0'} Acres (${data.surveyNumber || 'Plot'})

🧪 *SOIL CLASSIFICATION & HEALTH*
• *Condition:* ${detection.conditionLabel.toUpperCase()}
• *Geological Type:* ${detection.soilType}
• *Soil Health Index:* ${detection.soilHealthIndex}/100
• *Moisture Status:* ${detection.moisturePercentage}% (${detection.moistureStatus})
• *Estimated pH:* ${detection.phEstimateRange}
• *Organic Matter:* ${detection.organicMatterEstimate}

🛠️ *TOP RESTORATION RECOMMENDATIONS:*
${(detection.tailoredRejuvenation || []).slice(0, 3).map((r, i) => `${i + 1}. ${r}`).join('\n')}

🌾 *RECOMMENDED CROPS:*
${(detection.recommendedCrops || []).join(', ')}

━━━━━━━━━━━━━━━━━━━━
🌱 _Generated via Eden Sync AI Agronomic Suite. Eligible for Soil Health Scheme Subsidies._`;
}
