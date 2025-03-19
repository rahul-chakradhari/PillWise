import express from "express";
import { userRouter } from "./userRouter.js";
import { doctorRouter } from "./doctorRouter.js";
import appointmentRouter from "./appointmentRouter.js";
import prescriptionRouter from "./prescriptionReouter.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/doctor", doctorRouter);
router.use("/appointment", appointmentRouter);
router.use("/prescription", prescriptionRouter);
export { router };
