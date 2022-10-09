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

if (localStorage.getItem("routineLogList") !== null) {
  routineLogList = JSON.parse(localStorage.getItem("routineLogList"));
}

// localStorage.setItem("routineLogList", "yeet");

// localStorage.removeItem("routineLogList");

// routineLogList = localStorage.getItem("routineLogList") || [];

// if (localStorage.getItem("routineLogList") !== null) {
//   routineLogList = localStorage.getItem("routineLogList);
// }

const currentTaskNameElem = document.querySelector(".current-task-name");
const currentTaskNameTime = document.querySelector(".current-task-time");
const currentTaskXElem = document.querySelector(".current-task-x");
const currentTaskYElem = document.querySelector(".current-task-y");
const buttonElem = document.querySelector(".button");

let counter = 0;

let totalTime = 5000;

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

let interval = "";

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

  routineLogList[routineLogList.length - 1].finishTask();

  routineLogList[routineLogList.length - 1].addTask(taskList[counter + 1]);

  console.log(routineLogList);
  console.log(routineLogList[0].tasks);

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
    // Add the finish time to the log
    routineLogList[routineLogList.length - 1].saveFinishTime();
    // Set the routineLog to storage
    window.localStorage.setItem(
      "routineLogList",
      JSON.stringify(routineLogList)
    );
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

/**------------------------------------------------------------------------
 *                           FINISHED PAGE
 *------------------------------------------------------------------------**/

function finishedRender() {
  const currentRoutineLog = routineLogList[routineLogList.length - 1];
  const prevRoutineLog = routineLogList[routineLogList.length - 2];

  /*------------------ DIVISION -----------------*/

  const logDayElem = document.querySelector(".log-day");
  const logDateElem = document.querySelector(".log-date");
  const logMonthElem = document.querySelector(".log-month");
  const logYearElem = document.querySelector(".log-year");

  logDayElem.innerHTML = new Intl.DateTimeFormat("en-local", {
    weekday: "long",
  }).format(new Date(currentRoutineLog.finishTime));

  logDateElem.innerHTML = new Intl.DateTimeFormat("en-local", {
    day: "numeric",
  }).format(new Date(currentRoutineLog.finishTime));

  logMonthElem.innerHTML = new Intl.DateTimeFormat("en-local", {
    month: "short",
  }).format(new Date(currentRoutineLog.finishTime));

  logYearElem.innerHTML = new Intl.DateTimeFormat("en-local", {
    year: "numeric",
  }).format(new Date(currentRoutineLog.finishTime));

  /*------------------ DIVISION -----------------*/

  let startTimeElem = document.querySelector(".start-time");
  let endTimeElem = document.querySelector(".end-time");

  startTimeElem.innerHTML = new Intl.DateTimeFormat("en-local", {
    timeStyle: "short",
  }).format(new Date(currentRoutineLog.startTime));

  endTimeElem.innerHTML = new Intl.DateTimeFormat("en-local", {
    timeStyle: "short",
  }).format(new Date(currentRoutineLog.finishTime));

  /*------------------ DIVISION -----------------*/

  let totalDuration = document.querySelector(".total-duration");
  let previousDuration = document.querySelector(".previous-duration");

  totalDuration.innerHTML = formatTime(currentRoutineLog.totalTimeElapsed);

  previousDuration.innerHTML = formatTime(prevRoutineLog.totalTimeElapsed);

  // previousDuration.innerHTML =
  //   JSON.parse(routineLogList)[routineLogList.length - 2].totalTimeElapsed;
}

// Format time

function formatTime(seconds) {
  let secs = Math.floor(seconds % 60);
  let mins = Math.floor((seconds / 60) % 60);
  let hours = Math.floor(seconds / 60 / 60);
  return `${hours > 0 ? hours + "h" : ""}
  ${mins > 0 ? mins + "m" : ""}
  ${secs > 0 ? secs + "s" : ""}`;
}

/**------------------------------------------------------------------------
 *                           ON PAGE LOAD
 *------------------------------------------------------------------------**/

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
    buttonElem.addEventListener("click", nextTask);
    routineLogList.push(new routineLog(taskList[0]));
    startRoutine();
  }
  if (currentPath === "/finished.html") {
    // document.querySelector(".time-elapsed").innerHTML =
    //   convertSecondsToTimestamp(window.localStorage.getItem("totalTime"));
    // let allTimesElem = document.querySelector(".all-times");
    // Render the times to the page
    // for (let i = 0; i < taskList.length; i++) {
    //   allTimesElem.appendChild(document.createElement("p")).innerHTML =
    //     taskList[i] +
    //     " — " +
    //     convertSecondsToTimestamp(window.localStorage.getItem(taskList[i]));
    // }
    finishedRender();
  }
}

