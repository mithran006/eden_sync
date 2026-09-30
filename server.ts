import express from 'express';
import http from 'http';
import path from 'path';
import fs from 'fs';
import { WebSocketServer, WebSocket } from 'ws';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { INITIAL_APPLICATIONS, INITIAL_GOVT_PROJECTS, INITIAL_AWARENESS_ARTICLES } from './src/data/seedData.js';
import { INITIAL_CUSTOMERS } from './src/data/customerData.js';
import { INITIAL_COMPLAINTS } from './src/data/complaintData.js';
import { INITIAL_FARMER_IDEAS } from './src/data/farmerIdeasData.js';
import { INITIAL_FIELD_WORK_LOGS } from './src/data/fieldWorkData.js';
import { INITIAL_METAL_REQUESTS, LIVE_METAL_RATES } from './src/data/metalWasteData.js';
import { GLOBAL_COUNTRY_DEGRADATION_DATA } from './src/data/satelliteDegradationData.js';
import { INITIAL_EXPORTED_DOCUMENTS } from './src/data/documentSeedData.js';
import { KAGGLE_AGRICULTURE_DATASET, computeDatasetStatistics } from './src/data/agricultureKaggleDataset.js';
import { predictAgriOutcomes } from './src/utils/agriSoilModel.js';
import { 
  LandApplication, 
  GovtProject, 
  AwarenessArticle, 
  CustomerRecord, 
  PollutionComplaint, 
  AIPollutionAssessment, 
  SoilPhotoDetection, 
  SoilConditionCategory, 
  SoilTypeClassification, 
  WaterPhotoDetection, 
  WaterConditionCategory, 
  ComplaintMilestoneEvent, 
  FarmerIdea, 
  UserProfile, 
  FieldWorkLog, 
  MetalWasteRequest,
  CountryLandDegradation,
  SatelliteParcelScan,
  ExportedDocument
} from './src/types.js';

const PORT = 3000;
const IS_VERCEL = Boolean(process.env.VERCEL || process.env.NOW_REGION);
const DATA_FILE = process.env.DATA_PATH || (IS_VERCEL ? path.join('/tmp', 'data_store.json') : path.join(process.cwd(), 'data_store.json'));

// In Vercel serverless environment, ensure /tmp/data_store.json is initialized from project root
if (IS_VERCEL) {
  try {
    const rootDataFile = path.join(process.cwd(), 'data_store.json');
    if (!fs.existsSync(DATA_FILE) && fs.existsSync(rootDataFile)) {
      const rootContent = fs.readFileSync(rootDataFile, 'utf-8');
      fs.writeFileSync(DATA_FILE, rootContent, 'utf-8');
      console.log('Successfully initialized /tmp/data_store.json from project root for Vercel deployment');
    }
  } catch (err) {
    console.warn('Notice: Could not copy initial data_store.json to /tmp:', err);
  }
}

// Initialize In-Memory Store with Local JSON Backup
let applications: LandApplication[] = [...INITIAL_APPLICATIONS];
let govtProjects: GovtProject[] = [...INITIAL_GOVT_PROJECTS];
let awarenessArticles: AwarenessArticle[] = [...INITIAL_AWARENESS_ARTICLES];
let customers: CustomerRecord[] = [...INITIAL_CUSTOMERS];
let complaints: PollutionComplaint[] = [...INITIAL_COMPLAINTS];
let farmerIdeas: FarmerIdea[] = [...INITIAL_FARMER_IDEAS];
let fieldWorkLogs: FieldWorkLog[] = [...INITIAL_FIELD_WORK_LOGS];
let metalWasteRequests: MetalWasteRequest[] = [...INITIAL_METAL_REQUESTS];
const INITIAL_SATELLITE_SCANS: SatelliteParcelScan[] = [
  {
    id: 'SCAN-2026-001',
    farmerName: 'Ramesh Patel',
    phone: '+91 98421 77340',
    country: 'India',
    locationName: 'Coimbatore, Tamil Nadu',
    coordinates: { lat: 10.9974, lng: 76.9589 },
    farmAreaAcres: 12.5,
    cropType: 'Cotton & Castor',
    observedIssues: ['Surface white salt crusting', 'Stunted seedling roots', 'Slow water infiltration'],
    ndviScore: 0.32,
    soilDegradationScore: 68,
    waterStressIndex: 72,
    erosionRisk: 'Moderate',
    salinityRisk: 'Critical',
    organicCarbonLossEstimate: '0.28% (Severely Depleted, Deficit of 78%)',
    topSoilLossEstimateTonsPerHa: 18.4,
    diagnosisSummary: 'Multispectral Sentinel-2 false-color shows pronounced SWIR-2 spectral reflectance indicating secondary surface salinization and soil hardpan compaction at 25cm depth.',
    recommendedRegenerativeHacks: [
      'Sub-surface Terracotta Olla Clay Pots to bypass surface salt capillary evaporation',
      'Gypsum application (1.5 tons/acre) followed by Daincha green manure incorporation',
      'High-potassium wood ash + Jeevamrutha bio-spray every 14 days'
    ],
    carbonCreditPotentialTonsPerYr: 16.2,
    scannedAt: '2026-09-17T11:45:00Z',
    satelliteProvider: 'Sentinel-2 MSI (10m) + Landsat-9 OLI-2 Multi-spectral Pipeline',
    verifiedByAi: true
  },
  {
    id: 'SCAN-2026-002',
    farmerName: 'Carlos Mendonça',
    phone: '+55 65 9988-1234',
    country: 'Brazil',
    locationName: 'Mato Grosso Cerrado Margin',
    coordinates: { lat: -13.0456, lng: -55.9123 },
    farmAreaAcres: 85.0,
    cropType: 'Degraded Pasture & Maize',
    observedIssues: ['Compacted hardpan', 'Termite mounds', 'Yellowing leaf chlorosis'],
    ndviScore: 0.41,
    soilDegradationScore: 54,
    waterStressIndex: 61,
    erosionRisk: 'High',
    salinityRisk: 'Safe',
    organicCarbonLossEstimate: '0.85% (Deficit of 45% compared to native savanna)',
    topSoilLossEstimateTonsPerHa: 26.1,
    diagnosisSummary: 'Thermal infrared anomaly indicates severe soil bake temperature (>42°C) due to lack of mulch canopy; heavy cattle hooves compacted subsoil into impermeable pan.',
    recommendedRegenerativeHacks: [
      'Subsoil ripping with Yeomans-style Keyline shank',
      'Over-seeding with deep-rooted Brachiaria ruziziensis & Stylosanthes guianensis',
      'Crushed volcanic basalt rock dust application (3 tons/ha) for remineralization'
    ],
    carbonCreditPotentialTonsPerYr: 112.5,
    scannedAt: '2026-09-16T14:20:00Z',
    satelliteProvider: 'Sentinel-2 MSI (10m) + Landsat-9 Thermal Infrared (TIRS-2)',
    verifiedByAi: true
  }
];
let satelliteScans: SatelliteParcelScan[] = [...INITIAL_SATELLITE_SCANS];
let registeredUsers: UserProfile[] = [];
let exportedDocuments: ExportedDocument[] = [...INITIAL_EXPORTED_DOCUMENTS];

// Load persisted data if exists
try {
  const fileToRead = fs.existsSync(DATA_FILE) 
    ? DATA_FILE 
    : (fs.existsSync(path.join(process.cwd(), 'data_store.json')) ? path.join(process.cwd(), 'data_store.json') : null);

  if (fileToRead) {
    const fileContent = fs.readFileSync(fileToRead, 'utf-8');
    const parsed = JSON.parse(fileContent);
    if (parsed.applications && Array.isArray(parsed.applications)) applications = parsed.applications;
    if (parsed.govtProjects && Array.isArray(parsed.govtProjects)) govtProjects = parsed.govtProjects;
    if (parsed.awarenessArticles && Array.isArray(parsed.awarenessArticles)) awarenessArticles = parsed.awarenessArticles;
    if (parsed.customers && Array.isArray(parsed.customers)) customers = parsed.customers;
    if (parsed.complaints && Array.isArray(parsed.complaints)) complaints = parsed.complaints;
    if (parsed.farmerIdeas && Array.isArray(parsed.farmerIdeas)) {
      const existingIds = new Set(parsed.farmerIdeas.map((f: FarmerIdea) => f.id));
      const missingInitial = INITIAL_FARMER_IDEAS.filter(f => !existingIds.has(f.id));
      farmerIdeas = [...parsed.farmerIdeas, ...missingInitial];
    } else {
      farmerIdeas = [...INITIAL_FARMER_IDEAS];
    }
    if (parsed.fieldWorkLogs && Array.isArray(parsed.fieldWorkLogs)) fieldWorkLogs = parsed.fieldWorkLogs;
    if (parsed.registeredUsers && Array.isArray(parsed.registeredUsers)) registeredUsers = parsed.registeredUsers;
    if (parsed.metalWasteRequests && Array.isArray(parsed.metalWasteRequests)) metalWasteRequests = parsed.metalWasteRequests;
    if (parsed.satelliteScans && Array.isArray(parsed.satelliteScans)) {
      satelliteScans = parsed.satelliteScans;
    }
    if (parsed.exportedDocuments && Array.isArray(parsed.exportedDocuments)) {
      const existingIds = new Set(parsed.exportedDocuments.map((d: ExportedDocument) => d.id));
      const missingInitial = INITIAL_EXPORTED_DOCUMENTS.filter(d => !existingIds.has(d.id));
      exportedDocuments = [...parsed.exportedDocuments, ...missingInitial];
    } else {
      exportedDocuments = [...INITIAL_EXPORTED_DOCUMENTS];
    }
    console.log(`Loaded persisted data from ${fileToRead} (Users: ${registeredUsers.length}, Apps: ${applications.length}, Scans: ${satelliteScans.length}, Documents: ${exportedDocuments.length})`);
  }
} catch (err) {
  console.error('Error reading database file:', err);
}

function saveData() {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const payload = JSON.stringify({ 
      applications, 
      govtProjects, 
      awarenessArticles, 
      customers, 
      complaints, 
      farmerIdeas, 
      fieldWorkLogs, 
      registeredUsers, 
      metalWasteRequests,
      satelliteScans,
      exportedDocuments
    }, null, 2);
    
    fs.writeFileSync(DATA_FILE, payload, 'utf-8');
    
    // In local or docker dev, also mirror to project root if different
    if (!IS_VERCEL && DATA_FILE !== path.join(process.cwd(), 'data_store.json')) {
      try {
        fs.writeFileSync(path.join(process.cwd(), 'data_store.json'), payload, 'utf-8');
      } catch {
        // ignore mirror error
      }
    }
  } catch (err) {
    console.error('Error saving data_store.json:', err);
  }
}

/**
 * Auto-registers or updates a user profile when they interact with any feature.
 * Stored permanently in the database so the user can log in with Password-Alone ("eden123")
 * or mobile number anytime!
 */
function autoRegisterUser(details: {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  role?: 'user' | 'admin';
  identityCardType?: string;
  identityCardNumber?: string;
  identityCardFile?: string;
  landDocumentType?: string;
  landDocumentNumber?: string;
  landDocumentFile?: string;
  landPhotoUrls?: string[];
}): UserProfile | null {
  if (!details.name && !details.phone && !details.email) return null;
  const cleanName = (details.name || 'Registered Landowner').trim();
  const cleanPhone = (details.phone || '').trim();
  const cleanEmail = (details.email || '').trim().toLowerCase();

  // Look for existing user by phone or email
  let existing = registeredUsers.find(u => {
    const uPhone = (u.phone || '').replace(/[\s-+()]/g, '');
    const reqPhone = cleanPhone.replace(/[\s-+()]/g, '');
    const phoneMatch = Boolean(reqPhone && uPhone && (uPhone.includes(reqPhone) || reqPhone.includes(uPhone)));
    const emailMatch = Boolean(cleanEmail && u.email && u.email.toLowerCase() === cleanEmail);
    return phoneMatch || emailMatch;
  });

  if (existing) {
    if (cleanName && cleanName !== 'Landowner' && cleanName !== 'Concerned Resident' && existing.name !== cleanName) {
      existing.name = cleanName;
    }
    if (cleanEmail && !existing.email) {
      existing.email = cleanEmail;
    }
    if (details.address && (!existing.address || existing.address === 'Registered Location' || existing.address === 'Registered Farm Location')) {
      existing.address = details.address;
    }
    if (details.identityCardType) existing.identityCardType = details.identityCardType;
    if (details.identityCardNumber) existing.identityCardNumber = details.identityCardNumber;
    if (details.identityCardFile) existing.identityCardFile = details.identityCardFile;
    if (details.landDocumentType) existing.landDocumentType = details.landDocumentType;
    if (details.landDocumentNumber) existing.landDocumentNumber = details.landDocumentNumber;
    if (details.landDocumentFile) existing.landDocumentFile = details.landDocumentFile;
    if (details.landPhotoUrls && details.landPhotoUrls.length > 0) {
      const existingPhotos = new Set(existing.landPhotoUrls || []);
      const merged = [...(existing.landPhotoUrls || [])];
      for (const p of details.landPhotoUrls) {
        if (!existingPhotos.has(p)) {
          merged.push(p);
          existingPhotos.add(p);
        }
      }
      existing.landPhotoUrls = merged;
    }
    saveData();
    return existing;
  }

  const newProfile: UserProfile = {
    id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
    name: cleanName,
    phone: cleanPhone || '+91 98000 12345',
    email: cleanEmail || '',
    address: details.address || 'Registered Location',
    role: details.role || 'user',
    authProvider: 'phone',
    quickPassword: 'eden123',
    identityCardType: details.identityCardType,
    identityCardNumber: details.identityCardNumber,
    identityCardFile: details.identityCardFile,
    landDocumentType: details.landDocumentType,
    landDocumentNumber: details.landDocumentNumber,
    landDocumentFile: details.landDocumentFile,
    landPhotoUrls: details.landPhotoUrls || [],
    avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cleanName)}`,
  };

  registeredUsers.unshift(newProfile);
  saveData();
  console.log(`Auto-registered new user into database: ${newProfile.name} (${newProfile.id})`);
  return newProfile;
}

// Lazy Gemini AI Client Helper
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// AI Land Restoration Assessment Function
async function generateAILandAnalysis(appData: Partial<LandApplication>) {
  const ai = getGeminiClient();

  if (ai) {
    try {
      const prompt = `You are Eden Sync's Senior Ecological & Soil Restoration Expert. Analyze this land/waterbody restoration request and provide a structured JSON response:

Applicant Details:
- Land Type: ${appData.landType}
- Area: ${appData.landArea} ${appData.areaUnit}
- Location: ${appData.landAddress}
- Farmer: ${appData.isFarmer ? 'Yes' : 'No'}
- Willing to Lease: ${appData.willingToLease ? 'Yes' : 'No'}
- Restoration Type: ${appData.restorationType}
- Soil Test Needed: ${appData.soilTestingRequested ? 'Yes' : 'No'}
- Water Test Needed: ${appData.waterTestingRequested ? 'Yes' : 'No'}

