// Konstrkutor funkcija
function Food(name, rating, image, description) {
  (this.name = name),
    (this.rating = rating),
    (this.image = image),
    (this.description = description);
}

// Hard-Kodirani niz Food objekata
const foods = [
  new Food(
    "Fluffy Pancakes",
    4.7,
    "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    "Pancakes may be served at any time of the day with a variety of toppings or fillings but in America they are typically considered a breakfast food."
  ),
  new Food(
    "Juicy Steak",
    5.0,
    "https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    "Steak can also be cooked in sauce, such as in steak and kidney pie, or minced and formed into patties, such as hamburgers."
  ),
  new Food(
    "Sushi Rolls",
    4.9,
    "https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?cs=srgb&dl=abendessen-essen-fisch-garnele-2098085.jpg&fm=jpg",
    "When the sushi rice is wrapped in nori seaweed and rolled, it is a Sushi Roll.  In Japan, we call it Makizushi or Maki Sushi (巻き寿司)."
  ),
];

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

foodState(foods);