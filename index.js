import connectDB from "./src/connection/connect.js";
import express from "express";
import bodyParser from "body-parser";
import dotEnv from "dotenv";
import morgan from "morgan";
import tourRouter from "./src/routes/tours.js";
import authRouter from "./src/routes/auth.js";
import userRouter from "./src/routes/user.js";
import reviewRouter from "./src/routes/reviews.js";
import bookingRouter from "./src/routes/booking.js";

import cookieParser from "cookie-parser";
import cors from "cors";
dotEnv.config();
//
const port = process.env.PORT || 8000;
const corsOpption = {
  origin: true,
  credential: true,
};
//
const app = express();

connectDB();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOpption));
app.use(morgan("dev"));
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/booking", bookingRouter);

app.listen(port, () => {
  console.log("My app run port : " + `${port}`);
});
