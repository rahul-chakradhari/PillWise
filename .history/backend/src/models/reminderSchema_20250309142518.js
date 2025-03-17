import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    medicineName: { type: String, required: true },
    dosage: { type: String, required: true },
    frequency: {
      type: String,
      required: true,
      enum: ["daily", "weekly", "specific_times"],
    },
    specificDays: [{ type: String }], // e.g., ['Monday', 'Wednesday'] for weekly reminders
    time: [{ type: String, required: true }], // e.g., ["08:00", "20:00"]
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reminder", reminderSchema);
