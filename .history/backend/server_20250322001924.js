// import express from "express";
// import dotenv from "dotenv";
// import { connectDb } from "./config/db.connect.js";
// import { router } from "./src/routers/router.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import { connectCloudinary } from "./src/utility/clodinary.js";

// dotenv.config();
// connectCloudinary();
// const port = process.env.PORT || 8081;
// const app = express();

// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

// app.use("/api", router);

// app.get("/", (req, res) => {
//   res.send("Welcome to MediTrack..");
// });

// // 🔥 Connect to MongoDB BEFORE starting the server
// connectDb()
//   .then(() => {
//     app.listen(port, () => {
//       console.log("Server running on port", port);
//     });
//   })
//   .catch((error) => {
//     console.log("Failed to connect to MongoDB", error);
//   });
import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.connect.js";
import { router } from "./src/routers/router.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectCloudinary } from "./src/utility/clodinary.js";
import { Server } from "socket.io"; // 🛠️ Add Socket.IO for real-time sync
import http from "http";
import NodeCache from "node-cache"; // 🛠️ Add cache

dotenv.config();
connectCloudinary();

const port = process.env.PORT || 8081;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

const cache = new NodeCache({ stdTTL: 60 }); // 🛠️ Cache for 60 seconds

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
  res.send("Welcome to MediTrack..");
});

// Real-time socket connection
io.on("connection", (socket) => {
  console.log("New admin connected:", socket.id);

  // Sync data real-time
  socket.on("updateData", (data) => {
    io.emit("syncData", data); // Broadcast updated data to all admins
  });

  socket.on("disconnect", () => {
    console.log("Admin disconnected:", socket.id);
  });
});

// MongoDB connection
connectDb()
  .then(() => {
    server.listen(port, () => {
      console.log("Server running on port", port);
    });
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB", error);
  });

export { io, cache };
