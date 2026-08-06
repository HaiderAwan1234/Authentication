import axios from "axios";

export const commentService = async (commentData, token) => {
  const config = {
    header: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `http://localhost:5174/user/api/comment`,
    commentData,
    token,
  );

  return response.data;
};
