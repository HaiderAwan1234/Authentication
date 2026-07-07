import express from "express";
import { login, signup, verifyOtp } from "./../Controller/userController.js";

export const userRoute = express.Router();

userRoute.post("/signup", signup);

userRoute.post("/verifyOtp/:user_id", verifyOtp);

userRoute.post("/login", login);
