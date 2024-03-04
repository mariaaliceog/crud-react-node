import express, { Router } from "express";
import { 
    getUsers, 
    addUser, 
    updateUser, 
    deleteUser 
} from "../controllers/users"; 

const router = Router();

router.get("/", getUsers);

router.post("/", addUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export { router };
