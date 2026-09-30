import { WastePlatformProfile } from '../types';

export const DIGITAL_WASTE_APPS: WastePlatformProfile[] = [
  {
    id: 'aakri',
    name: 'Aakri',
    category: 'Digital Waste Clearing App',
    headquarters: 'Kochi / Kerala, India',
    coverage: 'Urban Kerala, Expanding South India',
    coreModel: 'On-demand mobile app digitizing the traditional "kabadiwala" (scrap collector) system with calibrated digital scales and instant UPI/cash payouts.',
    targetAudience: 'Residential households, small retail shops, apartments, and corporate offices.',
    keyStrengths: [
      'Transparent weight-based doorstep pricing using Bluetooth smart scales.',
      'Simple consumer booking workflow with flexible pickup time slots.',
      'Collects segregated dry recyclables: paper, cardboard, PET plastic, metals, and old electronics (e-waste).',
      'Immediate electronic receipt and instant mobile bank transfer to users.'
    ],
    fatalFlawsOrBlindspots: [
      'High Customer Acquisition Cost (CAC) and low average ticket size (₹250–₹600 per household pickup).',
      'Hyperlocal vehicle routing struggles in suburban and semi-rural agricultural zones.',
      'Owns zero heavy smelting or primary industrial recycling plants; acts as an intermediary broker between homes and wholesale scrap yards.',
      'Zero penetration into heavy agricultural metal junk (broken tractor plows, rusted borewell pumps, fencing).'
    ],
    whyTheyStruggleOrMissAllInOne: 'They have built clean consumer apps, but lack heavy industrial processing facilities and rural logistics fleets. They remain an urban scrap aggregator without end-to-end circular infrastructure.'
  },
  {
    id: 'ecowrap',
    name: 'Ecowrap',
    category: 'Digital Waste Clearing App',
    headquarters: 'Jaipur, Rajasthan, India',
    coverage: 'Tier-1 & Tier-2 Hospitality Hubs across North India',
    coreModel: 'IoT-enabled waste bins and SaaS reverse logistics platform strictly targeted at source segregation for the HORECA (Hotels, Restaurants, Cafes) sector.',
    targetAudience: 'Hotels, luxury resorts, banquet halls, restaurants, and cloud kitchens.',
    keyStrengths: [
      'Pre-contamination segregation: Captures high-purity glass, aluminum cans, food waste, and corrugated cardboard before mixed contamination.',
      'IoT smart dustbins with ultrasonic fill-level sensors preventing overflow and optimizing collection routes.',
      'ESG compliance dashboards and carbon abatement certification for corporate sustainability reporting.',
      'Upcycles selected glass and craft materials into corporate gifts and eco-furnishings.'
    ],
    fatalFlawsOrBlindspots: [
      'Strictly confined to the commercial hospitality niche; completely absent from residential and agricultural sectors.',
      'Dependent on third-party scrap recyclers and municipal dump permits for secondary waste streams.',
      'Does not handle land remediation, municipal solid waste (MSW) dumps, or heavy machinery operations.'
    ],
    whyTheyStruggleOrMissAllInOne: 'Ecowrap excels at B2B hospitality source tracking, but its narrow vertical focus means it cannot serve the 95% of waste generated across municipal, rural, and agricultural landscapes.'
  },
  {
    id: 'kabadiwalla-connect',
    name: 'Kabadiwalla Connect',
    category: 'Digital Waste Clearing App',
    headquarters: 'Chennai, India / Global',
    coverage: 'India, Indonesia, West Africa (Consulting & Municipal Pilots)',
    coreModel: 'Mapping and formalizing the informal waste economy by linking micro-entrepreneurs (local scrap dealers) into municipal and Extended Producer Responsibility (EPR) supply chains.',
    targetAudience: 'Municipal corporations (ULBs), FMCG plastic brand owners (EPR buyers), and informal scrap collectors.',
    keyStrengths: [
      'GIS mapping of thousands of informal small scrap shops ("Level 1 and Level 2 aggregators") across metropolitan areas.',
      'Traceability protocols for plastic EPR credits matching brands (Unilever, Nestlé) with certified recycled tons.',
      'Low capital expenditure by leveraging existing informal collection infrastructure instead of buying new fleets.'
    ],
    fatalFlawsOrBlindspots: [
      'Relies heavily on informal dealers who frequently revert to cash-only untracked transactions during peak demand.',
      'Software-centric data layer with limited direct operational control over sorting purity and worker safety.',
      'Heavily dependent on lengthy government municipal tenders and fluctuating global plastic scrap prices.'
    ],
    whyTheyStruggleOrMissAllInOne: 'They map and organize the informal ecosystem with impressive intelligence, but lack direct ownership of sorting machinery, trucks, or heavy remediation infrastructure.'
  },
  {
    id: 'mitti-safetyculture',
    name: 'Mitti by SafetyCulture',
    category: 'Digital Waste Clearing App',
    headquarters: 'Sydney, Australia / Global',
    coverage: 'Australia, North America, UK, Global Enterprise',
    coreModel: 'Enterprise mobile platform providing automated workflows, route dispatching, and strict regulatory compliance logging for commercial and liquid hazardous waste management.',
    targetAudience: 'Commercial waste haulers, municipal councils, liquid waste contractors, and industrial plants.',
    keyStrengths: [
      'Flawless chain-of-custody documentation and EPA-compliant hazardous waste transport manifests.',
      'Real-time telematics integration with commercial fleet trucks for GPS route verification and fuel optimization.',
      'Driver mobile inspection checklists ensuring vehicle roadworthiness and spill containment readiness.'
    ],
    fatalFlawsOrBlindspots: [
      'Zero consumer-facing interface: No mobile app for everyday citizens or farmers to request scrap pickups or receive cash payouts.',
      'SaaS license model only: Does not buy, sell, or physically process waste materials.',
      'No biological soil remediation or water body desilting integrations.'
    ],
    whyTheyStruggleOrMissAllInOne: 'Mitti is a world-class enterprise compliance and logistics SaaS tool, but it is purely back-office software without consumer touchpoints, commodity trading, or circular community revival.'
  }
];

