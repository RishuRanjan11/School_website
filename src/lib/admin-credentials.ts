import fs from 'fs';
import path from 'path';
import { timingSafeEqual } from 'crypto';
import { isSupabaseConfigured, supabaseAdmin } from './supabase';

export interface AdminCredentials {
  passwordHash: string | null;
  resetTokenHash: string | null;
  resetTokenExpiresAt: string | null;
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
    return { passwordHash: null, resetTokenHash: null, resetTokenExpiresAt: null };
  }

  const stored = JSON.parse(fs.readFileSync(LOCAL_CREDENTIALS_PATH, 'utf-8')) as Partial<AdminCredentials>;
  return {
    passwordHash: stored.passwordHash ?? null,
    resetTokenHash: stored.resetTokenHash ?? null,
    resetTokenExpiresAt: stored.resetTokenExpiresAt ?? null,
  };
}

export async function getAdminCredentials(): Promise<AdminCredentials> {
  const client = getSupabaseAdmin();
  if (!client) return readLocalCredentials();

  const { data, error } = await client
    .from('admin_credentials')
    .select('password_hash, reset_token_hash, reset_token_expires_at')
    .eq('id', ADMIN_ID)
    .maybeSingle();

  if (error) throw new Error(`Failed to read admin credentials: ${error.message}`);
  return {
    passwordHash: data?.password_hash ?? null,
    resetTokenHash: data?.reset_token_hash ?? null,
    resetTokenExpiresAt: data?.reset_token_expires_at ?? null,
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
      reset_token_hash: credentials.resetTokenHash,
      reset_token_expires_at: credentials.resetTokenExpiresAt,
    });

    if (error) throw new Error(`Failed to save admin credentials: ${error.message}`);
    return;
  }

  fs.mkdirSync(path.dirname(LOCAL_CREDENTIALS_PATH), { recursive: true });
  fs.writeFileSync(LOCAL_CREDENTIALS_PATH, JSON.stringify(credentials), 'utf-8');
}

export async function consumeAdminPasswordReset(
  tokenHash: string,
  passwordHash: string
): Promise<boolean> {
  const client = getSupabaseAdmin();
  if (client) {
    const { data, error } = await client
      .from('admin_credentials')
      .update({
        password_hash: passwordHash,
        reset_token_hash: null,
        reset_token_expires_at: null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', ADMIN_ID)
      .eq('reset_token_hash', tokenHash)
      .gt('reset_token_expires_at', new Date().toISOString())
      .select('id')
      .maybeSingle();

    if (error) throw new Error(`Failed to consume admin password reset token: ${error.message}`);
    return Boolean(data);
  }

  const credentials = readLocalCredentials();
  const savedTokenHash = credentials.resetTokenHash
    ? Buffer.from(credentials.resetTokenHash, 'hex')
    : Buffer.alloc(0);
  const requestedTokenHash = Buffer.from(tokenHash, 'hex');
  const tokenMatches = savedTokenHash.length === requestedTokenHash.length
    && timingSafeEqual(savedTokenHash, requestedTokenHash);
  const expiresAt = credentials.resetTokenExpiresAt
    ? Date.parse(credentials.resetTokenExpiresAt)
    : Number.NaN;

  if (!tokenMatches || !Number.isFinite(expiresAt) || expiresAt <= Date.now()) return false;

  fs.writeFileSync(LOCAL_CREDENTIALS_PATH, JSON.stringify({
    ...credentials,
    passwordHash,
    resetTokenHash: null,
    resetTokenExpiresAt: null,
  }), 'utf-8');
  return true;
}
