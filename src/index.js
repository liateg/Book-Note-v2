import express from "express";
import { PrismaClient } from "@prisma/client";
import userRoutes from "./routes/users.js"; 
import postRoutes from "./routes/posts.js"
import likeRoutes from "./routes/likes.js"

const app = express();
const PORT = process.env.PORT ;


app.use(express.json());
app.use(express.urlencoded({extended:true}))

// Routes
app.use("/users", userRoutes);
app.use("/post",postRoutes)
app.use("/like",likeRoutes)

// Root route (just to check if server is running)
app.get("/", (req, res) => {
  res.json({ success: true, message: "Server is running 🚀" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
