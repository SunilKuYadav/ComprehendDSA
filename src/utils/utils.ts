const wait = (timer: number) => new Promise((res) => setTimeout(res, timer));
const active = "#0000ff",
  done = "#00ff00",
  selected = "#FFFF99",
  inactive = "lightgreen",
  swapped = "#ff0000";

export { wait, active, done, inactive, selected, swapped };
