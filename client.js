document.addEventListener("DOMContentLoaded", function () {
  // Fetch blogs when the page loads
  fetchBlogs();

  // Handle form submission
  document.getElementById("blogForm").addEventListener("submit", function (event) {
    event.preventDefault();
    createBlog();
  });
});

// Function to create a new blog
function createBlog() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  console.log("Creating blog with title:", title, "and content:", content);

  fetch("/api/blogs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content }),
  })
    .then(response => response.json())
    .then(data => {
      console.log("Blog created:", data);
      fetchAllBlogs(); // Refresh the list of blogs after creating a new one
    })
    .catch(error => console.error("Error creating blog:", error));
}


// Function to fetch all blogs
async function fetchAllBlogs() {
  try {
    const response = await fetch("http://localhost:3001/api/blogs");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched data:", data); 
    displayBlogs(data.blogs); 
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
}

// Function to display the list of blogs
function displayBlogs(blogs) {
  const blogsList = document.getElementById("blogsList");
  blogsList.innerHTML = "";

  blogs.forEach(blog => {
    const blogElement = document.createElement("div");
    blogElement.classList.add("blog-entry"); // Add a class for styling
    blogElement.innerHTML = `
      <h3>${blog.title}</h3>
      <p>${blog.content || ""}</p> <!-- Display content or an empty string if undefined -->
      <button onclick="deleteBlog('${blog._id}')">Delete</button>
    `;
    blogsList.appendChild(blogElement);
  });
}
function deleteBlog(blogId) {
  console.log("Deleting blog with ID:", blogId);

  fetch(`/api/blogs/${blogId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log("Blog deleted:", data);
      fetchBlogs(); 
    })
    .catch(error => console.error("Error deleting blog:", error));
}
function showBlogContent(blogId) {
  fetch(`http://localhost:3001/api/blogs/${blogId}`)
    .then(response => response.json())
    .then(data => {
      console.log("Blog Content Response:", data); // Log the entire response
      const blog = data.blogs[0];
      const content = blog.body || blog.content || "No content available";
      alert(`Blog Content:\n\n${content}`);
    })
    .catch(error => console.error("Error fetching blog content:", error));
}