import { LandApplication, GovtProject, AwarenessArticle } from '../types';
import { EXTENDED_AWARENESS_ARTICLES } from './awarenessData';

export const INITIAL_APPLICATIONS: LandApplication[] = [
  {
    id: 'EDEN-2026-001',
    createdAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
    applicantName: 'Ramesh Patel',
    phone: '+91 98421 77340',
    applicantAddress: 'Plot 42, Green Valley Colony, Coimbatore, Tamil Nadu',
    landAddress: 'Survey No. 114, Pollachi Highway Bypass, Coimbatore',
    landArea: 6.5,
    areaUnit: 'acres',
    landType: 'Agricultural Farmland',
    isFarmer: true,
    willingToLease: true,
    restorationType: 'Agricultural Restoration',
    soilTestingRequested: true,
    waterTestingRequested: true,
    photoUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    landPhotoUrls: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80'
    ],
    identityCardType: 'Aadhaar Card',
    identityCardNumber: '5432-8765-1098',
    identityCardFile: 'Aadhaar_Landowner.pdf',
    landDocumentType: 'Patta / Chitta (Revenue Record)',
    landDocumentNumber: 'Patta No. 451/2024',
    landDocumentFile: 'Patta_Chitta_Deed_114.pdf',
    registerCopyUrl: 'Patta_Chitta_Deed_114.pdf',
    status: 'Restoration In-Progress',
    adminNotes: 'Soil alkalinity test scheduled. Organic mulching plan initialized.',
    assignedExpert: 'Dr. Anita Roy (Soil Bio-Chemist)',
    aiAnalysis: {
      soilWaterHealthSummary: 'Soil and water health analysis configured for organic carbon enrichment.',
      recommendedSteps: [
        'Apply organic humic compost and green manure.',
        'Implement drip irrigation with rainwater catchment.',
        'Rotate with nitrogen-fixing cover crops.'
      ],
      estimatedTimelineWeeks: 12,
      ecoImpactScore: 88,
      inspiringQuote: 'Healing this farmland secures food, clean water, and biodiversity.'
    },
    soilDetection: {
      condition: 'healthy',
      conditionLabel: 'Healthy / Fertile Loam',
      soilType: 'Alluvial Soil (River Silt / Loam)',
      confidenceScore: 94,
      moisturePercentage: 38,
      moistureStatus: 'Optimal Field Capacity (35-50%)',
      organicMatterEstimate: 'High / Rich (> 1.5%)',
      textureSummary: 'Crumbly granular topsoil rich in decomposed organic matter with porous root channels.',
      visualMarkers: ['Deep dark brown humus coloration', 'Loose friable crumb structure', 'Active earthworm castings', 'Uniform moisture retention'],
      soilHealthIndex: 89,
      drainageClass: 'Well-Drained',
      phEstimateRange: '6.8 - 7.2 (Neutral Optimal)',
      compactionRating: 'Low (Porous & Crumbly)',
      tailoredRejuvenation: [
        'Maintain organic topdressing and periodic humic acid foliar sprays.',
        'Implement 4-stage crop rotation with legume cover crops (Cowpea / Mung bean).',
        'Incorporate bio-inoculant mycorrhizal fungi to sustain natural nutrient absorption pathways.'
      ],
      recommendedCrops: ['Organic Wheat', 'Mustard', 'Vegetables (Tomatoes, Okra)', 'Fruit Orchards (Guava, Pomegranate)'],
      analyzedAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString()
    }
  },
  {
    id: 'EDEN-2026-002',
    createdAt: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString(),
    applicantName: 'Kavitha Sundaram',
    phone: '+91 94432 10987',
    applicantAddress: '15 Lakeview Avenue, Coimbatore, Tamil Nadu',
    landAddress: 'Survey No. 89, Singanallur Lake Margin Area',
    landArea: 80,
    areaUnit: 'cents',
    landType: 'Pond / Water Body',
    isFarmer: false,
    willingToLease: false,
    restorationType: 'Water Body Rejuvenation',
    soilTestingRequested: false,
    waterTestingRequested: true,
    photoUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    registerCopyUrl: 'Property_Ownership_Cert_89.pdf',
    status: 'Soil/Water Sample Collected',
    adminNotes: 'Water sample dispatched to Regional Limnology Lab.',
    assignedExpert: 'Er. S. Kumar (Hydrology Specialist)',
    aiAnalysis: {
      soilWaterHealthSummary: 'Pond water testing scheduled for bio-filtration setup.',
      recommendedSteps: [
        'De-silt sediment layer using eco-dredging pumps.',
        'Plant native floating vetiver beds for bio-filtration.',
        'Construct a perimeter bio-swale.'
      ],
      estimatedTimelineWeeks: 10,
      ecoImpactScore: 92,
      inspiringQuote: 'A single restored pond recharges groundwater for neighboring households.'
    },
    soilDetection: {
      condition: 'heavy',
      conditionLabel: 'Heavy / Waterlogged Silt-Clay',
      soilType: 'Peaty / Organic Wetland Soil',
      confidenceScore: 91,
      moisturePercentage: 68,
      moistureStatus: 'Excess / Waterlogged (> 60%)',
      organicMatterEstimate: 'Moderate (0.6 - 1.2%)',
      textureSummary: 'High plasticity dense alluvial silt-clay with low air porosity and surface pooling.',
      visualMarkers: ['Standing water sheen and fine sediment suspension', 'Gleyed bluish-grey anaerobic subsurface layer', 'Dense heavy colloidal silt binding', 'Slow percolation dynamics'],
      soilHealthIndex: 68,
      drainageClass: 'Poor / Impermeable',
      phEstimateRange: '6.2 - 6.8 (Slightly Acidic)',
      compactionRating: 'High (Dense Hardpan)',
      tailoredRejuvenation: [
        'Excavate peripheral drainage swales and contour infiltration trenches to shed excess surface hydrostatic load.',
        'Introduce floating vetiver phytoremediation rafts to aerate root zones and extract trapped chemical effluents.',
        'Incorporate coarse sand and agricultural gypsum (2 tons/acre) to break impermeable colloidal bonds.'
      ],
      recommendedCrops: ['Deep-water Paddy (Pokkali)', 'Taro / Colocasia', 'Water Spinach (Kangkong)', 'Bamboo & Reed Bio-fencing'],
      analyzedAt: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString()
    }
  },
  {
    id: 'EDEN-2026-003',
    createdAt: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(),
    applicantName: 'Vikram Singh Shekhawat',
    phone: '+91 98290 12345',
    applicantAddress: 'Heritage Villa, Amer Road, Jaipur, Rajasthan',
    landAddress: 'Khasra No. 204, Sambhar Salt Basin Boundary Zone',
    landArea: 12,
    areaUnit: 'acres',
    landType: 'Barren / Fallow Land',
    isFarmer: true,
    willingToLease: true,
    restorationType: 'Hybrid Agro-Forestry',
    soilTestingRequested: true,
    waterTestingRequested: true,
    photoUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    registerCopyUrl: 'Khasra_Registry_204.pdf',
    status: 'Pending Review',
    adminNotes: 'Application registered. Preliminary satellite imagery reviewed.',
    assignedExpert: 'Pending Assignment',
    aiAnalysis: {
      soilWaterHealthSummary: 'Arid sandy topsoil ready for moisture conservation techniques.',
      recommendedSteps: [
        'Construct semi-circular bunds for rainwater harvesting.',
        'Plant drought-resilient native trees.',
        'Inoculate soil with mycorrhizal fungi.'
      ],
      estimatedTimelineWeeks: 16,
      ecoImpactScore: 84,
      inspiringQuote: 'Turning barren ground into a green oasis is the ultimate stewardiship.'
    },
    soilDetection: {
      condition: 'dry',
      conditionLabel: 'Dry / Arid Soil',
      soilType: 'Red Sandy Loam (Alfisol / Semmann)',
      confidenceScore: 96,
      moisturePercentage: 11,
      moistureStatus: 'Critically Dry (< 15%)',
      organicMatterEstimate: 'Very Low (< 0.4%)',
      textureSummary: 'High sand fraction with severe moisture depletion, loose unaggregated particles, and wind erosion risk.',
      visualMarkers: ['Pale sun-bleached reddish hue', 'Deep polygon desiccation cracks', 'Zero surface moisture condensation', 'Low organic litter cover'],
      soilHealthIndex: 54,
      drainageClass: 'Very Fast / Excessive',
      phEstimateRange: '7.8 - 8.3 (Alkaline Tendency)',
      compactionRating: 'Moderate (Workable)',
      tailoredRejuvenation: [
        'Apply high-temperature biochar (4 tons/acre) combined with farmyard manure to establish moisture sponges.',
        'Construct crescent-shaped earthen bunds (swales) along contours to trap monsoon runoff.',
        'Apply thick organic straw/coir mulch (3 inches) to slash solar evaporation by up to 75%.'
      ],
      recommendedCrops: ['Pearl Millet (Bajra)', 'Sorghum (Jowar)', 'Moth Bean', 'Drought-tolerant Moringa', 'Neem & Khejri Agroforestry'],
      analyzedAt: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString()
    }
  }
];

