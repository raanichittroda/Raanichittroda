import pg from 'pg';
import fs from 'fs';

const { Client } = pg;
const connectionString = "postgresql://postgres:chittroda@123@db.fmaqalanvoejxfefkxrp.supabase.co:5432/postgres";

async function apply() {
  const client = new Client({ connectionString });
  try {
    await client.connect();
    const sql = fs.readFileSync('safe_migration.sql', 'utf8');
    await client.query(sql);
    console.log("Safe migration applied successfully without data loss.");
  } catch (err) {
    console.error("Error applying safe migration:", err);
  } finally {
    await client.end();
  }
}

apply();
