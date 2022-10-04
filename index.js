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

// let taskListLength = taskList.length;

let currentTaskNameElem = document.querySelector(".current-task-name");
let currentTaskNameTime = document.querySelector(".current-task-time");
let currentTaskXElem = document.querySelector(".current-task-x");
let currentTaskYElem = document.querySelector(".current-task-y");

let counter = 0;

// Update current task elements
function updateCurrentTaskElements() {
  currentTaskNameElem.innerHTML = taskList[counter];
  currentTaskXElem.innerHTML = counter + 1;
  currentTaskYElem.innerHTML = taskList.length;
}

// Save current time
let currentTime = Date.now();

// Update the current task time every second
function updateCurrentTaskTime() {
  let secondsElapsed = Math.floor((Date.now() - currentTime) / 1000);
  currentTaskNameTime.innerHTML = secondsElapsed;
}

// Start button clicked, begin session
function startRoutine() {
  updateCurrentTaskElements();
  // Set an interval and called the function to update the current time element
  interval = setInterval(updateCurrentTaskTime, 1000);
}

// Next task function

// -- Add previous task time to total time counter
// -- Add previous task time to taskLog object
// -- Reset current time

// -- Check if this is the second to last task
// ---- If it is, hide the next button and show the finish button
// ---- If it isn't, continue as normal

// -- Update current task name element
// -- Update current task time element

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
}

window.addEventListener("load", onPageLoad, false);
