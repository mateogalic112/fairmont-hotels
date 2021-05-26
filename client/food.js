window.addEventListener("DOMContentLoaded", function () {
  listAllFoods();
  listAllWines();
});

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/food"
    : "https://fairmont-api.mateogalic112.vercel.app/food";

// Global Foods
let foods = [];

// List All Foods
function listAllFoods() {
  fetch(API_URL)
    .then((res) => res.json())
    .then((items) => {
      items.forEach((item) => {
        foods.push(item);
      });
      // Initial Rooms
      foodState(foods);
      createMenuButtons();
    });
}

// Umetanje hrane na stranicu
function foodState(foodArray) {
  let foodList = document.querySelector(".food-wrapper");
  foodArray.map((food) => createFoodArticle(food, foodList));
}

// Kreiranje Artikla Food
function createFoodArticle(food, foodList) {
  let foodItem = document.createElement("article");
  foodItem.classList.add("food-item");
  let foodItemContents = `
    <img src=${food.image} alt="food" class="photo">
    <div class="food-info">
      <header class="food-header">
        <h4>${food.name}</h4>
        <div class="food-rating">
          <h3>${food.rating.toFixed(1)}</h3>
        </div>
      </header>
      <p>
        ${food.description}
      </p>
    </div>
    `;
  foodItem.innerHTML = foodItemContents;
  foodList.append(foodItem);
}

// Kreiraj botune za filter
function createMenuButtons() {
  // Dohvacanje containera
  const btnContainer = document.querySelector(".btn-container");

  // Dohvacanje kategorija iz food itema
  const categories = foods.reduce(
    (items, item) => {
      if (!items.includes(item.category)) {
        items.push(item.category);
      }
      return items;
    },
    ["all"]
  );

  // Kreiranje filter botuna
  const categoryBtns = categories
    .map((category) => {
      return `
        <button type="button" class="filter-btn" data-id=${category}>
        ${category} </button>
      `;
    })
    .join("");

  btnContainer.innerHTML = categoryBtns;
  const filterBtns = btnContainer.querySelectorAll(".filter-btn");
  const itemContainer = document.querySelector(".food-wrapper");
  //Dodavanje listenera filter botunima
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      const category = e.target.dataset.id;
      const menuCategory = foods.filter((item) => {
        if (item.category === category) return item;
      });
      console.log(menuCategory);
      if (category === "all") {
        itemContainer.innerHTML = "";
        foodState(foods);
      } else {
        itemContainer.innerHTML = "";
        foodState(menuCategory);
      }
    });
  });
}

/* Food Area Finish */

/* Wine Area Start */

// Wine URL
const API_URL_W =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/wine"
    : "https://fairmont-api.mateogalic112.vercel.app/wine";

// Global Wines
let wines = [];

// List All Wines
function listAllWines() {
  fetch(API_URL_W)
    .then((res) => res.json())
    .then((items) => {
      items.forEach((item) => {
        wines.push(item);
      });
      // Initial Wines
      wineState(wines);
    });
}

// Umetanje vina na stranicu
function wineState(wineArray) {
  let wineList = document.querySelector(".wine-list");
  wineArray.map((wine) => createWineArticle(wine, wineList));
}

// Kreiranje Wine Carda
function createWineArticle(wine, wineList) {
  let wineCard = document.createElement("div");
  wineCard.classList.add("wine-card");
  wine.category === "red"
    ? wineCard.classList.add("red")
    : wineCard.classList.add("white");
  let wineCardContent = `
  <h4>${wine.name}</h4>
  <div class="card-body">
    <img src="${wine.image}" alt="wine">
    <p>
      ${wine.description}
    </p>
    <h3>${wine.year}</h3>
  </div>
  `;
  wineCard.innerHTML = wineCardContent;
  wineList.append(wineCard);
}

const rightArrow = document.querySelector(".fa-arrow-right");
const leftArrow = document.querySelector(".fa-arrow-left");
const wineList = document.querySelector(".wine-list");
const wineListSize = document.getElementsByClassName("wine-card");
const wineListWrapper = document.querySelector(".wine-list-wrapper");
let wrapperPositionInfo = wineListWrapper.getBoundingClientRect();
let wrapperWidth = wrapperPositionInfo.width;

let counter = 0;

rightArrow.addEventListener("click", () => {
  if (counter < wineListSize.length - Math.round(wrapperWidth / 200) + 1) {
    counter++;
    wineList.style.transform = `translateX(${-200 * counter}px)`;
  } else return;
});

leftArrow.addEventListener("click", () => {
  if (counter > 0) {
    counter--;
    wineList.style.transform = `translateX(${-200 * counter}px)`;
  } else return;
});

/* Wine Area Finish*/
