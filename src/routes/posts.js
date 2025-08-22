import express from "express"
import {creatPost} from "../controllers/postcontroller.js"

const router=express.Router()

router.post("/",creatPost)

export default router