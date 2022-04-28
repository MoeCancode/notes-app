const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3001;

app.listen(port);
console .log(`Server started at: http://localhost:${port}`);

//Set index.html as root page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})
//Set notes.html as notes page
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "notes.html"));
})
//Set any other ur; to redirect to index.html page
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})