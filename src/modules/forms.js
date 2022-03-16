import {closeModal, openModal} from './modal';
import {postDate} from '../services/services.js';

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
        
        postDate('http://localhost:3000/requests', json)
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
        openModal('.modal', modalTimerId);

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
            closeModal('.modal');
        },4000);
    }

/*     fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res=> console.log(res)); */
    
}

export default forms;

