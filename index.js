let taskList = [
  "Run",
  "Workout",
  "Shower",
  "Dress",
  "Make bed",
  "Breakfast",
  "Brush teeth",
];

let sessionList = [
  {
    id: 1,
    date: "",
    totalTimeElapsed: 1259,
    totalTimeComparisonPercent: 0,
    tasks: [
      {
        taskName: "Run",
        taskTime: 127,
      },
    ],
  },
];

let taskTimer = 0;
let totalTimer = 0;

function convertSecondsStringToTimestamp(num) {
  let seconds = num % 60;
  let minutes = Math.floor(num / 60) % 60;
  let hours = Math.floor(Math.floor(num / 60) / 60);

  let converted = `${hours}:${minutes}:${seconds}s`;
  return converted;
}

let taskItem = document.createElement("p");

let timerEl = document.querySelector(".timer");
let totalTimerEl = document.querySelector(".total-timer");
let currentTaskEl = document.querySelector(".current-task");

function loadList() {
  let taskListEl = document.querySelector(".task-list");
  taskList.forEach((task) => {
    taskListEl.appendChild(document.createElement("p")).innerHTML = task;
  });
}

let counter = 0;

function timerIncrement() {
  taskTimer++;
  timerEl.innerHTML = convertSecondsStringToTimestamp(taskTimer);
}

let isTimerRunning = false;

let interval = 0;

let currentTime = 0;

function startTimer() {
  // Check to see if the list has been run through
  if (counter < taskList.length) {
    // Counter is less than the number of tasks
    currentTime = Date.now();
    totalTimer += taskTimer;
    taskTimer = 0;
    timerEl.innerHTML = "0:0:0s";
    totalTimerEl.innerHTML = convertSecondsStringToTimestamp(totalTimer);
    if (isTimerRunning) {
      // Set current task string to the corresponding item in the array
      totalTimer += (Date.now() - currentTime) / 1000;
      currentTaskEl.innerHTML = taskList[counter];
      counter++;
      console.log(counter);
    } else {
      totalTimer += (Date.now() - currentTime) / 1000;
      isTimerRunning = true;
      currentTime = Date.now();
      currentTaskEl.innerHTML = taskList[counter];
      interval = setInterval(timerIncrement, 1000);
      counter++;
      console.log(counter);
    }
  } else {
    // Counter is greater than or equal to the number of tasks (stop)
    totalTimer += taskTimer;
    totalTimerEl.innerHTML = convertSecondsStringToTimestamp(totalTimer);
    clearInterval(interval);
    console.log(`Finito! Counter count: ${counter}`);
  }
}

window.addEventListener("load", loadList, false);
