const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./conifg/db");
const router = require("./routes");
const cookieParser = require("cookie-parser");

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
console.log("CORS allowed origin:", process.env.FRONTEND_URL);

app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Backend is running");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("connect to DB");
    console.log("Server is running");
  });
});
