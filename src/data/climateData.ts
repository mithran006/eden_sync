import { ClimateRegionImpact, EnsoHistoricalRecord, GlobalClimateMetrics, ClimateCaseStudy, EnsoBeforeVsNow } from '../types';

export const GLOBAL_CLIMATE_METRICS: GlobalClimateMetrics = {
  currentEnsoPhase: 'El Niño (Warm Phase)',
  currentOniValue: 1.45,
  sstAnomalyCentralPacific: '+1.6°C above baseline (Niño 3.4 Region)',
  globalMeanTempAnomaly: '+1.48°C above 1850–1900 pre-industrial',
  atmosphericCO2Ppm: 424.8,
  oceanHeatContentZJ: 388,
  activeExtremeAlertsCount: 14
};

export const ENSO_HISTORICAL_TIMELINE: EnsoHistoricalRecord[] = [
  {
    year: '2025–2026',
    oniPeak: 1.6,
    classification: 'Strong El Niño',
    globalImpactNote: 'Compound climate shock: Record global ocean surface heat combined with intense atmospheric rivers in North America, delayed monsoons in South Asia, and surging Mediterranean heatwaves.',
    humanSocietalImpact: 'Record global food import bills and critical strain on national electrical grids due to air conditioning surges and thermal power plant water cooling shutdowns.',
    paleoClimateEvidence: 'Sentinel-3 and Jason-3 satellite altimetry confirm sea surface height anomalies exceeding +24cm across the central equatorial Pacific.'
  },
  {
    year: '2023–2024',
    oniPeak: 2.0,
    classification: 'Very Strong El Niño',
    globalImpactNote: 'Historic ocean heat records for 400+ consecutive days. Catastrophic droughts across the Amazon Basin drying major tributaries (Rio Negro at 120-year low), acute hunger in Southern Africa (Zambia/Zimbabwe national emergencies), and severe coral bleaching across 54 countries.',
    humanSocietalImpact: 'Panama Canal transit capacity curtailed by 33% due to low Gatun Lake levels; global olive oil and cocoa prices surged to all-time historic highs.',
    paleoClimateEvidence: 'Atmospheric CO₂ recorded single-year spike of +3.36 ppm at Mauna Loa as drought-stressed tropical forests flipped from carbon sinks to net carbon emitters.'
  },
  {
    year: '2020–2023',
    oniPeak: -1.4,
    classification: 'Strong La Niña',
    globalImpactNote: 'Rare 3-year "Triple-Dip" La Niña. Triggered catastrophic floods across Eastern Australia ($5B damages) and submerged one-third of Pakistan in water, while causing a brutal multi-year drought across the Horn of Africa.',
    humanSocietalImpact: 'Acute food insecurity for 23 million people in Kenya, Somalia, and Ethiopia; historic crop loss in Argentine soybean fields.',
    paleoClimateEvidence: 'Prolonged cold sea surface temperature anomalies in Niño 3.4 region with intensified trade winds.'
  },
  {
    year: '2015–2016',
    oniPeak: 2.6,
    classification: 'Very Strong El Niño',
    globalImpactNote: 'Dubbed the "Godzilla El Niño". Second-warmest ocean anomaly in modern records. Widespread Southeast Asian peatland forest fires blanketed 6 nations in toxic smog; catastrophic crop failure in Ethiopia requiring emergency food aid for 10 million people.',
    humanSocietalImpact: 'Global agricultural commodity shock; mass mortality of 30% of shallow-water corals on Australia’s Great Barrier Reef.',
    paleoClimateEvidence: 'NOAA OISST recorded central Pacific SST anomaly peaking at +2.64°C in November 2015.'
  },
  {
    year: '1997–1998',
    oniPeak: 2.4,
    classification: 'Very Strong El Niño',
    globalImpactNote: 'The 20th century benchmark super-event. Catastrophic flooding and massive landslides ("huaycos") obliterated coastal Peru and Ecuador; extreme drought sparked multi-million hectare forest fires across Kalimantan and Sumatra; massive California winter storms.',
    humanSocietalImpact: 'Direct global economic damage estimated at $36 Billion (1998 USD) with over 24,000 fatalities worldwide.',
    paleoClimateEvidence: 'First super El Niño monitored comprehensively with the Tropical Atmosphere Ocean (TAO) moored buoy array and TOPEX/Poseidon satellite.'
  },
  {
    year: '1982–1983',
    oniPeak: 2.2,
    classification: 'Strong El Niño',
    globalImpactNote: 'The first modern satellite-tracked super El Niño. Devastated Peruvian anchoveta fisheries (collapsing national economy), triggered catastrophic "Ash Wednesday" bushfires in Australia, and caused severe drought across the Indian subcontinent.',
    humanSocietalImpact: 'Anchovy fishmeal industry collapsed, causing global livestock feed inflation; severe starvation in northeast Brazil ("sertão").',
    paleoClimateEvidence: 'Undetected for months because the eruption of Mexico’s El Chichón volcano spewed aerosols that blinded satellite infrared sensors until ocean buoys confirmed huge heat anomalies.'
  },
  {
    year: '1918–1919',
    oniPeak: 1.8,
    classification: 'Strong El Niño',
    globalImpactNote: 'Synchronized with the end of World War I and the 1918 Spanish Flu pandemic. Monsoon rains across British India failed catastrophically, plunging the subcontinent into deep famine and drastically worsening pandemic mortality.',
    humanSocietalImpact: 'Malnutrition caused by failed harvests weakened immune systems, directly contributing to an estimated 12 to 17 million deaths in India during the concurrent flu wave.',
    paleoClimateEvidence: 'Reconstructed via coral skeleton isotopic oxygen-18 (δ18O) records in Palmyra and Christmas Island.'
  },
  {
    year: '1876–1878',
    oniPeak: 2.5,
    classification: 'Very Strong El Niño',
    globalImpactNote: 'The "Great Global Drought" & Famine — the most catastrophic climate-induced disaster in recorded human history. A mega-El Niño coupled with anomalous warm Atlantic temperatures simultaneously shut down the monsoons in India and China while drying northeast Brazil and parts of Africa.',
    humanSocietalImpact: 'Resulted in the death of an estimated 30 to 50 million human beings from starvation and typhus/cholera epidemics across India (the Great Famine of 1876-78), Northern China (Dingwu Famine), and Brazil (Grande Seca).',
    paleoClimateEvidence: 'Global tree-ring width networks (Monsoon Asia Drought Atlas - MADA) and ice core dust records demonstrate unprecedented global drought extent.'
  },
  {
    year: '1789–1793',
    oniPeak: 2.3,
    classification: 'Very Strong El Niño',
    globalImpactNote: 'Prolonged mega-El Niño that severely disrupted the global jet stream and monsoon circulation. Caused severe droughts in Australia (devastating the First Fleet British penal colony at Sydney Cove), failure of the Nile flood in Egypt, and extreme weather in Europe.',
    humanSocietalImpact: 'In France, violent summer hailstorms followed by harsh winter and drought destroyed wheat harvests in 1788-1789, causing bread prices to soar by over 80%. The widespread starvation and economic despair directly fueled popular unrest, catalyzing the storming of the Bastille and the French Revolution.',
    paleoClimateEvidence: 'Documented in historical meteorological journals across London and Paris, Australian tree-ring chronologies, and Nilometer records at Cairo.'
  }
];

