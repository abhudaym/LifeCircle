import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import hospitalRoutes from "./routes/hospitalRoutes.js";

import asyncHandler from "express-async-handler";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/hospital", hospitalRoutes);

app.get("/", (req, res) => {
  res.send("API is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running on ${PORT} in ${process.env.NODE_ENV}`)
);
