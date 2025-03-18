import express from "express";
import {
  createAppointment,
  getAllAppointments,
  getAppointment,
  updateAppointmentStatus,
  deleteAppointment,
  checkAvailability,
} from "../controllers/appointment.controller.js";
import { verifyUser } from "../../middlewares/userverification.js";

const appointmentRouter = express.Router();

appointmentRouter.post("/", verifyUser, createAppointment);
appointmentRouter.get("/all", verifyUser, getAllAppointments);
appointmentRouter.get("/:id", verifyUser, getAppointment);
appointmentRouter.put("/:id", verifyUser, updateAppointmentStatus);
appointmentRouter.delete("/:id", verifyUser, deleteAppointment);
appointmentRouter.get("/check-availability", verifyUser, checkAvailability);
export default appointmentRouter;
