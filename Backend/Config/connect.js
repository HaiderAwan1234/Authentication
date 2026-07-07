import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URL);

  console.log(`Database is connected on ${mongoose.connection.host}`.cyan);
};
