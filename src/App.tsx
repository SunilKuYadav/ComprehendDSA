import React, { useEffect, useState } from "react";

import "./App.css";
import { ArrayBarProps } from "./_types";
import {
  active,
  addElement,
  bubbleSort,
  deleteElement,
  done,
  heapSort,
  inactive,
  insertionSort,
  mergeSort,
  quickSort,
  searchElement,
  selected,
  selectionSort,
  swapped,
} from "./utils";
import { useWindowSize } from "./hooks";
import { ArrayNodeBar, ArrayNodeBox } from "./components";
import ArrayElementModal from "./components/modal/ArrayElementModal";

var timer = 500;

function App() {
  const [count, setCount] = useState<number>(20);
  const [countMax, setCountMax] = useState<number>(100);
  const [dataSet, setdataSet] = useState<ArrayBarProps[]>([]);
  const [btnState, setBtnState] = useState<boolean>(false);
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [bar, setBar] = useState<boolean>(true);
  const [arrOperation, setArrOperation] = useState<string>("");

  const size = useWindowSize();

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCount(() => parseInt(e.target.value));
  };

  const updateData = () => {
    // update timer
    if (count >= 200) {
      timer = 5;
    } else if (count >= 100) {
      timer = 10;
    } else if (count >= 80) {
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
    let data = Math.floor(Math.random() * (countMax - 5 + 1)) + 5;
    for (let i = 0; i < count; i++) {
      tempDataSet.push({ number: data, color: inactive });
      data = Math.floor(Math.random() * (countMax - 5 + 1)) + 5;
    }
    setdataSet(() => [...tempDataSet]);
  };

  const updateUI = (data: ArrayBarProps[]) => {
    setdataSet(() => [...data]);
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
      case "insertion":
        await insertionSort(dataSet, timer, updateUI);
        break;
      case "selection":
        await selectionSort(dataSet, timer, updateUI);
        break;
      case "quick":
        await quickSort(dataSet, 0, dataSet.length - 1, timer, updateUI);
        break;
      case "heap":
        await heapSort(dataSet, timer, updateUI);
        break;
      default:
        break;
    }
    const tempData = dataSet.map((item) => ({ ...item, color: done }));
    setdataSet(() => [...tempData]);
    setBtnState(false);
  };

  const toggleModal = (operation?: string) => {
    if (operation) {
      setArrOperation(() => operation);
    }
    setModalStatus((prev) => !prev);
  };

  const handleDataUpdate = async (
    element: ArrayBarProps,
    type: string,
    position?: number
  ) => {
    setBtnState(true);
    if (type === "add") {
      await addElement(dataSet, element, timer, updateUI, position);
    }
    if (type === "delete") {
      await deleteElement(dataSet, element, timer, updateUI);
    }
    if (type === "search") {
      await searchElement(dataSet, element, timer, updateUI);
    }
    setBtnState(false);
  };

  const handleGraphChange = (e: any) => {
    console.log(e.target.value);
    if (e.target.value === "bar") {
      setBar(() => true);
    } else {
      setBar(() => false);
    }
  };

  useEffect(updateData, [count]);
  useEffect(() => {
    if (size.width > 800) {
      const tempCount = Math.floor(size.width / 8);
      if (300 > tempCount) {
        setCountMax(() => tempCount);
      } else {
        setCountMax(() => 300);
      }
    }
  }, [size.width]);

  return (
    <div className="App">
      <ArrayElementModal
        isOpen={modalStatus}
        closeModal={toggleModal}
        data={dataSet}
        maxNumber={countMax}
        dataReturn={handleDataUpdate}
        operation={arrOperation}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>size & speed</p>
        <input
          disabled={btnState}
          type="range"
          min={5}
          max={countMax}
          step={1}
          value={count}
          onChange={handleSizeChange}
        />
        <select onChange={handleGraphChange}>
          <option value="bar">Bar</option>
          <option value="box">Box</option>
        </select>
      </div>
      <div
        style={{
          display: "flex",
          // justifyContent: "center",
          height: 600,
          // width: "100%",
          flexWrap: "wrap",
          position: "relative",
          margin: "0 10px",
        }}
      >
        {bar
          ? dataSet.length &&
            dataSet.map((item, index) => (
              <ArrayNodeBar
                color={item.color}
                number={item.number}
                key={`${index}k`}
                size={count}
                maxHeightCount={countMax}
              />
            ))
          : dataSet.length &&
            dataSet.map((item, index) => (
              <ArrayNodeBox
                color={item.color}
                number={item.number}
                key={`${index}k`}
                size={count}
                maxHeightCount={countMax}
              />
            ))}
      </div>
      <div>
        <button disabled={btnState} onClick={updateData}>
          generate new array
        </button>
        <button disabled={btnState} onClick={() => toggleModal("add")}>
          add new element
        </button>
        <button disabled={btnState} onClick={() => toggleModal("delete")}>
          delete element
        </button>
        <button disabled={btnState} onClick={() => toggleModal("search")}>
          search element
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <button disabled={btnState} onClick={() => sorting("bubble")}>
            bubble sort
          </button>
          <button disabled={btnState} onClick={() => sorting("merge")}>
            merge sort
          </button>
          <button disabled={btnState} onClick={() => sorting("insertion")}>
            insertion sort
          </button>
          <button disabled={btnState} onClick={() => sorting("selection")}>
            selection sort
          </button>
          <button disabled={btnState} onClick={() => sorting("quick")}>
            quick sort
          </button>
          <button disabled={btnState} onClick={() => sorting("heap")}>
            heap sort
          </button>
        </div>
        <div>
          <input type="color" disabled value={active} />
          <span>Extra Space or Active sub-array</span>

          <input type="color" disabled value={selected} />
          <span>Comparing</span>

          <input type="color" disabled value={swapped} />
          <span>Swapping</span>

          <input type="color" disabled value={done} />
          <span>Done Sorting</span>
        </div>
      </div>
    </div>
  );
}

export default App;
