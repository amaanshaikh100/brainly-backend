import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "./models/User";

const app = express();

app.use(express.json());
dotenv.config();

// add zod validation
app.post("/api/v1/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const encryptPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ email, password: encryptPassword });

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET_KEY as string
    );

    res.status(200).json({
      status: "success",
      token,
      data: newUser,
    });
  } catch (err: unknown) {
    res.status(500).json({
      message: "something went wrong",
      error: err,
    });
  }
});

app.post("/api/v1/content", (req, res) => {});

app.get("/api/v1/content", (req, res) => {});

app.delete("/api/v1/content", (req, res) => {});

app.post("/api/v1/brain/:shareLink", (req, res) => {});

export default app;
