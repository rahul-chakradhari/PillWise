import { Appointment } from "../models/appointment.js";

// Create a new appointment
export const createAppointment = async (req, res) => {
  try {
    const { userId, doctorId, appointmentDate, appointmentTime } = req.body;

    // Create appointment date object
    const date = new Date(appointmentDate);
    const appointmentDay = date.toLocaleString("en-US", { weekday: "long" });

    // Create new appointment
    const appointment = await Appointment.create({
      userId,
      doctorId,
      appointmentDate: date,
      appointmentDay,
      appointmentTime,
      status: "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating appointment",
      error: error.message,
    });
  }
};

// Get all appointments
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("userId", "name email")
      .populate("doctorId", "name specialization");

    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching appointments",
      error: error.message,
    });
  }
};

// Get single appointment
export const getAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id)
      .populate("userId", "name email")
      .populate("doctorId", "name specialization");

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching appointment",
      error: error.message,
    });
  }
};

// Update appointment status
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment status updated successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating appointment status",
      error: error.message,
    });
  }
};

export const getUserAppointments = async (req, res) => {
  try {
    const { userId } = req.params;

    const appointments = await Appointment.find({ userId })
      .populate("doctorId", "name specialization")
      .sort({ appointmentDate: -1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user appointments",
      error: error.message,
    });
  }
};

export const getDoctorAppointments = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const appointments = await Appointment.find({ doctorId })
      .populate("userId", "name email")
      .sort({ appointmentDate: -1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching doctor appointments",
      error: error.message,
    });
  }
};

// Delete appointment
export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByIdAndDelete(id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting appointment",
      error: error.message,
    });
  }
};

export const checkAvailability = async (req, res) => {
  const { doctorId, appointmentDate, appointmentTime } = req.query;

  // Log the incoming parameters for debugging
  console.log("Received query parameters:", req.query);

  // Validate parameters
  if (!doctorId || !appointmentDate || !appointmentTime) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required parameters." });
  }

  // Ensure doctorId is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(doctorId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid doctor ID." });
  }

  try {
    // Query to check if the doctor has an appointment at the given date and time
    const existingAppointment = await Appointment.findOne({
      doctorId: mongoose.Types.ObjectId(doctorId), // Ensure ObjectId conversion
      appointmentDate,
      appointmentTime,
    });

    // If an existing appointment is found, the slot is not available
    if (existingAppointment) {
      return res.status(200).json({ isAvailable: false });
    }

    // If no existing appointment is found, the slot is available
    return res.status(200).json({ isAvailable: true });
  } catch (error) {
    console.error("Error checking availability:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error fetching appointment." });
  }
};
