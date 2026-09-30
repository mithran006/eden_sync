import { AwarenessArticle } from '../types';

export interface FieldRecipe {
  id: string;
  name: string;
  kannadaTamilName?: string;
  purpose: string;
  category: 'Microbial Soil Inoculant' | 'Organic Pest Repellent' | 'Growth Hormone Tonic' | 'Carbon Sponge' | 'Potassium & Calcium Booster' | 'Bio-Fungicide & Disease Shield' | 'Composting & Decomposition';
  prepTimeDays: string;
  shelfLife: string;
  applicationMethod: string;
  dilutionRatio: string;
  estimatedCostPerBatch?: string;
  smallFarmBatchSize?: string;
  ingredients: { item: string; quantity: string; role: string }[];
  stepByStep: string[];
  keyBenefits: string[];
  precautions: string[];
}

export interface MythVsScience {
  id: string;
  myth: string;
  scienceTruth: string;
  category: 'Soil Health' | 'Water & Irrigation' | 'Pest Control' | 'Biodiversity';
  explanation: string;
  actionableAlternative: string;
}

export interface BioFenceSpeciesPlan {
  zone: string;
  purpose: string;
  recommendedCombination: {
    layer: 'Outer Barrier (Thorny/Dense)' | 'Middle Layer (Nitrogen Fixing/Fodder)' | 'Inner Border (Medicinal/Pollinator)';
    species: string;
    botanicalName: string;
    spacing: string;
    keyTrait: string;
  }[];
  growthSpeed: string;
  maintenanceNeeds: string;
  estimatedCostPer100m: string;
}

