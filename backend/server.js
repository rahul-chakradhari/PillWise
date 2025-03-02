import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.connect.js";
import { router } from "./src/routers/router.js";

dotenv.config();
const port = process.env.PORT || 8081;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.get("/", (req, res) => {
  res.send("Welcome to meditrack..");
});
app.listen(port, () => {
  try {
    console.log("Server running on port ", port);
    connectDb();
  } catch (error) {
    console.log(error);
  }
});
