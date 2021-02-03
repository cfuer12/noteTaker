// dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
// set up the express app
const app = express();
const PORT = process.env.PORT || 3000;
// handles data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});
// should read the db.json file and return all saved notes
app.get("/api/notes", function(req, res) {
  fs.readFile("./db/db.json", (err, data) => {
      if (err) throw err;
      res.send(JSON.parse(data))
  });
});
// post should allow to save the note on the db.json file and return it back onto the notepad
app.post("/api/notes", function(req, res) {
  let newNote = req.body;
  newNote.id = uuid.v4()
  fs.readFile("./db/db.json", (err, data) => {
      if (err) throw err;
      let fileJSON = JSON.parse(data)
      // pushes the note to the db.json for the notes app
      fileJSON.push(newNote)
      fs.writeFile("./db/db.json", JSON.stringify(fileJSON), (err) => {
          if (err) throw err;
          res.status(200).send(true)
      })
  })
});
// delete the note from the db.json file from the notes app
app.delete("/api/notes/:id", function(req, res) {
  const currentID = req.params.id
  fs.readFile("./db/db.json", (err, data) => {
      if (err) throw err;
      let fileJSON = JSON.parse(data)
      for (let i = 0; i < fileJSON.length; i++) {
          if (currentID === fileJSON[i].id) {
              fileJSON.splice(i, 1);
          }
      }
      fs.writeFile("./db/db.json", JSON.stringify(fileJSON), (err) => {
          if (err) throw err;
          res.status(200).send(true)
      })
  })
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});