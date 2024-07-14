/// <reference types="../@types/jquery" />


export class Contact{
    constructor(){

        $('#contact').on('click' , ()=>{
            $(`.main-section , .main-details , .category-sec , .area-sec , .Ingredients-sec , .search-sec`).fadeOut(300,()=>{
                $('.contact-sec').fadeIn(300)
            })
        })

        this.nameInput = document.getElementById('name')
        this.emailInput = document.getElementById('email')
        this.phoneInput = document.getElementById('phone')
        this.ageInput = document.getElementById('age')
        this.passInput = document.getElementById('password')
        this.rePassInput = document.getElementById('rePassword')

        this.contactForm = document.getElementById('form')
        this.submitForm = document.getElementById('submit')


        this.contactForm.addEventListener('submit',(e)=>{
            e.preventDefault()
        })

        this.contactForm.addEventListener('input' , (e)=>{
            // this.validationInputs(e.target)
            if( this.validationInputs(this.nameInput) &&
                this.validationInputs(this.emailInput) && 
                this.validationInputs(this.phoneInput) &&
                this.validationInputs(this.ageInput) &&
                this.validationInputs(this.passInput) &&
                this.rePasscheck()     ){
                this.submitForm.classList.remove('disabled')
            }else{
                this.submitForm.classList.add('disabled')
            }
        })

        this.submitForm.addEventListener('click' , this.clearInputs.bind(this))


        //showpass icons

        document.getElementById('passTog').addEventListener('click' , function(){
            let passIcon = document.getElementById('passIcon')
            let passInput = document.getElementById('password')
            console.log('pass');
            if(passInput.type == "password" ){
                passInput.type = "text";
                passIcon.classList.add('fa-eye')
                passIcon.classList.remove('fa-eye-slash')
        
            }else{
                passInput.type = "password"
                passIcon.classList.remove('fa-eye')
                passIcon.classList.add('fa-eye-slash')
            }
        })

        document.getElementById('rePassTog').addEventListener('click' , function(){
            let rePassIcon = document.getElementById('rePassIcon')
            let rePassInput = document.getElementById('rePassword')
            if(rePassInput.type == "password" ){
                rePassInput.type = "text";
                rePassIcon.classList.add('fa-eye')
                rePassIcon.classList.remove('fa-eye-slash')
        
            }else{
                rePassInput.type = "password"
                rePassIcon.classList.remove('fa-eye')
                rePassIcon.classList.add('fa-eye-slash')
            }
        })


    }//cons

    rePasscheck(){

        if(this.passInput.value == this.rePassInput.value){
            this.rePassInput.classList.remove('is-invalid')
            this.rePassInput.classList.add('is-valid')
            return true;
        }else{
            this.rePassInput.classList.remove('is-valid')
            this.rePassInput.classList.add('is-invalid')
            return false;
        }

    }

    clearInputs(){

        this.nameInput.value = null;
        this.emailInput.value = null;
        this.phoneInput.value = null;
        this.ageInput.value = null;
        this.passInput.value = null;
        this.rePassInput.value = null;

        this.nameInput.classList.remove('is-valid')
        this.emailInput.classList.remove('is-valid')
        this.phoneInput.classList.remove('is-valid')
        this.ageInput.classList.remove('is-valid')
        this.passInput.classList.remove('is-valid')
        this.rePassInput.classList.remove('is-valid')

        this.submitForm.classList.add('disabled')

    }

    validationInputs(input){

        const inputValue = input.value
        const regex = {

            name: /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){3,20}$/ ,
            email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ,
            phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/ ,
            age : /^(1[0-9]|[2-9][0-9]|100)$/ ,
            password : /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/ ,
            rePassword : 'rePassword'

        }

        if(regex[input.id] == 'rePassword'){
            return this.rePasscheck();

        }else{
            
            if(regex[input.id].test(inputValue)){
                input.classList.remove('is-invalid')
                input.classList.add('is-valid')
                return true;
            }else{
                input.classList.remove('is-valid')
                input.classList.add('is-invalid')
                return false;
            }
        }


    }














}//class