import express, { Router } from "express";
import { 
    getUsers, 
    addUser, 
    updateUser, 
    deleteUser 
} from "../controllers/users"; // Remova a extensão .js

const router: Router = express.Router();

router.get("/", getUsers);

router.post("/", addUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
