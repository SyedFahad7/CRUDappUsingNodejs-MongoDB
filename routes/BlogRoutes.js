const express = require("express");
const Blog = require("../models/Blog");
const {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/BlogController");

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const { title, body, image } = req.body;

    const numericId = generateUniqueNumericId();

    const newBlog = new Blog({
      numericId,
      title,
      body,
      image,
    });

    await newBlog.save();
    res.status(201).json({
      status: 'success',
      data: [newBlog],
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ status: 'error', message: "Internal Server Error" });
  }
});


router.route("/").get(getAllBlogs);
router.route("/:id").get(getBlogById).put(updateBlog).delete(deleteBlog);

module.exports = router;

router.delete("/:id", async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndRemove(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json({ message: "Blog deleted successfully", deletedBlog });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
