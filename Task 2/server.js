const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3343;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/submit", (req, res) => {
  const { email, password, username, phone } = req.body;

  if (
    !email.includes("@") ||
    password.length < 6 ||
    username.length < 3 ||
    !/^\d{10}$/.test(phone)
  ) {
    return res.status(400).send("Invalid form data. Please try again.");
  }

  console.log("Form Data Received:", { email, password, username, phone });

  res.send(`
    <h1>Form Submitted Successfully!</h1>
    <p>Email: ${email}</p>
    <p>Password: ${password}</p>
    <p>Username: ${username}</p>
    <p>Phone: ${phone}</p>
  `);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
