const timerDays     = document.querySelector('.days');
const timerHours    = document.querySelector('.hours');
const timerMinutes  = document.querySelector('.minutes');
const timerSeconds  = document.querySelector('.seconds');

const secondsUpBack = timerSeconds.querySelector('.back-text');
const secondsBack   = timerSeconds.querySelector('.timer-up-back');
const secondsUp     = timerSeconds.querySelector('.timer-up');
const secondsDown   = timerSeconds.querySelector('.timer-down');

const minutesUpBack = timerMinutes.querySelector('.back-text');
const minutesBack   = timerMinutes.querySelector('.timer-up-back');
const minutesUp     = timerMinutes.querySelector('.timer-up');
const minutesDown   = timerMinutes.querySelector('.timer-down');

const hoursUpBack   = timerHours.querySelector('.back-text');
const hoursBack     = timerHours.querySelector('.timer-up-back');
const hoursUp       = timerHours.querySelector('.timer-up');
const hoursDown     = timerHours.querySelector('.timer-down');

const daysUpBack    = timerDays.querySelector('.back-text');
const daysBack      = timerDays.querySelector('.timer-up-back');
const daysUp        = timerDays.querySelector('.timer-up');
const daysDown      = timerDays.querySelector('.timer-down');

let pause = true;
let days    = 0;
let hours   = 0;
let minutes = 0;
let seconds = 0;


function initSet(pause){

    secondsUp.textContent   = secondsDown.textContent   = seconds;
    secondsBack.textContent = secondsUpBack.textContent = seconds;
    minutesBack.textContent = minutesUpBack.textContent = minutes;
    minutesUp.textContent   = minutesDown.textContent   = minutes;
    hoursUp.textContent     = hoursDown.textContent     = hours;
    hoursBack.textContent   = hoursUpBack.textContent   = hours;
    daysUp.textContent      = daysDown.textContent      = days;
    daysBack.textContent    = daysUpBack.textContent    = days;

    setInterval(() => {
        if(days === 0 && hours === 0 && minutes === 0 && seconds === 60){pause = true;}
        secondsUp.textContent = secondsDown.textContent = (seconds === 60) ? 0 : seconds;
        if(!pause){
            minutesUp.textContent = minutesDown.textContent = minutes;
            hoursUp.textContent = hoursDown.textContent = hours;
            daysUp.textContent = daysDown.textContent = days;
    
            secondsBack.animate(timerFlipBack, flipOptions);
            secondsUp.animate(timerFlip, flipOptions);
            secondsBack.textContent = secondsUpBack.textContent = --seconds;
            
            if(seconds === 0){seconds = 60;}
    
            if(seconds === 59){
                if(minutes === 0){minutes = 60;}
    
                minutesBack.textContent = minutesUpBack.textContent = --minutes;
                minutesBack.animate(timerFlipBack, flipOptions);
                minutesUp.animate(timerFlip, flipOptions);
                
                if(minutes === 59){
                    if(hours === 0){hours = 24;}
    
                    hoursBack.textContent = hoursUpBack.textContent = --hours;
                    hoursBack.animate(timerFlipBack, flipOptions);
                    hoursUp.animate(timerFlip, flipOptions);
                    
                    
                    if(hours === 23){
    
                        daysBack.textContent = daysUpBack.textContent = --days;
                        daysUp.animate(timerFlip, flipOptions);
                        daysBack.animate(timerFlipBack, flipOptions);
                    }
                }       
            }
        }
    }, 1000);
}

const timerFlip = [
    {transform : 'perspective(200px) rotateX(0deg)', offset: 0},
    {transform : 'perspective(200px) rotateX(-180deg)', offset: 0.5},
    {transform : 'perspective(200px) rotateX(-180deg)', offset: 1}
];
const timerFlipBack = [
    {transform : 'perspective(200px) rotateX(180deg)', offset: 0},
    {transform : 'perspective(200px) rotateX(0deg)', offset: 0.5},
    {transform : 'perspective(200px) rotateX(0deg)', offset: 1}
];

const flipOptions = {
    duration: 1000,
    timingFunction: 'cubic-bezier(.79,.14,.15,.86)'
};

initSet(pause);
setTime();

function setTime(){
    let now = new Date;
    const body = document.querySelector('body');
    const timeMenu = document.createElement('div');
    const timeInput = document.createElement('input'); timeInput.min = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}T${now.getHours()}:${now.getMinutes()}`;
    const timeSet = document.createElement('button'); timeSet.innerHTML = 'Start Timer';
    let time;
    timeInput.type = 'datetime-local';
    timeMenu.classList.add('time-menu');
    body.append(timeMenu);
    timeMenu.append(timeInput);
    timeMenu.append(timeSet);

    timeSet.addEventListener('click', () => {
        // if(timeInput.value)
        now = new Date;
        console.log(now);
        if(!timeInput.value){
            timeSet.style.backgroundColor = 'red';
            timeSet.innerHTML = 'Invalid input';
            setTimeout(() => {
                timeSet.style.backgroundColor = '';
                timeSet.innerHTML = 'Start Timer';
            }, 1000);
        }
        if(timeInput.value){
            const time       = timeInput.value;
            const timeYear   = time.slice(0, 4);
            const timeMonth  = time.slice(5, 7);
            const timeDate   = time.slice(8, 10);
            const timeHour   = time.slice(11, 13);
            const timeMinute = time.slice(14, 16);
            const date = new Date(timeYear, timeMonth-1, timeDate, timeHour,timeMinute);
            
            const timeDiff = date.getTime() - now.getTime();
            const timeDiffDays = Math.floor(timeDiff / (1000 * 3600 * 24)); 
            const timeDiffHours = timeDiff / (36000 * timeDiff);

            console.log(timeDiffHours);

            days = timeDiffDays;
            initSet(pause);
        }        
    });
}