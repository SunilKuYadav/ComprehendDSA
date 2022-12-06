const wait = (timer: number) => new Promise((res) => setTimeout(res, timer));
const active = "red",
  done = "green",
  selected = "red",
  inactive = "lightgreen",
  swapped = "#FFFF99";

export { wait, active, done, inactive, selected, swapped };
