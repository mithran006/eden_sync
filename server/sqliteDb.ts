import fs from 'fs';
import path from 'path';
import initSqlJs, { Database } from 'sql.js';
import { LandApplication, GovtProject, AwarenessArticle, CustomerRecord } from '../src/types.js';

const DB_FILE_PATH = path.join(process.cwd(), 'edensync.sqlite');

export interface AdminUser {
  email: string;
  name: string;
  role: 'admin';
}

export const VALID_ADMIN_EMAILS = [
  'edensync01@gmail.com',
  'edensync02@gmail.com',
  'edensync03@gmail.com',
  'edensync04@gmail.com',
  'edensync05@gmail.com',
  'edensync06@gmail.com',
  'edensync07@gmail.com',
  'edensync08@gmail.com',
  'edensync09@gmail.com',
  'edensync10@gmail.com',
];

export const ADMIN_PASSWORD = 'EDEN@#sync';

class SQLiteService {
  private db: Database | null = null;
  private isReady: boolean = false;
  private initPromise: Promise<void>;

  constructor() {
    this.initPromise = this.init();
  }

  public async ready(): Promise<void> {
    return this.initPromise;
  }

  private async init() {
    try {
      const SQL = await initSqlJs();
      
      if (fs.existsSync(DB_FILE_PATH)) {
        const fileBuffer = fs.readFileSync(DB_FILE_PATH);
        this.db = new SQL.Database(fileBuffer);
        console.log('[SQLite] Loaded existing database from edensync.sqlite');
      } else {
        this.db = new SQL.Database();
        console.log('[SQLite] Created new SQLite database in memory');
      }

      this.createTables();
      this.seedAdmins();
      this.persist();
      this.isReady = true;
      console.log('[SQLite] Database initialized and synced to disk.');
    } catch (err) {
      console.error('[SQLite] Failed to initialize SQLite:', err);
    }
  }

  private persist() {
    if (!this.db) return;
    try {
      const data = this.db.export();
      const buffer = Buffer.from(data);
      fs.writeFileSync(DB_FILE_PATH, buffer);
    } catch (err) {
      console.error('[SQLite] Error writing edensync.sqlite file:', err);
    }
  }

  private createTables() {
    if (!this.db) return;

    this.db.run(`
      CREATE TABLE IF NOT EXISTS admins (
        email TEXT PRIMARY KEY,
        password TEXT NOT NULL,
        name TEXT NOT NULL,
        role TEXT NOT NULL
      );
    `);

    this.db.run(`
      CREATE TABLE IF NOT EXISTS customers (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        phone TEXT,
        email TEXT,
        category TEXT,
        district TEXT,
        state TEXT,
        country TEXT,
        surveyNumber TEXT,
        landArea REAL DEFAULT 0,
        areaUnit TEXT,
        landType TEXT,
        primaryRequirements TEXT,
        soilMetrics TEXT,
        budgetPreference TEXT,
        urgency TEXT,
        status TEXT,
        registeredDate TEXT,
        assignedAgronomist TEXT,
        notes TEXT,
        aiRecommendationSummary TEXT
      );
    `);

    this.db.run(`
      CREATE TABLE IF NOT EXISTS applications (
        id TEXT PRIMARY KEY,
        createdAt TEXT,
        applicantName TEXT NOT NULL,
        phone TEXT,
        applicantAddress TEXT,
        landAddress TEXT,
        landArea REAL DEFAULT 0,
        areaUnit TEXT,
        landType TEXT,
        isFarmer INTEGER DEFAULT 1,
        willingToLease INTEGER DEFAULT 0,
        restorationType TEXT,
        soilTestingRequested INTEGER DEFAULT 0,
        waterTestingRequested INTEGER DEFAULT 0,
        photoUrl TEXT,
        registerCopyUrl TEXT,
        status TEXT,
        adminNotes TEXT,
        assignedExpert TEXT,
        aiAnalysis TEXT
      );
    `);

    this.db.run(`
      CREATE TABLE IF NOT EXISTS govt_projects (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        department TEXT,
        location TEXT,
        targetArea TEXT,
        completionPercentage REAL DEFAULT 0,
        status TEXT,
        allocatedBudget TEXT,
        beneficiaries INTEGER DEFAULT 0,
        description TEXT,
        beforeImageUrl TEXT,
        afterImageUrl TEXT,
        category TEXT,
        lastUpdated TEXT
      );
    `);

    this.db.run(`
      CREATE TABLE IF NOT EXISTS awareness_articles (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT,
        readTime TEXT,
        summary TEXT,
        content TEXT,
        imageUrl TEXT,
        keyTips TEXT
      );
    `);
  }

