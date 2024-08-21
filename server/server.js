import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World! env masuk nih bosss");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
