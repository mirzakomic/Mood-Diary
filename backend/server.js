import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";
import cors from 'cors';

import { userRouter } from "./user/routes.js";
import  diaryEntriesRouter from './user/diaryRoutes.js';

dotenv.config({
  path: path.join(path.resolve(), "..", ".env"),
});

await mongoose.connect(process.env.DB);
await mongoose.connection.syncIndexes();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());

const __dirname = path.resolve();
const ReactAppDistPath = path.join(__dirname, 'frontend', 'dist');
const ReactAppIndex = path.join(ReactAppDistPath, 'index.html');

app.use(express.json());
app.use(cookieParser());
app.use(express.static(ReactAppDistPath));
app.use("/api/user", userRouter);
app.use("/api/diary-entries", diaryEntriesRouter);

app.get("/api/status", (req, res) => {
  res.send({ status: "Ok" });
});

app.get("/*", (req, res) => {
  res.sendFile(ReactAppIndex.pathname);
});

app.listen(PORT, () => {
  console.log("Server running on Port: ", PORT);
});