export const ENVIRONMENTAL_INFRASTRUCTURE_GIANTS: WastePlatformProfile[] = [
  {
    id: 'veolia-suez',
    name: 'Veolia & Suez',
    category: 'Environmental Infrastructure Giant',
    headquarters: 'Paris, France',
    coverage: 'Global (Over 50+ Countries across 5 Continents)',
    coreModel: 'Heavy civil engineering, automatic optical sorting plants, large-scale waste-to-energy incinerators, hazardous chemical landfills, and mega water desalinization/wastewater facilities.',
    targetAudience: 'National governments, sovereign utilities, municipal councils, and fortune-500 industrial complexes.',
    keyStrengths: [
      'Unrivaled industrial scale: Operates thousands of water treatment plants and processes over 45 million metric tons of solid waste annually.',
      'State-of-the-art optical sorters, eddy-current separators, and high-temperature hazardous incinerators.',
      'Decades of civil engineering expertise in municipal water grids and massive sanitary landfills.'
    ],
    fatalFlawsOrBlindspots: [
      'Archaic, siloed internal ERP systems that are entirely disconnected from the digital consumer economy.',
      'Zero on-demand mobile apps for doorstep scrap pickup; unable to service decentralized rural agricultural waste or small generators.',
      'Lengthy 20-to-30-year PFI/PPP government concession contracts that are rigid and slow to adapt to modern circular economies.',
      'Extremely high capital expenditure (capex) that excludes developing market villages and smallholder farmers.'
    ],
    whyTheyStruggleOrMissAllInOne: 'They build the physical processing behemoths of the planet, but they write clunky software, possess zero consumer empathy, and cannot capture micro-waste streams before they reach the landfill.'
  },
  {
    id: 'jacobs-aecom',
    name: 'Jacobs Engineering & AECOM',
    category: 'Environmental Infrastructure Giant',
    headquarters: 'Dallas, TX & Los Angeles, CA, USA',
    coverage: 'Global Tier-1 Civil Engineering & Consulting',
    coreModel: 'Master-planning smart city infrastructure, regional solid waste management masterplans, leachate remediation, stormwater drainage, and legacy landfill environmental capping.',
    targetAudience: 'State transport departments, national ministries of environment, World Bank, and municipal authorities.',
    keyStrengths: [
      'Top-tier engineering design, hydrology modeling, and environmental impact assessments (EIA).',
      'Master planning of multimodal logistics corridors and modern sanitary landfill containment membranes.',
      'Unsurpassed geopolitical credibility and ability to secure multi-billion dollar project financing.'
    ],
    fatalFlawsOrBlindspots: [
      'Pure design and consulting model: They do not operate waste collection trucks, buy scrap, or run day-to-day collection routes.',
      'No consumer-facing mobile products or direct citizen engagement touchpoints.',
      'Produce multi-thousand page PDF masterplans that often gather dust in municipal archives while informal dumping continues unabated.'
    ],
    whyTheyStruggleOrMissAllInOne: 'They design the blueprint for the physical world, but they do not operate the clearing software or the trucks. Once the engineering study is delivered, their engagement ends.'
  },
  {
    id: 'ramky-re-sustainability',
    name: 'Ramky Enviro / Re Sustainability (Revolis)',
    category: 'Environmental Infrastructure Giant',
    headquarters: 'Hyderabad, India (Operating across Asia & Middle East)',
    coverage: 'India, Singapore, UAE, Oman, Qatar, Saudi Arabia',
    coreModel: 'Asia’s largest comprehensive environmental management player: Integrated Municipal Solid Waste (MSW) processing parks, bio-medical waste incinerators, and industrial hazardous waste landfills.',
    targetAudience: 'Mega-city municipal corporations (GHMC, BBMP, Delhi MCD), industrial SEZ corridors, and hospital networks.',
    keyStrengths: [
      'Processes over 15,000 metric tons of municipal waste per day across 85+ operating locations.',
      'Operates advanced waste-to-energy plants, compost units, and sanitary landfill bio-mining operations.',
      'Deep domain knowledge of developing-market waste composition (high organic moisture and mixed debris).'
    ],
    fatalFlawsOrBlindspots: [
      'Legacy B2G municipal collection model plagued by unreliable tipper truck schedules and low public trust.',
      'Absence of consumer-facing on-demand scrap clearing apps that pay households or farmers market rates.',
      'Waste arrives contaminated and mixed at their processing plants, drastically reducing material recovery value.',
      'Zero integration with agricultural land revival, soil remineralization, or rural machinery dispatch.'
    ],
    whyTheyStruggleOrMissAllInOne: 'They possess the heavy infrastructure footprint across Asia, but their lack of a direct consumer/farmer digital clearing bridge leaves incoming waste heavily contaminated, gutting circular recycling efficiency.'
  }
];

