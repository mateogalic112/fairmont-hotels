// Objekt iz funkcije
function Room(
  name,
  person,
  price,
  pets,
  smoking,
  rating,
  extras,
  image,
  info,
  specialOffer
) {
  name, person, price, pets, smoking, rating, extras, image, info, specialOffer;
}

// Room Array
let room1 = new Room(
  "Single Economy Room",
  1,
  199.99,
  false,
  false,
  4.3,
  ["Free Wi-Fi"],
  "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "The standard single room at Hotel Waldinger is a great choice for any guest! Whether you are in Osijek for business or tourism, our standard single rooms provide complete comfort during your stay.",
  false
);

let room2 = new Room(
  "Single Premium Room",
  1,
  220.99,
  true,
  false,
  4.5,
  ["Free Wi-Fi, Large Balcony"],
  "https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  "Bed sizes are 120 x 210 cm and all rooms are equipped with work desks. Bathrooms feature showers.",
  true
);
const rooms = [room1, room2];

// Umetanje soba na stranicu
var roomsList = document.getElementsByClassName("rooms-list")[0];
rooms.map(createRoomArticle);

function createRoomArticle(room) {
  console.log(room);

  var roomItem = document.createElement("article");
  roomItem.classList.add("room-item");
  var roomItemContents = `
        <h4>3</h4>
        <img
            src="https://images.pexels.com/photos/1267438/pexels-photo-1267438.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            width="180"
            height="180"
            alt="presidental-room"
        />
        <div class="room-details">
            <h6>Detail Info</h6>
            <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae
            nostrum ipsa reiciendis exercitationem quisquam illo tenetur
            nisi nihil itaque reprehenderit illum, explicabo possimus
            aliquam sunt voluptatibus voluptatum placeat dicta architecto.
            </p>
        </div>
        <div class="room-extras">
            <h5>Extras</h5>
            <div class="room-specials">
            <ul class="extras">
                <li><span>Spectacular View</span></li>
                <li><span>Private Pool</span></li>
                <li><span>Welcome Surprise</span></li>
            </ul>
            <div class="rating">
                <h3>4.5</h3>
            </div>
            </div>
        </div>
        <button class="offer-button">$699,99 /night</button>
        <div class="special-offer">
            <h3>Special Offer</h3>
        </div>
    `;
  roomItem.innerHTML = roomItemContents;
  roomsList.append(roomItem);
}

// Filter za Tip Sobe
var roomType = document.getElementById("type");
roomType.addEventListener("change", roomTypeChanged);

function roomTypeChanged(event) {
  var roomType = event.target;
  var roomTypeSelected = roomType.options[roomType.selectedIndex].text;
  console.log(roomTypeSelected);
}

// Filter za Broj Gostiju
var guestNumber = document.getElementById("guest");
guestNumber.addEventListener("change", guestNumberChanged);

function guestNumberChanged(event) {
  var guestNumber = event.target;
  var guestNumberSelected = guestNumber.options[guestNumber.selectedIndex].text;
  console.log(guestNumberSelected);
}

// Filteri za Cijenu Sobe
var minRoomPrice = document.getElementById("minPrice");
minRoomPrice.addEventListener("change", minPriceChanged);

function minPriceChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value < 199.99 || input.value > 699.99) {
    input.value = 199.99;
  }
  console.log(input.value);
}

var maxRoomPrice = document.getElementById("maxPrice");
maxRoomPrice.addEventListener("change", maxPriceChanged);

function maxPriceChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value < 199.99 || input.value > 699.99) {
    input.value = 699.99;
  }
  console.log(input.value);
}

// Filter za Ljubimce
var pets = document.getElementById("pets");
pets.addEventListener("change", function () {
  return this.checked;
});

// Filter za Pusenje
var smoke = document.getElementById("smoking");
smoking.addEventListener("change", function () {
  return this.checked;
});
