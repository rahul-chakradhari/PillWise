import express from "express";
import {
  createDoctor,
  deleteDoctor,
  updateDoctor,
} from "../controllers/doctor.controller.js";

const doctorRouter = express.Router();

doctorRouter.post("/create", createDoctor);
doctorRouter.get("/doctors", createDoctor);
doctorRouter.get("/doctor/:id", createDoctor);
doctorRouter.post("/edit/:id", updateDoctor);
doctorRouter.delete("/:id", deleteDoctor);

export { doctorRouter };
