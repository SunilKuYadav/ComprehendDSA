import { useEffect, useState } from "react";

import { Button, GetPattern, OptionSelect } from "../../components";
import { useWindowSize } from "../../hooks";
import {
  getPatternBox,
  symboles,
  patternType,
  TopTriangle,
  BottomTriangle,
} from "../../utils";

export interface PatternDataProps {
  symbol: number;
  color: string;
  key: string;
}

const PatternPage = () => {
  const [rowsCount, setRowsCount] = useState<number>(10);
  const [rowsMaxCount, setRowsMaxCount] = useState<number>(10);
  const [btnState, setBtnState] = useState<boolean>(false);
  const [dataSet, setDataSet] = useState<PatternDataProps[][]>([]);
  const [symbol, setSymbol] = useState<number>(-1);
  const [pattern, setPattern] = useState("Top Triangle");

  const size = useWindowSize();

  // handle row count change
  const handleRowCountChange = (e: any) =>
    setRowsCount(() => parseInt(e.target.value));

  const handleChangeSymbol = (e: any) =>
    setSymbol(() => symboles.indexOf(e.target.value));

  const updateUI = (data: PatternDataProps[][]) => {
    setDataSet(() => [...data]);
  };
  const handlePatternChange = (e: any) => setPattern(() => e.target.value);

  const handlePatterGenerate = () => handleGeneratePattern(pattern);

  const handleGeneratePattern = async (pattern: string) => {
    setBtnState(true);
    const params = {
      data: dataSet,
      symbol,
      stepData: updateUI,
    };
    switch (pattern) {
      case "Top Triangle":
        await TopTriangle(params);
        break;
      case "Bottom Triangle":
        await BottomTriangle(params);
        break;
      default:
        break;
    }
    setBtnState(false);
  };

  // update data set on col or row change
  useEffect(
    () => setDataSet(() => [...getPatternBox(rowsCount, rowsCount, symbol)]),
    [rowsCount, symbol]
  );

  // update max row and col according to screen width
  useEffect(() => {
    const width = size.width;
    if (width < 400) {
      setRowsCount(() => Math.floor(width / 30));
    }
    width > 600 ? setRowsMaxCount(() => 19) : setRowsMaxCount(() => 10);
  }, [size.width]);

  return (
    <div className="center col">
      <div className="center">
        <p>row & column</p>
        <input
          disabled={btnState}
          type="range"
          min={5}
          max={rowsMaxCount}
          step={1}
          value={rowsCount}
          onChange={handleRowCountChange}
        />
        <OptionSelect
          options={symboles}
          change={handleChangeSymbol}
          disabled={btnState}
        />
        {/* <OptionSelect
          options={["Symbol", "Number"]}
          change={() => {}}
          disabled={btnState}
        /> */}
      </div>
      <div
        className="center"
        style={{ minHeight: "600px", overflow: "hidden" }}
      >
        <GetPattern data={dataSet} total={rowsCount * rowsCount} />
      </div>
      <div>
        <OptionSelect
          disabled={btnState}
          options={patternType}
          change={handlePatternChange}
        />
        <Button
          title="Generate"
          disabled={btnState}
          click={handlePatterGenerate}
        />
      </div>
    </div>
  );
};

export default PatternPage;
