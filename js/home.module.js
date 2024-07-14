/// <reference types="../@types/jquery" />

import { Area } from './area.module.js'
import {Categories} from './categories.module.js'
import {Ingredients} from './Ingredients.module.js'
import {Contact} from "./contact.module.js"
import {Search} from './search.module.js'


export class Home{
    constructor(){

        // dom ready
        $(()=>{
            $('.loaderr').fadeOut(800,()=>{
                $('.start-up').animate({top: '-200%'} , 800,()=>{
                    $('.start-up').remove()
                    $('body').css('overflow' , 'auto')
                })
                })
        })


        $('#x').on('click',function(){
            $('.main-section').fadeIn(300,()=>{
                $('.main-details').fadeOut(300)
            })
        })

        this.sidebarBtn = document.getElementById('sidebarBtn')

        $('#Categories , #Area , #Ingredients , #contact , #search').on('click',()=>{

            $('aside').animate({left : '-240px'} ,500,function(){
                $('.side-nav ul li').addClass('Ystart').removeClass('Yend')
            } )
            this.sidebarBtn.innerHTML = `<i class="fa-solid fa-2x fa-align-justify"></i>`
        })

        this.search = new Search()
        this.category = new Categories()
        this.area = new Area()
        this.Ingredients = new Ingredients()
        this.Contact = new Contact();

        this.getMainMeals();

    $('a').on('click' , (e)=>{
        e.preventDefault()
    })

     //sidebar btn
    this.sidebarBtn.addEventListener('click' , ()=>{
        if($('aside').css("left") == '0px'){
            $('aside').animate({left : '-240px'} ,400,function(){
                $('.side-nav ul li').addClass('Ystart').removeClass('Yend')
            } )
            this.sidebarBtn.innerHTML = `<i class="fa-solid fa-2x fa-align-justify"></i>`
        }else{
            $('aside').animate({left : '0'} ,400 ,function(){
                $('.side-nav ul li').removeClass('Ystart').addClass('Yend')
            })
            this.sidebarBtn.innerHTML = `<i class="fa-solid fa-2x fa-x " ></i>`
        }
    })

    }//constractor

    async getMainMeals(){
        document.querySelector('.loading').classList.remove('d-none')

        const api = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
        const data = await api.json()
    
        const recivedData = data.meals
    
        this.displayMeals(recivedData.slice(0, 20));
        document.querySelector('.loading').classList.add('d-none')
    
    }

    displayMeals(data){
        document.getElementById('mainData').innerHTML = data.map((meal)=>{
            return `
            <div class="col-md-3">
                <div id="mealCard" role="button" class="meal position-relative overflow-hidden rounded-2" mealName="${meal.strMeal}">
                    <img class="w-100" src="${meal.strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex justify-content-center align-items-center text-black p-2">
                        <h3>${meal.strMeal}</h3>
                    </div>
                </div>
            </div>` 
        }).join("")
    
        this.mealCardEvent();
    }

    mealCardEvent(){
        document.querySelectorAll('#mealCard').forEach((card)=>{
            card.addEventListener('click',async (e)=>{
                e.preventDefault();
                const mealName = e.currentTarget.getAttribute('mealName')
                this.getDetails(mealName)
                $('.main-section').fadeIn(300,()=>{
                    $('.main-details').fadeIn(300)
                })
        })
    })
    }

    async getDetails(mealName){
        document.querySelector('.loading').classList.remove('d-none')

        const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
        const data = await api.json()
    
        const recivedDetails = data.meals[0]
    
        this.displayDetails(recivedDetails);
        document.querySelector('.loading').classList.add('d-none')
    
    }

    displayDetails(mealName){
        let recipes = ``
    
        for (let i = 1; i <= 20; i++) {
            if (mealName[`strIngredient${i}`]) {
                recipes += `<li class="alert alert-info m-2 p-1">${mealName[`strMeasure${i}`]} ${mealName[`strIngredient${i}`]}</li>`
            }
        }
    
        document.getElementById('detailsData').innerHTML = `
                  <div class="col-md-4">
                <img class="w-100 rounded-3" src="${mealName.strMealThumb}" alt="">
                <h2>${mealName.strMeal}</h2>
              </div>
              <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${mealName.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${mealName.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${mealName.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${recipes}
                </ul>
            
                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
            
                  <li class="alert alert-danger m-2 p-1">${mealName.strTags ? mealName.strTags.split(",")[0] :  "unknown"}</li>
    
                  <li class="alert alert-danger m-2 p-1"> ${mealName.strTags ? mealName.strTags.split(",")[1] :  "unknown"}</li>
                </ul>
            
                <a target="_blank" href="${mealName.strSource}"
                  class="btn btn-success">Source</a>
                <a target="_blank" href="${mealName.strYoutube}" class="btn btn-danger">Youtube</a>
              </div>`
    }
    


}//class