export const INITIAL_GOVT_PROJECTS: GovtProject[] = [
  {
    id: 'GOVT-TN-01',
    title: 'Perur Lake Eco-Dredging & Wetland Rejuvenation',
    department: 'Water Resources Department & Municipal Administration',
    location: 'Coimbatore District, Tamil Nadu',
    targetArea: '0 Acres',
    completionPercentage: 0,
    status: 'Ongoing',
    allocatedBudget: '₹0',
    beneficiaries: 0,
    description: 'Systematic removal of invasive water hyacinth, dredging sediment silt, and developing 14 floating artificial reed wetlands for biological nutrient absorption.',
    beforeImageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    afterImageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    category: 'Waterbodies',
    lastUpdated: '2026-08-15'
  },
  {
    id: 'GOVT-GJ-02',
    title: 'Bhal Saline Soil Reclamation & Agro-Forestry Corridor',
    department: 'Gujarat State Land Development Corporation (GSLDC)',
    location: 'Bhal Region, Ahmedabad & Bhavnagar Districts',
    targetArea: '0 Acres',
    completionPercentage: 0,
    status: 'Planning',
    allocatedBudget: '₹0',
    beneficiaries: 0,
    description: 'Combating sea ingress and soil alkalinity by creating subterranean drainage trenches, gypsum soil conditioning, and dense afforestation with halophytic native trees.',
    beforeImageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    afterImageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    category: 'Agricultural',
    lastUpdated: '2026-08-10'
  },
  {
    id: 'GOVT-KA-03',
    title: 'Pennar River Catchment Tank Cascade Revival',
    department: 'Minor Irrigation & Ground Water Development Dept',
    location: 'Kolar & Chikkaballapura, Karnataka',
    targetArea: '0 Acres',
    completionPercentage: 0,
    status: 'Ongoing',
    allocatedBudget: '₹0',
    beneficiaries: 0,
    description: 'Restoration of ancient interconnected chain tanks (Eris) with check dams, recharge shafts, and desilting to restore depleted borewell aquifers.',
    beforeImageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    afterImageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    category: 'Watershed',
    lastUpdated: '2026-08-18'
  }
];

export const INITIAL_AWARENESS_ARTICLES: AwarenessArticle[] = EXTENDED_AWARENESS_ARTICLES;
