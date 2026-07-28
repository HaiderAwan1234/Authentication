import { Post } from "../models/postModel.js";

export const post = async (req, res) => {
  const { textArea, background } = req.body;
  const { user_id } = req.params;

  const userPost = await Post.create({
    textArea,
    background,
    user_id,
  });

  res.send(userPost);
};

export const comment = async (req, res) => {
  res.send("This is Comment");
};
