const wait = (timer: number) => new Promise((res) => setTimeout(res, timer));
const active = "#e5d0e5",
  done = "#00ff00",
  selected = "#0000ff",
  inactive = "#d4fcd4",
  swapped = "#ff0000";

export { wait, active, done, inactive, selected, swapped };
