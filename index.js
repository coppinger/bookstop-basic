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
let buttonElem = document.querySelector(".button");

let counter = 0;

let totalTime = 0;

// Chronofuction B)

function chronoFunction(secs) {
  let seconds = secs % 60;
  let minutes = Math.floor(secs / 60);
  let hours = Math.floor(minutes / 60);
  return `${hours}h : ${minutes}m : ${seconds}s`;
}

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
  let secondsElapsed = Math.ceil((Date.now() - currentTime) / 1000);
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
  window.localStorage.setItem(
    taskList[counter],
    Math.floor((Date.now() - currentTime) / 1000)
  );
  console.log("Local storage thing:");
  console.log(window.localStorage.getItem(taskList[counter]));
  console.log("end");

  // -- CLEAN THIS UP!
  totalTime += Math.floor((Date.now() - currentTime) / 1000);
  console.log(totalTime);
  currentTime = Date.now();
  currentTaskNameTime.innerHTML = 0;
  // -- CLEAN THIS UP! ^

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
    document.querySelector(".time-elapsed").innerHTML = chronoFunction(
      window.localStorage.getItem("totalTime")
    );

    let allTimesElem = document.querySelector(".all-times");

    // Render the times to the page
    for (let i = 0; i < taskList.length; i++) {
      allTimesElem.appendChild(document.createElement("p")).innerHTML =
        taskList[i] +
        " — " +
        chronoFunction(window.localStorage.getItem(taskList[i]));
    }
  }
}

window.addEventListener("load", onPageLoad, false);
