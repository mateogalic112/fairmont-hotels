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
  (this.name = name),
    (this.person = person),
    (this.price = price),
    (this.pets = pets),
    (this.smoking = smoking),
    (this.rating = rating),
    (this.extras = extras),
    (this.image = image),
    (this.info = info),
    (this.specialOffer = specialOffer);
}

// Room Array

const rooms = [
  new Room(
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
  ),
  new Room(
    "Single Premium Room",
    1,
    220.99,
    true,
    false,
    4.5,
    ["Free Wi-Fi", "Large Balcony"],
    "https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    "Bed sizes are 120 x 210 cm and all rooms are equipped with work desks. Bathrooms feature showers. Smješten nadomak Splita, hotel Le Méridien Lav poziva Vas da istražite svaki kilometar impresivnog jadranskog arhipelaga i smaragdno čistog mora.",
    true
  ),
  new Room(
    "Family Deluxe Room",
    4,
    599.99,
    true,
    true,
    4.9,
    ["Private Garden", "Large Balcony", "Free Pet Area"],
    "https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "Smješten nadomak Splita, hotel Le Méridien Lav poziva Vas da istražite svaki kilometar impresivnog jadranskog arhipelaga i smaragdno čistog mora. Le Méridien Lav je idealno polazište za putovanje dalmatinskom obalom jer se nalazi u blizini povijesnih gradova.",
    true
  ),
];

// Rooms for manipulation
var filteredRooms = rooms;

// Umetanje soba na stranicu
function roomState(currentRooms) {
  var roomsList = document.getElementsByClassName("rooms-list")[0];
  currentRooms.map(createRoomArticle);
  function createRoomArticle(room) {
    var roomItem = document.createElement("article");
    roomItem.classList.add("room-item");
    var roomItemContents = `
        <h4>${room.name}</h4>
        <img
            src="${room.image}"
            width="180"
            height="180"
            alt="presidental-room"
        />
        <div class="room-details">
            <h6>Detail Info</h6>
            <p>
            ${room.info}
            </p>
        </div>
        <div class="room-extras">
            <h5>Extras</h5>
            <div class="room-specials">
            <ul class="extras">
                ${room.extras.map((e) => `<li><span>${e}</span></li>`).join("")}
            </ul>
            <div class="rating">
                <h3>${room.rating}</h3>
            </div>
            </div>
        </div>
        <button class="offer-button">$${room.price} /night</button>
        ${room.specialOffer ? specialOfferDisplay() : ""} 
    `;
    roomItem.innerHTML = roomItemContents;
    roomsList.append(roomItem);
  }

  // Prikaz Special Offera
  function specialOfferDisplay() {
    return `
  <div class="special-offer">
    <h3>Special Offer</h3>
  </div>
  `;
  }
}
roomState(filteredRooms);

// Clear Rooms Before Filter
function clearRooms() {
  var roomsList = document.getElementsByClassName("rooms-list")[0];
  while (roomsList.hasChildNodes()) {
    roomsList.removeChild(roomsList.firstChild);
  }
}

// Filter za Tip Sobe
var roomType = document.getElementById("type");
roomType.addEventListener("change", roomTypeChanged);

function roomTypeChanged(event) {
  var roomType = event.target;
  var roomTypeSelected = roomType.options[roomType.selectedIndex].text;
  console.log(roomTypeSelected);
  clearRooms();
  filteredRooms = rooms.filter(
    (room) => (room.name.split(" ")[0] == roomTypeSelected)
  );
  roomState(filteredRooms);
}

// Filter za Broj Gostiju
var guestNumber = document.getElementById("guest");
guestNumber.addEventListener("change", guestNumberChanged);

function guestNumberChanged(event) {
  var guestNumber = event.target;
  var guestNumberSelected = guestNumber.options[guestNumber.selectedIndex].text;
  console.log(guestNumberSelected);
  clearRooms();
  filteredRooms = rooms.filter(
    (room) => (room.person >= guestNumberSelected)
  );
  roomState(filteredRooms);
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
