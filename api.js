const searchBtn = document.getElementById('search-for-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

//event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


//get meal list that matches with the ingredients
function getMealList(){
    let searchInputText = document.getElementById('search-input').value.trim();
    fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputText}`)
    .then(res => res.json())
    .then(data =>{
        let food = "";
        if(data.meals){
            data.meals.forEach(meal =>{
                food += `
                    <div  class="meal-item " data-id="${meal.idMeal}">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('wrong');
        }else{
            food = "There is no food item,Please! Search again ";
            mealList.classList.add('wrong');
        }
        mealList.innerHTML = food;
    });
}

//Searching recipes to all foods meals
function getMealRecipe(food){
    food.preventDefault();
    if(food.target.classList.contains('recipe-btn')){
        let mealItems = food.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItems.dataset.id}`)
        .then(res => res.json())
        .then(data => 
            mealRecipeModal(data.meals[0]))
    }
}

//Show click food
function mealRecipeModal(meal){
    console.log(meal);
   meals = meal;
    let html = `
        <div class = "recipe-meal-img">
        <img  src = "${meals.strMealThumb}" alt = "">
        </div>
        <h2 class = "recipe-title text-color">${meals.strMeal}</h2>
        
        <div class = "recipe-instruct">
            <h3 class="text-color" >Instructions:</h3>
            <p class="text-color" >${meals.strIngredient1}</p>
            <p class="text-color">${meals.strIngredient2}</p>
            <p class="text-color">${meals.strIngredient3}</p>
            <p class="text-color">${meals.strIngredient4}</p>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}