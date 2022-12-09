import { ArrayBarProps } from "../../_types";

export const arraySortedOrNot = (arr: ArrayBarProps[]) => {
  const len = arr.length;
  // Array has one or no element
  if (len == 0 || len == 1) return true;

  for (let i = 1; i < len; i++) {
    // Unsorted pair found
    if (arr[i - 1].number > arr[i].number) {
      return false;
    }
  }

  // No unsorted pair found
  return true;
};
