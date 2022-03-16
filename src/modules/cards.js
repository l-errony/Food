import {getResource} from '../services/services.js';
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
getResource('http://localhost:3000/menu')
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
export default cards;