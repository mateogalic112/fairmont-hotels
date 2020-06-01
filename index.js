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
      <button class="offer-button">$${room.price} /night</button>
      `;
      roomArticle.innerHTML = roomArticleContents;
      featuredRoomsArea.append(roomArticle);
    }
  }
  
  featuredRooms(rooms);