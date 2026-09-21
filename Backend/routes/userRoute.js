import express from "express";
import authUser from "../middlewares/authUser.js";

import { registerUser , loginUser,   getUserProfile } from "../controllers/userController.js"

const userRouter = express.Router();

userRouter.post("/register", registerUser )
userRouter.post("/login", loginUser)
userRouter.get("/profile", authUser, getUserProfile);



export default userRouter; 