export type UserRole = 'user' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  facePhotoUrl?: string;
  phone: string;
  address: string;
  role: UserRole;
  authProvider?: 'google' | 'password' | 'phone' | 'admin';
  quickPassword?: string;
  identityCardType?: 'Aadhaar Card' | 'Voter ID' | 'Govt ID' | 'Farmer Registry ID' | 'PAN Card' | string;
  identityCardNumber?: string;
  identityCardFile?: string;
  landDocumentType?: string;
  landDocumentNumber?: string;
  landDocumentFile?: string;
  landPhotoUrls?: string[];
}

export type LandType = 
  | 'Agricultural Farmland' 
  | 'Barren / Fallow Land' 
  | 'Pond / Water Body' 
  | 'Lake / Wetland' 
  | 'River Bank / Coastal' 
  | 'Degraded Forest Border';

export type RestorationType = 
  | 'Agricultural Restoration' 
  | 'Eco-Cleaning & De-silting' 
  | 'Hybrid Agro-Forestry' 
  | 'Water Body Rejuvenation';

export type ApplicationStatus = 
  | 'Pending Review' 
  | 'Inspection Scheduled' 
  | 'Soil/Water Sample Collected' 
  | 'Restoration Action Plan Ready' 
  | 'Restoration In-Progress' 
  | 'Restored & Revived';

export type SoilConditionCategory = 'dry' | 'clay' | 'healthy' | 'heavy';

export type SoilTypeClassification = 
  | 'Alluvial Soil (River Silt / Loam)'
  | 'Black Soil (Regur / Vertisol)'
  | 'Red Sandy Loam (Alfisol / Semmann)'
  | 'Laterite Soil (Ferruginous)'
  | 'Saline / Alkaline Soil (Kalar / Usar)'
  | 'Sandy / Coastal Soil (Arenosol)'
  | 'Clay Loam / Heavy Silt'
  | 'Peaty / Organic Wetland Soil';

export interface SoilPhotoDetection {
  condition: SoilConditionCategory; // 'dry' | 'clay' | 'healthy' | 'heavy'
  conditionLabel: string; // e.g. 'Dry / Arid Soil', 'Dense Clay Soil', 'Healthy Fertile Loam', 'Heavy / Waterlogged Soil'
  soilType: SoilTypeClassification | string;
  confidenceScore: number; // e.g. 94%
  moisturePercentage: number; // e.g. 14%
  moistureStatus: 'Critically Dry (< 15%)' | 'Moderate / Adequate (20-35%)' | 'Optimal Field Capacity (35-50%)' | 'Excess / Waterlogged (> 60%)';
  organicMatterEstimate: 'Very Low (< 0.4%)' | 'Moderate (0.6 - 1.2%)' | 'High / Rich (> 1.5%)';
  textureSummary: string; // e.g. "Fine-grained dense clay with polygonal contraction cracks"
  visualMarkers: string[]; // e.g. ["Visible desiccation fractures", "Pale earthy hue", "Absence of active organic litter"]
  soilHealthIndex: number; // 0-100
  drainageClass: 'Very Fast / Excessive' | 'Well-Drained' | 'Moderately Slow' | 'Poor / Impermeable';
  phEstimateRange: string; // e.g. "6.5 - 7.2 (Neutral)"
  compactionRating: 'Low (Porous & Crumbly)' | 'Moderate (Workable)' | 'High (Dense Hardpan)';
  tailoredRejuvenation: string[]; // Actionable steps tailored to dry / clay / healthy / heavy
  recommendedCrops: string[];
  analyzedAt: string;
}

export type WaterConditionCategory = 'algal' | 'turbid' | 'sheen' | 'clear' | 'sewage';

export type WaterBodyClassification = 
  | 'Village Pond / Irrigation Tank (Kulam / Eri)'
  | 'Lake / Protected Wetland Area'
  | 'River Canal / Distributary Channel'
  | 'Agricultural Well / Borewell Recharge Pit'
  | 'Urban Drainage / Industrial Outflow Basin';