export const ENSO_BEFORE_VS_NOW: EnsoBeforeVsNow[] = [
  {
    parameter: 'Baseline Global Ocean Heat',
    preIndustrial: 'Stable, cooler baseline with pre-industrial thermal equilibrium (~0.0°C baseline). Marine heatwaves were rare and isolated.',
    modernEra: 'Unprecedented planetary ocean warming (+1.48°C global mean, with upper 2,000m ocean heat content at record 388 Zettajoules).',
    amplifyingFactor: 'Greenhouse gas thermal accumulation: oceans absorb >90% of excess planetary heat energy.',
    ecologicalConsequence: 'A moderate El Niño today carries the destructive thermal energy that only a "super El Niño" possessed in the 19th century.'
  },
  {
    parameter: 'Atmospheric Moisture Capacity (Clausius-Clapeyron)',
    preIndustrial: 'Atmospheric water vapor holding capacity was lower by ~10.5% compared to present day.',
    modernEra: 'Atmospheric moisture holding capacity increased by 7% per 1°C of warming (+10.5% to +14% higher atmospheric moisture load).',
    amplifyingFactor: 'Thermodynamic Clausius-Clapeyron equation governing atmospheric saturation vapor pressure.',
    ecologicalConsequence: 'Rainfall is no longer gently distributed: drought spells are hotter and faster, punctuated by destructive multi-billion-ton "atmospheric river" deluge bombs.'
  },
  {
    parameter: 'Landscape & Soil Microbial Sponge Buffer',
    preIndustrial: 'Deep native prairie roots, contiguous ancient forests, undisturbed wetland networks, and high soil organic carbon (4%–6%).',
    modernEra: 'Severely degraded farmland, widespread deforestation, 50% loss of global topsoil organic matter (<1.0%), and concrete urbanization.',
    amplifyingFactor: 'Industrial monoculture tillage, synthetic chemical sterilization, and wetland reclamation.',
    ecologicalConsequence: 'Land has lost its natural "sponge effect." Droughts bake naked soil into cracked clay in days; when rain finally arrives, water cannot infiltrate and causes scouring topsoil wash-off.'
  },
  {
    parameter: 'Cryosphere & Polar Ice Sheet Teleconnections',
    preIndustrial: 'Thick, unfragmented sea ice shelves in Antarctica (Thwaites, Pine Island) and intact multi-year Arctic sea ice packs.',
    modernEra: 'Thinning marine-terminating ice shelves exposed to warm Circumpolar Deep Water (CDW) upwelling; accelerated basal melting exceeding 30m/year.',
    amplifyingFactor: 'Wind-driven shifts in the Amundsen Sea Low and Southern Annular Mode during El Niño phases.',
    ecologicalConsequence: 'El Niño now triggers massive warm water pulses beneath Antarctic ice shelves, unpinning grounding lines that regulate 3+ meters of global sea level rise.'
  },
  {
    parameter: 'Ecosystem Phenology & Biological Synchrony',
    preIndustrial: 'Plants, insect pollinators, and migratory birds were synchronized by historical seasonal temperature cues over millennia.',
    modernEra: 'Phenological decoupling: warm El Niño winters trigger premature insect emergence 15–20 days ahead of schedule, while birds migrate on fixed photoperiods.',
    amplifyingFactor: 'Rapid winter warming exceeding evolutionary adaptation speeds for temperate and boreal species.',
    ecologicalConsequence: 'Caterpillars hatch before host leaves sprout; songbird chicks starve; crop fruit sets fail due to absence of pollinator synchronization.'
  }
];

