const express = require('express');
const monk = require('monk');

const app = express();

const db = monk('localhost/fairmont');
const rooms = db.get('rooms');

app.get('/', (req, res) => {
    res.json({ message: "Garden"})
});

app.get('/rooms', (req, res) => {
    rooms.find()
        .then(rooms => {
            console.log(rooms);
        })
});

app.listen(5000, () => {
    console.log('Listening on port 5000');
});