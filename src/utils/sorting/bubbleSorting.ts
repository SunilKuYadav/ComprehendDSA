import { ArrayBarProps } from "../../_types";
import { active, done, inactive, swapped, wait } from "../utils";

export const bubbleSort = async (
  arr: ArrayBarProps[],
  timer: number,
  stepData: (data: ArrayBarProps[]) => void
) => {
  // length of array
  const len = arr.length;
  // a boolean varible for checking if array is alraedy sorted
  let swap = false;
  // loop over array 0 to len - 1
  for (let i = 0; i < len - 1; i++) {
    // consider that array is sorted
    swap = false;

    // loop over array for internal comparision and swapping
    // 0 - len - i -1
    for (let j = 0; j < len - i - 1; j++) {
      // update selected element in UI
      arr[j] = { ...arr[j], color: active };
      arr[j + 1] = { ...arr[j + 1], color: active };
      stepData(arr);
      await wait(timer);

      // check if j and j+1 element is following the order
      if (arr[j].number > arr[j + 1].number) {
        // update swap element on UI color
        await wait(timer);
        // arr[j] = { ...arr[j], color: swapped };
        // arr[j + 1] = { ...arr[j + 1], color: swapped };
        await wait(timer);

        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        // array is not sorted so assign swap to be true
        swap = true;

        // update swap element on UI
        stepData(arr);
        await wait(timer);
      }

      // Update after swapped element on UI
      stepData(arr);
      await wait(timer);
      arr[j] = { ...arr[j], color: inactive };
      arr[j + 1] = { ...arr[j + 1], color: inactive };
      stepData(arr);
    }
    // update sorted element on UI
    arr[len - i - 1] = { ...arr[len - i - 1], color: done };
    stepData(arr);
    wait(timer);
    // check if array is aready sorted and break the loop
    if (!swap) {
      break;
    }
  }

  // return sorted array
  return arr;
};
