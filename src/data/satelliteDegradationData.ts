import { CountryLandDegradation, DegradationHotspot } from '../types';

export const GLOBAL_COUNTRY_DEGRADATION_DATA: CountryLandDegradation[] = [
  // --- ASIA ---
  {
    id: 'IND',
    country: 'India',
    flag: '🇮🇳',
    continent: 'Asia',
    capital: 'New Delhi',
    totalLandAreaMha: 328.7,
    agriculturalLandMha: 179.8,
    degradedFarmlandMha: 97.85,
    degradationPercentage: 54.4,
    annualDegradationRatePercent: 1.15,
    economicCropLossUSD_Billion: 43.8,
    primaryDrivers: [
      'Water Erosion & Sheet Wash',
      'Canal Seepage Salinization (Indo-Gangetic)',
      'Chemical Fertilizer & Pesticide Acidification',
      'Severe Groundwater Depletion & Hardpan'
    ],
    severity: 'Critical (>40%)',
    hotspots: [
      { name: 'Indo-Gangetic Alkaline Belt', stateOrRegion: 'Punjab & Haryana', problem: 'Capillary salt crusting from flood canal irrigation', coordinates: [30.7333, 76.7794], areaSqKm: 28000 },
      { name: 'Marathwada Drought & Cracking Clay', stateOrRegion: 'Maharashtra', problem: 'Deep vertisol moisture drought & organic carbon < 0.25%', coordinates: [19.8762, 75.3433], areaSqKm: 64000 },
      { name: 'Chambal Ravines Gullying', stateOrRegion: 'Madhya Pradesh / Rajasthan', problem: 'Extreme soil erosion carving 40m deep dry ravines', coordinates: [26.5000, 78.5000], areaSqKm: 12500 },
      { name: 'Rayalaseema Red Soil Desertification', stateOrRegion: 'Andhra Pradesh', problem: 'Severe wind erosion and borewell drying', coordinates: [14.6819, 77.6006], areaSqKm: 32000 }
    ],
    satelliteMetrics: {
      ndviMean: 0.38,
      ndviAnomaly10Yr: -0.12,
      soilMoistureIndex: 26.4,
      landSurfaceTempC: 38.6,
      bareSoilIndex: 58.2,
      vegetationHealthIndex: 41.5,
      lastSatellitePass: '2026-09-16T05:32:00Z',
      sentinelTileId: 'T43RGP (Sentinel-2B)'
    },
    unccdTarget: {
      targetYear: 2030,
      netZeroTarget: '26 Million Hectares Restored',
      commitment: 'Bonn Challenge pledge expanded to 26 Mha LDN by 2030 through agro-forestry & zero-budget bio-inputs.'
    },
    restorationProtocols: [
      'Sub-surface terracotta clay pot (Olla) localized irrigation',
      'Jeevamrutha & Dashaparni Ark microbial biomass replenishment',
      'Gypsum amendment on alkaline sodic soils with Daincha green manure',
      'Vetiver grass contour bunds along erosion slopes'
    ],
    healthyImageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    degradedImageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    ndviMapUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80',
    summary: 'Over 97 million hectares of Indian farmland face active degradation. In the northwest, excessive chemical NPK and intensive tube-well extraction have triggered severe salinization, while peninsular drylands suffer from chronic topsoil loss and organic carbon depletion below 0.3%.'
  },
  {
    id: 'CHN',
    country: 'China',
    flag: '🇨🇳',
    continent: 'Asia',
    capital: 'Beijing',
    totalLandAreaMha: 959.7,
    agriculturalLandMha: 528.5,
    degradedFarmlandMha: 135.2,
    degradationPercentage: 25.6,
    annualDegradationRatePercent: 0.65,
    economicCropLossUSD_Billion: 39.2,
    primaryDrivers: [
      'Wind Erosion & Gobi Desertification',
      'Loess Plateau Gully Erosion',
      'Industrial Heavy Metal Contamination (Cadmium/Lead)',
      'Intensive Plastic Film Mulch Residue'
    ],
    severity: 'High (25-40%)',
    hotspots: [
      { name: 'Loess Plateau Gully Region', stateOrRegion: 'Shaanxi / Shanxi', problem: 'Silt runoff into Yellow River, fragile yellow silt layers', coordinates: [36.0000, 109.0000], areaSqKm: 640000 },
      { name: 'Hunan Rice Heavy Metal Belt', stateOrRegion: 'Hunan Province', problem: 'Mine tailings and acid rain leaching cadmium into paddy', coordinates: [27.6000, 111.7000], areaSqKm: 18500 },
      { name: 'Inner Mongolia Steppe Sandification', stateOrRegion: 'Inner Mongolia', problem: 'Overgrazing converted dry steppe into mobile sand dunes', coordinates: [43.8000, 115.0000], areaSqKm: 92000 }
    ],
    satelliteMetrics: {
      ndviMean: 0.44,
      ndviAnomaly10Yr: +0.04,
      soilMoistureIndex: 32.1,
      landSurfaceTempC: 29.4,
      bareSoilIndex: 48.0,
      vegetationHealthIndex: 56.8,
      lastSatellitePass: '2026-09-17T02:18:00Z',
      sentinelTileId: 'T50SNH (Sentinel-2A)'
    },
    unccdTarget: {
      targetYear: 2030,
      netZeroTarget: 'Zero Net Desertification & Grain Soil Protection',
      commitment: 'Three-North Shelter Forest Program expansion and Black Soil Protection Law in Northeast Heilongjiang.'
    },
    restorationProtocols: [
      'Straw checkerboard sand fixation barriers',
      'Terracing with sea buckthorn and caragana shrubs',
      'Phytoremediation using hyperaccumulating sedum & willow',
      'Zero-till deep straw returning on northeast mollisols'
    ],
    healthyImageUrl: 'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&w=1200&q=80',
    degradedImageUrl: 'https://images.unsplash.com/photo-1545153996-e01b50d6f36a?auto=format&fit=crop&w=1200&q=80',
    ndviMapUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
    summary: 'Despite massive tree-planting campaigns, China contends with heavy industrial metal runoff in southern rice paddies and severe white plastic mulch residue across 20 million hectares of northern drylands.'
  },
  {
    id: 'KAZ',
    country: 'Kazakhstan',
    flag: '🇰🇿',
    continent: 'Asia',
    capital: 'Astana',
    totalLandAreaMha: 272.5,
    agriculturalLandMha: 215.3,
    degradedFarmlandMha: 66.8,
    degradationPercentage: 31.0,
    annualDegradationRatePercent: 0.82,
    economicCropLossUSD_Billion: 5.4,
    primaryDrivers: [
      'Aral Sea Salt Dust Storms',
      'Soviet Virgin Lands Wind Erosion',
      'Pasture Overgrazing & Aridification'
    ],
    severity: 'High (25-40%)',
    hotspots: [
      { name: 'Aral-Karakum Dried Seabed', stateOrRegion: 'Kyzylorda Region', problem: 'Toxic salty dust storms blowing pesticides across 500km', coordinates: [45.0000, 60.0000], areaSqKm: 54000 },
      { name: 'Northern Steppe Monoculture Plains', stateOrRegion: 'Kostanay / Akmola', problem: 'Humus loss from 60 years of continuous spring wheat', coordinates: [53.2000, 63.6000], areaSqKm: 78000 }
    ],
    satelliteMetrics: {
      ndviMean: 0.28,
      ndviAnomaly10Yr: -0.16,
      soilMoistureIndex: 18.2,
      landSurfaceTempC: 32.8,
      bareSoilIndex: 69.4,
      vegetationHealthIndex: 33.2,
      lastSatellitePass: '2026-09-15T08:12:00Z',
      sentinelTileId: 'T41UPA (Sentinel-2A)'
    },
    unccdTarget: {
      targetYear: 2030,
      netZeroTarget: 'Saxaul Forest Plantation on Aralkum',
      commitment: 'Afforestation of 1.1 million hectares of the dry Aral seabed with black saxaul shrubs.'
    },
    restorationProtocols: [
      'Black saxaul (Haloxylon aphyllum) aerial seedling drop',
      'Strip cropping and winter snow retention ridging',
      'Rotational mobile pasture management with native fescue'
    ],
    healthyImageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
    degradedImageUrl: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=1200&q=80',
    ndviMapUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80',
    summary: 'The drying of the Aral Sea created the new Aralkum Desert, releasing 100+ million tons of toxic salt and dust annually onto Central Asian grain pastures and reducing yields by 20-30%.'
  },
  {
    id: 'PAK',
    country: 'Pakistan',
    flag: '🇵🇰',
    continent: 'Asia',
    capital: 'Islamabad',
    totalLandAreaMha: 79.6,
    agriculturalLandMha: 36.3,
    degradedFarmlandMha: 15.6,
    degradationPercentage: 43.0,
    annualDegradationRatePercent: 1.2,
    economicCropLossUSD_Billion: 7.8,
    primaryDrivers: [
      'Indus Basin Waterlogging & Salinity (Thur/Sem)',
      'Catastrophic Flood Scouring & Silt Smothering',
      'Deforestation in Potohar Plateau'
    ],
    severity: 'Critical (>40%)',
    hotspots: [
      { name: 'Lower Indus Saline Trough', stateOrRegion: 'Sindh Province', problem: 'Water table rose to 1m from surface, encrusting white salt', coordinates: [25.8943, 68.5247], areaSqKm: 34000 },
      { name: 'Thal Desert Margin Sandification', stateOrRegion: 'Punjab (Bhakkar/Layyah)', problem: 'Groundwater drop and dune shifting over cotton fields', coordinates: [31.6000, 71.5000], areaSqKm: 19000 }
    ],
    satelliteMetrics: {
      ndviMean: 0.33,
      ndviAnomaly10Yr: -0.15,
      soilMoistureIndex: 22.0,
      landSurfaceTempC: 41.2,
      bareSoilIndex: 64.1,
      vegetationHealthIndex: 35.4,
      lastSatellitePass: '2026-09-16T06:05:00Z',
      sentinelTileId: 'T42RTN (Sentinel-2B)'
    },
    unccdTarget: {
      targetYear: 2030,
      netZeroTarget: 'Recharge Pakistan Nature-based Climate Defense',
      commitment: 'Restoring 30 wetland sites along the Indus to mitigate seasonal floods and salinity.'
    },
    restorationProtocols: [
      'Tile drainage systems paired with biosaline halophyte cultivation',
      'Eucalyptus & Tamarix biodrainage tree belts',
      'Laser land leveling to eliminate shallow puddle waterlogging'
    ],
    healthyImageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80',
    degradedImageUrl: 'https://images.unsplash.com/photo-1545153996-e01b50d6f36a?auto=format&fit=crop&w=1200&q=80',
    ndviMapUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
    summary: 'The vast canal system of the Indus Basin is suffocating from twin curses of waterlogging and white salinity. In Sindh, millions of acres of prime cotton and wheat lands are encrusted in salt crusts.'
  },
  {
    id: 'IDN',
    country: 'Indonesia',
    flag: '🇮🇩',
    continent: 'Asia',
    capital: 'Jakarta (Nusantara)',
    totalLandAreaMha: 190.5,
    agriculturalLandMha: 62.3,
    degradedFarmlandMha: 14.2,
    degradationPercentage: 22.8,
    annualDegradationRatePercent: 0.95,
    economicCropLossUSD_Billion: 6.9,
    primaryDrivers: [
      'Peatland Drainage & Underground Peat Fires',
      'Deforestation for Monoculture Palm Plantations',
      'Acid Sulfate Soil Oxidation'
    ],
    severity: 'Moderate (15-25%)',
    hotspots: [
      { name: 'Central Kalimantan Deep Peatlands', stateOrRegion: 'Kalimantan', problem: 'Canal drainage triggered spontaneous subsurface peat fires', coordinates: [-2.2000, 113.9000], areaSqKm: 22000 },
      { name: 'Riau Lowland Acid Sulfate Plain', stateOrRegion: 'Sumatra', problem: 'Pyrite oxidation causing extreme soil pH drop to 2.8', coordinates: [0.5000, 101.4000], areaSqKm: 16500 }
    ],
    satelliteMetrics: {
      ndviMean: 0.68,
      ndviAnomaly10Yr: -0.09,
      soilMoistureIndex: 61.2,
      landSurfaceTempC: 28.5,
      bareSoilIndex: 29.3,
      vegetationHealthIndex: 58.1,
      lastSatellitePass: '2026-09-17T03:45:00Z',
      sentinelTileId: 'T48MZT (Sentinel-2A)'
    },
    unccdTarget: {
      targetYear: 2030,
      netZeroTarget: 'Peatland Rewetting & Mangrove Restoration (2.4 Mha)',
      commitment: 'Restoring 2.4 million hectares of drained peatlands via canal blocking dams.'
    },
    restorationProtocols: [
      'Canal blocking dams to re-elevate groundwater in peat domes',
      'Paludiculture (wetland farming of sago palm and illipe nut)',
      'Biochar application to neutralize toxic aluminum in acid soils'
    ],
    healthyImageUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80',
    degradedImageUrl: 'https://images.unsplash.com/photo-1498084393753-b411b2d26b34?auto=format&fit=crop&w=1200&q=80',
    ndviMapUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80',
    summary: 'Drained tropical peat soils in Sumatra and Kalimantan oxidize into combustible dry carbon sponges, releasing gigatons of CO2 and rendering once-lush rainforest soils hyper-acidic and prone to catastrophic fires.'
  },
  {
    id: 'TUR',
    country: 'Turkey',
    flag: '🇹🇷',
    continent: 'Asia',
    capital: 'Ankara',
    totalLandAreaMha: 78.4,
    agriculturalLandMha: 37.7,
    degradedFarmlandMha: 16.8,
    degradationPercentage: 44.5,
    annualDegradationRatePercent: 1.05,
    economicCropLossUSD_Billion: 5.1,
    primaryDrivers: [
      'Steep Slope Water Erosion',
      'Central Anatolian Arid Sinkholes (Obruks)',
      'Over-irrigation Salinization in Harran Plain'
    ],
    severity: 'Critical (>40%)',
    hotspots: [
      { name: 'Konya Basin Groundwater Sinkholes', stateOrRegion: 'Central Anatolia', problem: 'Excessive corn irrigation caused 2,500 giant sinkholes', coordinates: [37.8746, 32.4932], areaSqKm: 39000 },
      { name: 'Harran Plain Secondary Salinity', stateOrRegion: 'Şanlıurfa', problem: 'Poor drainage of GAP canal irrigation salts', coordinates: [36.8667, 39.0333], areaSqKm: 14000 }
    ],
    satelliteMetrics: {
      ndviMean: 0.35,
      ndviAnomaly10Yr: -0.14,
      soilMoistureIndex: 21.5,
      landSurfaceTempC: 34.2,
      bareSoilIndex: 61.3,
      vegetationHealthIndex: 39.0,
      lastSatellitePass: '2026-09-16T09:20:00Z',
      sentinelTileId: 'T36SWD (Sentinel-2B)'
    },
    unccdTarget: {
      targetYear: 2030,
      netZeroTarget: 'National Soil Erosion Action Plan',
      commitment: 'Terracing and agroforestry across 1.5 million hectares of Anatolian hillsides.'
    },
    restorationProtocols: [
      'Switch from water-guzzling maize/sugar beet to drought-tolerant pulses',
      'Stone contour walls to arrest slope wash in Taurus foothills',
      'Drip fertigation with humic acid on saline soils'
    ],
    healthyImageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    degradedImageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    ndviMapUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
    summary: 'In Central Anatolia’s breadbasket, over 2,500 giant sinkholes have swallowed arable land due to illicit deep aquifer pumping for water-intensive cash crops.'
  },

  // --- AFRICA ---
  {
    id: 'NGA',
    country: 'Nigeria',
    flag: '🇳🇬',
    continent: 'Africa',
    capital: 'Abuja',
    totalLandAreaMha: 92.4,
    agriculturalLandMha: 70.8,
    degradedFarmlandMha: 31.8,
    degradationPercentage: 44.9,
    annualDegradationRatePercent: 1.45,
    economicCropLossUSD_Billion: 8.9,
    primaryDrivers: [
      'Sahara Desert Encroachment (3.5 km/year)',
      'Severe Gully Erosion in Southeast (Anambra/Imo)',
      'Soil Compaction & Slash-and-Burn Nutrient Loss'
    ],
    severity: 'Critical (>40%)',
    hotspots: [
      { name: 'Northern Sahel Desert Front', stateOrRegion: 'Sokoto / Katsina / Borno', problem: 'Desert dunes creeping south into millet farms', coordinates: [13.0609, 5.2339], areaSqKm: 85000 },
      { name: 'Southeastern Gully Canyon Complex', stateOrRegion: 'Anambra / Enugu', problem: 'Tropical torrential rain gouging 60m deep chasms', coordinates: [6.2209, 7.0722], areaSqKm: 14000 }
    ],
    satelliteMetrics: {
      ndviMean: 0.39,
      ndviAnomaly10Yr: -0.18,
      soilMoistureIndex: 28.5,
      landSurfaceTempC: 37.4,
      bareSoilIndex: 59.8,
      vegetationHealthIndex: 36.7,
      lastSatellitePass: '2026-09-17T10:14:00Z',
      sentinelTileId: 'T32PNA (Sentinel-2A)'
    },
    unccdTarget: {
      targetYear: 2030,
      netZeroTarget: 'Great Green Wall Nigeria Pillar',
      commitment: 'Reclaiming 4 million hectares of frontline desertified savanna through shelterbelts.'
    },
    restorationProtocols: [
      'Farmer-Managed Natural Regeneration (FMNR) of Acacia albida trees',
      'Bamboo planting along gully heads to anchor unstable sandstones',
      'Composting farm biomass instead of bush burning'
    ],
    healthyImageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
    degradedImageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    ndviMapUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80',
    summary: 'The Sahara advances southward into Nigeria at an estimated 3.5 km per year, wiping out grazing corridors and dryland grain farms, while monster gullies swallow entire villages in the southeast.'
  },
  {
    id: 'EGY',
    country: 'Egypt',
    flag: '🇪🇬',
    continent: 'Africa',
    capital: 'Cairo',
    totalLandAreaMha: 100.1,
    agriculturalLandMha: 3.8,
    degradedFarmlandMha: 1.52,
    degradationPercentage: 40.0,
    annualDegradationRatePercent: 1.1,
    economicCropLossUSD_Billion: 3.4,
    primaryDrivers: [
      'Nile Delta Rising Sea Level Salinization',
      'Urban Sprawl Smothering Prime Alluvium',
      'Water Table Rise & Drainage Mineralization'
    ],
    severity: 'Critical (>40%)',
    hotspots: [
      { name: 'Northern Delta Coastal Salinity', stateOrRegion: 'Kafr El Sheikh / Damietta', problem: 'Mediterranean seawater intrusion into rice paddies', coordinates: [31.3000, 31.0000], areaSqKm: 8500 },
      { name: 'Greater Cairo Peri-Urban Loss', stateOrRegion: 'Qalyubia / Giza', problem: 'Concrete construction on 5,000-year-old Nile silt', coordinates: [30.0444, 31.2357], areaSqKm: 3200 }
    ],
    satelliteMetrics: {
      ndviMean: 0.42,
      ndviAnomaly10Yr: -0.11,
      soilMoistureIndex: 25.1,
      landSurfaceTempC: 39.8,
      bareSoilIndex: 72.0,
      vegetationHealthIndex: 42.1,
      lastSatellitePass: '2026-09-16T08:50:00Z',
      sentinelTileId: 'T36RUF (Sentinel-2B)'
    },
    unccdTarget: {
      targetYear: 2030,
      netZeroTarget: 'New Delta Toshka & Subsurface Drainage Rehabilitation',
      commitment: 'Subsurface drainage modernization across 2 million feddans in the Nile Valley.'
    },
    restorationProtocols: [
      'Laser leveling combined with salt-tolerant barley and quinoa strains',
      'Subsurface corrugated drainage pipes to lower saline water table',
      'Bio-saline aquaculture integrated with salicornia cultivation'
    ],
    healthyImageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    degradedImageUrl: 'https://images.unsplash.com/photo-1545153996-e01b50d6f36a?auto=format&fit=crop&w=1200&q=80',
    ndviMapUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
    summary: 'Less than 4% of Egypt’s vast land is arable. Over 40% of the fertile Nile Delta is under dual assault from Mediterranean saltwater intrusion and illegal concrete urban encroachment.'
  },
  {
    id: 'KEN',
    country: 'Kenya',
    flag: '🇰🇪',
    continent: 'Africa',
    capital: 'Nairobi',
    totalLandAreaMha: 58.0,
    agriculturalLandMha: 27.6,
    degradedFarmlandMha: 11.2,
    degradationPercentage: 40.6,
    annualDegradationRatePercent: 1.3,
    economicCropLossUSD_Billion: 2.8,
    primaryDrivers: [
      'Multi-Year Horn of Africa Drought',
      'Overgrazing in ASAL (Arid & Semi-Arid Lands)',
      'Soil Acidification in Tea/Coffee Highlands'
    ],
    severity: 'Critical (>40%)',
    hotspots: [
      { name: 'Turkana Arid Pastoral Plains', stateOrRegion: 'Turkana County', problem: 'Vegetation canopy collapse & dust scouring', coordinates: [3.1167, 35.6000], areaSqKm: 68000 },
      { name: 'Machakos Semi-Arid Terraced Hills', stateOrRegion: 'Eastern Kenya', problem: 'Sheet wash stripped topsoil from steep maize farms', coordinates: [-1.5167, 37.2667], areaSqKm: 14200 }
    ],
    satelliteMetrics: {
      ndviMean: 0.31,
      ndviAnomaly10Yr: -0.22,
      soilMoistureIndex: 19.4,
      landSurfaceTempC: 35.6,
      bareSoilIndex: 65.4,
      vegetationHealthIndex: 30.8,
      lastSatellitePass: '2026-09-17T07:30:00Z',
      sentinelTileId: 'T37MBQ (Sentinel-2A)'
    },
    unccdTarget: {
      targetYear: 2030,
      netZeroTarget: '5.1 Million Hectares Restored under AFR100',
      commitment: 'Scaling agroforestry, water pans, and Fanya-Juu terracing across arid counties.'
    },
    restorationProtocols: [
      'Fanya Juu (throw-upward) trench terracing to trap runoff and topsoil',
      'Water pans (pond catchments) with vetiver grass edges',
      'Agroforestry intercropping with Calliandra and Sesbania'
    ],
    healthyImageUrl: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80',
    degradedImageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    ndviMapUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80',
    summary: 'Chronic consecutive failed rainy seasons in the Horn of Africa decimated pastures. Traditional maize farms on unprotected hillsides have lost up to 40 tons of topsoil per hectare annually.'
  },
  {
    id: 'ETH',
    country: 'Ethiopia',
    flag: '🇪🇹',
    continent: 'Africa',
    capital: 'Addis Ababa',
    totalLandAreaMha: 110.4,
    agriculturalLandMha: 38.0,
    degradedFarmlandMha: 17.5,
    degradationPercentage: 46.1,
    annualDegradationRatePercent: 1.35,
    economicCropLossUSD_Billion: 4.6,
    primaryDrivers: [
      'Highland Water Erosion & Torrential Gullying',
      'Soil Acidity (pH < 5.0) in High-Rainfall Belts',
      'Severe Deforestation for Fuelwood'
    ],
    severity: 'Critical (>40%)',
    hotspots: [
      { name: 'Tigray & Amhara Highlands', stateOrRegion: 'Northern Ethiopia', problem: 'Thin rocky slopes stripped of all fertile top humus', coordinates: [13.5000, 39.4667], areaSqKm: 52000 },
      { name: 'Rift Valley Pastoral Aridification', stateOrRegion: 'Afar / Somali Region', problem: 'Invasive Prosopis juliflora shrubs choking native grasses', coordinates: [9.5000, 41.5000], areaSqKm: 38000 }
    ],
    satelliteMetrics: {
      ndviMean: 0.36,
      ndviAnomaly10Yr: -0.17,
      soilMoistureIndex: 23.8,
      landSurfaceTempC: 31.2,
      bareSoilIndex: 62.0,
      vegetationHealthIndex: 37.5,
      lastSatellitePass: '2026-09-16T07:15:00Z',
      sentinelTileId: 'T37NEV (Sentinel-2B)'
    },
    unccdTarget: {
      targetYear: 2030,
      netZeroTarget: 'Green Legacy Initiative (22 Mha)',
      commitment: '22 million hectares under community watershed physical soil & water conservation.'
    },
    restorationProtocols: [
      'Community physical stone bunds and deep infiltration pits',
      'Agricultural lime application to neutralize highland aluminum toxicity',
      'Enclosure zones (exclosures) to allow natural bush regeneration'
    ],
    healthyImageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    degradedImageUrl: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=1200&q=80',
    ndviMapUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
    summary: 'The Ethiopian highlands lose an estimated 1.5 billion tons of topsoil every single year into the Blue Nile basin, exposing underlying volcanic rock and creating structural food insecurity.'
  },
  {
    id: 'ZAF',
    country: 'South Africa',
    flag: '🇿🇦',
    continent: 'Africa',
    capital: 'Pretoria / Cape Town',
    totalLandAreaMha: 121.9,
    agriculturalLandMha: 96.3,
    degradedFarmlandMha: 26.5,
    degradationPercentage: 27.5,
    annualDegradationRatePercent: 0.88,
    economicCropLossUSD_Billion: 3.9,
    primaryDrivers: [
      'Karoo Desertification & Shrub Bush Encroachment',
      'Overgrazing in Communal Rangelands',
      'Acid Mine Drainage & Heavy Metal Seepage'
    ],
    severity: 'High (25-40%)',
    hotspots: [
      { name: 'Succulent Karoo Shrub Die-off', stateOrRegion: 'Western / Northern Cape', problem: 'Historic drought decimated perennial dwarf shrubs', coordinates: [-31.0000, 20.0000], areaSqKm: 72000 },
      { name: 'Highveld Coal Belt Acid Runoff', stateOrRegion: 'Mpumalanga', problem: 'Pyrite mine leachate contaminating prime maize soils', coordinates: [-26.2500, 29.2500], areaSqKm: 18000 }
    ],
    satelliteMetrics: {
      ndviMean: 0.32,
      ndviAnomaly10Yr: -0.13,
      soilMoistureIndex: 20.7,
      landSurfaceTempC: 30.1,
      bareSoilIndex: 64.9,
      vegetationHealthIndex: 40.2,
      lastSatellitePass: '2026-09-17T08:42:00Z',
      sentinelTileId: 'T35JML (Sentinel-2A)'
    },
    unccdTarget: {
      targetYear: 2030,
      netZeroTarget: 'Land Degradation Neutrality Target Plan',
      commitment: 'Rehabilitating 12% of degraded cropland and 2.5 million ha of bush-encroached rangeland.'
    },
    restorationProtocols: [
      'Spekboom (Portulacaria afra) planting for extreme carbon & moisture retention',
      'Holistic high-density short-duration livestock rotational grazing',
      'Liming and constructed wetland filters for acid mine drainage water'
    ],
    healthyImageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    degradedImageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    ndviMapUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80',
    summary: 'South Africa’s commercial breadbasket faces chronic water scarcity, while millions of hectares of rangeland in the Karoo and communal homelands suffer from severe gully erosion (dongas) and invasive wattle.'
  },

  // --- AMERICAS ---
  {
    id: 'USA',
    country: 'United States',
    flag: '🇺🇸',
    continent: 'Americas',
    capital: 'Washington, D.C.',
    totalLandAreaMha: 914.7,
    agriculturalLandMha: 362.4,
    degradedFarmlandMha: 89.2,
    degradationPercentage: 24.6,
    annualDegradationRatePercent: 0.55,
    economicCropLossUSD_Billion: 34.0,
    primaryDrivers: [
      'Corn Belt Topsoil Loss (5-10 tons/acre/yr)',
      'Ogallala Aquifer Depletion & Subsidence',
      'California Central Valley Soil Compaction & Salinization',
      'Herbicide-Resistant Superweed Invasions'
    ],
    severity: 'Moderate (15-25%)',
    hotspots: [
      { name: 'California Central Valley Subsidence', stateOrRegion: 'California (San Joaquin)', problem: 'Ground sank 28 feet from groundwater overdraft; salt build-up', coordinates: [36.7783, -119.4179], areaSqKm: 42000 },
      { name: 'High Plains Ogallala Aquifer Belt', stateOrRegion: 'Kansas / Nebraska / Texas', problem: 'Irrigation well drying forcing reversion to dryland dust', coordinates: [37.5000, -100.5000], areaSqKm: 120000 },
      { name: 'Midwest Corn Belt Soil Washout', stateOrRegion: 'Iowa / Illinois', problem: 'Black mollisol topsoil washed away by intense storm bursts', coordinates: [42.0000, -93.5000], areaSqKm: 85000 }
    ],
    satelliteMetrics: {
      ndviMean: 0.52,
      ndviAnomaly10Yr: -0.06,
      soilMoistureIndex: 35.8,
      landSurfaceTempC: 28.2,
      bareSoilIndex: 42.1,
      vegetationHealthIndex: 52.4,
      lastSatellitePass: '2026-09-17T17:22:00Z',
      sentinelTileId: 'T14TPN (Sentinel-2A)'
    },
    unccdTarget: {
      targetYear: 2030,
      netZeroTarget: 'USDA Conservation Reserve Program (CRP) 27M Acres',
      commitment: 'Scaling multi-species winter cover crops and conservation tillage across 30 million acres.'
    },
    restorationProtocols: [
      'Multi-species winter cover crops (cereal rye + hairy vetch + radishes)',
      'No-till and strip-till planting into green living covers',
      'Managed aquifer recharge (Ag-MAR) during winter flood flows',
      'Prairie strip integration within row-crop fields to reduce runoff by 90%'
    ],
    healthyImageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    degradedImageUrl: 'https://images.unsplash.com/photo-1545153996-e01b50d6f36a?auto=format&fit=crop&w=1200&q=80',
    ndviMapUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
    summary: 'The United States loses valuable agricultural topsoil at 10 times the natural replenishment rate in the Midwest, while the critical Ogallala aquifer supporting 30% of US grain output is on track for irreversible exhaustion.'
  },
  {
    id: 'BRA',
    country: 'Brazil',
    flag: '🇧🇷',
    continent: 'Americas',
    capital: 'Brasília',
    totalLandAreaMha: 846.0,
    agriculturalLandMha: 236.8,
    degradedFarmlandMha: 78.4,
    degradationPercentage: 33.1,
    annualDegradationRatePercent: 1.1,
    economicCropLossUSD_Billion: 18.5,
    primaryDrivers: [
      'Degraded Brachiaria Pastureland Compaction',
      'Cerrado Biome Aridification & Forest Clearing',
      'Oxidized Acid Ferralsols Phosphorus Locking'
    ],
    severity: 'High (25-40%)',
    hotspots: [
      { name: 'Cerrado MATOPIBA Soy Expansion', stateOrRegion: 'Maranhão / Tocantins', problem: 'Deep plowing of savanna sandy soils causing severe erosion', coordinates: [-8.5000, -46.0000], areaSqKm: 95000 },
      { name: 'Amazon Arc of Deforestation Cattle Belt', stateOrRegion: 'Pará / Mato Grosso', problem: 'Leached tropical soil pasture degradation after 5 years', coordinates: [-10.0000, -55.0000], areaSqKm: 140000 }
    ],
    satelliteMetrics: {
      ndviMean: 0.58,
      ndviAnomaly10Yr: -0.11,
      soilMoistureIndex: 44.5,
      landSurfaceTempC: 32.1,
      bareSoilIndex: 38.6,
      vegetationHealthIndex: 49.3,
      lastSatellitePass: '2026-09-17T13:48:00Z',
      sentinelTileId: 'T22LEG (Sentinel-2B)'
    },
    unccdTarget: {
      targetYear: 2030,
      netZeroTarget: 'ABC+ Plan (Low-Carbon Agriculture 40 Mha)',
      commitment: 'Rehabilitating 40 million hectares of degraded cattle pastures into integrated crop-livestock-forestry (ILPF).'
    },
    restorationProtocols: [
      'Integrated Crop-Livestock-Forestry (ILPF) rotational systems',
      'Deep-rooting Brachiaria decumbens over-seeding with biological nitrogen-fixers',
      'Surface application of crushed silicate rock dust (rock powder / remineralization)'
    ],
    healthyImageUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80',
    degradedImageUrl: 'https://images.unsplash.com/photo-1498084393753-b411b2d26b34?auto=format&fit=crop&w=1200&q=80',
    ndviMapUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80',
    summary: 'Brazil has nearly 80 million hectares of severely degraded pastureland—an area larger than France. Restoring these lands could double agricultural output without felling another tree in the Amazon.'
  },
  {
    id: 'ARG',
    country: 'Argentina',
    flag: '🇦🇷',
    continent: 'Americas',
    capital: 'Buenos Aires',
    totalLandAreaMha: 273.7,
    agriculturalLandMha: 148.7,
    degradedFarmlandMha: 38.2,
    degradationPercentage: 25.7,
    annualDegradationRatePercent: 0.78,
    economicCropLossUSD_Billion: 9.2,
    primaryDrivers: [
      'Historic Pampas Drought & Dust Storms',
      'Soybean Monoculture Soil Organic Carbon Depletion',
      'Rising Water Table Salinization in Flat Plains'
    ],
    severity: 'High (25-40%)',
    hotspots: [
      { name: 'Humid Pampas Carbon Deficit Plain', stateOrRegion: 'Buenos Aires / Córdoba', problem: 'Loss of 50% soil organic matter from continuous GM soy', coordinates: [-34.6037, -58.3816], areaSqKm: 88000 },
      { name: 'Dry Chaco Deforestation Frontier', stateOrRegion: 'Santiago del Estero', problem: 'Wind erosion stripping light sandy loams', coordinates: [-27.8000, -64.2500], areaSqKm: 42000 }
    ],
    satelliteMetrics: {
      ndviMean: 0.46,
      ndviAnomaly10Yr: -0.14,
      soilMoistureIndex: 27.2,
      landSurfaceTempC: 27.8,
      bareSoilIndex: 51.4,
      vegetationHealthIndex: 43.6,
      lastSatellitePass: '2026-09-17T14:10:00Z',
      sentinelTileId: 'T21HUB (Sentinel-2A)'
    },
    unccdTarget: {
      targetYear: 2030,
      netZeroTarget: 'Zero Net Degradation in Gran Chaco & Pampas',
      commitment: 'Mandating crop rotations and cover crops to reverse the 50% organic matter deficit.'
    },
    restorationProtocols: [
      'Mandatory grass-legume pastures in rotation with grain crops',
      'Direct drilling into permanent organic residue carpets',
      'Forest windbreaks with native Algarrobo (Prosopis) trees'
    ],
    healthyImageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    degradedImageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    ndviMapUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
    summary: 'Argentina’s fertile Pampas suffered devastating yields during recent triple-dip La Niña droughts, compounded by decades of continuous soybean monoculture that depleted the natural soil sponge.'
  },
  {
    id: 'MEX',
    country: 'Mexico',
    flag: '🇲🇽',
    continent: 'Americas',
    capital: 'Mexico City',
    totalLandAreaMha: 194.4,
    agriculturalLandMha: 107.8,
    degradedFarmlandMha: 59.3,
    degradationPercentage: 55.0,
    annualDegradationRatePercent: 1.25,
    economicCropLossUSD_Billion: 6.4,
    primaryDrivers: [
      'Severe Water & Wind Erosion on Steep Slopes',
      'Over-exploitation of Northern Arid Aquifers',
      'Excessive Agrochemical Soil Sterilization'
    ],
    severity: 'Critical (>40%)',
    hotspots: [
      { name: 'Northern Arid Bajío Aquifer Deficit', stateOrRegion: 'Guanajuato / Zacatecas', problem: 'Deep wells drying up, arsenic and fluorine salt mobilization', coordinates: [21.0000, -101.0000], areaSqKm: 58000 },
      { name: 'Oaxaca Sierra Sur Eroded Slopes', stateOrRegion: 'Oaxaca', problem: 'Traditional milpas on 45° slopes stripped of topsoil down to bedrock', coordinates: [16.8000, -96.5000], areaSqKm: 24000 }
    ],
    satelliteMetrics: {
      ndviMean: 0.37,
      ndviAnomaly10Yr: -0.18,
      soilMoistureIndex: 23.4,
      landSurfaceTempC: 34.6,
      bareSoilIndex: 61.2,
      vegetationHealthIndex: 36.1,
      lastSatellitePass: '2026-09-17T18:05:00Z',
      sentinelTileId: 'T14QNF (Sentinel-2B)'
    },
    unccdTarget: {
      targetYear: 2030,
      netZeroTarget: 'Sembrando Vida Agroforestry Program (1.2 Mha)',
      commitment: 'Restoring degraded family farmland through traditional Milpa Intercalada con Árboles Frutales (MIAF).'
    },
    restorationProtocols: [
      'MIAF (Milpa Intercalated with Fruit Trees and Contour Vetiver)',
      'Keyline subsoiling along natural elevation contours',
      'Agave and nopal cactus agro-ecosystems for hyper-arid soil building'
    ],
    healthyImageUrl: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80',
    degradedImageUrl: 'https://images.unsplash.com/photo-1545153996-e01b50d6f36a?auto=format&fit=crop&w=1200&q=80',
    ndviMapUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80',
    summary: 'Over half of Mexico’s territory suffers from moderate to extreme degradation. Rapidly depleting northern aquifers and torrential gully erosion in mountainous indigenous regions threaten basic maize security.'
  },

  // --- EUROPE ---
  {
    id: 'ESP',
    country: 'Spain',
    flag: '🇪🇸',
    continent: 'Europe',
    capital: 'Madrid',
    totalLandAreaMha: 49.9,
    agriculturalLandMha: 26.2,
    degradedFarmlandMha: 9.8,
    degradationPercentage: 37.4,
    annualDegradationRatePercent: 1.15,
    economicCropLossUSD_Billion: 7.2,
    primaryDrivers: [
      'Almería & Murcia Desertification Belt',
      'Intensive Plastic Greenhouses Aquifer Depletion',
      'Severe Soil Organic Carbon Deficit (< 1%)'
    ],
    severity: 'High (25-40%)',
    hotspots: [
      { name: 'Almería & Tabernas Badlands', stateOrRegion: 'Andalusia', problem: 'Extreme Mediterranean aridification and saline dust storms', coordinates: [37.0500, -2.4333], areaSqKm: 16000 },
      { name: 'Doñana Strawberry Aquifer Theft', stateOrRegion: 'Huelva', problem: 'Illegal borewells desiccated UNESCO wetland buffer soils', coordinates: [37.0000, -6.5000], areaSqKm: 4500 }
    ],
    satelliteMetrics: {
      ndviMean: 0.36,
      ndviAnomaly10Yr: -0.19,
      soilMoistureIndex: 21.0,
      landSurfaceTempC: 36.1,
      bareSoilIndex: 63.8,
      vegetationHealthIndex: 35.2,
      lastSatellitePass: '2026-09-17T11:20:00Z',
      sentinelTileId: 'T30SVG (Sentinel-2A)'
    },
    unccdTarget: {
      targetYear: 2030,
      netZeroTarget: 'Spanish National Strategy Against Desertification',
      commitment: 'Halting desertification advance across 74% of Spanish territory at high risk.'
    },
    restorationProtocols: [
      'Altiplano regenerative almond and olive groves with permanent herbaceous cover',
      'Keyline swales and retention ponds to capture torrential flash storms',
      'Biochar incorporation to double water retention capacity in limestone soils'
    ],
    healthyImageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    degradedImageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    ndviMapUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
    summary: 'Spain is the frontline of European desertification: three-quarters of its territory is at risk of turning into desert. In Andalusia, bare olive groves lose up to 30 tons of soil per hectare annually to sudden torrential downpours.'
  },
  {
    id: 'UKR',
    country: 'Ukraine',
    flag: '🇺🇦',
    continent: 'Europe',
    capital: 'Kyiv',
    totalLandAreaMha: 57.9,
    agriculturalLandMha: 41.3,
    degradedFarmlandMha: 14.8,
    degradationPercentage: 35.8,
    annualDegradationRatePercent: 1.6,
    economicCropLossUSD_Billion: 11.4,
    primaryDrivers: [
      'War Munition Crater Soil Destruction & Heavy Metal Poisoning',
      'Unexploded Ordnance Land Inaccessibility',
      'Wind & Water Erosion on World-Famous Chernozem Soils'
    ],
    severity: 'High (25-40%)',
    hotspots: [
      { name: 'Donbas Artillery Blast & Heavy Metal Corridor', stateOrRegion: 'Donetsk / Luhansk', problem: 'Arsenic, lead, sulfur residue and deep cratering of chernozem', coordinates: [48.0000, 37.8000], areaSqKm: 32000 },
      { name: 'Kakhovka Dam Disaster Dried Reservoir Basin', stateOrRegion: 'Kherson / Zaporizhzhia', problem: 'Catastrophic loss of irrigation for 500,000 hectares of cropland', coordinates: [46.7500, 33.3667], areaSqKm: 18500 }
    ],
    satelliteMetrics: {
      ndviMean: 0.49,
      ndviAnomaly10Yr: -0.16,
      soilMoistureIndex: 29.5,
      landSurfaceTempC: 26.4,
      bareSoilIndex: 47.2,
      vegetationHealthIndex: 44.8,
      lastSatellitePass: '2026-09-17T09:05:00Z',
      sentinelTileId: 'T36UYA (Sentinel-2B)'
    },
    unccdTarget: {
      targetYear: 2030,
      netZeroTarget: 'Post-War Agricultural Demining & Chernozem Soil Detox',
      commitment: 'Demining and bioremediating 5 million hectares of frontline agricultural land.'
    },
    restorationProtocols: [
      'Drone-guided remote sensing for ordnance & crater soil compaction mapping',
      'Phytoremediation with sunflowers and industrial hemp to absorb heavy metals',
      'Deep subsoiling to break hardpan created by heavy military armor'
    ],
    healthyImageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    degradedImageUrl: 'https://images.unsplash.com/photo-1545153996-e01b50d6f36a?auto=format&fit=crop&w=1200&q=80',
    ndviMapUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80',
    summary: 'Ukraine’s world-famous Chernozem (black soil)—some of the most fertile on Earth—faces unprecedented destruction from millions of artillery craters, heavy metal leaching, and the loss of the Kakhovka irrigation network.'
  },
  {
    id: 'FRA',
    country: 'France',
    flag: '🇫🇷',
    continent: 'Europe',
    capital: 'Paris',
    totalLandAreaMha: 54.8,
    agriculturalLandMha: 28.7,
    degradedFarmlandMha: 4.9,
    degradationPercentage: 17.1,
    annualDegradationRatePercent: 0.42,
    economicCropLossUSD_Billion: 4.8,
    primaryDrivers: [
      'Soil Compaction from 30-Ton Heavy Machinery',
      'Loss of Earthworm Biomass from Pesticides',
      'Summer Heatwave Soil Desiccation in Southern Plains'
    ],
    severity: 'Moderate (15-25%)',
    hotspots: [
      { name: 'Beauce Wheat Belt Deep Compaction', stateOrRegion: 'Centre-Val de Loire', problem: 'Plow pan at 30cm depth preventing root and water penetration', coordinates: [48.2000, 1.7000], areaSqKm: 12000 },
      { name: 'Occitanie Drought & Vineyard Erosion', stateOrRegion: 'Occitanie', problem: 'Flash storm gullying on bare pesticide-treated slopes', coordinates: [43.6000, 3.8800], areaSqKm: 9800 }
    ],
    satelliteMetrics: {
      ndviMean: 0.55,
      ndviAnomaly10Yr: -0.07,
      soilMoistureIndex: 38.2,
      landSurfaceTempC: 25.0,
      bareSoilIndex: 37.5,
      vegetationHealthIndex: 55.4,
      lastSatellitePass: '2026-09-17T11:02:00Z',
      sentinelTileId: 'T31TCJ (Sentinel-2A)'
    },
    unccdTarget: {
      targetYear: 2030,
      netZeroTarget: '4 per 1000 Soil Carbon Initiative (Pioneered in France)',
      commitment: 'Increasing global and national soil organic carbon stocks by 0.4% per year.'
    },
    restorationProtocols: [
      'Agro-écologie: permanent plant covers between wheat/rape cycles',
      'Bocage hedgerow replanting to stop wind erosion and shelter pollinators',
      'Reduced tire pressure and controlled traffic farming (CTF)'
    ],
    healthyImageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    degradedImageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    ndviMapUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
    summary: 'Decades of heavy machinery in France’s cereal plains have compacted subsoils into impenetrable brick-like hardpans, cutting rainfall infiltration by up to 70% and increasing vulnerability to summer droughts.'
  },

  // --- OCEANIA ---
  {
    id: 'AUS',
    country: 'Australia',
    flag: '🇦🇺',
    continent: 'Oceania',
    capital: 'Canberra',
    totalLandAreaMha: 768.8,
    agriculturalLandMha: 387.0,
    degradedFarmlandMha: 142.5,
    degradationPercentage: 36.8,
    annualDegradationRatePercent: 0.95,
    economicCropLossUSD_Billion: 8.8,
    primaryDrivers: [
      'Dryland Salinity (Rising Saline Water Tables)',
      'Severe Wind & Water Sheet Erosion',
      'Soil Acidification & Non-Wetting Hydrophobic Sands'
    ],
    severity: 'High (25-40%)',
    hotspots: [
      { name: 'Murray-Darling Basin Salinity Core', stateOrRegion: 'New South Wales / Victoria', problem: 'Ancient sea salts brought to surface after tree clearing', coordinates: [-34.0000, 142.0000], areaSqKm: 180000 },
      { name: 'Western Australian Wheatbelt Hydrophobic Sands', stateOrRegion: 'Western Australia', problem: 'Waxy sands repel water, causing rapid topsoil windblow', coordinates: [-31.5000, 117.5000], areaSqKm: 95000 }
    ],
    satelliteMetrics: {
      ndviMean: 0.29,
      ndviAnomaly10Yr: -0.15,
      soilMoistureIndex: 17.6,
      landSurfaceTempC: 37.9,
      bareSoilIndex: 68.2,
      vegetationHealthIndex: 34.0,
      lastSatellitePass: '2026-09-17T01:10:00Z',
      sentinelTileId: 'T50HNK (Sentinel-2B)'
    },
    unccdTarget: {
      targetYear: 2030,
      netZeroTarget: 'National Soil Strategy & Carbon Farming Initiative',
      commitment: 'Expanding carbon crediting for soil organic carbon restoration across 40 million hectares.'
    },
    restorationProtocols: [
      'P.A. Yeomans Keyline plowing to redirect rainwater from valleys to dry ridges',
      'Planting deep-rooted native saltbush (Atriplex) to de-water saline water tables',
      'Clay delving and soil spading on hydrophobic non-wetting sands'
    ],
    healthyImageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    degradedImageUrl: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=1200&q=80',
    ndviMapUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80',
    summary: 'Clearing of native eucalyptus forests mobilized prehistoric groundwater salt stores across the Murray-Darling and WA Wheatbelt, scalding millions of hectares of prime wheat country into barren white salt pans.'
  }
];
