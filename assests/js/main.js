const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const focus_timer = 10; // Time in seconds
const break_timer = 30; 
let remaining_time = focus_timer;
let timer_running = false;


// Timer Functionality

/*
Learning JavaScript.

WWW:
    - Timer updates on website
    - Start button works
    - Label switch from Focus Timer to Break Timer

Problems: 
   - When start button pressed multiple times timer speeds ups.
   - Label and timer doesn't switch from Break to Focus.
   - Single digit numbers take 1 column only with no placeholder zeros. E.g. 01:08 is displayed as 1: 8

TODO: need to fix problems.

*/

countDownTimer = function() {

        timer_running = true;
        remaining_time = remaining_time - 1;
        minutes = Math.floor(remaining_time/60);
        seconds = remaining_time % 60;

        document.getElementById("timer").textContent = minutes + ": " + seconds;

        // Stop Timer if reach 0 seconds and switch to Break Mode.
        if (remaining_time <= 0) {
            remaining_time = break_timer;
            document.getElementById("break").classList.add('active');
            document.getElementById("focus").classList.remove('active');
            if(remaining_time <= 0) {
                remaining_time = focus_timer;
                document.getElementById("focus").classList.add('active');
                document.getElementById("break").classList.remove('active');

            }
        }
}

// Button Functionality

// Start

startClick = function() {
    setInterval(countDownTimer, 1000);

}

start.addEventListener('click', startClick);

//Stop
stopClick = function() {
    
}

//Reset

