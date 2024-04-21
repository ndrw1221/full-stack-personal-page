import { prisma } from "../../../../adapters.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function login(req, res) {
  console.log("[AUTH] Login attempt from: ", req.ip);
  const { name, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      name: name,
    },
  });
  if (!user) {
    console.log("[AUTH] User not found: ", name);
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) {
    console.log("[AUTH] Invalid password for user: ", name);
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ name: user.name }, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 30,
  });

  console.log("[AUTH] User logged in: ", user.name);

  res.status(200).json({ auth: true, message: "Logged in successfully" });
}

export async function logout(req, res) {
  // Implement logout functionality
  res.clearCookie("token");
  console.log("[AUTH] User logged out:", req.userName);
  res.status(200).json({ auth: false, message: "Logged out successfully" });
}

export async function register(req, res) {
  console.log("[AUTH] Register attempt from: ", req.ip);
  const { name, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        name: name,
      },
    });

    if (existingUser) {
      console.log("[AUTH] User already exists: ", name);
      return res.status(409).json({ message: "User already exists." });
    }

    const user = await prisma.user.create({
      data: {
        name: name,
        password: hashedPassword,
      },
    });

    console.log("[AUTH] User created: ", user.name);

    const token = jwt.sign({ name: user.name }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 30,
    });

    console.log("[AUTH] User logged in: ", user.name);

    res.status(201).json({ auth: true, message: "User created successfully" });
  } catch (error) {
    // Handle potential errors, such as a violation of the unique constraint for 'name'
    console.error("[AUTH] Error creating user:", error);
    res.status(400).json({ error: "Error creating user." });
  }
}

export async function me(req, res) {
  res.status(200).json({ user: req.userName });
}
