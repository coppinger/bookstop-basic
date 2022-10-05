export function percentDiffCalc(oldVal, newVal) {
  // Calculate the difference in percent between two values
  return ((oldVal - newVal) / ((oldVal + newVal) / 2)) * 100;
}
