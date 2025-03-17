import React, { useState } from "react";

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
    specificDays: [{ type: String }],
    time: [{ type: String, required: true }],
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    notes: { type: String },
  },
  { timestamps: true }
);
const Remainder = mongoose.model("Doctor", doctorSchema);
export default Remainder;
