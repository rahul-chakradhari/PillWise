import mongoose from "mongoose";

const DATASE_NAME = "meditrack";

const connectDb = async () => {
  try {
    const connectionInnstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DATASE_NAME}`
    );
    console.log(
      `MongoDB Connnected !! DB HOST: ${connectionInnstance.connection.host}`
    );
  } catch (error) {
    console.log("Mongodb Connection Error", error);
    process.exit(1);
  }
};

export { connectDb };
