/// <reference types="../@types/jquery" />

import {Ingredients} from './Ingredients.module.js'

export class Search{
    constructor(){

        document.getElementById('search').addEventListener('click' , ()=>{

            $(`.main-section , .area-sec , .category-sec , .Ingredients-sec , .contact-sec , .main-details`).fadeOut(300,()=>{
                $('.search-sec').fadeIn(300)
             })

        })

        this.Ingredients = new Ingredients()

        document.querySelectorAll('form').forEach((form)=>{
            form.addEventListener('submit', (e)=>{
                e.preventDefault();
            })
        })

        this.searchByNameInput = document.getElementById('searchName')
        this.searchByLetterInput = document.getElementById('searchLetter')

        this.searchByNameInput.addEventListener('input' , ()=>{

            this.searchByName(this.searchByNameInput.value)

        })

        this.searchByLetterInput.addEventListener('input' , ()=>{

            if(this.searchByLetterInput.value == ' ' || this.searchByLetterInput.value == ''){
                this.searchByFirstLetter(`a`)
            }else{
                this.searchByFirstLetter(this.searchByLetterInput.value)
            }
            

        })




    }//cons



    async searchByName(mealName){

        document.querySelector('.loading').classList.remove('d-none')

        const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
        const response = await api.json()

        const data = response.meals

        console.log(data);

        data ? this.displaySearchedMeals(data) : document.getElementById('searchData').innerHTML =`<div class="meal text-danger fs-3">No meals found with this name</div>`
        document.querySelector('.loading').classList.add('d-none')

    }

    displaySearchedMeals(data){

        let mealsBox = ``

        for(let i = 0 ; i < data.length ; i++){

            mealsBox += `
            <div class="col-md-3">
                <div id="mealCard" role="button" class="meal position-relative overflow-hidden rounded-2" mealId="${data[i].idMeal}">
                    <img class="w-100" src="${data[i].strMealThumb}" alt="" >
                    <div class="meal-layer position-absolute d-flex justify-content-center align-items-center text-black p-2">
                        <h3 class="">${data[i].strMeal}</h3>
                    </div>
                </div>
            </div>
                `
        }
        document.getElementById('searchData').innerHTML =  mealsBox;
        this.searchedCardEvent();
    }


    async searchByFirstLetter(FirstLetter){

        document.querySelector('.loading').classList.remove('d-none')
        const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${FirstLetter}`)
        const response = await api.json()
        console.log(response);

        const data = response.meals

        data ? this.displaySearchedMeals(data) : document.getElementById('searchData').innerHTML =`<div class="meal text-danger fs-3">No meals found with this name</div>`
        document.querySelector('.loading').classList.add('d-none')
        
    }


    searchedCardEvent(){

        document.querySelectorAll('#mealCard').forEach((card)=>{
            card.addEventListener('click',(e)=>{
                const mealId = e.currentTarget.getAttribute('mealId')
                this.Ingredients.getMealDetails(mealId);
                $(`.main-section , .area-sec , .category-sec , .Ingredients-sec , .contact-sec`).fadeOut(300,()=>{
                   $('.main-details').fadeIn(300)
                })

        })
    })

    }









}//class