export const CLIMATE_REAL_CASE_STUDIES: ClimateCaseStudy[] = [
  {
    id: 'case-uk-butterflies',
    title: 'Why Butterflies Are Emerging Weeks Early Across the UK',
    subtitle: 'Phenological Decoupling, Spring Temperature Anomaly & The Trophic Starvation Trap',
    category: 'Biodiversity & Phenology',
    region: 'United Kingdom & Western Europe (Oxfordshire, Norfolk, Somerset)',
    severityLevel: 'Widespread Ecological Shift',
    phenomenon: 'Warming Atlantic storm tracks and exceptionally mild El Niño winter temperatures (warmest UK Februarys on record) trigger early emergence of adult butterflies 15 to 22 days ahead of historical 1970–2000 medians.',
    mechanism: 'Butterflies rely on Accumulated Growing Degree-Days (GDD) above a biological thermal threshold (~5°C to 10°C) to break winter pupal diapause. El Niño-driven tropical air surges push winter temperatures into spring levels prematurely, forcing pupae of Peacock (Aglais io), Brimstone (Gonepteryx rhamni), Red Admiral (Vanessa atalanta), and Orange-tip (Anthocharis cardamines) to metamorphose weeks early.',
    observedImpacts: [
      'The "Trophic Trap": Orange-tip butterflies emerge before their primary host foodplants—Cuckooflower (Cardamine pratensis) and Garlic Mustard (Alliaria petiolata)—have developed seed pods or tender foliage.',
      'Nectar Starvation: Early-emerging adult butterflies burn fat stores in barren landscapes where early spring wild flora (primroses, blackthorn, dandelion) are still dormant or frozen.',
      'Late-Frost Mortality: Sudden Arctic cold snaps ("Beast from the East" reversals) freeze exposed adults and early caterpillar broods that have no physiological antifreeze protection.',
      'Bird Chick Starvation: Migratory songbirds (such as Pied Flycatchers and Willow Warblers) arrive from Sub-Saharan Africa guided by fixed daylight cues (photoperiod), only to find that the peak caterpillar biomass has already hatched, pupated, and disappeared, causing chick starvation rates to surge up to 40% in long-term monitored woods.'
    ],
    scientificData: [
      {
        label: 'Orange-tip Emergence Shift',
        value: '18.4 Days Early',
        change: '+18.4 days earlier than 1976 baseline',
        source: 'UK Butterfly Monitoring Scheme (UKBMS / CEH Wallingford)'
      },
      {
        label: 'Winter Temperature Anomaly',
        value: '+2.1°C',
        change: 'Above 1961–1990 UK winter average',
        source: 'UK Met Office Hadley Centre'
      },
      {
        label: 'Avian Breeding Synchrony Deficit',
        value: '-12 to -16 Days',
        change: 'Peak caterpillar abundance misses chick hatching window',
        source: 'British Trust for Ornithology (BTO) Nest Record Scheme'
      },
      {
        label: 'Caterpillar Mortality in Late Cold Snaps',
        value: '65%–80%',
        change: 'Post-emergence freeze mortality in exposed field sites',
        source: 'Royal Entomological Society Phenology Study'
      }
    ],
    mitigationAndAdaptation: [
      'Plant diverse micro-climatic hedgerows with varied sun and shade aspects to provide thermal refugia.',
      'Conserve early-blooming native nectar species (Willow sallow catkins, Hawthorn, Blackthorn, Dandelion).',
      'Maintain uncut meadow strips with deep leaf litter and thatch where overwintering chrysalises remain insulated from erratic air temperature swings.',
      'Establish agroforestry windbreaks to break cold easterly snap winds and protect delicate early lepidopteran broods.'
    ],
    newsReference: 'UK Met Office & Butterfly Conservation Annual Phenology Report: "Record Mild Winters Force Earliest Recorded UK Butterfly Emergence in 150 Years."'
  },
  {
    id: 'case-bovine-dairy-milk',
    title: 'Bovine Milk Production Collapse: The Dairy Herd Heat Stress Crisis',
    subtitle: 'Temperature-Humidity Index (THI > 68), Rumen Fermentation Hyperthermia & Milk Yield Plunge',
    category: 'Livestock & Agriculture',
    region: 'South Asia (Punjab, Gujarat), Southern US (Texas, California), Latin America (Brazil, Colombia)',
    severityLevel: 'High Economic Loss',
    phenomenon: 'High-yielding dairy cattle (Holstein-Friesian, Jersey, and Murrah Buffaloes) suffer acute productivity and physiological collapse during El Niño heatwave humidity spikes, causing milk yields to plummet 15% to 35% with severe degradation in milk fat and protein.',
    mechanism: 'Ruminants generate massive internal metabolic heat through microbial fermentation of fibrous feed in the rumen (~35%–40% of their total thermal load). When ambient Temperature-Humidity Index (THI) exceeds 68 (e.g. 26°C with 60% relative humidity), cattle cannot dissipate heat via panting or skin sweating. To prevent lethal heat stroke, the cows biological survival mechanism triggers a dramatic 15%–30% voluntary reduction in Dry Matter Intake (DMI). Less feed intake directly cuts the energy and volatile fatty acids (acetate/propionate) required for mammary milk synthesis.',
    observedImpacts: [
      'Milk Volume Drop: Average daily milk production drops by 3.5 to 7.5 liters per cow per day across commercial dairy herds.',
      'Milk Composition Collapse: Milk butterfat percentage falls by 0.3% to 0.5% (e.g., from 4.2% down to 3.7%), and total milk solids-not-fat (SNF) plummet, resulting in severe price penalties from dairy cooperatives.',
      'Immune Suppression & Mastitis: Heat stress causes leaky gut syndrome and increases systemic inflammation, doubling Somatic Cell Counts (SCC > 400,000 cells/ml) and triggering widespread clinical mastitis outbreaks.',
      'Reproductive Arrest: Conception and artificial insemination (AI) conception rates drop from 45% down to below 15% due to embryonic heat death during days 1 to 7 post-insemination, pushing calving intervals out by 60 to 90 days.',
      'Buffalo Calving Season Distortions: Murrah and Mehsana buffaloes experience prolonged summer anestrus (silent heat), halting milk cycles across village dairy cooperatives.'
    ],
    scientificData: [
      {
        label: 'Dairy Milk Yield Reduction',
        value: '-18% to -34%',
        change: 'Direct daily yield drop during El Niño heatwaves',
        source: 'National Dairy Development Board (NDDB) & USDA ARS'
      },
      {
        label: 'Critical THI Stress Threshold',
        value: 'THI 68',
        change: 'Milk synthesis decline begins above 68; severe distress > 79',
        source: 'Journal of Dairy Science (Heat Stress Indices)'
      },
      {
        label: 'Dry Matter Intake (DMI) Loss',
        value: '-22%',
        change: 'Voluntary feed intake reduction to reduce rumen fermentation heat',
        source: 'ICAR-National Dairy Research Institute (Karnal)'
      },
      {
        label: 'Dairy Farmer Revenue Loss',
        value: '$420–$750 / cow',
        change: 'Per season in lost milk volume, treatment costs, and extended calving intervals',
        source: 'International Farm Comparison Network (IFCN Dairy Report)'
      }
    ],
    mitigationAndAdaptation: [
      'Install high-velocity ceiling fans (low-pressure/high-volume) paired with cyclic water misting/soakers in the feeding lane to induce evaporative skin cooling.',
      'Shift 60%–70% of the total daily feed ration to nocturnal cooler hours (8:00 PM to 4:00 AM) when rumen heat can dissipate safely.',
      'Incorporate rumen-bypass bypass fats (calcium salts of fatty acids) to increase ration energy density without generating excess microbial fermentation heat.',
      'Supplement electrolytes (Sodium Bicarbonate, Potassium Carbonate) to compensate for respiratory alkalosis caused by intense panting.',
      'Implement Silvopastoral Agroforestry: plant dense neem, subabul, or acacia canopies in grazing paddocks, lowering radiant black-globe temperature by 4°C to 7°C.'
    ],
    newsReference: 'Global Dairy Trade & Agri-Commodities Bulletin: "El Niño Heat Stress Slashes Milk Production Across Tropical and Subtropical Belts."'
  },
  {
    id: 'case-ice-sheet-melt',
    title: 'Polar Ice Sheet & Glacial Teleconnections: The Amundsen Sea Surge',
    subtitle: 'Circumpolar Deep Water Upwelling, Pine Island & Thwaites "Doomsday" Glaciers, and Greenland Ablation',
    category: 'Cryosphere & Glaciology',
    region: 'Antarctica (Amundsen Sea, West Antarctic Ice Sheet) & Greenland (Nuuk / Jakobshavn)',
    severityLevel: 'Severe Tipping Point',
    phenomenon: 'El Niño atmospheric teleconnections alter circum-Antarctic wind patterns, driving warm, dense marine currents beneath floating ice shelves in West Antarctica, while parking blocking high-pressure "heat domes" over Greenland that trigger catastrophic surface ablation.',
    mechanism: 'During strong El Niño events, anomalous tropical Pacific convection forces an intense planetary Rossby wave train southward. This deepens the Amundsen Sea Low off West Antarctica, altering continental shelf wind stress. Instead of cold surface water prevailing, warm, salty Circumpolar Deep Water (CDW, +1.5°C to +2.5°C above the local in-situ freezing point) is forced upward onto the shallow continental shelf, flowing directly into the sub-ice cavities of Pine Island Glacier and Thwaites Glacier ("The Doomsday Glacier"). This melts the ice shelves from underneath at the grounding line at rates exceeding 30 to 50 meters per year, unpinning the massive ice sheet from submarine bedrock ridges.',
    observedImpacts: [
      'Grounding Line Retreat: Thwaites Glacier grounding line is retreating by more than 1 km per year into deeper submarine basins, exposing thicker ice columns to oceanic melt (Marine Ice Sheet Instability - MISI).',
      'Greenland Extreme Melt Events: Persistent atmospheric blocking ridges during El Niño summers generate widespread surface melt across more than 850,000 square kilometers (>50% of the Greenland Ice Sheet surface).',
      'Roaring Meltwater Moulins: Millions of gallons of surface meltwater plunge through vertical moulins to the subglacial bed, lubricating the ice sheet and accelerating glacial slip into the ocean by 20% to 40%.',
      'Freshwater Influx & AMOC Slowdown: The massive influx of low-density freshwater melt into the North Atlantic (Labrador and Nordic Seas) dilutes surface salinity, impeding the sinking of dense water that drives the Atlantic Meridional Overturning Circulation (AMOC), bringing the global ocean conveyor belt closer to a tipping point.'
    ],
    scientificData: [
      {
        label: 'Basal Melt Rate Beneath Thwaites',
        value: '35–50 m/year',
        change: 'Ocean-driven underwater grounding line melt',
        source: 'International Thwaites Glacier Collaboration (ITGC / BAS / NSF)'
      },
      {
        label: 'Greenland Surface Melt Area',
        value: '850,000+ km²',
        change: 'During peak El Niño atmospheric blocking heat dome events',
        source: 'Polar Portal (Danish Meteorological Institute & GEUS)'
      },
      {
        label: 'Global Sea Level Rise Vulnerability',
        value: '3.3 Meters',
        change: 'Total potential sea level rise locked behind West Antarctic Ice Sheet grounding line',
        source: 'IPCC Sixth Assessment Report (AR6 WG1 Cryosphere)'
      },
      {
        label: 'AMOC Weakening Trend',
        value: '-15%',
        change: 'Circulation strength decline since mid-20th century due to freshwater pulse',
        source: 'Nature Climate Change (AMOC Monitoring Consortium)'
      }
    ],
    mitigationAndAdaptation: [
      'Accelerate global decarbonization to limit planetary temperature overshoot to under 1.5°C to prevent irreversible marine ice cliff collapse (MICI).',
      'Deploy autonomous underwater vehicles (AUVs like "Ran" and "Boaty McBoatface") inside sub-ice cavities for continuous thermal and salinity telemetry.',
      'Coastal municipal hardening: elevate sea defenses, restore mangrove wetlands, and zone managed retreat for low-lying delta mega-cities.',
      'Construct upstream decentralized catchment ponds and watershed reforestation to capture erratic precipitation in continental basins.'
    ],
    newsReference: 'NASA Earth Observatory & Nature Geosciences: "Deep Ocean Teleconnections: How Tropical El Niño Warming Accelerates West Antarctic Ice Sheet Grounding Line Collapse."'
  },
  {
    id: 'case-peruvian-anchoveta',
    title: 'Collapse of the Humboldt Current: The Peruvian Anchoveta Shock',
    subtitle: 'Thermocline Depression, Pelagic Fishery Destruction & Global Fishmeal Supply Shock',
    category: 'Marine Ecosystems',
    region: 'South America (Peru & Northern Chile Coastal Waters / Humboldt Current Large Marine Ecosystem)',
    severityLevel: 'High Economic Loss',
    phenomenon: 'The arrival of the warm equatorial Kelvin wave (El Niño Costero) shuts down the world’s most productive marine upwelling ecosystem, devastating the Peruvian anchoveta (Engraulis ringens) population and triggering mass mortality among millions of marine mammals and seabirds.',
    mechanism: 'Under normal conditions, strong coastal winds push surface water offshore, allowing cold, nutrient-dense water (rich in nitrates, phosphates, and silicates) to well up from the deep ocean along the Peruvian coast. During El Niño, easterly winds collapse, and a massive lens of warm, nutrient-depleted tropical water covers the coast, deepening the thermocline from its normal 15–30 meters down to over 100–150 meters. Upwelling continues to pump water, but now it only circulates warm, sterile surface water. Phytoplankton and zooplankton populations collapse overnight.',
    observedImpacts: [
      'Anchoveta Dispersal & Death: The 8-to-10 million ton anchoveta stock either dives into deep hypoxic trenches beyond purse-seine fishing gear or flees southward toward cold Chilean waters, halting the national fishing season completely.',
      'Guano Seabird & Marine Mammal Starvation: Millions of Guanay cormorants, Peruvian boobies, and Humboldt penguins starve on coastal islands as their primary prey vanishes. Sea lion pups wash ashore emaciated.',
      'Global Fishmeal Inflation: Peru produces over 20% of the world’s fishmeal and fish oil. Total fishery cancellation causes international fishmeal prices to skyrocket by 65% to 90%, triggering price surges in global aquaculture (farmed salmon, shrimp) and livestock poultry feed.',
      'Coastal Desert Floods ("Huaycos"): Warm coastal waters (>28°C) evaporate rapidly, generating torrential cloudbursts over barren Andean coastal deserts that trigger catastrophic mudslides obliterating roads and agricultural valleys.'
    ],
    scientificData: [
      {
        label: 'Peruvian Anchovy Catch Loss',
        value: '-82%',
        change: 'Cancellation of first fishing quota season during super El Niño',
        source: 'Instituto del Mar del Perú (IMARPE)'
      },
      {
        label: 'Global Fishmeal Price Spike',
        value: '+$1,950 / ton',
        change: 'Price surge on London & Hamburg commodity exchanges',
        source: 'FAO Globefish Marine Commodity Index'
      },
      {
        label: 'Coastal Sea Surface Temperature Anomaly',
        value: '+4.8°C',
        change: 'Peak coastal anomaly off Callao / Chimbote during El Niño Costero',
        source: 'NOAA CoastWatch & IMARPE Oceanographic Buoys'
      },
      {
        label: 'Seabird Population Crash',
        value: '-60% to -75%',
        change: 'Mortality across Guano Island reserve system',
        source: 'SERNANP Peru National Parks Authority'
      }
    ],
    mitigationAndAdaptation: [
      'Implement dynamic satellite-monitored fisheries management: instantly enforce biological moratoria when SST crosses +2°C to prevent stock collapse.',
      'Shift aquaculture feed formulas from wild pelagic fishmeal to insect protein (Black Soldier Fly larvae) and algal omega-3 oils.',
      'Reforest coastal Andean river canyons with native deep-root Prosopis (Algarrobo) trees to anchor loose gravel and prevent catastrophic huayco mudslides.',
      'Construct multi-tiered gabion check dams across ephemeral desert quebradas to dissipate flood torrent energy.'
    ],
    newsReference: 'Reuters & Financial Times: "Global Fishmeal Supply Freezes as Peru Cancels Anchovy Fishing Quota Due to Intense El Niño Ocean Warming."'
  },
  {
    id: 'case-mediterranean-olive-oil',
    title: 'The Mediterranean Olive Oil Shock: Andalusian Heat Dome & Harvest Halving',
    subtitle: 'Flower Blight, Reservoir Emptiness (<20%) & The €9,000/ton Liquid Gold Crisis',
    category: 'Food Security & Prices',
    region: 'Southern Europe (Andalusia Spain, Puglia Italy, Peloponnese Greece)',
    severityLevel: 'High Economic Loss',
    phenomenon: 'Severe El Niño atmospheric pressure dipole anomalies over the North Atlantic channel Saharan heat domes into Southern Europe during early spring, scorching olive tree blossoms and halving Mediterranean olive oil harvests.',
    mechanism: 'Olive trees (Olea europaea) require mild winters for vernalization, followed by moderate spring temperatures for delicate flowering and fruit set in April/May. During recent El Niño summers, anomalous upper-atmosphere high-pressure systems pumped scorching 40°C–42°C Saharan air into Andalusia (the worlds olive oil capital). Extreme temperatures dried stigmas and aborted floral fertilization within 48 hours. Compounding this, consecutive dry winters depleted the Guadalquivir river basin reservoirs down to under 19% capacity, preventing emergency irrigation.',
    observedImpacts: [
      'Harvest Halving: Spanish olive oil production plummeted from its normal 1.5 million metric tons down to barely 660,000 metric tons (-56% drop).',
      'The "Liquid Gold" Price Surge: International virgin olive oil prices more than doubled, breaking through €9,000 per metric ton (a historic all-time high), driving widespread culinary inflation across Europe and North America.',
      'Supermarket Theft & Adulteration: Massive spikes in organized retail theft of olive oil bottles in supermarkets, and an explosion in fraudulent sunflower oil adulteration seized by Europol.',
      'Ancient Tree Stress: Century-old dryland olive groves suffered severe leaf drop, twig dieback, and bark splitting, threatening the long-term agrarian heritage of rural Spain.'
    ],
    scientificData: [
      {
        label: 'Spanish Olive Oil Harvest Drop',
        value: '-56%',
        change: 'Reduction from 5-year rolling average',
        source: 'Spanish Ministry of Agriculture, Fisheries and Food (MAPA)'
      },
      {
        label: 'Global EVOO Spot Price',
        value: '€9,200 / Ton',
        change: '+115% increase compared to 2021 historical baseline',
        source: 'International Olive Council (IOC Madrid)'
      },
      {
        label: 'Guadalquivir Basin Reservoir Storage',
        value: '18.6%',
        change: 'Historic low water storage during critical fruit swelling',
        source: 'Confederación Hidrográfica del Guadalquivir (CHG)'
      },
      {
        label: 'Spring Heat Record in Córdoba',
        value: '38.8°C',
        change: 'All-time European record for the month of April during flowering',
        source: 'State Meteorological Agency of Spain (AEMET)'
      }
    ],
    mitigationAndAdaptation: [
      'Switch from clean-tilled bare soil to permanent regenerative cover crops between olive tree rows to drop soil temperature by 5°C and reduce moisture evaporation.',
      'Install sub-surface drip irrigation systems with soil moisture tensiometers buried at 30cm and 60cm depths to cut water usage by 40%.',
      'Apply foliar kaolin clay sprays to olive canopies: creates a reflective white film that shields leaves and flowers from solar scorching without inhibiting photosynthesis.',
      'Construct decentralized on-farm rainwater retention swales (Keyline design) to capture intense erratic downpours before runoff escapes into dried riverbeds.'
    ],
    newsReference: 'The Guardian & Bloomberg: "Olive Oil Skyrockets Past €9,000 a Ton as Unprecedented Heat Waves Scorch Mediterranean Groves."'
  },
  {
    id: 'case-global-coral-bleaching',
    title: 'The 4th Global Coral Bleaching Wave: Planetary Marine Heatwave',
    subtitle: 'Thermal Stress Accumulation (>16 DHW), Symbiont Expulsion & Reef Collapse',
    category: 'Marine Ecosystems',
    region: 'Global Oceans (Great Barrier Reef, Coral Triangle, Caribbean, Red Sea, Western Indian Ocean)',
    severityLevel: 'Severe Tipping Point',
    phenomenon: 'Record ocean thermal energy during the 2023–2026 El Niño triggered the fourth and most widespread global coral bleaching event in human history, impacting over 62% of the worlds coral reef ecosystems across 54 countries and territories.',
    mechanism: 'Corals live in an obligate mutualistic symbiosis with microscopic photosynthetic algae called zooxanthellae (Symbiodiniaceae) that live within their tissue and provide up to 90% of the coral animal’s metabolic energy. When sea surface temperatures exceed local summer maximums by just 1.0°C for multiple weeks (accumulating Degree Heating Weeks, DHW), the photosynthetic apparatus of the algae breaks down, producing toxic reactive oxygen species (ROS). To prevent cellular poisoning, the coral polyp forcibly expels the zooxanthellae. Without their colorful algae, the transparent coral tissue exposes the white calcium carbonate skeleton underneath (bleaching). If elevated temperatures persist beyond 4–8 weeks (DHW > 8), the starved corals die of hunger and bacterial infection.',
    observedImpacts: [
      'Great Barrier Reef Mass Mortality: Over 73% of surveyed reefs in the Great Barrier Reef exhibited prevalent bleaching, with northern and central sectors suffering severe heat-induced mortality.',
      'Caribbean Near-Total Bleaching: Unprecedented water temperatures exceeding 32°C in the Florida Keys and Caribbean Basin triggered 95%+ bleaching, destroying decades of endangered Elkhorn (Acropora palmata) and Staghorn restoration nurseries.',
      'Loss of Coastal Wave Buffers: Dead, crumbling coral reefs lose their structural complexity, diminishing their ability to absorb up to 97% of incoming storm wave energy, leaving coastal villages defenseless against storm surges.',
      'Collapsing Marine Nurseries: 25% of all marine species depend on coral reefs at some stage in their life cycle; reef collapse triggers a domino effect across coastal artisanal fisheries that feed 500+ million people worldwide.'
    ],
    scientificData: [
      {
        label: 'Global Coral Reefs Bleached',
        value: '62.4%',
        change: 'Confirmed thermal stress bleaching across global reef area',
        source: 'NOAA Coral Reef Watch (CRW) & International Coral Reef Initiative (ICRI)'
      },
      {
        label: 'Peak Degree Heating Weeks (DHW)',
        value: '18.2 °C-weeks',
        change: 'Lethal thermal stress threshold is 8 DHW; reached over 18 in Caribbean/GBR',
        source: 'NOAA Coral Reef Watch Satellite Telemetry'
      },
      {
        label: 'Global Ocean Heat Content (0-2000m)',
        value: '388 ZJ',
        change: 'All-time highest recorded in human history',
        source: 'Institute of Atmospheric Physics (IAP / CAS)'
      },
      {
        label: 'Artisanal Fishing Livelihoods at Risk',
        value: '500+ Million',
        change: 'People dependent on reef ecosystem services and protein',
        source: 'UN Environment Programme (UNEP Reef Status)'
      }
    ],
    mitigationAndAdaptation: [
      'Accelerate micro-fragmentation and selective breeding of thermally resilient "super-corals" adapted to high heat anomalies.',
      'Install solar-powered artificial upwelling bubblers and shade cloths over high-value coral nursery restoration sites during peak summer calm spells.',
      'Strictly eliminate land-based pollution runoff (agricultural nitrogen, synthetic pesticides, and eroded silt) that exacerbates coral disease vulnerability.',
      'Establish large-scale no-take marine protected areas (MPAs) to allow herbivorous parrotfish and sea urchins to graze down fleshy algae that smother bleached corals.'
    ],
    newsReference: 'NOAA & ICRI Joint Declaration: "NOAA Confirms Fourth Global Coral Bleaching Event as Ocean Temperatures Shatter All Previous Records."'
  }
];

