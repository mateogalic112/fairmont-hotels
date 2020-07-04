/* Food Area Start */

// Konstrkutor funkcija
function Food(name, rating, image, description, category) {
  (this.name = name),
    (this.rating = rating),
    (this.image = image),
    (this.description = description),
    (this.category = category);
}

// Hard-Kodirani niz Food objekata
const foods = [
  new Food(
    "Fluffy Pancakes",
    4.7,
    "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    "Pancakes may be served at any time of the day with a variety of toppings or fillings but in America they are typically considered a breakfast food.",
    "breakfast"
  ),
  new Food(
    "Juicy Steak",
    5.0,
    "https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    "Steak can also be cooked in sauce, such as in steak and kidney pie, or minced and formed into patties, such as hamburgers.",
    "lunch"
  ),
  new Food(
    "Sushi Rolls",
    4.9,
    "https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?cs=srgb&dl=abendessen-essen-fisch-garnele-2098085.jpg&fm=jpg",
    "When the sushi rice is wrapped in nori seaweed and rolled, it is a Sushi Roll.  In Japan, we call it Makizushi or Maki Sushi (巻き寿司).",
    "dinner"
  ),
];

window.addEventListener("DOMContentLoaded", function () {
  foodState(foods);
  createMenuButtons();
});

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

const rightArrow = document.querySelector(".fa-arrow-right");
const leftArrow = document.querySelector(".fa-arrow-left");
const wineList = document.querySelector(".wine-list");
const wineListSize = document.getElementsByClassName('wine-card');
const wineListWrapper = document.querySelector('.wine-list-wrapper');
let wrapperPositionInfo = wineListWrapper.getBoundingClientRect();
let wrapperWidth = wrapperPositionInfo.width;

let counter = 0;

rightArrow.addEventListener("click", () => {
  if(counter < wineListSize.length - Math.round(wrapperWidth / 200) + 1) {
    counter++;
    wineList.style.transform = `translateX(${-200 * counter}px)`;
  } else return;
});

leftArrow.addEventListener("click", () => {
  if(counter > 0) {
    counter--;
    wineList.style.transform = `translateX(${-200 * counter}px)`;
  } else return;
});
/* Wine Area Finish*/
