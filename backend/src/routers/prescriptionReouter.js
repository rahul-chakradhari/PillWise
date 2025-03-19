import express from "express";
import { verifyUser } from "../../middlewares/userverification.js";
import {
  createPrescription,
  deletePrescription,
  getAllPrescriptions,
  getPrescriptionById,
  updatePrescription,
} from "../controllers/prescription.controller.js";
import { upload } from "../../middlewares/multer.js";

const prescriptionRouter = express.Router();

// Create a new prescription
prescriptionRouter.post(
  "/",
  upload.single("prescriptionImage"),
  verifyUser,
  createPrescription
);

// Get all prescriptions
prescriptionRouter.get("/all", verifyUser, getAllPrescriptions);

// Get a prescription by ID
prescriptionRouter.get("/:id", verifyUser, getPrescriptionById);

// Update a prescription
prescriptionRouter.put("/:id", verifyUser, updatePrescription);

// Delete a prescription
prescriptionRouter.delete("/:id", verifyUser, deletePrescription);

export default prescriptionRouter;
