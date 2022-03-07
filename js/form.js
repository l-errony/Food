const forms = document.querySelectorAll('form');

const message ={
    loading: 'Загрузка',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
};

 forms.forEach(item =>{
    postDate(item);
});


 function postDate(form){
     form.addEventListener('submit', (e)=>{
         e.preventDefault();
     
 

        const statusMessege = document.createElement('div');
        statusMessege.classList.add('status');
        statusMessege.textContent = message.loading;
        forms.append(statusMessege);

        const request = new XMLHttpRequest();
        request.open('POST', 'js/server.php');

       // request.setRequestHeader('Content-type', 'meltipart/form-data');
        //form date
        const formDate = new FormData(form);

        request.send(formDate);

        request.addEventListener('load', ()=>{
            if(request.status === 200){
                console.log(request.response);
                statusMessege.textContent = message.success;
            }else{
                statusMessege.textContent = message.failure;
            }
        }); 
     });
    }