/**========================================================================
 *                           Maths Functions
 *========================================================================**/

export function percentDiffCalc(oldVal, newVal) {
  // Calculate the difference in percent between two values
  return ((oldVal - newVal) / oldVal) * 100;
}

/**========================================================================
 *                           Object Functions
 *========================================================================**/

// 0. Create a class for the object

[
  {
    startTime: "date",
    finishTime: "date",
    tasks: [
      {
        taskName: "",
        taskStartDate: "",
        taskFinishDate: "",
        taskDuration: "", // taskStartDate - taskFinishDate
        taskPercentChange: "",
      },
    ],
    totalTimeElapsed: "16904", // startTime - finishTime
    totalPercentChange: "40",
  },
];

export class routineLog {
  // Define what properties the object should have
  constructor(firstTask) {
    this.startTime = new Date();
    this.finishTime = "";
    this.tasks = [{ taskName: firstTask, taskStartDate: new Date() }];
    this.totalTimeElapsed = 0;
    this.totalTimeComparisonPercent = "";
  }

  // # routineLog Methods
  // ## Base methods
  // -- addTask
  // -- addTaskTime
  // -- updateTotalTimeElapsed
  // -- updateTotalTimeComparisonPercent
  // -- saveFinishTime
  // ## Task methods
  // -- Finish task — save the current time to the taskFinishDate
  // --

  // -- Create methods
  // -- 0. Add new task
  addTask(taskName) {
    this.tasks.push({ taskName: taskName, taskStartDate: new Date() });
    // this.tasks[this.tasks.length - 1].taskStartDate = new Date();
  }

  // -- At the end of the task, save the time elapsed to the task array

  finishTask() {
    let thisTask = this.tasks.length - 1;
    let tasksArray = this.tasks;

    tasksArray[thisTask].taskEndDate = new Date();

    tasksArray[thisTask].taskDuration =
      (tasksArray[thisTask].taskEndDate.getTime() -
        tasksArray[thisTask].taskStartDate.getTime()) /
      1000;
  }

  saveFinishTime() {
    this.finishTime = new Date();
    this.totalTimeElapsed =
      (this.finishTime.getTime() - this.startTime.getTime()) / 1000;
  }

  // -- 2. Calculate total totalTimeComparisonPercent
  // setPercentChange(mode) {
  //   if (mode === "task") {
  //     this.tasks[this.tasks.length - 1].taskPercentChange = percentDiffCalc(
  //       routineLogList[routineLogList.length - 2].tasks[
  //         this.tasks[this.tasks.length - 1]
  //       ].taskDuration,
  //       this.tasks[this.tasks.length - 1].taskDuration
  //     );
  //     console.log(this.tasks[this.tasks.length - 1]);
  //   } else if (mode === "log") {
  //     this.totalTimeComparisonPercent = percentDiffCalc(
  //       routineLogList[routineLogList.length - 2].totalTimeElapsed,
  //       routineLogList[routineLogList.length - 1].totalTimeElapsed
  //     );
  //   }

  //   // This updates the totalTimeComparisonPercent value of this object to a calculation
  //   // using the percentDiffCalc function to calculate the % difference. Noice.
  //   this.totalTimeComparisonPercent = percentDiffCalc(
  //     routineLogList[routineLogList.length - 2].totalTimeElapsed,
  //     totalTime
  //   );

  //   // property == routineLog[routineLog.length - 1]
  //   // OR
  //   // property == routineLog[routineLog.length - 1].tasks

  //   // Refactor

  //   console.log("!!!");
  //   console.log(routineLogList.length);
  //   console.log(this.tasks.length);
  //   console.log("!!!");
  // }
}

// 1. Add the first task to the array (rotuineLogList)
// Also, add the first task to it

// 2. When clicking 'Next', save the current task & time to the nested tasks array inside the object

// 3. When clicking 'Finish' to end the routine, update the total time & calculate the percent different

/*---------------------------- END OF SECTION ----------------------------*/

/**========================================================================
 *                           END OF FILE
 *========================================================================**/

window.addEventListener("load", onPageLoad, false);

// routineLogList[1].finishTime = new Date();

// routineLogList[0].saveFinishTime();
// routineLogList[1].saveFinishTime();

console.log(routineLogList);
// console.log(routineLogList[1].tasks);
