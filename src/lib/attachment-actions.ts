import { Platform } from "react-native";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import * as SecureStore from "expo-secure-store";
import { resolveMediaUrl } from "./media-upload";

const DOWNLOAD_DIR_KEY = "pika.downloadDirectoryUri";
const SUBFOLDER = "Pika";

type AttachmentMedia = {
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
};

function safeFilename(name: string | null | undefined): string {
  const raw = (name ?? "").trim() || `attachment-${Date.now()}`;
  // Strip path separators
  return raw.replace(/[\\/]/g, "_");
}

function ensureExtension(filename: string, mimeType: string | null | undefined): string {
  if (filename.includes(".")) return filename;
  if (!mimeType) return filename;
  const map: Record<string, string> = {
    "application/pdf": "pdf",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "image/webp": "webp",
    "text/plain": "txt",
    "application/msword": "doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
    "application/vnd.ms-excel": "xls",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  };
  const ext = map[mimeType];
  return ext ? `${filename}.${ext}` : filename;
}

/** Download the remote media file to the app cache. Returns local cache URI. */
async function fetchToCache(media: AttachmentMedia): Promise<{ cacheUri: string; filename: string }> {
  const resolved = resolveMediaUrl(media.url ?? null);
  if (!resolved) throw new Error("This attachment has no download URL.");

  const filename = ensureExtension(safeFilename(media.filename), media.mimeType);
  const cacheDir = FileSystem.cacheDirectory;
  if (!cacheDir) throw new Error("Cache directory unavailable.");
  const dest = `${cacheDir}${filename}`;

  // Overwrite existing cached file with same name — prevents stale files
  try {
    const info = await FileSystem.getInfoAsync(dest);
    if (info.exists) await FileSystem.deleteAsync(dest, { idempotent: true });
  } catch {
    /* ignore */
  }

  const result = await FileSystem.downloadAsync(resolved, dest);
  if (result.status < 200 || result.status >= 300) {
    throw new Error(`Download failed (status ${result.status}).`);
  }
  return { cacheUri: result.uri, filename };
}

/**
 * Share the attachment through the native share sheet (iOS + Android).
 * Works for any file type — download to cache first, then hand off.
 */
export async function shareAttachment(media: AttachmentMedia): Promise<void> {
  const isAvailable = await Sharing.isAvailableAsync();
  if (!isAvailable) throw new Error("Sharing is not available on this device.");

  const { cacheUri, filename } = await fetchToCache(media);
  await Sharing.shareAsync(cacheUri, {
    mimeType: media.mimeType ?? undefined,
    dialogTitle: filename,
    UTI: media.mimeType ?? undefined,
  });
}

/**
 * Download the attachment to user-visible storage.
 *
 * iOS:     presents the share sheet so the user can "Save to Files".
 * Android: uses a persisted StorageAccessFramework directory (prompts the user
 *          to pick one on first use, e.g. Downloads) and writes the file into a
 *          `Pika/` subfolder inside it.
 *
 * Returns a short human label describing where it was saved (for a toast/alert),
 * or null if the user cancelled an intermediate step.
 */
export async function downloadAttachment(
  media: AttachmentMedia,
): Promise<{ savedTo: string } | null> {
  if (Platform.OS === "ios") {
    const isAvailable = await Sharing.isAvailableAsync();
    if (!isAvailable) throw new Error("Sharing is not available on this device.");
    const { cacheUri, filename } = await fetchToCache(media);
    await Sharing.shareAsync(cacheUri, {
      mimeType: media.mimeType ?? undefined,
      dialogTitle: `Save ${filename}`,
      UTI: media.mimeType ?? undefined,
    });
    return { savedTo: "Files app" };
  }

  // Android: SAF
  const { SAF } = { SAF: FileSystem.StorageAccessFramework };
  let parentUri = await loadDownloadDirectory();

  if (parentUri) {
    // Verify the stored URI is still valid
    try {
      await SAF.readDirectoryAsync(parentUri);
    } catch {
      parentUri = null;
      await SecureStore.deleteItemAsync(DOWNLOAD_DIR_KEY);
    }
  }

  if (!parentUri) {
    const perm = await SAF.requestDirectoryPermissionsAsync();
    if (!perm.granted) return null;
    parentUri = perm.directoryUri;
    await SecureStore.setItemAsync(DOWNLOAD_DIR_KEY, parentUri);
  }

  // Ensure a Pika/ subdirectory exists inside the chosen folder.
  // SAF doesn't expose mkdir-then-exists cleanly, so we look first.
  let targetDirUri = parentUri;
  try {
    const children = await SAF.readDirectoryAsync(parentUri);
    const existing = children.find(
      (u) => decodeURIComponent(u).toLowerCase().endsWith(`/${SUBFOLDER.toLowerCase()}`),
    );
    if (existing) {
      targetDirUri = existing;
    } else {
      // makeDirectoryAsync isn't supported on SAF URIs across all Android
      // versions, so fall back to writing directly into the chosen directory
      // if we can't create a subfolder.
      try {
        targetDirUri = await SAF.makeDirectoryAsync(parentUri, SUBFOLDER);
      } catch {
        targetDirUri = parentUri;
      }
    }
  } catch {
    /* keep targetDirUri = parentUri */
  }

  const { cacheUri, filename } = await fetchToCache(media);
  const mime = media.mimeType || "application/octet-stream";
  const base = filename.replace(/\.[^.]+$/, "");

  const newFileUri = await SAF.createFileAsync(targetDirUri, base, mime);
  const data = await FileSystem.readAsStringAsync(cacheUri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  await FileSystem.writeAsStringAsync(newFileUri, data, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const label =
    targetDirUri === parentUri ? `selected folder / ${filename}` : `${SUBFOLDER}/${filename}`;
  return { savedTo: label };
}

async function loadDownloadDirectory(): Promise<string | null> {
  try {
    return await SecureStore.getItemAsync(DOWNLOAD_DIR_KEY);
  } catch {
    return null;
  }
}

/** Forget the stored Android download directory (useful if the user wants to pick a new one). */
export async function resetDownloadDirectory(): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(DOWNLOAD_DIR_KEY);
  } catch {
    /* ignore */
  }
}
