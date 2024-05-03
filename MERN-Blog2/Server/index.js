const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const db = require("./database/db");
const postRouter = require("./Routes/post");


const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(cors());
const PORT = process.env.PORT || 3000;

app.use("/", postRouter);
app.use(':/id',postRouter);
app.use("/api/posts", postRouter);

app.listen(PORT, () => {
  console.log(`App is listening to PORT ${PORT}`);
});
