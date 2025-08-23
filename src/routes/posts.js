import express from "express"
import {creatPost,getPost,getPosts,updatePost} from "../controllers/postcontroller.js"

const router=express.Router()

router.post("/",creatPost)
router.get("/",getPosts)
router.get("/:id",getPost)
router.post("/:id",updatePost)
export default router