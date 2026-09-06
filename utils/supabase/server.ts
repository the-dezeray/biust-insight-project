import { createServerClient } from '@supabase/ssr';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import type { SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseEnv, getServiceRoleKey } from './env';

export async function createClient(): Promise<SupabaseClient | null> {
  const env = getSupabaseEnv();
  if (!env) return null;

  const cookieStore = await cookies();

  return createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Called from a Server Component - safe to ignore when middleware
          // is refreshing sessions.
        }
      },
    },
  });
}

// Service-role client: bypasses RLS. Only use in trusted server-side code.
export function createAdminClient(): SupabaseClient | null {
  const env = getSupabaseEnv();
  const serviceKey = getServiceRoleKey();
  if (!env || !serviceKey) return null;
  return createSupabaseClient(env.url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
