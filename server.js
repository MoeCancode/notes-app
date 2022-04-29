const express = require("express");
// const { json } = require("express/lib/response");
const path = require("path");
const api = require("./routes/index");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use('/api', api);

// HTML ROUTES
//Set notes.html as notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//Set any other url to redirect to index.html page
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(port);
console.log(`Server started at: http://localhost:${port}`);
