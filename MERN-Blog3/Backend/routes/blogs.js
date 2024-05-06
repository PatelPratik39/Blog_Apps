const router = require("express").Router();
const blogs = require("../models/blogs");

// POST
router.post("/post", async (req, res) => {
  if (!req.body || !req.body.title || !req.body.description) {
    return res.status(400).json({ message: "Invalid request body" });
  }
  //   lets check if a post with same title, and content exist or not?
  const blogExist = await blogs.findOne({
    $or: [{ title: req.body.title }, { content: req.body.description }]
  });
  if (blogExist)
    return res.status(400).json({
      message: "What are you doing Buddy!!!, Blog is already Exist...!! "
    });

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

//  GET Recent Blogs
router.get("/recentBlogs", async (req, res) => {
  try {
    const data = await blogs.find().sort({ createdAt: -1 }).limit(3);
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(400).json({ message: "Some Error Occured!!" });
  }
});

// getBlogs by id
router.get("/getBlog/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await blogs.findById(id);
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(400).json({ message: "Some Error Occured!!" });
  }
});

// UPDATE by id

router.put("/updateBlog/:id", async (req, res) => {
  try {
    const { id } = req.params;
     const { title, description } = req.body;
    const data = await blogs.findByIdAndUpdate(id, {title, description});
    res.status(200).json({ message : "Your Blog updated successfully" });
  } catch (error) {
    res.status(400).json({ message: "Some Error Occured!!" });
  }
});


module.exports = router;
