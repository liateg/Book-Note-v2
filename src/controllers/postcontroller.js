import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const creatPost=async (req,res)=>{
    
    try{
        const {title,review,visiblity,rate,notes}=req.body
            const data = await fetch(
      `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`
    );
    const json = await data.json();
    const book = json.docs[0];
    console.log("Book data fetched:", book);
    if (book) {
      const bookData = {
        title: book.title,
        author_name: book.author_name ? book.author_name.join(", ") : "Unknown",
        
        rate: rate,
        notes: notes,
        cover_id: book.cover_i ? book.cover_i : null,
        cover_edition_key: book.cover_edition_key
          ? book.cover_edition_key
          : null,
        isbn: book.isbn ? book.isbn[0] : null,
        edition_key: book.edition_key ? book.edition_key[0] : null,
        review: review,
      };
      const book_model={
        title:bookData.title,
        rate:bookData.rate,
        cover_id:bookData.cover_id,
        cover_edition_key:bookData.cover_edition_key,
        edition_key:bookData.edition_key
      }
     const authorsArray = bookData.author_name.split(",").map(name => name.trim());
    
const book_= await prisma.book.creat({
    data:{
       ...book_model 
    }
})

for (const author of authorsArray) {
  await prisma.bookAuthor.create({
    data: {
      name: author,
      
    },
  });
}

const note=await prisma.note.create({
    data:{
noteText:bookData.notes
    }
})
    
    }else{
        return res.status(404).json({ success: false, error: "Book not found" });
    }
//   title         String
//   coverUrl      String?
//   publishedYear Int?
//   ISBN          String?  @unique

}catch{}}