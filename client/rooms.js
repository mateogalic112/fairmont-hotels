
const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000/rooms' : 'https://fairmont-api.mateogalic112.vercel.app/rooms';

// Global Rooms
let rooms = [];

// List All Rooms
function listAllRooms() {
  fetch(API_URL)
    .then((res) => res.json())
    .then((items) => {
      items.forEach((item) => {
        rooms.push(item);
      });
      // Initial Rooms
      roomState(rooms);
      // Book Initial Rooms
      roomBooking();
    });
}

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
  if(date1 < new Date()) {
    alert("Arrival not valid!");
    checkInDate.value = null;
  } 
  // Check Out Date
  var checkOutDate = document.getElementById("checkout");
  var date2 = new Date(checkOutDate.value);
  if (date2 < new Date()) {
    alert("Departure not valid!");
    checkOutDate.value = null;
  }
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

  var date1 = document.getElementById("checkin").value;
  var date2 = document.getElementById("checkout").value;

  let desiredRoom = rooms.find(room => room.name === selectedRoomFieldH5.innerText);
  let roomBookingDates = desiredRoom.booked;


  if (selectedRoomFieldH5.innerText === "Pick Your Room") {
    event.preventDefault();
    alert("Please Pick a Room.");
  } else if (total <= 0 || custName.length < 2 || custEmail.length == 0) {
    alert("Some fields are invalid!");
  } else {

    if(checkRoomAvailability(date1, date2, roomBookingDates)) {
      const UPDATE_ROOM_URL = `http://localhost:5000/${desiredRoom._id}`;
      const booked = [date1, date2];
      
      fetch(UPDATE_ROOM_URL, {
        method: 'PATCH',
        body: JSON.stringify(booked),
        headers: {
          "content-type": "application/json"
        }
      })
    } else {
      event.preventDefault();
      return;
    }

    var costumerName = document.getElementById("name").value;
    alert(
      `Thank you ${costumerName} for choosing Fairmont for your dream Holiday!`
    );
  }

}

function checkRoomAvailability(date1, date2, roomBookingDates) {
  for(let i = 0; i < roomBookingDates.length; ++i) {
    if(date1 >= roomBookingDates[i][0] && date1 <= roomBookingDates[i][1]) {
      alert("Arriving date not available! Please try new arriving date!");
      checkInDate.value = null;
      return false;
    } else if (date2 >= roomBookingDates[i][0] && date1 <= roomBookingDates[i][1]) {
        alert("Departure date not available! Please try new departure date!");
        checkOutDate.value = null;
        return false;
    }
  }
  return true;
}

//Rooms Array
listAllRooms();
