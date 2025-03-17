import Reminder from '../models/reminder.js';
import sendEmail from './emailService.js';

const sendDailyReminders = async () => {
  const currentDate = new Date();
  const reminders = await Reminder.find({
    startDate: { $lte: currentDate },
    endDate: { $gte: currentDate },
    frequency: "daily",
  }).populate("userId");

  for (let reminder of reminders) {
    const user = reminder.userId;
    await sendEmail(user, reminder);
  }
};

const sendWeeklyReminders = async () => {
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay(); // 0-6 (Sunday to Saturday)

  const reminders = await Reminder.find({
    startDate: { $lte: currentDate },
    endDate: { $gte: currentDate },
    frequency: "weekly",
  }).populate("userId");

  for (let reminder of reminders) {
    const user = reminder.userId;
    if (reminder.specificDays.includes(dayOfWeek.toString())) {
      await sendEmail(user, reminder);
    }
  }
};

export { sendDailyReminders, sendWeeklyReminders };