export interface WaterPhotoDetection {
  condition: WaterConditionCategory; // 'algal' | 'turbid' | 'sheen' | 'clear' | 'sewage'
  conditionLabel: string; // e.g. 'Algae Bloom / Eutrophic Water', 'Turbid & High Siltation', 'Chemical / Oil Sheen', 'Pristine Clean Freshwater', 'Raw Sewage Contamination'
  waterBodyType: WaterBodyClassification | string;
  confidenceScore: number; // 0-100
  waterQualityIndex: number; // 0-100 (WQI)
  wqiClass: 'Excellent (Clean & Potable)' | 'Good (Aquatic Safe)' | 'Moderate (Stressed)' | 'Poor (Degraded)' | 'Critically Polluted (Hazardous)';
  dissolvedOxygenEstimate: string; // e.g. "2.4 mg/L (Critical Hypoxia)"
  algalRiskLevel: 'Severe Cyanobacteria Scum' | 'Moderate Green Filamentous' | 'Low / Natural' | 'None (Clear)';
  turbidityEstimate: string; // e.g. "85+ NTU (Heavy Suspended Clay)"
  phEstimateRange: string; // e.g. "8.2 - 8.8 (Alkaline Bloom)"
  visualMarkers: string[]; // e.g. ["Surface green cyanobacteria bloom", "Zero bottom visibility", "Oily rainbow refraction"]
  ecologicalImpactSummary: string;
  tailoredRemediation: string[]; // e.g. ["Deploy Vetiver Floating Rafts", "Solar Aerator Bubbler", "Enzyme bio-dosing"]
  safeUses: {
    irrigation: boolean;
    cattleDrinking: boolean;
    fishFarming: boolean;
    humanContact: boolean;
  };
  analyzedAt: string;
}

export interface AIAnalysis {
  soilWaterHealthSummary: string;
  recommendedSteps: string[];
  estimatedTimelineWeeks: number;
  ecoImpactScore: number; // 0-100
  inspiringQuote: string;
}

export interface LandApplication {
  id: string;
  createdAt: string;
  applicantName: string;
  phone: string;
  applicantAddress: string;
  landAddress: string;
  landArea: number;
  areaUnit: 'cents' | 'acres';
  landType: LandType;
  isFarmer: boolean;
  willingToLease: boolean;
  restorationType: RestorationType;
  soilTestingRequested: boolean;
  waterTestingRequested: boolean;
  photoUrl: string;
  landPhotoUrls?: string[];
  registerCopyUrl: string;
  identityCardType?: string;
  identityCardNumber?: string;
  identityCardFile?: string;
  landDocumentType?: string;
  landDocumentNumber?: string;
  landDocumentFile?: string;
  status: ApplicationStatus;
  adminNotes?: string;
  assignedExpert?: string;
  aiAnalysis?: AIAnalysis;
  soilDetection?: SoilPhotoDetection;
  waterDetection?: WaterPhotoDetection;
}

export interface GovtProject {
  id: string;
  title: string;
  department: string;
  location: string;
  coordinates?: { lat: number; lng: number };
  targetArea: string;
  completionPercentage: number;
  status: 'Planning' | 'Ongoing' | 'Near Completion' | 'Completed';
  allocatedBudget: string;
  beneficiaries: number;
  description: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  category: 'Waterbodies' | 'Agricultural' | 'Watershed' | 'Afforestation';
  lastUpdated: string;
}

export interface AwarenessArticle {
  id: string;
  title: string;
  category: 'Soil Revival' | 'Waterbodies' | 'Agroecology' | 'Rainwater Harvesting' | 'Bio-fencing' | 'Climate Adaptation';
  readTime: string;
  summary: string;
  content: string;
  imageUrl: string;
  keyTips: string[];
}

export type CustomerCategory = 
  | 'Smallholder Farmer'
  | 'Commercial Agro-Forestry'
  | 'Community Water Custodian'
  | 'Village Panchayat Collective'
  | 'Salt-Affected Landholder'
  | 'Eco-Trust / Agro-Enterprise';

export type CustomerUrgency = 'Immediate (< 30 Days)' | 'Medium (1-3 Months)' | 'Long Term Planning';

export type CustomerStatus = 
  | 'Active In-Progress'
  | 'Assessment Completed'
  | 'Site Inspection Scheduled'
  | 'Restored & Monitored'
  | 'Funding / Subsidy Approved';

export interface CustomerSoilMetrics {
  ph: number;
  organicCarbonPct: number;
  salinityEC: number; // dS/m
  waterTableDepthFt: number;
  primaryDeficiency: string;
}

