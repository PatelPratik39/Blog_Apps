const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const db = require("./database/db.js");
// const postRouter = require("./Routes/post");

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);


app.use(cors());
const PORT = process.env.PORT || 3000;

app.get("/test", (req, res) => {
  res.send("Hello World!");
});

// app.use("/api/posts", postRouter);

app.listen(PORT, () => {
  console.log(`app is listening to PORT ${PORT}`);
});
