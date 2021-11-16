const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog.js');
const api = require('./routes/notes.js');

const PORT = 3001;

const app = express();

app.use(clog);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

//Get route for homepage
app.get('/', (req,res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);
//Get route for note page
app.get('/notes', (req,res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
);