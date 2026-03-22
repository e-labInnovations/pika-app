/**
 * Share Intent handler
 *
 * This module provides helpers for processing content shared into Pika
 * from other apps (images of receipts, transaction text, URLs).
 *
 * Usage: wrap your root navigator with <ShareIntentProvider> from
 * expo-share-intent, then call useShareIntent() in a screen to react
 * to incoming shared content.
 *
 * The actual AI-parsing logic (text → transaction, image → transaction)
 * will be wired up here once the AI service endpoints are implemented.
 */

export type SharePayload =
  | { type: 'text'; value: string }
  | { type: 'image'; uri: string; mimeType: string }
  | { type: 'url'; value: string };

/**
 * Normalises the raw expo-share-intent payload into a typed SharePayload.
 * TODO: call useTextToTransaction / useImageToTransaction from the AI service
 * once the user is authenticated and sharing into the app.
 */
export function parseShareIntent(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intent: any,
): SharePayload | null {
  if (!intent) return null;

  if (intent.files?.length) {
    const file = intent.files[0];
    return {
      type: 'image',
      uri: file.path ?? file.uri,
      mimeType: file.mimeType ?? 'image/jpeg',
    };
  }

  if (intent.webUrl) {
    return { type: 'url', value: intent.webUrl };
  }

  if (intent.text) {
    return { type: 'text', value: intent.text };
  }

  return null;
}
