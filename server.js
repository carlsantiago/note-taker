const express = require('express');
const path = require('path');
const { readAndAppend } = require('./helpers/fsUtils');

const { clog } = require('./middleware/clog');
const notesRouter = require('./routes/notes')
const PORT = process.env.port || 3001;

const app = express();

app.use(clog);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/api/notes', notesRouter)
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
