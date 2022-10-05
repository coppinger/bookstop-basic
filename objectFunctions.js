// 0. Create a class for the object

export class routineLogItem {
  // Define what properties the object should have
  constructor(firstTask) {
    this.date = new Date();
    this.tasks = [{ taskName: firstTask }];
    this.totalTimeElapsed = 0;
    this.totalTimeComparisonPercent = "";
  }
  // -- Create methods
  // -- 0. Add new task
  addTask(taskName) {
    this.tasks.push({ taskName: taskName });
  }
  // -- 1. Update totalTimeElapsed

  updateTotalTimeElapsed() {
    this.totalTimeElapsed = totalTime;
  }

  // -- 2. Calculate total totalTimeComparisonPercent
  updateTotalTimeComparisonPercent() {
    // This updates the totalTimeComparisonPercent value of this object to a calculation
    // using the percentDiffCalc function to calculate the % difference. Noice.
    this.totalTimeComparisonPercent(
      percentDiffCalc(taskList[taskList.length - 1].totalTimeElapsed, totalTime)
    );
  }
}

// 1. Add the first task to the array (rotuineLogList)
// Also, add the first task to it

// 2. When clicking 'Next', save the current task & time to the nested tasks array inside the object

// 3. When clicking 'Finish' to end the routine, update the total time & calculate the percent different
