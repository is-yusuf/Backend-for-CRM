import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "./db";

// interface User {
//   id: number;
//   username: string;
//   hashedPassword: string;
// }

// Dummy DB interaction function, replace with your actual DB function
async function getUserByEmail(email: string): Promise<any> {
  // @ts-ignore
  const user = await db.db.users.findOne({ where: { email: email } });
  return user ? user.dataValues : null;
}

export async function register(req: Request, res: Response) {
  const { username, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await getUserByEmail(email);
  if (user) {
    res.status(400).json("User already exists");
  } else {
    try {
      db.db.users.create({
        username: username,
        hashedpassword: hashedPassword,
        email: email,
        accesslevel: "admin",
      });
      res.status(201).send("User registered successfully!");
    } catch (error: any) {
      res.status(500).send("Internal server error");
    }
  }
}
export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);

  if (user && (await bcrypt.compare(password, user.hashedpassword))) {
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "30m" }
    );

    res
      .cookie("jwt", token, {
        domain: "localhost",
        // httpOnly: true,
        // secure: true, // Uncomment if over HTTPS
        sameSite: "lax", // Consider using 'lax' if 'strict' causes issues
      })
      .json({ message: "Logged in!", username: user.username , profileImageUrl: `http://localhost:8000/getProfileImage/${email}`});
  } else {
    res.status(401).json({ error: "Invalid credentials!" });
  }
}
