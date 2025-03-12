import express from "express";
import {
  createAppointment,
  getAllAppointments,
  getAppointment,
  updateAppointmentStatus,
  getUserAppointments,
  getDoctorAppointments,
  deleteAppointment,
} from "../controllers/appointment.controller.js";

const appointmentRouter = express.Router();

appointmentRouter.post("/", createAppointment);
appointmentRouter.get("/", getAllAppointments);
appointmentRouter.get("/:id", getAppointment);
appointmentRouter.put("/:id", updateAppointmentStatus);
appointmentRouter.delete("/:id", deleteAppointment);
export default appointmentRouter;
