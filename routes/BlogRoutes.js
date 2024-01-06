const express = require("express");
const {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/BlogController");

const router = express.Router();

// Create a new blog
router.post("/", createBlog);

// Get all blogs
router.get("/", getAllBlogs);

// Get a specific blog by ID, update, and delete
router.route("/:id")
  .get(getBlogById)
  .put(updateBlog)
  .delete(deleteBlog);

module.exports = router;
