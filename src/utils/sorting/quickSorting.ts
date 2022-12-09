import { ArrayBarProps } from "../../_types";
import { inactive, swapped, wait, selected, done, active } from "../utils";

const swap = async (
  arr: ArrayBarProps[],
  first: number,
  second: number,
  timer: number,
  stepData: (data: ArrayBarProps[]) => void
) => {
  arr[first] = { ...arr[first], color: swapped };
  arr[second] = { ...arr[second], color: swapped };
  stepData(arr);
  await wait(timer);

  const temp = arr[first];
  arr[first] = arr[second];
  arr[second] = temp;

  arr[first] = { ...arr[first], color: inactive };
  arr[second] = { ...arr[second], color: inactive };
  stepData(arr);
  await wait(timer);
};

const partition = async (
  arr: ArrayBarProps[],
  start: number,
  end: number,
  timer: number,
  stepData: (data: ArrayBarProps[]) => void
) => {
  for (let i = 0; i < arr.length; i++) {
    if (i >= start && i <= end) {
      arr[i] = { ...arr[i], color: active };
    }
    if (i > end) {
      arr[i] = { ...arr[i], color: inactive };
    }
    if (i < start) {
      arr[i] = { ...arr[i], color: done };
    }
  }
  stepData(arr);
  await wait(timer);

  // pivot
  const pivot = arr[end];

  // Index of smaller element and indicates the right position of pivot found so far
  let i = start - 1;

  for (let j = start; j <= end; j++) {
    // If current element is smaller than the pivot

    arr[j] = { ...arr[j], color: selected };
    arr[end] = { ...arr[end], color: selected };
    stepData(arr);
    await wait(timer);

    if (arr[j].number < pivot.number) {
      // Increment index of smaller element
      i++;
      await swap(arr, i, j, timer, stepData);
    }

    arr[j] = { ...arr[j], color: swapped };
    arr[end] = { ...arr[end], color: swapped };
    stepData(arr);
    await wait(timer);
  }
  await swap(arr, i + 1, end, timer, stepData);
  return i + 1;
};

export const quickSort = async (
  arr: ArrayBarProps[],
  start: number,
  end: number,
  timer: number,
  stepData: (data: ArrayBarProps[]) => void
) => {
  if (start < end) {
    const pi = await partition(arr, start, end, timer, stepData);

    // for (let i = 0; i < arr.length; i++) {
    //   arr[i] = { ...arr[i], color: active };
    // }
    // stepData(arr);
    // await wait(timer);
    await quickSort(arr, start, pi - 1, timer, stepData);
    await quickSort(arr, pi + 1, end, timer, stepData);
    stepData(arr);
  }
};
