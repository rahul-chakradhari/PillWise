import cron from "node-cron";
import {
  sendDailyReminders,
  sendWeeklyReminders,
} from "../services/reminderService.js";

const setupCronJobs = () => {
  // Schedule the task to run daily at 8 AM
  cron.schedule("0 8 * * *", async () => {
    console.log("Running daily reminder job...");
    await sendDailyReminders();
  });

  // Schedule the task to run weekly (every Monday at 8 AM)
  cron.schedule("0 8 * * 1", async () => {
    console.log("Running weekly reminder job...");
    await sendWeeklyReminders();
  });
};

export default setupCronJobs;
