import { prisma } from "../../../../adapters.js";
import bcrypt from "bcrypt";

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
  // Consider what data to return - for security, you might not want to send the password back
  const { password: userPassword, ...userWithoutPassword } = user;
  res.status(200).json(userWithoutPassword);
}

export async function logout(req, res) {
  // Implement logout functionality
  res.status(200).json({ message: "Logout successful." });
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
    // Consider what data to return - for security, you might not want to send the password back
    const { password, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    // Handle potential errors, such as a violation of the unique constraint for 'name'
    console.error("Error creating user:", error);
    res.status(400).json({ error: "Error creating user." });
  }
}
