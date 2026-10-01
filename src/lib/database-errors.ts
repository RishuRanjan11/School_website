export function getDatabaseSetupError(error: unknown): string | null {
  if (!(error instanceof Error)) return null;

  if (error.message.includes('PGRST205') || error.message.includes('schema cache')) {
    return 'Required Supabase tables are missing. Run supabase_schema.sql in the Supabase SQL Editor, then retry.';
  }

  if (error.message.includes('PGRST204')) {
    return 'The Supabase database schema is out of date. Run the latest supabase_schema.sql in the Supabase SQL Editor, then retry.';
  }

  return null;
}
