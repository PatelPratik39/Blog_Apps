const router = require("express").Router();
const blogs = require("../models/blogs");

// POST
router.post("/post", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newPost = new blogs({ title, description });
    await newPost
      .save()
      .then(() =>
        res.status(200).json({ message: "POST Data saved successfully!!" })
      );
  } catch (error) {
    res.status(400).json({ message: "Some Error Occured!!" });
  }
});
// GET
router.get("/", async (req, res) => {
  try {
    const data = await blogs.find().sort({ createdAt: -1 });
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(400).json({ message: "Some Error Occured!!" });
  }
});

module.exports = router;
