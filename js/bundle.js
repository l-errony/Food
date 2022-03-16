/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/calc.js":
/*!*****************************!*\
  !*** ./src/modules/calc.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc(){

    const result = document.querySelector('.calculating__result span');

let sex , 
height, weight, age, ratio ;

if(localStorage.getItem('sex')){
    sex = localStorage.getItem('sex');
}else{
    sex = 'female';
    localStorage.setItem('sex', 'female');
}

if(localStorage.getItem('ratio')){
    ratio = localStorage.getItem('ratio');
}else{
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
}

function initLocalSettings(selector, activeClass){
    const elements = document.querySelectorAll(selector);
    elements.forEach(elem =>{
        elem.classList.remove(activeClass);
        if(elem.getAttribute('id')=== localStorage.getItem('sex')){
            elem.classList.add(activeClass);
        }if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                elem.classList.add(activeClass);
        }
    });
}

initLocalSettings('#gender', 'calculating__choose-item_active');
initLocalSettings('.calculating__choose_big', 'calculating__choose-item_active');



function calcTotal(){
    if(!sex || !height || !weight || !age || !ratio){
        result.textContent = '____';
        return;
    }

    if(sex === 'female'){
        result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    }else {
        result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
}

calcTotal();

//function getStaticInformation(parentSelrctor, activeClass) {
function getStaticInformation(selector, activeClass) {
    //let elements = document.querySelectorAll(`${parentSelrctor} div`);
    let elements = document.querySelectorAll(selector);

    elements.forEach(elem =>{
        elem.addEventListener('click', (e)=>{
            if(e.target.getAttribute('data-ratio')){
                ratio = +e.target.getAttribute('data-ratio');
                localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
            }else{
                sex = e.target.getAttribute('id');
                localStorage.setItem('sex', e.target.getAttribute('id'));
            }
    
      
    
            elements.forEach(elem =>{
                elem.classList.remove(activeClass);
            });
            e.target.classList.add(activeClass);
    
            calcTotal();
         });
    });

}

    //getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('#gender div', 'calculating__choose-item_active');
   // getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');
   getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDinamicInformation(selector){
        const input = document.querySelector(selector);

        input.addEventListener('input', ()=> {

        if(input.value.match(/\D/g)){
            input.style.border = '1px solid red';
        }else{
            input.style.border = 'none';
        }

            switch(input.getAttribute('id')){
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
                 
            }
            calcTotal();
        });

        
    }
    getDinamicInformation('#height');
    getDinamicInformation('#weight');
    getDinamicInformation('#age');

}

//module.exports = calc;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);



/***/ }),

/***/ "./src/modules/cards.js":
/*!******************************!*\
  !*** ./src/modules/cards.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services.js */ "./src/services/services.js");

function cards(){


class MenuCard{
    constructor(src, alt, title, description, price, parentSelector, ...classes){
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.description = description;
        this.price = price;
        this.classes = classes; //массив || 'menu__item не подходит так как строка и перебор не сработает а пустой массив не ложь
        this.parent = document.querySelector(parentSelector);  //куда будем вставлять
        this.transfer = 27;
        this.changeToUAH(); //можно вызвать метод
    }

    changeToUAH(){
        this.price = +this.price*this.transfer;
    }
    render(){
        const element = document.createElement('div');
        if(this.classes.length ===0){  //проверяем длину массива тк хотим задать по умолчаниюд
            this.class = 'menu__item';
            element.classList.add( this.class);
        }else{
          this.classes.forEach(className => element.classList.add(className)); //перебрали и добавили класс  
        }

       element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.description}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
             </div>
        `;
        this.parent.append(element);
    }
}
(0,_services_services_js__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
.then(data => {
    data.forEach(({img, altimg, title, descr, price}) => {
        new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
    });
});

}

/* 
//СЩЗДАНИЕ ДИНАМИЧЕСКИЙ ЭЛЕМЕНТОВ БЕЗ КЛАССОВ, НЕ ПОДХОДИТ ДЛЯ ШАБЛОНИЗАЦИИ
('http://localhost:3000/menu')
    .then(data => createCard(data));

function createCard(data){
    data.forEach(({img, altimg, title, descr, price})=>{
        const element = document.createElement('div');
        element.classList.add('menu__item');

        element.innerHTML = `
            <img src=${img} alt=${altimg}>
            <h3 class="menu__item-subtitle">${title}</h3>
            <div class="menu__item-desgetResourcecr">${descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${price}</span> грн/день</div>
            </div>
        `;
        document.querySelector('.menu .container').append(element);
    });
} */

//module.exports = cards;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./src/modules/forms.js":
/*!******************************!*\
  !*** ./src/modules/forms.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/modules/modal.js");
/* harmony import */ var _services_services_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services.js */ "./src/services/services.js");



function forms(formSelector ,modalTimerId){

//form with Spinner
const forms = document.querySelectorAll(formSelector);


const message ={
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
};

 forms.forEach(item =>{
    bindPostDate(item);
});
//код внутри ассинхронен, когда запускается postDATE начинается ее исполнение(справа), код ассинхронный и он не ждёт исполнения
// и в переменнкю поместиться НИЧЕГО тк не у спело вернуть и будет ошибка так как ретерн не сраблтает
//function expressions


 function bindPostDate(form){
     form.addEventListener('submit', (e)=>{
         e.preventDefault();
     
 
    const statusMessege = document.createElement('img');
        statusMessege.src = message.loading;
        statusMessege.style.cssText = `
            display:block;
            margin: 0 auto;
        `; //или в цсс
        //form.append(statusMessege);
        form.insertAdjacentElement('afterend', statusMessege);

        
        const formDate = new FormData(form);

        const json = JSON.stringify(Object.fromEntries(formDate.entries()));
        
        (0,_services_services_js__WEBPACK_IMPORTED_MODULE_1__.postDate)('http://localhost:3000/requests', json)
        .then(data=>{
            console.log(data); //данные что вернул сервер
                showThanksModal(message.success);
                statusMessege.remove();
        }).catch(()=>{
            showThanksModal(message.failure);
        }).finally(()=>{
            form.reset();
        });
     });
    }

    function showThanksModal(message){
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML=`
            <div class='modal__content'>
                <div class='modal__close' data-close>X</div>
                <div class='modal__title'>${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(()=>{
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        },4000);
    }

/*     fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res=> console.log(res)); */
    
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);



/***/ }),

