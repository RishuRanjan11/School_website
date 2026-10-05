import fs from 'fs';
import path from 'path';
import { isSupabaseConfigured, supabaseAdmin } from './supabase';

export interface AdminCredentials {
  passwordHash: string | null;
}

const LOCAL_CREDENTIALS_PATH = path.join(process.cwd(), 'data', 'admin_credentials.json');
const ADMIN_ID = 'admin-1';

function getSupabaseAdmin() {
  if (!isSupabaseConfigured) return null;
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !supabaseAdmin) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is required for admin password management.');
  }
  return supabaseAdmin;
}

function readLocalCredentials(): AdminCredentials {
  if (!fs.existsSync(LOCAL_CREDENTIALS_PATH)) {
    return { passwordHash: null };
  }

  const stored = JSON.parse(fs.readFileSync(LOCAL_CREDENTIALS_PATH, 'utf-8')) as Partial<AdminCredentials>;
  return {
    passwordHash: stored.passwordHash ?? null,
  };
}

export async function getAdminCredentials(): Promise<AdminCredentials> {
  const client = getSupabaseAdmin();
  if (!client) return readLocalCredentials();

  const { data, error } = await client
    .from('admin_credentials')
    .select('password_hash')
    .eq('id', ADMIN_ID)
    .maybeSingle();

  if (error) throw new Error(`Failed to read admin credentials: ${error.message}`);
  return {
    passwordHash: data?.password_hash ?? null,
  };
}

export async function saveAdminCredentials(
  updates: Partial<AdminCredentials>
): Promise<void> {
  const credentials = { ...await getAdminCredentials(), ...updates };
  const client = getSupabaseAdmin();

  if (client) {
    const { error } = await client.from('admin_credentials').upsert({
      id: ADMIN_ID,
      password_hash: credentials.passwordHash,
    });

    if (error) throw new Error(`Failed to save admin credentials: ${error.message}`);
    return;
  }

  fs.mkdirSync(path.dirname(LOCAL_CREDENTIALS_PATH), { recursive: true });
  fs.writeFileSync(LOCAL_CREDENTIALS_PATH, JSON.stringify(credentials), 'utf-8');
}
