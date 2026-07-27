import { Post } from "../models/postModel.js";

export const post = async (req, res) => {
  console.log(req.body);
  console.log(req.params);

  const { textArea, background } = req.body;
  const { user_id } = req.params;

  const userPost = await Post.create({
    textArea,
    background,
    user_id,
  });

  res.send(userPost);
};
