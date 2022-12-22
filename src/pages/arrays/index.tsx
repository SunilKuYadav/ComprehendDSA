import React, { useEffect, useState } from "react";

import "./Sorting.css";
import { ArrayBarProps } from "./../../_types";
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
} from "./../../utils";
import { useWindowSize } from "./../../hooks";
import {
  ArrayNodeBar,
  ArrayNodeBox,
  Button,
  OptionSelect,
} from "./../../components";
import ArrayElementModal from "./../../components/modal/ArrayElementModal";

// base time for change animation in mm
var timer = 500;

const Arrays = () => {
  const [unique, setUnique] = useState<boolean>(false);
  const [count, setCount] = useState<number>(20);
  const [countMax, setCountMax] = useState<number>(50);
  const [dataSet, setdataSet] = useState<ArrayBarProps[]>([]);
  const [btnState, setBtnState] = useState<boolean>(false);
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [bar, setBar] = useState<boolean>(true);
  const [arrOperation, setArrOperation] = useState<string>("");

  const size = useWindowSize();

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setCount(() => parseInt(e.target.value));

  const updateData = () => {
    // update timer
    count >= 200
      ? (timer = 5)
      : count >= 100
      ? (timer = 10)
      : count >= 80
      ? (timer = 30)
      : count >= 50
      ? (timer = 50)
      : count >= 20
      ? (timer = 100)
      : (timer = 300);

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

    // add color field and update data
    setdataSet(() =>
      tempDataSet.map((data) => ({
        number: data,
        color: inactive,
      }))
    );
  };

  const updateUI = (data: ArrayBarProps[]) => setdataSet(() => [...data]);

  const sorting = async (type: string) => {
    // disable buttons
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
    // enable buttons
    setBtnState(false);
  };

  const toggleModal = (operation?: string) => {
    operation && setArrOperation(() => operation);
    setModalStatus((prev) => !prev);
  };

  const handleDataUpdate = async (
    element: ArrayBarProps,
    type: string,
    position?: number
  ) => {
    // disable buttons
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

    // enable buttons
    setBtnState(false);
  };

  const handleGraphChange = (e: any) =>
    e.target.value === "bar" ? setBar(() => true) : setBar(() => false);

  const handleNumberChange = (e: any) =>
    e.target.value === "unique"
      ? setUnique(() => true)
      : setUnique(() => false);

  useEffect(() => {
    if (count > countMax) {
      setCountMax(() => 300);
    }
    updateData();
  }, [count]);

  useEffect(() => {
    if (size.width > 600) {
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
        <OptionSelect options={["bar", "box"]} change={handleGraphChange} />
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
        <OptionSelect
          options={["duplicate", "unique"]}
          change={handleNumberChange}
          disabled={btnState}
        />
        <Button
          title="generate new array"
          click={updateData}
          disabled={btnState}
        />
        {/* <button className="btn" disabled={btnState} onClick={() => toggleModal("add")}>
          add new element
        </button>
        <button className="btn" disabled={btnState} onClick={() => toggleModal("delete")}>
          delete element
        </button> */}
        <Button
          title="search element"
          click={() => toggleModal("search")}
          disabled={btnState}
        />
        <Button
          title="Stop & Reload"
          click={() => {
            window.location.reload();
          }}
          disabled={!btnState}
        />
      </div>
      <div className="center col">
        <div className="center">
          <Button
            title="bubble sort"
            click={() => sorting("bubble")}
            disabled={btnState}
          />
          <Button
            title="merge sort"
            click={() => sorting("merge")}
            disabled={btnState}
          />
          <Button
            title="heap sort"
            click={() => sorting("heap")}
            disabled={btnState}
          />
          <Button
            title="quick sort"
            click={() => sorting("quick")}
            disabled={btnState}
          />
          <Button
            title="selection sort"
            click={() => sorting("selection")}
            disabled={btnState}
          />
          <Button
            title="insertion sort"
            click={() => sorting("insertion")}
            disabled={btnState}
          />
        </div>
        <div className="color-wrapper center">
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
};

export default Arrays;
