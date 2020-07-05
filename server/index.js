const express = require('express');
const monk = require('monk');
const cors = require('cors');

const app = express();

app.use(cors());

const db = monk('localhost/fairmont');
const rooms = db.get('rooms');
const food = db.get('food');
const wine = db.get('wine');

app.get('/', (req, res) => {
    res.json({ message: "Garden"})
});

app.get('/rooms', (req, res) => {
    rooms.find()
        .then(rooms => {
            res.json(rooms)
        })
});

app.get('/food', (req, res) => {
    food.find()
        .then(food => {
            res.json(food);
        })
})

app.get('/wine', (req, res) => {
    wine.find()
        .then(wine => {
            res.json(wine);
        })
});

app.listen(5000, () => {
    console.log('Listening on port 5000');
});