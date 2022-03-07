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

        this.classes.forEach(className => element.classList.add(className)); //перебрали и добавили класс
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

//const div = new MenuCard();
//div.render();

new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый  продуктm с оптимальной ценой и высоким качеством!',
    9,
    '.menu .container',
).render();

new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'Меню "Премиум” - мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    14,
    '.menu .container',
    'menu__item',
).render();

new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    9,
    '.menu .container',
    'menu__item',
).render();







/* 
const oiu = {
    g: 'hj',
    a: 'g'

};
const dodod = new oiu(); */