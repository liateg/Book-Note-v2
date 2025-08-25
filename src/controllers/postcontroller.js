import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import {generateSummary} from "./aicontentscontroller.js"

export const creatPost=async (req,res)=>{
    
    try{
        const {title,review,visiblity,rate,notes,userId}=req.body
            const data = await fetch(
      `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`
    );
    const json = await data.json();
    const book = json.docs[0];
    console.log("Book data fetched:", book);
    if (book) {
      console.log("We go the book")
      const bookData = {
        title: book.title,
        author_name: book.author_name ? book.author_name.join(", ") : "Unknown",
        
        
        
        cover_id: book.cover_i ? book.cover_i : null,
        cover_edition_key: book.cover_edition_key
          ? book.cover_edition_key
          : null,
        isbn: book.isbn ? book.isbn[0] : null,
        edition_key: book.edition_key ? book.edition_key[0] : null,
       
      };
      const book_model={
        title:bookData.title,
      
        cover_id:String(bookData.cover_id),
        cover_edition_key:bookData.cover_edition_key,
        edition_key:bookData.edition_key,
        ISBN:bookData.isbn,
      }
     const authorsArray = bookData.author_name.split(",").map(name => name.trim());
    
const book_= await prisma.book.create({
    data:{
       ...book_model 
    }
})
console.log("book added")
let authors=[]
for (const author of authorsArray) {
  const authorI=await prisma.bookAuthor.create({
    data: {
      name: author,
        book: {
      connect: { id: book_.id }, // link this author to the created book
    },
    },
  });
  authors.push(authorI) 
}
console.log("authers added")
const note=await prisma.note.create({
    data:{
noteText:notes,
  book: {
      connect: { id: book_.id }, // link this author to the created book
    },
    user: {
      connect: { id: userId }, // link this author to the user
    },
    }
})
console.log("note added")
const post=await prisma.post.create({
    data:{
       visibility:visiblity,
       rating:rate,
       reviewText:review,
         book: {
      connect: { id: book_.id }, // link this author to the created book
    },  user: {
      connect: { id: userId }, // link this author to the user
    },
    }
})
console.log("post added")
const like=await prisma.like.create({
  data:{likes:0,
         post: {
      connect: { id: post.id }, // link this author to the created book
    },  user: {
      connect: { id: userId }, // link this author to the user
    },
  }
})
const aiSummeryI=await generateSummary([bookData.title,bookData.author_name])
const aiSummeryO=await prisma.aiContent.create({
  data:{
    book:{
      connec,t: {id:book.id}
    },
    post:{
      connect:{id:post.id}
    },
    type:"SUMMARY",
    content:aiSummeryI
  }
})

return res.status(201).json({success: true,data:{books:book_,authors:authors, note:note,post:post,like:like } })    
    }else{
        return res.status(404).json({ success: false, error: "Book not found" });
    }
//   title         String
//   coverUrl      String?
//   publishedYear Int?
//   ISBN          String?  @unique

}catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    res.status(500).json({ success: false, error: error.message });
  }}

export const getPosts=async (req,res)=>{
  try{
    const posts=await prisma.post.findMany({
        include: {
    likes: true, // fetch all related Like objects
  },
    })
    if(!posts){
      return  res.status(404).json({ success: false, error: "Posts Not found " });
    }
    return res.status(201).json({ success: true, data:posts});
  }catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    res.status(500).json({ success: false, error: error.message });
  }
}

export const getPost=async (req,res)=>{
try{
   const { id } = req.params;
  console.log(id)
  const post=await prisma.post.findUnique({
    where:{id:parseInt(id)},
      include: {
    likes: true, // fetch all related Like objects
  },
  })
  if(!post) return res.status(404).json({ success: false, error: "Post not found" });
  return res.status(201).json({ success: true, data:post});
}catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ success: false, error: "Post not found" });
    }
    res.status(500).json({ success: false, error: error.message });
  }
}


export const updatePost=async (req,res)=>{
try{
  console.log(`on update ${req.params.id}`)
 const {id}=req.params
  console.log(`on update5 ${id}`)
  const {userId,bookId,reviewText,rating,visibility} =req.body

  const post=await prisma.post.update({
    where:{id:parseInt(id),userId:parseInt(userId)},
    data:{
reviewText:reviewText,
rating:rating,
visibility:visibility
    }
  })
  if(!post) return res.status(404).json({ success: false, error: "Post not found" });
  return res.status(201).json({ success: true, data:post });
}catch(error){

res.status(500).json({ success: false, error: error.message });
  }
}

export const deletPost=async (req,res)=>{
  try{
const {id}= req.params
const {userId}=req.body
const post=await prisma.post.delete({
  where:{id:parseInt(id),userId:parseInt(userId)},
})
if(!post) return res.status(404).json({ success: false, error: "Post not found" });
  return res.status(201).json({ success: true, data:post });
  }catch(error) {
res.status(500).json({ success: false, error: error.message });
  }
}