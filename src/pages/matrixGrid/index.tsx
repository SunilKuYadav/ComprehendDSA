import { useEffect, useState } from "react";

import { GetMatrix, OptionSelect } from "../../components";
import { useWindowSize } from "../../hooks";
import { getArrays } from "../../utils";

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
    </div>
  );
};

export default MatrixGrid;