/***/ "./src/modules/modal.js":
/*!******************************!*\
  !*** ./src/modules/modal.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });

function openModal(modalSelector, modalTimerId){
   const modal= document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; //запретить скролл

    console.log(modalTimerId);
    if(modalTimerId){
    clearInterval(modalTimerId); //чтоб не всплывало , если сама открыла
    }
}

function closeModal(modalSelector){
    const  modal= document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}


function modal(triggerSelector, modalSelector, modalTimerId){
    'use strict'; // modal.classList.toggle('show');

const modalTrigger = document.querySelectorAll(triggerSelector),
    modal= document.querySelector(modalSelector);
 //   modalCloseBtn = document.querySelector('[data-close]');


modalTrigger.forEach(btn =>{
    btn.addEventListener('click',()=> openModal(modalSelector, modalTimerId));//запретить скролл);
});

//modalCloseBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e)=>{
    if(e.target === modal || e.target.getAttribute('data-close') == ""){
        closeModal(modalSelector);
    }
});

document.addEventListener('keydown', (e)=>{
    if(e.code ==='Escape' && modal.classList.contains('show')){
        closeModal(modalSelector);
    }
});

//const modalTimerId = setTimeout(openModal, 6000);  перенесём в script.js

function showModalByScroll(){
    if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight /* -1 */){
       openModal(modalSelector, modalTimerId);
        window.removeEventListener('scroll', showModalByScroll);
    }
}

window.addEventListener('scroll', showModalByScroll);

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);





/***/ }),

