const express = require("express");
const monk = require("monk");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = monk("localhost/fairmont");
const rooms = db.get("rooms");
const food = db.get("food");
const wine = db.get("wine");

app.get("/rooms", (req, res) => {
  rooms.find().then((rooms) => {
    res.json(rooms);
  });
});

app.get("/food", (req, res) => {
  food.find().then((food) => {
    res.json(food);
  });
});

app.get("/wine", (req, res) => {
  wine.find().then((wine) => {
    res.json(wine);
  });
});

app.patch("/:roomId", (req, res) => {
  try {
    rooms.update(
      { _id: req.params.roomId },
      { $addToSet: { booked: req.body } }
    ); 

  } catch (err) {
    res.json(err);
  }
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
