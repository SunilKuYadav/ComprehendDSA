import { inactive } from "../utils";

const getArrays = (row: number, column: number) => {
  let tempDataSet: any[] = [];

  tempDataSet = twoDimessionalArray(row, column);
  console.log(tempDataSet);

  return tempDataSet;
};

const twoDimessionalArray = (row: number, col: number) => {
  let matrix = new Array(row).fill([]);
  return matrix.map(() => {
    return new Array(col).fill(0).map(() => {
      let data = Math.floor(Math.random() * 1234) + 1;
      return { number: data, color: inactive };
    });
  });
};

export { getArrays };
