import * as Notifications from 'expo-notifications';

const PREFIX = 'reminder-';

type Schedulable = { id: string; title: string; amount?: string | null; type?: string | null; nextDueDate?: string | null };

/**
 * Local notifications at 9:00 on each tracked reminder's due day. Rescheduled from
 * scratch whenever the list changes, so moved or deleted reminders don't linger.
 */
export async function scheduleReminderNotifications(reminders: Schedulable[]): Promise<void> {
  try {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') return;
    const scheduled = await Notifications.getAllScheduledNotificationsAsync();
    await Promise.all(
      scheduled.filter((n) => n.identifier.startsWith(PREFIX)).map((n) => Notifications.cancelScheduledNotificationAsync(n.identifier)),
    );
    for (const r of reminders) {
      if (!r.nextDueDate) continue;
      const at = new Date(r.nextDueDate);
      at.setHours(9, 0, 0, 0);
      if (at.getTime() <= Date.now()) continue;
      const amount = r.amount ? ` ₹${parseFloat(r.amount).toFixed(0)}` : '';
      await Notifications.scheduleNotificationAsync({
        identifier: `${PREFIX}${r.id}`,
        content: {
          title: r.type === 'income' ? `Expected today: ${r.title}${amount}` : `Due today: ${r.title}${amount}`,
          body: 'Pika marks it done when the transaction shows up.',
          data: { url: 'pika://' },
        },
        trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: at, channelId: 'reminders' },
      });
    }
  } catch {
    // Notifications are a convenience; the Home card still shows what's due.
  }
}
