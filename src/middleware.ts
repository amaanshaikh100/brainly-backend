import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { config } from "./config";

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers["authorization"];
  const decoded = jwt.verify(header as string, config.jwtSecret as string);

  if (decoded) {
    //@ts-ignore
    req.userId = decoded.id;
    next();
  } else {
    res.status(403).json({
      message: "you are not logged in.",
    });
  }
};