export const EXTENDED_AWARENESS_ARTICLES: AwarenessArticle[] = [
  {
    id: 'ART-001',
    title: 'Reviving Dead Soil: The Power of Green Manuring & Bio-Mulching',
    category: 'Soil Revival',
    readTime: '5 min read',
    summary: 'How fast-growing nitrogen-fixing legumes like Sunn Hemp and Sesbania can transform sterile, sunbaked clay into nutrient-rich humus within 60 days.',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    keyTips: [
      'Sow Sesbania (Daincha) or Sunn Hemp at 25 kg/acre right before monsoon showers.',
      'Plough the green crop into the topsoil at 45–50 days when 50% flowering begins.',
      'Cover with dry leaf mulch to prevent direct solar degradation of microbial colonies.'
    ],
    content: `Modern chemical farming and mono-cropping strip the soil of its most fundamental asset: organic carbon. When topsoil organic carbon drops below 0.5%, beneficial micro-organisms, earthworms, and mycorrhizal networks collapse, causing soil compaction, salinity, and water run-off.

Green manuring is nature's fastest remedy. By planting fast-growing leguminous crops and incorporating them into the soil just before flowering, farmers can add between 15 to 25 tonnes of fresh green biomass per acre. This rapidly decomposes, elevating microbial activity and releasing vital nitrogen, phosphorus, and potassium in plant-absorbable organic form.

### Step-by-Step Implementation:
1. **Selection of Seed Varieties**: Use Daincha (Sesbania aculeata) for waterlogged or alkaline soils, and Sunn Hemp (Crotalaria juncea) for well-drained sandy loams.
2. **Timing of Incorporation**: The optimal stage is 45–50 days after sowing when the succulent stems have high nitrogen and low lignin, allowing rapid 2-week decomposition.
3. **Moisture Maintenance**: Ensure soil has moderate moisture during rotavation to kickstart aerobic microbial breakdown.`
  },
  {
    id: 'ART-002',
    title: 'Community Pond De-silting: The Blueprint for Groundwater Security',
    category: 'Waterbodies',
    readTime: '6 min read',
    summary: 'A step-by-step guide to removing toxic sediment from village ponds, restoring tank cascade interconnectivity, and utilizing nutrient-dense silt as natural fertilizer.',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    keyTips: [
      'Perform silt extraction only during peak dry season (March–May) before pre-monsoon rains.',
      'Test extracted lake silt for heavy metal toxicity before applying to crop fields.',
      'Construct a perimeter bund planted with Vetiver grass to prevent recurring erosion.'
    ],
    content: `Over decades, agricultural runoff, decayed biomass, and unmanaged silt choke natural ponds and tanks, reducing their storage capacity by up to 80%. When a water body loses depth, sunlight penetrates the shallow water column, driving rapid evaporation and algae blooms instead of deep percolation.

De-silting restores the pond's sponge effect. When the impervious hard clay silt layer is removed, rainwater can directly recharge deep subterranean fissures and aquifers.

### Ecological Benefits of Tank Silt:
- **Natural Soil Conditioner**: Lake silt is rich in decomposed organic matter, clay-humus complexes, and essential minerals washed down from upper catchments.
- **Aquifer Pressure**: Deeper ponds create hydraulic head pressure, forcing recharge into surrounding borewells within a 2.5 km radius.
- **Community Silt Sharing**: Organize tractors during summer months to distribute top silt onto dryland plots, cutting synthetic fertilizer needs by 40%.`
  },
  {
    id: 'ART-003',
    title: 'Combating El Niño & Drought: Building Resilient Farm Micro-Climates',
    category: 'Climate Adaptation',
    readTime: '6 min read',
    summary: 'Deploying swales, keyline design, multi-tier agro-forestry, and drought-resistant native tree windbreaks to shield crops from extreme weather anomalies.',
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    keyTips: [
      'Dig continuous on-contour swales to hold 100% of episodic torrential downpours.',
      'Plant multi-layer windbreaks (Neem, Khejri, Tamarind) on the windward field boundaries.',
      'Incorporate biochar into root zones to create underground moisture reservoirs.'
    ],
    content: `El Niño cycles disrupt predictable monsoon patterns, causing severe heatwaves and irregular rainfall spikes. Conventional bare-earth fields lose up to 70% of moisture to direct solar radiation and wind evaporation.

By implementing keyline contour swales and multi-tier tree canopies, landowners create a cooling micro-climate. The subterranean water table is steadily nourished, keeping root systems hydrated even during extended dry spells.

### Micro-Climate Stabilization Protocol:
- **Sub-Surface Clay Pot (Olla) Irrigation**: Buried unglazed clay pots release water via soil suction directly to feeder roots with 90% water conservation.
- **Living Mulch Cover**: Inter-crop cowpeas, velvet beans, or clover to keep soil temperature under 28°C even when ambient air reaches 42°C.`
  },
  {
    id: 'ART-004',
    title: 'Biochar Pyrolysis & Activation: Creating Permanent Subterranean Carbon Sponges',
    category: 'Soil Revival',
    readTime: '7 min read',
    summary: 'How to convert dry agricultural residues into high-porosity recalcitrant carbon, inoculate it with mycorrhizal fungi, and lock moisture in soils for centuries.',
    imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80',
    keyTips: [
      'Pyrolyze crop stalks at 450–600°C in oxygen-starved cone kilns to prevent ash formation.',
      'Never apply raw, un-inoculated biochar directly — always charge with cow dung slurry or compost for 14 days.',
      'Apply at 2–4 tonnes/acre to permanently increase cation exchange capacity (CEC).'
    ],
    content: `Raw agricultural waste like cotton stalks, corn cobs, and coconut shells are frequently burned openly, releasing particulate matter and greenhouse gases. When pyrolyzed in low-oxygen kilns, these materials transform into Biochar — a pure honeycomb matrix of microscopic carbon chambers.

### The Inoculation / Charging Phase:
Raw biochar acts like an empty sponge and will temporarily rob the soil of moisture and nitrogen if applied directly. 

**How to Charge Biochar:**
1. Mix crushed biochar (particle size 2–5mm) with fresh cow dung slurry, Jeevamrutha, or vermicompost in a 1:1 volume ratio.
2. Allow the blend to ferment under shade for 14 to 21 days while keeping moisture at 40%.
3. Beneficial aerobic microbes and mycorrhizal fungi colonize the microscopic pores, loading them with active nutrients.

When broadcast into the top 6 inches of farm soil, charged biochar permanently elevates soil water retention by up to 300%, buffers against salinity spikes, and persists in the soil profile for hundreds of years.`
  },
  {
    id: 'ART-005',
    title: 'Floating Wetland Islands (Phytoremediation): Bio-Filtering Polluted Lakes',
    category: 'Waterbodies',
    readTime: '5 min read',
    summary: 'Building low-cost floating rafts with Vetiver grass and Canna Indica to absorb industrial nitrates, phosphorus, and heavy metals without chemical additives.',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    keyTips: [
      'Construct buoyant frames using bamboo poles and recycled PVC pipes lined with coir mesh.',
      'Plant deep-rooting hyperaccumulators: Vetiver grass (Chrysopogon zizanioides) and Canna indica.',
      'Harvest mature plant biomass every 4 months to permanently extract sequestered nutrients.'
    ],
    content: `Excessive fertilizer runoff and untreated domestic greywater flood waterbodies with nitrogen and phosphorus, sparking rapid eutrophication, toxic blue-green algae scums, and mass fish suffocations due to zero dissolved oxygen (anoxia).

Floating Treatment Wetlands (FTWs) mimic natural estuary cleansers:
- **Root Surface Bio-films**: As plant roots dangle freely in the water column, they develop thick biofilms of aerobic bacteria that digest organic sludge and break down ammonia into harmless nitrogen gas.
- **Heavy Metal Absorption**: Vetiver roots can extend up to 3 meters downward, actively accumulating lead, zinc, and synthetic dyes into plant cell vacuoles.
- **Sunlight Shielding**: The floating canopy shades the water column, lowering water temperatures and suppressing photosynthetic algae blooms.`
  },
  {
    id: 'ART-006',
    title: 'The 7-Layer Food Forest: Multi-Tier Agroforestry for Maximum Yield',
    category: 'Agroecology',
    readTime: '8 min read',
    summary: 'A permaculture blueprint mimicking natural tropical forest ecology to produce timber, fruits, spices, pulses, and forage on a single compact parcel.',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    keyTips: [
      'Layer 1 & 2 (Canopy & Sub-canopy): Tall timber/fruit trees (Tamarind, Mango, Jackfruit, Neem).',
      'Layer 3 & 4 (Shrubs & Herbaceous): Citrus, Moringa, Papaya, Pigeon pea, and Banana.',
      'Layer 5, 6 & 7 (Rhizosphere, Groundcover & Vines): Turmeric, Ginger, Sweet potato, and Pepper vines.'
    ],
    content: `Monoculture farming leaves over 60% of vertical sunlight and subterranean root zones completely unutilized, while exposing bare ground to erosion and weeds. 

The 7-Layer Syntropic Agroforestry model creates complete ecological synergy:
1. **Tall Overstory Canopy (30ft+)**: Coconut, Teak, Neem, and Jackfruit capture peak solar radiation.
2. **Sub-Canopy Fruit Layer (15-25ft)**: Guava, Pomegranate, Sapota, and Moringa thrive under dappled sunlight.
3. **Shrub Bush Layer (6-10ft)**: Coffee, Pigeon Pea (Arhar), and Curry Leaf bushes.
4. **Herbaceous Layer (2-5ft)**: Basil, Marigold (natural nematicide), and Chilli.
5. **Rhizosphere Root Layer (Sub-surface)**: Turmeric, Ginger, Elephant Yam, and Colocasia.
6. **Soil Surface Groundcover (0-1ft)**: Cowpea, Sweet Potato, and Clover acting as living moisture blankets.
7. **Vertical Climber Layer**: Black Pepper and Betel leaf climbing the trunks of tall canopy trees.

This integrated ecosystem produces continuous weekly harvests, virtually eliminates weed growth, and builds self-renewing topsoil organic matter.`
  },
  {
    id: 'ART-007',
    title: 'Keyline Swales & Continuous Contour Trenches (CCT) for Watersheds',
    category: 'Rainwater Harvesting',
    readTime: '6 min read',
    summary: 'Mastering the A-frame level to carve zero-gradient ditches across sloped farmland, stopping gully erosion and recharging dry borewells.',
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    keyTips: [
      'Use a simple 2-meter wooden A-frame with a plumb bob to mark true topographical contours.',
      'Excavate continuous trenches 1.5 ft wide by 1.5 ft deep along contour lines.',
      'Deposit excavated soil on the downhill side to form an earthen berm planted with Vetiver or Stylosanthes grass.'
    ],
    content: `When intense monsoon rains strike sloped terrains, water rushes downhill at destructive velocities, stripping centimeters of fertile topsoil and carving deep gullies while failing to replenish groundwater.

### The Physics of Keyline Infiltration:
A contour swale is an unlined, flat-bottomed ditch cut strictly on the topographical contour line (perpendicular to the slope). 

- **Slow, Spread, and Sink**: The swale arrests rushing runoff, spreads it evenly along the contour line, and forces millions of liters into subterranean sub-soil fissures.
- **Hydrated Tree Mounds**: Planting deep-rooted fruit or timber trees on the downhill earthen berm gives them continuous access to the subterranean moisture plume.
- **Check-Dam Stepped Cascades**: In natural gullies, install loose rock check dams with geotextile backing to trap silt while allowing clean water percolation.`
  },
  {
    id: 'ART-008',
    title: 'Living Bio-Fences: Thorny, Nitrogen-Fixing & Wildlife-Deterrent Walls',
    category: 'Bio-fencing',
    readTime: '5 min read',
    summary: 'Replacing expensive barbed wire and rusted chain-link with impenetrable living hedgerows that yield fodder, firewood, and organic pesticides.',
    imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80',
    keyTips: [
      'Outer Ring: Dense thorny species like Agave americana, Karonda (Carissa carandas), and Cactus.',
      'Middle Ring: Nitrogen-fixing fodder trees like Gliricidia sepium and Sesbania grandiflora.',
      'Establish close 0.5-meter zig-zag planting during early monsoon for rapid root interlocking.'
    ],
    content: `Conventional steel barbed wire fencing is expensive, rusts within 4 years in humid climates, and provides zero ecological return on investment. 

A multi-tier living bio-fence provides 5 key functions simultaneously:
1. **Physical & Wildlife Barrier**: Dense rows of *Agave americana*, *Carissa carandas* (Karonda), and *Euphorbia tirucalli* create impenetrable, razor-sharp thorny barriers that deter stray cattle, wild boars, and trespassers.
2. **Nitrogen Fixation & Green Mulch**: Interplanted *Gliricidia sepium* can be lopped 3 to 4 times a year to yield up to 10 tonnes/km of nitrogen-rich green foliage for soil mulching.
3. **Wind & Evaporation Break**: Dense living fences reduce wind speeds across crop fields by up to 50%, cutting crop water stress significantly.
4. **Beneficial Predator Habitat**: Living hedges host predatory birds, praying mantises, and ladybugs that feed on agricultural pests.`
  },
  {
    id: 'ART-009',
    title: 'Recharge Borewells: Funneling Monsoon Spikes into Deep Dry Aquifers',
    category: 'Rainwater Harvesting',
    readTime: '6 min read',
    summary: 'Transforming failing, dried-up agricultural borewells into high-capacity groundwater recharge shafts with gravel, charcoal, and sand filter beds.',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    keyTips: [
      'Excavate a 10x10x10 ft settlement pit around the borewell casing pipe.',
      'Perforate the upper casing pipe with 10mm holes wrapped in high-density nylon mesh.',
      'Fill the filtration pit in reverse layers: Boulders (bottom) ➔ Gravel ➔ Activated Charcoal ➔ Coarse Sand (top).'
    ],
    content: `Over-extraction has depleted deep subterranean aquifers, leaving thousands of farm borewells dry. During heavy monsoon cloudbursts, vast volumes of clean runoff escape to the sea.

### The Direct Borewell Injection System:
A direct recharge borewell captures surface runoff and channels it through a multi-stage sediment filtration chamber directly into deep underground rock fissures.

**Filtration Chamber Configuration:**
1. **Primary Silt Settlement Sump**: Captures incoming muddy water, allowing heavy suspended soil to settle before entering the main pit.
2. **Multi-Media Filtration Layers**:
   - Bottom 3 feet: 40-60mm granite boulders.
   - Middle 3 feet: 20mm graded blue metal gravel.
   - Core layer: 1 foot of agricultural charcoal to adsorb chemical traces.
   - Top 3 feet: Clean washed river sand to filter fine colloids.
3. **Slotted Casing Pipe**: Micro-mesh wrapping prevents any sand grains from slipping down the borewell shaft.`
  },
  {
    id: 'ART-010',
    title: 'Trap Cropping & Pollinator Corridors: Ecological Pest Suppression',
    category: 'Agroecology',
    readTime: '5 min read',
    summary: 'Deploying sacrificial border plants, push-pull pest repellents, and nectar-rich pollinator highways to eliminate synthetic chemical insecticide sprays.',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    keyTips: [
      'Plant African Marigold border rows every 15 crop rows to attract and trap tomato fruit borers.',
      'Sow Castor as a boundary trap crop for Spodoptera litura (Tobacco caterpillar) egg masses.',
      'Intercrop Sweet Fennel, Coriander, and Sunflower to feed parasitic wasps and hoverflies.'
    ],
    content: `Routine chemical pesticide spraying kills 98% of beneficial predator insects, triggering pesticide resistance and severe secondary pest outbreaks.

### The Push-Pull Agroecological Strategy:
- **The Pull (Trap Crops)**: Border crops with higher visual and scent appeal draw pests away from primary cash crops. For example, planting Mustard around Cabbage fields draws 80% of Diamondback moths.
- **The Push (Repellent Crops)**: Planting aromatic Lemongrass, Basil, or Desmodium between crop rows emits volatile organic compounds that confuse and repel stem borers.
- **Root Bio-Fumigation**: African marigold (*Tagetes erecta*) roots exude alpha-terthienyl, a natural bio-compound that paralyzes parasitic root-knot nematodes in the soil profile.`
  },
  {
    id: 'ART-011',
    title: 'Alkaline & Sodic Soil Reclamation: Gypsum Dosage & Leaching Dynamics',
    category: 'Soil Revival',
    readTime: '7 min read',
    summary: 'How to calculate exchangeable sodium percentage (ESP), displace toxic sodium ions with calcium, and restore water percolation to white-crusted soils.',
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    keyTips: [
      'Test soil pH and Electrical Conductivity (EC) — pH > 8.5 indicates Sodic/Alkali condition requiring gypsum.',
      'Broadcast finely ground agricultural gypsum (CaSO4·2H2O) at 2–3 tonnes/acre.',
      'Flood the field with fresh water for 72 hours, then drain the saline leaching runoff through drainage ditches.'
    ],
    content: `Alkali (Sodic) soils occur when exchangeable sodium ions attach to clay particles, causing clay dispersion. The soil structure collapses into an impermeable, cement-like hardpan that restricts root penetration and halts water infiltration.

### The Chemistry of Gypsum Correction:
When agricultural gypsum (Calcium Sulphate) is incorporated into moist sodic soil:
$$2\\text{Na}^+\\text{-Clay} + \\text{CaSO}_4 \\rightarrow \\text{Ca}^{2+}\\text{-Clay} + \\text{Na}_2\\text{SO}_4$$

The soluble calcium ions ($Ca^{2+}$) aggressively displace the toxic sodium ions ($Na^+$) from the clay colloids. The displaced sodium bonds with sulfate to form soluble sodium sulfate ($Na_2SO_4$), which is effortlessly flushed below the root zone through deep furrow drainage ditches. 

Following gypsum treatment, sowing salt-tolerant green manure like *Dhaincha* (Sesbania) rapidly regenerates granular soil crumb porosity.`
  },
  {
    id: 'ART-012',
    title: 'Farm Pond (Jal Kund) Engineering: Geometry, Lining & Spillway Design',
    category: 'Waterbodies',
    readTime: '6 min read',
    summary: 'Complete engineering guide to digging, shaping 1:1.5 side slopes, installing UV-stabilized polythene/bentonite clay liners, and securing silt-trap inlets.',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    keyTips: [
      'Excavate with a minimum 1.5:1 horizontal-to-vertical side slope to prevent embankment wall slumping.',
      'Construct a 3-chamber silt trap at the inlet to drop suspended mud before clean water fills the pond.',
      'Line with 500-micron multi-layered UV-stabilized HDPE geomembrane for sandy soils.'
    ],
    content: `A well-designed 1-acre farm pond can store between 15 to 25 lakh liters of rainwater, providing lifesaver irrigation for 4 to 8 acres of standing crops during critical monsoon dry spells.

### Key Engineering Principles:
1. **Catchment Location**: Choose the lowest natural depression on your parcel where contour swales naturally converge.
2. **Side Slope Stability**: Never dig vertical pond walls. A 1:1.5 or 1:2 slope ensures stable embankments and prevents earth collapse.
3. **Silt Trap Inflow**: Incoming muddy runoff first passes through a shallow silt basin planted with vetiver grass, shedding 90% of suspended sediment before spilling into the main reservoir.
4. **Emergency Spillway**: Always construct a broad, grassed masonry spillway on the opposite side to safely discharge surplus overflow during extreme 100-year cloudburst events.`
  }
];