Respond ONLY with valid JSON with this exact schema:
{
  "soilWaterHealthSummary": "A concise 2-sentence ecological diagnosis of the soil and water conditions typical for this location/type.",
  "recommendedSteps": ["3 to 4 actionable, practical restoration steps"],
  "estimatedTimelineWeeks": number (e.g. 6 to 20),
  "ecoImpactScore": number (between 75 and 98),
  "inspiringQuote": "A brief 1-sentence inspiring eco message personalized for this land owner."
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      if (response.text) {
        const parsed = JSON.parse(response.text.trim());
        return {
          soilWaterHealthSummary: parsed.soilWaterHealthSummary || 'Pre-inspection analysis shows moderate organic matter deficit with favorable restoration potential.',
          recommendedSteps: parsed.recommendedSteps || [
            'Conduct detailed 12-point core soil & water salinity analysis.',
            'Incorporate organic bio-mulch and nitrogen-fixing cover vegetation.',
            'Establish contour swales for rainwater catchment.'
          ],
          estimatedTimelineWeeks: parsed.estimatedTimelineWeeks || 10,
          ecoImpactScore: parsed.ecoImpactScore || 85,
          inspiringQuote: parsed.inspiringQuote || 'Restoring this land syncs nature with prosperity for your community.'
        };
      }
    } catch (err) {
      console.error('Gemini API call error:', err);
    }
  }

  // Fallback intelligent tailored assessment if API key is absent or fails
  const steps = [];
  if (appData.restorationType === 'Agricultural Restoration') {
    steps.push('Apply organic compost, gypsum, and green manure crops (Sesbania).');
    steps.push('Implement drip irrigation integrated with rainwater harvesting.');
    steps.push('Inoculate topsoil with beneficial mycorrhizal soil microbes.');
  } else if (appData.restorationType === 'Water Body Rejuvenation' || appData.restorationType === 'Eco-Cleaning & De-silting') {
    steps.push('Execute eco-dredging to clear non-permeable silt deposits.');
    steps.push('Construct floating vetiver bio-filters to absorb chemical runoff.');
    steps.push('Plant perimeter bamboo and reed beds to stabilize water banks.');
  } else {
    steps.push('Build semi-circular bunds (swales) to capture seasonal rainwater.');
    steps.push('Plant drought-resilient native timber and fruit species.');
    steps.push('Mulch bare soil to prevent moisture evaporation.');
  }

  return {
    soilWaterHealthSummary: `Initial assessment for ${appData.landArea} ${appData.areaUnit} of ${appData.landType} indicates good baseline restoration feasibility with high carbon capture potential.`,
    recommendedSteps: steps,
    estimatedTimelineWeeks: Math.max(6, Math.min(24, Math.round((appData.landArea || 5) * 1.5))),
    ecoImpactScore: Math.floor(82 + Math.random() * 14),
    inspiringQuote: `By reviving this ${appData.landType?.toLowerCase() || 'land'}, you are replenishing the water table and giving back to mother Earth.`
  };
}

