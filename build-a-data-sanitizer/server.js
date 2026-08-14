const express = require("express");
const path = require("path");

const { inputCleaner, inputValidator } = require("./middleware");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.redirect("/form");
});

app.get("/form", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/submit", inputCleaner, inputValidator, (req, res) => {
  const username = req.body.username || "";
  const comment = req.body.comment || "";

  res.status(200).send(`Username: ${username}\nComment: ${comment}`);
});

// port 3000 is used for local development, but you can change it to any port you prefer

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
