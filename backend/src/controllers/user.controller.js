import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const registerUser = async (req, res) => {
  const { name, email, password, age, gender, bloodGroup, address, phone } =
    req.body;

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
  if (!phone || phone.length < 10) {
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
    phone,
  });

  res
    .status(200)
    .json({ message: "User registered successfully", newUser: newUser });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).send({ message: "email is required" });
  }
  if (!password) {
    return res.status(400).send({ message: "password is required" });
  }
  let user = await User.findOne({ email });

  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "User & Email not found" });
  }
  let verifyPassword = await bcrypt.compare(password, user.password);
  if (!verifyPassword) {
    res
      .status(400)
      .json({ success: false, message: "Plese Enter Correct Password" });
  }

  let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "Token not generated" });
  }

  const loginUser = await User.findOne({ email }).select("-password");
  let options = {
    httpOnly: true,
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    secure: true,
  };
  res.status(200).cookie("token", token).json({
    success: true,
    message: "User Login Successfully",
    loginUser,
    token: token,
  });
};

export { registerUser, userLogin };
