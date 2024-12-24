const express = require('express');
const app = express();
const port = 3000;


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.render('index'); 
});

app.post('/submit', (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    res.send(`
      <h1>Login Successful!</h1>
      <p>Email: ${email}</p>
      <p>Password: ${password}</p>
      <a href="/">Back to Login</a>
    `);
  } else {
    res.send(`
      <h1>Login Failed!</h1>
      <p>Please enter both email and password.</p>
      <a href="/">Try Again</a>
    `);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