export const CLIMATE_REGION_IMPACTS: ClimateRegionImpact[] = [
  {
    id: 'REGION-ASIA-01',
    regionName: 'South Asia (India, Bangladesh, Pakistan)',
    continent: 'Asia',
    ensoPhase: 'El Niño (Warm Phase)',
    temperatureAnomaly: '+1.4°C to +2.6°C summer heatwaves',
    precipitationShift: '-15% to -35% southwest monsoon deficit',
    primaryVulnerability: 'Monsoon delays, reservoir depletion, and rainfed crop desiccation in central/peninsular river basins.',
    affectedCrops: ['Kharif Paddy (Rice)', 'Soybean', 'Cotton', 'Sugarcane', 'Pulses (Pigeon Pea)'],
    waterBodyStress: 'Rapid evaporation of rural irrigation tanks and dropping water tables in hard-rock aquifers.',
    actionableIntervention: 'Shift to drought-tolerant Millets (Ragi/Bajra), construct micro-farm ponds with plastic lining, apply 10 tons/acre organic bio-mulch, and implement laser-guided sub-surface drip.',
    severity: 'Critical',
    coordinates: { lat: 20.5937, lng: 78.9629 }
  },
  {
    id: 'REGION-ASIA-02',
    regionName: 'Southeast Asia (Indonesia, Malaysia, Thailand, Vietnam)',
    continent: 'Asia',
    ensoPhase: 'El Niño (Warm Phase)',
    temperatureAnomaly: '+1.8°C above average',
    precipitationShift: '-40% to -60% rainfall drop during dry season',
    primaryVulnerability: 'Severe peatland wildfires, choking transboundary haze, Mekong River delta low discharge, and saltwater intrusion into rice paddies.',
    affectedCrops: ['Rice (Mekong Delta)', 'Palm Oil', 'Natural Rubber', 'Coffee (Robusta)'],
    waterBodyStress: 'Estuary salinity front moving 45km inland, poisoning freshwater aquaculture ponds.',
    actionableIntervention: 'Peatland re-wetting canals, brackish-water resilient mangrove buffers, and floating bio-filters in aquaculture tanks.',
    severity: 'Critical',
    coordinates: { lat: -0.7893, lng: 113.9213 }
  },
  {
    id: 'REGION-AFR-01',
    regionName: 'East Africa (Kenya, Ethiopia, Somalia, Tanzania)',
    continent: 'Africa',
    ensoPhase: 'El Niño (Warm Phase)',
    temperatureAnomaly: '+1.1°C to +1.9°C',
    precipitationShift: '+40% to +120% extreme torrential deluge',
    primaryVulnerability: 'Flash flooding, massive topsoil mudslides along rift valleys, livestock vector-borne diseases (Rift Valley Fever), and crop field inundation.',
    affectedCrops: ['Maize', 'Sorghum', 'Teff', 'Horticulture & Vegetables'],
    waterBodyStress: 'Uncontrolled river silting, dam breach risks, and overflow of unprotected farm ponds.',
    actionableIntervention: 'Construct semi-circular bunds and gabion silt traps on slopes, elevate grain storage facilities, and establish deep contour swales to channel excess torrents into groundwater recharge basins.',
    severity: 'High',
    coordinates: { lat: 1.2921, lng: 36.8219 }
  },
  {
    id: 'REGION-AFR-02',
    regionName: 'Southern Africa (Zimbabwe, Zambia, Mozambique, South Africa)',
    continent: 'Africa',
    ensoPhase: 'El Niño (Warm Phase)',
    temperatureAnomaly: '+2.0°C to +3.2°C scorched dry spells',
    precipitationShift: '-45% to -70% acute drought during critical grain-filling period',
    primaryVulnerability: 'Widespread maize crop failure, severe hydroelectric power load-shedding at Kariba Dam, and wildlife waterhole collapse.',
    affectedCrops: ['White Maize', 'Sunflower', 'Groundnuts', 'Sorghum'],
    waterBodyStress: 'Major riverbeds drying completely; community boreholes running dry.',
    actionableIntervention: 'Aggressive adoption of conservation agriculture (minimum tillage / Pfumvudza system), biochar soil conditioning to store scarce humidity, and community sand dams in ephemeral rivers.',
    severity: 'Critical',
    coordinates: { lat: -19.0154, lng: 29.1549 }
  },
  {
    id: 'REGION-AME-01',
    regionName: 'South America (Peru, Ecuador, Northern Chile)',
    continent: 'Americas',
    ensoPhase: 'El Niño (Warm Phase)',
    temperatureAnomaly: '+2.8°C to +4.5°C coastal ocean anomaly ("El Niño Costero")',
    precipitationShift: '+200% to +500% catastrophic coastal desert deluge',
    primaryVulnerability: 'Collapse of nutrient-rich Humboldt Current upwelling (crushing anchovy fisheries), massive desert mudslides (huaycos), and infrastructure destruction.',
    affectedCrops: ['Coastal Asparagus', 'Avocado', 'Table Grapes', 'Artichokes'],
    waterBodyStress: 'Coastal river channels overflowing by 400% capacity carrying millions of tons of erosive silt.',
    actionableIntervention: 'Stabilize ravine margins with deep-root native Algarrobo (Prosopis), dig emergency river diversion channels, and install silt containment weirs.',
    severity: 'Critical',
    coordinates: { lat: -9.1900, lng: -75.0152 }
  },
  {
    id: 'REGION-AME-02',
    regionName: 'South America (Amazon Basin & Northeast Brazil / Cerrado)',
    continent: 'Americas',
    ensoPhase: 'El Niño (Warm Phase)',
    temperatureAnomaly: '+2.2°C to +3.5°C intense dry heat',
    precipitationShift: '-30% to -50% rainfall deficit (Historic Droughts)',
    primaryVulnerability: 'Amazonian river navigation halts, extreme river water temperatures killing freshwater river dolphins, and soaring rainforest wildfire risk.',
    affectedCrops: ['Soybeans (Mato Grosso)', 'Sugarcane', 'Coffee (Arabica)', 'Pasture Beef'],
    waterBodyStress: 'Rio Negro and Amazon mainstem reaching century-record low water levels.',
    actionableIntervention: 'Agroforestry shade canopies, strict firebreaks around pasture borders, and sub-surface irrigation in commercial orchards.',
    severity: 'High',
    coordinates: { lat: -3.4653, lng: -62.2159 }
  },
  {
    id: 'REGION-AME-03',
    regionName: 'North America (California, US Southwest & Pacific Northwest)',
    continent: 'Americas',
    ensoPhase: 'El Niño (Warm Phase)',
    temperatureAnomaly: '+1.5°C warmer in Northwest, moderate in Southwest',
    precipitationShift: '+30% to +75% atmospheric rivers in Central/Southern California; drier in Pacific Northwest',
    primaryVulnerability: 'Severe winter storm flooding and coastal erosion in Southern California, juxtaposed with low snowpack and summer wildfire threats in Oregon/Washington.',
    affectedCrops: ['Almonds', 'Citrus', 'Wine Grapes', 'Winter Wheat'],
    waterBodyStress: 'Flash sediment silting in mountain reservoirs and rapid snowmelt surges.',
    actionableIntervention: 'Managed Aquifer Recharge (Ag-MAR) flooding dormant vineyards in winter to replenish aquifers, and watershed contour terracing.',
    severity: 'Moderate',
    coordinates: { lat: 36.7783, lng: -119.4179 }
  },
  {
    id: 'REGION-OCN-01',
    regionName: 'Australia (Murray-Darling Basin & Eastern Seaboard)',
    continent: 'Oceania',
    ensoPhase: 'El Niño (Warm Phase)',
    temperatureAnomaly: '+1.8°C to +2.9°C above long-term average',
    precipitationShift: '-35% to -55% rainfall drop across eastern states',
    primaryVulnerability: 'Extreme bushfire conditions (Catastrophic Fire Danger Index), rapid depletion of Murray-Darling irrigation water allocations, and heat stress in livestock.',
    affectedCrops: ['Winter Wheat', 'Canola', 'Cotton', 'Barley'],
    waterBodyStress: 'Blue-green toxic algal blooms in sluggish, sun-baked weir pools.',
    actionableIntervention: 'Keyline water harvesting, destocking livestock early to prevent pasture degradation, and deep compost application to lock soil moisture.',
    severity: 'High',
    coordinates: { lat: -33.8688, lng: 151.2093 }
  },
  {
    id: 'REGION-EUR-01',
    regionName: 'Southern Europe & Mediterranean Basin (Spain, Italy, Greece)',
    continent: 'Europe',
    ensoPhase: 'El Niño (Warm Phase)',
    temperatureAnomaly: '+1.7°C to +2.5°C summer heatwaves',
    precipitationShift: '-20% to -40% prolonged drought in Iberian Peninsula',
    primaryVulnerability: 'Desertification in Andalusian olive groves, reservoir levels sinking below 20%, and intense summer wildfire spread.',
    affectedCrops: ['Olives & Olive Oil', 'Grapes', 'Citrus', 'Durum Wheat'],
    waterBodyStress: 'Hypersaline lagoons and dried wetlands in Mediterranean floodplains.',
    actionableIntervention: 'Regenerative agriculture cover cropping between olive rows, wastewater recycling for agriculture, and construction of decentralized micro-dams.',
    severity: 'High',
    coordinates: { lat: 40.4637, lng: -3.7492 }
  }
];

