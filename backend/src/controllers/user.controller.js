import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const registerUser = async (req, res) => {
  const {
    name,
    email,
    password,
    age,
    gender,
    bloodGroup,
    address,
    phoneNumber,
  } = req.body;

  try {
    if (!name) {
      return res.status(400).send({ message: "Name is required" });
    }
    if (!email) {
      return res.status(400).send({ message: "email is required" });
    }
    if (!password) {
      return res.status(400).send({ message: "password is required" });
    }
    if (!age) {
      return res.status(400).send({ message: "age is required" });
    }
    if (!bloodGroup) {
      return res.status(400).send({ message: "BG is required" });
    }
    if (!phoneNumber) {
      return res
        .status(400)
        .send({ message: "phone number is required and length must be 10" });
    }
    if (!address) {
      return res.status(400).send({ message: "address is required" });
    }

    if (!email.includes("@gmail.com")) {
      return res.status(400).json({ message: "Enter a Valid Email " });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      age,
      gender,
      bloodGroup,
      address,
      phoneNumber,
    });

    res.status(200).json({
      success: true,
      message: "User registered successfully",
      newUser: newUser,
    });
  } catch (error) {
    console.log(error);
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!password)
      return res.status(400).json({ message: "Password is required" });

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect Password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    // Cookie options
    const options = {
      httpOnly: true,
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      secure: process.env.NODE_ENV === "production",
    };

    user.password = undefined;

    return res.status(200).cookie("token", token, options).json({
      success: true,
      message: "User logged in successfully",
      user,
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const userLogout = async (req, res) => {
  const user = req.user;
  try {
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      user,
      message: "User logged out Successfully",
    });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const userDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("User Details Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export { registerUser, userLogin, userLogout, userDetails };
