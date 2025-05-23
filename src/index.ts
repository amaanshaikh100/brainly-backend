import express, { Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import { userMiddleware } from "./middleware";
import { config } from "./config";
import { random } from "./utils";

import User from "./models/User";
import Content from "./models/Content";
import Link from "./models/Link";

const app = express();

app.use(express.json());
app.use(cors());

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

app.delete("/api/v1/content/:id", async (req, res) => {
  const id = req.body.params;

  const content = await Content.findByIdAndDelete(id);

  res.status(204).json({
    data: null,
  });
});

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
  const share = req.body.share;
  if (share) {
    const existingLink = await Link.findOne({
      // @ts-ignore
      userId: req.userId,
    });

    if (existingLink) {
      res.json({
        hash: existingLink.hash,
      });
      return;
    }
    const hash = random(10);
    await Link.create({
      // @ts-ignore
      userId: req.userId,
      hash: hash,
    });

    res.json({
      hash,
    });
  } else {
    await Link.deleteOne({
      // @ts-ignore
      userId: req.userId,
    });

    res.json({
      message: "Removed link",
    });
  }
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;

  console.log(hash);

  const link = await Link.findOne({
    hash,
  });

  if (!link) {
    res.status(411).json({
      message: "Sorry incorrect input",
    });
    return;
  }
  // userId
  const content = await Content.find({
    userId: link.userId,
  });

  console.log(link);
  const user = await User.findOne({
    _id: link.userId,
  });

  if (!user) {
    res.status(411).json({
      message: "user not found, error should ideally not happen",
    });
    return;
  }

  res.json({
    username: user.email,
    content: content,
  });
});

export default app;