export const EL_NINO_AWARENESS_FACTS = [
  {
    title: 'What is ENSO (El Niño Southern Oscillation)?',
    summary: 'ENSO is Earth’s single most influential natural climate cycle operating across the tropical Pacific Ocean.',
    detail: 'Under normal conditions, easterly trade winds push warm surface water toward Asia and Australia, allowing cold, nutrient-rich water to well up along South America. During El Niño, trade winds weaken or reverse. Warm water surges eastward toward the Americas, altering the entire global jet stream and shifting precipitation patterns across all 7 continents.'
  },
  {
    title: 'How Global Warming Amplifies El Niño Extremes',
    summary: 'A warmer atmosphere holds 7% more water vapor per 1°C increase (Clausius-Clapeyron relation).',
    detail: 'Higher atmospheric moisture capacity turns normal El Niño anomalies into unprecedented super-extremes: droughts become more desiccating as evaporation accelerates, while downpours become concentrated, destructive flash-flood events that strip topsoil.'
  },
  {
    title: 'The "Triple Threat" on Soil Health & Farmland',
    summary: 'El Niño impacts soil through heat baking, wind erosion, and flash-flood topsoil scouring.',
    detail: 'When rain fails, soil micro-biomes die from extreme desiccation, turning fertile loam into barren dust. When sudden torrential storms arrive on un-vegetated dry soil, the top 2 inches of fertile organic carbon is instantly washed away into waterways, choking lakes with silt.'
  },
  {
    title: 'Proactive Landowner & Farmer Adaptive Strategies',
    summary: 'Nature-based solutions build resilience regardless of whether rainfall is deficient or excessive.',
    detail: 'By combining contour swales, deep biochar mulching, farm ponds with silt traps, and native agroforestry bio-fences, landowners create a sponge-effect landscape that absorbs floodwaters into underground aquifers and preserves root-zone humidity during severe heatwaves.'
  }
];