export interface CustomerRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  category: CustomerCategory;
  district: string;
  state: string;
  country: string;
  surveyNumber: string;
  landArea: number;
  areaUnit: 'acres' | 'cents' | 'hectares';
  landType: LandType;
  primaryRequirements: string[];
  soilMetrics?: CustomerSoilMetrics;
  budgetPreference: string;
  urgency: CustomerUrgency;
  status: CustomerStatus;
  registeredDate: string;
  assignedAgronomist: string;
  notes: string;
  coordinates?: { lat: number; lng: number };
  aiRecommendationSummary?: string;
}

export type EnsoPhase = 'El Niño (Warm Phase)' | 'La Niña (Cool Phase)' | 'ENSO Neutral (Normal)';

export interface ClimateRegionImpact {
  id: string;
  regionName: string;
  continent: 'Asia' | 'Africa' | 'Americas' | 'Europe' | 'Oceania';
  ensoPhase: EnsoPhase;
  temperatureAnomaly: string; // e.g. "+1.6°C to +2.4°C"
  precipitationShift: string; // e.g. "-30% to -45% (Deficit Rainfall)"
  primaryVulnerability: string;
  affectedCrops: string[];
  waterBodyStress: string;
  actionableIntervention: string;
  severity: 'Critical' | 'High' | 'Moderate' | 'Low';
  coordinates: { lat: number; lng: number };
}

export interface ClimateCaseStudy {
  id: string;
  title: string;
  subtitle: string;
  category: 'Biodiversity & Phenology' | 'Livestock & Agriculture' | 'Cryosphere & Glaciology' | 'Marine Ecosystems' | 'Food Security & Prices';
  region: string;
  severityLevel: 'Severe Tipping Point' | 'High Economic Loss' | 'Critical Disruption' | 'Widespread Ecological Shift';
  phenomenon: string;
  mechanism: string;
  observedImpacts: string[];
  scientificData: {
    label: string;
    value: string;
    change: string;
    source: string;
  }[];
  mitigationAndAdaptation: string[];
  newsReference: string;
}

export interface EnsoBeforeVsNow {
  parameter: string;
  preIndustrial: string;
  modernEra: string;
  amplifyingFactor: string;
  ecologicalConsequence: string;
}

export interface WastePlatformProfile {
  id: string;
  name: string;
  category: 'Digital Waste Clearing App' | 'Environmental Infrastructure Giant';
  headquarters: string;
  coverage: string;
  coreModel: string;
  targetAudience: string;
  keyStrengths: string[];
  fatalFlawsOrBlindspots: string[];
  whyTheyStruggleOrMissAllInOne: string;
}

export interface EnsoHistoricalRecord {
  year: string;
  oniPeak: number; // Oceanic Niño Index (°C)
  classification: 'Very Strong El Niño' | 'Strong El Niño' | 'Moderate El Niño' | 'Strong La Niña' | 'Moderate La Niña' | 'Neutral';
  globalImpactNote: string;
  humanSocietalImpact?: string;
  paleoClimateEvidence?: string;
}

export interface GlobalClimateMetrics {
  currentEnsoPhase: EnsoPhase;
  currentOniValue: number; // e.g. +1.4
  sstAnomalyCentralPacific: string; // e.g. "+1.5°C"
  globalMeanTempAnomaly: string; // e.g. "+1.48°C above pre-industrial"
  atmosphericCO2Ppm: number; // e.g. 424.5
  oceanHeatContentZJ: number; // e.g. 385 ZJ
  activeExtremeAlertsCount: number;
}

// Pollution Grievance & Complaint Types
export type PollutionDomain = 'Land Pollution' | 'Water Pollution' | 'Combined Land & Water';

export type LandPollutionCause = 
  | 'Chemical & Hazardous Waste Dumping'
  | 'Industrial Slag & Heavy Metal Leachate'
  | 'Illegal Plastic & Municipal Solid Waste Dumping'
  | 'Toxic Open Burning & Ash Contamination'
  | 'Excessive Chemical Pesticide / Fertilizer Degradation'
  | 'Saline Water Intrusion & Topsoil Sterilization'
  | 'Illegal Topsoil Stripping & Quarry Dust'
  | 'Construction Debris & E-Waste Dumping';

