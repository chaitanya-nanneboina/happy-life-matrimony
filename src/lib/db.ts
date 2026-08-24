import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

// ---------------------------------------------------------------------------
// Connection
// ---------------------------------------------------------------------------

function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL environment variable is not set. " +
        "Add it to .env.local (local) and your Vercel project environment variables (production)."
    );
  }
  return neon(url);
}

// ---------------------------------------------------------------------------
// Schema initialisation  (idempotent – safe to call on every cold start)
// ---------------------------------------------------------------------------

let schemaInitialised = false;

export async function ensureSchema(): Promise<void> {
  if (schemaInitialised) return;

  const sql = getSql();

  // Create tables
  await sql`
    CREATE TABLE IF NOT EXISTS profiles (
      id            BIGSERIAL PRIMARY KEY,
      name          TEXT      NOT NULL,
      gender        TEXT      NOT NULL CHECK (gender IN ('Male', 'Female', 'Other')),
      looking_for   TEXT      NOT NULL CHECK (looking_for IN ('Male', 'Female', 'Either')),
      phone         TEXT      NOT NULL,
      state         TEXT      NOT NULL DEFAULT '',
      district      TEXT      NOT NULL DEFAULT '',
      city          TEXT      NOT NULL DEFAULT '',
      status        TEXT      NOT NULL DEFAULT 'pending'
                              CHECK (status IN ('pending', 'verified', 'rejected')),
      submitted_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS admin_users (
      id            BIGSERIAL PRIMARY KEY,
      username      TEXT UNIQUE NOT NULL,
      password_hash TEXT        NOT NULL
    )
  `;

  // Seed default admin if absent
  const rows = await sql`
    SELECT id FROM admin_users WHERE username = 'Admin' LIMIT 1
  `;
  if (rows.length === 0) {
    const hash = bcrypt.hashSync("happylifematrimony@2026", 10);
    await sql`
      INSERT INTO admin_users (username, password_hash)
      VALUES ('Admin', ${hash})
    `;
    console.log("[DB] Admin user seeded.");
  }

  schemaInitialised = true;
}

// ---------------------------------------------------------------------------
// Admin users
// ---------------------------------------------------------------------------

export async function getAdminUser(
  username: string
): Promise<{ id: number; username: string; password_hash: string } | null> {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`
    SELECT id, username, password_hash
    FROM   admin_users
    WHERE  username = ${username}
    LIMIT  1
  `;
  return (rows[0] as { id: number; username: string; password_hash: string }) ?? null;
}

// ---------------------------------------------------------------------------
// Profiles – create
// ---------------------------------------------------------------------------

export async function createProfile(data: {
  name: string;
  gender: string;
  looking_for: string;
  phone: string;
  state: string;
  district: string;
  city: string;
}): Promise<number> {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`
    INSERT INTO profiles (name, gender, looking_for, phone, state, district, city)
    VALUES (
      ${data.name},
      ${data.gender},
      ${data.looking_for},
      ${data.phone},
      ${data.state},
      ${data.district},
      ${data.city}
    )
    RETURNING id
  `;
  return (rows[0] as { id: number }).id;
}

// ---------------------------------------------------------------------------
// Profiles – update status
// ---------------------------------------------------------------------------

export async function updateProfileStatus(
  id: number,
  status: "verified" | "rejected"
): Promise<void> {
  await ensureSchema();
  const sql = getSql();
  await sql`
    UPDATE profiles SET status = ${status} WHERE id = ${id}
  `;
}

// ---------------------------------------------------------------------------
// Profiles – list / search / paginate
// ---------------------------------------------------------------------------

export interface ProfileRow {
  id: number;
  name: string;
  gender: string;
  looking_for: string;
  phone: string;
  state: string;
  district: string;
  city: string;
  status: string;
  submitted_at: string;
}

