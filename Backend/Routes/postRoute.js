import express from "express";
import { post } from "./../Controller/postController.js";

export const postRoute = express.Router();

postRoute.post("/post/:user_id", post);
