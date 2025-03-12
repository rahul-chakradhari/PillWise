import Doctor from "../models/doctor.model.js";
import { v2 as cloudinary } from "cloudinary";

const createDoctor = async (req, res) => {
  try {
    const { name, specialty, phone, email, address, experience, fees } =
      req.body;
    const profileImage = req.file;
    // Validation
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }
    if (!specialty) {
      return res
        .status(400)
        .json({ success: false, message: "Specialty is required" });
    }
    if (!phone) {
      return res
        .status(400)
        .json({ success: false, message: "Phone is required" });
    }
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }
    if (!address) {
      return res
        .status(400)
        .json({ success: false, message: "Address is required" });
    }
    if (!experience) {
      return res
        .status(400)
        .json({ success: false, message: "Experience is required" });
    }
    if (!fees) {
      return res
        .status(400)
        .json({ success: false, message: "Fees is required" });
    }

    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res
        .status(400)
        .json({ success: false, message: "Doctor already exists" });
    }
    let cloudResponse;
    if (profileImage) {
      try {
        cloudResponse = await cloudinary.uploader.upload(profileImage.path, {
          resource_type: "image",
        });
        console.log("Image Uploaded:", cloudResponse.secure_url);
      } catch (error) {
        return res
          .status(500)
          .json({ success: false, message: "Image upload failed" });
      }
    }

    // Create doctor with optional profileImage
    const doctor = await Doctor.create({
      name,
      specialty,
      phone,
      email,
      address,
      experience,
      fees,
      profileImage: cloudResponse.secure_url,
    });

    res.status(201).json({
      success: true,
      message: "Doctor created successfully",
      doctor,
    });
  } catch (error) {
    console.error("Create Doctor Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get all doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json({
      success: true,
      message: "All doctors retrieved successfully",
      doctors,
    });
  } catch (error) {
    console.error("Get All Doctors Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get a doctor by ID
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }
    res.status(200).json({
      success: true,
      message: "Doctor retrieved successfully",
      doctor,
    });
  } catch (error) {
    console.error("Get Doctor By ID Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update a doctor
const updateDoctor = async (req, res) => {
  try {
    const { name, specialty, phone, email, address, experience, fees } =
      req.body;
    const profileImage = req.file;
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    // Update only provided fields
    if (name) doctor.name = name;
    if (specialty) doctor.specialty = specialty;
    if (phone) doctor.phone = phone;
    if (email) doctor.email = email;
    if (address) doctor.address = address;
    if (experience) doctor.experience = experience;
    if (fees) doctor.fees = fees;

    if (profileImage) {
      try {
        const cloudResponse = await cloudinary.uploader.upload(
          profileImage.path,
          {
            resource_type: "image",
          }
        );
        doctor.profileImage = cloudResponse.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary Upload Error:", uploadError);
        return res.status(500).json({
          success: false,
          message: "Failed to upload image to Cloudinary",
        });
      }
    }

    await doctor.save();

    res.status(200).json({
      success: true,
      message: "Doctor updated successfully",
      doctor,
    });
  } catch (error) {
    console.error("Update Doctor Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete a doctor
const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }
    res.status(200).json({
      success: true,
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    console.error("Delete Doctor Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