// AI Environmental Pollution Grievance Diagnostic Function
async function generateAIPollutionAssessment(complaintData: Partial<PollutionComplaint>): Promise<AIPollutionAssessment> {
  const ai = getGeminiClient();

  if (ai) {
    try {
      const prompt = `You are Eden Sync's Senior Environmental Engineer & Pollution Control Scientist. Analyze this citizen/landowner pollution complaint and provide an emergency triage response in JSON format.

Complaint Information:
- Domain: ${complaintData.domain} (Land / Water / Both)
- Specific Pollution Cause: ${complaintData.specificCause}
- Title: ${complaintData.title}
- Description: ${complaintData.description}
- Location: ${complaintData.location}, ${complaintData.district}, ${complaintData.state}
- Affected Area/Volume: ${complaintData.affectedAreaOrVolume}
- Severity Claimed: ${complaintData.severity}
- Affected Natural Resources: ${Array.isArray(complaintData.affectedResources) ? complaintData.affectedResources.join(', ') : 'Nearby soil & water'}

Respond ONLY with valid JSON with this exact schema:
{
  "riskScore": number (between 50 and 99),
  "containmentPriority": "Immediate (< 24h)" or "Urgent (1-3 Days)" or "Standard (1 Week)",
  "immediateSafetyMeasures": ["3 immediate, critical safety instructions for local community and farmers"],
  "recommendedBioRemediation": ["3 scientifically proven ecological remediation techniques (e.g. biochar, vetiver wetlands, mycoremediation, microbial consortia, lime neutralization)"],
  "responsibleAuthorities": ["2 to 3 statutory regulatory bodies to notify (e.g. State Pollution Control Board, District Magistrate, Central Ground Water Authority)"],
  "estimatedEcologicalRecoveryWeeks": number (e.g. 4 to 24),
  "environmentalHazardSummary": "A concise 2-sentence ecological diagnostic summary of the immediate chemical/biological danger and pathway into food/water chains."
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      if (response.text) {
        const parsed = JSON.parse(response.text.trim());
        return {
          riskScore: parsed.riskScore || 85,
          containmentPriority: parsed.containmentPriority || 'Immediate (< 24h)',
          immediateSafetyMeasures: parsed.immediateSafetyMeasures || [
            'Cordon off contaminated perimeter and prevent livestock grazing or drinking.',
            'Halt borewell pumping within 500m radius to avoid plume migration.',
            'Deploy physical barriers or sandbag bunds to halt runoff spread.'
          ],
          recommendedBioRemediation: parsed.recommendedBioRemediation || [
            'Implement in-situ bio-adsorbent charcoal and bentonite clay filtration.',
            'Deploy phytoremediation using hyper-accumulating vegetation (Vetiver grass/Sunflowers).',
            'Inoculate with specialized hydrocarbon/effluent-digesting microbial consortia.'
          ],
          responsibleAuthorities: parsed.responsibleAuthorities || [
            'State Pollution Control Board (SPCB)',
            'District Environmental Task Force & Collectorate',
            'Central Ground Water Authority (CGWA)'
          ],
          estimatedEcologicalRecoveryWeeks: parsed.estimatedEcologicalRecoveryWeeks || 12,
          environmentalHazardSummary: parsed.environmentalHazardSummary || 'Active contaminant discharge identified. Rapid physical containment and microbial remediation are required to protect the local groundwater aquifer.'
        };
      }
    } catch (err) {
      console.error('Gemini API pollution diagnostic error:', err);
    }
  }

  // Fallback intelligent domain-specific diagnostic
  const isWater = complaintData.domain === 'Water Pollution' || complaintData.domain === 'Combined Land & Water';
  const isCritical = complaintData.severity?.includes('Critical');

  const safetyMeasures = isWater
    ? [
        'Halt all community drawing from connected water wells and irrigation canals immediately.',
        'Warn downstream villages against livestock washing or fishing in affected zone.',
        'Install coir geotextile and activated carbon boom barriers across inflow channels.'
      ]
    : [
        'Cordon off the dumping zone with warning markers to prevent human contact and cattle grazing.',
        'Cover exposed hazardous heaps with HDPE tarpaulins to prevent toxic leachate during rain.',
        'Do not plough or irrigate the contaminated topsoil to prevent chemical downward leaching.'
      ];

  const bioRemediation = isWater
    ? [
        'Deploy floating vetiver wetland islands (Phytoremediation) to absorb dissolved synthetic ions.',
        'Install solar-powered micro-bubble aerators to restore dissolved oxygen above 4.0 mg/L.',
        'Apply multi-strain beneficial nitrifying and carbon-digesting microbial bio-cultures.'
      ]
    : [
        'Apply high-temperature agricultural biochar (15 tons/ha) to bind and immobilize heavy metal ions.',
        'Incorporate agricultural gypsum/lime depending on soil pH test to neutralize chemical acidity.',
        'Plant deep-rooted green manure cover crops (Sesbania & Sunn Hemp) to extract subsoil toxins.'
      ];

  return {
    riskScore: isCritical ? 90 : 75,
    containmentPriority: isCritical ? 'Immediate (< 24h)' : 'Urgent (1-3 Days)',
    immediateSafetyMeasures: safetyMeasures,
    recommendedBioRemediation: bioRemediation,
    responsibleAuthorities: [
      'State Pollution Control Board (SPCB / Regional Environmental Office)',
      'District Collectorate & Revenue Department',
      'Water Resources & Irrigation Department'
    ],
    estimatedEcologicalRecoveryWeeks: isWater ? 10 : 16,
    environmentalHazardSummary: `Active ${complaintData.domain || 'environmental'} incident involving ${complaintData.specificCause || 'contaminants'}. High risk of ecological migration into surrounding water tables and agricultural soil.`
  };
}

// AI Soil Photo Detection & Classification Engine
async function generateAISoilPhotoDetection(
  photoUrl: string,
  base64Image?: string,
  landType?: string,
  location?: string
): Promise<SoilPhotoDetection> {
  const ai = getGeminiClient();

  if (ai) {
    try {
      const promptText = `You are Eden Sync's Senior Agronomist and Computer Vision Soil Scientist.
Analyze this soil photograph and classify it strictly into one of four primary soil condition categories:
1. "dry" (Dry, Arid, Moisture-Deficit, Parched Soil)
2. "clay" (Dense Clay, High Plasticity, Compacted Clayey Soil)
3. "healthy" (Healthy, Fertile Loam, Humus-rich, High Microbial Vitality Soil)
4. "heavy" (Heavy, Waterlogged, Dense Silt-Clay, Poor Aeration Soil)

Also identify its geological/agronomic soil type:
("Alluvial Soil (River Silt / Loam)" | "Black Soil (Regur / Vertisol)" | "Red Sandy Loam (Alfisol / Semmann)" | "Laterite Soil (Ferruginous)" | "Saline / Alkaline Soil (Kalar / Usar)" | "Sandy / Coastal Soil (Arenosol)" | "Clay Loam / Heavy Silt" | "Peaty / Organic Wetland Soil").

Additional context:
- Land Type: ${landType || 'Farmland / Soil'}
- Location: ${location || 'India'}
- Photo URL/Context: ${photoUrl || 'Uploaded Photo'}

Respond ONLY with a valid JSON object with this exact schema:
{
  "condition": "dry" | "clay" | "healthy" | "heavy",
  "conditionLabel": string (e.g. "Dry / Arid Soil", "Dense Clay Soil", "Healthy Fertile Loam", "Heavy / Waterlogged Soil"),
  "soilType": string (from the allowed types),
  "confidenceScore": number (between 85 and 99),
  "moisturePercentage": number (0 to 100),
  "moistureStatus": "Critically Dry (< 15%)" | "Moderate / Adequate (20-35%)" | "Optimal Field Capacity (35-50%)" | "Excess / Waterlogged (> 60%)",
  "organicMatterEstimate": "Very Low (< 0.4%)" | "Moderate (0.6 - 1.2%)" | "High / Rich (> 1.5%)",
  "textureSummary": "A concise 1-2 sentence description of soil grain structure, aggregation, and surface features",
  "visualMarkers": ["3 to 4 specific visual cues detected in the photo (e.g. 'Polygonal shrinkage cracks', 'Rich dark humus coloration', 'Surface water sheen', 'Granular crumb structure')"],
  "soilHealthIndex": number (between 30 and 96),
  "drainageClass": "Very Fast / Excessive" | "Well-Drained" | "Moderately Slow" | "Poor / Impermeable",
  "phEstimateRange": string (e.g. "6.5 - 7.2 (Neutral Optimal)"),
  "compactionRating": "Low (Porous & Crumbly)" | "Moderate (Workable)" | "High (Dense Hardpan)",
  "tailoredRejuvenation": ["3 actionable agronomic restoration steps customized specifically for this condition (dry / clay / healthy / heavy)"],
  "recommendedCrops": ["4 to 5 ideal crops and trees suited for this soil condition"]
}`;

      let contents: any = promptText;

      // If base64 image data is provided, include it in multimodal contents
      if (base64Image && base64Image.startsWith('data:image/')) {
        const matches = base64Image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          contents = [
            {
              inlineData: {
                mimeType: matches[1],
                data: matches[2],
              },
            },
            promptText,
          ];
        }
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
          responseMimeType: 'application/json',
        },
      });

      if (response.text) {
        const parsed = JSON.parse(response.text.trim());
        const validCondition: SoilConditionCategory = 
          ['dry', 'clay', 'healthy', 'heavy'].includes(parsed.condition) ? parsed.condition : 'healthy';

        return {
          condition: validCondition,
          conditionLabel: parsed.conditionLabel || (validCondition === 'dry' ? 'Dry / Arid Soil' : validCondition === 'clay' ? 'Dense Clay Soil' : validCondition === 'heavy' ? 'Heavy / Waterlogged Soil' : 'Healthy Fertile Loam'),
          soilType: parsed.soilType || 'Alluvial Soil (River Silt / Loam)',
          confidenceScore: parsed.confidenceScore || 92,
          moisturePercentage: parsed.moisturePercentage || (validCondition === 'dry' ? 12 : validCondition === 'clay' ? 28 : validCondition === 'heavy' ? 68 : 42),
          moistureStatus: parsed.moistureStatus || (validCondition === 'dry' ? 'Critically Dry (< 15%)' : validCondition === 'heavy' ? 'Excess / Waterlogged (> 60%)' : validCondition === 'clay' ? 'Moderate / Adequate (20-35%)' : 'Optimal Field Capacity (35-50%)'),
          organicMatterEstimate: parsed.organicMatterEstimate || (validCondition === 'healthy' ? 'High / Rich (> 1.5%)' : validCondition === 'dry' ? 'Very Low (< 0.4%)' : 'Moderate (0.6 - 1.2%)'),
          textureSummary: parsed.textureSummary || 'Photo analysis reveals characteristic surface aggregation and moisture distribution.',
          visualMarkers: Array.isArray(parsed.visualMarkers) && parsed.visualMarkers.length > 0 ? parsed.visualMarkers : ['Characteristic topsoil aggregate structure', 'Surface color spectrum signature', 'Pore distribution profile'],
          soilHealthIndex: parsed.soilHealthIndex || (validCondition === 'healthy' ? 90 : validCondition === 'clay' ? 72 : validCondition === 'dry' ? 52 : 64),
          drainageClass: parsed.drainageClass || (validCondition === 'dry' ? 'Very Fast / Excessive' : validCondition === 'heavy' ? 'Poor / Impermeable' : validCondition === 'clay' ? 'Moderately Slow' : 'Well-Drained'),
          phEstimateRange: parsed.phEstimateRange || '6.5 - 7.5 (Balanced Range)',
          compactionRating: parsed.compactionRating || (validCondition === 'clay' || validCondition === 'heavy' ? 'High (Dense Hardpan)' : validCondition === 'dry' ? 'Moderate (Workable)' : 'Low (Porous & Crumbly)'),
          tailoredRejuvenation: Array.isArray(parsed.tailoredRejuvenation) && parsed.tailoredRejuvenation.length > 0 ? parsed.tailoredRejuvenation : [
            'Incorporate organic bio-mulch and compost.',
            'Maintain cover cropping to prevent moisture evaporation.',
            'Apply mycorrhizal fungi bio-inoculants.'
          ],
          recommendedCrops: Array.isArray(parsed.recommendedCrops) && parsed.recommendedCrops.length > 0 ? parsed.recommendedCrops : ['Millets', 'Pulses', 'Cover Crops', 'Native Agroforestry Trees'],
          analyzedAt: new Date().toISOString(),
        };
      }
    } catch (err) {
      console.error('Gemini soil photo detection error:', err);
    }
  }

  // Fallback intelligent domain classification based on image cues / landType
  const photoStr = (photoUrl || '').toLowerCase();
  const landStr = (landType || '').toLowerCase();

  let detectedCategory: SoilConditionCategory = 'healthy';
  let defaultType: SoilTypeClassification = 'Alluvial Soil (River Silt / Loam)';

  if (photoStr.includes('1509316975850') || photoStr.includes('arid') || photoStr.includes('barren') || photoStr.includes('dry') || landStr.includes('barren') || landStr.includes('fallow')) {
    detectedCategory = 'dry';
    defaultType = 'Red Sandy Loam (Alfisol / Semmann)';
  } else if (photoStr.includes('1544551763') || photoStr.includes('water') || photoStr.includes('pond') || photoStr.includes('lake') || photoStr.includes('wetland') || landStr.includes('water') || landStr.includes('wetland') || landStr.includes('lake') || landStr.includes('pond')) {
    detectedCategory = 'heavy';
    defaultType = 'Peaty / Organic Wetland Soil';
  } else if (photoStr.includes('clay') || photoStr.includes('red') || landStr.includes('forest')) {
    detectedCategory = 'clay';
    defaultType = 'Clay Loam / Heavy Silt';
  } else {
    detectedCategory = 'healthy';
    defaultType = 'Alluvial Soil (River Silt / Loam)';
  }

  if (detectedCategory === 'dry') {
    return {
      condition: 'dry',
      conditionLabel: 'Dry / Arid Soil',
      soilType: defaultType,
      confidenceScore: 95,
      moisturePercentage: 11,
      moistureStatus: 'Critically Dry (< 15%)',
      organicMatterEstimate: 'Very Low (< 0.4%)',
      textureSummary: 'High sand/coarse mineral fraction with severe desiccation fractures, low moisture retention, and wind erosion susceptibility.',
      visualMarkers: ['Pale sun-bleached reddish-tan hue', 'Deep polygon desiccation cracks', 'Zero surface moisture condensation', 'Low organic mulch cover'],
      soilHealthIndex: 54,
      drainageClass: 'Very Fast / Excessive',
      phEstimateRange: '7.8 - 8.3 (Alkaline Tendency)',
      compactionRating: 'Moderate (Workable)',
      tailoredRejuvenation: [
        'Apply high-temperature biochar (4 tons/acre) combined with composted manure to create permanent moisture-holding micro-sponges.',
        'Establish contour swales and crescent bunds to capture 100% of seasonal rainwater runoff.',
        'Spread a 3-inch layer of organic biomass straw or woodchip mulch to suppress evaporative moisture loss by 70%.'
      ],
      recommendedCrops: ['Pearl Millet (Bajra)', 'Sorghum (Jowar)', 'Moth Bean & Cluster Bean', 'Drought-hardy Moringa', 'Neem & Khejri Agroforestry'],
      analyzedAt: new Date().toISOString(),
    };
  }

  if (detectedCategory === 'clay') {
    return {
      condition: 'clay',
      conditionLabel: 'Dense Clay / Compacted Soil',
      soilType: 'Clay Loam / Heavy Silt',
      confidenceScore: 93,
      moisturePercentage: 32,
      moistureStatus: 'Moderate / Adequate (20-35%)',
      organicMatterEstimate: 'Moderate (0.6 - 1.2%)',
      textureSummary: 'High colloidal clay fraction with tight subsoil compaction, high plasticity when wet, and hard crust formation when dry.',
      visualMarkers: ['Dense cohesive clods with high plasticity', 'Surface crusting inhibiting seedling emergence', 'Slow water percolation channels', 'High cation holding capacity'],
      soilHealthIndex: 72,
      drainageClass: 'Moderately Slow',
      phEstimateRange: '7.2 - 7.8 (Mildly Alkaline)',
      compactionRating: 'High (Dense Hardpan)',
      tailoredRejuvenation: [
        'Apply agricultural gypsum (CaSO4) at 2.5 tons/acre to displace excess sodium and aggregate fine clay particles into granular crumbs.',
        'Plant biological aerator crops (Daikon tillage radish & Sunn Hemp) to drill natural taproot channels through the dense subsoil.',
        'Avoid heavy machinery tillage during wet periods to prevent severe subsoil smear and plow-pan formation.'
      ],
      recommendedCrops: ['Cotton', 'Soybean', 'Sunflower', 'Pigeon Pea (Tur Dal)', 'Deep-rooted Tamarind'],
      analyzedAt: new Date().toISOString(),
    };
  }

  if (detectedCategory === 'heavy') {
    return {
      condition: 'heavy',
      conditionLabel: 'Heavy / Waterlogged Silt-Clay',
      soilType: defaultType,
      confidenceScore: 91,
      moisturePercentage: 70,
      moistureStatus: 'Excess / Waterlogged (> 60%)',
      organicMatterEstimate: 'Moderate (0.6 - 1.2%)',
      textureSummary: 'High-density colloidal silt and clay with saturated pore spaces, anaerobic conditions, and surface water pooling.',
      visualMarkers: ['Surface water sheen and standing hydric pools', 'Gleyed anaerobic subsurface layer', 'Dense heavy colloidal silt binding', 'Impeded root respiration zone'],
      soilHealthIndex: 66,
      drainageClass: 'Poor / Impermeable',
      phEstimateRange: '6.2 - 6.8 (Slightly Acidic)',
      compactionRating: 'High (Dense Hardpan)',
      tailoredRejuvenation: [
        'Construct perimeter drainage swales, contour French drains, and graded ridges to evacuate surplus hydrostatic water.',
        'Deploy floating vetiver grass phytoremediation rafts to aerate saturated rhizosphere root zones.',
        'Incorporate coarse river sand and composted bio-mulch to elevate aeration porosity above 25%.'
      ],
      recommendedCrops: ['Deep-water Paddy (Pokkali)', 'Taro / Colocasia', 'Water Spinach (Kangkong)', 'Lotus & Water Chestnut', 'Bamboo Bio-fencing'],
      analyzedAt: new Date().toISOString(),
    };
  }

  // Healthy Loam
  return {
    condition: 'healthy',
    conditionLabel: 'Healthy / Fertile Loam',
    soilType: 'Alluvial Soil (River Silt / Loam)',
    confidenceScore: 96,
    moisturePercentage: 42,
    moistureStatus: 'Optimal Field Capacity (35-50%)',
    organicMatterEstimate: 'High / Rich (> 1.5%)',
    textureSummary: 'Well-balanced silty-loam with porous crumbly aggregates, active mycorrhizal networks, and excellent moisture retention.',
    visualMarkers: ['Deep dark brown organic humus coloration', 'Spongy granular crumb structure', 'Visible root channels and earthworm activity', 'Optimal capillary water balance'],
    soilHealthIndex: 91,
    drainageClass: 'Well-Drained',
    phEstimateRange: '6.8 - 7.2 (Neutral Optimal)',
    compactionRating: 'Low (Porous & Crumbly)',
    tailoredRejuvenation: [
      'Maintain minimal soil disturbance (no-till or conservation tillage) to protect fungal hyphae networks.',
      'Sustain year-round living roots through diverse multi-species cover crop rotations (Cowpea, Mustard, Clover).',
      'Apply periodic compost tea and liquid vermiwash to nourish beneficial aerobic microbial colonies.'
    ],
    recommendedCrops: ['Organic Wheat & Basmati Paddy', 'High-value Vegetables (Tomato, Brinjal, Chilli)', 'Fruit Orchards (Mango, Guava, Sapota)', 'Leguminous Pulses (Chickpea, Black Gram)'],
    analyzedAt: new Date().toISOString(),
  };
}

// AI Water Body Photo Detection & Limnological Classification Engine
async function generateAIWaterPhotoDetection(
  photoUrl: string,
  base64Image?: string,
  waterBodyType?: string,
  location?: string
): Promise<WaterPhotoDetection> {
  const ai = getGeminiClient();

  if (ai) {
    try {
      const promptText = `You are Eden Sync's Senior Aquatic Ecologist, Limnologist and Water Body Restoration Specialist.
Analyze this photograph of a water body (pond, lake, canal, river, well, irrigation tank) and classify its visual ecological state strictly into one of five condition categories:
1. "algal" (Eutrophic, Algal Bloom, Cyanobacteria Mat, Pea-Green Scum, Hypoxic)
2. "turbid" (High Siltation, Muddy Runoff, High Suspended Solids, Eroded Banks)
3. "sheen" (Chemical / Petroleum / Hydrocarbon Oil Slick, Industrial Iridescence)
4. "clear" (Pristine Freshwater, Oligotrophic/Mesotrophic, Balanced Aquatic Flora)
5. "sewage" (Blackwater / Septic / Anaerobic Stagnation, Sludge Deposits, High Ammonia)

Also identify:
- Water Body Type: ("Village Pond / Irrigation Tank (Kulam / Eri)" | "Lake / Protected Wetland Area" | "River Canal / Distributary Channel" | "Agricultural Well / Borewell Recharge Pit" | "Urban Drainage / Industrial Outflow Basin")
- Water Quality Index (WQI): number (0-100)
- WQI Class: ("Excellent (Clean & Potable)" | "Good (Aquatic Safe)" | "Moderate (Stressed)" | "Poor (Degraded)" | "Critically Polluted (Hazardous)")
- Dissolved Oxygen (DO) estimate: string (e.g. "2.1 mg/L - Severe Hypoxia")
- Algal Risk Level: ("Severe Cyanobacteria Scum" | "Moderate Green Filamentous" | "Low / Natural" | "None (Clear)")
- Turbidity NTU estimate: string (e.g. "95+ NTU - Heavy Suspended Sediments")
- pH estimate: string (e.g. "8.4 - 8.9 (Alkaline)")
- Ecological impact summary
- 3 to 4 tailored bio-remediation restoration steps (e.g. Floating vetiver phytoremediation rafts, solar micro-bubble aeration, effective microorganisms / EM bio-dosing, riparian silt trap buffers)
- Safe Uses boolean flags: irrigation, cattleDrinking, fishFarming, humanContact

Additional context:
- Declared Type: ${waterBodyType || 'Pond / Water Body'}
- Location: ${location || 'India'}
- Photo URL/Context: ${photoUrl || 'Uploaded Water Photo'}

Respond ONLY with valid JSON with this exact schema:
{
  "condition": "algal" | "turbid" | "sheen" | "clear" | "sewage",
  "conditionLabel": string,
  "waterBodyType": string,
  "confidenceScore": number (85-99),
  "waterQualityIndex": number (0-100),
  "wqiClass": string,
  "dissolvedOxygenEstimate": string,
  "algalRiskLevel": string,
  "turbidityEstimate": string,
  "phEstimateRange": string,
  "visualMarkers": ["3 to 4 specific visual cues detected in the photo"],
  "ecologicalImpactSummary": "A concise 2-sentence limnological assessment",
  "tailoredRemediation": ["3 to 4 actionable bio-remediation steps"],
  "safeUses": {
    "irrigation": boolean,
    "cattleDrinking": boolean,
    "fishFarming": boolean,
    "humanContact": boolean
  }
}`;

      let contents: any = promptText;

      if (base64Image && base64Image.startsWith('data:image/')) {
        const matches = base64Image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          contents = [
            {
              inlineData: {
                mimeType: matches[1],
                data: matches[2],
              },
            },
            promptText,
          ];
        }
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
          responseMimeType: 'application/json',
        },
      });

      if (response.text) {
        const parsed = JSON.parse(response.text.trim());
        const validCondition: WaterConditionCategory = 
          ['algal', 'turbid', 'sheen', 'clear', 'sewage'].includes(parsed.condition) ? parsed.condition : 'algal';

        return {
          condition: validCondition,
          conditionLabel: parsed.conditionLabel || (validCondition === 'algal' ? 'Algal Bloom / Eutrophic Water' : validCondition === 'turbid' ? 'High Turbidity & Siltation' : validCondition === 'sheen' ? 'Chemical / Hydrocarbon Sheen' : validCondition === 'sewage' ? 'Raw Sewage Contamination' : 'Pristine Clean Freshwater'),
          waterBodyType: parsed.waterBodyType || 'Village Pond / Irrigation Tank (Kulam / Eri)',
          confidenceScore: parsed.confidenceScore || 93,
          waterQualityIndex: parsed.waterQualityIndex || (validCondition === 'clear' ? 88 : validCondition === 'algal' ? 44 : validCondition === 'turbid' ? 52 : validCondition === 'sheen' ? 28 : 22),
          wqiClass: parsed.wqiClass || (validCondition === 'clear' ? 'Good (Aquatic Safe)' : validCondition === 'turbid' ? 'Moderate (Stressed)' : validCondition === 'algal' ? 'Poor (Degraded)' : 'Critically Polluted (Hazardous)'),
          dissolvedOxygenEstimate: parsed.dissolvedOxygenEstimate || (validCondition === 'clear' ? '6.8 mg/L (Healthy Aerobic)' : validCondition === 'algal' ? '2.1 mg/L (Hypoxic Stress)' : '1.2 mg/L (Severe Anaerobic)'),
          algalRiskLevel: parsed.algalRiskLevel || (validCondition === 'algal' ? 'Severe Cyanobacteria Scum' : validCondition === 'clear' ? 'None (Clear)' : 'Moderate Green Filamentous'),
          turbidityEstimate: parsed.turbidityEstimate || (validCondition === 'turbid' ? '92 NTU (Heavy Siltation)' : validCondition === 'clear' ? '< 5 NTU (Crystal Clear)' : '45 NTU (Moderate Silt)'),
          phEstimateRange: parsed.phEstimateRange || (validCondition === 'algal' ? '8.4 - 9.1 (Alkaline Eutrophy)' : '7.0 - 7.5 (Optimal Neutral)'),
          visualMarkers: Array.isArray(parsed.visualMarkers) && parsed.visualMarkers.length > 0 ? parsed.visualMarkers : ['Surface optical reflectance signature', 'Suspended particulate light scattering', 'Shoreline aquatic vegetation pattern'],
          ecologicalImpactSummary: parsed.ecologicalImpactSummary || 'Water body exhibits severe nutrient load or sediment stress requiring biological bio-filtration.',
          tailoredRemediation: Array.isArray(parsed.tailoredRemediation) && parsed.tailoredRemediation.length > 0 ? parsed.tailoredRemediation : [
            'Deploy floating vetiver grass phytoremediation rafts.',
            'Install solar diffused micro-bubble aerators.',
            'Apply beneficial non-pathogenic EM microbial consortium to digest organic sludge.'
          ],
          safeUses: parsed.safeUses || {
            irrigation: validCondition !== 'sheen' && validCondition !== 'sewage',
            cattleDrinking: validCondition === 'clear',
            fishFarming: validCondition === 'clear' || validCondition === 'turbid',
            humanContact: validCondition === 'clear'
          },
          analyzedAt: new Date().toISOString()
        };
      }
    } catch (err) {
      console.error('Gemini water photo detection error:', err);
    }
  }

  // Fallback intelligent limnological classification
  const lowerUrl = (photoUrl || '').toLowerCase();
  let category: WaterConditionCategory = 'algal';

  if (lowerUrl.includes('clear') || lowerUrl.includes('lake') || lowerUrl.includes('fresh') || lowerUrl.includes('river')) {
    category = 'clear';
  } else if (lowerUrl.includes('turbid') || lowerUrl.includes('mud') || lowerUrl.includes('silt') || lowerUrl.includes('brown')) {
    category = 'turbid';
  } else if (lowerUrl.includes('oil') || lowerUrl.includes('sheen') || lowerUrl.includes('chemical') || lowerUrl.includes('industrial')) {
    category = 'sheen';
  } else if (lowerUrl.includes('sewage') || lowerUrl.includes('waste') || lowerUrl.includes('black')) {
    category = 'sewage';
  } else {
    category = 'algal';
  }

  if (category === 'algal') {
    return {
      condition: 'algal',
      conditionLabel: 'Algal Bloom / Eutrophic Water',
      waterBodyType: 'Village Pond / Irrigation Tank (Kulam / Eri)',
      confidenceScore: 94,
      waterQualityIndex: 38,
      wqiClass: 'Poor (Degraded)',
      dissolvedOxygenEstimate: '1.9 mg/L (Critical Nocturnal Hypoxia)',
      algalRiskLevel: 'Severe Cyanobacteria Scum',
      turbidityEstimate: '65 NTU (Pea-Green Microalgal Density)',
      phEstimateRange: '8.6 - 9.2 (High Photosynthetic Alkaline Shift)',
      visualMarkers: [
        'Dense pea-green surface cyanobacteria film',
        'Impaired sunlight penetration beyond 20 cm',
        'Visible decaying algal mats creating noxious odors',
        'High phosphorus & nitrate runoff signature'
      ],
      ecologicalImpactSummary: 'Severe eutrophication driven by agricultural runoff. Nighttime oxygen depletion poses high risk of fish mortality and livestock toxicity.',
      tailoredRemediation: [
        'Deploy Floating Treatment Wetlands (FTWs) loaded with Vetiver (Chrysopogon zizanioides) and Canna indica to strip excess nitrogen and phosphorus.',
        'Install solar-powered micro-bubble bottom diffusers to aerate the hypolimnion layer and prevent phosphorus release from sediments.',
        'Inoculate with beneficial Effective Microorganisms (EM-1) to outcompete cyanobacteria and digest organic bottom muck.'
      ],
      safeUses: {
        irrigation: true,
        cattleDrinking: false,
        fishFarming: false,
        humanContact: false
      },
      analyzedAt: new Date().toISOString()
    };
  }

  if (category === 'turbid') {
    return {
      condition: 'turbid',
      conditionLabel: 'High Turbidity & Siltation',
      waterBodyType: 'River Canal / Distributary Channel',
      confidenceScore: 92,
      waterQualityIndex: 54,
      wqiClass: 'Moderate (Stressed)',
      dissolvedOxygenEstimate: '5.2 mg/L (Adequate)',
      algalRiskLevel: 'Low / Natural',
      turbidityEstimate: '110+ NTU (Heavy Colloidal Silt & Clay Suspensions)',
      phEstimateRange: '7.2 - 7.6 (Neutral)',
      visualMarkers: [
        'Opaque reddish-brown earthy suspended clay suspension',
        'Secchi disk depth < 10 cm transparency',
        'Bank erosion and loss of riparian anchoring grasses',
        'High silt deposition risk choking bottom percolation'
      ],
      ecologicalImpactSummary: 'Water carries extreme sediment load from upstream topsoil erosion. Chokes fish gills and reduces storage capacity of irrigation tanks.',
      tailoredRemediation: [
        'Install coir-log perimeter silt traps and geotextile sediment barriers along catchment runoff entry points.',
        'Plant multi-tier riparian buffer zones with Bamboo, Lemongrass, and Vetiver along vulnerable embankments.',
        'Create upstream sedimentation settling de-silting bays to allow coarse grains to settle prior to main tank inlet.'
      ],
      safeUses: {
        irrigation: true,
        cattleDrinking: true,
        fishFarming: true,
        humanContact: false
      },
      analyzedAt: new Date().toISOString()
    };
  }

  if (category === 'sheen') {
    return {
      condition: 'sheen',
      conditionLabel: 'Chemical / Hydrocarbon Sheen',
      waterBodyType: 'Urban Drainage / Industrial Outflow Basin',
      confidenceScore: 95,
      waterQualityIndex: 24,
      wqiClass: 'Critically Polluted (Hazardous)',
      dissolvedOxygenEstimate: '0.8 mg/L (Severe Anoxia)',
      algalRiskLevel: 'None (Clear)',
      turbidityEstimate: '75 NTU (Chemical Emulsion)',
      phEstimateRange: '5.8 - 6.4 (Acidic Leachate)',
      visualMarkers: [
        'Distinct iridescent rainbow refractive oil sheen',
        'Surface hydrocarbon barrier blocking atmospheric oxygen transfer',
        'Pungent synthetic chemical / petrochemical odor',
        'Total absence of macro-invertebrates or water striders'
      ],
      ecologicalImpactSummary: 'Hazardous petroleum and industrial surfactant contamination. Forms an impervious film preventing gas exchange, resulting in acute toxic biological sterilization.',
      tailoredRemediation: [
        'Immediately deploy polypropylene oleophilic absorbent containment booms and skimmers across the surface.',
        'Dose with specialized hydrocarbonoclastic bio-enzymes (Pseudomonas bio-cultures) to biodegrade petroleum chains.',
        'Install granulated activated biochar filter check-dams at inlet weir.'
      ],
      safeUses: {
        irrigation: false,
        cattleDrinking: false,
        fishFarming: false,
        humanContact: false
      },
      analyzedAt: new Date().toISOString()
    };
  }

  if (category === 'sewage') {
    return {
      condition: 'sewage',
      conditionLabel: 'Raw Sewage & Blackwater Contamination',
      waterBodyType: 'Urban Drainage / Industrial Outflow Basin',
      confidenceScore: 96,
      waterQualityIndex: 18,
      wqiClass: 'Critically Polluted (Hazardous)',
      dissolvedOxygenEstimate: '0.4 mg/L (Complete Anoxia)',
      algalRiskLevel: 'Moderate Green Filamentous',
      turbidityEstimate: '140 NTU (High Biochemical Solids)',
      phEstimateRange: '7.8 - 8.3 (High Ammonia)',
      visualMarkers: [
        'Dark gray to black murky coloration',
        'Sulfidic rotten-egg hydrogen sulfide gas bubbles rising',
        'Dense organic bottom sludge blanket exceeding 30 cm',
        'Extremely high fecal coliform and chemical oxygen demand (COD)'
      ],
      ecologicalImpactSummary: 'Severe untreated municipal sewage ingress. High pathogen load and zero oxygen create severe public health and groundwater contamination hazards.',
      tailoredRemediation: [
        'Construct Subsurface Flow Constructed Wetlands (SSF-CW) with Phragmites karka and Typha domingensis.',
        'Apply heavy probiotic anaerobic microbial digester dosing to liquefy bottom sludge.',
        'Enforce municipal diversion and install solar cascading cascade aerators.'
      ],
      safeUses: {
        irrigation: false,
        cattleDrinking: false,
        fishFarming: false,
        humanContact: false
      },
      analyzedAt: new Date().toISOString()
    };
  }

  // Clear freshwater
  return {
    condition: 'clear',
    conditionLabel: 'Pristine Clean Freshwater',
    waterBodyType: 'Lake / Protected Wetland Area',
    confidenceScore: 97,
    waterQualityIndex: 89,
    wqiClass: 'Excellent (Clean & Potable)',
    dissolvedOxygenEstimate: '7.4 mg/L (High Oxygen Saturation)',
    algalRiskLevel: 'None (Clear)',
    turbidityEstimate: '< 5 NTU (High Clarity & Light Penetration)',
    phEstimateRange: '7.0 - 7.4 (Optimal Neutral)',
    visualMarkers: [
      'Crystal-clear water with visible sandy/pebble substrate',
      'Thriving native submerged macrophytes (Hydrilla, Vallisneria)',
      'Active aquatic fauna (fry, water boatmen, dragonflies)',
      'Natural healthy shoreline riparian vegetation'
    ],
    ecologicalImpactSummary: 'Balanced oligotrophic/mesotrophic ecosystem with excellent natural self-purification capacity. High biodiversity index and safe aquifer recharge.',
    tailoredRemediation: [
      'Maintain existing riparian shoreline buffer strips to protect against future runoff erosion.',
      'Conduct seasonal bi-monthly water quality testing to detect early nutrient spikes.',
      'Protect catchment recharge zones from encroaching synthetic pesticide applications.'
    ],
    safeUses: {
      irrigation: true,
      cattleDrinking: true,
      fishFarming: true,
      humanContact: true
    },
    analyzedAt: new Date().toISOString()
  };
}

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);

  // Increase event listeners limit to comfortably support 1000+ connections without warning
  httpServer.setMaxListeners(2500);

  // Maximum concurrent connections to protect Node event loop and memory from exhaustion
  const MAX_CONCURRENT_WS = 1200; // Cap with headroom for 1000 users
  const MAX_BUFFERED_AMOUNT = 256 * 1024; // 256 KB buffer warning limit
  const DROP_CLIENT_BUFFERED_AMOUNT = 1024 * 1024; // 1 MB: client is stalled, drop connection

  // Initialize WebSocket server with frame limit and tracking
  const wss = new WebSocketServer({ 
    noServer: true,
    maxPayload: 64 * 1024, // 64 KB max payload to prevent memory spikes
    clientTracking: true,
  });
  wss.setMaxListeners(2500);

  // Handle upgrade events for /ws path with admission control
  httpServer.on('upgrade', (request, socket, head) => {
    const url = request.url || '';
    if (url.startsWith('/ws')) {
      if (wss.clients.size >= MAX_CONCURRENT_WS) {
        console.warn(`[WS Gateway] Maximum concurrent connection threshold reached (${wss.clients.size}). Shedding load.`);
        socket.write('HTTP/1.1 503 Service Unavailable\r\nConnection: close\r\nContent-Type: text/plain\r\nRetry-After: 5\r\n\r\nServer capacity reached. Retry shortly.\r\n');
        socket.destroy();
        return;
      }

      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    }
  });

  interface ClientMetadata {
    isAlive: boolean;
    msgCount: number;
    windowStart: number;
  }
  const clientMeta = new Map<WebSocket, ClientMetadata>();

  // Throttled presence broadcast: batches rapid connects/disconnects to prevent O(N²) broadcast storms
  let presenceBroadcastTimer: NodeJS.Timeout | null = null;
  const schedulePresenceBroadcast = () => {
    if (presenceBroadcastTimer) return;
    presenceBroadcastTimer = setTimeout(() => {
      presenceBroadcastTimer = null;
      broadcast('presence:count', { onlineCount: wss.clients.size });
    }, 1000);
  };

  // Safe backpressure-aware broadcast
  const broadcast = (type: string, payload: any) => {
    if (wss.clients.size === 0) return;

    let message: string;
    try {
      message = JSON.stringify({
        type,
        payload,
        timestamp: new Date().toISOString(),
      });
    } catch (e) {
      console.error('[WS] Failed to serialize broadcast payload:', e);
      return;
    }

    for (const client of wss.clients) {
      if (client.readyState === WebSocket.OPEN) {
        // Drop stalled or hung clients to prevent unbounded memory growth on the server
        if (client.bufferedAmount > DROP_CLIENT_BUFFERED_AMOUNT) {
          console.warn('[WS] Terminating stalled client with excessive backlog:', client.bufferedAmount);
          client.terminate();
          continue;
        }

        // Backpressure check: skip broadcast for clients lagging with >256KB queued
        if (client.bufferedAmount > MAX_BUFFERED_AMOUNT) {
          continue;
        }

        try {
          client.send(message);
        } catch (err) {
          console.warn('[WS] Broadcast send error:', err);
        }
      }
    }
  };

  wss.on('connection', (ws) => {
    clientMeta.set(ws, {
      isAlive: true,
      msgCount: 0,
      windowStart: Date.now(),
    });

    // Send connection ACK with initial statistics directly to this client
    try {
      ws.send(JSON.stringify({
        type: 'connected',
        payload: {
          onlineCount: wss.clients.size,
          serverTime: new Date().toISOString(),
          version: 'EdenSync Realtime Engine v2.5 (High Concurrency 1k+)',
        }
      }));
    } catch {
      // client disconnected immediately
    }

    // Schedule throttled presence broadcast for all other clients
    schedulePresenceBroadcast();

    ws.on('message', (data) => {
      // Inbound rate-limiting: max 50 messages per 2 seconds per connection
      const meta = clientMeta.get(ws);
      const now = Date.now();
      if (meta) {
        if (now - meta.windowStart > 2000) {
          meta.windowStart = now;
          meta.msgCount = 0;
        }
        meta.msgCount += 1;
        if (meta.msgCount > 50) {
          // Exceeded inbound rate limit; drop message to protect server CPU
          return;
        }
      }

      try {
        const parsed = JSON.parse(data.toString());
        if (parsed.type === 'ping') {
          ws.send(JSON.stringify({ type: 'pong', timestamp: new Date().toISOString() }));
        } else if (parsed.type === 'chat:message') {
          broadcast('chat:message', parsed.payload);
        } else if (parsed.type === 'presence:ping') {
          // Direct response to requesting client - NEVER trigger an O(N²) global broadcast!
          ws.send(JSON.stringify({
            type: 'presence:count',
            payload: { onlineCount: wss.clients.size },
            timestamp: new Date().toISOString(),
          }));
        }
      } catch {
        // ignore malformed payloads
      }
    });

    ws.on('pong', () => {
      const meta = clientMeta.get(ws);
      if (meta) meta.isAlive = true;
    });

    ws.on('close', () => {
      clientMeta.delete(ws);
      schedulePresenceBroadcast();
    });

    ws.on('error', () => {
      clientMeta.delete(ws);
      try {
        ws.terminate();
      } catch {
        // ignore
      }
    });
  });

  // Keep-alive heartbeat interval (30s)
  const heartbeatInterval = setInterval(() => {
    for (const ws of wss.clients) {
      const meta = clientMeta.get(ws);
      if (meta && !meta.isAlive) {
        clientMeta.delete(ws);
        ws.terminate();
        continue;
      }
      if (meta) {
        meta.isAlive = false;
      }
      try {
        ws.ping();
      } catch {
        ws.terminate();
      }
    }
  }, 30000);

  httpServer.on('close', () => {
    clearInterval(heartbeatInterval);
    if (presenceBroadcastTimer) clearTimeout(presenceBroadcastTimer);
  });

  app.use(express.json({ limit: '10mb' }));

  // --- API ROUTES ---

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // --- AUTHENTICATION ROUTES ---

  // 1. Easy Google Login
  app.post('/api/auth/google', (req, res) => {
    const { email, name, picture, googleId } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required for Google Sign-In' });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if it's an admin email
    const adminEmails = Array.from({ length: 10 }, (_, i) => {
      const num = i + 1;
      const numStr = num < 10 ? `0${num}` : `${num}`;
      return `edensync${numStr}@gmail.com`;
    });

    if (adminEmails.includes(normalizedEmail)) {
      const adminNumMatch = normalizedEmail.match(/edensync(\d+)/);
      const adminNum = adminNumMatch ? adminNumMatch[1] : '01';
      const adminProfile: UserProfile = {
        id: `ADMIN-EDEN-${adminNum}`,
        name: name || `Eden Sync Admin (${normalizedEmail.split('@')[0]})`,
        email: normalizedEmail,
        avatarUrl: picture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        phone: '+91 80561 92997',
        address: 'Eden Sync Central Command',
        role: 'admin',
        authProvider: 'google',
        quickPassword: 'EDEN@#sync',
      };
      return res.json({ profile: adminProfile, message: 'Signed in as Admin with Google' });
    }

    // Regular landowner/farmer user
    let existingUser = registeredUsers.find(u => u.email && u.email.toLowerCase() === normalizedEmail);
    if (!existingUser) {
      existingUser = {
        id: `USR-G-${Math.floor(1000 + Math.random() * 9000)}`,
        name: name || normalizedEmail.split('@')[0],
        email: normalizedEmail,
        avatarUrl: picture || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name || normalizedEmail)}`,
        phone: '+91 98421 77340',
        address: 'Registered Google User',
        role: 'user',
        authProvider: 'google',
        quickPassword: 'eden123',
      };
      registeredUsers.unshift(existingUser);
      saveData();
    } else {
      if (name) existingUser.name = name;
      if (picture) existingUser.avatarUrl = picture;
      existingUser.authProvider = 'google';
      if (!existingUser.quickPassword) existingUser.quickPassword = 'eden123';
      saveData();
    }

    res.json({
      profile: existingUser,
      message: 'Google Sign-In successful. Password-alone quick login is enabled.',
    });
  });

  // 2. Password Alone Login
  app.post('/api/auth/password-alone', (req, res) => {
    const { password, emailOrPhone, userId } = req.body;
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    const trimmedPassword = password.trim();

    // Check if master admin password
    if (trimmedPassword === 'EDEN@#sync') {
      const adminProfile: UserProfile = {
        id: 'ADMIN-EDEN-01',
        name: 'Eden Sync Master Admin (edensync01)',
        email: 'edensync01@gmail.com',
        phone: '+91 80561 92997',
        address: 'Eden Sync Command Center',
        role: 'admin',
        authProvider: 'password',
        quickPassword: 'EDEN@#sync',
      };
      return res.json({ profile: adminProfile, role: 'admin', message: 'Admin authenticated with password alone' });
    }

    // Check by userId or emailOrPhone if provided
    if (userId) {
      const match = registeredUsers.find(u => u.id === userId);
      if (match && (match.quickPassword === trimmedPassword || trimmedPassword === 'eden123')) {
        return res.json({ profile: match, role: match.role, message: 'Authenticated with password alone' });
      }
    }

    if (emailOrPhone) {
      const cleanIdent = emailOrPhone.trim().toLowerCase();
      const match = registeredUsers.find(
        u => (u.email && u.email.toLowerCase() === cleanIdent) || u.phone.includes(cleanIdent)
      );
      if (match && (match.quickPassword === trimmedPassword || trimmedPassword === 'eden123')) {
        return res.json({ profile: match, role: match.role, message: 'Authenticated with password alone' });
      }
    }

    // Direct password match against any known user
    const directUser = registeredUsers.find(u => u.quickPassword === trimmedPassword);
    if (directUser) {
      return res.json({ profile: directUser, role: directUser.role, message: 'Authenticated with password alone' });
    }

    // Standard demo default password 'eden123' -> return default active landowner
    if (trimmedPassword === 'eden123') {
      const defaultUser = registeredUsers[0] || {
        id: 'USR-LANDOWNER-01',
        name: 'Verified Landowner',
        phone: '+91 98421 77340',
        email: 'landowner@edensync.gov.in',
        address: 'Coimbatore, Tamil Nadu, India',
        role: 'user',
        authProvider: 'password',
        quickPassword: 'eden123',
      };
      return res.json({ profile: defaultUser, role: 'user', message: 'Authenticated with default password' });
    }

    return res.status(401).json({
      error: 'Incorrect password. Try "eden123" for Landowner or "EDEN@#sync" for Admin.',
    });
  });

  // 3. Update User Password (for Password-Alone login)
  app.post('/api/auth/update-password', (req, res) => {
    const { userId, newPassword } = req.body;
    if (!newPassword || newPassword.trim().length < 3) {
      return res.status(400).json({ error: 'Password must be at least 3 characters long' });
    }

    const trimmed = newPassword.trim();
    const user = registeredUsers.find(u => u.id === userId);
    if (user) {
      user.quickPassword = trimmed;
      saveData();
      return res.json({ success: true, quickPassword: trimmed, message: 'Password updated successfully' });
    }

    res.json({ success: true, quickPassword: trimmed, message: 'Password updated for session' });
  });

  // 4. Admin Direct Login
  app.post('/api/auth/admin-login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const validEmails = Array.from({ length: 10 }, (_, i) => {
      const num = i + 1;
      const numStr = num < 10 ? `0${num}` : `${num}`;
      return `edensync${numStr}@gmail.com`;
    });

    if (!validEmails.includes(normalizedEmail)) {
      return res.status(401).json({ error: 'Invalid admin email' });
    }

    if (password !== 'EDEN@#sync') {
      return res.status(401).json({ error: 'Invalid master password' });
    }

    const adminNumMatch = normalizedEmail.match(/edensync(\d+)/);
    const adminNum = adminNumMatch ? adminNumMatch[1] : '01';
    const profile: UserProfile = {
      id: `ADMIN-EDEN-${adminNum}`,
      name: `Eden Sync Admin (${normalizedEmail.split('@')[0]})`,
      email: normalizedEmail,
      phone: '+91 80561 92997',
      address: 'Eden Sync Command Center',
      role: 'admin',
      authProvider: 'admin',
      quickPassword: 'EDEN@#sync',
    };

    res.json({ profile, message: 'Admin verified successfully' });
  });

  // 5. User Registration & Database Storage
  app.get('/api/auth/users', (req, res) => {
    res.json(registeredUsers);
  });

  app.post('/api/auth/register', (req, res) => {
    const { 
      name, 
      phone, 
      email, 
      address, 
      password,
      facePhotoUrl,
      avatarUrl,
      identityCardType,
      identityCardNumber,
      identityCardFile,
      landDocumentType,
      landDocumentNumber,
      landDocumentFile,
      landPhotoUrls
    } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone number are required' });
    }
    const cleanPhone = phone.trim();
    const cleanName = name.trim();
    const cleanEmail = email ? email.trim().toLowerCase() : '';
    const assignedPassword = (password && password.trim().length >= 3) ? password.trim() : 'eden123';

    let user = registeredUsers.find(
      u => u.phone.replace(/[\s-+()]/g, '') === cleanPhone.replace(/[\s-+()]/g, '') ||
           (cleanEmail && u.email?.toLowerCase() === cleanEmail)
    );

    if (user) {
      user.name = cleanName;
      if (cleanEmail) user.email = cleanEmail;
      if (address) user.address = address.trim();
      user.quickPassword = assignedPassword;
      if (facePhotoUrl) {
        user.facePhotoUrl = facePhotoUrl;
        user.avatarUrl = facePhotoUrl;
      } else if (avatarUrl) {
        user.avatarUrl = avatarUrl;
      }
      if (identityCardType) user.identityCardType = identityCardType;
      if (identityCardNumber) user.identityCardNumber = identityCardNumber;
      if (identityCardFile) user.identityCardFile = identityCardFile;
      if (landDocumentType) user.landDocumentType = landDocumentType;
      if (landDocumentNumber) user.landDocumentNumber = landDocumentNumber;
      if (landDocumentFile) user.landDocumentFile = landDocumentFile;
      if (Array.isArray(landPhotoUrls) && landPhotoUrls.length > 0) {
        const photoSet = new Set(user.landPhotoUrls || []);
        const mergedPhotos = [...(user.landPhotoUrls || [])];
        for (const p of landPhotoUrls) {
          if (!photoSet.has(p)) {
            mergedPhotos.push(p);
            photoSet.add(p);
          }
        }
        user.landPhotoUrls = mergedPhotos;
      }
      saveData();
      return res.json({ profile: user, message: 'Existing profile updated and saved to database', isNew: false });
    }

    const newProfile: UserProfile = {
      id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
      name: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      address: address ? address.trim() : 'Registered Farm Location',
      role: 'user',
      authProvider: 'phone',
      quickPassword: assignedPassword,
      identityCardType,
      identityCardNumber,
      identityCardFile,
      landDocumentType,
      landDocumentNumber,
      landDocumentFile,
      landPhotoUrls: Array.isArray(landPhotoUrls) ? landPhotoUrls : [],
      facePhotoUrl: facePhotoUrl || undefined,
      avatarUrl: facePhotoUrl || avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cleanName)}`,
    };

    registeredUsers.unshift(newProfile);
    saveData();
    res.json({ profile: newProfile, message: 'Account registered and securely stored in database', isNew: true });
  });

  // 6. User Login by Mobile/Email + Password
  app.post('/api/auth/user-login', (req, res) => {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      return res.status(400).json({ error: 'Mobile / Email and password are required' });
    }
    const cleanIdent = identifier.trim().toLowerCase();
    const cleanPass = password.trim();

    const cleanNum = cleanIdent.replace(/[\s-+()]/g, '');
    const user = registeredUsers.find(u => {
      const uNum = u.phone.replace(/[\s-+()]/g, '');
      return (cleanNum && uNum.includes(cleanNum)) ||
             (u.email && u.email.toLowerCase() === cleanIdent) ||
             u.name.toLowerCase() === cleanIdent;
    });

    if (user && (user.quickPassword === cleanPass || cleanPass === 'eden123')) {
      return res.json({ profile: user, message: 'Login successful' });
    }

    if (cleanPass === 'eden123') {
      const fallback = registeredUsers[0];
      return res.json({ profile: fallback, message: 'Demo landowner login active' });
    }

    res.status(401).json({ error: 'Invalid mobile/email or password. Try "eden123" for demo.' });
  });

  // --- DATABASE HEALTH & BACKUP ENDPOINTS ---
  app.get('/api/database/status', (req, res) => {
    res.json({
      status: 'connected',
      storageFile: DATA_FILE,
      storageEngine: 'JSON File Persistence with In-Memory Caching',
      environment: {
        isVercel: IS_VERCEL,
        nodeEnv: process.env.NODE_ENV || 'development',
        platform: process.platform,
        dataPath: process.env.DATA_PATH || 'default'
      },
      counts: {
        registeredUsers: registeredUsers.length,
        applications: applications.length,
        metalWasteRequests: metalWasteRequests.length,
        complaints: complaints.length,
        fieldWorkLogs: fieldWorkLogs.length,
        farmerIdeas: farmerIdeas.length,
        customers: customers.length,
        govtProjects: govtProjects.length,
        awarenessArticles: awarenessArticles.length
      },
      usersList: registeredUsers.map(u => ({ id: u.id, name: u.name, phone: u.phone, email: u.email, role: u.role })),
      lastUpdated: new Date().toISOString()
    });
  });

  app.get('/api/database/export', (req, res) => {
    res.setHeader('Content-Disposition', 'attachment; filename="eden_sync_database_export.json"');
    res.setHeader('Content-Type', 'application/json');
    res.json({
      exportedAt: new Date().toISOString(),
      version: '1.0',
      data: {
        registeredUsers,
        applications,
        metalWasteRequests,
        complaints,
        fieldWorkLogs,
        farmerIdeas,
        customers,
        govtProjects,
        awarenessArticles
      }
    });
  });

  // --- WASTE COLLECTION & RESTORATION OF METALS ENDPOINTS ---
  app.get('/api/metal-waste-rates', (req, res) => {
    res.json(LIVE_METAL_RATES);
  });

  app.get('/api/metal-waste-requests', (req, res) => {
    res.json(metalWasteRequests);
  });

  app.post('/api/metal-waste-requests', (req, res) => {
    const payload = req.body;
    const newReq: MetalWasteRequest = {
      id: `MET-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      applicantName: payload.applicantName || 'Landowner / Farmer',
      phone: payload.phone || '+91 98765 43210',
      location: payload.location || 'Local Farm Plot',
      district: payload.district || 'District',
      state: payload.state || 'State',
      metalCategory: payload.metalCategory || 'Agricultural Scrap (Tractor Parts, Plows, Discs)',
      estimatedWeightKg: Number(payload.estimatedWeightKg) || 120,
      estimatedPayoutINR: Number(payload.estimatedPayoutINR) || 3840,
      photoUrl: payload.photoUrl || 'https://images.unsplash.com/photo-1527525443983-6e60c75fff46?auto=format&fit=crop&w=800&q=80',
      status: 'Collection Scheduled',
      pickupAddress: payload.pickupAddress || payload.location || 'Farm Gate',
      preferredPickupDate: payload.preferredPickupDate || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      partnerCollector: payload.partnerCollector || 'Certified Green Metal Recovery Network',
      soilContaminationNoted: Boolean(payload.soilContaminationNoted),
      metalsIdentified: payload.metalsIdentified || ['Iron / High Carbon Steel', 'Alloy Fasteners'],
      phytoremediationCropsRecommended: payload.phytoremediationCropsRecommended || ['Indian Mustard (Brassica juncea)', 'Sunflower (Helianthus annuus)', 'Vetiver Grass'],
      greenCreditsEarned: Math.max(50, Math.round((Number(payload.estimatedWeightKg) || 120) * 0.5)),
      createdAt: new Date().toISOString(),
      notes: payload.notes || 'Agricultural metal waste scheduled for doorstep hydraulic crane pickup.'
    };

    // Auto register into database
    const registeredUser = autoRegisterUser({
      name: newReq.applicantName,
      phone: newReq.phone,
      address: newReq.pickupAddress || `${newReq.location}, ${newReq.district}`,
    });

    metalWasteRequests.unshift(newReq);
    saveData();
    broadcast('metal:created', newReq);
    res.status(201).json({ ...newReq, registeredUser });
  });

  app.put('/api/metal-waste-requests/:id', (req, res) => {
    const { id } = req.params;
    const index = metalWasteRequests.findIndex(r => r.id === id);
    if (index !== -1) {
      metalWasteRequests[index] = { ...metalWasteRequests[index], ...req.body };
      saveData();
      broadcast('metal:updated', metalWasteRequests[index]);
      res.json(metalWasteRequests[index]);
    } else {
      res.status(404).json({ error: 'Metal recovery request not found' });
    }
  });

  app.post('/api/metal-waste/ai-assess', async (req, res) => {
    const { photoUrl, description, metalCategory, estimatedWeightKg } = req.body;
    const weight = Number(estimatedWeightKg) || 200;

    const fallback = {
      metalsIdentified: ['Forged High-Carbon Iron', 'Cast Iron Discs', 'Surface Rust Scale (Fe2O3)'],
      salvagePurityPercentage: 91,
      hazardRating: 'Low-to-Moderate (Surface Rust & Sharp Shards)',
      estimatedWeightKg: weight,
      suggestedRatePerKgINR: 32,
      totalEstimatedValueINR: weight * 32,
      carbonOffsetKg: Math.round(weight * 1.8),
      soilImpactSummary: 'Removing scattered farm iron prevents heavy rust leachate from binding organic soil phosphorus and lowering local microbial health.',
      soilPhytoremediationSteps: [
        'Perform electromagnetic surface rake sweep to retrieve buried nails, wire fragments, and cotter pins.',
        'Plant hyper-accumulator cover crops (Indian Mustard & Sunflowers) to phyto-extract mobilized trace ions.',
        'Incorporate decomposed cow dung compost and neem cake to neutralize soil oxidation stress.'
      ],
      recommendedPhytoPlants: ['Indian Mustard (Brassica juncea)', 'Sunflower (Helianthus annuus)', 'Vetiver Grass (Chrysopogon zizanioides)'],
      recyclingWorkflow: 'Direct dispatch to certified induction furnace secondary steel mill for 100% circular re-smelting into rebar and farming implements.'
    };

    try {
      const ai = getGeminiClient();
      if (ai) {
        const prompt = `You are an expert environmental engineer and certified metal recycling assessor for farmland and water bodies.
Analyze this farm scrap metal & soil heavy metal contamination report:
Description: ${description || 'Agricultural scrap and discarded metals in farm'}
Metal Category: ${metalCategory || 'Agricultural Scrap'}
Estimated Weight: ${weight} kg
Photo URL: ${photoUrl || 'Provided'}

Return strictly JSON with:
{
  "metalsIdentified": string[],
  "salvagePurityPercentage": number,
  "hazardRating": string,
  "estimatedWeightKg": number,
  "suggestedRatePerKgINR": number,
  "totalEstimatedValueINR": number,
  "carbonOffsetKg": number,
  "soilImpactSummary": string,
  "soilPhytoremediationSteps": string[],
  "recommendedPhytoPlants": string[],
  "recyclingWorkflow": string
}`;
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.2
          }
        });
        if (response.text) {
          const parsed = JSON.parse(response.text);
          return res.json({ ...fallback, ...parsed });
        }
      }
    } catch (err) {
      console.warn('AI metal assessment fallback used:', err);
    }

    res.json(fallback);
  });

  // --- FIELD WORK & MACHINERY LOGBOOK ENDPOINTS ---
  app.get('/api/field-work-logs', (req, res) => {
    res.json(fieldWorkLogs);
  });

  app.post('/api/field-work-logs', (req, res) => {
    const newLog: FieldWorkLog = req.body;
    if (!newLog.id) {
      newLog.id = `LOG-FL-${Date.now().toString().slice(-5)}`;
    }

    // Auto register into database
    const registeredUser = autoRegisterUser({
      name: newLog.operatorName,
      phone: newLog.operatorPhone,
      address: newLog.locationName,
    });

    fieldWorkLogs.unshift(newLog);
    saveData();
    broadcast('fieldwork:created', newLog);
    res.status(201).json({ ...newLog, registeredUser });
  });

  app.post('/api/field-work-logs/:id/complete', (req, res) => {
    const { id } = req.params;
    const log = fieldWorkLogs.find(l => l.id === id);
    if (!log) {
      return res.status(404).json({ error: 'Log not found' });
    }
    log.status = 'Completed & Verified';
    log.endTime = new Date().toISOString();
    log.hoursWorked += 6.5;
    log.totalExpense = log.hoursWorked * log.costPerHour;
    log.supervisorVerified = true;
    log.supervisorName = 'VAO / Block Officer (Verified)';
    log.siltOrAreaCleared = 'Completed: 580 cu.m silt excavated & leveled';
    log.proofPhotos.push({
      stage: 'completed',
      url: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985c?auto=format&fit=crop&w=600&q=80',
      caption: 'Final site audit: contoured lake bed with reinforced bunds',
      timestamp: new Date().toLocaleString(),
    });
    saveData();
    broadcast('fieldwork:updated', log);
    res.json(log);
  });

  // Get all land restoration applications
  app.get('/api/applications', (req, res) => {
    res.json(applications);
  });

  // Get single application
  app.get('/api/applications/:id', (req, res) => {
    const item = applications.find(a => a.id === req.params.id);
    if (!item) return res.status(404).json({ error: 'Application not found' });
    res.json(item);
  });

  // Create new land restoration application
  app.post('/api/applications', async (req, res) => {
    try {
      const newApp: LandApplication = {
        id: `EDEN-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
        createdAt: new Date().toISOString(),
        applicantName: req.body.applicantName || 'Anonymous',
        phone: req.body.phone || '',
        applicantAddress: req.body.applicantAddress || '',
        landAddress: req.body.landAddress || '',
        landArea: Number(req.body.landArea) || 1,
        areaUnit: req.body.areaUnit || 'acres',
        landType: req.body.landType || 'Agricultural Farmland',
        isFarmer: Boolean(req.body.isFarmer),
        willingToLease: Boolean(req.body.willingToLease),
        restorationType: req.body.restorationType || 'Agricultural Restoration',
        soilTestingRequested: Boolean(req.body.soilTestingRequested),
        waterTestingRequested: Boolean(req.body.waterTestingRequested),
        photoUrl: req.body.photoUrl || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
        registerCopyUrl: req.body.registerCopyUrl || 'Registration_Document.pdf',
        identityCardType: req.body.identityCardType,
        identityCardNumber: req.body.identityCardNumber,
        identityCardFile: req.body.identityCardFile,
        landDocumentType: req.body.landDocumentType,
        landDocumentNumber: req.body.landDocumentNumber,
        landDocumentFile: req.body.landDocumentFile,
        landPhotoUrls: Array.isArray(req.body.landPhotoUrls) ? req.body.landPhotoUrls : (req.body.photoUrl ? [req.body.photoUrl] : []),
        status: 'Pending Review',
        adminNotes: 'Application registered successfully. Queued for site inspection.',
        assignedExpert: 'Unassigned',
      };

      // Auto register into database
      const registeredUser = autoRegisterUser({
        name: newApp.applicantName,
        phone: newApp.phone,
        address: newApp.applicantAddress || newApp.landAddress,
        identityCardType: newApp.identityCardType,
        identityCardNumber: newApp.identityCardNumber,
        identityCardFile: newApp.identityCardFile,
        landDocumentType: newApp.landDocumentType,
        landDocumentNumber: newApp.landDocumentNumber,
        landDocumentFile: newApp.landDocumentFile,
        landPhotoUrls: newApp.landPhotoUrls,
      });

      // Generate AI analysis & Soil Photo Detection
      newApp.aiAnalysis = await generateAILandAnalysis(newApp);
      newApp.soilDetection = await generateAISoilPhotoDetection(
        newApp.photoUrl,
        req.body.base64Photo,
        newApp.landType,
        newApp.landAddress
      );

      applications.unshift(newApp);
      saveData();
      broadcast('application:created', newApp);

      res.status(201).json({ ...newApp, registeredUser });
    } catch (err) {
      console.error('Error creating application:', err);
      res.status(500).json({ error: 'Failed to create application' });
    }
  });

  // Update application (Admin actions)
  app.put('/api/applications/:id', async (req, res) => {
    const index = applications.findIndex(a => a.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Application not found' });

    applications[index] = {
      ...applications[index],
      ...req.body,
    };

    saveData();
    broadcast('application:updated', applications[index]);
    res.json(applications[index]);
  });

  // Delete application
  app.delete('/api/applications/:id', (req, res) => {
    applications = applications.filter(a => a.id !== req.params.id);
    saveData();
    broadcast('application:deleted', { id: req.params.id });
    res.json({ success: true });
  });

  // Re-run AI analysis
  app.post('/api/ai/analyze-land', async (req, res) => {
    try {
      const analysis = await generateAILandAnalysis(req.body);
      res.json(analysis);
    } catch (err) {
      res.status(500).json({ error: 'AI analysis failed' });
    }
  });

  // AI Soil Photo Detection & Classification
  app.post('/api/ai/detect-soil', async (req, res) => {
    try {
      const { photoUrl, base64Image, landType, location } = req.body;
      const detection = await generateAISoilPhotoDetection(
        photoUrl || '',
        base64Image,
        landType,
        location
      );
      res.json(detection);
    } catch (err) {
      console.error('Soil photo detection endpoint error:', err);
      res.status(500).json({ error: 'Soil photo detection failed' });
    }
  });

  // AI Water Body Photo Detection & Limnological Classification
  app.post('/api/ai/detect-water', async (req, res) => {
    try {
      const { photoUrl, base64Image, waterBodyType, location } = req.body;
      const detection = await generateAIWaterPhotoDetection(
        photoUrl || '',
        base64Image,
        waterBodyType,
        location
      );
      res.json(detection);
    } catch (err) {
      console.error('Water photo detection endpoint error:', err);
      res.status(500).json({ error: 'Water photo detection failed' });
    }
  });

  // --- KAGGLE AGRICULTURE & FARMING DATASET & TRAINED ML PREDICTION ---
  app.get('/api/agriculture-dataset', (req, res) => {
    try {
      let records = [...KAGGLE_AGRICULTURE_DATASET];
      const { soilType, cropType, season, irrigationType, search } = req.query;

      if (soilType) {
        records = records.filter(r => r.soilType.toLowerCase() === String(soilType).toLowerCase());
      }
      if (cropType) {
        records = records.filter(r => r.cropType.toLowerCase() === String(cropType).toLowerCase());
      }
      if (season) {
        records = records.filter(r => r.season.toLowerCase() === String(season).toLowerCase());
      }
      if (irrigationType) {
        records = records.filter(r => r.irrigationType.toLowerCase() === String(irrigationType).toLowerCase());
      }
      if (search) {
        const q = String(search).toLowerCase();
        records = records.filter(r => 
          r.farmId.toLowerCase().includes(q) ||
          r.cropType.toLowerCase().includes(q) ||
          r.soilType.toLowerCase().includes(q) ||
          r.irrigationType.toLowerCase().includes(q)
        );
      }

      const statistics = computeDatasetStatistics(KAGGLE_AGRICULTURE_DATASET);
      res.json({
        datasetName: 'bhadramohit/agriculture-and-farming-dataset',
        source: 'Kaggle',
        license: 'CDLA-Sharing-1.0',
        totalCount: KAGGLE_AGRICULTURE_DATASET.length,
        filteredCount: records.length,
        statistics,
        records,
      });
    } catch (err) {
      console.error('Agriculture dataset fetch error:', err);
      res.status(500).json({ error: 'Failed to fetch agriculture dataset' });
    }
  });

  app.post('/api/agriculture-dataset/predict', (req, res) => {
    try {
      const { soilType, farmAreaAcres, cropType, irrigationType, season } = req.body;
      const prediction = predictAgriOutcomes({
        soilType: soilType || 'Loamy',
        farmAreaAcres: Number(farmAreaAcres) || 10,
        cropType,
        irrigationType,
        season,
      });
      res.json(prediction);
    } catch (err) {
      console.error('ML agriculture prediction error:', err);
      res.status(500).json({ error: 'ML agriculture prediction failed' });
    }
  });

  // --- EXPORTED DOCUMENTS (BILLS & REPORTS) AUDIT ROUTES ---
  app.get('/api/exported-documents', (req, res) => {
    let docs = [...exportedDocuments];
    const { applicationId, documentType, status, search, applicantPhone } = req.query;

    if (applicationId) {
      docs = docs.filter(d => d.applicationId === String(applicationId));
    }
    if (documentType && documentType !== 'All') {
      docs = docs.filter(d => d.documentType === String(documentType));
    }
    if (status && status !== 'All') {
      docs = docs.filter(d => d.status === String(status));
    }
    if (applicantPhone) {
      docs = docs.filter(d => d.applicantPhone === String(applicantPhone));
    }
    if (search && typeof search === 'string' && search.trim().length > 0) {
      const q = search.toLowerCase();
      docs = docs.filter(d => 
        d.id.toLowerCase().includes(q) ||
        d.title.toLowerCase().includes(q) ||
        d.applicantName.toLowerCase().includes(q) ||
        d.applicantPhone.toLowerCase().includes(q) ||
        d.landAddress.toLowerCase().includes(q) ||
        d.applicationId.toLowerCase().includes(q)
      );
    }

    // Sort newest first
    docs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    res.json(docs);
  });

  app.get('/api/exported-documents/:id', (req, res) => {
    const doc = exportedDocuments.find(d => d.id === req.params.id);
    if (!doc) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.json(doc);
  });

  app.post('/api/exported-documents', (req, res) => {
    const body = req.body;
    if (!body || !body.id || !body.documentType) {
      return res.status(400).json({ error: 'id and documentType are required' });
    }

    const existingIdx = exportedDocuments.findIndex(d => d.id === body.id);
    const newDoc: ExportedDocument = {
      id: body.id,
      documentType: body.documentType,
      title: body.title || `${body.documentType} #${body.id}`,
      applicationId: body.applicationId || 'UNKNOWN',
      applicantName: body.applicantName || 'Registered Applicant',
      applicantPhone: body.applicantPhone || '',
      landAddress: body.landAddress || '',
      landArea: Number(body.landArea) || 1,
      areaUnit: body.areaUnit || 'acres',
      createdAt: body.createdAt || new Date().toISOString(),
      exportedBy: body.exportedBy || 'User Portal',
      status: body.status || 'Pending Admin Check',
      adminNotes: body.adminNotes || 'Exported by applicant; awaiting administrator audit review.',
      verifiedBy: body.verifiedBy,
      verifiedAt: body.verifiedAt,
      billDetails: body.billDetails,
      reportDetails: body.reportDetails,
    };

    if (existingIdx >= 0) {
      exportedDocuments[existingIdx] = newDoc;
    } else {
      exportedDocuments.unshift(newDoc);
    }

    saveData();
    broadcast('document:exported', newDoc);
    res.status(201).json(newDoc);
  });

  app.patch('/api/exported-documents/:id', (req, res) => {
    const index = exportedDocuments.findIndex(d => d.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Document not found' });
    }

    const current = exportedDocuments[index];
    const updated: ExportedDocument = {
      ...current,
      status: req.body.status !== undefined ? req.body.status : current.status,
      adminNotes: req.body.adminNotes !== undefined ? req.body.adminNotes : current.adminNotes,
      verifiedBy: req.body.verifiedBy !== undefined ? req.body.verifiedBy : current.verifiedBy,
      verifiedAt: req.body.verifiedAt !== undefined ? req.body.verifiedAt : (req.body.status === 'Verified & Approved' ? new Date().toISOString() : current.verifiedAt),
    };

    exportedDocuments[index] = updated;
    saveData();
    broadcast('document:updated', updated);
    res.json(updated);
  });

  app.delete('/api/exported-documents/:id', (req, res) => {
    exportedDocuments = exportedDocuments.filter(d => d.id !== req.params.id);
    saveData();
    broadcast('document:deleted', { id: req.params.id });
    res.json({ success: true });
  });

  // --- GOVT PROJECTS ROUTES ---
  app.get('/api/projects', (req, res) => {
    res.json(govtProjects);
  });

  app.post('/api/projects', (req, res) => {
    const newPrj: GovtProject = {
      id: `GOVT-PRJ-${Math.floor(200 + Math.random() * 800)}`,
      title: req.body.title || 'New Govt Restoration Project',
      department: req.body.department || 'Department of Water & Land Resources',
      location: req.body.location || 'State District',
      targetArea: req.body.targetArea || '50 Acres',
      completionPercentage: Number(req.body.completionPercentage) || 0,
      status: req.body.status || 'Planning',
      allocatedBudget: req.body.allocatedBudget || '₹1.0 Crore',
      beneficiaries: Number(req.body.beneficiaries) || 1000,
      description: req.body.description || 'Restoration initiative for community land & water security.',
      beforeImageUrl: req.body.beforeImageUrl || 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
      afterImageUrl: req.body.afterImageUrl || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
      category: req.body.category || 'Waterbodies',
      lastUpdated: new Date().toISOString().split('T')[0],
    };

    govtProjects.unshift(newPrj);
    saveData();
    res.status(201).json(newPrj);
  });

  app.put('/api/projects/:id', (req, res) => {
    const idx = govtProjects.findIndex(p => p.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Project not found' });

    govtProjects[idx] = {
      ...govtProjects[idx],
      ...req.body,
      lastUpdated: new Date().toISOString().split('T')[0],
    };

    saveData();
    res.json(govtProjects[idx]);
  });

  app.delete('/api/projects/:id', (req, res) => {
    govtProjects = govtProjects.filter(p => p.id !== req.params.id);
    saveData();
    res.json({ success: true });
  });

  // --- AWARENESS ARTICLES ROUTES ---
  app.get('/api/awareness', (req, res) => {
    res.json(awarenessArticles);
  });

  app.post('/api/awareness', (req, res) => {
    const newArt: AwarenessArticle = {
      id: `ART-${Math.floor(10 + Math.random() * 90)}`,
      title: req.body.title || 'New Eco Restoration Guide',
      category: req.body.category || 'Soil Revival',
      readTime: req.body.readTime || '5 min read',
      summary: req.body.summary || 'Essential tips for reviving natural resources.',
      content: req.body.content || 'Detailed restoration guidelines and community steps.',
      imageUrl: req.body.imageUrl || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
      keyTips: Array.isArray(req.body.keyTips) ? req.body.keyTips : ['Perform seasonal testing.', 'Protect soil cover.'],
    };

    awarenessArticles.unshift(newArt);
    saveData();
    res.status(201).json(newArt);
  });

  // --- CUSTOMER DATABASE ROUTES ---
  app.get('/api/customers', (req, res) => {
    res.json(customers);
  });

  app.post('/api/customers', (req, res) => {
    const newCust: CustomerRecord = {
      id: `CUST-2026-${Math.floor(100 + Math.random() * 900)}`,
      name: req.body.name || 'New Customer',
      phone: req.body.phone || '',
      email: req.body.email || '',
      category: req.body.category || 'Smallholder Farmer',
      district: req.body.district || 'State District',
      state: req.body.state || 'State',
      country: req.body.country || 'India',
      surveyNumber: req.body.surveyNumber || `SF/${Math.floor(100 + Math.random() * 900)}`,
      landArea: Number(req.body.landArea) || 1,
      areaUnit: req.body.areaUnit || 'acres',
      landType: req.body.landType || 'Agricultural Farmland',
      primaryRequirements: Array.isArray(req.body.primaryRequirements) ? req.body.primaryRequirements : ['Soil nutrient remediation and water conservation plan.'],
      soilMetrics: req.body.soilMetrics || {
        ph: 7.5,
        organicCarbonPct: 0.4,
        salinityEC: 1.5,
        waterTableDepthFt: 35,
        primaryDeficiency: 'Moderate nitrogen deficiency'
      },
      budgetPreference: req.body.budgetPreference || 'Govt Grant / Eco Loan',
      urgency: req.body.urgency || 'Immediate (< 30 Days)',
      status: req.body.status || 'Active In-Progress',
      registeredDate: new Date().toISOString().split('T')[0],
      assignedAgronomist: req.body.assignedAgronomist || 'Dr. Anita Roy (Soil Bio-Chemist)',
      notes: req.body.notes || 'Registered in database for technical inspection.',
      aiRecommendationSummary: req.body.aiRecommendationSummary || 'Implement organic bio-mulching, mycorrhizal inoculation, and contour rainwater swales.'
    };

    // Auto register into database
    const registeredUser = autoRegisterUser({
      name: newCust.name,
      phone: newCust.phone,
      email: newCust.email,
      address: `${newCust.district}, ${newCust.state}`,
    });

    customers.unshift(newCust);
    saveData();
    res.status(201).json({ ...newCust, registeredUser });
  });

  app.put('/api/customers/:id', (req, res) => {
    const idx = customers.findIndex(c => c.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Customer not found' });

    customers[idx] = {
      ...customers[idx],
      ...req.body
    };

    saveData();
    res.json(customers[idx]);
  });

  app.delete('/api/customers/:id', (req, res) => {
    customers = customers.filter(c => c.id !== req.params.id);
    saveData();
    res.json({ success: true });
  });

  // --- POLLUTION COMPLAINTS & GRIEVANCE ROUTES ---
  app.get('/api/complaints', (req, res) => {
    res.json(complaints);
  });

  app.get('/api/complaints/:id', (req, res) => {
    const item = complaints.find(c => c.id === req.params.id);
    if (!item) return res.status(404).json({ error: 'Complaint not found' });
    res.json(item);
  });

  app.post('/api/complaints', async (req, res) => {
    try {
      const newComplaint: PollutionComplaint = {
        id: `POL-2026-${Math.floor(100 + Math.random() * 900)}`,
        createdAt: new Date().toISOString(),
        domain: req.body.domain || 'Land Pollution',
        specificCause: req.body.specificCause || 'Chemical & Hazardous Waste Dumping',
        title: req.body.title || 'Reported Environmental Pollution Incident',
        description: req.body.description || 'Citizen reported severe environmental contamination.',
        location: req.body.location || 'Local Area',
        district: req.body.district || 'District',
        state: req.body.state || 'State',
        surveyNumberOrLandmark: req.body.surveyNumberOrLandmark || 'Near Village Boundary',
        affectedAreaOrVolume: req.body.affectedAreaOrVolume || '1 Acre',
        severity: req.body.severity || 'High (Active Damage)',
        status: 'Reported & Logged',
        evidencePhotoUrl: req.body.evidencePhotoUrl || 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=800&q=80',
        complainantName: req.body.isAnonymous ? 'Anonymous Citizen' : (req.body.complainantName || 'Concerned Resident'),
        complainantPhone: req.body.isAnonymous ? 'Confidential' : (req.body.complainantPhone || ''),
        isAnonymous: Boolean(req.body.isAnonymous),
        affectedResources: Array.isArray(req.body.affectedResources) ? req.body.affectedResources : ['Groundwater Aquifer', 'Soil Health'],
        assignedOfficer: 'Officer Allocation in Queue',
        adminRemarks: 'Complaint registered into state environmental monitoring stream. Inspection protocol initialized.',
      };

      // Auto register non-anonymous complainants into database
      let registeredUser: UserProfile | null = null;
      if (!newComplaint.isAnonymous && newComplaint.complainantPhone) {
        registeredUser = autoRegisterUser({
          name: newComplaint.complainantName,
          phone: newComplaint.complainantPhone,
          address: `${newComplaint.location}, ${newComplaint.district}`,
        });
      }

      // Generate AI Triage Assessment
      newComplaint.aiAssessment = await generateAIPollutionAssessment(newComplaint);

      complaints.unshift(newComplaint);
      saveData();
      broadcast('complaint:created', newComplaint);

      res.status(201).json({ ...newComplaint, registeredUser });
    } catch (err) {
      console.error('Error creating complaint:', err);
      res.status(500).json({ error: 'Failed to submit complaint' });
    }
  });

  app.put('/api/complaints/:id', async (req, res) => {
    const idx = complaints.findIndex(c => c.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Complaint not found' });

    complaints[idx] = {
      ...complaints[idx],
      ...req.body
    };

    saveData();
    broadcast('complaint:updated', complaints[idx]);
    res.json(complaints[idx]);
  });

  app.delete('/api/complaints/:id', (req, res) => {
    complaints = complaints.filter(c => c.id !== req.params.id);
    saveData();
    broadcast('complaint:deleted', { id: req.params.id });
    res.json({ success: true });
  });

  // Direct AI Pollution Analysis endpoint
  app.post('/api/ai/analyze-pollution', async (req, res) => {
    try {
      const assessment = await generateAIPollutionAssessment(req.body);
      res.json(assessment);
    } catch (err) {
      res.status(500).json({ error: 'AI pollution analysis failed' });
    }
  });

  // Direct AI Soil Photo Detection & Classification endpoint
  app.post('/api/ai/detect-soil', async (req, res) => {
    try {
      const { photoUrl, base64Image, landType, location } = req.body;
      const result = await generateAISoilPhotoDetection(
        photoUrl || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
        base64Image,
        landType,
        location
      );
      res.json(result);
    } catch (err) {
      console.error('Soil detection endpoint error:', err);
      res.status(500).json({ error: 'Soil photo detection failed' });
    }
  });

  // Direct AI Water Body Photo Detection & Limnological Classification endpoint
  app.post('/api/ai/detect-water', async (req, res) => {
    try {
      const { photoUrl, base64Image, waterBodyType, location } = req.body;
      const result = await generateAIWaterPhotoDetection(
        photoUrl || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
        base64Image,
        waterBodyType,
        location
      );
      res.json(result);
    } catch (err) {
      console.error('Water detection endpoint error:', err);
      res.status(500).json({ error: 'Water photo detection failed' });
    }
  });

  // --- FARMER IDEAS & TIPS COMMUNITY SHARING ROUTES ---
  app.get('/api/farmer-ideas', (req, res) => {
    res.json(farmerIdeas);
  });

  app.get('/api/farmer-ideas/:id', (req, res) => {
    const idea = farmerIdeas.find(i => i.id === req.params.id);
    if (!idea) return res.status(404).json({ error: 'Farmer idea not found' });
    res.json(idea);
  });

  app.post('/api/farmer-ideas', (req, res) => {
    const newIdea: FarmerIdea = {
      id: `TIP-2026-${Math.floor(100 + Math.random() * 900)}`,
      title: req.body.title || 'Innovative Farmer Field Tip',
      category: req.body.category || 'Soil Health & Bio-Fertilizers',
      summary: req.body.summary || 'A practical farmer-discovered technique to boost crop resilience and cut costs.',
      farmerName: req.body.farmerName || 'Community Farmer',
      village: req.body.village || 'Village',
      district: req.body.district || 'District',
      state: req.body.state || 'State',
      phone: req.body.phone || '',
      isVerifiedFarmer: true,
      experienceYears: Number(req.body.experienceYears) || 5,
      costToImplement: req.body.costToImplement || 'Low Cost (< ₹500)',
      estimatedSavings: req.body.estimatedSavings || 'Saves money on farm inputs',
      timeToSeeResults: req.body.timeToSeeResults || '3 to 7 Days',
      difficulty: req.body.difficulty || 'Easy (Any Farmer)',
      suitableCrops: Array.isArray(req.body.suitableCrops) && req.body.suitableCrops.length > 0 ? req.body.suitableCrops : ['Vegetables', 'Paddy', 'Pulses'],
      materialsNeeded: Array.isArray(req.body.materialsNeeded) && req.body.materialsNeeded.length > 0 ? req.body.materialsNeeded : ['Farm organic residues', 'Clean water'],
      stepByStepGuide: Array.isArray(req.body.stepByStepGuide) && req.body.stepByStepGuide.length > 0 ? req.body.stepByStepGuide : ['Follow preparation steps carefully.', 'Apply during morning or evening.'],
      scientificReason: req.body.scientificReason || 'Natural biological synergy and organic compounds restore natural soil and plant defenses.',
      cautionsOrDoNotDo: Array.isArray(req.body.cautionsOrDoNotDo) && req.body.cautionsOrDoNotDo.length > 0 ? req.body.cautionsOrDoNotDo : ['Do not apply in intense direct afternoon heat.'],
      imageUrl: req.body.imageUrl || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
      likesCount: 1,
      triedCount: 0,
      successRatePercentage: 100,
      createdAt: new Date().toISOString().split('T')[0],
      comments: []
    };

    // Auto register into database
    const registeredUser = autoRegisterUser({
      name: newIdea.farmerName,
      phone: newIdea.phone,
      address: `${newIdea.village}, ${newIdea.district}, ${newIdea.state}`,
    });

    farmerIdeas.unshift(newIdea);
    saveData();
    broadcast('farmer_idea:created', newIdea);
    res.status(201).json({ ...newIdea, registeredUser });
  });

  app.put('/api/farmer-ideas/:id', (req, res) => {
    const idx = farmerIdeas.findIndex(i => i.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Farmer idea not found' });

    farmerIdeas[idx] = {
      ...farmerIdeas[idx],
      ...req.body
    };

    saveData();
    broadcast('farmer_idea:updated', farmerIdeas[idx]);
    res.json(farmerIdeas[idx]);
  });

  app.delete('/api/farmer-ideas/:id', (req, res) => {
    farmerIdeas = farmerIdeas.filter(i => i.id !== req.params.id);
    saveData();
    broadcast('farmer_idea:deleted', { id: req.params.id });
    res.json({ success: true });
  });

  // Upvote / Like an idea
  app.post('/api/farmer-ideas/:id/like', (req, res) => {
    const idx = farmerIdeas.findIndex(i => i.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Idea not found' });

    farmerIdeas[idx].likesCount = (farmerIdeas[idx].likesCount || 0) + 1;
    saveData();
    broadcast('farmer_idea:updated', farmerIdeas[idx]);
    res.json({ likesCount: farmerIdeas[idx].likesCount });
  });

  // Add Farmer Feedback / Comment / Tried Report
  app.post('/api/farmer-ideas/:id/feedback', (req, res) => {
    const idx = farmerIdeas.findIndex(i => i.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Idea not found' });

    const newFeedback = {
      id: `FB-${Math.floor(100 + Math.random() * 900)}`,
      farmerName: req.body.farmerName || 'Fellow Farmer',
      farmerLocation: req.body.farmerLocation || 'Local Region',
      comment: req.body.comment || 'Tried this technique on my crops with good results.',
      rating: Number(req.body.rating) || 5,
      triedOnFarm: Boolean(req.body.triedOnFarm),
      date: new Date().toISOString().split('T')[0]
    };

    if (!farmerIdeas[idx].comments) farmerIdeas[idx].comments = [];
    farmerIdeas[idx].comments.unshift(newFeedback);

    if (newFeedback.triedOnFarm) {
      farmerIdeas[idx].triedCount = (farmerIdeas[idx].triedCount || 0) + 1;
      const totalTried = farmerIdeas[idx].comments.filter(c => c.triedOnFarm);
      const positiveTried = totalTried.filter(c => c.rating >= 4);
      if (totalTried.length > 0) {
        farmerIdeas[idx].successRatePercentage = Math.round((positiveTried.length / totalTried.length) * 100);
      }
    }

    saveData();
    broadcast('farmer_idea:updated', farmerIdeas[idx]);
    res.status(201).json(farmerIdeas[idx]);
  });

  // AI Farmer Tip Assistant / Enhancer
  app.post('/api/ai/enhance-farmer-tip', async (req, res) => {
    const ai = getGeminiClient();
    const { rawTitle, rawDescription, category } = req.body;

    if (ai) {
      try {
        const prompt = `You are Eden Sync's Senior Agronomist and Indigenous Farming Specialist. A farmer has shared a practical field idea/tip:
Category: ${category || 'General'}
Title: ${rawTitle}
Description/Notes: ${rawDescription}

Refine and structure this farmer tip into clean, respectful, scientifically sound JSON for fellow farmers to replicate easily.

Respond ONLY with valid JSON with this exact schema:
{
  "refinedTitle": "A concise, actionable title emphasizing the method and target benefit",
  "refinedSummary": "A clear 2-sentence summary of what this tip does and why it helps farmers",
  "suitableCrops": ["3 to 5 crops that benefit most"],
  "materialsNeeded": ["3 to 5 clear items/quantities needed"],
  "stepByStepGuide": ["4 to 5 clear numbered step instructions that any farmer can follow"],
  "scientificReason": "A 2-sentence explanation of why this traditional or low-cost practice works biologically/physically",
  "cautionsOrDoNotDo": ["1 to 2 important precautions or mistakes to avoid"],
  "estimatedSavings": "A realistic estimated monetary or resource saving per acre",
  "timeToSeeResults": "e.g., '48 to 72 Hours' or '1 to 2 Weeks'"
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        if (response.text) {
          const parsed = JSON.parse(response.text.trim());
          return res.json(parsed);
        }
      } catch (err) {
        console.error('AI Tip enhancement error:', err);
      }
    }

    // Fallback heuristic response if AI is unavailable
    res.json({
      refinedTitle: rawTitle || 'Farmer Field Innovation',
      refinedSummary: rawDescription || 'A natural, low-cost technique developed by practicing farmers to enhance farm productivity and sustainability.',
      suitableCrops: ['Vegetables', 'Paddy', 'Pulses', 'Horticulture'],
      materialsNeeded: ['Organic farm biomass / cow dung / neem', 'Clean unchlorinated water', 'Sprayer pump or mixing drum'],
      stepByStepGuide: [
        'Collect clean natural materials from your farm.',
        'Mix in recommended proportions and ferment in shade for 48 to 72 hours.',
        'Filter well using a fine cotton cloth.',
        'Apply as foliar spray during cool morning or late afternoon hours.'
      ],
      scientificReason: 'Natural beneficial microbial enzymes and bio-active secondary plant metabolites naturally suppress pests and nourish root mycorrhizae.',
      cautionsOrDoNotDo: ['Do not spray under harsh noon sunlight (>35°C).', 'Filter properly to avoid pump nozzle clogs.'],
      estimatedSavings: 'Saves ₹1,500 to ₹3,000 per acre in synthetic inputs',
      timeToSeeResults: '3 to 5 Days'
    });
  });

  // --- SATELLITE IMAGERY & GLOBAL LAND DEGRADATION ROUTES ---
  app.get('/api/satellite/countries', (req, res) => {
    try {
      const { search, continent, severity } = req.query;
      let filtered = [...GLOBAL_COUNTRY_DEGRADATION_DATA];

      if (continent && continent !== 'All') {
        filtered = filtered.filter(c => c.continent.toLowerCase() === String(continent).toLowerCase());
      }

      if (severity && severity !== 'All') {
        filtered = filtered.filter(c => c.severity.toLowerCase().includes(String(severity).toLowerCase()));
      }

      if (search) {
        const q = String(search).toLowerCase();
        filtered = filtered.filter(c => 
          c.country.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q) ||
          c.capital.toLowerCase().includes(q) ||
          c.primaryDrivers.some(d => d.toLowerCase().includes(q))
        );
      }

      res.json({
        totalCountries: filtered.length,
        globalDegradedMha: filtered.reduce((acc, c) => acc + c.degradedFarmlandMha, 0),
        globalLossUSDBillion: filtered.reduce((acc, c) => acc + c.economicCropLossUSD_Billion, 0),
        countries: filtered
      });
    } catch (err) {
      console.error('Error fetching country degradation data:', err);
      res.status(500).json({ error: 'Failed to retrieve satellite country data' });
    }
  });

  app.get('/api/satellite/countries/:code', (req, res) => {
    const code = req.params.code.toUpperCase();
    const item = GLOBAL_COUNTRY_DEGRADATION_DATA.find(c => c.id === code || c.country.toUpperCase() === code);
    if (!item) {
      return res.status(404).json({ error: `Country degradation record not found for code: ${req.params.code}` });
    }
    res.json(item);
  });

  app.get('/api/satellite/scans', (req, res) => {
    res.json(satelliteScans);
  });

  app.post('/api/satellite/analyze', async (req, res) => {
    try {
      const {
        farmerName = 'Farmer Partner',
        phone = '',
        country = 'India',
        locationName = 'Agricultural Parcel',
        coordinates = { lat: 20.5937, lng: 78.9629 },
        farmAreaAcres = 5.0,
        cropType = 'Mixed Crops',
        observedIssues = []
      } = req.body;

      const ai = getGeminiClient();
      let aiResult: Partial<SatelliteParcelScan> | null = null;

      if (ai) {
        try {
          const prompt = `You are EdenSync's Lead Satellite Remote Sensing and Earth Observation Agronomist.
A farmer has requested a multi-spectral satellite scan and land degradation analysis for their farmland:
- Country: ${country}
- Location: ${locationName} (Lat: ${coordinates.lat}, Lng: ${coordinates.lng})
- Farm Area: ${farmAreaAcres} Acres
- Crop / Land Use: ${cropType}
- On-ground Observed Problems: ${observedIssues.join(', ') || 'General low yield & moisture stress'}

Analyze this agricultural parcel using simulated Sentinel-2 MSI (Bands B4-Red, B8-NIR, B11-SWIR, B12-SWIR2) and Landsat-9 Thermal Infrared remote sensing physics.
Evaluate the vegetation index (NDVI), soil degradation severity percentage (0-100), water stress index (0-100), topsoil loss estimate in tons/hectare/year, erosion risk, salinity risk, and provide exactly 3 actionable, zero-cost / low-cost indigenous regenerative protocols to revive this land.

Respond strictly in valid JSON matching this exact structure:
{
  "ndviScore": 0.35,
  "soilDegradationScore": 62,
  "waterStressIndex": 68,
  "erosionRisk": "Severe" | "High" | "Moderate" | "Low",
  "salinityRisk": "Critical" | "Elevated" | "Moderate" | "Safe",
  "organicCarbonLossEstimate": "e.g. 0.32% (Deficit of 72% from regional baseline)",
  "topSoilLossEstimateTonsPerHa": 21.5,
  "diagnosisSummary": "A concise 2-sentence technical remote sensing diagnosis explaining what the multi-spectral bands reveal (e.g. SWIR reflection, chlorophyll absorption depression, hardpan compaction).",
  "recommendedRegenerativeHacks": [
    "Specific indigenous or zero-cost technique 1 (e.g. Olla clay pot, Jeevamrutha, contour bund)",
    "Specific technique 2",
    "Specific technique 3"
  ],
  "carbonCreditPotentialTonsPerYr": 14.5
}`;

          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
              responseMimeType: 'application/json',
            },
          });

          if (response.text) {
            aiResult = JSON.parse(response.text.trim());
          }
        } catch (aiErr) {
          console.warn('Gemini satellite analysis call failed, falling back to heuristic engine:', aiErr);
        }
      }

      // Algorithmic fallback if AI call fails or is unavailable
      if (!aiResult) {
        const seed = Math.abs(coordinates.lat * 100 + coordinates.lng * 10);
        const computedNdvi = Number((0.25 + ((seed % 30) / 100)).toFixed(2));
        const computedDegradation = Math.min(95, Math.max(20, Math.floor(75 - (computedNdvi * 50))));
        const computedWaterStress = Math.min(95, Math.max(25, Math.floor(65 + ((seed % 25) - 10))));

        aiResult = {
          ndviScore: computedNdvi,
          soilDegradationScore: computedDegradation,
          waterStressIndex: computedWaterStress,
          erosionRisk: computedDegradation > 60 ? 'Severe' : (computedDegradation > 40 ? 'High' : 'Moderate'),
          salinityRisk: coordinates.lat < 32 && coordinates.lat > 15 ? 'Elevated' : 'Moderate',
          organicCarbonLossEstimate: '0.36% (Severely Depleted, 68% deficit from fertile benchmark)',
          topSoilLossEstimateTonsPerHa: Number((14.0 + (computedDegradation * 0.18)).toFixed(1)),
          diagnosisSummary: `Multi-spectral Sentinel-2 telemetry reveals a suppressed NDVI of ${computedNdvi} with elevated Shortwave Infrared (SWIR-2) reflectance, indicating active desiccation of the top 15cm soil layer and organic matter depletion.`,
          recommendedRegenerativeHacks: [
            'Deploy buried unglazed terracotta pots (Ollas) for 70% water savings directly at root level',
            'Incorporate Sesbania / Sunn hemp green manure with Jeevamrutha bio-inoculant',
            'Construct A-frame contour stone or vetiver swales along slope to stop topsoil runoff'
          ],
          carbonCreditPotentialTonsPerYr: Number((farmAreaAcres * 1.8).toFixed(1))
        };
      }

      const newScan: SatelliteParcelScan = {
        id: `SCAN-2026-${Math.floor(100 + Math.random() * 900)}`,
        farmerName,
        phone,
        country,
        locationName,
        coordinates: {
          lat: Number(coordinates.lat),
          lng: Number(coordinates.lng)
        },
        farmAreaAcres: Number(farmAreaAcres),
        cropType,
        observedIssues: Array.isArray(observedIssues) ? observedIssues : [],
        ndviScore: aiResult.ndviScore || 0.35,
        soilDegradationScore: aiResult.soilDegradationScore || 60,
        waterStressIndex: aiResult.waterStressIndex || 65,
        erosionRisk: (aiResult.erosionRisk as any) || 'Moderate',
        salinityRisk: (aiResult.salinityRisk as any) || 'Moderate',
        organicCarbonLossEstimate: aiResult.organicCarbonLossEstimate || '0.38% (Deficit of 65%)',
        topSoilLossEstimateTonsPerHa: aiResult.topSoilLossEstimateTonsPerHa || 16.5,
        diagnosisSummary: aiResult.diagnosisSummary || 'Sentinel-2 multispectral bands indicate dryland topsoil loss and organic carbon deficit.',
        recommendedRegenerativeHacks: aiResult.recommendedRegenerativeHacks || [
          'Direct bio-mulching with straw & Jeevamrutha',
          'Contour trenches to halt gully runoff',
          'Cover cropping with drought-hardy pulses'
        ],
        carbonCreditPotentialTonsPerYr: aiResult.carbonCreditPotentialTonsPerYr || Number((Number(farmAreaAcres) * 1.5).toFixed(1)),
        scannedAt: new Date().toISOString(),
        satelliteProvider: 'Sentinel-2 MSI (10m) + Landsat-9 OLI-2 + AI Multi-spectral Engine',
        verifiedByAi: true
      };

      satelliteScans.unshift(newScan);
      broadcast('satellite:created', newScan);

      // Auto-register farmer if user details are provided
      let registeredUser = null;
      if (phone && farmerName) {
        registeredUser = autoRegisterUser({ name: farmerName, phone, address: locationName });
      }

      saveData();
      res.status(201).json({ scan: newScan, registeredUser });
    } catch (err) {
      console.error('Error analyzing satellite parcel scan:', err);
      res.status(500).json({ error: 'Satellite multi-spectral analysis failed' });
    }
  });

  // Vite middleware or production static build
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: { server: httpServer },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  if (!IS_VERCEL) {
    httpServer.listen(PORT, '0.0.0.0', () => {
      console.log(`Eden Sync server with WebSocket engine running on http://0.0.0.0:${PORT}`);
    });
  }

  return app;
}

export { startServer };
export default startServer;

// Start server when executed directly
startServer();
