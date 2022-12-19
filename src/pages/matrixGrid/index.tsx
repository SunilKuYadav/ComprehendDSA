import { useEffect, useState } from "react";

import { GetMatrix } from "../../components";
import { useWindowSize } from "../../hooks";
import { bubbleSort, getArrays, mergeSort, wait } from "../../utils";

const MatrixGrid = () => {
  const [rowsCount, setRowsCount] = useState<number>(5);
  const [rowsMaxCount, setRowsMaxCount] = useState<number>(10);
  const [columnCount, setColumnCount] = useState<number>(5);
  const [columnMaxCount, setColumnMaxCount] = useState<number>(7);
  const [btnState, setBtnState] = useState<boolean>(false);
  const [dataSet, setDataSet] = useState<any[][]>([]);

  const size = useWindowSize();

  // handle row count change
  const handleRowCountChange = (e: any) =>
    setRowsCount(() => parseInt(e.target.value));
  // handle column count change
  const handleColumnCountChange = (e: any) =>
    setColumnCount(() => parseInt(e.target.value));

  const updateUI = (data: any[], row: number) => {
    let res = data;
    let temp = dataSet;
    temp[row] = res;
    setDataSet(() => [...temp]);
  };

  const updateUI2 = (data: any[], row: number) => {
    let tempArray = dataSet;
    for (let j = 0; j < rowsCount; j++) {
      tempArray[j][row] = data[j];
    }
    setDataSet(() => [...tempArray]);
  };

  const handleSort2dArrayByRow = async () => {
    for (let i = 0; i < rowsCount; i++) {
      await mergeSort(dataSet[i], 0, dataSet[i].length - 1, 1, (data: any[]) =>
        updateUI(data, i)
      );
    }
  };
  const handleSort2dArrayByColumn = async () => {
    for (let i = 0; i < columnCount; i++) {
      let tempArray = [];
      for (let j = 0; j < rowsCount; j++) {
        tempArray.push(dataSet[j][i]);
        console.log(j, i);
      }
      await mergeSort(tempArray, 0, tempArray.length - 1, 1, (data: any[]) =>
        updateUI2(data, i)
      );
    }
  };

  const handleSortArray = async () => {
    await handleSort2dArrayByColumn();
    await handleSort2dArrayByRow();
  };

  // update data set on col or row change
  useEffect(
    () => setDataSet(() => [...getArrays(rowsCount, columnCount)]),
    [rowsCount, columnCount]
  );

  // update max row and col according to screen width
  useEffect(() => {
    const width = size.width;
    setColumnMaxCount(() => Math.floor(width / 30) - 1);
    width > 800 ? setRowsMaxCount(() => 19) : setRowsMaxCount(() => 10);
  }, [size.width]);

  return (
    <div className="center col">
      <div className="center">
        <p>row</p>
        <input
          disabled={btnState}
          type="range"
          min={1}
          max={rowsMaxCount}
          step={1}
          value={rowsCount}
          onChange={handleRowCountChange}
        />
        <p>column</p>
        <input
          disabled={btnState}
          type="range"
          min={1}
          max={columnMaxCount}
          step={1}
          value={columnCount}
          onChange={handleColumnCountChange}
        />
      </div>
      <div
        className="center"
        style={{ minHeight: "600px", overflow: "hidden" }}
      >
        <GetMatrix data={dataSet} total={columnCount * rowsCount} />
      </div>
      <div>
        <button className="btn" onClick={handleSort2dArrayByRow}>
          Sort by row
        </button>
        <button className="btn" onClick={handleSort2dArrayByColumn}>
          Sort by column
        </button>
        {/* <button className="btn" onClick={handleSort2dArrayByRow}>
          full Sort by row
        </button>
        <button className="btn" onClick={handleSort2dArrayByColumn}>
          full Sort by column
        </button> */}
      </div>
    </div>
  );
};

export default MatrixGrid;
