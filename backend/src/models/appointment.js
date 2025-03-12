import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    appointmentDate: { type: Date, required: true }, // Date of appointment
    appointmentDay: { type: String, required: true }, // e.g., "Monday", "Tuesday"
    appointmentTime: { type: String, required: true }, // e.g., "14:30" (24-hour format)
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
      default: "Pending",
    },
    notes: { type: String },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
export { Appointment };
// appointmentSchema.pre('save', function (next) {
//   const dayOfWeek = this.appointmentDate.toLocaleString('en-US', { weekday: 'long' });
//   this.appointmentDay = dayOfWeek;
//   next();
// });

// .........

// appointmentSchemaconst appointments = await Appointment.find({
//   appointmentDay: 'Monday',
//   appointmentTime: '14:30'
// });
