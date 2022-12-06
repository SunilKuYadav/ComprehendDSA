import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Bar from "./components/Bar";
import { ArrayBarProps } from "./_types";
import { bubbleSort, inactive } from "./utils";

var timer = 500;

function App() {
  const [count, setCount] = useState(20);
  const [dataSet, setdataSet] = useState<ArrayBarProps[]>([]);

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.value);
    setCount(parseInt(e.target.value));
  };

  const updateData = () => {
    // update timer
    if (count >= 80) {
      timer = 10;
    } else if (count >= 50) {
      timer = 50;
    } else if (count >= 20) {
      timer = 100;
    } else if (count >= 10) {
      timer = 300;
    } else {
      timer = 500;
    }
    // create data set
    const tempDataSet: any[] = [];
    let data = Math.floor(Math.random() * (100 - 5 + 1)) + 5;
    for (let i = 0; i < count; i++) {
      tempDataSet.push({ number: data, color: inactive });
      data = Math.floor(Math.random() * (100 - 5 + 1)) + 5;
    }
    setdataSet(() => [...tempDataSet]);
  };

  const updateUI = (data: ArrayBarProps[]) => {
    setdataSet(() => [...data]);
    console.log(data);
  };

  const sorting = () => {
    bubbleSort(dataSet, timer, updateUI);
  };

  useEffect(updateData, [count]);

  return (
    <div className="App">
      <input
        type="range"
        min={5}
        max={100}
        step={1}
        value={count}
        onChange={handleSizeChange}
      />
      <div
        style={{
          display: "flex",
          height: 600,
        }}
      >
        {dataSet.length &&
          dataSet.map((item, index) => (
            <Bar
              color={item.color}
              number={item.number}
              key={`${index}k`}
              size={count}
            />
          ))}
      </div>
      <button onClick={updateData}>generate</button>
      <button onClick={sorting}> sort</button>
    </div>
  );
}

export default App;