export const INDIGENOUS_FIELD_RECIPES: FieldRecipe[] = [
  {
    id: 'REC-01',
    name: 'Liquid Jeevamrutha (జీవామృతం / ஜீவாமிர்தம் / जीवामृत)',
    kannadaTamilName: 'Jeevamrutha Microbial Soil Catalyst',
    purpose: 'Rapid multiplication of aerobic beneficial soil bacteria, nitrogen-fixing rhizobia, and phosphorus solubilizers.',
    category: 'Microbial Soil Inoculant',
    prepTimeDays: '48 to 72 Hours',
    shelfLife: 'Use within 7 to 10 days of fermentation',
    applicationMethod: 'Drip irrigation, flood irrigation channel dosing, or 10% foliar spray.',
    dilutionRatio: '200 Litres per Acre (undiluted with irrigation) or 1:10 with clean water for foliar spraying.',
    estimatedCostPerBatch: '₹40 - ₹60 (Free if farm cattle available)',
    smallFarmBatchSize: '50L for 0.25 acre / 200L for 1 acre',
    ingredients: [
      { item: 'Fresh Desi Cow Dung (Desi Gomaya)', quantity: '10 kg', role: 'Inoculum of 300+ billion beneficial bacterial colonies' },
      { item: 'Desi Cow Urine (Gomutra)', quantity: '5 - 10 Litres', role: 'Nitrogen source and natural antifungal compounds' },
      { item: 'Organic Jaggery / Sugarcane Juice', quantity: '2 kg (or 4L juice)', role: 'Energy/carbon food to feed multiplying microbes' },
      { item: 'Gram Flour (Besan / Pulse Powder)', quantity: '2 kg', role: 'Protein source for microbial spore reproduction' },
      { item: 'Virgin Forest / Fence Bound Topsoil', quantity: 'Handful (100-200g)', role: 'Native mycorrhizal fungal spores' },
      { item: 'Chlorine-Free Water', quantity: '200 Litres', role: 'Aqueous fermentation medium' }
    ],
    stepByStep: [
      'Take a 200-litre plastic barrel placed under dense tree shade (never direct sunlight).',
      'Fill with 190 litres of fresh, unchlorinated well or rainwater.',
      'In a separate bucket, thoroughly mix 10 kg cow dung and 5-10L cow urine into a smooth slurry.',
      'Add 2 kg dissolved jaggery and 2 kg pulse flour without any lumps.',
      'Pour the slurry into the barrel and add a handful of undisturbed soil collected under a banyan tree or field bund.',
      'Stir the concoction clockwise with a wooden stick for 2 minutes.',
      'Cover the barrel with a damp gunny jute bag to allow aerobic breathing while blocking flies.',
      'Stir clockwise for 2 minutes twice daily (morning & evening) for 48 to 72 hours.',
      'The liquid will froth and emit a pleasant fermented earthy aroma, indicating peak microbial density.'
    ],
    keyBenefits: [
      'Multiplies soil bacterial populations from a few thousands to millions per gram within 48 hours.',
      'Converts locked chemical phosphorus and zinc into plant-absorbable ions.',
      'Attracts native deep-burrowing earthworms (Pheretima & Eisenia) to the surface.'
    ],
    precautions: [
      'Never use chlorinated tap water as chlorine instantly kills the bacterial inoculum.',
      'Keep barrel strictly in shade; solar heat over 38°C sterilizes beneficial microbes.'
    ]
  },
  {
    id: 'REC-02',
    name: 'Ghana Jeevamrutha (Solid Organic Carbon Cake / ಘನ ಜೀವಾಮೃತ)',
    kannadaTamilName: 'Ghana Jeevamrutha Dry Granules',
    purpose: 'Concentrated baseline organic soil conditioning for sowing, transplanting, and root zone incorporation.',
    category: 'Carbon Sponge',
    prepTimeDays: '7 to 10 Days',
    shelfLife: '6 Months when stored in dry, cool shade',
    applicationMethod: 'Broadcast during basal field ploughing or placed in planting pits.',
    dilutionRatio: '100 - 200 kg per Acre during land preparation.',
    estimatedCostPerBatch: '₹80 - ₹120 per 100 kg batch',
    smallFarmBatchSize: '25 kg for 0.25 acre / 100 kg for 1 acre',
    ingredients: [
      { item: 'Desi Cow Dung (Air-dried)', quantity: '100 kg', role: 'Humic carbon and mineral matrix' },
      { item: 'Liquid Jeevamrutha', quantity: '20 Litres', role: 'Living microbial inoculum' },
      { item: 'Gram Flour (Besan)', quantity: '2 kg', role: 'Microbial sustenance' },
      { item: 'Jaggery Powder', quantity: '2 kg', role: 'Carbohydrate activator' }
    ],
    stepByStep: [
      'Spread 100 kg of semi-dry desi cow dung on a clean tarp under dense tree shade.',
      'Mix 2 kg jaggery and 2 kg besan into 20L of freshly prepared Liquid Jeevamrutha.',
      'Sprinkle the liquid evenly across the cow dung heap and mix thoroughly with a shovel.',
      'Make a conical mound and cover with damp jute gunny sacks for 48 hours to initiate warm fermentation.',
      'Spread the mixture thinly in shade to dry until moisture drops to 15%.',
      'Crush any hard lumps into uniform granules and store in breathable jute bags.'
    ],
    keyBenefits: [
      'Ideal for drought-prone regions where liquid irrigation dosing is limited.',
      'Provides slow-release nitrogen, phosphorus, and organic carbon over 90 days.',
      'Accelerates seed germination and root anchoring by 35%.'
    ],
    precautions: [
      'Do not sun-dry the granules; dry strictly under shade to preserve live bacterial spores.'
    ]
  },
  {
    id: 'REC-03',
    name: 'Panchagavya (பஞ்சகாவ்யா / పంచగవ్య / पंचगव्य)',
    kannadaTamilName: 'Panchagavya Miracle Growth Hormone Tonic',
    purpose: 'Miracle biological growth booster, branching stimulator, and disease immunity promoter for all crops.',
    category: 'Growth Hormone Tonic',
    prepTimeDays: '21 Days',
    shelfLife: '6 Months when stored in a cool shaded container',
    applicationMethod: '3% foliar spray (300ml per 10L water) or drip irrigation (20L/acre).',
    dilutionRatio: '30ml Panchagavya in 1 Litre of clean water (3% solution).',
    estimatedCostPerBatch: '₹120 - ₹180 per 20 Litre batch',
    smallFarmBatchSize: '5L for 0.25 acre / 20L for 1 acre',
    ingredients: [
      { item: 'Fresh Desi Cow Dung', quantity: '5 kg', role: 'Primary microbial culture' },
      { item: 'Desi Cow Ghee (Clarified Butter)', quantity: '500 grams', role: 'Fatty acid lipid matrix' },
      { item: 'Desi Cow Urine', quantity: '3 Litres', role: 'Enzymes and urea' },
      { item: 'Fresh Cow Milk', quantity: '2 Litres', role: 'Lactic acid and proteins' },
      { item: 'Fresh Cow Curd / Yogurt', quantity: '2 Litres', role: 'Lactobacillus cultures' },
      { item: 'Tender Coconut Water', quantity: '3 Litres', role: 'Cytokinins and natural plant hormones' },
      { item: 'Organic Jaggery dissolved in 3L water', quantity: '1 kg', role: 'Fermentation accelerator' },
      { item: 'Ripe Overripe Bananas', quantity: '12 fruits (mashed)', role: 'Potassium and enzyme surge' }
    ],
    stepByStep: [
      'Day 1-3: Mix 5 kg cow dung and 500g cow ghee in a plastic drum. Let sit for 3 days, stirring twice daily.',
      'Day 4: Add cow urine, milk, curd, tender coconut water, jaggery water, and mashed bananas.',
      'Stir vigorously clockwise for 5 minutes.',
      'Keep drum in shade, covered with muslin cloth. Stir twice daily for 18 more days (Total 21 days).',
      'By day 21, the liquid turns golden brown with a pleasant fruity-alcohol fragrance.',
      'Filter through double muslin cloth and store in bottles.'
    ],
    keyBenefits: [
      'Contains natural Gibberellins, Auxins, and Cytokinins that induce heavy flowering and fruit set.',
      'Increases leaf surface area and chlorophyll concentration by up to 40%.',
      'Produces pest-resistant thick waxy cuticle layers on crop foliage.'
    ],
    precautions: [
      'Do not exceed 3% concentration for foliar spray to prevent osmotic leaf tip burn.'
    ]
  },
  {
    id: 'REC-04',
    name: 'Beejamrutha / Bijamrit (Seed & Seedling Root Dip / ಬೀಜಾಮೃತ)',
    kannadaTamilName: 'Beejamrutha Seed Shield Inoculant',
    purpose: 'Seed dressing and root dip to protect emerging seedlings from damping off, root rot, termites, and seed-borne fungi.',
    category: 'Bio-Fungicide & Disease Shield',
    prepTimeDays: '12 to 24 Hours',
    shelfLife: 'Use immediately within 24 hours',
    applicationMethod: 'Coat seeds evenly by hand, shade-dry for 30 minutes, or dip seedling roots for 5 minutes before transplanting.',
    dilutionRatio: 'Used undiluted for seed treatment (treats 50 to 100 kg seeds).',
    estimatedCostPerBatch: '₹15 - ₹25 per batch',
    smallFarmBatchSize: '5L treats seeds for 2 acres',
    ingredients: [
      { item: 'Fresh Desi Cow Dung (tied in cloth pouch)', quantity: '5 kg', role: 'Antimicrobial extract' },
      { item: 'Desi Cow Urine (Gomutra)', quantity: '5 Litres', role: 'Natural biocide against fungal spores' },
      { item: 'Virgin Farm Bund Soil', quantity: '50 grams', role: 'Native beneficial root colonizers' },
      { item: 'Slaked Lime (Chuna / Calcium Hydroxide)', quantity: '50 grams (dissolved in 1L water)', role: 'Calcium booster & pH stabilizer' },
      { item: 'Water', quantity: '20 Litres', role: 'Carrier medium' }
    ],
    stepByStep: [
      'Suspend 5 kg cow dung tied in a porous cloth bundle into 20 litres of water for 12 hours.',
      'Squeeze the pouch repeatedly to extract water-soluble biocidal and microbial juices.',
      'Add 5 litres of cow urine, a handful of fertile topsoil, and 50g dissolved slaked lime water.',
      'Stir well with a stick and let rest for 2 hours.',
      'Spread seeds on a clean tarp, sprinkle Beejamrutha, rub gently to form a uniform dark coating, and dry in shade for 30 min before sowing.'
    ],
    keyBenefits: [
      'Enhances seed germination rate from 65% to 92%.',
      'Forms a living bio-shield around young emerging taproots, blocking Pythium and Fusarium wilt.',
      'Repels seed-eating ants, termites, and soil grubs naturally.'
    ],
    precautions: [
      'Never dry treated seeds in direct sunlight; keep under cool tree shade.',
      'For delicate vegetable seeds, dip for only 30 seconds.'
    ]
  },
  {
    id: 'REC-05',
    name: 'Fish Amino Acid (FAA / Meen Amilam / மீன் அமினோ அமிலம்)',
    kannadaTamilName: 'Meen Amilam Nitrogen Shoot Booster',
    purpose: 'Ultra-concentrated organic nitrogen, protein, and amino acid foliar booster for explosive vegetative growth.',
    category: 'Growth Hormone Tonic',
    prepTimeDays: '20 to 30 Days',
    shelfLife: '6 to 12 Months in airtight container',
    applicationMethod: 'Foliar spray at 2ml - 5ml per Litre of water (0.2% - 0.5% solution).',
    dilutionRatio: '20ml - 50ml FAA in 10 Litres clean water.',
    estimatedCostPerBatch: '₹60 - ₹100 per 2 kg batch',
    smallFarmBatchSize: '2 kg batch provides 40 spray tanks (4 acres)',
    ingredients: [
      { item: 'Fresh Fish Waste (Heads, guts, scales from local market)', quantity: '1 kg', role: 'Dense marine protein & bio-nitrogen' },
      { item: 'Organic Country Jaggery (Crushed powder)', quantity: '1 kg', role: '1:1 Osmotic fermenter & preservative' },
      { item: 'Airtight Plastic Jar with breathable lid', quantity: '1 unit (3-5L)', role: 'Anaerobic/semi-aerobic vessel' }
    ],
    stepByStep: [
      'Chop fish waste into small 1-inch chunks to maximize contact surface area.',
      'Layer chopped fish and crushed jaggery alternatively in a 1:1 ratio in the plastic jar.',
      'Top off with a thick layer of jaggery so no raw fish is exposed to air.',
      'Seal the jar tightly and place in a dark, warm, shaded room for 25 to 30 days.',
      'During the first 5 days, burp the lid once daily to release fermentation gas.',
      'By day 30, the mixture completely liquefies into a sweet, aromatic brown syrup with no foul odor.',
      'Filter the liquid through a fine wire strainer and store in dark bottles.'
    ],
    keyBenefits: [
      'Delivers instant peptides and 18 L-amino acids absorbed directly through leaf stomata.',
      'Dramatically accelerates new shoot emergence, thick dark green foliage, and tillering in paddy/millets.',
      'Boosts micro-flora activity in poor, degraded clay soils.'
    ],
    precautions: [
      'Never spray during flowering stage as excessive nitrogen causes flower drop; use only in vegetative & fruit-sizing stages.',
      'Strictly maintain 1:1 ratio; less jaggery will cause rot and foul smell.'
    ]
  },
  {
    id: 'REC-06',
    name: 'Egg-Lime Amino Acid (Muttai Elumichai Rasam / முட்டை எலுமிச்சை சாறு)',
    kannadaTamilName: 'Egg Lime Calcium Flowering Miracle',
    purpose: 'Natural water-soluble calcium, protein, and enzyme tonic to stop flower shedding, boost pollination, and induce heavy fruiting.',
    category: 'Potassium & Calcium Booster',
    prepTimeDays: '10 to 12 Days',
    shelfLife: '6 Months',
    applicationMethod: 'Foliar spray at pre-flowering and fruit-setting stages.',
    dilutionRatio: '2ml to 5ml per Litre of water (20ml - 50ml per 10L knapsack sprayer).',
    estimatedCostPerBatch: '₹70 - ₹90 for 1 Litre concentrate',
    smallFarmBatchSize: '1L concentrate covers 2 to 3 spray rounds for 1 acre',
    ingredients: [
      { item: 'Fresh Desi Country Chicken / Duck Eggs', quantity: '10 Whole Eggs', role: 'Bio-calcium shell + albumen proteins' },
      { item: 'Fresh Lemon Juice (Squeezed)', quantity: 'Enough to fully submerge eggs (approx 15-20 lemons / 400ml)', role: 'Citric acid solvent' },
      { item: 'Organic Jaggery (Crushed equal weight to liquid on Day 10)', quantity: 'Approx 500g', role: 'Fermentation balancer & energy' }
    ],
    stepByStep: [
      'Place 10 clean, unwashed eggs gently inside a wide-mouth glass or food-grade plastic jar.',
      'Pour fresh lemon juice until all eggs are submerged by at least 1 inch.',
      'Close lid loosely and keep in a cool, dark room for 10 days.',
      'The citric acid will completely dissolve the calcium carbonate eggshells, leaving soft balloon-like membranes.',
      'On Day 10, break the eggs with a wooden spoon and stir thoroughly with the liquid.',
      'Add equal weight (approx 500g) of powdered jaggery, stir well, and ferment for another 2 to 3 days.',
      'Filter the sweet aromatic amber syrup and bottle for foliar use.'
    ],
    keyBenefits: [
      'Prevents blossom-end rot in tomatoes, brinjal, chillies, and fruit drop in mango/citrus.',
      'Provides bio-available calcium ions ($Ca^{2+}$) for thicker plant cell walls and disease resistance.',
      'Doubles flower retention and enhances fruit weight and shine.'
    ],
    precautions: [
      'Do not use synthetic white vinegar; use only natural fresh lemon juice for authentic enzyme activity.'
    ]
  },
  {
    id: 'REC-07',
    name: 'Neemastra (Azadirachtin Bio-Insecticide / நீமாஸ்திரம் / వేప కషాయం)',
    kannadaTamilName: 'Neemastra Sucking Pest Deterrent',
    purpose: 'Broad-spectrum organic protection against sucking pests, aphids, jassids, whiteflies, mealybugs, and early-stage borers.',
    category: 'Organic Pest Repellent',
    prepTimeDays: '24 to 48 Hours',
    shelfLife: 'Use within 15 to 20 days',
    applicationMethod: 'Direct foliar spray during early morning or late evening.',
    dilutionRatio: '100% undiluted spray or 1:2 with clean water for sensitive young seedlings.',
    estimatedCostPerBatch: '₹20 - ₹30 per 100L batch',
    smallFarmBatchSize: '25L for 0.25 acre / 100L for 1 acre',
    ingredients: [
      { item: 'Fresh Crushed Neem Leaves & Tender Twigs', quantity: '5 kg', role: 'Azadirachtin insect growth disruptor' },
      { item: 'Crushed Neem Seed / Kernel Powder', quantity: '5 kg', role: 'Concentrated bitter triterpenoid limonoids' },
      { item: 'Desi Cow Urine (Gomutra)', quantity: '5 Litres', role: 'Antifungal carrier and natural sticker' },
      { item: 'Fresh Desi Cow Dung', quantity: '2 kg', role: 'Fermentation catalyst' },
      { item: 'Chlorine-Free Water', quantity: '100 Litres', role: 'Aqueous carrier' }
    ],
    stepByStep: [
      'Crush 5 kg neem leaves and 5 kg neem seed kernels into a coarse paste.',
      'In a 100-litre plastic drum, combine 100 litres of water, 5 litres of cow urine, and 2 kg cow dung.',
      'Add the crushed neem paste and stir clockwise for 5 minutes with a wooden pole.',
      'Cover with breathable cotton cloth and allow to ferment for 48 hours in shade, stirring twice daily.',
      'Filter the liquid through a fine muslin cloth to remove suspended particles.',
      'Spray directly on crop foliage covering both top and bottom surfaces of leaves.'
    ],
    keyBenefits: [
      'Suppresses pest feeding and reproduction without harming beneficial honeybees, ladybugs, or earthworms.',
      'Contains over 100 bitter limonoids preventing pest resistance mutations.',
      'Safe for immediate harvest with zero toxic chemical residues.'
    ],
    precautions: [
      'Never spray under harsh midday sun (11 AM - 3 PM); spray at 4 PM to avoid leaf scorching.'
    ]
  },
  {
    id: 'REC-08',
    name: 'Brahmastra (5-Bitter Leaf Antifeedant Extract / பிரம்மாஸ்திரம் / బ్రహ్మాస్త్రం)',
    kannadaTamilName: 'Brahmastra 5-Leaf Caterpillar Armor',
    purpose: 'Potent biological antifeedant against hard-to-kill leaf-eating caterpillars, pod borers, fruit borers, and armyworms.',
    category: 'Organic Pest Repellent',
    prepTimeDays: '1 Day (Boiled Decoction)',
    shelfLife: '6 Months when bottled in shade',
    applicationMethod: 'Foliar spray at 3% concentration (30ml per 1 Litre water).',
    dilutionRatio: '300ml Brahmastra in 10 Litres water (1 knapsack spray tank).',
    estimatedCostPerBatch: '₹30 - ₹50 per batch',
    smallFarmBatchSize: '2L concentrate treats 1 acre (6 to 7 tanks)',
    ingredients: [
      { item: 'Neem Leaves (Azadirachta indica)', quantity: '2 kg (crushed)', role: 'Primary bitter limonoid' },
      { item: 'Custard Apple Leaves (Sitaphal / Annona squamosa)', quantity: '2 kg (crushed)', role: 'Annonin contact paralyzer' },
      { item: 'Papaya Leaves (Carica papaya)', quantity: '2 kg (crushed)', role: 'Papain digestive enzyme disruptor' },
      { item: 'Guava or Pomegranate Leaves', quantity: '2 kg (crushed)', role: 'Tannins and phenolic repellents' },
      { item: 'White Datura / Calotropis (Erukku / Jilledu) Leaves', quantity: '2 kg (crushed)', role: 'Alkaloid toxic antifeedant' },
      { item: 'Desi Cow Urine (Gomutra)', quantity: '10 Litres', role: 'Extraction medium' }
    ],
    stepByStep: [
      'Coarsely crush all 5 types of leaves using a stone mortar or cutter.',
      'Place crushed leaves in an earthen pot or copper/steel vessel and add 10 litres of cow urine.',
      'Boil on a slow wood fire for 45 to 60 minutes until the liquid reduces by 50% and turns dark blackish-green.',
      'Allow to cool completely for 24 hours under shade.',
      'Filter through double-folded fine cotton cloth and squeeze out all extract.',
      'Store the filtered concentrate in plastic or glass carboys.'
    ],
    keyBenefits: [
      'Destroys the appetite of Helicoverpa, Spodoptera, and Maruca caterpillars within 2 hours of feeding.',
      'Acts as an oviposition deterrent preventing adult moths from laying eggs on crops.',
      'Long-lasting field residual protection for 10 to 14 days.'
    ],
    precautions: [
      'Wear rubber gloves while handling Datura / Calotropis leaves to prevent skin irritation.'
    ]
  },
  {
    id: 'REC-09',
    name: 'Agniastra (Fiery Chilli-Garlic-Tobacco Extract / அக்னியாஸ்திரம் / అగ్ని అస్త్రం)',
    kannadaTamilName: 'Agniastra Fiery Pest Exterminator',
    purpose: 'High-pungency bio-insecticide to eradicate stem borers, leaf miners, leaf rollers, and heavy bollworm infestations.',
    category: 'Organic Pest Repellent',
    prepTimeDays: '24 Hours (Slow Heat Decoction)',
    shelfLife: '3 Months in dark bottles',
    applicationMethod: 'Foliar spray at 2% to 3% concentration (200ml - 300ml per 10L water).',
    dilutionRatio: '20ml - 30ml Agniastra per 1 Litre of clean water.',
    estimatedCostPerBatch: '₹60 - ₹80 per 10L batch',
    smallFarmBatchSize: '2L concentrate covers 1 acre infestation',
    ingredients: [
      { item: 'Desi Cow Urine (Gomutra)', quantity: '10 Litres', role: 'Boiling solvent and bio-carrier' },
      { item: 'Hot Pungent Green Chillies (Guntur/Bird Eye)', quantity: '500 grams (crushed paste)', role: 'Capsaicin irritant & membrane destroyer' },
      { item: 'Country Garlic Bulbs (Poondu)', quantity: '500 grams (crushed paste)', role: 'Allicin systemic insect repellent' },
      { item: 'Raw Country Tobacco Dust / Leaves (Optional)', quantity: '500 grams', role: 'Nicotine nerve blocker' },
      { item: 'Neem Leaf Paste', quantity: '2 kg (crushed)', role: 'Azadirachtin booster' }
    ],
    stepByStep: [
      'In a wide clay or stainless steel pot, pour 10 litres of cow urine.',
      'Add crushed green chilli paste, garlic paste, neem paste, and tobacco powder.',
      'Boil on low flame until the mixture comes to a rolling boil 4 times (approx 45 minutes).',
      'Remove from fire, cover with lid, and allow to steep for 24 to 48 hours in shade.',
      'Filter through muslin cloth and bottle the deep reddish-brown liquid.',
      'Mix with 10L water per 250ml extract and spray with a fine mist nozzle.'
    ],
    keyBenefits: [
      'Penetrates inside rolled leaves and stem borer entry holes, forcing larvae out.',
      'Paralyzes the respiratory spiracles of leaf miners and thrips on contact.',
      'Repels wild boars and stray animals with its intense garlic-capsaicin scent boundary.'
    ],
    precautions: [
      'Always stand upwind while boiling and spraying to avoid breathing spicy fumes.',
      'Do not spray on tender newly sprouted nursery seedlings without testing at 1% dilution first.'
    ]
  },
  {
    id: 'REC-10',
    name: 'Dashaparni Kashayam (10-Leaf Botanical Bio-Shield / தசபர்ணி கஷாயம்)',
    kannadaTamilName: 'Dashaparni 10-Leaf Universal Bio-Shield',
    purpose: 'Universal broad-spectrum botanical bio-pesticide and antiviral/antifungal leaf wash against 40+ agricultural pests.',
    category: 'Organic Pest Repellent',
    prepTimeDays: '30 to 45 Days Cold Fermentation',
    shelfLife: '6 Months',
    applicationMethod: 'Foliar spray at 200ml per 10 Litres water.',
    dilutionRatio: '200ml Dashaparni in 10L water (2% concentration).',
    estimatedCostPerBatch: '₹50 - ₹70 per 200L batch',
    smallFarmBatchSize: '20L concentrate provides season-long protection for 2 acres',
    ingredients: [
      { item: 'Neem Leaves (Azadirachta indica)', quantity: '5 kg (crushed)', role: 'Core broad spectrum repellent' },
      { item: 'Pongamia (Karanj / Pungam) Leaves', quantity: '2 kg (crushed)', role: 'Karanjin bio-insecticide' },
      { item: 'Calotropis (Crown Flower / Erukku) Leaves', quantity: '2 kg (crushed)', role: 'Alkaloid bitterant' },
      { item: 'Castor (Amanakku / Arandi) Leaves', quantity: '2 kg (crushed)', role: 'Ricin insecticidal agent' },
      { item: 'Datura (Thorn Apple) Leaves', quantity: '2 kg (crushed)', role: 'Tropane alkaloids' },
      { item: 'Papaya Leaves', quantity: '2 kg (crushed)', role: 'Enzymatic leaf breakdown' },
      { item: 'Custard Apple Leaves', quantity: '2 kg (crushed)', role: 'Contact paralytic' },
      { item: 'Adhatoda (Vasaka / Adusa) Leaves', quantity: '2 kg (crushed)', role: 'Vasicine respiratory deterrent' },
      { item: 'Marigold (Tagetes) Whole Plants', quantity: '2 kg (crushed)', role: 'Nematode suppression' },
      { item: 'Tulsi / Guava Leaves', quantity: '2 kg (crushed)', role: 'Aromatic essential oils' },
      { item: 'Cow Dung (2 kg) + Cow Urine (5L) + Water (200L)', quantity: 'Standard', role: 'Living microbial fermentation medium' }
    ],
    stepByStep: [
      'In a 200-litre plastic barrel placed in tree shade, mix 200L water, 5L cow urine, and 2 kg cow dung.',
      'Add crushed ginger (500g), garlic (500g), and green chillies (500g) to speed extraction.',
      'Add all 10 types of coarsely chopped leaves into the drum.',
      'Stir clockwise for 5 minutes twice daily.',
      'Allow the herbal brew to ferment undisturbed in shade for 30 to 45 days.',
      'Filter the deep aromatic dark extract and store in opaque containers for field spraying.'
    ],
    keyBenefits: [
      'Combines 10 distinct botanical defense chemicals so pests can never build evolutionary resistance.',
      'Controls mosaic virus vectors like whiteflies and leafhoppers simultaneously.',
      'Strengthens the plant immune system (systemic acquired resistance).'
    ],
    precautions: [
      'Always filter thoroughly through 100-mesh nylon cloth to prevent sprayer nozzle clogging.'
    ]
  },
  {
    id: 'REC-11',
    name: 'Waste Decomposer Slurry (ICAR-NCOF Microbial Consortium / கழிவு மக்க வைப்பான்)',
    kannadaTamilName: 'National Waste Decomposer Culture',
    purpose: 'Rapid in-situ bio-decomposition of paddy stubble, sugarcane trash, dry straw, and cattle dung into rich humus in 21 days.',
    category: 'Composting & Decomposition',
    prepTimeDays: '5 to 7 Days Fermentation',
    shelfLife: 'Can be endlessly multiplied every week from starter mother culture',
    applicationMethod: 'Spray on standing crop stubble before rotavator ploughing, or drench compost piles.',
    dilutionRatio: '200 to 500 Litres per Acre applied with flood or sprinkler irrigation.',
    estimatedCostPerBatch: '₹20 (Bottle) + ₹80 (Jaggery) = ₹100 for infinite multiplication',
    smallFarmBatchSize: '200L treats 1 acre crop stubble in 21 days',
    ingredients: [
      { item: 'ICAR-NCOF National Waste Decomposer Culture (1 bottle / 30g)', quantity: '1 unit', role: 'Beneficial consortium of composting bacteria' },
      { item: 'Organic Country Jaggery (Gur)', quantity: '2 kg', role: 'Food substrate for rapid billion-fold bacterial expansion' },
      { item: 'Chlorine-Free Well / Borewell Water', quantity: '200 Litres', role: 'Fermentation carrier' },
      { item: 'Clean 200L Plastic Drum with shade placement', quantity: '1 unit', role: 'Vessel' }
    ],
    stepByStep: [
      'Dissolve 2 kg jaggery in a bucket of warm water until free of lumps.',
      'Pour the jaggery syrup into a 200L plastic drum filled with 190L clean water.',
      'Open the Waste Decomposer vial and empty the contents directly into the drum (avoid touching with bare hands).',
      'Stir vigorously clockwise with a clean wooden pole for 2 minutes.',
      'Cover the drum with cardboard or gunny bag and leave in shade for 5 to 7 days.',
      'Stir for 2 minutes twice daily. By day 6, a thick creamy foam layer forms on top with a sweet fermented smell.',
      'Reserve 20 litres as mother culture for your next batch; use remaining 180L on the field.'
    ],
    keyBenefits: [
      'Completely eliminates the need for hazardous crop stubble burning.',
      'Converts 2 tonnes of farm crop residue into ₹10,000 worth of nutrient-rich topsoil humus.',
      'Suppresses soil-borne pathogenic fungal sclerotia in the soil profile.'
    ],
    precautions: [
      'Always keep 20L aside before finishing the batch to easily multiply another 200L without buying a new bottle.'
    ]
  },
  {
    id: 'REC-12',
    name: 'Sour Buttermilk & Asafoetida Spray (Puli Cithar / புளித்த மோர் கரைசல் / పుల్లటి మజ్జిగ)',
    kannadaTamilName: 'Sour Buttermilk Anti-Fungal Shield',
    purpose: 'Powerful organic probiotic and antifungal foliar spray to cure powdery mildew, downy mildew, leaf curl, and bacterial blights.',
    category: 'Bio-Fungicide & Disease Shield',
    prepTimeDays: '5 to 7 Days Sour Fermentation',
    shelfLife: '1 Month',
    applicationMethod: 'Foliar spray at 5% concentration (500ml per 10 Litre spray tank).',
    dilutionRatio: '500ml sour buttermilk + 10g Hing (Asafoetida) in 10 Litres clean water.',
    estimatedCostPerBatch: '₹20 - ₹40 per batch',
    smallFarmBatchSize: '5L buttermilk makes 100L spray (covers 1 acre)',
    ingredients: [
      { item: 'Raw Country Cow / Buffalo Buttermilk (Sour)', quantity: '5 Litres', role: 'Lactic acid bacteria and acidic pH 4.0' },
      { item: 'Pure Asafoetida (Hing / Perungayam)', quantity: '50 grams (powdered)', role: 'Sulfur-rich antifungal and antiviral agent' },
      { item: 'Copper Plate or Clean Copper Scrap (Optional)', quantity: '1 piece (submerged in jar)', role: 'Natural copper ion release against blights' },
      { item: 'Clean Water', quantity: '100 Litres (for final field dilution)', role: 'Carrier' }
    ],
    stepByStep: [
      'Collect 5 litres of fresh churned buttermilk in an earthen pot or plastic container.',
      'Drop a clean copper wire or small copper strip inside the pot.',
      'Add 50g powdered asafoetida and stir thoroughly.',
      'Cover the mouth with cloth and allow to ferment under shade for 5 to 7 days.',
      'The buttermilk turns greenish-blue due to reaction with copper ions and develops intense sour acidity.',
      'Filter through muslin cloth, dilute with water (500ml per 10L), and spray uniformly on infected leaves.'
    ],
    keyBenefits: [
      'Lactic acid bacteria outcompete and suffocate powdery mildew spores on cucurbits, grapes, and pulses.',
      'Asafoetida sulfur vapors repel mites, thrips, and viral transmission vectors.',
      'Forms a protective probiotic micro-layer on leaf surfaces.'
    ],
    precautions: [
      'Never spray during peak afternoon heat; spray at dawn or dusk when stomata are open.'
    ]
  },
  {
    id: 'REC-13',
    name: 'Citrus Bio-Enzyme (Fruit Peel Eco-Enzyme / பழத்தோல் நொதி உரம்)',
    kannadaTamilName: 'Citrus Bio-Enzyme Foliar Polish',
    purpose: 'Kitchen-waste enzymatic bio-cleaner, soil microflora activator, and foliar wax-layer enhancer from leftover fruit peels.',
    category: 'Microbial Soil Inoculant',
    prepTimeDays: '90 Days Natural Fermentation (or 30 days with yeast)',
    shelfLife: 'Indefinite (Years)',
    applicationMethod: 'Foliar spray at 1ml - 2ml per Litre water or soil drenching at 5L/acre.',
    dilutionRatio: '1:500 to 1:1000 with water for foliar spraying.',
    estimatedCostPerBatch: '₹20 (only jaggery cost, fruit peels are free waste)',
    smallFarmBatchSize: '10L batch lasts a whole year for a small farm',
    ingredients: [
      { item: 'Fresh Citrus/Sweet Lime/Orange/Pineapple Peels', quantity: '3 kg (chopped)', role: 'Terpenes, bio-flavonoids & enzyme substrates' },
      { item: 'Organic Crushed Jaggery / Molasses', quantity: '1 kg', role: 'Carbohydrate fuel for fermentation' },
      { item: 'Clean Water', quantity: '10 Litres', role: '3:1:10 standard Golden Ratio medium' },
      { item: 'Airtight Plastic Container (15L size)', quantity: '1 unit', role: 'Fermentation vessel' }
    ],
    stepByStep: [
      'Follow the strict 1:3:10 Golden Ratio: 1 part Jaggery (1 kg), 3 parts Fruit Peels (3 kg), 10 parts Water (10 Litres).',
      'Mix jaggery in water inside the plastic container until fully dissolved.',
      'Add the chopped fruit peels, leaving 20% headspace at the top for gas expansion.',
      'Close lid airtight and place in a cool, dark cupboard.',
      'During the first 30 days, open the lid for 2 seconds daily to vent built-up carbon dioxide gas.',
      'After 90 days, the liquid turns transparent golden amber with a refreshing sweet-citrus vinegar aroma.',
      'Filter the enzyme liquid and bottle. The leftover pulp can be buried as super-compost around tree roots.'
    ],
    keyBenefits: [
      'Solubilizes locked micro-minerals in alkaline soils and breaks down hardpan soil crusts.',
      'Eliminates sooty mold on citrus, mango, and ornamental crops.',
      'Zero chemical residues; completely non-toxic for family vegetable gardens.'
    ],
    precautions: [
      'Never use glass jars as internal gas pressure can shatter glass during the first month; use plastic bottles only.'
    ]
  },
  {
    id: 'REC-14',
    name: 'Vermiwash (Liquid Earthworm Gold / மண்புழு வடிநீர் / ವರ್ಮಿವಾಶ್)',
    kannadaTamilName: 'Vermiwash Liquid Earthworm Gold',
    purpose: 'Liquid coelomic fluid and enzyme leachate drained from earthworm beds, loaded with plant growth hormones, vitamins, and zinc.',
    category: 'Growth Hormone Tonic',
    prepTimeDays: 'Continuous harvest from vermiwash unit',
    shelfLife: '60 Days in shaded container',
    applicationMethod: 'Foliar spray at 1:5 dilution or drip irrigation at 10L/acre.',
    dilutionRatio: '1 Litre Vermiwash in 5 Litres clean water (1:5 dilution).',
    estimatedCostPerBatch: '₹10 - ₹20 operational cost per batch',
    smallFarmBatchSize: '5L harvested every 3 days from a single drum unit',
    ingredients: [
      { item: 'Perforated 200L Plastic Drum with bottom drainage tap', quantity: '1 unit', role: 'Gravity leachate unit' },
      { item: 'Broken Bricks / Gravel (Bottom 15cm layer)', quantity: '20 kg', role: 'Filter drainage bed' },
      { item: 'Coarse River Sand (Second 15cm layer)', quantity: '15 kg', role: 'Fine sediment trap' },
      { item: 'Semi-decomposed Cow Dung & Dry Leaves', quantity: '30 kg', role: 'Earthworm food bed' },
      { item: 'Live Epigeic Earthworms (Eisenia foetida / Eudrilus eugeniae)', quantity: '1,000 to 2,000 worms', role: 'Biological bioreactors' },
      { item: 'Top Drip Water Pot (5L pot with bottom wick)', quantity: '1 unit', role: 'Gentle moisture dripper' }
    ],
    stepByStep: [
      'Set up the drum on raised cement blocks with a bottom drainage ball valve.',
      'Layer base with 15cm broken gravel, followed by 15cm coarse sand, then 30cm aged cow dung and shredded dry leaf mulch.',
      'Release 1,000 live earthworms and moisten the bed thoroughly for 10 days.',
      'Hang a 5-litre earthen pot with a tiny perforated wick hole over the drum, allowing water to slowly drip 1 drop per second.',
      'Water trickles through the worm burrows, washing mucus, excretions, and coelomic enzymes down into the bottom tap.',
      'Collect the clear golden-brown liquid every morning from the tap.',
      'Dilute 1:5 with clean water and spray on standing crops.'
    ],
    keyBenefits: [
      'Contains high levels of Auxins, Cytokinins, and humic acids for vigorous rooting.',
      'Boosts seedling resistance to viral attacks and fungal spot diseases.',
      'Contains live nitrogen-fixing Azotobacter and nitrifying bacteria.'
    ],
    precautions: [
      'Never allow the drum to dry out or get flooded with excess water; maintain 60% optimal bed moisture.'
    ]
  },
  {
    id: 'REC-15',
    name: 'Aerated Compost Tea (Living Biology Foliar Shield / காற்றோட்ட உர தேநீர்)',
    kannadaTamilName: 'Aerated Compost Tea Biological Brew',
    purpose: 'Brewing billions of living aerobic beneficial fungi, nematodes, and protozoa into a foliar spray that physically blankets leaves against fungal attack.',
    category: 'Bio-Fungicide & Disease Shield',
    prepTimeDays: '24 to 36 Hours (with aquarium bubbler)',
    shelfLife: 'Must be sprayed within 4 to 6 hours of brewing while microbes are alive',
    applicationMethod: 'Full canopy foliar wash or soil root drenching.',
    dilutionRatio: '1:1 with clean water or applied undiluted with coarse spray nozzle.',
    estimatedCostPerBatch: '₹30 - ₹50 per 20 Litre brew',
    smallFarmBatchSize: '20L brew coats 0.5 acre leaf surface',
    ingredients: [
      { item: 'Well-Finished Dark Earthy Thermal Compost / Vermicompost', quantity: '2 kg (tied in mesh brew bag)', role: 'Microbial bio-inoculum' },
      { item: 'Unsulfured Blackstrap Molasses / Jaggery', quantity: '100 grams', role: 'Bacterial food catalyst' },
      { item: 'Humic Acid / Liquid Kelp / Seaweed Extract (Optional)', quantity: '30 ml', role: 'Fungal mycelium food' },
      { item: 'Aquarium Air Pump with Air Stones (Bubbler)', quantity: '1 unit', role: 'Continuous dissolved oxygen aeration' },
      { item: 'Unchlorinated Water (Bubble for 1 hr before adding compost)', quantity: '20 Litres', role: 'Carrier' }
    ],
    stepByStep: [
      'Fill a 20L clean bucket with dechlorinated water and start the aquarium bubbler on full power.',
      'Dissolve 100g jaggery and 30ml humic acid in the bubbling water.',
      'Place 2 kg fresh living compost inside a 400-micron nylon mesh paint-strainer bag and suspend into the water.',
      'Maintain strong bubbling aeration continuously for 24 to 36 hours.',
      'A dense frothy yeast-like foam will rise to the top with a sweet forest floor aroma.',
      'Turn off bubbler, remove mesh bag, filter through fine screen, and immediately spray onto crop foliage within 4 hours.'
    ],
    keyBenefits: [
      'Occupies 100% of the vacant niche space on leaf stomata, leaving zero space for disease fungal spores to anchor.',
      'Digestive enzymes of beneficial bacteria consume spore coatings of blights and mildews.',
      'Significantly speeds up nutrient absorption during rapid growth phases.'
    ],
    precautions: [
      'Never allow the brew to go anaerobic (lack of oxygen). If it smells foul or sulfurous, discard on compost pile and do not spray on crops.'
    ]
  },
  {
    id: 'REC-16',
    name: 'Wood Ash & Bio-Silica Tonic (Saambal Kari / சாம்பல் சாறு / ಬೂದಿ ರಸ)',
    kannadaTamilName: 'Wood Ash Potassium & Silica Armor',
    purpose: 'Instant bio-potassium, calcium, and plant silica booster to thicken leaf epidermal cells and stop snails, slugs, and stem weakness.',
    category: 'Potassium & Calcium Booster',
    prepTimeDays: '24 Hours Leaching',
    shelfLife: '2 Months',
    applicationMethod: 'Foliar spray at 2% dilution or soil drenching during grain filling / fruit bulking.',
    dilutionRatio: '200ml ash extract in 10 Litres clean water (plus 10g soap nut as sticker).',
    estimatedCostPerBatch: '₹0 (Kitchen / wood fire waste)',
    smallFarmBatchSize: '5L concentrate covers 1 acre fruit sizing needs',
    ingredients: [
      { item: 'Clean Hardwood Ash (from neem, babool, tamarind, or coconut shells)', quantity: '2 kg (sieved)', role: 'Water-soluble potassium ($K_2O$), calcium, and silica ($SiO_2$)' },
      { item: 'Rainwater / Well Water', quantity: '10 Litres', role: 'Leaching solvent' },
      { item: 'Natural Soapnut / Shikakai Powder (Sticker)', quantity: '50 grams', role: 'Organic non-ionic spreader' }
    ],
    stepByStep: [
      'Sieve 2 kg of cold wood ash through fine wire mesh to remove unburned charcoal chunks.',
      'Mix the ash thoroughly into 10 litres of water in a plastic bucket.',
      'Stir vigorously for 5 minutes and allow to settle undisturbed for 24 hours.',
      'The clear alkaline liquid floating on top is rich in bio-potassium carbonate and bio-silica.',
      'Carefully siphon or decant the top clear liquid without disturbing the sludge at the bottom.',
      'Add dissolved soapnut liquid, dilute with water (200ml per 10L), and spray on crops during the fruit maturation stage.'
    ],
    keyBenefits: [
      'Deposits microscopic silica crystals in outer leaf cell walls, creating glass-like armor that breaks insect jaws.',
      'Boosts fruit weight, brix sweetness, and prevents grain lodging in paddy and wheat.',
      'Raises leaf surface pH, halting fungal spore germination.'
    ],
    precautions: [
      'Never use ash from treated plywood, painted wood, or plastic burning as it contains toxic heavy metals.'
    ]
  },
  {
    id: 'REC-17',
    name: 'Water-Soluble Calcium (WCA / Eggshell Vinegar Extract / முட்டை ஓட்டு வினிகர்)',
    kannadaTamilName: 'Water-Soluble Calcium WCA Tonic',
    purpose: 'Instant ionic bio-calcium to eliminate blossom-end rot, fruit cracking, tip burn in leafy vegetables, and hollow stem disorders.',
    category: 'Potassium & Calcium Booster',
    prepTimeDays: '7 to 10 Days',
    shelfLife: '1 Year in airtight bottles',
    applicationMethod: 'Foliar spray at 1ml - 2ml per Litre water (10ml - 20ml per 10L tank).',
    dilutionRatio: '1:500 to 1:1000 with clean unchlorinated water.',
    estimatedCostPerBatch: '₹30 - ₹50 per 1 Litre bottle',
    smallFarmBatchSize: '1L concentrate covers 5 spray tanks (2 acres)',
    ingredients: [
      { item: 'Crushed Clean Eggshells (or Sea Shells / Oyster Shells)', quantity: '200 grams', role: 'Calcium carbonate ($CaCO_3$)' },
      { item: 'Natural Brown Rice Vinegar / Apple Cider Vinegar / Coconut Vinegar', quantity: '2 Litres', role: 'Acetic acid extraction agent ($CH_3COOH$)' },
      { item: 'Glass Jar or Food Grade Plastic Bottle', quantity: '1 unit (3L size)', role: 'Vessel' }
    ],
    stepByStep: [
      'Gently roast cleaned, dried eggshells on a low flame pan for 5 minutes until light golden brown (this burns off inner egg membrane proteins and activates calcium).',
      'Crush roasted eggshells coarsely into pea-sized bits with a rolling pin.',
      'Place 200g roasted eggshell bits into the jar and pour 2 litres of vinegar (1:10 ratio).',
      'The mixture will immediately fizz violently, releasing carbon dioxide bubbles as calcium acetate forms.',
      'Cover top loosely with a piece of paper towel secured with a rubber band (do not seal tightly as gas needs to escape).',
      'When all bubbling ceases after 7 to 10 days, filter the clear calcium liquid and store in tightly capped bottles.'
    ],
    keyBenefits: [
      'Rapidly absorbed within 2 hours through leaf tissue, correcting calcium deficiency 10x faster than ground lime.',
      'Stops blossom-end rot in tomatoes, bell peppers, and watermelons immediately.',
      'Strengthens flower pedicels, reducing premature flower shedding by up to 50%.'
    ],
    precautions: [
      'Do not apply during the peak heat of the day; spray in early morning for maximum stomatal uptake.'
    ]
  },
  {
    id: 'REC-18',
    name: 'Banana Peel & Pseudostem Potash Elixir (வாழை திரவ உரம் / ಬಾಳೆ ಪೊಟ್ಯಾಷ್ ರಸ)',
    kannadaTamilName: 'Banana Potassium Fruit Sizing Elixir',
    purpose: 'Ultra-rich natural potassium, phosphorus, and humic tonic to boost fruit girth, sweetness, vibrant color, and storage shelf-life.',
    category: 'Potassium & Calcium Booster',
    prepTimeDays: '15 to 21 Days',
    shelfLife: '6 Months',
    applicationMethod: 'Foliar spray at 3% concentration or drip irrigation at 10L/acre during flowering & fruit bulking.',
    dilutionRatio: '300ml banana extract in 10 Litres clean water.',
    estimatedCostPerBatch: '₹30 - ₹50 per batch',
    smallFarmBatchSize: '10L concentrate covers 1 acre during fruit development',
    ingredients: [
      { item: 'Overripe Banana Peels & Fruit Scraps (or chopped banana pseudostem pith)', quantity: '5 kg (finely chopped)', role: 'Concentrated organic potassium & magnesium' },
      { item: 'Organic Country Jaggery (Crushed)', quantity: '2 kg', role: 'Osmotic fermenter' },
      { item: 'Clean Water', quantity: '10 Litres', role: 'Medium' }
    ],
    stepByStep: [
      'Chop 5 kg banana peels and discarded overripe fruits into 1-inch small bits.',
      'In a plastic bucket, dissolve 2 kg jaggery in 10 litres of clean water.',
      'Add the chopped banana peels and stir with a wooden stick.',
      'Cover with cloth and let ferment in shade for 15 to 21 days, stirring once every 2 days.',
      'The brew will ferment into a sweet, fruity potassium wine.',
      'Filter through mesh screen and store in bottles for foliar and drip application.'
    ],
    keyBenefits: [
      'Dramatically enhances grain weight, fruit size, sweetness (Brix score), and natural aroma.',
      'Regulates plant water balance during sudden summer dry spells.',
      'Prevents premature yellowing and edge scorching of older leaves.'
    ],
    precautions: [
      'Filter thoroughly before adding to drip systems to avoid micro-emitter clogging.'
    ]
  },
  {
    id: 'REC-19',
    name: '3G Extract (Ginger-Garlic-Green Chilli Concoction / 3G கஷாயம் / 3G కషాయం)',
    kannadaTamilName: '3G Pungent Contact Pest Paralyzer',
    purpose: 'Fierce organic contact spray that paralyzes thrips, mites, whiteflies, aphids, and chewing caterpillars instantly upon contact.',
    category: 'Organic Pest Repellent',
    prepTimeDays: '24 Hours',
    shelfLife: '15 Days in a dark bottle',
    applicationMethod: 'Foliar spray at 200ml - 300ml per 10 Litres water.',
    dilutionRatio: '25ml 3G extract in 1 Litre of clean water (plus 5ml soapnut solution as sticker).',
    estimatedCostPerBatch: '₹50 - ₹70 per batch',
    smallFarmBatchSize: '2L concentrate makes 8 knapsack tanks (covers 1 acre)',
    ingredients: [
      { item: 'Fresh Country Ginger (Inji / Adrak)', quantity: '500 grams (crushed into fine paste)', role: 'Gingerols & volatile essential oils' },
      { item: 'Fresh Country Garlic (Poondu / Lahsun)', quantity: '500 grams (crushed into fine paste)', role: 'Allicin systemic repelling compound' },
      { item: 'Spicy Green Chillies (Pachai Milagai / Mirchi)', quantity: '500 grams (crushed into fine paste)', role: 'Capsaicin contact irritant' },
      { item: 'Clean Water', quantity: '5 Litres', role: 'Extraction medium' }
    ],
    stepByStep: [
      'Grind 500g ginger, 500g garlic, and 500g spicy green chillies separately into smooth pastes.',
      'Combine all three pastes together in a plastic bucket with 5 litres of clean water.',
      'Stir vigorously for 5 minutes and let the spicy mixture steep overnight (12 to 24 hours) in shade.',
      'Filter the intensely pungent liquid twice through fine muslin cloth.',
      'Mix 250ml of 3G liquid into 10 litres of water in your spray tank, add a few drops of soapnut liquid, and spray on both upper and lower leaf surfaces.'
    ],
    keyBenefits: [
      'Breaks the waxy protective coating on soft-bodied sucking pests, causing rapid desiccation within hours.',
      'Repels monkeys, peacocks, wild rabbits, and grazing cattle from boundary crops due to its pungent aroma.',
      'Leaves zero synthetic chemical residues on fresh harvest vegetables.'
    ],
    precautions: [
      'Wear eye glasses and face mask when preparing and spraying to protect eyes from spicy capsaicin spray drift.'
    ]
  },
  {
    id: 'REC-20',
    name: 'Trichoderma & Pseudomonas Bio-Enriched FYM (ட்ரைக்கோடெர்மா உயிரி உரம்)',
    kannadaTamilName: 'Trichoderma Bio-Fungicide Living Blanket',
    purpose: 'Multiplication of beneficial biocontrol fungi and bacteria on farmyard manure to permanently eradicate soil-borne Fusarium wilt, root rot, and damping off.',
    category: 'Bio-Fungicide & Disease Shield',
    prepTimeDays: '7 to 10 Days Multiplication',
    shelfLife: 'Apply to soil within 15 days of peak fungal sporulation',
    applicationMethod: 'Broadcast and lightly plough into soil during basal land prep or incorporate into planting basins.',
    dilutionRatio: '100 kg to 200 kg bio-enriched manure per Acre.',
    estimatedCostPerBatch: '₹100 (Culture powder) + ₹0 (Farm manure) = ₹100 for 1 acre protection',
    smallFarmBatchSize: '50 kg for 0.5 acre / 100 kg for 1 acre',
    ingredients: [
      { item: 'Well-Rotted Farmyard Manure (FYM) or Vermicompost', quantity: '100 kg', role: 'Organic nutrition and moisture substrate' },
      { item: 'Trichoderma viride / harzianum Powder (Commercial bio-fungicide)', quantity: '1 kg', role: 'Living fungal biocontrol spores' },
      { item: 'Pseudomonas fluorescens Powder', quantity: '1 kg', role: 'Bacterial siderophore & systemic resistance inducer' },
      { item: 'Jaggery Water Solution (500g jaggery in 5L water)', quantity: '5 Litres', role: 'Initial spore germination kickstarter' }
    ],
    stepByStep: [
      'Spread 100 kg of moist, well-decomposed farmyard manure on a clean concrete floor or tarp in deep tree shade.',
      'Sprinkle 1 kg Trichoderma and 1 kg Pseudomonas powders evenly across the manure heap.',
      'Sprinkle the dissolved jaggery water over the heap until moisture reaches 50% (moist like a squeezed sponge).',
      'Mix thoroughly with a shovel and shape into a 2-foot high flat-topped mound.',
      'Cover the mound with damp gunny jute bags to maintain humidity and shade.',
      'Within 5 to 7 days, a dense greenish-white fungal mycelial web will cover the entire manure heap.',
      'Broadcast this living bio-fungicide shield across your field before sowing or transplanting.'
    ],
    keyBenefits: [
      'Fungal hyphae actively parasitize, coil around, and consume pathogenic root rot fungi in the soil.',
      'Produces natural plant growth-promoting hormones (IAA) that stimulate lateral root branching by 45%.',
      'Permanently reclaims sick, pesticide-damaged fields back to living soil health.'
    ],
    precautions: [
      'Never apply chemical copper or sulfur fungicides to the soil within 15 days of applying Trichoderma, as chemicals will kill the beneficial fungi.'
    ]
  }
];

