import { prisma } from "../../../../adapters.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function login(req, res) {
  const { name, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      name: name,
    },
  });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }
  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) {
    return res.status(401).json({ message: "Invalid credentials." });
  }
  const token = jwt.sign({ name: user.name }, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });
  res.status(200).json({ auth: true, token: token });
}

export async function logout(req, res) {
  // Implement logout functionality
  res.status(200).json({ auth: false, token: null });
}

export async function register(req, res) {
  const { name, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        name: name,
      },
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const user = await prisma.user.create({
      data: {
        name: name,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ name: user.name }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });
    res.status(201).json({ auth: true, token: token });
  } catch (error) {
    // Handle potential errors, such as a violation of the unique constraint for 'name'
    console.error("Error creating user:", error);
    res.status(400).json({ error: "Error creating user." });
  }
}

export async function me(req, res) {
  res.status(200).json({ name: req.userName });
}
