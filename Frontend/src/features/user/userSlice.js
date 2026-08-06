import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signupService } from "./userService";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  userLoading: false,
  userSuccess: false,
  userError: false,
  userMessage: "",
};

export const serviceSignup = createAsyncThunk(
  "signup",
  async (userData, thunkAPI) => {
    try {
      return await signupService(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  },
);

export const serviceOtp = createAsyncThunk(
  "verifyOtp",
  async (userData, thunkAPI) => {
    try {
      return await otpService(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  },
);

export const serviceLogin = createAsyncThunk(
  "login",
  async (userData, thunkAPI) => {
    try {
      return await loginService(userData);
    } catch (error) {
      thunkAPI.rejectWithValue(error.response.data.error);
    }
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userReset: (state) => {
      state.userLoading = false;
      state.userError = false;
      state.userSuccess = false;
      state.userMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(serviceSignup.pending, (state, action) => {
        state.userLoading = true;
      })
      .addCase(serviceSignup.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = true;
        state.userMessage = action.payload;
      })
      .addCase(serviceSignup.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userError = false;
        state.userMessage = "Api is fulfilled successfully";
        state.userSuccess = true;
        state.user = action.payload;
      })
      .addCase(serviceOtp.pending, (state, action) => {
        state.userLoading = true;
      })
      .addCase(serviceOtp.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = true;
        state.userMessage = action.payload;
      })
      .addCase(serviceOtp.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userError = false;
        state.userSuccess = true;
        state.userMessage = "Valid OTP";
      });
  },
});

export default userSlice.reducer;
export const { userReset } = userSlice.actions;
