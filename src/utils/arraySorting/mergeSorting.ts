// Merges two subarrays of arr[]. First subarray is arr[l..m] and Second subarray is arr[m+1..r]
// Time O(n)

import { ArrayBarProps } from "../../_types";
import { active, done, inactive, selected, swapped, wait } from "../utils";

// Space O(n)
const merge = async (
  arr: ArrayBarProps[],
  left: number,
  middle: number,
  right: number,
  timer: number,
  stepData: (data: ArrayBarProps[]) => void
) => {
  // left array and right array length
  const leftArrayLength = middle - left + 1;
  const rightArrayLength = right - middle;

  // temp left array and its values
  const leftArray = [];
  for (let i = 0; i < leftArrayLength; i++) {
    leftArray[i] = arr[left + i];
    arr[left + i] = { ...arr[left + i], color: active };
  }

  // temp right array and its values
  const rightArray = [];
  for (let j = 0; j < rightArrayLength; j++) {
    rightArray[j] = arr[middle + 1 + j];
    arr[middle + 1 + j] = { ...arr[middle + 1 + j], color: active };
  }
  stepData(arr);
  await wait(timer);

  // merge the temp arrays back into arr[l..r]
  // intial index of first and second subarrays
  let i = 0,
    j = 0,
    // intial index of merged array
    k = left;

  arr[left + i] = { ...arr[left + i], color: selected };
  arr[middle + 1 + j] = { ...arr[middle + 1 + j], color: selected };
  stepData(arr);
  await wait(timer);

  while (i < leftArrayLength && j < rightArrayLength) {
    arr[k] = { ...arr[k], color: swapped };
    if (leftArray[i].number <= rightArray[j].number) {
      arr[left + i] = { ...arr[left + i], color: swapped };
      stepData(arr);
      await wait(timer / 2);

      arr[k] = leftArray[i];

      arr[left + i] = { ...arr[left + i], color: done };
      stepData(arr);
      await wait(timer / 2);
      i++;
    } else {
      arr[middle + 1 + j] = { ...arr[middle + 1 + j], color: swapped };
      stepData(arr);
      await wait(timer / 2);

      arr[k] = rightArray[j];

      arr[middle + 1 + j] = { ...arr[middle + 1 + j], color: done };
      stepData(arr);
      await wait(timer / 2);
      j++;
    }
    arr[k] = { ...arr[k], color: done };
    stepData(arr);
    await wait(timer / 2);
    k++;
  }

  // copy the remaining elements of leftArray[] if there are any
  while (i < leftArrayLength) {
    arr[k] = { ...arr[k], color: swapped };
    arr[left + i] = { ...arr[left + i], color: swapped };
    stepData(arr);
    await wait(timer);

    arr[k] = leftArray[i];

    arr[left + i] = { ...arr[left + i], color: done };
    arr[k] = { ...arr[k], color: done };
    stepData(arr);
    await wait(timer);

    i++;
    k++;
  }
  // copy the remaining elements of rightArray[] if there are any
  while (j < rightArrayLength) {
    arr[k] = { ...arr[k], color: swapped };
    arr[middle + 1 + j] = { ...arr[middle + 1 + j], color: swapped };
    stepData(arr);
    await wait(timer);

    arr[k] = rightArray[j];

    arr[middle + 1 + j] = { ...arr[middle + 1 + j], color: done };
    arr[k] = { ...arr[k], color: done };
    stepData(arr);
    await wait(timer);

    j++;
    k++;
  }
};

// Time O(nlogn)
// Space O(1)
export const mergeSort = async (
  arr: ArrayBarProps[],
  left: number,
  right: number,
  timer: number,
  stepData: (data: ArrayBarProps[]) => void
) => {
  for (let i = 0; i < arr.length; i++) {
    if (i >= left && i <= right) {
      continue;
    }
    arr[i] = { ...arr[i], color: inactive };
  }
  stepData(arr);
  if (arr.length > 100) {
    await wait(100);
  }
  await wait(timer);

  if (left >= right) {
    return;
  }
  const middle = left + parseInt(`${(right - left) / 2}`);

  for (let i = left; i < middle; i++) {
    arr[i] = { ...arr[i], color: active };
  }
  stepData(arr);
  await wait(timer);

  await mergeSort(arr, left, middle, timer, stepData);

  for (let i = left; i < middle; i++) {
    arr[i] = { ...arr[i], color: inactive };
  }
  stepData(arr);
  await wait(timer);

  for (let i = middle + 1; i < right; i++) {
    arr[i] = { ...arr[i], color: active };
  }
  stepData(arr);
  await wait(timer);
  await mergeSort(arr, middle + 1, right, timer, stepData);

  for (let i = middle + 1; i < right; i++) {
    arr[i] = { ...arr[i], color: inactive };
  }
  stepData(arr);
  await wait(timer);
  await merge(arr, left, middle, right, timer, stepData);
};