/***/ "./src/modules/slider.js":
/*!*******************************!*\
  !*** ./src/modules/slider.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}){


    const slides = document.querySelectorAll(slide),
    slider = document.querySelector(container),
    prev = document.querySelector(prevArrow),
    next = document.querySelector(nextArrow),
    total = document.querySelector(totalCounter),
    current = document.querySelector(currentCounter),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex =1;
    let offset = 0;


    if(slides.length < 10){
        total.textContent = `0${slides.length}`;
        current.textContent =  `0${slideIndex}`;
    }else{
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }


  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  slidesWrapper.style.overflow = 'hidden';

  slides.forEach( slide => {
      slide.style.width = width;
  });


  slider.style.position = 'relative';

  const indicators  = document.createElement('ol'),
  dots = [];

  indicators.classList.add('carousel-indicators');
  slider.append(indicators);

  for(let i = 0; i<slides.length; i++){
      const dot = document.createElement('li');
      dot.setAttribute('data-slide-to', i+1);
      dot.classList.add('dot');

      if(i==0){
          dot.style.opacity = 1;
      }
       indicators.append(dot);
       dots.push(dot);
    
  }
  


  function deleteNotDigits(str){
      return +str.replace(/\D/g, '');
  }

  next.addEventListener('click', () => {
   // if(offset == +width.slice(0, width.length -2) * (slides.length-1)){
    //if(offset == +width.replace(/\D/g, '') * (slides.length-1)){
        if(offset == deleteNotDigits(width) * (slides.length-1)){
        offset = 0;
    }else{
        offset += deleteNotDigits(width);
    }
    //если нужно сдвинуть влево(нажав на правую кнопку) то мы используем отрицательные значения
    //вправо положительные
    slidesField.style.transform = `translateX(-${offset}px)`;


    if(slideIndex == slides.length){
        slideIndex = 1;
    }else{
        slideIndex++;
    }

    if(slides.length < 10){
        current.textContent = `0${slideIndex}`;
    }else{
        current.textContent = slideIndex;
    }

    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex -1].style.opacity = 1;
  });



  prev.addEventListener('click', () => {
    if(offset == 0){
        offset = deleteNotDigits(width) * (slides.length-1);
    }else{
        offset -= deleteNotDigits(width);
    }
    //минус на минус плюс
    //при обратном пролистывании положительное значение
    slidesField.style.transform = `translateX(-${offset}px)`;


    if(slideIndex == 1){
        slideIndex = slides.length;
    }else{
        slideIndex--;
    }

    if(slides.length < 10){
        current.textContent = `0${slideIndex}`;
    }else{
        current.textContent = slideIndex;
    }

    
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex -1].style.opacity = 1;

  });

  dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
          const slideTo = e.target.getAttribute('data-slide-to');

          slideIndex = slideTo;
          offset = deleteNotDigits(width) * (slideTo-1);

          slidesField.style.transform = `translateX(-${offset}px)`;

          if(slides.length < 10){
            current.textContent = `0${slideIndex}`;
         }else{
            current.textContent = slideIndex;
         }
    

         dots.forEach(dot => dot.style.opacity = '.5');
         dots[slideIndex -1].style.opacity = 1;
      });
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./src/modules/tabs.js":
/*!*****************************!*\
  !*** ./src/modules/tabs.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

    function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass){
        
    const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent(){
        tabsContent.forEach(item =>{
            //item.style.display = 'none';
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item =>{
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i=0){
        //tabsContent[i].style.display = 'block';
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show', 'fade');
        
        tabs[i].classList.add(activeClass);
    }


    hideTabContent();
    showTabContent(); //если без аргумента сработает по умолчанию


     tabsParent.addEventListener('click', (event) =>{
        const target = event.target;

        if(target && target.classList.contains(tabsSelector.slice(1))){
            tabs.forEach((item, i) =>{
                if(target == item){
                    hideTabContent();
                    showTabContent(i); 
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ }),

/***/ "./src/modules/timer.js":
/*!******************************!*\
  !*** ./src/modules/timer.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer (id, deadline){


    function getTimeRemaining(endtime){
        const t = Date.parse(endtime) - Date.parse(new Date()),//Date.parse(new Date()+8600),
            days = Math.floor(t / (1000*60*60*24)),
            hours = Math.floor(t/(1000*60*60)%24),
            minutes = Math.floor(t/(1000*60)%60),
            seconds =  Math.floor((t/1000)%60);
    
        return{
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'second': seconds
        };
    }
    
    function getZero(num){
        if (num>=0 && num<10){
            return `0${num}`;
        }else{
            return(num);
        }
    }
    
    
    function setClock(selector, endtime){
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
    
            timeInterval = setInterval(updateClock, 1000);
    
            updateClock();
    
        function updateClock(){
            const t = getTimeRemaining(endtime);
    
            days.innerHTML =  getZero(t.days);
            hours.innerHTML =  getZero(t.hours);
            minutes.innerHTML =  getZero(t.minutes);
            seconds.innerHTML =  getZero(t.second);
    
            if(t.total<=0){
                clearInterval(timeInterval);
            }
    
        }
            
    }
    
    setClock(id, deadline);
    
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./src/services/services.js":
/*!**********************************!*\
  !*** ./src/services/services.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postDate": () => (/* binding */ postDate)
/* harmony export */ });
const postDate = async (url, data) =>{ //сообщили что код будет ассинхронен
    const res = await fetch(url, {   //res будет промис //await попросили подождать
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body:  data
    });
    return await res.json();  //вернули промис
};

const getResource = async (url) =>{ //сообщили что код будет ассинхронен
    const res = await fetch(url);
    //чтоб показал ошибку
    
    if(!res.ok){
        //выкинуть объект ошибки
       throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();  //вернули промис
};





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./src/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./src/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./src/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./src/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./src/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./src/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./src/modules/slider.js");
 //const tabs = require('./modules/tabs');
 
 
 
 
 
 
 
 
 
 window.addEventListener('DOMContentLoaded', function() {
     const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 50000);
 
     (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
     (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
     (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2020-06-11');
     (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
     (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
     (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])('form', modalTimerId);
     (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
         container: '.offer__slider',
         slide: '.offer__slide',
         nextArrow: '.offer__slider-next',
         prevArrow: '.offer__slider-prev',
         totalCounter: '#total',
         currentCounter: '#current',
         wrapper: '.offer__slider-wrapper',
         field: '.offer__slider-inner'
     });
});


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map