export type WaterPollutionCause =
  | 'Untreated Industrial Chemical Effluent Discharge'
  | 'Raw Sewage & Urban Drainage Inflow'
  | 'Agricultural Chemical & Pesticide Runoff (Eutrophication)'
  | 'Oil, Grease & Petroleum Hydrocarbon Spill'
  | 'Solid Waste, Plastic & Garbage Dumping in Waterbody'
  | 'Heavy Metal Siltation & High Turbidity / TDS'
  | 'Toxic Cyanobacteria / Algal Bloom & Aquatic Mortality'
  | 'Illegal Encroachment & Wetland Destruction';

export type PollutionSeverity = 'Critical (Immediate Hazard)' | 'High (Active Damage)' | 'Moderate' | 'Low / Initial Stage';

export type ComplaintStatus = 
  | 'Reported & Logged'
  | 'Inspection Officer Dispatched'
  | 'Water/Soil Samples in Lab Analysis'
  | 'Legal Notice Issued & Containment Active'
  | 'Remediated & Revived';

export interface AIPollutionAssessment {
  riskScore: number; // 0 - 100
  containmentPriority: 'Immediate (< 24h)' | 'Urgent (1-3 Days)' | 'Standard (1 Week)';
  immediateSafetyMeasures: string[];
  recommendedBioRemediation: string[];
  responsibleAuthorities: string[];
  estimatedEcologicalRecoveryWeeks: number;
  environmentalHazardSummary: string;
}

export interface ComplaintMilestoneEvent {
  id: string;
  stage: ComplaintStatus;
  timestamp: string;
  headline: string;
  details: string;
  officerName?: string;
  actionTaken?: string;
  sampleTestResults?: {
    ph?: number;
    tdsPpm?: number;
    dissolvedOxygen?: string;
    heavyMetalsPresent?: boolean;
    toxicChemicalIdentified?: string;
  };
  noticeReferenceNo?: string;
  channelsNotified: ('SMS' | 'WhatsApp')[];
  simulatedNotificationText: string;
}

export interface PollutionComplaint {
  id: string;
  createdAt: string;
  domain: PollutionDomain;
  specificCause: string;
  title: string;
  description: string;
  location: string;
  district: string;
  state: string;
  surveyNumberOrLandmark: string;
  affectedAreaOrVolume: string; // e.g., "3.5 Acres", "50,000 Liters / Entire Lake"
  severity: PollutionSeverity;
  status: ComplaintStatus;
  evidencePhotoUrl: string;
  complainantName: string;
  complainantPhone: string;
  isAnonymous: boolean;
  affectedResources: string[]; // e.g. ["Drinking Water Well", "Cattle Grazing Land", "Paddy Crops", "Groundwater Aquifer"]
  assignedOfficer?: string;
  assignedOfficerContact?: string;
  adminRemarks?: string;
  aiAssessment?: AIPollutionAssessment;
  coordinates?: { lat: number; lng: number };
  smsAlertsEnabled?: boolean;
  whatsappAlertsEnabled?: boolean;
  milestones?: ComplaintMilestoneEvent[];
}

// Farmers' Ideas & Tips Sharing Hub Types
export type FarmerTipCategory = 
  | 'Organic Pest & Disease Control'
  | 'Water Conservation & Low-Cost Drip'
  | 'Soil Health & Bio-Fertilizers'
  | 'Farm Tools & DIY Jugaad'
  | 'Seed Treatment & Storage'
  | 'Weed & Mulching Techniques'
  | 'Animal Husbandry & Bio-Inputs'
  | 'Drought & Heatwave Resilience'
  | 'Indigenous Indian Farming Systems'
  | 'Global & Foreign Regenerative Farming'
  | 'El Niño History & Climate Resilience';

export type ImplementationCost = 
  | 'Zero Cost (Farm Waste)' 
  | 'Low Cost (< ₹500)' 
  | 'Moderate (₹500 - ₹2,000)' 
  | 'Investment (> ₹2,000)';

export type DifficultyLevel = 'Easy (Any Farmer)' | 'Moderate' | 'Advanced';

export interface FarmerIdeaFeedback {
  id: string;
  farmerName: string;
  farmerLocation: string;
  comment: string;
  rating: number; // 1-5
  triedOnFarm: boolean;
  date: string;
}

