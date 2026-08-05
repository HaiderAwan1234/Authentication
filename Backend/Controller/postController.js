import { Comment } from "../models/commentModel.js";
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
  const { comment } = req.body;

  const findComment = await Comment.findOne();

  if (!findComment) {
    findComment = await Comment.create({
      comment: [],
    });
  }

  await findComment.comment.push({
    comment,
    user_id: req.user._id,
  });

  await findComment.save();

  res.send(findComment);
};

// export const comment = async (req, res) => {
//   const { comment } = req.body;
//   const { post_id } = req.params;

//   const findPost = await Post.findById(post_id);

//   if (!findPost) {
//     res.status(404);
//     throw new Error("Post not found !!");
//   }

//   await findPost.comments.push({ comment, user_id: req.user._id });

//   await findPost.save();

//   res.send(findPost);
// };
