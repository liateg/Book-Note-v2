// rigister,login,get user,edit profile,delete user
//   name         String
//   username     String    @unique
//   email        String    @unique
//   passwordHash String


import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const saltRounds = 10;
export const createUser = async (req, res) => {
  try {
    const { name, email,password} = req.body;
    bcrypt.hash(password,saltRounds,async(err,passwordHash)=>{
      if(err){
        console.error("Errore hasing",err.stack)
      }else{
  const user = await prisma.user.create({
      data: { name, email, passwordHash },
    });
    res.json(user);
      }
    })
  
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

// get user by id

export const getUser= async (req,res)=>{
  const { id } = req.params;
 const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });
  if (user) res.json(user);
  else res.status(404).json({ error: "User not found" });
}

export const editUser=async(req,res)=>{
  const {id}=req.params
  const {email,name,password}=req.body
  const user=await prisma.user.editUser({
    where:{id:parseInt(id)},
    data:{email,name,password}
  })
   if (user) res.json(user);
  else res.status(404).json({ error: "User not found" });
}

export const deleteUser=async (req,res)=>{
  const {id}=req.params
  const user=await prisma.user.deleteUser({
    where:{id:parseInt(id)}
  })
   if (user) res.json(user);
  else res.status(404).json({ error: "User not found" });
}