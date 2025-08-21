import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { sanitize } from "../utils/sanitize";

const prisma = new PrismaClient();
const saltRounds = 10;

// Create user
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: "Name, email, and password are required." });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ success: false, error: "Email already in use." });
    }

    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.create({
      data: { name, email, passwordHash },
    });

    const safeUser = sanitize(user);
    res.status(201).json({ success: true, data: safeUser });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    const safeUsers = users.map(sanitize);
    res.json({ success: true, data: safeUsers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get user by ID
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const safeUser = sanitize(user);
    res.json({ success: true, data: safeUser });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update user
export const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name, password } = req.body;

    const updatedData = { email, name };
    if (password) {
      updatedData.passwordHash = await bcrypt.hash(password, saltRounds);
    }

    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updatedData,
    });

    const safeUser = sanitize(user);
    res.json({ success: true, data: safeUser });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    const safeUser = sanitize(user);
    res.json({ success: true, data: safeUser });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    res.status(500).json({ success: false, error: error.message });
  }
};
