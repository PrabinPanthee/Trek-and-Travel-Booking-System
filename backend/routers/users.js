import express from "express";
import { deleteUser, getAllUser, getSingleUser, updateUser } from "../controllers/userController.js";
import {verifyAdmin,verifyUser} from "../utils/verifyToken.js"
const router = express.Router();


//update user
router.put("/:id",verifyAdmin,updateUser);
//delete user
router.delete("/:id",verifyAdmin,deleteUser);
//get single user
router.get("/:id",verifyAdmin,getSingleUser);
// get all user
router.get("/",verifyAdmin,getAllUser);

export default router;