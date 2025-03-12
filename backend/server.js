import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.connect.js";
import { router } from "./src/routers/router.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectCloudinary } from "./src/utility/clodinary.js";

dotenv.config();
connectCloudinary();
const port = process.env.PORT || 8081;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Welcome to meditrack..");
});

app.listen(port, () => {
  try {
    console.log("Server running on port", port);
    connectDb();
  } catch (error) {
    console.log(error);
  }
});
