import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    f_name: {
      type: String,
      required: [true, "Please enter first name !!"],
    },

    l_name: {
      type: String,
      required: [true, "Please enter last name !!"],
    },

    gender: {
      type: String,
      required: [true, "Please enter gender !!"],
    },

    date: {
      type: Number,
      required: [true, "Please enter date !!"],
    },

    month: {
      type: String,
      required: [true, "Plaese enter month !!"],
    },

    year: {
      type: Number,
      required: [true, "Please enter year !!"],
    },

    m_mail: {
      type: String,
      required: [true, " Please enter email or phone !!"],
    },

    password: {
      type: String,
      required: [true, "Please enter password !!"],
    },
    otp: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model("User", userSchema);
