import "dotenv/config";
import express from "express";
import cors from "cors";
import connectToDb from "./config/connectToDb.js";
import userRoutes from "./routes/userRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import cookieParser from "cookie-parser";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

connectToDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/my-listings", listingRoutes);
app.use("/api/my-bookings", bookingRoutes);

app.listen(process.env.PORT || 2180, () => {
  console.log("Server is running on localhost:2180");
});