  private seedAdmins() {
    if (!this.db) return;
    const stmt = this.db.prepare('INSERT OR REPLACE INTO admins (email, password, name, role) VALUES (?, ?, ?, ?)');
    for (let i = 1; i <= 10; i++) {
      const numStr = i < 10 ? `0${i}` : `${i}`;
      const email = `edensync${numStr}@gmail.com`;
      const name = `Eden Sync Admin ${numStr}`;
      stmt.run([email, ADMIN_PASSWORD, name, 'admin']);
    }
    stmt.free();
  }

  // --- ADMIN AUTH ---
  public verifyAdmin(emailInput: string, passwordInput: string): AdminUser | null {
    if (!this.db) return null;
    const cleanEmail = emailInput.trim().toLowerCase();
    
    // Normalize aliases: e.g. "edensync01" or "edensync1" -> "edensync01@gmail.com"
    let fullEmail = cleanEmail;
    if (!cleanEmail.includes('@')) {
      const match = cleanEmail.match(/^edensync0*([1-9]|10)$/);
      if (match) {
        const num = parseInt(match[1], 10);
        const numStr = num < 10 ? `0${num}` : `${num}`;
        fullEmail = `edensync${numStr}@gmail.com`;
      } else {
        fullEmail = `${cleanEmail}@gmail.com`;
      }
    }

    if (passwordInput !== ADMIN_PASSWORD) return null;

    const stmt = this.db.prepare('SELECT email, name, role FROM admins WHERE LOWER(email) = ? AND password = ?');
    stmt.bind([fullEmail, ADMIN_PASSWORD]);
    if (stmt.step()) {
      const row = stmt.getAsObject();
      stmt.free();
      return {
        email: row.email as string,
        name: row.name as string,
        role: 'admin',
      };
    }
    stmt.free();

    // Direct check against valid array
    if (VALID_ADMIN_EMAILS.includes(fullEmail)) {
      const match = fullEmail.match(/edensync(\d+)/);
      const numStr = match ? match[1] : '01';
      return {
        email: fullEmail,
        name: `Eden Sync Admin ${numStr}`,
        role: 'admin',
      };
    }

    return null;
  }

  // --- CUSTOMERS ---
  public getCustomers(): CustomerRecord[] {
    if (!this.db) return [];
    const results: CustomerRecord[] = [];
    const stmt = this.db.prepare('SELECT * FROM customers ORDER BY registeredDate DESC');
    while (stmt.step()) {
      const row = stmt.getAsObject();
      results.push({
        id: row.id as string,
        name: row.name as string,
        phone: (row.phone as string) || '',
        email: (row.email as string) || '',
        category: (row.category as any) || 'Smallholder Farmer',
        district: (row.district as string) || '',
        state: (row.state as string) || '',
        country: (row.country as string) || 'India',
        surveyNumber: (row.surveyNumber as string) || '',
        landArea: Number(row.landArea) || 0,
        areaUnit: (row.areaUnit as any) || 'acres',
        landType: (row.landType as any) || 'Agricultural Farmland',
        primaryRequirements: row.primaryRequirements ? JSON.parse(row.primaryRequirements as string) : [],
        soilMetrics: row.soilMetrics ? JSON.parse(row.soilMetrics as string) : undefined,
        budgetPreference: (row.budgetPreference as string) || '',
        urgency: (row.urgency as any) || 'Immediate (< 30 Days)',
        status: (row.status as any) || 'Active In-Progress',
        registeredDate: (row.registeredDate as string) || '',
        assignedAgronomist: (row.assignedAgronomist as string) || '',
        notes: (row.notes as string) || '',
        aiRecommendationSummary: (row.aiRecommendationSummary as string) || ''
      });
    }
    stmt.free();
    return results;
  }

