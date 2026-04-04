import { API_URL } from "./constants";
import { storage } from "./storage";

/**
 * Payload generates media URLs using its own serverURL (e.g. http://localhost:3333).
 * On a physical device/emulator, localhost points to the device itself, not the server.
 * This replaces the URL's origin with the app's API_URL so images load correctly.
 */
export function resolveMediaUrl(payloadUrl: string | null | undefined): string | null {
  if (!payloadUrl) return null;
  // Local file URIs (from image picker) — return as-is
  if (!payloadUrl.startsWith("http")) return payloadUrl;
  try {
    const { pathname } = new URL(payloadUrl);
    const { origin } = new URL(API_URL);
    return `${origin}${pathname}`;
  } catch {
    return payloadUrl;
  }
}

export type UploadedMedia = {
  id: string;
  url: string;
  thumbnailURL?: string | null;
};

/**
 * Upload a local file to Payload's /api/media endpoint.
 *
 * Payload REST upload format:
 *   POST /api/media
 *   Content-Type: multipart/form-data  (set automatically by fetch)
 *   Authorization: JWT <token>
 *   file: <binary>
 *   _payload: JSON string of any additional collection fields
 */
export async function uploadMedia(
  localUri: string,
  filename: string,
  mimeType: string,
  alt?: string,
): Promise<UploadedMedia> {
  const token = await storage.getToken();

  const formData = new FormData();
  // React Native FormData accepts { uri, name, type } as a file entry
  formData.append("file", {
    uri: localUri,
    name: filename,
    type: mimeType,
  } as unknown as Blob);
  if (alt) formData.append("alt", alt);

  const res = await fetch(`${API_URL}/api/media`, {
    method: "POST",
    headers: {
      // Do NOT set Content-Type — fetch sets it with the boundary automatically
      ...(token ? { Authorization: `JWT ${token}` } : {}),
    },
    body: formData,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.errors?.[0]?.message ?? body?.message ?? "Upload failed");
  }

  const data = await res.json();
  const doc = data.doc ?? data;
  return {
    id: doc.id,
    url: doc.url,
    thumbnailURL: doc.thumbnailURL ?? null,
  };
}
