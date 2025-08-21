
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { sanitize } from "../utils/sanitize";

const prisma = new PrismaClient();
const saltRounds = 10;
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required." });
    }

    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.create({
      data: { name, email, passwordHash },
    });

    // Hide passwordHash before returning
    const safeUser=sanitize(user)
    res.status(201).json(safeUser);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  const users = await prisma.user.findMany();
const safeUsers=users.map(sanitize(users))
  res.json(safeUsers);
};

// get user by id

export const getUser= async (req,res)=>{
  const { id } = req.params;
 const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });
  if (user) {  const safeUser=sanitize(user)
  res.json(safeUser);}
  else res.status(404).json({ error: "User not found" });
}

export const editUser=async(req,res)=>{
  const {id}=req.params
  const {email,name,password}=req.body
  const user=await prisma.user.update({
    where:{id:parseInt(id)},
    data:{email,name,password}
  })
   if (user) {const safeUser=sanitize(user)
    res.json(safeUser)
   }
  else res.status(404).json({ error: "User not found" });
}

export const deleteUser=async (req,res)=>{
  const {id}=req.params
  const user=await prisma.user.delete({
    where:{id:parseInt(id)}
  })
   if (user) {const safeUser=sanitize(user)
    res.json(safeUser)
   }
  else res.status(404).json({ error: "User not found" });
}