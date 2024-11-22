let cnum = Math.floor(Math.random() * 100) + 1;
let attempt = 0;
let timer = 30;
let highScore = parseInt(localStorage.getItem('highScore')) || 0;
let userinp = document.getElementById("inp");
let subBtn = document.getElementById("submit");
let resBtn = document.getElementById("resBtn");
let message = document.getElementById("msg");
let attemptData = document.getElementById("attempt");
let previousGuesses = document.getElementById('previousGuesses');
let toggleModeBtn = document.getElementById("toggleMode");
let timeLeft = document.getElementById("timeLeft");
let leaderboard = document.getElementById("highScore");
leaderboard.innerText = highScore;

let timerInterval = setInterval(updateTimer, 1000);

function updateTimer() {
    if (timer > 0) {
        timer--;
        timeLeft.innerText = timer;
    } else {
        clearInterval(timerInterval);
        message.innerHTML = "Time's up! You didn't guess the number.";
        message.style.color = "red";
        resBtn.style.display = "block";
        subBtn.disabled = true;
        userinp.disabled = true;
    }
}

function check() {
    let usernum = parseInt(userinp.value);
    if (isNaN(usernum) || usernum < 1 || usernum > 100) {
        message.innerHTML = "Please enter a valid number between 1 and 100.";
        message.style.color = "red";
        userinp.value = "";
        return;
    }

    if (attempt === 0) {
        previousGuesses.innerHTML = "Previous guesses: ";
    }
    
    attempt++;
    attemptData.innerHTML = attempt;
    previousGuesses.innerHTML += usernum + " ";

    if (cnum === usernum) {
        clearInterval(timerInterval);
        message.innerHTML = "Congratulations, you guessed the number!";
        message.style.color = "green";
        message.classList.add("animate");
        resBtn.style.display = "block";
        subBtn.disabled = true;
        userinp.disabled = true;
        playSound("correct");

        // Update high score
        if (highScore === 0 || attempt < highScore) {
            highScore = attempt;
            localStorage.setItem('highScore', highScore);
            leaderboard.innerText = highScore;
        }
    } else {
        message.style.color = "red";
        if (cnum < usernum) {
            message.innerHTML = "Too high! Try again.";
        } else {
            message.innerHTML = "Too low! Try again.";
        }
        playSound("incorrect");

        if (cnum < usernum) {
            message.innerHTML += " Hint: Try a number lower than " + usernum + ".";
        } else {
            message.innerHTML += " Hint: Try a number higher than " + usernum + ".";
        }
    }
    
    userinp.value = "";
}

function restart() {
    cnum = Math.floor(Math.random() * 100) + 1;
    attempt = 0;
    timer = 30;
    timeLeft.innerText = timer;
    attemptData.innerHTML = attempt;
    userinp.value = "";
    message.innerHTML = "";
    message.classList.remove("animate");
    previousGuesses.innerHTML = "";
    resBtn.style.display = "none";
    subBtn.disabled = false;
    userinp.disabled = false;
    timerInterval = setInterval(updateTimer, 1000);
}

function playSound(result) {
    let audio;
    if (result === "correct") {
        audio = new Audio('correct.mp3');
    } else {
        audio = new Audio('incorrect.mp3');
    }
    audio.play();
}

function toggleMode() {
    document.body.classList.toggle('dark-mode');
}

subBtn.addEventListener("click", check);
resBtn.addEventListener("click", restart);
toggleModeBtn.addEventListener("click", toggleMode);

