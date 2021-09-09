/* load meals by search */
const p = document.getElementById('error-msg');
p.classList.add('d-none')
const errorMsg = (isError,error) =>{
    if(isError == true){
        p.innerText = error;
        p.classList.remove('d-none');
    }
    else{
        p.classList.add('d-none');
    }
   }
document.getElementById('search-button').addEventListener('click', async ()  =>  {
    const searchInputField = document.getElementById('search-field');
    const searchFieldText = searchInputField.value;
    /* clear field */
    searchInputField.value = '';
    if(searchFieldText == ''){
        errorMsg(true,'Please write something');
    }
    else{
        errorMsg(false,'');
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchFieldText}`;
        /* fetch(url)
        .then(res => res.json())
        .then(data => displayMeals(data.meals)) */
        try{
            const res = await fetch(url);
            const data = await res.json();
            displayMeals(data.meals);
        }
        /* catch the error and bypass it through inner function */
        catch(error){
            errorMsg(true,'Something went wrong');
        }
    }
    
})



/* display searched meals */
const displayMeals = meals =>{
    const mealsContainer = document.getElementById('meals-container');
    /* error msg for null of meals */
    if(meals == null ){
        errorMsg(true,'No results found');
        /* clearing previous display */
        mealsContainer.textContent = '';
        }
    else{
        /* mealsContainer.innerHTML = ''; ---------not recommended bcz of memory leak issue*/
        mealsContainer.textContent = '';
            meals.forEach(meal => {
                const slicedText = meal.strInstructions.slice(0,200);
                const div = document.createElement('div');
                div.innerHTML = `
                <div onclick="loadItemDetails(${meal.idMeal})" class="card h-100">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${slicedText}</p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">${meal.strCategory}</small>
                    </div>
                </div>`;
                div.classList.add('col');
                mealsContainer.appendChild(div);
                // details baki ace
    })
    }
    }
    





/* load meal id */
const loadItemDetails = async (mealId) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    /* fetch(url)
    .then(res => res.json())
    .then(data => singleItemInfo(data.meals[0])) */
    const res = await fetch(url);
    const data = await res.json();
    singleItemInfo(data.meals[0]);
}




/* display single meal details by clicking single card */
const singleMealDetail = document.getElementById('single-meal');
const div = document.createElement('div');
const singleItemInfo = singleItem => {
    div.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${singleItem.strMealThumb}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${singleItem.strMeal}</h5>
                    <a href=${singleItem.strYoutube}>See on YouTube</a><br>
                    <button class="btn btn-warning rounded-pill px-4 py-2 mt-2">${singleItem.strArea}</button>
                </div>
            </div>
        </div>`;
        singleMealDetail.appendChild(div);
}