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

// If there is no routineLogList array saved in local storage, then create it, otherwise load whatever is in local storage
window.routineLogList =
  JSON.parse(localStorage.getItem("routineLogList")) || [];

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

let totalTime = 0;

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
  const secondsElapsed = Math.round((Date.now() - currentTime) / 1000);
  currentTaskNameTime.innerHTML = formatTime(secondsElapsed);
  console.log("tick");
  console.log((Date.now() - currentTime) / 1000);
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
  currentTaskNameTime.innerHTML = "0s";

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
    //! This is shit and I feel shit
    routineLogList[routineLogList.length - 1].tasks.pop();
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

  /*------------------ DIVISION -----------------*/

  const totalTimeComparisonElem = document.querySelector(".percent-change");
  const percentChangeHolderElem = document.querySelector(
    ".percent-change-holder"
  );
  const percentChangeDescriptorElem = document.querySelector(
    ".percent-change-descriptor"
  );

  totalTimeComparisonElem.innerHTML = Math.abs(
    currentRoutineLog.totalTimeComparisonPercent
  );

  currentRoutineLog.totalTimeComparisonPercent > 0
    ? (percentChangeHolderElem.classList.add("text-green-500"),
      (percentChangeDescriptorElem.innerHTML = " faster"))
    : (percentChangeHolderElem.classList.add("text-red-500"),
      (percentChangeDescriptorElem.innerHTML = " slower"));
  // percentChangeDescriptorElem

  /*------------------ DIVISION -----------------*/

  const taskHolderElem = document.querySelector(".task-holder");

  for (let i = 0; i < currentRoutineLog.tasks.length; i++) {
    let li = document.createElement("li");
    li.classList.add("grid", "justify-between", "grid-cols-[3fr_2fr_2fr]");
    let p1 = document.createElement("p");
    p1.innerText = currentRoutineLog.tasks[i].taskName;
    p1.classList.add(
      "text-left",
      "whitespace-nowrap",
      "text-ellipsis",
      "min-w-0",
      "overflow-hidden"
    );
    let p2 = document.createElement("p");
    p2.innerText = Math.abs(currentRoutineLog.tasks[i].taskPercentChange) + "%";
    p2.classList.add("text-center", "whitespace-nowrap");
    if (currentRoutineLog.tasks[i].taskPercentChange > 0) {
      p2.classList.add("text-green-500");
    } else {
      p2.classList.add("text-red-500");
    }
    let p3 = document.createElement("p");
    p3.innerText = formatTime(currentRoutineLog.tasks[i].taskDuration);
    p3.classList.add("text-right");
    li.appendChild(p1);
    li.appendChild(p2);
    li.appendChild(p3);
    taskHolderElem.appendChild(li);
  }

  // for (let i = 0; i < taskList.length; i++) {
  //   taskHolderElem.appendChild(document.createElement("li")).innerHTML = "";
  //   convertSecondsToTimestamp(window.localStorage.getItem(taskList[i]));
  // }
}

// Format time

function formatTime(seconds) {
  let secs = Math.floor(seconds % 60);
  let mins = Math.floor((seconds / 60) % 60);
  let hours = Math.floor(seconds / 60 / 60);
  return `${
    (hours > 0 ? hours + "h" : "",
    mins > 0 ? mins + "m" : "",
    secs > 0 ? secs + "s" : "0s")
  }`;
}

// -- At the end of the task, save the time elapsed to the task array

function calcTaskPercentChange() {
  // Calculate the percent change between this tasks duration, and the previous routine log's task duration for the same task
  let thisRoutine = routineLogList[routineLogList.length - 1];
  let prevRoutine = routineLogList[routineLogList.length - 2];

  for (let i = 0; i < thisRoutine.tasks.length; i++) {
    thisRoutine.tasks[i].taskPercentChange = Math.floor(
      percentDiffCalc(
        prevRoutine.tasks[i].taskDuration,
        thisRoutine.tasks[i].taskDuration
      )
    );
  }
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
    let buttonDoneElem = document.querySelector(".button-done");

    buttonDoneElem.addEventListener("click", () => {
      window.location.href = "./";
    });

    calcTaskPercentChange();
    finishedRender();
  }
}

/**========================================================================
 *                           Maths Functions
 *========================================================================**/

function percentDiffCalc(oldVal, newVal) {
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

class routineLog {
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

  // -- Create methods
  // -- 0. Add new task
  addTask(taskName) {
    this.tasks.push({ taskName: taskName, taskStartDate: new Date() });
    // this.tasks[this.tasks.length - 1].taskStartDate = new Date();
  }

  finishTask() {
    let thisTask = this.tasks.length - 1;
    let prevRoutineThisTask =
      routineLogList[routineLogList.length - 2].tasks[this.tasks.length - 1];
    let tasksArray = this.tasks;

    tasksArray[thisTask].taskEndDate = new Date();

    // Calculate and set the routines total duration
    tasksArray[thisTask].taskDuration =
      (tasksArray[thisTask].taskEndDate.getTime() -
        tasksArray[thisTask].taskStartDate.getTime()) /
      1000;
  }

  saveFinishTime() {
    this.finishTime = new Date();
    this.totalTimeElapsed =
      (this.finishTime.getTime() - this.startTime.getTime()) / 1000;

    // Calculate and set the total percent change vs the most recent routine
    routineLogList[routineLogList.length - 1].totalTimeComparisonPercent =
      Math.ceil(
        percentDiffCalc(
          routineLogList[routineLogList.length - 2].totalTimeElapsed,
          routineLogList[routineLogList.length - 1].totalTimeElapsed
        )
      );
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

console.log(routineLogList);
