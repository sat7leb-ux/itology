import { createClient as createSupabaseJsClient } from "@supabase/supabase-js";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/lib/types";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

/**
 * Browser client — used in Client Components.
 */
export function createBrowserSupabaseClient() {
  return createSupabaseJsClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
}

/**
 * Server client — used in Server Components for reads.
 * Wraps cookies() from next/headers.
 */
export function createServerSupabaseClient() {
  const cookieStore = cookies();
  return createServerClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch {
          // Called from a Server Component with no write access — safe to ignore
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: "", ...options });
        } catch {
          // See note above
        }
      },
    },
  });
}

/**
 * Admin client — service role, server-only.
 * NEVER expose to the client. Falls back to the cookie client if the service key is absent.
 */
export function createAdminClient() {
  if (SUPABASE_SERVICE_ROLE_KEY) {
    return createSupabaseJsClient<Database>(
      SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );
  }
  // Fallback: RLS-enforced cookie client. Works with only public env vars.
  return createServerSupabaseClient();
}
