import { ArrayBarProps } from "../../_types";
import { inactive, selected, swapped, wait } from "../utils";
import { arraySortedOrNot } from "./checkSort";

const binarySearch = async (
  arr: ArrayBarProps[],
  l: number,
  h: number,
  key: ArrayBarProps,
  timer: number,
  stepData: (data: ArrayBarProps[]) => void
): Promise<number> => {
  if (l > h) return -1;

  let mid = Math.floor((l + h) / 2);

  arr[mid] = { ...arr[mid], color: selected };
  arr[l] = { ...arr[l], color: selected };
  arr[h] = { ...arr[h], color: selected };
  stepData(arr);
  await wait(500);

  if (arr[mid].number == key.number) {
    arr[l] = { ...arr[l], color: inactive };
    arr[h] = { ...arr[h], color: inactive };
    stepData(arr);
    await wait(500);
    return mid;
  }

  /* If arr[l...mid] is sorted */
  if (arr[l].number <= arr[mid].number) {
    /* As this subarray is sorted, we can quickly
        check if key lies in half or other half */
    if (key.number >= arr[l].number && key.number <= arr[mid].number) {
      arr[mid] = { ...arr[mid], color: inactive };
      arr[h] = { ...arr[h], color: inactive };
      stepData(arr);
      await wait(500);

      return await binarySearch(arr, l, mid - 1, key, timer, stepData);
    }
    /*If key not lies in first half subarray,
           Divide other half  into two subarrays,
           such that we can quickly check if key lies
           in other half */
    arr[mid] = { ...arr[mid], color: inactive };
    arr[l] = { ...arr[l], color: inactive };
    stepData(arr);
    await wait(500);

    return await binarySearch(arr, mid + 1, h, key, timer, stepData);
  }

  /* If arr[l..mid] first subarray is not sorted,
    then arr[mid... h]
    must be sorted subarray */
  if (key.number >= arr[mid].number && key.number <= arr[h].number) {
    arr[mid] = { ...arr[mid], color: inactive };
    arr[l] = { ...arr[l], color: inactive };
    stepData(arr);
    await wait(500);

    return await binarySearch(arr, mid + 1, h, key, timer, stepData);
  }
  arr[mid] = { ...arr[mid], color: inactive };
  arr[h] = { ...arr[h], color: inactive };
  stepData(arr);
  await wait(500);

  return await binarySearch(arr, l, mid - 1, key, timer, stepData);
};

export const searchElement = async (
  arr: ArrayBarProps[],
  element: ArrayBarProps,
  timer: number,
  stepData: (data: ArrayBarProps[]) => void
) => {
  const sorted = arraySortedOrNot(arr);

  if (sorted) {
    const foundIndex = await binarySearch(
      arr,
      0,
      arr.length - 1,
      element,
      timer,
      stepData
    );
    const tempData = arr.map((item, index) =>
      index === foundIndex ? { ...item, color: swapped } : item
    );
    stepData(tempData);
    await wait(timer);
  } else {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = { ...arr[i], color: selected };
      stepData(arr);
      await wait(50);
      if (arr[i].number === element.number) {
        arr[i] = { ...arr[i], color: swapped };
        stepData(arr);
        await wait(50);
        break;
      }
      arr[i] = { ...arr[i], color: inactive };
      stepData(arr);
      await wait(50);
    }
  }
};
