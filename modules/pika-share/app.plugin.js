/**
 * Keeps the launcher activity singleTask, so a share forwarded by
 * ShareReceiverActivity (the share target, declared in this module's own
 * AndroidManifest.xml) reaches a running app through onNewIntent instead of a
 * second activity.
 *
 * Share intent filters used to sit on the launcher activity. They are removed
 * here: apps that share with startActivityForResult (Google Pay) made Android
 * open a second MainActivity inside their own task.
 *
 * The launcher activity is found from the manifest rather than by name, so this
 * works for both the prod and dev application ids.
 */
const { withAndroidManifest } = require('expo/config-plugins');

const SHARE_ACTIONS = ['android.intent.action.SEND', 'android.intent.action.SEND_MULTIPLE'];

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
    activity['intent-filter'] = (activity['intent-filter'] ?? []).filter(
      (f) => !SHARE_ACTIONS.some((a) => hasAction(f, a)),
    );
    return cfg;
  });
}

module.exports = withPikaShare;
