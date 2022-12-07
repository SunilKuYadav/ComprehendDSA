import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Bar from "./components/Bar";
import { ArrayBarProps } from "./_types";
import {
  active,
  bubbleSort,
  done,
  inactive,
  mergeSort,
  selected,
  swapped,
} from "./utils";

var timer = 500;

function App() {
  const [count, setCount] = useState(20);
  const [dataSet, setdataSet] = useState<ArrayBarProps[]>([]);
  const [btnState, setBtnState] = useState(false);

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.value);
    setCount(parseInt(e.target.value));
  };

  const updateData = () => {
    // update timer
    if (count >= 80) {
      timer = 30;
    } else if (count >= 50) {
      timer = 50;
    } else if (count >= 20) {
      timer = 100;
    } else {
      timer = 300;
    }
    // create data set
    const tempDataSet: any[] = [];
    let data = Math.floor(Math.random() * (100 - 5 + 1)) + 5;
    for (let i = 0; i < count; i++) {
      tempDataSet.push({ number: data, color: inactive });
      data = Math.floor(Math.random() * (100 - 5 + 1)) + 5;
    }
    setdataSet(() => [...tempDataSet]);
    console.log(tempDataSet.map((item) => item.number));
  };

  const updateUI = (data: ArrayBarProps[]) => {
    setdataSet(() => [...data]);
    // console.log(data.map((item) => item.number));
    console.log(data);
  };

  const sorting = async (type: string) => {
    setBtnState(true);
    switch (type) {
      case "bubble":
        await bubbleSort(dataSet, timer, updateUI);
        break;
      case "merge":
        await mergeSort(dataSet, 0, dataSet.length - 1, timer, updateUI);
        break;
      default:
        break;
    }
    setBtnState(false);
  };

  useEffect(updateData, [count]);

  return (
    <div className="App">
      <input
        disabled={btnState}
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
      <button disabled={btnState} onClick={updateData}>
        generate
      </button>
      <button disabled={btnState} onClick={() => sorting("bubble")}>
        {" "}
        bubble sort
      </button>
      <button disabled={btnState} onClick={() => sorting("merge")}>
        {" "}
        merge sort
      </button>
      <div>
        <input type="color" disabled value={active} />
        <span>Extra Space</span>

        <input type="color" disabled value={selected} />
        <span>Comparing</span>

        <input type="color" disabled value={swapped} />
        <span>Swapping</span>

        <input type="color" disabled value={done} />
        <span>Done Sorting</span>
      </div>
    </div>
  );
}

export default App;
