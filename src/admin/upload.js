import { MEDIA_BUCKET } from "../lib/supabase";
import { supabase } from "./client";

const MAX_BYTES = 20 * 1024 * 1024;

// Uploads an image to the public media bucket and returns its URL.
export const uploadImage = async (file) => {
  if (!file.type.startsWith("image/")) throw new Error(`${file.name} isn't an image.`);
  if (file.size > MAX_BYTES) throw new Error(`${file.name} is over 20 MB.`);

  const ext = file.name.includes(".") ? file.name.split(".").pop().toLowerCase() : "png";
  const base =
    file.name
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 40) || "image";
  const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 7)}-${base}.${ext}`;

  const { error } = await supabase.storage
    .from(MEDIA_BUCKET)
    .upload(path, file, { cacheControl: "31536000", contentType: file.type });
  if (error) throw error;

  return supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl;
};
