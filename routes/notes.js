const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
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
    console.info(`${req.method} request received to submit notes`);
    const { title, text } = req.body;
    if (title && text) {
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


// Delete Route for deleting a specific note based on ID
notes.delete('/notes/:id', (req, res) => {
  const noteID = req.params.id;
  readFromFile('./db/db.json')
  .then((data) => JSON.parse(data))
  .then((json) => {
      const result = json.filter((note) =>  note.id !== noteID);
      writeToFile("./db/db.json", result);
      res.json(`Note ${noteID} has been deleted`);
  });
});

module.exports = notes;
