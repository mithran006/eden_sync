import { FarmerIdea } from '../types';
import { INDIAN_FARMER_TIPS } from './farmerTipsIndian';
import { GLOBAL_FARMER_TIPS } from './farmerTipsGlobal';
import { CLIMATE_FARMER_TIPS } from './farmerTipsClimate';

const CORE_FARMER_IDEAS: FarmerIdea[] = [
  {
    id: 'TIP-2026-001',
    title: 'Sour Buttermilk (Chhach) & Asafoetida (Hing) Spray for Powdery Mildew & Aphids',
    category: 'Organic Pest & Disease Control',
    summary: 'A time-tested zero-cost fermented buttermilk spray containing natural lactic acid bacteria that cures white powdery mildew, fungal spots, and repels sucking pests like aphids and thrips on vegetables and cotton.',
    farmerName: 'Balwinder Singh',
    village: 'Kotkapura',
    district: 'Faridkot',
    state: 'Punjab',
    phone: '+91 98142 55670',
    isVerifiedFarmer: true,
    experienceYears: 22,
    costToImplement: 'Zero Cost (Farm Waste)',
    estimatedSavings: 'Saves ₹2,500 to ₹3,800/acre per season in synthetic fungicides',
    timeToSeeResults: '48 to 72 Hours',
    difficulty: 'Easy (Any Farmer)',
    suitableCrops: ['Tomatoes', 'Chilli', 'Cotton', 'Cucurbits', 'Mustard', 'Grapes', 'Paddy'],
    materialsNeeded: [
      '5 Liters of Sour Buttermilk (Fermented for 5 to 7 days in shade)',
      '50 grams pure Asafoetida (Hing) powder or dissolved crystals',
      '1 piece of rusted copper wire or copper plate (optional for extra copper fungicide effect)',
      '100 Liters clean water for knapsack dilution'
    ],
    stepByStepGuide: [
      'Take 5 Liters of fresh raw cow or buffalo buttermilk and store it in an earthen clay pot in shade for 5-7 days until it develops a pungent sour odor and greenish tint.',
      'Place a piece of clean copper wire inside the buttermilk for 48 hours to release micro-copper ions (acts like organic Bordeaux mixture).',
      'Dissolve 50g of Hing (Asafoetida) in 1 liter warm water and mix vigorously into the sour buttermilk.',
      'Filter thoroughly through a cotton muslin cloth to prevent nozzle clogging in spray pumps.',
      'Dilute 500 ml of this concentrated mixture into 15 Liters of water (1 knapsack pump) and spray during morning or late afternoon hours over both top and underside of leaves.'
    ],
    scientificReason: 'Lactic acid (Lactobacillus) produces bactericidal and antifungal metabolites (bacteriocins) that suppress powdery mildew spore germination, while the volatile sulphur compounds in Hing disrupt the respiratory sensors of sucking pests.',
    cautionsOrDoNotDo: [
      'Do not spray during peak midday direct sunlight (>35°C) to avoid leaf scorch.',
      'Always filter well through fine cloth to prevent pump nozzle jamming.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb228cc?auto=format&fit=crop&w=800&q=80',
    likesCount: 142,
    triedCount: 89,
    successRatePercentage: 96,
    createdAt: '2026-08-10',
    comments: [
      {
        id: 'FB-01',
        farmerName: 'Karthik Raja',
        farmerLocation: 'Coimbatore, Tamil Nadu',
        comment: 'Used this on my chilli crop when leaf curl and powdery mildew started. Within 3 days the fungus dried up and new fresh green leaves emerged. Complete zero cost!',
        rating: 5,
        triedOnFarm: true,
        date: '2026-08-14'
      },
      {
        id: 'FB-02',
        farmerName: 'Dhananjay Patil',
        farmerLocation: 'Kolhapur, Maharashtra',
        comment: 'Adding the copper wire makes a massive difference. Excellent alternative to chemical mancozeb.',
        rating: 5,
        triedOnFarm: true,
        date: '2026-08-18'
      }
    ]
  },
  {
    id: 'TIP-2026-002',
    title: 'Sub-Surface Clay Pot (Olla) Irrigation for 70% Water Savings in Dry Spells',
    category: 'Water Conservation & Low-Cost Drip',
    summary: 'Bury unglazed porous clay pots between crop rows or near fruit trees and fill them with water. Soil moisture tension pulls water outward directly to root zones with zero surface evaporation.',
    farmerName: 'Suresh Chandra Sharma',
    village: 'Neemrana',
    district: 'Alwar',
    state: 'Rajasthan',
    phone: '+91 94140 88219',
    isVerifiedFarmer: true,
    experienceYears: 18,
    costToImplement: 'Low Cost (< ₹500)',
    estimatedSavings: 'Reduces water consumption by 65-75% and saves pumping electricity',
    timeToSeeResults: 'Instant water conservation & continuous root hydration',
    difficulty: 'Easy (Any Farmer)',
    suitableCrops: ['Fruit Orchards (Pomegranate, Guava, Lemon)', 'Vegetable Beds (Brinjal, Gourds)', 'Kitchen Gardens'],
    materialsNeeded: [
      'Unglazed porous earthenware clay pots (Matka / Olla) of 5 to 10 Liters capacity',
      'Clay lids or inverted terracotta saucers to cover pot tops',
      'Coarse gravel or coconut coir mulch for pot base',
      'Small spade or post-hole auger'
    ],
    stepByStepGuide: [
      'Dig a hole in the ground between 4 crop plants or 1.5 feet away from fruit tree drip-lines, deep enough so only the pot neck sits 2 inches above ground level.',
      'Place a 1-inch layer of coarse sand at the bottom of the hole for stability.',
      'Place the unglazed terracotta clay pot inside and backfill with soil, packing gently around the pot walls.',
      'Fill the pot completely with clean water and cover the mouth securely with the terracotta lid to prevent mosquito breeding and evaporation.',
      'Refill the pot only once every 5 to 8 days. Water seeps out through the porous clay matrix purely driven by soil suction as roots absorb moisture.'
    ],
    scientificReason: 'Soil moisture tension gradient regulates water flow through porous earthenware. When soil is dry, capillary suction pulls moisture through the porous clay walls; when soil is saturated, seepage halts automatically, preventing water wastage and root rot.',
    cautionsOrDoNotDo: [
      'Do not use glazed, painted, or cement-coated pots because they will block porous micropores.',
      'Always keep the lid covered to prevent dirt and mosquito larvae from infesting the water.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80',
    likesCount: 198,
    triedCount: 114,
    successRatePercentage: 98,
    createdAt: '2026-08-04',
    comments: [
      {
        id: 'FB-03',
        farmerName: 'Muruganandham S.',
        farmerLocation: 'Erode, Tamil Nadu',
        comment: 'During peak May heatwave with borewell running dry, this saved all 60 of my young guava saplings. I only refill the matkas once a week!',
        rating: 5,
        triedOnFarm: true,
        date: '2026-08-11'
      }
    ]
  },
  {
    id: 'TIP-2026-003',
    title: 'Castor Cake & Neem Oil Barrier Ring to Repel Wild Boar & Termites',
    category: 'Organic Pest & Disease Control',
    summary: 'A perimeter boundary repellent made of fermented castor cake (Arandi Khali), raw cow urine, and pungent neem oil that creates an olfactory barrier keeping wild boars, blue bulls (Nilgai), and termites away from field borders.',
    farmerName: 'Venkat Reddy',
    village: 'Narsapur',
    district: 'Medak',
    state: 'Telangana',
    phone: '+91 98480 33120',
    isVerifiedFarmer: true,
    experienceYears: 26,
    costToImplement: 'Low Cost (< ₹500)',
    estimatedSavings: 'Prevents 20-30% boundary crop destruction by wild animals and termites',
    timeToSeeResults: '24 Hours after perimeter application',
    difficulty: 'Moderate',
    suitableCrops: ['Groundnut', 'Maize', 'Sugarcane', 'Tuber crops (Potato, Yam)', 'Pulses'],
    materialsNeeded: [
      '10 kg Castor Oil Cake (Arandi / Aamudamu Khali)',
      '15 Liters fresh Desi Cow Urine (Gomutra)',
      '500 ml cold-pressed Neem Oil with 50g washing soap as emulsifier',
      'Jute rope / coir ropes (for boundary line soaking)'
    ],
    stepByStepGuide: [
      'In a plastic drum, mix 10 kg of Castor cake with 15 Liters of cow urine and 10 Liters water. Let it ferment in sun for 4 days until it releases a strong distinctive pungent aroma.',
      'Dip thick coir or jute rope in this slurry and string it along the outer perimeter posts at 1.5 feet and 3 feet height.',
      'Alternatively, broadcast the fermented castor cake paste along a 1-meter wide trench around the entire field boundary.',
      'Spray the neem oil emulsion over the boundary vegetation once every 12 to 15 days, especially around new moon and full moon nights when wild boar movements peak.'
    ],
    scientificReason: 'Castor cake contains ricin and volatile secondary sulfur compounds that wild herbivores and omnivores inherently associate with toxicity and danger. The pungent ammonia odor of fermented cow urine triggers natural avoidance behavior.',
    cautionsOrDoNotDo: [
      'Do not feed castor cake to cattle or sheep as it contains toxic ricin proteins.',
      'Wear gloves while mixing the fermented slurry to avoid skin irritation.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    likesCount: 165,
    triedCount: 76,
    successRatePercentage: 94,
    createdAt: '2026-08-08',
    comments: [
      {
        id: 'FB-04',
        farmerName: 'Kailash Meena',
        farmerLocation: 'Sawai Madhopur, Rajasthan',
        comment: 'Wild boars were destroying our groundnut field every single night. Since we put this castor rope boundary, they have not stepped foot inside for 3 weeks.',
        rating: 5,
        triedOnFarm: true,
        date: '2026-08-16'
      }
    ]
  },
  {
    id: 'TIP-2026-004',
    title: 'Recycled Plastic Bottle Yellow & Blue Sticky Traps for Whiteflies & Thrips',
    category: 'Farm Tools & DIY Jugaad',
    summary: 'Convert discarded yellow mustard oil containers and blue water bottles into reusable sticky insect traps using castor oil or grease for zero-chemical pest control.',
    farmerName: 'Anil Kumar Deshmukh',
    village: 'Warud',
    district: 'Amravati',
    state: 'Maharashtra',
    phone: '+91 97654 22091',
    isVerifiedFarmer: true,
    experienceYears: 15,
    costToImplement: 'Zero Cost (Farm Waste)',
    estimatedSavings: 'Saves ₹1,800/acre in pesticide sprays; cuts pest population by 60%',
    timeToSeeResults: 'Pests start sticking within 2 hours',
    difficulty: 'Easy (Any Farmer)',
    suitableCrops: ['Cotton', 'Chilli', 'Tomato', 'Okra (Bhindi)', 'Capsicum', 'Brinjal'],
    materialsNeeded: [
      'Used yellow plastic oil containers (5L) or yellow plastic sheets',
      'Used blue plastic bottles (for Thrips attraction)',
      '100 ml Castor Oil or transparent automobile grease',
      'Bamboo sticks (4 feet height) and tying wire/twine'
    ],
    stepByStepGuide: [
      'Clean discarded bright yellow and blue plastic containers with water and let them dry.',
      'Punch 2 small holes at the top neck of each container and thread tying wire through them.',
      'Mount the containers onto bamboo stakes so the trap sits roughly 6 to 12 inches above the top canopy level of the crop.',
      'Using a paintbrush or cloth, apply a thin, even coat of castor oil or transparent sticky grease over the entire outer surface.',
      'Install 15-20 traps per acre (12 Yellow for Whitefly/Aphids/Leafminers + 6 Blue for Thrips).',
      'Every 10 to 14 days, scrape off trapped dead insects with a plastic card, wash with warm water, and re-apply a fresh layer of castor oil.'
    ],
    scientificReason: 'Sucking insect pests exhibit phototactic attraction to specific visual wavelengths (yellow ~580nm triggers feeding attraction in whiteflies & aphids; blue ~470nm triggers flight attraction in thrips). Sticky viscous castor oil traps them irreversibly upon landing.',
    cautionsOrDoNotDo: [
      'Do not place traps too low beneath crop canopy where leaves touch the sticky surface.',
      'Avoid dark black or engine burnt oil as the dark color deters the pests.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80',
    likesCount: 230,
    triedCount: 156,
    successRatePercentage: 99,
    createdAt: '2026-08-01',
    comments: [
      {
        id: 'FB-05',
        farmerName: 'Gurpreet Singh',
        farmerLocation: 'Moga, Punjab',
        comment: 'Market sticky traps cost ₹40 each. I made 30 traps from discarded mustard oil cans for zero rupees. Cleaned out the whitefly attack on my cotton completely!',
        rating: 5,
        triedOnFarm: true,
        date: '2026-08-05'
      }
    ]
  },
  {
    id: 'TIP-2026-005',
    title: '72-Hour Rapid Compost Bio-Starter using Jaggery, Gram Flour & Forest Soil',
    category: 'Soil Health & Bio-Fertilizers',
    summary: 'A hyper-concentrated microbial inoculant (Jeevamrut booster) that accelerates raw agricultural residue decomposition from 90 days down to 25-30 days without offensive odor.',
    farmerName: 'Subbanna Hegde',
    village: 'Sirsi',
    district: 'Uttara Kannada',
    state: 'Karnataka',
    phone: '+91 94801 77652',
    isVerifiedFarmer: true,
    experienceYears: 30,
    costToImplement: 'Low Cost (< ₹500)',
    estimatedSavings: 'Produces 3 tons of rich organic humus fertilizer worth ₹12,000',
    timeToSeeResults: 'Heap heats up to 55°C within 72 hours; compost ready in 3 weeks',
    difficulty: 'Easy (Any Farmer)',
    suitableCrops: ['All Agricultural & Horticultural crops', 'Paddy straw decomposition', 'Sugarcane trash'],
    materialsNeeded: [
      '10 kg Fresh Cow Dung + 5 Liters Cow Urine',
      '1 kg Black Jaggery (Gur) - unrefined',
      '1 kg Gram Flour (Besan) or pulse flour',
      'Handful of undisturbed virgin soil from beneath a Banyan or Peepal tree',
      '200 Liters water in a plastic drum'
    ],
    stepByStepGuide: [
      'In a 200L plastic drum, add 10 kg cow dung and 5 Liters cow urine, and mix thoroughly with a wooden pole in clockwise direction.',
      'Dissolve 1 kg jaggery and 1 kg besan in 5 Liters warm water and add to the drum.',
      'Add a handful (approx. 200g) of rich topsoil collected from under an old banyan/neem tree to introduce native mycorrhizae and beneficial actinomycetes.',
      'Fill the drum with clean water, stir well clockwise for 5 minutes, cover with a damp gunny bag, and keep in shade for 72 hours. Stir twice daily (morning & evening).',
      'Sprinkle this fermented microbial culture liberally over dry crop residue (paddy straw, maize stalks) layer by layer while building compost heaps or spray directly on post-harvest stubble before light discing.'
    ],
    scientificReason: 'Virgin banyan root soil provides a diverse consortium of cellulolytic, lignolytic fungi and nitrogen-fixing bacteria. Jaggery acts as a quick-release carbohydrate fuel while besan supplies amino acids, multiplying colony-forming units (CFUs) to over 10^9 per ml.',
    cautionsOrDoNotDo: [
      'Never use chlorinated tap water as chlorine kills the living microbes. Use well or rainwater.',
      'Do not keep drum in direct sunlight; keep strictly under tree or roof shade.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
    likesCount: 285,
    triedCount: 180,
    successRatePercentage: 97,
    createdAt: '2026-07-28',
    comments: [
      {
        id: 'FB-06',
        farmerName: 'Chhaganlal Meena',
        farmerLocation: 'Kota, Rajasthan',
        comment: 'Sprayed this on my leftover mustard stalks and ploughed them in. Within 22 days all residue converted into black soft crumbly soil. Best soil builder!',
        rating: 5,
        triedOnFarm: true,
        date: '2026-08-02'
      }
    ]
  },
  {
    id: 'TIP-2026-006',
    title: 'Banana Pseudostem Sap as a 100% Organic Seed Germination & Rooting Hormone',
    category: 'Seed Treatment & Storage',
    summary: 'Extract nutrient-rich liquid sap from harvested banana tree trunks to soak seeds before sowing. High potassium, gibberellins, and cytokinin content increases germination speed by 40% and builds early vigor.',
    farmerName: 'Prabhu Shankar',
    village: 'Pollachi',
    district: 'Coimbatore',
    state: 'Tamil Nadu',
    phone: '+91 98940 12388',
    isVerifiedFarmer: true,
    experienceYears: 19,
    costToImplement: 'Zero Cost (Farm Waste)',
    estimatedSavings: 'Saves ₹800/acre in seed treatment chemicals & prevents seedling mortality',
    timeToSeeResults: 'Germinates 2-3 days faster with thick white feeder roots',
    difficulty: 'Easy (Any Farmer)',
    suitableCrops: ['Paddy (Rice)', 'Maize', 'Vegetable Seeds', 'Cotton', 'Sugarcane setts', 'Fruit cuttings'],
    materialsNeeded: [
      'Freshly harvested banana pseudostem (stem/trunk) cut into 1-foot pieces',
      'Manual press or clean heavy wooden pestle to crush stem rings',
      'Muslin cloth to filter the clear sap',
      'Seed lot intended for planting'
    ],
    stepByStepGuide: [
      'Cut 2 to 3 feet of a fresh banana stem that remains after harvesting the fruit bunch.',
      'Peel outer fibrous sheaths and crush the inner moist white spongy layers in a tub or press using a clean wooden stamper.',
      'Squeeze out the clear watery sap through a muslin cloth into a clean container (one stem yields 4-8 Liters of sap).',
      'Immerse your seeds (paddy, maize, pulses) directly in the undiluted banana sap for 30 minutes (or 2 hours for thick-coated seeds).',
      'Drain seeds on a clean cotton mat in shade for 15 minutes, then sow immediately into moist nursery beds or field lines.'
    ],
    scientificReason: 'Banana pseudostem sap is rich in natural auxins, cytokinins, and bio-available potassium (K2O), which trigger rapid starch-to-sugar conversion in seed endosperms, promoting uniform radicle emergence and protecting against soil-borne damping-off fungi.',
    cautionsOrDoNotDo: [
      'Use freshly extracted sap within 24 hours as natural fermentation begins thereafter.',
      'Do not dry treated seeds in harsh direct sunlight.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=800&q=80',
    likesCount: 174,
    triedCount: 92,
    successRatePercentage: 95,
    createdAt: '2026-08-12',
    comments: [
      {
        id: 'FB-07',
        farmerName: 'Sunil Biswas',
        farmerLocation: 'Nadia, West Bengal',
        comment: 'Treated our Aman paddy seeds with banana sap. 98% germination achieved without a single case of seedling rot. Truly remarkable indigenous method!',
        rating: 5,
        triedOnFarm: true,
        date: '2026-08-20'
      }
    ]
  },
  {
    id: 'TIP-2026-007',
    title: 'Living Bio-Mulch of Sunn Hemp & Cowpea for 100% Weed Suppression & Free Nitrogen',
    category: 'Weed & Mulching Techniques',
    summary: 'Broadcast fast-growing Sunnhemp (Sanai) or Cowpea between main crop rows. At 40 days (flowering stage), flatten them with a wooden roller to form a 4-inch weed-choking living mulch blanket that fixes 40kg nitrogen/acre.',
    farmerName: 'Harish Chandra Verma',
    village: 'Bilaspur',
    district: 'Rampur',
    state: 'Uttar Pradesh',
    phone: '+91 94120 66341',
    isVerifiedFarmer: true,
    experienceYears: 24,
    costToImplement: 'Low Cost (< ₹500)',
    estimatedSavings: 'Saves ₹4,000/acre on manual weeding + ₹1,500 on urea fertilizer',
    timeToSeeResults: 'Complete weed suppression within 15 days; soil retains moisture for 3 weeks',
    difficulty: 'Moderate',
    suitableCrops: ['Sugarcane', 'Banana', 'Cotton', 'Maize', 'Fruit Orchards'],
    materialsNeeded: [
      '8 kg Sunn Hemp (Crotalaria juncea) or Cowpea seeds per acre',
      'Simple wooden log or empty oil barrel pulled by rope or small tractor (Crimper roller)',
      'Clean water for one light irrigation after seed broadcast'
    ],
    stepByStepGuide: [
      'After sowing your main crop (e.g. Sugarcane or Banana), broadcast 8 kg of Sunnhemp or Cowpea seeds in the wide inter-row spaces.',
      'Provide one light irrigation. Within 5 days, the cover crop sprouts rapidly, out-competing all invasive grasses and broadleaf weeds.',
      'Allow it to grow for 40 to 45 days until early flowering (peak nitrogen nodulation stage).',
      'Roll a heavy wooden log or crimper-roller down the inter-rows to bend and crimp the green stems flat on the ground.',
      'The flattened biomass forms a thick 3-inch living mulch carpet that blocks sunlight to weeds, cools soil temperature by 4-6°C, and slowly decomposes into rich organic matter.'
    ],
    scientificReason: 'Rhizobium bacteria in Sunnhemp root nodules fix atmospheric nitrogen directly into the rhizosphere. The dense shade of the vegetative blanket completely eliminates light penetration needed for dormant weed seed germination.',
    cautionsOrDoNotDo: [
      'Do not let Sunnhemp grow past 60 days into hard woody seed stage, as woody stems decompose very slowly and rob soil moisture.',
      'Ensure main crop is tall enough (> 1.5 ft) before crimping the inter-row cover.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    likesCount: 215,
    triedCount: 130,
    successRatePercentage: 98,
    createdAt: '2026-07-20',
    comments: [
      {
        id: 'FB-08',
        farmerName: 'Vikram Jadhav',
        farmerLocation: 'Sangli, Maharashtra',
        comment: 'Did this in my sugarcane field. Zero manual labor for weeding needed all season, and soil stayed moist even during a 20-day dry canal closure.',
        rating: 5,
        triedOnFarm: true,
        date: '2026-08-01'
      }
    ]
  },
  {
    id: 'TIP-2026-008',
    title: 'Recycled PVC Pipe Deep-Root Aerator & Fertilizer Spear for Fruit Trees',
    category: 'Farm Tools & DIY Jugaad',
    summary: 'Drill small holes in 2-inch scrap PVC pipes and sink them vertically into the root zone of fruit trees. Pour compost tea and water directly into the pipe to bypass surface evaporation and weeds.',
    farmerName: 'Birendra Kumar Jha',
    village: 'Hajipur',
    district: 'Vaishali',
    state: 'Bihar',
    phone: '+91 94310 99422',
    isVerifiedFarmer: true,
    experienceYears: 16,
    costToImplement: 'Low Cost (< ₹500)',
    estimatedSavings: '50% faster fruit tree growth and 80% fertilizer efficiency',
    timeToSeeResults: 'Noticeable tree vigor and deep taproot formation within 30 days',
    difficulty: 'Easy (Any Farmer)',
    suitableCrops: ['Mango', 'Guava', 'Banana', 'Citrus / Lemon', 'Papaya', 'Coconut palms'],
    materialsNeeded: [
      'Scrap 2-inch PVC or drainage pipe cut into 1.5-foot lengths (2 per tree)',
      'Manual drill or hot iron rod to make 6mm perforations in pipe lower half',
      'Coarse pea-gravel or crushed bricks to fill inside the pipe',
      'Small PVC end-cap or inverted coconut shell as top cover'
    ],
    stepByStepGuide: [
      'Take a 1.5-foot long 2-inch scrap PVC pipe and drill 15-20 small 6mm holes across the bottom 12 inches.',
      'Using an iron crowbar, make two 1.5-foot deep holes on opposite sides of the tree canopy drip-line.',
      'Insert the perforated pipe vertically so 2 inches protrude above soil level.',
      'Fill the inside of the pipe with coarse pea-gravel (this prevents soil from collapsing inside while allowing liquid to percolate freely).',
      'Pour 2 Liters of Jeevamrut or liquid compost tea directly into the pipe mouth once every 10 days. Moisture and nutrients reach directly to 1.5 feet depth where active feeder roots thrive.'
    ],
    scientificReason: 'Surface-applied fertilizers often lose up to 40% nitrogen to volatilization and encourage shallow, drought-vulnerable surface roots. Sub-surface vertical percolation trains deep taproot architecture resistant to severe heatwaves and wind lodging.',
    cautionsOrDoNotDo: [
      'Do not place the pipe right against the main tree trunk; always install at the outer drip-line where absorbing root hairs exist.',
      'Cover pipe top with a loose cap to prevent soil clogging during torrential rains.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    likesCount: 189,
    triedCount: 98,
    successRatePercentage: 96,
    createdAt: '2026-08-06',
    comments: [
      {
        id: 'FB-09',
        farmerName: 'Kishore Goud',
        farmerLocation: 'Mahabubnagar, Telangana',
        comment: 'Installed on 120 mango trees. I pour organic liquid manure directly into these pipes. Trees showed 2x new branch flushing compared to flood watering.',
        rating: 5,
        triedOnFarm: true,
        date: '2026-08-15'
      }
    ]
  }
];

export const INITIAL_FARMER_IDEAS: FarmerIdea[] = [
  ...CORE_FARMER_IDEAS,
  ...INDIAN_FARMER_TIPS,
  ...GLOBAL_FARMER_TIPS,
  ...CLIMATE_FARMER_TIPS
];

export const ALL_FARMER_IDEAS: FarmerIdea[] = INITIAL_FARMER_IDEAS;
