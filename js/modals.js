'use strict'; // modal.classList.toggle('show');

const modalTrigger = document.querySelectorAll('[data-modal]'),
    modal= document.querySelector('.modal'),
    modalCloseBtn = document.querySelector('[data-close]');

function openModal(){
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; //запретить скролл
    clearInterval(modalTimerId); //чтоб не всплывало , если сама открыла
}

function closeModal(){
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}


modalTrigger.forEach(btn =>{
    btn.addEventListener('click', openModal);//запретить скролл);
});

modalCloseBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e)=>{
    if(e.target === modal){
        closeModal();
    }
});

document.addEventListener('keydown', (e)=>{
    if(e.code ==='Escape' && modal.classList.contains('show')){
        closeModal();
    }
});

const modalTimerId = setTimeout(openModal, 6000);

function showModalByScroll(){
    if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight /* -1 */){
        openModal();
        window.removeEventListener('scroll', showModalByScroll);
    }
}

window.addEventListener('scroll', showModalByScroll);