export const MYTHS_VS_SCIENCE: MythVsScience[] = [
  {
    id: 'MYTH-01',
    myth: 'Burning crop stubble and paddy straw cleans the field and adds mineral ash fertilizer.',
    scienceTruth: 'Stubble burning destroys 99% of topsoil microbial life, releases toxic particulate smog, and vaporizes 100% of organic nitrogen and carbon.',
    category: 'Soil Health',
    explanation: 'A single field burn heats the top 3 inches of soil to over 60°C, incinerating earthworm cocoons, beneficial Trichoderma fungi, and mycorrhizae. For every tonne of straw burned, 5.5 kg nitrogen, 2.3 kg phosphorus, and 25 kg potassium are permanently lost to the atmosphere.',
    actionableAlternative: 'Incorporate stubble with a super-seeder or rotavator along with 10L/acre Waste Decomposer / Jeevamrutha to transform residue into ₹4,000 worth of free organic compost in 21 days.'
  },
  {
    id: 'MYTH-02',
    myth: 'Higher doses of chemical urea (NPK) will always result in proportionally higher grain yields.',
    scienceTruth: 'Excess synthetic nitrogen locks out micronutrients, causes soil acidification, and renders plants highly vulnerable to fungal blight.',
    category: 'Soil Health',
    explanation: 'Plants can only absorb nitrogen up to their genetic transpiration capacity (typically 30-40% of applied urea). The unused synthetic salts accumulate as nitrate leachate in groundwater and acidify the rhizosphere, forcing beneficial microbes into dormancy.',
    actionableAlternative: 'Adopt split-dose bio-fertilizers (Azotobacter, PSB) combined with green manure to unlock soil-bound legacy phosphorus without synthetic burnout.'
  },
  {
    id: 'MYTH-03',
    myth: 'Deep borewells (600+ ft) are completely insulated from surface chemical dumping and pollution.',
    scienceTruth: 'Fractured bedrock aquifers draw contaminated surface water rapidly through vertical fault lines and unsealed casing fissures.',
    category: 'Water & Irrigation',
    explanation: 'Subterranean geological basalt and granite strata are heavily fractured. Industrial effluents or chemical pesticides dumped in drainage canals percolate directly down fault lines, contaminating regional deep water tables with heavy metals, fluorides, and nitrates.',
    actionableAlternative: 'Implement multi-stage gravel-charcoal recharge pits around borewells and establish 50-meter pesticide-free buffer zones around all wellheads.'
  },
  {
    id: 'MYTH-04',
    myth: 'Planting trees and live hedges along field borders robs crops of sunlight and soil moisture.',
    scienceTruth: 'Deep-rooted agroforestry boundary trees act as windbreaks, increasing localized air humidity by 15% and conserving more water than they consume.',
    category: 'Biodiversity',
    explanation: 'High dry winds increase crop evapotranspiration by up to 50%. A living shelterbelt of native species slows desiccating winds, lowers ambient ground temperature, and draws minerals from 15ft depths, depositing them on the surface as fallen leaf mulch.',
    actionableAlternative: 'Plant tap-root native species (Neem, Tamarind, Subabul) pruned vertically to maintain high canopy heights while preserving side sunlight for crops.'
  },
  {
    id: 'MYTH-05',
    myth: 'Saline and white-crusted soils are permanently barren and cannot be farmed again.',
    scienceTruth: 'Saline and sodic soils can be restored within 1 to 2 seasons using agricultural gypsum, sub-surface drainage, and halophytic green manuring.',
    category: 'Soil Health',
    explanation: 'Soil salinity is a physical-chemical ion imbalance where sodium ions displace calcium and collapse soil structure. Applying Calcium Sulfate (Gypsum) displaces sodium into soluble sulfate forms that wash away with drainage water.',
    actionableAlternative: 'Apply 2.5 tonnes/acre gypsum, flood with clean water, install 3-ft drainage furrows, and sow salt-tolerant Sesbania (Daincha).'
  }
];

