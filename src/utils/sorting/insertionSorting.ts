import { ArrayBarProps } from "../../_types";
import { active, done, swapped, wait } from "../utils";

export const insertionSort = async (
  arr: ArrayBarProps[],
  timer: number,
  stepData: (data: ArrayBarProps[]) => void
) => {
  const len = arr.length;
  let i, j, key;
  for (i = 0; i < len; i++) {
    key = arr[i];
    j = i - 1;

    for (let k = 0; k <= j; k++) {
      if (arr[k].color !== done) {
        arr[k] = { ...arr[k], color: active };
      }
    }
    stepData(arr);
    await wait(timer);

    while (j >= 0 && arr[j].number > key.number) {
      let a = arr[j + 1].color;
      let b = arr[j].color;
      arr[j + 1] = { ...arr[j + 1], color: swapped };
      arr[j] = { ...arr[j], color: swapped };
      stepData(arr);
      await wait(timer);

      arr[j + 1] = arr[j];

      arr[j] = { ...arr[j], color: b };
      arr[j + 1] = { ...arr[j + 1], color: a };
      stepData(arr);
      await wait(timer);

      j -= 1;
    }
    arr[j + 1] = key;
    arr[j + 1] = { ...arr[j + 1], color: done };
    stepData(arr);
    await wait(timer);
  }
  stepData(arr);
};
