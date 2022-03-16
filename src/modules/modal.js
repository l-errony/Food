
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

export default modal;
export {closeModal};
export {openModal};

