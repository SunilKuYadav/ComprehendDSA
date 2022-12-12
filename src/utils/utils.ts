const wait = (timer: number) => new Promise((res) => setTimeout(res, timer));
const active = "#808080",
  done = "#00ff00",
  selected = "#0000ff",
  inactive = "#00E7FF",
  swapped = "#ff0000";

export { wait, active, done, inactive, selected, swapped };
