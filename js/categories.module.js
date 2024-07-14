/// <reference types="../@types/jquery" />


export class Categories{
    constructor(){

        this.sidebarBtn = document.getElementById('sidebarBtn')

        this.mainSec = $('.main-section')
        this.detailsSec = $('.main-details')
        this.categorySec = $('.category-sec')
        this.areaSec = $('.area-sec')
        this.IngredientsSec = $('.Ingredients-sec')
        
        document.getElementById('Categories').addEventListener('click', (e) => {

            $(`.main-section , .main-details , .area-sec , .Ingredients-sec , .contact-sec , .search-sec`).fadeOut(300,function(){
                $('.category-sec').fadeIn(300);
                
            })
            this.getCategories()
        })

        



    }//cons

    async getCategories(){
        document.querySelector('.loading').classList.remove('d-none')

        const api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
        const data = await api.json()

        const categories = data.categories

        this.displayCategories(categories)
        document.querySelector('.loading').classList.add('d-none')
    }


    
    displayCategories(data){

        document.getElementById('categoriesData').innerHTML = data.map((cate)=>{
            return `
        <div class="col-md-3">
            <div role="button" id="categoryCard" class="meal position-relative overflow-hidden rounded-2" categoryName="${cate.strCategory}">
              <img class="w-100" src="${cate.strCategoryThumb}" alt="">
              <div class="meal-layer position-absolute text-center text-black p-2">
                <h3>${cate.strCategory}</h3>
                <p>${cate.strCategoryDescription.split(" ").slice(0,15).join(" ")}</p>
              </div>
            </div>
        </div>` 
        }).join("")

        this.categoryCardEvent();

    }

    async getCategoryMeals(categoryName){
        document.querySelector('.loading').classList.remove('d-none')

        const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
        const data = await api.json()

        const meals = data.meals

        this.displayCategoryMeals(meals.slice(0, 20))
        document.querySelector('.loading').classList.add('d-none')

    }

    displayCategoryMeals(data){

        document.getElementById('mainData').innerHTML = data.map((meal)=>{
            return `
        <div class="col-md-3">
                <div id="mealCard" role="button" class="meal position-relative overflow-hidden rounded-2" idMeal="${meal.idMeal}">
                    <img class="w-100" src="${meal.strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3 class="h-100">${meal.strMeal}</h3>
                    </div>
                </div>
        </div>` 
        }).join("")

        this.categoryCardEvent();
        this.mealCardEvent();

    }

    categoryCardEvent(){
        document.querySelectorAll('#categoryCard').forEach((mealCard)=>{
            mealCard.addEventListener('click',(e)=>{
                const categoryName = e.currentTarget.getAttribute('categoryName');
                this.getCategoryMeals(categoryName)
                $('.category-sec').fadeOut(400,function(){
                    $('.main-section').fadeIn(400)
                })
            })
        })

    }


    async getMealDetails(mealID){
        document.querySelector('.loading').classList.remove('d-none')

        const api = await fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        const data = await api.json()

        const meal = data.meals[0]

        this.displayMealDetails(meal)

        document.querySelector('.loading').classList.add('d-none')

    }

    displayMealDetails(meal){

        let recipes = ``
    
        for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
                recipes += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
            }
        }
    
        document.getElementById('detailsData').innerHTML = `
                  <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
                <h2>${meal.strMeal}</h2>
              </div>
              <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${recipes}
                </ul>
            
                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
            
                  <li class="alert alert-danger m-2 p-1">${meal.strTags ? meal.strTags.split(",")[0] :  "unknown"}</li>
    
                  <li class="alert alert-danger m-2 p-1"> ${meal.strTags ? meal.strTags.split(",")[1] :  "unknown"}</li>
                </ul>
            
                <a target="_blank" href="${meal.strSource}"
                  class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
              </div>`

    }

    mealCardEvent(){

        document.querySelectorAll('#mealCard').forEach((card)=>{
            card.addEventListener('click',(e)=>{
                const mealId = e.currentTarget.getAttribute('idMeal')
                this.getMealDetails(mealId);
                $(this.mainSec , this.categorySec).fadeOut(300,()=>{
                    $(this.detailsSec).fadeIn(300)
                })
        })
    })

    }







}//class