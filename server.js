//web application framework in node.js
//create server-side applications and APIs easily
import express from "express";
//HTTP request logger middleware for node.js
import morgan from "morgan";
// dotenv is for .env file
import * as dotenv from "dotenv";
// custom middleware error
import errorHandlerMiddleWare from "./middleWare/errorHandlerMiddleWare.js";
import { authenticateCheck } from "./middleWare/authMiddleWare.js";
// database
import mongoose from "mongoose";

// body parser is required for sending the request body and receiving the response
import bodyParser from "body-parser";

// router
import jobRouter from "./router/jobRouter.js";
import authRouter from "./router/authRouter.js";
import userRouter from "./router/userRouter.js";

//public
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// cookie
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
//es6 module
const __dirname = dirname(fileURLToPath(import.meta.url));
//special middleware for
app.use(express.static(path.resolve(__dirname, "./public")))
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cookieParser());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

const port = process.env.PORT || 5100;
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
app.get("/api/v1/test", (req, res) => {
  res.send({ msg: "test page" });
});
app.use("/api/v1/jobRoute", authenticateCheck, jobRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", authenticateCheck, userRouter);

//error in url
app.use("*", (req, res) => {
  res.status(404).json({ msg: "page not found" });
});

app.use(errorHandlerMiddleWare);
