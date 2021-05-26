window.addEventListener("DOMContentLoaded", function () {
  listAllFeaturedRooms();
});

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/rooms"
    : "https://fairmont-api.mateogalic112.vercel.app/rooms";

// Global Foods
let rooms = [];

// List All Foods
function listAllFeaturedRooms() {
  fetch(API_URL, {
    mode: "no-cors",
  })
    .then((res) => res.json())
    .then((items) => {
      items.forEach((item) => {
        rooms.push(item);
      });
      // Initial Rooms
      featuredRooms(rooms);
    });
}

// Umetanje soba u Featured Rooms
function featuredRooms(rooms) {
  var featuredRoomsArea = document.getElementsByClassName("featured-rooms")[0];
  var getRooms = rooms.filter((room) => room.featured === true);
  getRooms.map(createFeaturedRoomArticle);
  function createFeaturedRoomArticle(room) {
    var roomArticle = document.createElement("article");
    roomArticle.classList.add("featured-room");
    var roomArticleContents = `
      <h4>${room.name}</h4>
      <img
        src="${room.image}"
        width="180"
        height="180"
        alt="${room.name}"
      />
      <ul class="extras">
        ${room.extras.map((e) => `<li><span>${e}</span></li>`).join("")}
      </ul>
      <button class="offer-button" onclick="location.href='rooms.html'">$${
        room.price
      } /night</button>
      `;
    roomArticle.innerHTML = roomArticleContents;
    featuredRoomsArea.append(roomArticle);
  }
}
