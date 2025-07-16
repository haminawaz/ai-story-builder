const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { Mongoose } = require("./src/configs/database.js");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3001;
const appName = process.env.APP_NAME;
const version = process.env.API_VERSION;

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());

const userRouter = require("./src/routes/user/index.js");

app.use(`/api/${version}/ping`, (req, res) => {
  return res.send("Welcome to Starter code!");
});

// User Routes
app.use(`/api/${version}/users`, userRouter);

app.listen(port, () => {
  console.log(`${appName} App is Running at port ${port}`);
});
