import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("database connected");

    const modelNames = mongoose.modelNames();
    for (const name of modelNames) {
      const model = mongoose.model(name);
      await model.syncIndexes();
    }
    console.log("mongoose indexes synced");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default connectDB;