export const THE_ALL_IN_ONE_GAP_ANALYSIS = {
  coreDiagnosis: 'The Great Divide: The software developers write beautiful apps but own no trucks or processing plants; the infrastructure giants build massive sorting facilities but write terrible software and cannot engage citizens.',
  softwareCampFlaws: [
    {
      title: 'Zero Asset Ownership',
      detail: 'Apps like Aakri and Kabadiwalla Connect rely on third-party scrap buyers or informal raddiwalas. When metal or paper prices fluctuate, their margins evaporate.'
    },
    {
      title: 'Micro-Ticket Unit Economic Trap',
      detail: 'Dispatching a two-wheeler or small auto-rickshaw to collect ₹300 worth of cardboard burns ₹180 in fuel and labor, creating negative unit economics without scale.'
    },
    {
      title: 'Confined to Urban Pockets',
      detail: 'Apps ignore rural farms, broken agricultural tractors, rusted submersible borewells, and pesticide barrels because farm distances are too wide for urban micro-vans.'
    },
    {
      title: 'No Biological or Water Integration',
      detail: 'Digital waste apps only care about dry recyclables. They completely ignore the water bodies dying next to the farms and the acidic toxic soil under the dumped scrap.'
    }
  ],
  infrastructureCampFlaws: [
    {
      title: 'The "Mixed Waste" Contamination Tax',
      detail: 'Veolia, Suez, and Ramky receive waste after it has already been crushed and mixed in municipal compactor trucks. Contaminated paper and organic sludge destroy 60% of recyclable value before it even enters optical sorters.'
    },
    {
      title: 'Horrendous Software & Zero Consumer Trust',
      detail: 'Their software consists of clunky legacy SAP or bespoke desktop ERPs. Citizens have no visibility into where their waste goes, and receive zero financial incentives to segregate.'
    },
    {
      title: 'Rigid 25-Year PPP Bureaucracy',
      detail: 'Tied to government tipping-fee contracts that pay per ton collected, perversely incentivizing haulers to maximize waste weight rather than preventing waste generation or restoring land.'
    }
  ],
  theWinningAllInOneArchitecture: {
    name: 'Eden Sync Closed-Loop Unified Operating System',
    pillars: [
      {
        pillarName: '1. On-Demand Doorstep Scrap App & Instant Payouts',
        description: 'Digitized weight-calibrated scrap purchasing covering both urban recyclables and high-tonnage agricultural scrap (tractors, plows, barbed wire) with instant UPI transfers.'
      },
      {
        pillarName: '2. Field Machinery Dispatch & GPS Logbook (Physical Muscle)',
        description: 'Direct dispatch of heavy excavators (JCB), tractors, and aquatic weed harvesters to clear rural scrap heaps, desilt community lakes, and restore compacted topsoil.'
      },
      {
        pillarName: '3. Biological Silt & Bioremediation Recycling',
        description: 'Instead of dumping lake silt in landfills, nutrient-rich excavated organic silt is converted into bio-fertilizer and returned directly to farmers fields, closing the biological nutrient loop.'
      },
      {
        pillarName: '4. Enterprise Traceability & Satellite Telemetry Ledger',
        description: 'Combines real-time Sentinel-2 multi-spectral remote sensing verification with blockchain-grade audit logs for ESG compliance and carbon credit monetization.'
      }
    ]
  }
};
