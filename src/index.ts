import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userMiddleware } from "./middleware";
import { config } from "./config";

import User from "./models/User";
import Content from "./models/Content";

const app = express();

app.use(express.json());

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
      config.jwtSecret as string
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

app.post("/api/v1/content", userMiddleware, async (req, res) => {
  const title = req.body.title;
  const link = req.body.link;
  const type = req.body.type;

  const newContent = await Content.create({
    title,
    link,
    type,
    // @ts-ignore
    userId: req.userId,
    tags: [],
  });

  res.status(201).json({
    message: "content api",
    data: newContent,
  });
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
  // @ts-ignore
  const userId = req.userId;
  const content = await Content.find({
    userId,
  }).populate("userId", "email");

  res.status(200).json({
    status: "success",
    data: content,
  });
});

app.delete("/api/v1/content", (req, res) => {});

app.post("/api/v1/brain/:shareLink", (req, res) => {});

export default app;
