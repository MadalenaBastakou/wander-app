import "dotenv/config";
import express from "express";
import cors from "cors";
import connectToDb from "./config/connectToDb.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import path from "path";

const __dirname = path.resolve();

const app = express();

connectToDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(cookieParser());

app.use("/api/user", userRoutes);

app.use(express.static(path.join(__dirname, '/frontend/dist')))

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'))
})

app.listen(2180, () => {
  console.log("Server is running on localhost:2180");
});
