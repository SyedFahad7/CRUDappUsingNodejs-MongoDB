const BlogModel = require("../models/Blog");

exports.getAllBlogs = async () => {
  return await BlogModel.find();
};

exports.createBlog = async (blog) => {
  return await BlogModel.create(blog);
};
exports.updateBlog = async (id, blog) => {
  return await BlogModel.findByIdAndUpdate(id, blog);
};

exports.deleteBlog = async (id) => {
  return await BlogModel.findByIdAndDelete(id);
};
exports.getBlogById = async (blogId) => {
  try {
    const blog = await BlogModel.findById(blogId);
    return blog;
  } catch (error) {
    throw new Error("Error fetching blog by ID");
  }
};