export interface FarmerIdea {
  id: string;
  title: string;
  category: FarmerTipCategory;
  summary: string;
  farmerName: string;
  village: string;
  district: string;
  state: string;
  country?: string;
  originType?: 'Indian' | 'Indian Farming' | 'Foreign / Global' | 'El Niño & Climate History' | 'El Niño History';
  historicalYear?: string | number;
  phone?: string;
  isVerifiedFarmer?: boolean;
  experienceYears?: number;
  costToImplement: ImplementationCost;
  estimatedSavings: string; // e.g. "Saves ₹3,500/acre in pesticide"
  timeToSeeResults: string; // e.g. "3 to 5 Days"
  difficulty: DifficultyLevel;
  suitableCrops: string[];
  materialsNeeded: string[];
  stepByStepGuide: string[];
  scientificReason: string;
  cautionsOrDoNotDo: string[];
  imageUrl: string;
  likesCount: number;
  triedCount: number;
  successRatePercentage: number;
  createdAt: string;
  comments: FarmerIdeaFeedback[];
}

export type MachineWorkType = 
  | 'Excavator / JCB Desilting'
  | 'Tractor Silt Hauling & Leveling'
  | 'Weed Harvester / Aquatic Clearing'
  | 'Bund Strengthening & Compaction'
  | 'Biochar / Gypsum Spreading'
  | 'Manual Labor / Shramdaan Crew'
  | 'Vetiver / Sapling Plantation';

export type WorkStatus = 'Clocked-In / Active' | 'Completed & Verified' | 'Paused / Maintenance';

export interface FieldWorkLog {
  id: string;
  workOrderTitle: string;
  locationName: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  workType: MachineWorkType;
  machineryModel: string; // e.g., 'JCB 3DX Super Eco' or 'Mahindra 575 DI Tractor'
  operatorName: string;
  operatorPhone: string;
  workforceCount: number; // e.g. 8 laborers
  status: WorkStatus;
  startTime: string;
  endTime?: string;
  hoursWorked: number;
  siltOrAreaCleared: string; // e.g. "450 cubic meters" or "2.4 Acres"
  fuelLitres?: number;
  costPerHour: number; // in INR e.g. 1200
  totalExpense: number; // in INR
  fundingSource: 'MGNREGA Scheme' | 'Panchayat Fund' | 'CSR Grant (ITC / Tata)' | 'Farmer Self-Funded';
  proofPhotos: {
    stage: 'before' | 'during' | 'completed';
    url: string;
    caption: string;
    timestamp: string;
  }[];
  supervisorVerified: boolean;
  supervisorName?: string;
  notes?: string;
}

// --- WASTE COLLECTION & RESTORATION OF METALS TYPES ---
export type MetalWasteCategory =
  | 'Agricultural Scrap (Tractor Parts, Plows, Discs)'
  | 'Submersible Pumps, Motors & Copper Windings'
  | 'Barbed Wire, GI Mesh & Fencing Iron'
  | 'Pesticide Drums & Chemical Metal Barrels'
  | 'Solar Batteries & Inverter Lead Acid Plates'
  | 'Corrugated GI Roofing & Structural Beams'
  | 'Heavy Metal Contaminated Soil / Foundry Slag'
  | 'Mixed Farm Junk & Aluminum Irrigation Pipes';

export type MetalRecoveryStatus =
  | 'Collection Scheduled'
  | 'Vehicle Dispatched'
  | 'Weighed & Paid'
  | 'Smelted & Remanufactured'
  | 'Soil Phytoremediation Active';

export interface MetalScrapRate {
  metalType: string;
  ratePerKgINR: number;
  marketTrend: 'up' | 'stable' | 'down';
  description: string;
  remediationBenefit: string;
}

export interface MetalWasteRequest {
  id: string;
  applicantName: string;
  phone: string;
  location: string;
  district: string;
  state: string;
  metalCategory: MetalWasteCategory;
  estimatedWeightKg: number;
  estimatedPayoutINR: number;
  photoUrl?: string;
  status: MetalRecoveryStatus;
  pickupAddress: string;
  preferredPickupDate: string;
  partnerCollector: string;
  soilContaminationNoted: boolean;
  metalsIdentified: string[];
  phytoremediationCropsRecommended: string[];
  greenCreditsEarned: number;
  createdAt: string;
  notes?: string;
}

