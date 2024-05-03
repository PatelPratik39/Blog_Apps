const mongoose = require("mongoose");

// Define the schema for the Post
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// need to create a Post Model
const Post = mongoose.model("Post", PostSchema);

// need to export the model
module.exports = Post;
