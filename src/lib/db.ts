import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import path from "path";
import fs from "fs";

const ABSOLUTE_DB_PATH = path.join(process.cwd(), "data", "happylife.db");

// Ensure data directory exists
const dataDir = path.dirname(ABSOLUTE_DB_PATH);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(ABSOLUTE_DB_PATH);
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
    initializeSchema(db);
  }
  return db;
}

function initializeSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      gender TEXT NOT NULL CHECK(gender IN ('Male', 'Female', 'Other')),
      looking_for TEXT NOT NULL CHECK(looking_for IN ('Male', 'Female', 'Either')),
      phone TEXT NOT NULL,
      state TEXT NOT NULL DEFAULT '',
      district TEXT NOT NULL DEFAULT '',
      city TEXT NOT NULL DEFAULT '',
      submitted_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
    );

    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL
    );
  `);

  // Safe migration: add status and location columns if they don't exist yet
  try {
    db.exec(`ALTER TABLE profiles ADD COLUMN status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'verified', 'rejected'))`);
    console.log("[DB] Migrated: added status column to profiles.");
  } catch { }

  try {
    db.exec(`ALTER TABLE profiles ADD COLUMN state TEXT NOT NULL DEFAULT ''`);
    db.exec(`ALTER TABLE profiles ADD COLUMN district TEXT NOT NULL DEFAULT ''`);
    db.exec(`ALTER TABLE profiles ADD COLUMN city TEXT NOT NULL DEFAULT ''`);
    console.log("[DB] Migrated: added location columns to profiles.");
  } catch { }

  // Seed admin user if not exists
  const adminExists = db
    .prepare("SELECT id FROM admin_users WHERE username = ?")
    .get("Admin");

  if (!adminExists) {
    const hash = bcrypt.hashSync("happylifematrimony@2026", 10);
    db.prepare("INSERT INTO admin_users (username, password_hash) VALUES (?, ?)").run(
      "Admin",
      hash
    );
    console.log("[DB] Admin user seeded.");
  }
}

export function getAdminUser(username: string) {
  const db = getDb();
  return db
    .prepare("SELECT * FROM admin_users WHERE username = ?")
    .get(username) as { id: number; username: string; password_hash: string } | undefined;
}

export function createProfile(data: {
  name: string;
  gender: string;
  looking_for: string;
  phone: string;
  state: string;
  district: string;
  city: string;
}) {
  const db = getDb();
  const result = db
    .prepare(
      "INSERT INTO profiles (name, gender, looking_for, phone, state, district, city) VALUES (?, ?, ?, ?, ?, ?, ?)"
    )
    .run(data.name, data.gender, data.looking_for, data.phone, data.state, data.district, data.city);
  return result.lastInsertRowid;
}



export function updateProfileStatus(id: number, status: "verified" | "rejected") {
  const db = getDb();
  db.prepare("UPDATE profiles SET status = ? WHERE id = ?")
    .run(status, id);
}

export function getProfiles(opts: {
  search?: string;
  gender?: string;
  status?: string;
  page?: number;
  limit?: number;
}) {
  const db = getDb();
  const { search = "", gender = "", status = "", page = 1, limit = 20 } = opts;
  const offset = (page - 1) * limit;

  let where = "WHERE 1=1";
  const params: (string | number)[] = [];

  if (search) {
    where += " AND (name LIKE ? OR phone LIKE ?)";
    params.push(`%${search}%`, `%${search}%`);
  }
  if (gender) {
    where += " AND gender = ?";
    params.push(gender);
  }
  if (status) {
    where += " AND status = ?";
    params.push(status);
  }


  const countRow = db
    .prepare(`SELECT COUNT(*) as count FROM profiles ${where}`)
    .get(...params) as { count: number };

  const rows = db
    .prepare(
      `SELECT * FROM profiles ${where} ORDER BY submitted_at DESC LIMIT ? OFFSET ?`
    )
    .all(...params, limit, offset);

  return { profiles: rows, total: countRow.count, page, limit };
}

export function deleteProfile(id: number) {
  const db = getDb();
  db.prepare("DELETE FROM profiles WHERE id = ?").run(id);
}
