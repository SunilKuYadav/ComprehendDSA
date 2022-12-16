import { v4 as uuidv4 } from "uuid";

import { PatternDataProps } from "./../../pages/pattern/index";
import { inactive } from "../utils";

const getPatternBox = (
  row: number,
  column: number,
  pattern: number
): PatternDataProps[][] => twoDimessionalArray(row, column, pattern);

const twoDimessionalArray = (row: number, col: number, pattern: number) => {
  let matrix: PatternDataProps[] = new Array(row).fill([]);
  return matrix.map(() => {
    return new Array(col).fill(0).map(() => {
      return {
        symbol: pattern ? pattern : -1,
        color: inactive,
        key: uuidv4(),
      };
    });
  });
};

export { getPatternBox };