// --- GLOBAL SATELLITE IMAGERY & LAND DEGRADATION TYPES ---
export interface DegradationHotspot {
  name: string;
  stateOrRegion: string;
  problem: string;
  coordinates: [number, number];
  areaSqKm: number;
}

export interface SatelliteSensorsTelemetry {
  ndviMean: number;
  ndviAnomaly10Yr: number;
  soilMoistureIndex: number;
  landSurfaceTempC: number;
  bareSoilIndex: number;
  vegetationHealthIndex: number;
  lastSatellitePass: string;
  sentinelTileId: string;
}

export interface CountryLandDegradation {
  id: string; // ISO 3-letter code, e.g. "IND"
  country: string;
  flag: string;
  continent: 'Asia' | 'Africa' | 'Europe' | 'Americas' | 'Oceania';
  capital: string;
  totalLandAreaMha: number;
  agriculturalLandMha: number;
  degradedFarmlandMha: number;
  degradationPercentage: number;
  annualDegradationRatePercent: number;
  economicCropLossUSD_Billion: number;
  primaryDrivers: string[];
  severity: 'Critical (>40%)' | 'High (25-40%)' | 'Moderate (15-25%)' | 'Managed (<15%)';
  hotspots: DegradationHotspot[];
  satelliteMetrics: SatelliteSensorsTelemetry;
  unccdTarget: {
    targetYear: number;
    netZeroTarget: string;
    commitment: string;
  };
  restorationProtocols: string[];
  healthyImageUrl: string;
  degradedImageUrl: string;
  ndviMapUrl: string;
  summary: string;
}

export interface SatelliteParcelScan {
  id: string;
  farmerName: string;
  phone: string;
  country: string;
  locationName: string;
  coordinates: { lat: number; lng: number };
  farmAreaAcres: number;
  cropType: string;
  observedIssues: string[];
  ndviScore: number;
  soilDegradationScore: number; // 0-100
  waterStressIndex: number; // 0-100
  erosionRisk: 'Severe' | 'High' | 'Moderate' | 'Low';
  salinityRisk: 'Critical' | 'Elevated' | 'Moderate' | 'Safe';
  organicCarbonLossEstimate: string;
  topSoilLossEstimateTonsPerHa: number;
  diagnosisSummary: string;
  recommendedRegenerativeHacks: string[];
  carbonCreditPotentialTonsPerYr: number;
  scannedAt: string;
  satelliteProvider: string;
  verifiedByAi: boolean;
}

export interface DocumentBillLineItem {
  id: string;
  description: string;
  category: string;
  rateINR: number;
  qty: number;
  totalINR: number;
}

export interface DocumentBillDetails {
  invoiceNumber: string;
  subtotalINR: number;
  subsidyDiscountINR: number;
  taxGSTINR: number;
  netPayableINR: number;
  paymentStatus: 'Paid (Subsidized Scheme)' | 'Pending Verification' | 'Govt Direct Benefit Transfer (DBT)';
  paymentMethod: string;
  transactionRef: string;
  schemeName: string;
  lineItems: DocumentBillLineItem[];
}

export interface DocumentReportDetails {
  reportId: string;
  reportNumber?: string;
  diagnosticStage: string;
  soilCondition: string;
  confidenceScore: number;
  moisturePercentage: number;
  phEstimate: string;
  organicMatterEstimate: string;
  ecoScore: number;
  restorationType: string;
  summary?: string;
  assignedExpert: string;
  recommendedSteps: string[];
  waterAnalysis?: string;
  auditChecksum: string;
}

export interface ExportedDocument {
  id: string;
  documentType: 'Bill' | 'Report';
  title: string;
  applicationId: string;
  applicantName: string;
  applicantPhone: string;
  landAddress: string;
  landArea: number;
  areaUnit: 'cents' | 'acres';
  createdAt: string;
  exportedBy: string;
  status: 'Pending Admin Check' | 'Verified & Approved' | 'Flagged for Review';
  adminNotes?: string;
  verifiedBy?: string;
  verifiedAt?: string;
  billDetails?: DocumentBillDetails;
  reportDetails?: DocumentReportDetails;
}


