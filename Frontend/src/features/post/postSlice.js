import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { commentService } from "./postService";

const initialState = {
  comment: [],
  commentSuccess: false,
  commentError: false,
  commentMessagee: false,
  commentloading: false,
};

export const serviceComment = createAsyncThunk(
  "comment",
  async (commentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await commentService(commentData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  },
);

export const postSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    commentReset: (state) => {
      commentSuccess = false;
      commentError = false;
      commentMessagee = false;
      commentloading = false;
    },
  },
  extraReducer: (builder) => {
    builder
      .addCase(serviceComment.pending, (state, action) => {
        state.commentloading = true;
      })
      .addCase(serviceComment.rejected, (state, action) => {
        state.commentLoading = false;
        state.commentError = true;
        state.commentMessage = true;
      })
      .addCase(serviceComment.fulfilled, (state, action) => {
        state.commentsuccess = true;
        state.commentloading = true;
        state.commentError = false;
        state.commentMessage = action.payload;
      });
  },
});

export default postSlice.reducer;
export const { commentReset } = postSlice.actions;
