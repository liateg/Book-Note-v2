import express from "express"
import { like,unlike } from "../controllers/likescontroller.js"

const router=express.Router()

router.post("/",like)
router.post("/unlike",unlike)
export default router