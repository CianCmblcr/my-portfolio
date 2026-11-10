export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// False when the env vars are missing; the site then runs on default content.
export const hasBackend = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const CONTENT_TABLE = "site_content";
export const CONTENT_ID = "main";
export const MEDIA_BUCKET = "media";

// Public read through the REST API, so visitors don't download the full
// Supabase client (only /admin loads it).
export const fetchSavedContent = async () => {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${CONTENT_TABLE}?id=eq.${CONTENT_ID}&select=data`, {
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
  });
  if (!res.ok) throw new Error(`Content request failed (${res.status})`);
  const rows = await res.json();
  return rows[0]?.data ?? null;
};
