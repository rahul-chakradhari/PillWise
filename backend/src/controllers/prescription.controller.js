import { Prescription } from "../models/prescription.model.js";
import { v2 as cloudinary } from "cloudinary";

// ✅ Create Prescription with Image Upload
const createPrescription = async (req, res) => {
  try {
    const { userId, doctorId, notes } = req.body;
    const prescriptionImage = req.file;
    console.log(prescriptionImage);

    // Validation: Required Fields
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }
    if (!doctorId) {
      return res
        .status(400)
        .json({ success: false, message: "Doctor ID is required" });
    }
    if (!prescriptionImage) {
      return res
        .status(400)
        .json({ success: false, message: "Prescription image is required" });
    }

    let cloudResponse;
    try {
      cloudResponse = await cloudinary.uploader.upload(prescriptionImage.path, {
        resource_type: "image",
      });
      console.log("Image Uploaded:", cloudResponse.secure_url);
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Image upload failed" });
    }

    const newPrescription = await Prescription.create({
      userId,
      doctorId,
      prescriptionImage: cloudResponse.secure_url || "",
      notes: notes || "",
    });

    res.status(201).json({
      success: true,
      message: "Prescription created successfully",
      prescription: newPrescription,
    });
  } catch (error) {
    console.error("Create Prescription Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export default createPrescription;

// Get all prescriptions
const getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find()
      .populate("userId", "name email")
      .populate("doctorId", "name specialty");
    res.status(200).json({
      success: true,
      message: "All prescriptions retrieved successfully",
      prescriptions,
    });
  } catch (error) {
    console.error("Get All Prescriptions Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get prescription by ID
const getPrescriptionById = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate("userId", "name email")
      .populate("doctorId", "name specialty");
    if (!prescription) {
      return res
        .status(404)
        .json({ success: false, message: "Prescription not found" });
    }
    res.status(200).json({
      success: true,
      message: "Prescription retrieved successfully",
      prescription,
    });
  } catch (error) {
    console.error("Get Prescription By ID Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update a prescription
const updatePrescription = async (req, res) => {
  try {
    const { userId, doctorId, medicines, prescriptionImage, notes } = req.body;

    const prescription = await Prescription.findById(req.params.id);
    if (!prescription) {
      return res
        .status(404)
        .json({ success: false, message: "Prescription not found" });
    }

    // Update only provided fields
    if (userId) prescription.userId = userId;
    if (doctorId) prescription.doctorId = doctorId;
    if (medicines && medicines.length > 0) prescription.medicines = medicines;
    if (prescriptionImage) prescription.prescriptionImage = prescriptionImage;
    if (notes) prescription.notes = notes;

    await prescription.save();

    res.status(200).json({
      success: true,
      message: "Prescription updated successfully",
      prescription,
    });
  } catch (error) {
    console.error("Update Prescription Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete a prescription
const deletePrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndDelete(req.params.id);
    if (!prescription) {
      return res
        .status(404)
        .json({ success: false, message: "Prescription not found" });
    }
    res.status(200).json({
      success: true,
      message: "Prescription deleted successfully",
    });
  } catch (error) {
    console.error("Delete Prescription Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Export all functions as an object
export {
  createPrescription,
  getAllPrescriptions,
  getPrescriptionById,
  updatePrescription,
  deletePrescription,
};
