import { percentDiffCalc } from "./mathsFunctions.js";

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
      },
    ],
    totalTimeElapsed: "16904", // startTime - finishTime
    totalTimeComparisonPercent: "40%",
  },
];

export class routineLog {
  // Define what properties the object should have
  constructor(firstTask) {
    this.startTime = new Date();
    this.finishTime = "";
    this.tasks = [{ taskName: firstTask }];
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
    this.tasks.push({ taskName: taskName });
    this.tasks[this.tasks.length - 1].taskStartDate = new Date();
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

  // -- 1. Update totalTimeElapsed
  updateTotalTimeElapsed(totalTime) {
    this.totalTimeElapsed = totalTime;
  }

  // -- 2. Calculate total totalTimeComparisonPercent
  setPercentChange(routineLogList) {
    // // This updates the totalTimeComparisonPercent value of this object to a calculation
    // // using the percentDiffCalc function to calculate the % difference. Noice.
    // this.totalTimeComparisonPercent = percentDiffCalc(
    //   routineLogList[routineLogList.length - 2].totalTimeElapsed,
    //   totalTime
    // );

    // // property == routineLog[routineLog.length - 1]
    // // OR
    // // property == routineLog[routineLog.length - 1].tasks

    // // Refactor
    // this.property = percentDiffCalc(
    //   routineLogList[routineLogList.length - 2].totalTimeElapsed,
    //   routineLogList[routineLogList.length - 1].totalTimeElapsed
    // );

    // this.property = percentDiffCalc(
    //   this.tasks[this.tasks.length - 2].taskDuration,
    //   this.tasks[this.tasks.length - 1].taskDuration
    // );

    console.log("!!!");
    console.log(routineLogList.length);
    console.log(this.tasks.length);
    console.log("!!!");
  }

  // TODO: Save a finish time
  saveFinishTime() {
    this.finishTime = new Date();
  }
}

// 1. Add the first task to the array (rotuineLogList)
// Also, add the first task to it

// 2. When clicking 'Next', save the current task & time to the nested tasks array inside the object

// 3. When clicking 'Finish' to end the routine, update the total time & calculate the percent different
