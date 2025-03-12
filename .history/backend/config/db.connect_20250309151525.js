import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      process.env.MONGODB_URL,
      {}
    );
    console.log(
      `MongoDB Connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Mongodb Connection Error", error);
    process.exit(1);
  }
};

export { connectDb };
