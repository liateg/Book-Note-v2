import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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
return res.status(201).json({success: true,data:{books:book_,authors:authors, note:note,post:post } })    
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
    const posts=await prisma.post.findMany()
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
  
}catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    res.status(500).json({ success: false, error: error.message });
  }
}