export async function getProfiles(opts: {
  search?: string;
  gender?: string;
  status?: string;
  page?: number;
  limit?: number;
}): Promise<{ profiles: ProfileRow[]; total: number; page: number; limit: number }> {
  await ensureSchema();
  const sql = getSql();

  const { search = "", gender = "", status = "", page = 1, limit = 20 } = opts;
  const offset = (page - 1) * limit;

  // Build WHERE conditions dynamically
  // neon tagged-template literals don't support dynamic fragment composition
  // the cleanest approach compatible with the serverless driver is to
  // run different query variants based on the filter combination.

  type CountRow = { count: string };

  let countRows: CountRow[];
  let dataRows: ProfileRow[];

  if (search && gender && status) {
    const like = `%${search}%`;
    countRows = await sql`
      SELECT COUNT(*) AS count FROM profiles
      WHERE  (name ILIKE ${like} OR phone ILIKE ${like})
      AND    gender = ${gender}
      AND    status = ${status}
    ` as CountRow[];
    dataRows = await sql`
      SELECT * FROM profiles
      WHERE  (name ILIKE ${like} OR phone ILIKE ${like})
      AND    gender = ${gender}
      AND    status = ${status}
      ORDER  BY submitted_at DESC
      LIMIT  ${limit} OFFSET ${offset}
    ` as ProfileRow[];
  } else if (search && gender) {
    const like = `%${search}%`;
    countRows = await sql`
      SELECT COUNT(*) AS count FROM profiles
      WHERE  (name ILIKE ${like} OR phone ILIKE ${like})
      AND    gender = ${gender}
    ` as CountRow[];
    dataRows = await sql`
      SELECT * FROM profiles
      WHERE  (name ILIKE ${like} OR phone ILIKE ${like})
      AND    gender = ${gender}
      ORDER  BY submitted_at DESC
      LIMIT  ${limit} OFFSET ${offset}
    ` as ProfileRow[];
  } else if (search && status) {
    const like = `%${search}%`;
    countRows = await sql`
      SELECT COUNT(*) AS count FROM profiles
      WHERE  (name ILIKE ${like} OR phone ILIKE ${like})
      AND    status = ${status}
    ` as CountRow[];
    dataRows = await sql`
      SELECT * FROM profiles
      WHERE  (name ILIKE ${like} OR phone ILIKE ${like})
      AND    status = ${status}
      ORDER  BY submitted_at DESC
      LIMIT  ${limit} OFFSET ${offset}
    ` as ProfileRow[];
  } else if (gender && status) {
    countRows = await sql`
      SELECT COUNT(*) AS count FROM profiles
      WHERE  gender = ${gender} AND status = ${status}
    ` as CountRow[];
    dataRows = await sql`
      SELECT * FROM profiles
      WHERE  gender = ${gender} AND status = ${status}
      ORDER  BY submitted_at DESC
      LIMIT  ${limit} OFFSET ${offset}
    ` as ProfileRow[];
  } else if (search) {
    const like = `%${search}%`;
    countRows = await sql`
      SELECT COUNT(*) AS count FROM profiles
      WHERE  name ILIKE ${like} OR phone ILIKE ${like}
    ` as CountRow[];
    dataRows = await sql`
      SELECT * FROM profiles
      WHERE  name ILIKE ${like} OR phone ILIKE ${like}
      ORDER  BY submitted_at DESC
      LIMIT  ${limit} OFFSET ${offset}
    ` as ProfileRow[];
  } else if (gender) {
    countRows = await sql`
      SELECT COUNT(*) AS count FROM profiles WHERE gender = ${gender}
    ` as CountRow[];
    dataRows = await sql`
      SELECT * FROM profiles WHERE gender = ${gender}
      ORDER  BY submitted_at DESC
      LIMIT  ${limit} OFFSET ${offset}
    ` as ProfileRow[];
  } else if (status) {
    countRows = await sql`
      SELECT COUNT(*) AS count FROM profiles WHERE status = ${status}
    ` as CountRow[];
    dataRows = await sql`
      SELECT * FROM profiles WHERE status = ${status}
      ORDER  BY submitted_at DESC
      LIMIT  ${limit} OFFSET ${offset}
    ` as ProfileRow[];
  } else {
    countRows = await sql`
      SELECT COUNT(*) AS count FROM profiles
    ` as CountRow[];
    dataRows = await sql`
      SELECT * FROM profiles
      ORDER  BY submitted_at DESC
      LIMIT  ${limit} OFFSET ${offset}
    ` as ProfileRow[];
  }

  const total = parseInt(countRows[0]?.count ?? "0", 10);
  return { profiles: dataRows, total, page, limit };
}

// ---------------------------------------------------------------------------
// Profiles – delete
// ---------------------------------------------------------------------------

export async function deleteProfile(id: number): Promise<void> {
  await ensureSchema();
  const sql = getSql();
  await sql`DELETE FROM profiles WHERE id = ${id}`;
}
