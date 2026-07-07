import express, { urlencoded } from "express";
import dotenv from "dotenv";
import colors from "colors";
import { userRoute } from "./Routes/userRoute.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { connectDB } from "./Config/connect.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());

connectDB();

app.use(express.json());
app.use(urlencoded({ extended: false }));

app.use("/user/api", userRoute);

app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`.cyan),
);
