const express = require("express");
const mongoose = require("mongoose");
const blogRouter = require("./routes/BlogRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/blogs", blogRouter);

// Configures mongoose.....
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/CRUD",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

// Serve HTML, CSS, and JavaScript as static files
app.use(express.static(__dirname));

// Serve the HTML file when accessing the root URL
app.get("/", (req, res) => {
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

// Listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
