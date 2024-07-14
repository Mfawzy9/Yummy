/// <reference types="../@types/jquery" />


export class Ingredients{

    constructor(){

        this.mainSec = $('.main-section')
        this.detailsSec = $('.main-details')
        this.categorySec = $('.category-sec')
        this.areaSec = $('.area-sec')
        this.IngredientsSec = $('.Ingredients-sec')


        document.getElementById('Ingredients').addEventListener('click',()=>{
            this.getIngredients()
            $(`.main-section , .main-details , .category-sec , .area-sec , .contact-sec , .search-sec`).fadeOut(300,()=>{
                $('.Ingredients-sec').fadeIn(300)
            })
        })


    }//cons


    async getIngredients(){
        document.querySelector('.loading').classList.remove('d-none')

        const api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
        const response = await api.json()

        const data = response.meals.slice(0, 20)

        this.displayIngredients(data)
        document.querySelector('.loading').classList.add('d-none')

    }


    displayIngredients(data){

        document.getElementById('IngredientsData').innerHTML = data.map((ing)=>{
            return `
        <div class="col-md-3">
                <div id="ingCard" role="button" ingName="${ing.strIngredient}" class="rounded-2 text-center bg-gradient p-3">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${ing.strIngredient}</h3>
                        <p>${ing.strDescription.split(" ").slice(0,20).join(" ").slice(0, -1) + '....'}</p>
                </div>
        </div>
        ` 
        }).join("")

        this.ingCardEvent();

    }



    async getIngredientsMeals(ing){
        document.querySelector('.loading').classList.remove('d-none')

        const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`)
        const response = await api.json()

        const data = response.meals.slice(0, 20)

        this.displayIngredientsMeals(data)
        document.querySelector('.loading').classList.add('d-none')
    }

    
    displayIngredientsMeals(data){

        document.getElementById('mainData').innerHTML = data.map((meal)=>{
            return `
        <div class="col-md-3">
                <div id="mealCard" role="button" idMeal="${meal.idMeal}" class="meal position-relative overflow-hidden rounded-2">
                    <img class="w-100" src="${meal.strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3 class="h-100">${meal.strMeal}</h3>
                    </div>
                </div>
        </div>
        ` 
        }).join("")

        this.mealCardEvent();

    }


    ingCardEvent(){

        document.querySelectorAll('#ingCard').forEach((card)=>{
            card.addEventListener('click',(e)=>{
                const ingName = e.currentTarget.getAttribute('ingName')
                this.getIngredientsMeals(ingName);
                this.IngredientsSec.fadeOut(300,()=>{
                    this.mainSec.fadeIn(300)
                })
            })
        })

    }

    async getMealDetails(mealId){
        document.querySelector('.loading').classList.remove('d-none')

        const api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        const response = await api.json()

        const data = response.meals[0]

        this.displayMealDetails(data)
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
                $(this.mainSec , this.categorySec , this.IngredientsSec).fadeOut(300,()=>{
                    $(this.detailsSec).fadeIn(300)
                })

        })
    })

    }





}//class