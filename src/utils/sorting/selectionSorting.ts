import { ArrayBarProps } from "../../_types";
import { done, inactive, selected, swapped, wait } from "../utils";

export const selectionSort = async (
  arr: ArrayBarProps[],
  timer: number,
  stepData: (data: ArrayBarProps[]) => void
) => {
  const len = arr.length;
  let i, j, minIndex;

  for (i = 0; i < len - 1; i++) {
    arr[i] = { ...arr[i], color: swapped };
    stepData(arr);
    await wait(timer);

    minIndex = i;
    for (j = i + 1; j < len; j++) {
      arr[j] = { ...arr[j], color: selected };
      stepData(arr);
      await wait(timer);

      if (arr[j].number < arr[minIndex].number) {
        if (minIndex !== i) {
          arr[minIndex] = { ...arr[minIndex], color: inactive };
          stepData(arr);
          await wait(timer);
        }

        minIndex = j;

        arr[minIndex] = { ...arr[minIndex], color: swapped };
        stepData(arr);
        await wait(timer);
      }

      if (j !== minIndex) {
        arr[j] = { ...arr[j], color: inactive };
        stepData(arr);
        await wait(timer);
      }
    }

    arr[minIndex] = { ...arr[minIndex], color: swapped };
    stepData(arr);
    await wait(timer);

    const temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;

    arr[minIndex] = { ...arr[minIndex], color: inactive };
    arr[i] = { ...arr[i], color: done };
    stepData(arr);
    await wait(timer);
  }

  stepData(arr);
};
