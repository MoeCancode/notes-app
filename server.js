const express = require("express");
const { json } = require("express/lib/response");
const fs = require("fs");
const path = require("path");
const uuid = require("./uuid/id")

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))

//API ROUTES



//Send db.json file when route is /api/notes
app.get("/api/notes", (req, res) => {
  var readme = fs.readFileSync(path.join(__dirname, "./db/db.json"), {encoding: "utf-8"})
  readme = JSON.parse(readme);
  return res.json(readme);
});

app.post("/api/notes", (req, res) => {
  
  var readme = fs.readFileSync(path.join(__dirname, "./db/db.json"), {encoding: "utf-8"})
  readme = JSON.parse(readme);
  const { title, text } = req.body;

  if (title && text) {
    // Variable for the object we will save
    const noteWithId = {
      title,
      text,
      note_id: uuid(),
    };

  readme.push(noteWithId);
  // console.log(typeof readme);
  }

  fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify(readme));
  return res.json(readme);
})

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







// 1. Store note title and description in an object and push it to array in db.json file
// 2. Add functionality to save button so that it runs a function to add note to list of notes
// 3. Add event listener to each saved note to be displayed on the right side
// 4. Add functionality to new note button to display text bars for title and description