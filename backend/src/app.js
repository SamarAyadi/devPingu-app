import express from "express";
import { connectDB } from "./config/database.js";

const app = express();
const port = 7777;

app.use(express.json())

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(port, () => {
      console.log(`Server is successfully listening on port ${port}!`);
    });
  })
  .catch((err) => {
    console.error("Dtabase cannot be connected");
  });
