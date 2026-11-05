/**
 * Makes Pika a share target on Android: SEND / SEND_MULTIPLE intent filters for
 * text, images and PDFs on the launcher activity, which is singleTask so a share
 * while the app is open arrives through onNewIntent instead of a second activity.
 *
 * The launcher activity is found from the manifest rather than by name, so this
 * works for both the prod and dev application ids.
 */
const { withAndroidManifest } = require('expo/config-plugins');

const MIME_TYPES = ['text/*', 'image/*', 'application/pdf'];
const ACTIONS = ['android.intent.action.SEND', 'android.intent.action.SEND_MULTIPLE'];

const hasAction = (filter, name) =>
  (filter.action ?? []).some((a) => a.$['android:name'] === name);

function isLauncher(activity) {
  return (activity['intent-filter'] ?? []).some(
    (f) =>
      hasAction(f, 'android.intent.action.MAIN') &&
      (f.category ?? []).some((c) => c.$['android:name'] === 'android.intent.category.LAUNCHER'),
  );
}

function withPikaShare(config) {
  return withAndroidManifest(config, (cfg) => {
    const app = cfg.modResults.manifest.application?.[0];
    const activity = app?.activity?.find(isLauncher);
    if (!activity) throw new Error('pika-share: no launcher activity in AndroidManifest');

    activity.$['android:launchMode'] = 'singleTask';

    const filters = (activity['intent-filter'] ??= []);
    for (const action of ACTIONS) {
      if (filters.some((f) => hasAction(f, action))) continue;
      filters.push({
        action: [{ $: { 'android:name': action } }],
        category: [{ $: { 'android:name': 'android.intent.category.DEFAULT' } }],
        data: MIME_TYPES.map((t) => ({ $: { 'android:mimeType': t } })),
      });
    }
    return cfg;
  });
}

module.exports = withPikaShare;
