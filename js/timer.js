const deadline = '2022-06-20';

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

setClock('.timer', deadline);

console.log(new Date());
/* let bom = ['f', 'd', 'r'];
const log = function(a, b, ...bom){
    console.log(a,b, bom);
}

log(5, 69, ...bom) */
function et(e, t=9){
    console.log(e*t);
}
et(4);