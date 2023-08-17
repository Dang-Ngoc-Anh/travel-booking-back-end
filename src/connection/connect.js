import mongoose from "mongoose";
import dotEnv from "dotenv";
dotEnv.config();

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB Connected: {conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
  }
};

export default connectDb;
