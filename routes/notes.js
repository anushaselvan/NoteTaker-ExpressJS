const notes = require('express').Router();
const { response } = require('express');
const { readFromFile, readAndAppend, writeToFile, updateDelete } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');


// GET Route for retrieving one note
notes.get('/notes/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.noteId === noteId);
      return result.length > 0
        ? res.json(JSON.parse(result))
        : res.json('No note with that id');
    });
});

// GET Route for retrieving all the notes
notes.get('/notes', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/db.json').then((data) => {
  res.json(JSON.parse(data))});
});


// POST Route for submitting a note
notes.post('/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to submit notes`);
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;
  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuid(),
    };
    readAndAppend(newNote, './db/db.json');
    const response = {
      status: 'success',
      body: newNote,
    };
    res.json(response);
  } else {
    res.error('Error in posting Note');
  }
});

/*notes.get('/notes/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.noteId === noteId);
      return result.length > 0
        ? res.json(JSON.parse(result))
        : res.json('No note with that id');*/
// Delete Route for deleting a specific note based on ID
notes.delete('/notes/:id', (req, res) => {
  const noteID = req.params.id;
readFromFile('./db/db.json')
.then((data) => JSON.parse(data))
.then((json) => {
console.info(`${json} is the array`);
 const result = json.filter((note) =>  note.id !== noteID);

 console.info(`${result} is the result`);
//const index = json.indexOf(result);
 //json.splice(index);
 writeToFile("./db/db.json", result);
 //readFromFile("./db/db.json"); 
 res.json(`Note ${noteID} has been deleted`);

});
});
 /*
const noteID = req.params.id;
  console.log("noteID", noteID);
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((notesData) => {
      const result = notesData.filter((note) => note.id !== noteID);
      console.log("result", result);
      writeToFile("./db/db.json", result);
      res.json(`item ${noteID} has been deleted`);
    })
    .catch((error) => console.error(error));
*/
module.exports = notes;
