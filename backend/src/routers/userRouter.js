import express from "express";
import {
  registerUser,
  userLogin,
  userLogout,
} from "../controllers/user.controller.js";
import { verifyUser } from "../../middlewares/userverification.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", userLogin);
userRouter.post("/logout", verifyUser, userLogout);

export { userRouter };
