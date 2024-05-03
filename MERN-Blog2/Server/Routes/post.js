const express = require("express");
const Post = require("../model/Post");
const router = new express.Router();

// These are the middleware for the REST API responses

// Create Post

router.post("", (req, res, next) => {
  const post = new Post({
    title: req.bosy.title,
    content: req.body.content,
    author: req.body.author
  });
  post
    .save()
    .then((post) => {
      if (post) {
        res.status(201).json({
          message: " Post added successfully",
          post: {
            ...post,
            id: post._id
          }
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

// GET Post (READ operation)

router.get("/mypost", (req, res, next) => {
  Post.find({ creator: req.userData.userId })
    .then((post) => {
      if (post) {
        res.status(200).json({
          message: "Post Fetched Successfully",
          posts: post
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

// Update Post

router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.bosy.title,
    content: req.body.content
  });
  Post.updateOne({ _id: req.params.id }, post).then((result) => {
    if (result) {
      res.status(200).json({ message: "Update successful!" });
    } else {
      res.status(500).json({ message: "Error Upating Post" });
    }
  });
});

//  Delete Post
router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id, creator: req.params.userId }).then(
    (result) => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Delete successful!!" });
      } else {
        return res.status(401).json({ message: "Not Authorized!!!" });
      }
    }
  );
});
