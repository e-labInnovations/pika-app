package expo.modules.pikashare

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Bundle

/**
 * Entry point for shares from other apps. It forwards the share to the launcher
 * activity in Pika's own task and closes at once.
 *
 * Why not receive shares on MainActivity directly: some apps (Google Pay) start the
 * share with startActivityForResult, and Android then ignores singleTask and puts a
 * second MainActivity inside the sender's task. That copy fights the real one for
 * the React instance, so the share works only some of the time. Starting
 * MainActivity from here with FLAG_ACTIVITY_NEW_TASK always lands in Pika's task:
 * onNewIntent if it is running, a normal launch if not.
 */
class ShareReceiverActivity : Activity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    if (savedInstanceState == null) forward()
    finish()
  }

  private fun forward() {
    val incoming = intent ?: return
    if (!ShareReader.isShareIntent(incoming)) return
    val launcher = packageManager.getLaunchIntentForPackage(packageName)?.component ?: return

    // The sender's package, kept so error messages can name it (activity.referrer
    // on MainActivity would otherwise be Pika itself).
    val sender = runCatching { referrer?.host }.getOrNull()

    val out = Intent(incoming).apply {
      component = launcher
      // Replace the sender's flags: ours put MainActivity in its own task and pass on
      // the read grant for the shared content URIs (carried in ClipData).
      flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_GRANT_READ_URI_PERMISSION
      if (sender != null) putExtra(Intent.EXTRA_REFERRER, Uri.parse("android-app://$sender"))
    }
    runCatching { startActivity(out) }
  }
}
