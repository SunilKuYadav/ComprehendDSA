import React, { useEffect, useState } from "react";

import "./App.css";
import "./Sorting.css";
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
  const [unique, setUnique] = useState<boolean>(false);
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
    let tempDataSet: any[] = [];
    let data = Math.floor(Math.random() * countMax) + 1;
    if (unique) {
      while (tempDataSet.length < count) {
        if (tempDataSet.indexOf(data) === -1) {
          tempDataSet.push(data);
        }
        data = Math.floor(Math.random() * countMax) + 1;
      }
    } else {
      for (let i = 0; i < count; i++) {
        tempDataSet.push(data);
        data = Math.floor(Math.random() * countMax) + 1;
      }
    }
    setdataSet(() =>
      tempDataSet.map((data) => ({
        number: data,
        color: inactive,
      }))
    );
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
  const handleNumberChange = (e: any) => {
    if (e.target.value === "uni") {
      setUnique(() => true);
    } else {
      setUnique(() => false);
    }
  };

  useEffect(() => {
    if (count > countMax) {
      setCountMax(() => 300);
      console.log("update.....");
    }
    updateData();
  }, [count]);
  useEffect(() => {
    if (size.width > 800) {
      const tempCount = Math.floor(size.width / 8);
      if (300 > tempCount) {
        setCountMax(() => tempCount);
      } else {
        setCountMax(() => 300);
      }
    } else {
      setCountMax(() => 50);
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
      <div className="header-wrapper">
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
        <select className="select" onChange={handleGraphChange}>
          <option value="bar">Bar</option>
          <option value="box">Box</option>
        </select>
      </div>
      <div className="bar-line-wrapper">
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
      <div className="btn-wrapper">
        <select
          className="select"
          disabled={btnState}
          onChange={handleNumberChange}
        >
          <option value="dup">Duplicate</option>
          <option value="uni">Unique</option>
        </select>
        <button className="btn" disabled={btnState} onClick={updateData}>
          generate new array
        </button>
        {/* <button className="btn" disabled={btnState} onClick={() => toggleModal("add")}>
          add new element
        </button>
        <button className="btn" disabled={btnState} onClick={() => toggleModal("delete")}>
          delete element
        </button> */}
        <button
          className="btn"
          disabled={btnState}
          onClick={() => toggleModal("search")}
        >
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
          <button
            className="btn"
            disabled={btnState}
            onClick={() => sorting("bubble")}
          >
            bubble sort
          </button>
          <button
            className="btn"
            disabled={btnState}
            onClick={() => sorting("merge")}
          >
            merge sort
          </button>
          <button
            className="btn"
            disabled={btnState}
            onClick={() => sorting("insertion")}
          >
            insertion sort
          </button>
          <button
            className="btn"
            disabled={btnState}
            onClick={() => sorting("selection")}
          >
            selection sort
          </button>
          <button
            className="btn"
            disabled={btnState}
            onClick={() => sorting("quick")}
          >
            quick sort
          </button>
          <button
            className="btn"
            disabled={btnState}
            onClick={() => sorting("heap")}
          >
            heap sort
          </button>
        </div>
        <div className="color-wrapper">
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
      <footer>
        <div className="icon-wrap flex row">
          <a href="https://github.com/SunilKuYadav" target="_blank">
            <div className="flex icon" id="icon-5">
              <i className="mdi mdi-github"></i>
            </div>
          </a>
          <a href="https://www.linkedin.com/in/123sunil/" target="_blank">
            <div className="flex icon" id="icon-2">
              <i className="mdi mdi-linkedin"></i>
            </div>
          </a>
          <a href="https://twitter.com/123sunilkr" target="_blank">
            <div className="flex icon" id="icon-2">
              <i className="mdi mdi-twitter"></i>
            </div>
          </a>
          <a href="https://www.instagram.com/_om_rudra_/" target="_blank">
            <div className="flex icon" id="icon-4">
              <i className="mdi mdi-instagram"></i>
            </div>
          </a>
        </div>
        <div className="info-box">
          <div className="footnote">
            SUNIL KUMAR YADAV <span className="highlight">&copy;2022-23</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
