import { FieldWorkLog } from '../types';

export const INITIAL_FIELD_WORK_LOGS: FieldWorkLog[] = [
  {
    id: 'LOG-JCB-2026-01',
    workOrderTitle: 'Perur Village Lake Desilting & Silt Bund Formation',
    locationName: 'Perur Big Lake, Coimbatore, Tamil Nadu',
    coordinates: {
      lat: 10.9702,
      lng: 76.9152,
    },
    workType: 'Excavator / JCB Desilting',
    machineryModel: 'JCB 3DX Super EcoXcellence (Hydraulic Breaker & Bucket)',
    operatorName: 'Murugan Selvam',
    operatorPhone: '+91 98421 88491',
    workforceCount: 12,
    status: 'Clocked-In / Active',
    startTime: '2026-09-15T06:30:00Z',
    hoursWorked: 5.5,
    siltOrAreaCleared: '620 cubic meters (approx. 45 tractor loads)',
    fuelLitres: 42,
    costPerHour: 1350,
    totalExpense: 7425,
    fundingSource: 'CSR Grant (ITC / Tata)',
    supervisorVerified: true,
    supervisorName: 'K. Balakrishnan (Water User Assoc. Lead)',
    notes: 'Excavated fertile silt distributed free to 8 adjacent smallholder organic farms.',
    proofPhotos: [
      {
        stage: 'before',
        url: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&w=600&q=80',
        caption: 'Heavy hyacinth weed encroachment and dried mud silt blocking inflow sluice gate',
        timestamp: '2026-09-15 06:15 AM',
      },
      {
        stage: 'during',
        url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80',
        caption: 'JCB deep trench cutting on northern embankment creating rainwater silt traps',
        timestamp: '2026-09-15 09:45 AM',
      }
    ]
  },
  {
    id: 'LOG-TRC-2026-02',
    workOrderTitle: 'Alkaline Soil Biochar & Gypsum Deep Rotary Tillage',
    locationName: 'Anand District Agro-Cluster Plot #14, Gujarat',
    coordinates: {
      lat: 22.5645,
      lng: 72.9289,
    },
    workType: 'Biochar / Gypsum Spreading',
    machineryModel: 'Mahindra 575 DI (45 HP) with Rotary Tiller & Spreader',
    operatorName: 'Rameshwar Solanki',
    operatorPhone: '+91 97245 11928',
    workforceCount: 6,
    status: 'Completed & Verified',
    startTime: '2026-09-14T07:00:00Z',
    endTime: '2026-09-14T15:30:00Z',
    hoursWorked: 8.5,
    siltOrAreaCleared: '4.8 Acres Calcareous Soil',
    fuelLitres: 55,
    costPerHour: 950,
    totalExpense: 8075,
    fundingSource: 'Panchayat Fund',
    supervisorVerified: true,
    supervisorName: 'Dr. V. N. Joshi (Block Agronomist)',
    notes: 'Applied 1.2 Tons Gypsum + 400kg biochar to displace exchangeable sodium before monsoon sowing.',
    proofPhotos: [
      {
        stage: 'before',
        url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
        caption: 'Crusted saline soil with zero vegetative emergence and surface salt deposits',
        timestamp: '2026-09-14 06:45 AM',
      },
      {
        stage: 'during',
        url: 'https://images.unsplash.com/photo-1589873964470-663002994a00?auto=format&fit=crop&w=600&q=80',
        caption: 'Tractor spreader dispersing crushed gypsum and seasoned biochar mix',
        timestamp: '2026-09-14 11:15 AM',
      },
      {
        stage: 'completed',
        url: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985c?auto=format&fit=crop&w=600&q=80',
        caption: 'Aerated soil bed prepared with organic mulching cover ready for sun-curing',
        timestamp: '2026-09-14 03:45 PM',
      }
    ]
  },
  {
    id: 'LOG-MAN-2026-03',
    workOrderTitle: 'Community Vetiver Plantation & Canal Embankment Shramdaan',
    locationName: 'Vaigai Tributary Feeder Channel, Madurai, Tamil Nadu',
    coordinates: {
      lat: 9.9252,
      lng: 78.1198,
    },
    workType: 'Vetiver / Sapling Plantation',
    machineryModel: 'Earth Auger + 2x Hand Silt Pushers',
    operatorName: 'S. Alagarsamy',
    operatorPhone: '+91 94432 77019',
    workforceCount: 28,
    status: 'Completed & Verified',
    startTime: '2026-09-13T06:00:00Z',
    endTime: '2026-09-13T12:00:00Z',
    hoursWorked: 6.0,
    siltOrAreaCleared: '1.2 km canal bund protected (1,400 vetiver slips planted)',
    fuelLitres: 8,
    costPerHour: 800,
    totalExpense: 4800,
    fundingSource: 'MGNREGA Scheme',
    supervisorVerified: true,
    supervisorName: 'P. Meenakshi (VAO / Panchayat Secretary)',
    notes: 'Zero mechanical diesel emissions. 100% soil bio-engineering using dense vetiver root systems to prevent erosion.',
    proofPhotos: [
      {
        stage: 'before',
        url: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&w=600&q=80',
        caption: 'Collapsing feeder canal mud wall vulnerable to monsoon wash-out',
        timestamp: '2026-09-13 05:45 AM',
      },
      {
        stage: 'completed',
        url: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80',
        caption: 'Double-row high density vetiver hedges planted along water line',
        timestamp: '2026-09-13 12:15 PM',
      }
    ]
  }
];
