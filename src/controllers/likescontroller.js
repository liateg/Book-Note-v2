import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const like=async (req,res)=>{
    try{
const {id}=req.body
const liked=await prisma.like.update({
where:{
    id:parseInt(id)
},
data:{
      likes: {
      increment: 1,
    }
}
})
  if(!like) return res.status(404).json({ success: false, error: "Couldnt like" });
  return res.status(201).json({ success: true, data:like });
}catch(error){

res.status(500).json({ success: false, error: error.message });
  }

}

export const unlike=async (req,res)=>{
    try{
const {id}=req.body
const liked=await prisma.like.update({
where:{
    id:parseInt(id)
},
data:{
      likes: {
       decrement: 1,
    }
}
})
  if(!like) return res.status(404).json({ success: false, error: "Couldnt like" });
  return res.status(201).json({ success: true, data:like });
}catch(error){

res.status(500).json({ success: false, error: error.message });
  }

}