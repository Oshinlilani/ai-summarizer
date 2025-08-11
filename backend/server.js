import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

import summarizeRoute from "./routes/summarize.js";
app.use("/api", summarizeRoute);

app.listen(5000, () => console.log("Server running on 5000"));

