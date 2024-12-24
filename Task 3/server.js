const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3343;

// Middleware
app.use(express.static("public")); // Serve static files from the 'public' directory
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set("view engine", "ejs");

// Route for the login page
app.get("/", (req, res) => {
  res.render("index"); // Render the login page
});

// Route for handling form submission
app.post("/submit", (req, res) => {
  const { email, password, username, phone } = req.body;

  // Validate form data
  if (
    !email.includes("@") ||
    password.length < 6 ||
    username.length < 3 ||
    !/^\d{10}$/.test(phone)
  ) {
    return res.status(400).send("Invalid form data. Please try again.");
  }

  console.log("Form Data Received:", { email, password, username, phone });

  // Redirect to the landing page after successful submission
  res.redirect("/landing");
});

// Route for the landing page
app.get("/landing", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "landing.ejs")); // Ensure this path is correct
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});