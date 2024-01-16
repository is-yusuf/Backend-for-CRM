import { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";

import jwt from "jsonwebtoken";
require("dotenv").config();

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ error: "No Token Provided" });
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY) as {
      [key: string]: any;
    };
    next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token Expired" });
    }
    console.error("JWT error: ", err.message);
    return res.status(401).json({ error: "Not Authorized" });
  }
}

// Function to generate a new token with an expiration of 30 minutes
const generateToken = (payload: { [key: string]: any }) => {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "30m" });
};

// export function authenticate2(req: Request, res: Response, next: NextFunction) {
//   //@ts-ignore
//   if (!req.headers.authorization) {
//     return res.status(400).send("No Token Provided!");
//   }
//   const token = req.headers.authorization.split(" ")[1];
//   if (!token || token.length < 10) {
//     return res.status(400).send("Invalid or Missing Token");
//   }

//   try {
//     const verified = jwt.verify(token, "YOUR_SECRET_KEY") as {
//       [key: string]: any;
//     };
//     //@ts-ignore
//     req.user = verified;
//     next();
//   } catch (err: any) {
//     if (err.name == "TokenExpiredError") {
//       return res.status(402).send("Token Expired");
//     }
//     console.log(err);
//     return res.status(400).send("Not authorized");
//   }
// }
