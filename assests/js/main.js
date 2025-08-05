const start = document.getElementById("start");
const pause = document.getElementById("pause");
const reset = document.getElementById("reset");
let focusDuration = 10; // Time in seconds
let shortBreakDuration = 5; // Short breaks - 5 minutes
let longBreakDuration = 8; // Longer breaks - 45 minutes
let remainingTime = focusDuration;  // helps make sure the Timer starts that required time.
let timerRunning = false; 
let currentMode = 'focus';
let focusSessionsCompleted = 0;
let intervalId = null; 


// Timer Functionality


displayTimer = function() {
    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;

    // Add leading zeros for single digit numbers
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    document.getElementById("timer").textContent = `${minutes}:${seconds}`;
    
}

/*
* countDownTimer
* This function is called every second to update the timer.
* It checks if the timer has reached zero

*/

countDownTimer = function() {
        timerRunning = true;


        /*
        * 1. Timer = 00:00
        * 2. Check if Focus session or Break Session
        * 3. If focus session add the number of focus session
        * 4. Check if the number of focus session have been done four times.
        * 5. If so start the long break, enter break mode, update label to Longer Break Timer.
        * 6. Else do the normal short break
        * 7. If break session then set the timer to focus
        */


        if (remainingTime <= 0) {
            if (currentMode == 'focus') {
                focusSessionsCompleted += 1;

                /*
                * 
                * TODO: Change logic so only when requested session breaks
                *       Then do this checks.
                */
                
                if (focusSessionsCompleted % 4 == 0) {
                    remainingTime = longBreakDuration;
                    currentMode = 'break';
                    document.getElementById("timer-label").textContent = "Longer Break Timer"
                } else {
                    remainingTime = shortBreakDuration;
                    currentMode = 'break';
                    document.getElementById("timer-label").textContent = "Break Timer";
                }

            } else if (currentMode == 'break') {
                remainingTime = focusDuration;
                currentMode = 'focus';
                document.getElementById("timer-label").textContent = "Focus Timer";
            }

        } else {
            remainingTime -= 1;
        }
        displayTimer();
}

// Button Functionality

// Start

/*
* StartClick Function
*
* + Fixed the start button bug when click multiple times timer speeds up.
*/

startClick = function() {
    if (timerRunning == false) {
        intervalId = setInterval(countDownTimer, 1000);
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
    if (timerRunning == true) {
        clearInterval(intervalId);
        timerRunning = false;
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
    remainingTime = focusDuration + 1;
    currentMode = 'focus';
    document.getElementById("timer-label").textContent = "Focus Timer";
    displayTimer();
    timerRunning = false;
    
}

reset.addEventListener('click', resetClick);

// Initial display of the timer
displayTimer(); // Show timer immediately on page load
// --- IGNORE ---