import express from "express";
import { comment, post } from "./../Controller/postController.js";
import { tokenHandler } from "../middlewares/tokenHandler.js";

export const postRoute = express.Router();

postRoute.post("/post/:user_id", post);

postRoute.post("/comment", tokenHandler, comment);
