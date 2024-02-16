import mongoose from "mongoose";

export default async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log("Connected to database");
  } catch (err) {
    console.log(err);
  }
}