export const BIO_FENCE_PLANS: BioFenceSpeciesPlan[] = [
  {
    zone: 'Arid & Semi-Arid Plains (Rajasthan, Gujarat, Deccan)',
    purpose: 'Livestock Defense & Wind Erosion Prevention',
    growthSpeed: '12 - 18 Months to full density',
    maintenanceNeeds: 'Minimal watering after first monsoon; annual pruning',
    estimatedCostPer100m: '₹2,500 - ₹3,800 (versus ₹28,000 for barbed wire)',
    recommendedCombination: [
      {
        layer: 'Outer Barrier (Thorny/Dense)',
        species: 'Agave americana & Euphorbia tirucalli (Pencil Cactus)',
        botanicalName: 'Agave americana / Euphorbia',
        spacing: '1.5 ft zig-zag pattern',
        keyTrait: 'Zero maintenance, drought-proof, impenetrable sharp thorns repelling wild boars and goats.'
      },
      {
        layer: 'Middle Layer (Nitrogen Fixing/Fodder)',
        species: 'Karonda (Carissa carandas) & Khejri (Prosopis cineraria)',
        botanicalName: 'Carissa carandas',
        spacing: '3.0 ft interval',
        keyTrait: 'Produces edible vitamin-C rich berries and nitrogen-rich soil leaf drop.'
      },
      {
        layer: 'Inner Border (Medicinal/Pollinator)',
        species: 'Adhatoda vasica (Adusa) & Vetiver Grass',
        botanicalName: 'Justicia adhatoda',
        spacing: '2.0 ft interval',
        keyTrait: 'Medicinal foliage that livestock will not graze; roots stabilize border soil bunds.'
      }
    ]
  },
  {
    zone: 'Tropical Coastal & High Rainfall (Tamil Nadu, Kerala, Karnataka, Andhra)',
    purpose: 'Boundary Security, Green Manure & Pest Repellent',
    growthSpeed: '8 - 12 Months',
    maintenanceNeeds: 'Prune 3 times annually for 8-10 tons green manure per km',
    estimatedCostPer100m: '₹1,800 - ₹2,900',
    recommendedCombination: [
      {
        layer: 'Outer Barrier (Thorny/Dense)',
        species: 'Bougainvillea spectabilis & Cactus Opuntia',
        botanicalName: 'Bougainvillea / Opuntia',
        spacing: '2.0 ft interval',
        keyTrait: 'Dense woody thorny network with year-round vibrant flowering attracting honeybees.'
      },
      {
        layer: 'Middle Layer (Nitrogen Fixing/Fodder)',
        species: 'Gliricidia sepium (Quick Stick / Seemai Agathi)',
        botanicalName: 'Gliricidia sepium',
        spacing: '1.0 ft close hedge spacing',
        keyTrait: 'Produces 10 tonnes/km of high-nitrogen foliage; roots fix 150 kg atmospheric N/acre.'
      },
      {
        layer: 'Inner Border (Medicinal/Pollinator)',
        species: 'Lemongrass & African Marigold',
        botanicalName: 'Cymbopogon citratus',
        spacing: '1.0 ft continuous border',
        keyTrait: 'Emits citronella scent that repels crop insects and suppresses root nematodes.'
      }
    ]
  },
  {
    zone: 'Clayey Black Soil & Sub-Humid Plains (Maharashtra, MP, Telangana)',
    purpose: 'Waterlogging Prevention & Wild Boar Defense',
    growthSpeed: '10 - 14 Months',
    maintenanceNeeds: 'Bi-annual trimming after winter harvest',
    estimatedCostPer100m: '₹2,200 - ₹3,400',
    recommendedCombination: [
      {
        layer: 'Outer Barrier (Thorny/Dense)',
        species: 'Caesalpinia decapetala (Mauritius Thorn / Chilkar)',
        botanicalName: 'Caesalpinia decapetala',
        spacing: '1.5 ft interval',
        keyTrait: 'Hooked backward thorns that create a 100% impenetrable barrier even for wild boars.'
      },
      {
        layer: 'Middle Layer (Nitrogen Fixing/Fodder)',
        species: 'Sesbania grandiflora (Agathi) & Subabul',
        botanicalName: 'Sesbania grandiflora',
        spacing: '2.5 ft interval',
        keyTrait: 'Deep taproot that breaks heavy black clay hardpans and yields protein-rich cattle forage.'
      },
      {
        layer: 'Inner Border (Medicinal/Pollinator)',
        species: 'Neem & Drumstick (Moringa oleifera)',
        botanicalName: 'Azadirachta indica',
        spacing: '6.0 ft interval',
        keyTrait: 'Natural pest repellent zone, high-value moringa pods, and summer shade.'
      }
    ]
  }
];
