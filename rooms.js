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
  specialOffer,
  featured
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
    (this.specialOffer = specialOffer),
    (this.featured = featured);
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
    false,
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
    true,
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
    true,
    true
  ),
];

// Umetanje soba na stranicu Rooms
function roomState(currentRooms) {
  var roomsList = document.getElementsByClassName("rooms-list")[0];
  currentRooms.map((room) => createRoomArticle(room, roomsList));
  // Adding event listeners to room price buttons
  roomBooking();
}

// Article Creation
function createRoomArticle(room, roomsList) {
  var roomItem = document.createElement("article");
  roomItem.classList.add("room-item");
  var roomItemContents = `
      <h4>${room.name}</h4>
      <img
          src="${room.image}"
          width="180"
          height="180"
          alt="${room.name}"
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
      <button class="offer-button room-pricing">$${room.price} /night</button>
      ${room.specialOffer ? specialOfferDisplay() : ""} 
  `;
  roomItem.innerHTML = roomItemContents;
  roomsList.append(roomItem);
}

// Specijal Offer Banner
function specialOfferDisplay() {
  return `
<div class="special-offer">
  <h3>Special Offer</h3>
</div>
`;
}

// Clear Rooms Before Filter
function clearRooms() {
  var roomsList = document.getElementsByClassName("rooms-list")[0];
  while (roomsList.hasChildNodes()) {
    roomsList.removeChild(roomsList.firstChild);
  }
}

// Filter za Tip Sobe
var roomType = document.getElementById("type");
roomType.addEventListener("change", searchFilteredRooms);

// Filter za Broj Gostiju
var guestNumber = document.getElementById("guest");
guestNumber.addEventListener("change", searchFilteredRooms);

// Filteri za Cijenu Sobe
var minRoomPrice = document.getElementById("minPrice");
minRoomPrice.addEventListener("change", minPriceChanged);
// Validacija za min price
function minPriceChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value < 199.99 || input.value > 699.99) {
    input.value = 199.99;
  }
  searchFilteredRooms();
}

var maxRoomPrice = document.getElementById("maxPrice");
maxRoomPrice.addEventListener("change", maxPriceChanged);
// Validacija za max price
function maxPriceChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value < 199.99 || input.value > 699.99) {
    input.value = 699.99;
  }
  searchFilteredRooms();
}

// Filter za Ljubimce
var pets = document.getElementById("pets");
pets.addEventListener("change", searchFilteredRooms);

// Filter za Pusenje
var smoke = document.getElementById("smoking");
smoking.addEventListener("change", searchFilteredRooms);

// Rooms filter
function searchFilteredRooms() {
  // Room Type
  var roomTypeSelected = roomType.options[roomType.selectedIndex].text;
  // Number of Guests
  var guestNumberSelected = guest.options[guest.selectedIndex].text;
  // Price Range
  var minRoomPriceSet = minRoomPrice.value;
  var maxRoomPriceSet = maxRoomPrice.value;
  // Pets
  var petsSet = pets.checked;
  // Smoking
  var smokeSet = smoke.checked;

  // Clear Rooms before Filter
  clearRooms();
  // Filter rooms
  newRooms = rooms.filter(
    (room) =>
      (room.name.split(" ")[0] === roomTypeSelected ||
        roomTypeSelected === "All") &&
      (room.person >= guestNumberSelected || guestNumberSelected === "-") &&
      room.price >= minRoomPriceSet &&
      room.price <= maxRoomPriceSet &&
      (petsSet ? room.pets == petsSet : true) &&
      (smokeSet ? room.smoking == smokeSet : true)
  );
  // Make them appear in website
  roomState(newRooms);
}

// Global Scope Variable Room Price
var roomPrice = 0;

// Book A Room
function roomBooking() {
  const roomPriceButtons = document.getElementsByClassName("room-pricing");
  for (var i = 0; i < roomPriceButtons.length; i++) {
    var button = roomPriceButtons[i];
    button.addEventListener("click", roomSelected);
  }
}

// Room Selected Event
function roomSelected(event) {
  var buttonClicked = event.target;
  var selectedRoomItem = buttonClicked.parentElement;

  // Getting Room Name
  var selectedRoomName = selectedRoomItem.querySelector("h4").innerText;
  // Getting Room Price
  var selectedRoomPrice = parseFloat(
    selectedRoomItem
      .querySelector(".room-pricing")
      .innerText.replace("$", "")
      .split(" ")[0]
  );
  roomPrice = selectedRoomPrice;

  // Setting Values in Booking Fields
  var selectedRoomField = document.querySelector("#selectedRoom");
  var selectedRoomFieldH5 = selectedRoomField.querySelector("h5");
  selectedRoomFieldH5.innerText = selectedRoomName;

  calculateTotal();
}

// Date Changed
var checkInDate = document.getElementById("checkin");
checkInDate.addEventListener("change", calculateTotal);

var checkOutDate = document.getElementById("checkout");
checkOutDate.addEventListener("change", calculateTotal);

// Calculate Total Booking Price
function calculateTotal() {
  // Check In Date
  var checkInDate = document.getElementById("checkin");
  var date1 = new Date(checkInDate.value);
  // Check Out Date
  var checkOutDate = document.getElementById("checkout");
  var date2 = new Date(checkOutDate.value);
  // Razlika u danima
  var diffTime = date2 - date1;

  if (diffTime <= 0) {
    alert("Provide Valid Dates");
  }
  var diffInDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Total Value
  var totalItem = document.querySelector(".total-container");
  var total = parseFloat(
    totalItem.querySelector("h4").innerText.replace("$", "")
  );

  //Preset Total
  total = roomPrice * diffInDays;
  if (isNaN(total) || total <= 0) total = 0;
  totalItem.querySelector("h4").innerText = "$" + total;
}

// Booking Button
var bookingButton = document.getElementById("book-btn");
bookingButton.addEventListener("click", submitBooking);

function submitBooking(event) {
  // Setting Values in Booking Fields
  var selectedRoomField = document.querySelector("#selectedRoom");
  var selectedRoomFieldH5 = selectedRoomField.querySelector("h5");
  var custName = document.querySelector("#name").value;
  var custEmail = document.querySelector("#email").value;

  var totalItem = document.querySelector(".total-container");
  var total = parseFloat(
    totalItem.querySelector("h4").innerText.replace("$", "")
  );
  if (selectedRoomFieldH5.innerText === "Pick Your Room") {
    event.preventDefault();
    alert("Please Pick a Room.");
  } else if (total <= 0 || custName.length < 2 || custEmail.length == 0) {
    alert("Some fields are invalid!");
  } else {
    var costumerName = document.getElementById("name").value;
    alert(
      `Thank you ${costumerName} for choosing Fairmont for your dream Holiday!`
    );
  }
}

// Initial Rooms
roomState(rooms);
// Initial Booking
roomBooking();
