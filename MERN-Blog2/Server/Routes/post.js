const express = require("express");
const Post = require("../model/Post");
const router = new express.Router();

// These are the middleware for the REST API responses

// Create Post

router.post("", async (req, res, next) => {
  if (!req.body || !req.body.title || !req.body.content || !req.body.author) {
    return res.status(400).json({ message: "Invalid request body" });
  }
  //   lets check if a post with same title, and content exist or not?
  const existPost = await Post.findOne({
    $or: [{ title: req.body.title }, { content: req.body.content }]
  });
  if (existPost)
    return res.status(400).json({
      message: "What are you doing man!!!, Post is already Exist... "
    });

  const post = new Post({
    title: req.body.title,
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

// router.get("/mypost", (req, res, next) => {
//   Post.find({ creator: req.userData.userId })
//     .then((post) => {
//       if (post) {
//         res.status(200).json({
//           message: "Post Fetched Successfully",
//           posts: post
//         });
//       }
//     })
//     .catch((error) => {
//       console.error("Error fetching posts:", error);
//       res.status(500).json({ message: "Internal server error" });
//     });
// });

// without middleware set up  i can fetch my post like below:
router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      message: "Posts Fetched Successfully",
      posts: posts
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET all posts
router.get("/api/posts", async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// get by id
router.get("/:id", (req, res, next) => {
  const postId = req.params.id;
  Post.findById(postId)
    .then((posts) => {
      res.status(200).json({
        message: "Posts Fetched Successfully",
        posts: posts
      });
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

// Update Post

router.put("/:id", (req, res, next) => {
  const postId = req.params.id;
  const updatedPostData = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };
  Post.findByIdAndUpdate(postId, updatedPostData, { new: true })
    .then((updatedPost) => {
      if (updatedPost)
        return res
          .status(200)
          .json({ message: "Update successful", post: updatedPost });
      else return res.status(404).json({ message: "Page Not found" });
    })
    .catch((error) => {
      console.error("Error updating post:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

//  Delete Post
router.delete("/:id", async (req, res, next) => {
  try {
    const postId = req.params.id;

    const existingPost = await Post.findById(postId);
    if (!existingPost)
      return res.status(404).json({ message: "Post not found" });
    const removePost = await Post.deleteOne({ _id: postId });
    console.log(removePost);
    res.status(200).json({ message: "Delete successful" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
