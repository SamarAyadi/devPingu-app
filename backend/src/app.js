import express from "express";
import { connectDB } from "./config/database.js";
import authRouter from "./routes/auth.js";
import cookieParser from "cookie-parser"





const app = express();
const port = 7777;

app.use(express.json())
app.use(cookieParser());



app.use("/", authRouter);

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(port, () => {
      console.log(`Server is successfully listening on port ${port}!`);
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected");
  });
