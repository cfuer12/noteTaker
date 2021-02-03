// const fs = require('fs');
// // starts API
// module.exports = (app) => {
//     // should read the db.json file and return all saved notes
//     app.get('./api/notes', (req, res) => {
//         let data = JSON.parse(fs.readFileSync('./db/db.json'));
//         res.json(data);
//     });
//     // post should allow to save the note on the db.json file and return it back onto the notepad
//     app.post('/api/notes', (req, res) => {
//         let title = req.body.title;
//         let text = req.body.text;
//         let notes;
//         try {
//             notes = JSON.parse(fs.readFileSync('./db/db.json'));
//         }
//         catch (error) {
//             // creates a new array to hold the note objects
//             if (error.message === "End of JSON input") {
//                 notes = [];
//             }
//             else {
//                 throw error;
//             }
//         }
//         let newNote = {
//             id: notes.lenght,
//             title: title,
//             text: text
//         }
//         // pushes the note to the db.json for the notes app
//         notes.push(newNote);
//         fs.writeFile('./db/db.json', JSON.stringify(allNotes), function(err) {
//             if (err) throw err;
//         });
//         res.send(newNote);
//     });
//     // delete the note from the db.json file from the notes app
//     app.delete('/api/notes/:id', (req, res) => {
//         let id = parseInt (req.params.id);
//         if (isNaN(id)) {
//             res.sendStatus(400)
//         }
//         else {
//             let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
//             data.splice(id, 1);
//             for (let i = 0; i < data.length; i++) {
//                 data[0].id = i;
//             }
//             fs.writeFile('./db/db.json', JSON.stringify(data), function (err) {
//                 if (err) throw err;
//             });
//         }
//     });
// }