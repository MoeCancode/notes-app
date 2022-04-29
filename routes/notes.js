const express = require("express");
const notesRouter = express.Router();
const fs = require("fs");
const uuid = require("../uuid/id");
const path = require("path");

//Send db.json file when route is /api/notes
notesRouter.get("/", (req, res) => {
  var readme = fs.readFileSync(path.join(__dirname, "../db/db.json"), {
    encoding: "utf-8",
  });
  readme = JSON.parse(readme);
  // console.info(req.method);
  return res.json(readme);
});

//Adding IDs to newly created notes and writing to db.json
notesRouter.post("/", (req, res) => {
  var readme = fs.readFileSync(path.join(__dirname, "../db/db.json"), {
    encoding: "utf-8",
  });
  readme = JSON.parse(readme);
  const { title, text } = req.body;

  if (title && text) {
    // Variable for the object we will save
    const noteWithId = {
      title,
      text,
      id: uuid(),
    };

    readme.push(noteWithId);
    // console.log(typeof readme);

    fs.writeFileSync(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify(readme)
    );
  }
  else {
      res.error("Note creation failed");
  }
  return res.json(readme);
});

//Deleting a note with a specific ID
notesRouter.delete("/:id", (req, res) => {
  console.log("Dekh k delete kar dena");
  var noteId = req.params.id;

  var readdb = fs.readFileSync(path.join(__dirname, "../db/db.json"), {
    encoding: "utf-8",
  });
  readdb = JSON.parse(readdb);

  for (let i = 0; i < readdb.length; i++) {
    console.log(readdb[i].id);
    if (readdb[i].id == noteId) {
      var newArray = readdb.filter((data) => data.id !== noteId);
      console.log(newArray);

      fs.writeFileSync(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify(newArray)
      );
    } else {
      console.log("Error");
    }
  }
  return res.json(newArray);
});

module.exports = notesRouter;
