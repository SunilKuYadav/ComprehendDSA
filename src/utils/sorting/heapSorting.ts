import { ArrayBarProps } from "../../_types";
import { active, done, selected, swapped, wait } from "../utils";

const heapify = async (
  arr: ArrayBarProps[],
  size: number,
  targetIndex: number,
  timer: number,
  stepData: (data: ArrayBarProps[]) => void
) => {
  // Initialize largest as root
  let largest = targetIndex,
    left = 2 * targetIndex + 1,
    right = 2 * targetIndex + 2;

  arr[largest] = { ...arr[largest], color: selected };
  stepData(arr);
  await wait(timer);

  // if left child is larger than root
  if (left < size && arr[left].number > arr[largest].number) {
    arr[largest] = { ...arr[largest], color: active };
    stepData(arr);
    await wait(timer);

    largest = left;

    arr[largest] = { ...arr[largest], color: selected };
    stepData(arr);
    await wait(timer);
  }
  // if right child is larger than largest so far
  if (right < size && arr[right].number > arr[largest].number) {
    arr[largest] = { ...arr[largest], color: active };
    stepData(arr);
    await wait(timer);

    largest = right;

    arr[largest] = { ...arr[largest], color: selected };
    stepData(arr);
    await wait(timer);
  }

  arr[largest] = { ...arr[largest], color: active };
  stepData(arr);
  await wait(timer);

  // if largest is not root
  if (largest !== targetIndex) {
    arr[targetIndex] = { ...arr[targetIndex], color: swapped };
    arr[largest] = { ...arr[largest], color: swapped };
    stepData(arr);
    await wait(timer);

    const temp = arr[targetIndex];
    arr[targetIndex] = arr[largest];
    arr[largest] = temp;

    arr[targetIndex] = { ...arr[targetIndex], color: active };
    arr[largest] = { ...arr[largest], color: active };
    stepData(arr);
    await wait(timer);

    // recursively heapify the affect sub-tree
    await heapify(arr, size, largest, timer, stepData);
  }
};

export const heapSort = async (
  arr: ArrayBarProps[],
  timer: number,
  stepData: (data: ArrayBarProps[]) => void
) => {
  const len = arr.length;

  // build heap (rearrange array)
  for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
    await heapify(arr, len, i, timer, stepData);
  }

  // One by one extract an element from heap
  for (let i = len - 1; i > 0; i--) {
    arr[0] = { ...arr[0], color: swapped };
    arr[i] = { ...arr[i], color: swapped };
    stepData(arr);
    await wait(timer);

    // move current root too end
    const temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;

    arr[0] = { ...arr[0], color: active };
    arr[i] = { ...arr[i], color: done };
    stepData(arr);
    await wait(timer);

    for (let k = i - 1; k >= 0; k--) {
      arr[k] = { ...arr[k], color: active };
    }
    stepData(arr);
    await wait(timer);

    // call max heapify on the reduced heap
    await heapify(arr, i, 0, timer, stepData);
  }
};
