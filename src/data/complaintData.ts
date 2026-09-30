import { PollutionComplaint } from '../types';

export const INITIAL_COMPLAINTS: PollutionComplaint[] = [
  {
    id: 'POL-2026-081',
    createdAt: '2026-08-20T10:30:00Z',
    domain: 'Water Pollution',
    specificCause: 'Untreated Industrial Chemical Effluent Discharge',
    title: 'Textile Dye Discharge into Noyyal River Tributary & Irrigation Canal',
    description: 'High volume toxic dark red effluent released during night hours from nearby fabric processing units. The water has strong pungent sulfur odor, foam formation, and local well water has turned turbid.',
    location: 'Near Arulpuram Bridge, Tirupur District',
    district: 'Tirupur',
    state: 'Tamil Nadu',
    surveyNumberOrLandmark: 'SF/342 near Noyyal Check Dam',
    affectedAreaOrVolume: '4.2 km Canal Stretch & 6 Farm Wells',
    severity: 'Critical (Immediate Hazard)',
    status: 'Legal Notice Issued & Containment Active',
    evidencePhotoUrl: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=800&q=80',
    complainantName: 'K. Senthil Kumar (Panchayat Representative)',
    complainantPhone: '+91 98422 11980',
    isAnonymous: false,
    affectedResources: ['Drinking Water Well', 'Paddy Crops', 'Groundwater Aquifer', 'Cattle Water Trough'],
    assignedOfficer: 'Er. V. Murugesan (TNPCB Environmental Engineer)',
    assignedOfficerContact: '+91 94433 87210',
    adminRemarks: 'Field water samples collected (TDS: 4200 mg/l, COD: 680 mg/l). Closure notice served to offending textile bleaching unit. Emergency charcoal barrier activated.',
    smsAlertsEnabled: true,
    whatsappAlertsEnabled: true,
    milestones: [
      {
        id: 'EVT-081-1',
        stage: 'Reported & Logged',
        timestamp: '2026-08-20T10:30:00Z',
        headline: 'Pollution Grievance Registered',
        details: 'Citizen grievance logged with GPS verification. High toxicity flag triggered by Eden Sync AI engine.',
        channelsNotified: ['SMS', 'WhatsApp'],
        simulatedNotificationText: '[EDEN-SYNC] Grievance POL-2026-081 registered. Location: Arulpuram Bridge. Priority: Critical. Track status: https://edensync.org/track/POL-2026-081'
      },
      {
        id: 'EVT-081-2',
        stage: 'Inspection Officer Dispatched',
        timestamp: '2026-08-20T14:15:00Z',
        headline: 'Field Engineer Er. V. Murugesan Dispatched',
        details: 'TNPCB flying squad reached site SF/342. Night effluent discharge confirmed and physical evidence geotagged.',
        officerName: 'Er. V. Murugesan',
        channelsNotified: ['SMS', 'WhatsApp'],
        simulatedNotificationText: '[EDEN-SYNC UPDATE] Officer Er. V. Murugesan (+91 94433 87210) dispatched to site for POL-2026-081.'
      },
      {
        id: 'EVT-081-3',
        stage: 'Water/Soil Samples in Lab Analysis',
        timestamp: '2026-08-21T11:00:00Z',
        headline: 'Spectrometry & COD Lab Testing Completed',
        details: 'Laboratory findings confirmed synthetic Azo dyes, extreme COD of 680 mg/L (normal < 50 mg/L), and elevated sulfate ions.',
        sampleTestResults: {
          ph: 9.4,
          tdsPpm: 4200,
          dissolvedOxygen: '0.9 mg/L (Critical Hypoxia)',
          heavyMetalsPresent: true,
          toxicChemicalIdentified: 'Azo Reactive Red 195 & Sodium Hydrosulfite'
        },
        channelsNotified: ['WhatsApp'],
        simulatedNotificationText: '[EDEN-SYNC LAB ALERT] Water test for POL-2026-081 confirmed pH: 9.4, COD: 680 mg/L. Legal enforcement escalated.'
      },
      {
        id: 'EVT-081-4',
        stage: 'Legal Notice Issued & Containment Active',
        timestamp: '2026-08-22T16:30:00Z',
        headline: 'Formal Closure Order & Emergency Charcoal Barrier Activated',
        details: 'Section 33A Water Act closure notice served to processing mill. Activated carbon booms deployed across canal weir.',
        noticeReferenceNo: 'TNPCB/TPR/W/2026/0942-A',
        actionTaken: 'Electricity supply disconnected by EB authorities. 2 tons of floating bio-char filters installed.',
        channelsNotified: ['SMS', 'WhatsApp'],
        simulatedNotificationText: '[EDEN-SYNC ACTION] Closure notice issued under Water Act (TNPCB/TPR/W/2026/0942-A). Containment booms deployed.'
      }
    ],
    aiAssessment: {
      riskScore: 92,
      containmentPriority: 'Immediate (< 24h)',
      immediateSafetyMeasures: [
        'Halt all pumping from borewells within a 500m radius immediately.',
        'Warn local shepherds to prevent livestock drinking from canal banks.',
        'Deploy temporary sandbag & activated carbon bunds to prevent downstream spread.'
      ],
      recommendedBioRemediation: [
        'Deploy floating vetiver wetland islands (Phytoremediation) to absorb synthetic dye ions.',
        'Apply enzyme-based microbial consortia to digest organic azo dyes and lower COD.',
        'Incorporate zeolite-bentonite clay barriers along affected soil banks.'
      ],
      responsibleAuthorities: ['State Pollution Control Board (TNPCB)', 'Public Works Department (Water Resources)', 'District Collectorate Environmental Wing'],
      estimatedEcologicalRecoveryWeeks: 12,
      environmentalHazardSummary: 'High chemical toxicity detected. Immediate cessation of effluent inflow required to prevent heavy metal migration into deeper aquifers.'
    },
    coordinates: { lat: 11.1085, lng: 77.3411 }
  },
  {
    id: 'POL-2026-082',
    createdAt: '2026-08-21T14:15:00Z',
    domain: 'Land Pollution',
    specificCause: 'Chemical & Hazardous Waste Dumping',
    title: 'Illegal Chemical Sludge & Spent Acid Dumping on Fallow Farmland',
    description: 'Unknown tankers dumped over 20 metric tons of hazardous semi-solid industrial chemical waste and spent acid sludge onto prime agricultural boundary soil during midnight.',
    location: 'Vadodara Rural Outskirts, Padra Highway',
    district: 'Vadodara',
    state: 'Gujarat',
    surveyNumberOrLandmark: 'SF/189/2B, Padra-Jambusar Road',
    affectedAreaOrVolume: '2.5 Acres Topsoil Contaminated',
    severity: 'Critical (Immediate Hazard)',
    status: 'Inspection Officer Dispatched',
    evidencePhotoUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
    complainantName: 'Mansukhbhai Patel',
    complainantPhone: '+91 97230 45610',
    isAnonymous: false,
    affectedResources: ['Cattle Grazing Land', 'Topsoil Microbes', 'Adjoining Cotton Crop'],
    assignedOfficer: 'Dr. Rajesh Solanki (GPCB Hazardous Waste Inspector)',
    assignedOfficerContact: '+91 98251 34900',
    adminRemarks: 'Inspection team dispatched with soil core augers. Local police complaint filed to trace CCTV footage of midnight tanker movement.',
    smsAlertsEnabled: true,
    whatsappAlertsEnabled: true,
    milestones: [
      {
        id: 'EVT-082-1',
        stage: 'Reported & Logged',
        timestamp: '2026-08-21T14:15:00Z',
        headline: 'Hazardous Waste Incident Logged',
        details: 'Farmer reported 20 tons of toxic spent acid sludge dumped on survey plot 189/2B.',
        channelsNotified: ['SMS', 'WhatsApp'],
        simulatedNotificationText: '[EDEN-SYNC] Grievance POL-2026-082 registered. Vadodara GPCB wing notified.'
      },
      {
        id: 'EVT-082-2',
        stage: 'Inspection Officer Dispatched',
        timestamp: '2026-08-22T08:30:00Z',
        headline: 'Hazardous Waste Team Mobilized',
        details: 'Dr. Rajesh Solanki reached site with mobile soil testing kit. Zone cordoned off with high-visibility markers.',
        officerName: 'Dr. Rajesh Solanki',
        channelsNotified: ['SMS', 'WhatsApp'],
        simulatedNotificationText: '[EDEN-SYNC UPDATE] Dr. Rajesh Solanki dispatched to survey plot 189/2B for POL-2026-082. Sampling underway.'
      }
    ],
    aiAssessment: {
      riskScore: 89,
      containmentPriority: 'Immediate (< 24h)',
      immediateSafetyMeasures: [
        'Cordon off the 2.5-acre dumping zone with warning tapes to prevent human/animal entry.',
        'Excavate and safely barrel the top 15cm concentrated sludge layer before rain.',
        'Do not cultivate or till the soil to avoid driving toxins deeper into the root zone.'
      ],
      recommendedBioRemediation: [
        'Apply agricultural lime (calcium carbonate) to neutralize extreme acidity (pH < 4.0).',
        'Add high-carbon biochar (20 tons/ha) to immobilize heavy metal ions (Chromium, Lead).',
        'Plant hyper-accumulator sunflowers and Sesbania aculeata for biological extraction.'
      ],
      responsibleAuthorities: ['Gujarat Pollution Control Board (GPCB)', 'District Magistrate Office', 'Agricultural Soil Health Bureau'],
      estimatedEcologicalRecoveryWeeks: 18,
      environmentalHazardSummary: 'Severe acidic soil burn and heavy metal toxicity. Rapid mechanical removal followed by biochar immobilization is mandatory.'
    },
    coordinates: { lat: 22.2412, lng: 73.0825 }
  },
  {
    id: 'POL-2026-083',
    createdAt: '2026-08-22T09:00:00Z',
    domain: 'Water Pollution',
    specificCause: 'Raw Sewage & Urban Drainage Inflow',
    title: 'Bellandur Lake Feeder Channel Raw Sewage Overflow & Toxic Foam',
    description: 'Untreated domestic blackwater and detergent sewage overflowing into lake inlet. Thick toxic chemical foam is flying onto surrounding agricultural nurseries and road users.',
    location: 'Varthur-Kodi Lake Inflow Channel, Bengaluru East',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    surveyNumberOrLandmark: 'Survey 22/1 near Kodi Sluice Gate',
    affectedAreaOrVolume: '15 MLD Raw Sewage Discharge',
    severity: 'High (Active Damage)',
    status: 'Water/Soil Samples in Lab Analysis',
    evidencePhotoUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80',
    complainantName: 'Citizen Water Watchers Network',
    complainantPhone: '+91 99801 88432',
    isAnonymous: true,
    affectedResources: ['Lake Ecosystem', 'Aquatic Flora/Fauna', 'Surrounding Borewells'],
    assignedOfficer: 'Er. Sandeep Rao (KSPCB Lake Health Division)',
    assignedOfficerContact: '+91 98450 67120',
    adminRemarks: 'Water testing under process. Ammonia: 24 ppm, Dissolved Oxygen: 0.8 ppm. Micro-aerators dispatched for temporary oxygenation.',
    smsAlertsEnabled: false,
    whatsappAlertsEnabled: true,
    milestones: [
      {
        id: 'EVT-083-1',
        stage: 'Reported & Logged',
        timestamp: '2026-08-22T09:00:00Z',
        headline: 'Lake Inflow Sewage Influx Reported',
        details: 'Citizen network reported toxic foam and untreated blackwater surge at Kodi inlet.',
        channelsNotified: ['WhatsApp'],
        simulatedNotificationText: '[EDEN-SYNC] Grievance POL-2026-083 logged for Bellandur/Varthur feeder channel.'
      },
      {
        id: 'EVT-083-2',
        stage: 'Inspection Officer Dispatched',
        timestamp: '2026-08-22T13:00:00Z',
        headline: 'Lake Health Division In-Charge On-Site',
        details: 'Er. Sandeep Rao examined inlet sluice. Temporary coir boom placed to trap airborne foam.',
        officerName: 'Er. Sandeep Rao',
        channelsNotified: ['WhatsApp'],
        simulatedNotificationText: '[EDEN-SYNC UPDATE] Officer Sandeep Rao deployed on-site for POL-2026-083. Boom barriers erected.'
      },
      {
        id: 'EVT-083-3',
        stage: 'Water/Soil Samples in Lab Analysis',
        timestamp: '2026-08-23T10:30:00Z',
        headline: 'Lab Analysis: High Phosphate & Dissolved Oxygen Deficit',
        details: 'Testing revealed ammonia at 24 ppm, surfactant phosphates at 12 ppm, and Dissolved Oxygen at 0.8 ppm.',
        sampleTestResults: {
          ph: 8.1,
          tdsPpm: 1450,
          dissolvedOxygen: '0.8 mg/L (Critical)',
          heavyMetalsPresent: false,
          toxicChemicalIdentified: 'Linear Alkylbenzene Sulfonate (Surfactants)'
        },
        channelsNotified: ['WhatsApp'],
        simulatedNotificationText: '[EDEN-SYNC LAB REPORT] Dissolved oxygen at 0.8 ppm. Micro-aerator fountains ordered for POL-2026-083.'
      }
    ],
    aiAssessment: {
      riskScore: 84,
      containmentPriority: 'Urgent (1-3 Days)',
      immediateSafetyMeasures: [
        'Install coir mesh boom barriers across inlet channels to trap flying foam.',
        'Spray bio-surfactant neutralizers at channel weir edges.',
        'Divert raw untreated discharge into constructed modular reed bed filters.'
      ],
      recommendedBioRemediation: [
        'Deploy deep-water aeration fountains to boost Dissolved Oxygen above 4.5 mg/l.',
        'Introduce Lemna minor (duckweed) and Chrysopogon zizanioides for nutrient stripping.',
        'Dose multi-strain probiotic microbes (Nitrosomonas / Nitrobacter) to break down ammonia.'
      ],
      responsibleAuthorities: ['Karnataka State Pollution Control Board (KSPCB)', 'BWSSB', 'Lake Development Authority'],
      estimatedEcologicalRecoveryWeeks: 16,
      environmentalHazardSummary: 'Severe eutrophication and anaerobic decomposition with zero dissolved oxygen. Immediate aerator deployment is critical.'
    },
    coordinates: { lat: 12.9382, lng: 77.7289 }
  },
  {
    id: 'POL-2026-084',
    createdAt: '2026-08-23T11:45:00Z',
    domain: 'Land Pollution',
    specificCause: 'Illegal Plastic & Municipal Solid Waste Dumping',
    title: 'Plastic Waste Burning & Leachate Seepage along River Bank Farmland',
    description: 'Unsegregated municipal plastic and garbage dumped along the river buffer zone. Regular open burning generates hazardous dioxins, and unlined leachate is seeping into adjacent groundnut farms.',
    location: 'Periyar River Riparian Buffer, Aluva Rural',
    district: 'Ernakulam',
    state: 'Kerala',
    surveyNumberOrLandmark: 'Riverbank plot opposite Desom Ferry',
    affectedAreaOrVolume: '1.8 Acres Riparian Land',
    severity: 'Moderate',
    status: 'Reported & Logged',
    evidencePhotoUrl: 'https://images.unsplash.com/photo-1528323273322-d81458248d40?auto=format&fit=crop&w=800&q=80',
    complainantName: 'Mathew Abraham',
    complainantPhone: '+91 94470 23119',
    isAnonymous: false,
    affectedResources: ['Riparian Buffer Soil', 'River Periyar Water Quality', 'Air Quality'],
    assignedOfficer: 'Awaiting Field Allocation',
    adminRemarks: 'Grievance received. Inspection notice forwarded to local Grama Panchayat health inspector.',
    smsAlertsEnabled: true,
    whatsappAlertsEnabled: true,
    milestones: [
      {
        id: 'EVT-084-1',
        stage: 'Reported & Logged',
        timestamp: '2026-08-23T11:45:00Z',
        headline: 'Riverbank Dumping Grievance Registered',
        details: 'Grievance recorded with photographic evidence of plastic combustion and leachate runoff.',
        channelsNotified: ['SMS', 'WhatsApp'],
        simulatedNotificationText: '[EDEN-SYNC] Grievance POL-2026-084 registered for Periyar riparian buffer. Tracking link sent.'
      }
    ],
    aiAssessment: {
      riskScore: 71,
      containmentPriority: 'Standard (1 Week)',
      immediateSafetyMeasures: [
        'Extinguish smoldering plastic piles using soil smothering (avoid toxic water runoff).',
        'Install CCTV deterrent signage and earthen trench barriers to halt night tipping.',
        'Collect leachate in temporary clay-lined sumps.'
      ],
      recommendedBioRemediation: [
        'Clear all non-biodegradable macro-plastics and transport to authorized recycling.',
        'Inoculate soil with lignin-degrading white-rot fungi (Phanerochaete chrysosporium).',
        'Plant dense bamboo & vetiver riparian vegetative buffer strips along the bank.'
      ],
      responsibleAuthorities: ['Kerala State Pollution Control Board', 'Grama Panchayat Sanitation Committee', 'River Protection Council'],
      estimatedEcologicalRecoveryWeeks: 8,
      environmentalHazardSummary: 'Plastic micro-particle contamination and localized soil combustion damage. Requires physical cleanup followed by mycological soil inoculation.'
    },
    coordinates: { lat: 10.1076, lng: 76.3516 }
  }
];
