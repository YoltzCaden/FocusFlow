const start = document.getElementById("start");
const pause = document.getElementById("pause");
const reset = document.getElementById("reset");
let focus_timer = 1500; // Time in seconds
let break_timer = 300; //Short breaks - 5 minutes;
let long_break_timer = 1800; // Longer breaks - 45 minutes;
let remaining_time = focus_timer + 1;  // helps make sure the Timer starts that required time.
let timer_running = false; 
let currentMode = 'focus';
let focusSessionsCompleted = 0;
let intervalID = null; 


// Timer Functionality

/*
countDownTimer

WWW:
    + Timer updates on website
    + Start button works
    + Label switch from Focus Timer to Break Timer
    + Single digit numbers take 2 column only with placeholder zeros. E.g. 1: 8  is displayed as 01:08
    + Switches from Focus to Break well
    + Switches from 4 Focus Session to Longer Break Session

EBI:

    - Edit the timer for personal suitability;
    -

*/

countDownTimer = function() {
        timer_running = true;
        remaining_time = remaining_time - 1;
        minutes = Math.floor(remaining_time/60);
        seconds = remaining_time % 60;

        document.getElementById("timer").textContent = String(minutes).padStart(2,'0') + ":" + String(seconds).padStart(2,'0');

        /*
        * 1. Timer = 00:00
        * 2. Check if Focus session or Break Session
        * 3. If focus session add the number of focus session
        * 4. Check if the number of focus session have been done four times.
        * 5. If so start the long break, enter break mode, update label to Longer Break Timer.
        * 6. Else do the normal short break
        * 7. If break session then set the timer to focus
        */


        if (remaining_time <= 0) {
            if (currentMode == 'focus') {
                focusSessionsCompleted += 1;

                /*
                * 
                * TODO: Change logic so only when requested session breaks
                *       Then do this checks.
                */
                
                if (focusSessionsCompleted % 4 == 0) {
                    remaining_time = long_break_timer;
                    currentMode = 'break';
                    document.getElementById("timer-label").textContent = "Longer Break Timer"
                } else {
                    remaining_time = break_timer;
                    currentMode = 'break';
                    document.getElementById("timer-label").textContent = "Break Timer";
                }

            } else if (currentMode == 'break') {
                remaining_time = focus_timer;
                currentMode = 'focus';
                document.getElementById("timer-label").textContent = "Focus Timer";
            }

        }
}

// Button Functionality

// Start

/*
* StartClick Function
*
* + Fixed the start button bug when click multiple times timer speeds up.
*/

startClick = function() {
    if (timer_running == false) {
        intervalID = setInterval(countDownTimer, 1000);
    }
    

}

start.addEventListener('click', startClick);

//Stop

/*
*
* I learnt the clearInterval method here.
* Made changes to code such as intervalID variale.
*/

pauseClick = function() {
    if (timer_running == true) {
        clearInterval(intervalID);
        timer_running = false;
    }
    
    
}

pause.addEventListener('click', pauseClick);

//Reset

/*
* When I click reset:
* 1. Timer stops
* 2. Timer is set to the original time setting. 
*
*
*/
resetClick = function() {
    pauseClick();
    remaining_time = focus_timer + 1;
    currentMode = 'focus';
    document.getElementById("timer-label").textContent = "Focus Timer";
    countDownTimer();
    timer_running = false;
    
}

reset.addEventListener('click', resetClick);