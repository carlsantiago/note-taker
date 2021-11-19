const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');


notes.get('/', (req, res) => {

    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });
  
notes.post('/', (req, res) => {

const { title, text } = req.body;

if (title && text ) {

    const newNote = {
    title,
    text,
    id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
    status: 'success',
    body: newNote,
    };

    res.json(response);
} else {
    res.json('Error in posting note');
}
});

notes.delete('/:id', (req, res) => {
    const noteId = req.params.id

    console.log(noteId)
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        console.log(json)
        const result = json.filter((note) => note.id !== noteId);
  
        // Save that array to the filesystem
        writeToFile('./db/db.json', result);
  
        // Respond to the DELETE request
        res.json(`${noteId} has been deleted 🗑️`);
      });
  });

module.exports = notes;