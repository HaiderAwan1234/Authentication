import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { commentService } from "./postService";

const initialState = {
  post: [],
  postSuccess: false,
  postError: false,
  postMessagee: false,
  postloading: false,
};

export const serviceComment = createAsyncThunk(
  "comment",
  async (commentData, thunkAPI) => {
    try {
      return await commentService(commentData);
    } catch (error) {
      thunkAPI.rejectWithValue(error.response.data.error);
    }
  },
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducer: {
    postReset: (state) => {
      postSuccess = false;
      postError = false;
      postMessagee = false;
      postloading = false;
    },
  },
  extraReducer: (builder) => {
    builder
      .addCase(serviceComment.pending, (state, action) => {
        state.postloading = true;
      })
      .addCase(serviceComment.rejected, (state, action) => {
        state.postLoading = false;
        state.postError = true;
        state.postMessage = true;
      })
      .addCase(serviceComment.fulfilled, (state, action) => {
        state.postsuccess = true;
        state.postloading = true;
        state.postError = false;
        state.postMessage = action.payload;
        state.post.push(action.payload);
      });
  },
});
