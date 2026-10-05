import fs from 'fs';
import path from 'path';
import { isSupabaseConfigured, supabaseAdmin } from './supabase';
import { DEFAULT_SCHOOL_ADDRESS } from './school-address';

const LOCAL_SETTINGS_PATH = path.join(process.cwd(), 'data', 'school_settings.json');
const SETTINGS_ID = 'school';

function getSettingsClient() {
  if (!isSupabaseConfigured) return null;
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !supabaseAdmin) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is required to manage school settings.');
  }
  return supabaseAdmin;
}

export async function getSchoolAddress(): Promise<string> {
  const client = getSettingsClient();
  if (client) {
    const { data, error } = await client
      .from('school_settings')
      .select('address')
      .eq('id', SETTINGS_ID)
      .maybeSingle();

    if (error) throw new Error(`Failed to read school address: ${error.message}`);
    return data?.address ?? DEFAULT_SCHOOL_ADDRESS;
  }

  if (!fs.existsSync(LOCAL_SETTINGS_PATH)) return DEFAULT_SCHOOL_ADDRESS;
  const settings = JSON.parse(fs.readFileSync(LOCAL_SETTINGS_PATH, 'utf-8')) as { address?: unknown };
  return typeof settings.address === 'string' ? settings.address : DEFAULT_SCHOOL_ADDRESS;
}

export async function saveSchoolAddress(address: string): Promise<void> {
  const client = getSettingsClient();
  if (client) {
    const { error } = await client.from('school_settings').upsert({
      id: SETTINGS_ID,
      address,
      updated_at: new Date().toISOString(),
    });

    if (error) throw new Error(`Failed to save school address: ${error.message}`);
    return;
  }

  fs.mkdirSync(path.dirname(LOCAL_SETTINGS_PATH), { recursive: true });
  fs.writeFileSync(LOCAL_SETTINGS_PATH, JSON.stringify({ address }, null, 2), 'utf-8');
}
