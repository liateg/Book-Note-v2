import express from "express";
import { createUser, getUsers, getUser, editUser, deleteUser } from "../controllers/userscontroller.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);

export default router;
