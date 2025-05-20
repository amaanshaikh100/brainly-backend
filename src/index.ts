import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "./models/User";

const app = express();

app.use(express.json());

// add zod validation
app.post("/api/v1/signup", async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    res.status(200).json({
      status: "success",
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
