import { supabase } from "./supabase";
import imageCompression from "browser-image-compression";

/**
 * Uploads a file (image or video) to Supabase Storage 'media' bucket
 * Returns public URL of uploaded file.
 */
export async function uploadMediaFile(file: File, folder: string = "uploads"): Promise<string> {
  let fileToUpload = file;

  // Compress image if it's an image and greater than 200KB
  if (file.type.startsWith("image/") && file.size > 200 * 1024) {
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: "image/webp" as const,
      };
      fileToUpload = await imageCompression(file, options);
    } catch (e) {
      console.warn("Image compression skipped or failed", e);
    }
  }

  const cleanName = fileToUpload.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const ext = fileToUpload.name.split(".").pop() || "png";
  const path = `${folder}/${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`;

  const { data, error } = await supabase.storage.from("media").upload(path, fileToUpload, {
    cacheControl: "3600",
    upsert: true,
  });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  const { data: publicUrlData } = supabase.storage.from("media").getPublicUrl(data.path);
  return publicUrlData.publicUrl;
}
