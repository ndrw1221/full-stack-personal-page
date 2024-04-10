import { prisma } from "../../../../adapters.js";
import bcrypt from "bcrypt";

export async function createUser(req, res) {
  const { name, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
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

export async function getUserByName(req, res) {
  const { name } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      name: name,
    },
  });
  if (user) {
    const { password, ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);
  } else {
    res.status(404).json({ error: "User not found." });
  }
}

export async function getAllUsers(req, res) {
  const allUsers = await prisma.user.findMany();
  res.status(200).json(allUsers);
}
