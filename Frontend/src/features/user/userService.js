import axios from "axios";

export const signupService = async (userData) => {
  const response = await axios.post(
    "http://localhost:5174/api/user/signup",
    userData,
  );

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

export const otpService = async (userData) => {
  const response = await axios.post(
    `http://localhost:5174/user/api/verifyOtp/:${userData._id}`,
    userData,
  );
  return response.data;
};

export const loginService = async (userData) => {
  const response = axios.post("http://localhost:5174/user/api/login", userData);
  return response.data;
};
