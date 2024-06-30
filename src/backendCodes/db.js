import mongoose from "mongoose";
import { DB_NAME } from "@/constants";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Already Connected to Database ...");
      return true;
    } else {
      const connectionInstance = await mongoose.connect(
        `${process.env.MONGODB_URI}/${DB_NAME}`,
        {
          connectTimeoutMS: 60000,
        }
      );
      console.log("Connected to Database ...");
      return true;
    }
  } catch (error) {
    console.error("Failed to Connect to Database || Error: ", error);
    throw error;
  }
};
export default connectDB;
