import express from "express";
import {
  createDoctor,
  deleteDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
} from "../controllers/doctor.controller.js";
import { upload } from "../../middlewares/multer.js";

const doctorRouter = express.Router();

doctorRouter.post("/create", upload.single("profileImage"), createDoctor);
doctorRouter.get("/doctors", getAllDoctors);
doctorRouter.get("/doctor/:id", getDoctorById);
doctorRouter.post("/edit/:id", upload.single("profileImage"), updateDoctor);
doctorRouter.delete("/:id", deleteDoctor);

export { doctorRouter };
