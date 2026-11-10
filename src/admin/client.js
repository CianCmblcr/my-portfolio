import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL, hasBackend } from "../lib/supabase";

export const supabase = hasBackend ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
