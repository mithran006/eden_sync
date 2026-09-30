export interface KaggleFarmRecord {
  farmId: string;
  cropType: string;
  farmAreaAcres: number;
  irrigationType: 'Drip' | 'Flood' | 'Sprinkler' | 'Rain-fed' | 'Manual';
  fertilizerUsedTons: number;
  pesticideUsedKg: number;
  yieldTons: number;
  soilType: 'Clay' | 'Loamy' | 'Peaty' | 'Silty' | 'Sandy';
  season: 'Kharif' | 'Rabi' | 'Zaid';
  waterUsageCubicMeters: number;
}

export const KAGGLE_AGRICULTURE_DATASET: KaggleFarmRecord[] = [
  { farmId: 'F001', cropType: 'Cotton', farmAreaAcres: 329.4, irrigationType: 'Sprinkler', fertilizerUsedTons: 8.14, pesticideUsedKg: 2.21, yieldTons: 14.44, soilType: 'Loamy', season: 'Kharif', waterUsageCubicMeters: 76648.2 },
  { farmId: 'F002', cropType: 'Carrot', farmAreaAcres: 18.67, irrigationType: 'Manual', fertilizerUsedTons: 4.77, pesticideUsedKg: 4.36, yieldTons: 42.91, soilType: 'Peaty', season: 'Kharif', waterUsageCubicMeters: 68725.54 },
  { farmId: 'F003', cropType: 'Sugarcane', farmAreaAcres: 306.03, irrigationType: 'Flood', fertilizerUsedTons: 2.91, pesticideUsedKg: 0.56, yieldTons: 33.44, soilType: 'Silty', season: 'Kharif', waterUsageCubicMeters: 75538.56 },
  { farmId: 'F004', cropType: 'Tomato', farmAreaAcres: 380.21, irrigationType: 'Rain-fed', fertilizerUsedTons: 3.32, pesticideUsedKg: 4.35, yieldTons: 34.08, soilType: 'Silty', season: 'Zaid', waterUsageCubicMeters: 45401.23 },
  { farmId: 'F005', cropType: 'Tomato', farmAreaAcres: 135.56, irrigationType: 'Sprinkler', fertilizerUsedTons: 8.33, pesticideUsedKg: 4.48, yieldTons: 43.28, soilType: 'Clay', season: 'Zaid', waterUsageCubicMeters: 93718.69 },
  { farmId: 'F006', cropType: 'Sugarcane', farmAreaAcres: 12.5, irrigationType: 'Sprinkler', fertilizerUsedTons: 6.42, pesticideUsedKg: 2.25, yieldTons: 38.18, soilType: 'Loamy', season: 'Zaid', waterUsageCubicMeters: 46487.98 },
  { farmId: 'F007', cropType: 'Soybean', farmAreaAcres: 360.06, irrigationType: 'Drip', fertilizerUsedTons: 1.83, pesticideUsedKg: 2.37, yieldTons: 44.93, soilType: 'Sandy', season: 'Rabi', waterUsageCubicMeters: 40583.57 },
  { farmId: 'F008', cropType: 'Rice', farmAreaAcres: 464.6, irrigationType: 'Drip', fertilizerUsedTons: 5.18, pesticideUsedKg: 0.91, yieldTons: 4.23, soilType: 'Silty', season: 'Kharif', waterUsageCubicMeters: 9392.38 },
  { farmId: 'F009', cropType: 'Maize', farmAreaAcres: 389.37, irrigationType: 'Drip', fertilizerUsedTons: 0.57, pesticideUsedKg: 4.93, yieldTons: 3.86, soilType: 'Peaty', season: 'Rabi', waterUsageCubicMeters: 60202.14 },
  { farmId: 'F010', cropType: 'Soybean', farmAreaAcres: 184.37, irrigationType: 'Drip', fertilizerUsedTons: 2.18, pesticideUsedKg: 2.67, yieldTons: 17.25, soilType: 'Sandy', season: 'Kharif', waterUsageCubicMeters: 90922.15 },
  { farmId: 'F011', cropType: 'Rice', farmAreaAcres: 279.95, irrigationType: 'Drip', fertilizerUsedTons: 8.02, pesticideUsedKg: 1.24, yieldTons: 32.85, soilType: 'Clay', season: 'Zaid', waterUsageCubicMeters: 5869.75 },
  { farmId: 'F012', cropType: 'Sugarcane', farmAreaAcres: 145.32, irrigationType: 'Flood', fertilizerUsedTons: 3.01, pesticideUsedKg: 2.27, yieldTons: 8.08, soilType: 'Clay', season: 'Kharif', waterUsageCubicMeters: 88976.51 },
  { farmId: 'F013', cropType: 'Wheat', farmAreaAcres: 329.1, irrigationType: 'Drip', fertilizerUsedTons: 5.26, pesticideUsedKg: 0.83, yieldTons: 5.44, soilType: 'Clay', season: 'Zaid', waterUsageCubicMeters: 45922.35 },
  { farmId: 'F014', cropType: 'Rice', farmAreaAcres: 246.02, irrigationType: 'Flood', fertilizerUsedTons: 1.01, pesticideUsedKg: 3.45, yieldTons: 11.38, soilType: 'Sandy', season: 'Rabi', waterUsageCubicMeters: 71953.14 },
  { farmId: 'F015', cropType: 'Sugarcane', farmAreaAcres: 305.15, irrigationType: 'Rain-fed', fertilizerUsedTons: 5.39, pesticideUsedKg: 2.15, yieldTons: 28.77, soilType: 'Peaty', season: 'Kharif', waterUsageCubicMeters: 33615.77 },
  { farmId: 'F016', cropType: 'Barley', farmAreaAcres: 60.22, irrigationType: 'Flood', fertilizerUsedTons: 2.19, pesticideUsedKg: 0.35, yieldTons: 16.03, soilType: 'Sandy', season: 'Zaid', waterUsageCubicMeters: 25132.48 },
  { farmId: 'F017', cropType: 'Carrot', farmAreaAcres: 284.01, irrigationType: 'Manual', fertilizerUsedTons: 5.89, pesticideUsedKg: 0.81, yieldTons: 47.7, soilType: 'Loamy', season: 'Zaid', waterUsageCubicMeters: 88301.46 },
  { farmId: 'F018', cropType: 'Maize', farmAreaAcres: 128.23, irrigationType: 'Rain-fed', fertilizerUsedTons: 4.91, pesticideUsedKg: 0.77, yieldTons: 16.67, soilType: 'Loamy', season: 'Rabi', waterUsageCubicMeters: 18660.03 },
  { farmId: 'F019', cropType: 'Maize', farmAreaAcres: 460.93, irrigationType: 'Drip', fertilizerUsedTons: 1.09, pesticideUsedKg: 1.31, yieldTons: 39.96, soilType: 'Sandy', season: 'Zaid', waterUsageCubicMeters: 54314.28 },
  { farmId: 'F020', cropType: 'Barley', farmAreaAcres: 58.85, irrigationType: 'Sprinkler', fertilizerUsedTons: 3.61, pesticideUsedKg: 3.32, yieldTons: 18.85, soilType: 'Sandy', season: 'Kharif', waterUsageCubicMeters: 92481.89 },
  { farmId: 'F021', cropType: 'Cotton', farmAreaAcres: 377.05, irrigationType: 'Drip', fertilizerUsedTons: 5.95, pesticideUsedKg: 0.91, yieldTons: 29.17, soilType: 'Clay', season: 'Rabi', waterUsageCubicMeters: 26743.55 },
  { farmId: 'F022', cropType: 'Wheat', farmAreaAcres: 92.67, irrigationType: 'Flood', fertilizerUsedTons: 6.95, pesticideUsedKg: 3.64, yieldTons: 30.7, soilType: 'Clay', season: 'Rabi', waterUsageCubicMeters: 42874.34 },
  { farmId: 'F023', cropType: 'Potato', farmAreaAcres: 15.67, irrigationType: 'Drip', fertilizerUsedTons: 9.95, pesticideUsedKg: 2.99, yieldTons: 18.13, soilType: 'Loamy', season: 'Zaid', waterUsageCubicMeters: 41862.86 },
  { farmId: 'F024', cropType: 'Rice', farmAreaAcres: 483.88, irrigationType: 'Drip', fertilizerUsedTons: 6.31, pesticideUsedKg: 2.29, yieldTons: 34.46, soilType: 'Clay', season: 'Zaid', waterUsageCubicMeters: 61383.07 },
  { farmId: 'F025', cropType: 'Barley', farmAreaAcres: 75.64, irrigationType: 'Flood', fertilizerUsedTons: 6.69, pesticideUsedKg: 3.57, yieldTons: 6.14, soilType: 'Silty', season: 'Zaid', waterUsageCubicMeters: 43847.82 },
  { farmId: 'F026', cropType: 'Wheat', farmAreaAcres: 162.28, irrigationType: 'Flood', fertilizerUsedTons: 5.85, pesticideUsedKg: 2.42, yieldTons: 24.63, soilType: 'Loamy', season: 'Rabi', waterUsageCubicMeters: 65838.4 },
  { farmId: 'F027', cropType: 'Cotton', farmAreaAcres: 375.1, irrigationType: 'Rain-fed', fertilizerUsedTons: 0.5, pesticideUsedKg: 4.76, yieldTons: 22.51, soilType: 'Clay', season: 'Kharif', waterUsageCubicMeters: 39362.44 },
  { farmId: 'F028', cropType: 'Tomato', farmAreaAcres: 256.19, irrigationType: 'Flood', fertilizerUsedTons: 7.32, pesticideUsedKg: 2.19, yieldTons: 48.02, soilType: 'Silty', season: 'Rabi', waterUsageCubicMeters: 81313.04 },
  { farmId: 'F029', cropType: 'Wheat', farmAreaAcres: 288.52, irrigationType: 'Manual', fertilizerUsedTons: 1.79, pesticideUsedKg: 4.78, yieldTons: 36.9, soilType: 'Silty', season: 'Zaid', waterUsageCubicMeters: 23208.04 },
  { farmId: 'F030', cropType: 'Potato', farmAreaAcres: 286.52, irrigationType: 'Rain-fed', fertilizerUsedTons: 8.91, pesticideUsedKg: 0.77, yieldTons: 30.5, soilType: 'Loamy', season: 'Zaid', waterUsageCubicMeters: 93407.38 },
  { farmId: 'F031', cropType: 'Barley', farmAreaAcres: 136.16, irrigationType: 'Flood', fertilizerUsedTons: 5.89, pesticideUsedKg: 1.36, yieldTons: 11.86, soilType: 'Clay', season: 'Zaid', waterUsageCubicMeters: 30098.35 },
  { farmId: 'F032', cropType: 'Carrot', farmAreaAcres: 350.42, irrigationType: 'Flood', fertilizerUsedTons: 8.4, pesticideUsedKg: 2.94, yieldTons: 24.34, soilType: 'Clay', season: 'Rabi', waterUsageCubicMeters: 71580.87 },
  { farmId: 'F033', cropType: 'Barley', farmAreaAcres: 446.76, irrigationType: 'Drip', fertilizerUsedTons: 7.79, pesticideUsedKg: 0.96, yieldTons: 46.47, soilType: 'Loamy', season: 'Zaid', waterUsageCubicMeters: 93656.06 },
  { farmId: 'F034', cropType: 'Tomato', farmAreaAcres: 264.12, irrigationType: 'Drip', fertilizerUsedTons: 4.75, pesticideUsedKg: 4.79, yieldTons: 12.92, soilType: 'Loamy', season: 'Rabi', waterUsageCubicMeters: 92745.01 },
  { farmId: 'F035', cropType: 'Soybean', farmAreaAcres: 266.03, irrigationType: 'Drip', fertilizerUsedTons: 8.57, pesticideUsedKg: 1.35, yieldTons: 34.45, soilType: 'Silty', season: 'Zaid', waterUsageCubicMeters: 43610.21 },
  { farmId: 'F036', cropType: 'Cotton', farmAreaAcres: 446.16, irrigationType: 'Manual', fertilizerUsedTons: 4.35, pesticideUsedKg: 3.47, yieldTons: 12.53, soilType: 'Loamy', season: 'Zaid', waterUsageCubicMeters: 38874.28 },
  { farmId: 'F037', cropType: 'Soybean', farmAreaAcres: 156.1, irrigationType: 'Manual', fertilizerUsedTons: 1.18, pesticideUsedKg: 4.43, yieldTons: 40.15, soilType: 'Loamy', season: 'Zaid', waterUsageCubicMeters: 73646.55 },
  { farmId: 'F038', cropType: 'Barley', farmAreaAcres: 431.22, irrigationType: 'Drip', fertilizerUsedTons: 5.71, pesticideUsedKg: 3.18, yieldTons: 45.95, soilType: 'Silty', season: 'Kharif', waterUsageCubicMeters: 36065.94 },
  { farmId: 'F039', cropType: 'Cotton', farmAreaAcres: 220.48, irrigationType: 'Flood', fertilizerUsedTons: 9.96, pesticideUsedKg: 2.91, yieldTons: 10.53, soilType: 'Clay', season: 'Zaid', waterUsageCubicMeters: 82549.03 },
  { farmId: 'F040', cropType: 'Cotton', farmAreaAcres: 166.82, irrigationType: 'Rain-fed', fertilizerUsedTons: 2.85, pesticideUsedKg: 1.36, yieldTons: 46.19, soilType: 'Sandy', season: 'Zaid', waterUsageCubicMeters: 12007.7 },
  { farmId: 'F041', cropType: 'Rice', farmAreaAcres: 370.79, irrigationType: 'Flood', fertilizerUsedTons: 8.18, pesticideUsedKg: 4.99, yieldTons: 35.01, soilType: 'Sandy', season: 'Kharif', waterUsageCubicMeters: 85208.71 },
  { farmId: 'F042', cropType: 'Sugarcane', farmAreaAcres: 418.99, irrigationType: 'Sprinkler', fertilizerUsedTons: 0.78, pesticideUsedKg: 0.58, yieldTons: 26.29, soilType: 'Clay', season: 'Zaid', waterUsageCubicMeters: 33705.69 },
  { farmId: 'F043', cropType: 'Cotton', farmAreaAcres: 78.79, irrigationType: 'Flood', fertilizerUsedTons: 1.35, pesticideUsedKg: 3.0, yieldTons: 11.45, soilType: 'Sandy', season: 'Zaid', waterUsageCubicMeters: 94754.73 },
  { farmId: 'F044', cropType: 'Soybean', farmAreaAcres: 84.12, irrigationType: 'Manual', fertilizerUsedTons: 4.64, pesticideUsedKg: 2.53, yieldTons: 24.77, soilType: 'Sandy', season: 'Rabi', waterUsageCubicMeters: 40614.4 },
  { farmId: 'F045', cropType: 'Tomato', farmAreaAcres: 326.69, irrigationType: 'Sprinkler', fertilizerUsedTons: 5.24, pesticideUsedKg: 0.55, yieldTons: 18.34, soilType: 'Peaty', season: 'Kharif', waterUsageCubicMeters: 37466.11 },
  { farmId: 'F046', cropType: 'Carrot', farmAreaAcres: 112.8, irrigationType: 'Sprinkler', fertilizerUsedTons: 1.8, pesticideUsedKg: 1.01, yieldTons: 31.57, soilType: 'Clay', season: 'Kharif', waterUsageCubicMeters: 79966.1 },
  { farmId: 'F047', cropType: 'Potato', farmAreaAcres: 347.66, irrigationType: 'Drip', fertilizerUsedTons: 3.86, pesticideUsedKg: 2.68, yieldTons: 31.47, soilType: 'Sandy', season: 'Kharif', waterUsageCubicMeters: 86989.88 },
  { farmId: 'F048', cropType: 'Potato', farmAreaAcres: 77.39, irrigationType: 'Sprinkler', fertilizerUsedTons: 9.34, pesticideUsedKg: 3.0, yieldTons: 20.53, soilType: 'Silty', season: 'Zaid', waterUsageCubicMeters: 5874.17 },
  { farmId: 'F049', cropType: 'Barley', farmAreaAcres: 462.37, irrigationType: 'Sprinkler', fertilizerUsedTons: 2.3, pesticideUsedKg: 0.14, yieldTons: 39.51, soilType: 'Clay', season: 'Kharif', waterUsageCubicMeters: 53879.87 },
  { farmId: 'F050', cropType: 'Tomato', farmAreaAcres: 292.25, irrigationType: 'Rain-fed', fertilizerUsedTons: 4.08, pesticideUsedKg: 0.76, yieldTons: 45.14, soilType: 'Silty', season: 'Kharif', waterUsageCubicMeters: 90232.08 }
];

