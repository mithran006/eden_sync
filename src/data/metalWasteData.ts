import { MetalWasteRequest, MetalScrapRate } from '../types';

export const LIVE_METAL_RATES: MetalScrapRate[] = [
  {
    metalType: 'Heavy Farm Iron (Tractor Parts, Plows, Discs)',
    ratePerKgINR: 32,
    marketTrend: 'up',
    description: 'Forged high-tensile carbon steel and cast iron from farming machinery.',
    remediationBenefit: 'Prevents heavy ferric iron oxide leachate from acidicizing soil.'
  },
  {
    metalType: 'Pure Copper (Motor & Pump Windings)',
    ratePerKgINR: 720,
    marketTrend: 'up',
    description: '99.9% electrical grade electrolytic copper windings from burnt farm submersible motors.',
    remediationBenefit: '100% recyclable infinitely; reduces mining pressure on virgin copper ores.'
  },
  {
    metalType: 'Farm Aluminum (Irrigation Pipes & Extrusions)',
    ratePerKgINR: 165,
    marketTrend: 'stable',
    description: 'Lightweight sprinkler pipes, siphon tubes, and farm engine covers.',
    remediationBenefit: 'Stops aluminum ion phytotoxicity that stunts root elongation in acidic loam.'
  },
  {
    metalType: 'Brass Valves & Nozzles (Yellow Brass)',
    ratePerKgINR: 460,
    marketTrend: 'up',
    description: 'Drip irrigation manifolds, check valves, and high-pressure spray lance fittings.',
    remediationBenefit: 'Diverts copper-zinc alloy scrap directly into local foundry re-casting.'
  },
  {
    metalType: 'Lead-Acid Batteries (Tractor & Solar Inverters)',
    ratePerKgINR: 92,
    marketTrend: 'stable',
    description: 'Depleted lead plates and acid casing from tractor starting batteries and solar storage.',
    remediationBenefit: 'Safely eliminates toxic lead leachate that causes severe groundwater toxicity.'
  },
  {
    metalType: 'Galvanized Iron (GI Fencing Mesh & Roof Sheets)',
    ratePerKgINR: 26,
    marketTrend: 'stable',
    description: 'Corrugated roof sheeting, chain-link boundary fencing, and steel trellis wires.',
    remediationBenefit: 'Clears rust tangles that injure farm livestock and degrade soil microbiology.'
  }
];

export const INITIAL_METAL_REQUESTS: MetalWasteRequest[] = [
  {
    id: 'MET-2026-081',
    applicantName: 'Balwinder Singh',
    phone: '+91 98142 88410',
    location: 'Ludhiana Rural, Punjab',
    district: 'Ludhiana',
    state: 'Punjab',
    metalCategory: 'Agricultural Scrap (Tractor Parts, Plows, Discs)',
    estimatedWeightKg: 850,
    estimatedPayoutINR: 27200,
    photoUrl: 'https://images.unsplash.com/photo-1527525443983-6e60c75fff46?auto=format&fit=crop&w=800&q=80',
    status: 'Vehicle Dispatched',
    pickupAddress: 'Farm Gate No. 3, Near Canal Siphon, Kila Raipur',
    preferredPickupDate: '2026-09-18',
    partnerCollector: 'GreenCycle Metallics Punjab (Auth Recycler #PB-882)',
    soilContaminationNoted: false,
    metalsIdentified: ['Structural High-Carbon Steel', 'Cast Iron Discs', 'Grade 8.8 Bolts'],
    phytoremediationCropsRecommended: ['Indian Mustard (Brassica juncea)', 'Sunflower (Helianthus annuus)'],
    greenCreditsEarned: 425,
    createdAt: '2026-09-15T08:30:00.000Z',
    notes: 'Heavy tractor disc harrow scrap loaded onto pallets for hydraulic crane lifting.'
  },
  {
    id: 'MET-2026-082',
    applicantName: 'Muthusamy Gounder',
    phone: '+91 94431 55219',
    location: 'Kangeyam Taluk, Tiruppur, Tamil Nadu',
    district: 'Tiruppur',
    state: 'Tamil Nadu',
    metalCategory: 'Submersible Pumps, Motors & Copper Windings',
    estimatedWeightKg: 140,
    estimatedPayoutINR: 58800,
    photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    status: 'Collection Scheduled',
    pickupAddress: 'SF No. 240/1, Vellakovil Road, Kangeyam',
    preferredPickupDate: '2026-09-19',
    partnerCollector: 'Tamil Nadu Circular Metals Consortium',
    soilContaminationNoted: true,
    metalsIdentified: ['Electrolytic Grade Copper Wire', 'Cast Iron Motor Shell', 'Bronze Bushings'],
    phytoremediationCropsRecommended: ['Vetiver Grass (Chrysopogon zizanioides)', 'Tagetes Patula (Marigold)'],
    greenCreditsEarned: 350,
    createdAt: '2026-09-14T11:15:00.000Z',
    notes: 'Three burnt out 7.5HP submersible borewell pumps removed from decommissioned borewells.'
  },
  {
    id: 'MET-2026-083',
    applicantName: 'Ramesh Patel',
    phone: '+91 98421 77340',
    location: 'Pollachi Taluk, Coimbatore, Tamil Nadu',
    district: 'Coimbatore',
    state: 'Tamil Nadu',
    metalCategory: 'Solar Batteries & Inverter Lead Acid Plates',
    estimatedWeightKg: 320,
    estimatedPayoutINR: 29440,
    photoUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
    status: 'Weighed & Paid',
    pickupAddress: 'Patel Agro Farm, Near Dairy Union Chilling Center',
    preferredPickupDate: '2026-09-12',
    partnerCollector: 'EcoLead Re-Smelters Gujarat (PCB Registered #GJ-412)',
    soilContaminationNoted: true,
    metalsIdentified: ['Lead (Pb) Plates', 'Lead Oxide Paste', 'Polypropylene Casings'],
    phytoremediationCropsRecommended: ['Indian Mustard (Brassica juncea)', 'Sunflower (Helianthus annuus)', 'Vetiver Grass'],
    greenCreditsEarned: 640,
    createdAt: '2026-09-11T14:40:00.000Z',
    notes: 'Four 150Ah tubular solar batteries safely neutralized and collected with CPCB manifest.'
  }
];
