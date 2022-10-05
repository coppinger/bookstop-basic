import { percentDiffCalc } from "./mathsFunctions.js";
import { routineLogItem } from "./objectFunctions.js";

console.log(percentDiffCalc(174.98, 143.18));

let currentPath = window.location.pathname;

let taskList = [
  "Run",
  "Workout",
  "Shower",
  "Dress",
  "Make bed",
  "Breakfast",
  "Brush teeth",
];

let routineLogList = [];

const currentTaskNameElem = document.querySelector(".current-task-name");
const currentTaskNameTime = document.querySelector(".current-task-time");
const currentTaskXElem = document.querySelector(".current-task-x");
const currentTaskYElem = document.querySelector(".current-task-y");
const buttonElem = document.querySelector(".button");

let counter = 0;

let totalTime = 80598;

// Convert seconds to a timestamp (6006s -> 10m : 6s)

function convertSecondsToTimestamp(secs) {
  const seconds = secs % 60;
  const minutes = Math.floor(secs / 60) % 60;
  const hours = Math.floor(secs / 60 / 60);
  return `${hours}h : ${minutes}m : ${seconds}s`;
}

// Convert ms values to seconds
function convertMillisecondsToSeconds(milliseconds) {
  return Math.floor((Date.now() - milliseconds) / 1000);
}

// Update function convertMillisecondsToSeconds(milliseconds){;
function updateCurrentTaskElements() {
  currentTaskNameElem.innerHTML = taskList[counter];
  currentTaskXElem.innerHTML = counter + 1;
  currentTaskYElem.innerHTML = taskList.length;
}

// Save current time
let currentTime = Date.now();

// Update the current task time every second
function updateCurrentTaskTime() {
  // Refactor this so it isn't using ceil
  const secondsElapsed = Math.ceil((Date.now() - currentTime) / 1000);
  currentTaskNameTime.innerHTML = secondsElapsed;
}

// Start button clicked, begin session
function startRoutine() {
  updateCurrentTaskElements();
  // Set an interval and called the function to update the current time element
  interval = setInterval(updateCurrentTaskTime, 1000);
}

// Next task function

function nextTask() {
  // -- Add previous task time to total time counter
  // -- Add previous task time to taskLog object
  // -- Reset current time

  // Set current time to local storage item
  window.localStorage.setItem(
    taskList[counter],
    convertMillisecondsToSeconds(currentTime)
  );

  // Add the task which is ending's time to the totalTime variable
  totalTime += convertMillisecondsToSeconds(currentTime);
  // Reset the currentTime variable to the time in this moment
  currentTime = Date.now();
  // Reset the task name time element to 0
  currentTaskNameTime.innerHTML = 0;

  // -- Check if this is the last task
  if (counter < taskList.length - 2) {
    counter++;
    console.log(counter);
  } else if (counter == taskList.length - 2) {
    counter++;
    buttonElem.innerHTML = "Finish";
  } else {
    console.log("Finito!");
    // Clear the interval
    clearInterval(interval);
    // Set the total time to storage
    window.localStorage.setItem("totalTime", totalTime);
    // Redirect to /finished.html
    window.location.href = "./finished.html";
    return;
  }
  // ---- If it is, change the next button text to 'Finish' and run the finish function
  // ---- If it isn't, continue as normal

  // -- Update current task name element
  // -- Update current task time element
  updateCurrentTaskElements();
}

// Finish task function

// *-- ON PAGE LOAD --*

// Render the relevant items on the page
function onPageLoad() {
  // -- If on the index page, render the list of tasks to page
  if (currentPath === "/") {
    let taskListEl = document.querySelector(".task-list");
    taskList.forEach((task) => {
      taskListEl.appendChild(document.createElement("p")).innerHTML = task;
    });
  }
  // -- If on the on-going page, load the start function
  if (currentPath === "/on-going.html") {
    startRoutine();
  }
  if (currentPath === "/finished.html") {
    document.querySelector(".time-elapsed").innerHTML =
      convertSecondsToTimestamp(window.localStorage.getItem("totalTime"));

    let allTimesElem = document.querySelector(".all-times");

    // Render the times to the page
    for (let i = 0; i < taskList.length; i++) {
      allTimesElem.appendChild(document.createElement("p")).innerHTML =
        taskList[i] +
        " — " +
        convertSecondsToTimestamp(window.localStorage.getItem(taskList[i]));
    }
  }
}

window.addEventListener("load", onPageLoad, false);

routineLogList.push(new routineLogItem(taskList[0]));

console.log(routineLogList);