export interface DatasetStatistics {
  totalRecords: number;
  avgYieldTons: number;
  avgWaterUsageM3: number;
  avgFertilizerTons: number;
  avgPesticideKg: number;
  soilTypeStats: Record<string, { count: number; avgYield: number; avgWater: number; topCrop: string }>;
  irrigationStats: Record<string, { count: number; avgYield: number; avgWater: number }>;
  seasonStats: Record<string, { count: number; avgYield: number }>;
}

export function computeDatasetStatistics(records: KaggleFarmRecord[] = KAGGLE_AGRICULTURE_DATASET): DatasetStatistics {
  const total = records.length;
  const totalYield = records.reduce((s, r) => s + r.yieldTons, 0);
  const totalWater = records.reduce((s, r) => s + r.waterUsageCubicMeters, 0);
  const totalFert = records.reduce((s, r) => s + r.fertilizerUsedTons, 0);
  const totalPest = records.reduce((s, r) => s + r.pesticideUsedKg, 0);

  const soilMap: Record<string, KaggleFarmRecord[]> = {};
  const irrigMap: Record<string, KaggleFarmRecord[]> = {};
  const seasonMap: Record<string, KaggleFarmRecord[]> = {};

  records.forEach(r => {
    if (!soilMap[r.soilType]) soilMap[r.soilType] = [];
    soilMap[r.soilType].push(r);

    if (!irrigMap[r.irrigationType]) irrigMap[r.irrigationType] = [];
    irrigMap[r.irrigationType].push(r);

    if (!seasonMap[r.season]) seasonMap[r.season] = [];
    seasonMap[r.season].push(r);
  });

  const soilTypeStats: Record<string, { count: number; avgYield: number; avgWater: number; topCrop: string }> = {};
  Object.keys(soilMap).forEach(st => {
    const list = soilMap[st];
    const avgY = list.reduce((s, r) => s + r.yieldTons, 0) / list.length;
    const avgW = list.reduce((s, r) => s + r.waterUsageCubicMeters, 0) / list.length;

    // determine top crop by average yield in this soil type
    const cropYieldMap: Record<string, number[]> = {};
    list.forEach(r => {
      if (!cropYieldMap[r.cropType]) cropYieldMap[r.cropType] = [];
      cropYieldMap[r.cropType].push(r.yieldTons);
    });
    let bestCrop = list[0].cropType;
    let maxMean = -1;
    Object.entries(cropYieldMap).forEach(([crop, yields]) => {
      const mean = yields.reduce((a, b) => a + b, 0) / yields.length;
      if (mean > maxMean) {
        maxMean = mean;
        bestCrop = crop;
      }
    });

    soilTypeStats[st] = {
      count: list.length,
      avgYield: Number(avgY.toFixed(2)),
      avgWater: Number(avgW.toFixed(0)),
      topCrop: bestCrop,
    };
  });

  const irrigationStats: Record<string, { count: number; avgYield: number; avgWater: number }> = {};
  Object.keys(irrigMap).forEach(it => {
    const list = irrigMap[it];
    irrigationStats[it] = {
      count: list.length,
      avgYield: Number((list.reduce((s, r) => s + r.yieldTons, 0) / list.length).toFixed(2)),
      avgWater: Number((list.reduce((s, r) => s + r.waterUsageCubicMeters, 0) / list.length).toFixed(0)),
    };
  });

  const seasonStats: Record<string, { count: number; avgYield: number }> = {};
  Object.keys(seasonMap).forEach(sn => {
    const list = seasonMap[sn];
    seasonStats[sn] = {
      count: list.length,
      avgYield: Number((list.reduce((s, r) => s + r.yieldTons, 0) / list.length).toFixed(2)),
    };
  });

  return {
    totalRecords: total,
    avgYieldTons: Number((totalYield / total).toFixed(2)),
    avgWaterUsageM3: Number((totalWater / total).toFixed(0)),
    avgFertilizerTons: Number((totalFert / total).toFixed(2)),
    avgPesticideKg: Number((totalPest / total).toFixed(2)),
    soilTypeStats,
    irrigationStats,
    seasonStats,
  };
}
