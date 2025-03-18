import express from "express";
import {
  createDoctor,
  deleteDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
} from "../controllers/doctor.controller.js";
import { upload } from "../../middlewares/multer.js";
import { verifyUser } from "../../middlewares/userverification.js";

const doctorRouter = express.Router();

doctorRouter.post("/add", upload.single("profileImage"), createDoctor);
doctorRouter.get("/doctors", getAllDoctors);
doctorRouter.get("/doctor/:id", getDoctorById);
doctorRouter.post(
  "/edit/:id",
  verifyUser,
  upload.single("profileImage"),
  updateDoctor
);
doctorRouter.delete("/:id", verifyUser, deleteDoctor);

export { doctorRouter };
