const notes = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');


notes.get('/', (req, res) => {
    console.log("YES")
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });
  

module.exports = notes;