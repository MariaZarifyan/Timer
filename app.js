const inputHours = document.getElementById("input-hours");
const inputMinutes = document.getElementById("input-minutes");
const inputSeconds = document.getElementById("input-seconds");

var audio = new Audio("sounds/bell.mp3"); 
let timeFromCountDown; //current time + inputHours + inputMinutes + inputSeconds

inputHours.addEventListener("input", displayInput);
inputMinutes.addEventListener("input", displayInput);
inputSeconds.addEventListener("input", displayInput);

const displayedHours = document.getElementById("hours");
const displayedMinutes = document.getElementById("minutes");
const displayedSeconds = document.getElementById("seconds");

const startButton = document.getElementById("start-btn");
const pauseButton = document.getElementById("pause-btn");
const resetButton = document.getElementById("reset-btn");

timeToZero();

function twoDigits(number){
    if (number <=0 || number == 60){
        return `00`;
    } else if (number < 10){
        return `0${number}`;
    } else {
        return `${number}`;
    }
}


function displayInput(){
    displayedSeconds.innerHTML = twoDigits(inputSeconds.value);
    displayedMinutes.innerHTML = twoDigits(inputMinutes.value);
    displayedHours.innerHTML = twoDigits(inputHours.value);
}

function muteInputFields(){
    inputSeconds.disabled = true;
    inputMinutes.disabled = true;
    inputHours.disabled = true;
}

// default time 00:00:00
function timeToZero(){
    displayedHours.innerHTML = "00";
    displayedMinutes.innerHTML = "00";
    displayedSeconds.innerHTML = "00";
}

let countDownInterval;

function timer(hours, minutes, seconds){

    timeFromCountDown = new Date(new Date().getTime() +
    hours * 60 * 60 * 1000 +
    minutes * 60 * 1000 +
    seconds * 1000);

    countDownInterval = setInterval(function(){
        currentTime = new Date().getTime();
        let remainingTime = timeFromCountDown - currentTime;

        displayedHours.innerHTML = twoDigits(Math.floor((remainingTime / 1000 / 60 / 60) % 60));
        displayedMinutes.innerHTML = twoDigits(Math.floor((remainingTime / 1000 / 60) % 60));
        displayedSeconds.innerHTML = twoDigits(Math.floor((remainingTime / 1000) % 60));

        
        if (displayedSeconds.innerHTML == "00"){
            if (displayedHours.innerHTML == "00" & displayedMinutes.innerHTML== "00"){
                remainingTime = 0;

                document.getElementById("remain").innerHTML = remainingTime;
                audio.play();
                pauseButton.disabled = true;
                resetButton.disabled = false;
                resetButton.innerHTML = "Stop alarm!";
                // if (resetButtonClicked === true) {
                //     resetButton.innerHTML = "Reset";
                //     }
               
                    
            
                
                }
        }
        
        

        document.getElementById("remain").innerHTML = remainingTime;
        

    }, 10);

    
    
    
}

console.log(parseInt(document.getElementById("remain").innerHTML))


startButton.addEventListener("click", function(){
    // beginTheCountDown();
    timer(inputHours.value, inputMinutes.value, inputSeconds.value);
    resetButton.disabled = true;
    startButton.disabled = true;
    pauseButton.disabled = false;
    
})


let resetButtonClicked = false;
let pauseButtonClicked = false;

resetButton.addEventListener("click", function(){
    
    timeToZero();
    clearInterval(countDownInterval);
    startButton.disabled = false;
    pauseButtonClicked = false;
    pauseButton.innerHTML = "Pause";
});

resetButton.addEventListener("click", function(){
    resetButtonClicked  = ! resetButtonClicked;
    if (resetButton.innerHTML === "Stop alarm!") {
        resetButton.innerHTML = "Reset";
    }
        
});



pauseButton.addEventListener("click", function(){

    pauseButtonClicked = ! pauseButtonClicked;
    if (pauseButtonClicked === true){
        resetButton.disabled = false;
        pauseButton.innerHTML = "Resume";
        clearInterval(countDownInterval);
        console.log(parseInt(displayedSeconds.innerHTML) + parseInt(displayedMinutes.innerHTML))
    } else if (pauseButtonClicked === false) {
        pauseButton.innerHTML = "Pause";
        resetButton.disabled = true;
        clearInterval(countDownInterval);
        timer(parseInt(displayedHours.innerHTML), parseInt(displayedMinutes.innerHTML),parseInt(displayedSeconds.innerHTML));

    }
    
});






