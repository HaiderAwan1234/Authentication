import axios from "axios";

export const commentService = async (commentData) => {
  const response = await axios.post(
    `http://localhost:5174/user/api/comment`,
    commentData,
  );

  return response.data;
};
