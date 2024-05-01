const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const cookieParser = require("cookie-parser");
const multer = require("multer");
const dotenv = require("dotenv");
// const uploadMiddleware = multer({ dest: "uploads/" });
const uploadMiddleware = multer({
  dest: "uploads/",
  limits: {
    fieldSize: 10 * 1024 * 1024 
  }
});



const fs = require("fs");
const Post = require("./models/Post.js");
const path = require("path");

const app = express();
const PORT = 4000;

// bcrypt the password using salt
const salt = bcrypt.genSaltSync(10);

dotenv.config();
// db Connection
mongoose.connect(process.env.MONGO_URL);

const JWT_SECRET = process.env.JWT_SECRET;
// middlewares
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173"
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static("uploads"));
app.use("/uploads", express.static(__dirname + "/uploads"));

// register Logic
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt)
    });
    res.status(200).json(userDoc);
    console.log("Registration Successful!!");
  } catch (error) {
    res.status(400).json(error);
    console.log("Registration Failed!!");
  }
});

// Login logic
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  console.log(passOk);
  //   if user credentials are matched then i will generate jwt token
  if (passOk) {
    //logged In
    jwt.sign({ username, id: userDoc._id }, JWT_SECRET, {}, (error, token) => {
      if (error) throw error;
      //   res.json(token);
      res.cookie("token", token).json({
        id: userDoc._id,
        username
      });
    });

    // res.status(200).json()
  } else {
    res.status(400).json("Wront Credentials!!");
  }
});

app.get("/profile", (req, res) => {
  // wrappup cookies, i need to get it using token from cookie, the verify it using jwt
  const { token } = req.cookies;
  jwt.verify(token, JWT_SECRET, {}, (error, info) => {
    if (error) throw error;
    res.json(info);
  });
  //   res.json(req.cookies);
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("Now Token empty from cookie, clear!!");
});

// create Post logic
app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const imageFileExtention = parts[parts.length - 1];
  const newPath = path + "." + imageFileExtention;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, JWT_SECRET, {}, async (err, info) => {
    if (err) throw err;
    const { title, summery, content } = req.body;
    const postDoc = await Post.create({
      title,
      summery,
      content,
      cover: newPath,
      author: info.id
    });
    res.json(postDoc);
  });
});

// Edit Post
app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, JWT_SECRET, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summery, content } = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json("you are not the author");
    }
    await Post.findOneAndUpdate(
      { _id: id }, // Filter to find the document to update
      {
        title,
        summery,
        content,
        cover: newPath ? newPath : postDoc.cover
      }
    );

    // Fetch the updated document after updating
    const updatedPostDoc = await Post.findById(id);
    res.json(updatedPostDoc);
  });
});



app.get("/post", async (req, res) => {
  res.json(
    await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});


// post page
app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
});

// app serving PORT
app.listen(PORT, () => {
  console.log(`Bloggzz - App is running on PORT : ${PORT}`);
});

