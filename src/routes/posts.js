import express from "express"
import {creatPost,getPost,getPosts,updatePost,deletPost} from "../controllers/postcontroller.js"

const router=express.Router()

router.post("/",creatPost)
router.get("/",getPosts)
router.get("/:id",getPost)
router.put("/:id",updatePost)
router.delete("/:id",deletPost)
export default router