  public addCustomer(cust: CustomerRecord): CustomerRecord {
    if (!this.db) return cust;
    const stmt = this.db.prepare(`
      INSERT OR REPLACE INTO customers (
        id, name, phone, email, category, district, state, country,
        surveyNumber, landArea, areaUnit, landType, primaryRequirements,
        soilMetrics, budgetPreference, urgency, status, registeredDate,
        assignedAgronomist, notes, aiRecommendationSummary
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run([
      cust.id,
      cust.name,
      cust.phone || '',
      cust.email || '',
      cust.category || 'Smallholder Farmer',
      cust.district || '',
      cust.state || '',
      cust.country || 'India',
      cust.surveyNumber || '',
      cust.landArea || 0,
      cust.areaUnit || 'acres',
      cust.landType || 'Agricultural Farmland',
      JSON.stringify(cust.primaryRequirements || []),
      cust.soilMetrics ? JSON.stringify(cust.soilMetrics) : null,
      cust.budgetPreference || '',
      cust.urgency || 'Immediate (< 30 Days)',
      cust.status || 'Active In-Progress',
      cust.registeredDate || new Date().toISOString().split('T')[0],
      cust.assignedAgronomist || '',
      cust.notes || '',
      cust.aiRecommendationSummary || ''
    ]);
    stmt.free();
    this.persist();
    return cust;
  }

  public updateCustomer(cust: CustomerRecord): CustomerRecord {
    return this.addCustomer(cust);
  }

  public deleteCustomer(id: string): boolean {
    if (!this.db) return false;
    const stmt = this.db.prepare('DELETE FROM customers WHERE id = ?');
    stmt.run([id]);
    stmt.free();
    this.persist();
    return true;
  }

  // --- APPLICATIONS ---
  public getApplications(): LandApplication[] {
    if (!this.db) return [];
    const results: LandApplication[] = [];
    const stmt = this.db.prepare('SELECT * FROM applications ORDER BY createdAt DESC');
    while (stmt.step()) {
      const row = stmt.getAsObject();
      results.push({
        id: row.id as string,
        createdAt: (row.createdAt as string) || new Date().toISOString(),
        applicantName: row.applicantName as string,
        phone: (row.phone as string) || '',
        applicantAddress: (row.applicantAddress as string) || '',
        landAddress: (row.landAddress as string) || '',
        landArea: Number(row.landArea) || 0,
        areaUnit: (row.areaUnit as any) || 'acres',
        landType: (row.landType as any) || 'Agricultural Farmland',
        isFarmer: Boolean(row.isFarmer),
        willingToLease: Boolean(row.willingToLease),
        restorationType: (row.restorationType as any) || 'Agricultural Restoration',
        soilTestingRequested: Boolean(row.soilTestingRequested),
        waterTestingRequested: Boolean(row.waterTestingRequested),
        photoUrl: (row.photoUrl as string) || '',
        registerCopyUrl: (row.registerCopyUrl as string) || '',
        status: (row.status as any) || 'Pending Review',
        adminNotes: (row.adminNotes as string) || '',
        assignedExpert: (row.assignedExpert as string) || '',
        aiAnalysis: row.aiAnalysis ? JSON.parse(row.aiAnalysis as string) : undefined
      });
    }
    stmt.free();
    return results;
  }

  public addApplication(app: LandApplication): LandApplication {
    if (!this.db) return app;
    const stmt = this.db.prepare(`
      INSERT OR REPLACE INTO applications (
        id, createdAt, applicantName, phone, applicantAddress, landAddress,
        landArea, areaUnit, landType, isFarmer, willingToLease, restorationType,
        soilTestingRequested, waterTestingRequested, photoUrl, registerCopyUrl,
        status, adminNotes, assignedExpert, aiAnalysis
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run([
      app.id,
      app.createdAt,
      app.applicantName,
      app.phone,
      app.applicantAddress,
      app.landAddress,
      app.landArea || 0,
      app.areaUnit || 'acres',
      app.landType,
      app.isFarmer ? 1 : 0,
      app.willingToLease ? 1 : 0,
      app.restorationType,
      app.soilTestingRequested ? 1 : 0,
      app.waterTestingRequested ? 1 : 0,
      app.photoUrl,
      app.registerCopyUrl,
      app.status,
      app.adminNotes || '',
      app.assignedExpert || '',
      app.aiAnalysis ? JSON.stringify(app.aiAnalysis) : null
    ]);
    stmt.free();
    this.persist();
    return app;
  }

  public updateApplication(app: LandApplication): LandApplication {
    return this.addApplication(app);
  }

  public deleteApplication(id: string): boolean {
    if (!this.db) return false;
    const stmt = this.db.prepare('DELETE FROM applications WHERE id = ?');
    stmt.run([id]);
    stmt.free();
    this.persist();
    return true;
  }

  // --- GOVT PROJECTS ---
  public getGovtProjects(): GovtProject[] {
    if (!this.db) return [];
    const results: GovtProject[] = [];
    const stmt = this.db.prepare('SELECT * FROM govt_projects ORDER BY id ASC');
    while (stmt.step()) {
      const row = stmt.getAsObject();
      results.push({
        id: row.id as string,
        title: row.title as string,
        department: (row.department as string) || '',
        location: (row.location as string) || '',
        targetArea: (row.targetArea as string) || '0 Acres',
        completionPercentage: Number(row.completionPercentage) || 0,
        status: (row.status as any) || 'Planning',
        allocatedBudget: (row.allocatedBudget as string) || '₹0',
        beneficiaries: Number(row.beneficiaries) || 0,
        description: (row.description as string) || '',
        beforeImageUrl: (row.beforeImageUrl as string) || '',
        afterImageUrl: (row.afterImageUrl as string) || '',
        category: (row.category as any) || 'Waterbodies',
        lastUpdated: (row.lastUpdated as string) || ''
      });
    }
    stmt.free();
    return results;
  }

  public addGovtProject(prj: GovtProject): GovtProject {
    if (!this.db) return prj;
    const stmt = this.db.prepare(`
      INSERT OR REPLACE INTO govt_projects (
        id, title, department, location, targetArea, completionPercentage,
        status, allocatedBudget, beneficiaries, description, beforeImageUrl,
        afterImageUrl, category, lastUpdated
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run([
      prj.id,
      prj.title,
      prj.department,
      prj.location,
      prj.targetArea,
      prj.completionPercentage || 0,
      prj.status,
      prj.allocatedBudget,
      prj.beneficiaries || 0,
      prj.description,
      prj.beforeImageUrl,
      prj.afterImageUrl,
      prj.category,
      prj.lastUpdated
    ]);
    stmt.free();
    this.persist();
    return prj;
  }

  public deleteGovtProject(id: string): boolean {
    if (!this.db) return false;
    const stmt = this.db.prepare('DELETE FROM govt_projects WHERE id = ?');
    stmt.run([id]);
    stmt.free();
    this.persist();
    return true;
  }

  public clearAllGovtProjects(): boolean {
    if (!this.db) return false;
    this.db.run('DELETE FROM govt_projects');
    this.persist();
    return true;
  }

  // --- AWARENESS ARTICLES ---
  public getAwarenessArticles(): AwarenessArticle[] {
    if (!this.db) return [];
    const results: AwarenessArticle[] = [];
    const stmt = this.db.prepare('SELECT * FROM awareness_articles ORDER BY id ASC');
    while (stmt.step()) {
      const row = stmt.getAsObject();
      results.push({
        id: row.id as string,
        title: row.title as string,
        category: (row.category as any) || 'Soil Revival',
        readTime: (row.readTime as string) || '5 min',
        summary: (row.summary as string) || '',
        content: (row.content as string) || '',
        imageUrl: (row.imageUrl as string) || '',
        keyTips: row.keyTips ? JSON.parse(row.keyTips as string) : []
      });
    }
    stmt.free();
    return results;
  }

  public addAwarenessArticle(art: AwarenessArticle): AwarenessArticle {
    if (!this.db) return art;
    const stmt = this.db.prepare(`
      INSERT OR REPLACE INTO awareness_articles (
        id, title, category, readTime, summary, content, imageUrl, keyTips
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run([
      art.id,
      art.title,
      art.category,
      art.readTime,
      art.summary,
      art.content,
      art.imageUrl,
      JSON.stringify(art.keyTips || [])
    ]);
    stmt.free();
    this.persist();
    return art;
  }
}

export const sqliteDb = new SQLiteService();
