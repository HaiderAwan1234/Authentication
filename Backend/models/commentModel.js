import mongoose from "mongoose";

export const commentSchema = mongoose.Schema(
  {
    comment: {
      type: [],
      default: [],
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Comment = mongoose.model("comment", commentSchema);
