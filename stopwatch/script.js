let startBtn = document.getElementById("Start");
let pauseBtn = document.getElementById("Pause");
let resetBtn = document.getElementById("Reset");
let lapBtn = document.getElementById("Lap");

let display = document.getElementById("display");
let lapsList = document.getElementById("laps");

let startTime = 0;
let elapsed = 0;
let timerInterval;
let isRunning = false;

function updateDisplay(time) {
    let ms = Math.floor((time % 1000) / 10); // hundredths
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    let hours = Math.floor(time / (1000 * 60 * 60));

    display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(ms)}`;
}

function pad(num) {
    return num.toString().padStart(2, '0');
}

startBtn.addEventListener("click", () => {
    if (!isRunning) {
        startTime = Date.now() - elapsed;
        timerInterval = setInterval(() => {
            elapsed = Date.now() - startTime;
            updateDisplay(elapsed);
        }, 10);
        isRunning = true;
    }
});

pauseBtn.addEventListener("click", () => {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
    }
});

resetBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    isRunning = false;
    elapsed = 0;
    updateDisplay(0);
    lapsList.innerHTML = "";
});

lapBtn.addEventListener("click", () => {
    if (isRunning) {
        const lapItem = document.createElement("li");
        lapItem.textContent = display.textContent;
        lapItem.style.color = "white";
        lapItem.style.backgroundColor = "rgb(16, 3, 67)";
        lapItem.style.border = "1px solid rgb(87, 167, 241)";
        lapItem.style.padding = "0.5rem";
        lapItem.style.margin = "0.3rem";
        lapItem.style.borderRadius = "10px";
        lapsList.appendChild(lapItem);
    }
});
