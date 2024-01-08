const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/Blog");  
const blogRouter = require("./routes/BlogRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/blogs", blogRouter);


mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/CRUD",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
  .then(() => {
    console.log("Connected successfully");
  })
  .catch((err) => {
    console.error("Error in connection:", err.message);
  });

// Serve HTML, CSS, and JavaScript as static files
app.use(express.static(__dirname));

// Serve the HTML file when accessing the root URL
app.get("", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Serve the JavaScript code when accessing /client.js
app.get("/client.js", (req, res) => {
  res.sendFile(__dirname + "/client.js");
});

// Serve the CSS code when accessing /styles.css
app.get("/styles.css", (req, res) => {
  res.sendFile(__dirname + "/styles.css");
});

// Add a new route to fetch all blogs
app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find({}, { title: 1, content: 1 });
    console.log("Retrieved blogs:", blogs); // Add this line for debugging
    res.status(200).json({ blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
