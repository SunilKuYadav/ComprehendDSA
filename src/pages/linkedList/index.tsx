import React, { useEffect, useState } from "react";

import "./LinkedList.css";
import { OptionSelect } from "../../components";
import LLSNode from "../../components/linkedList/LLSNode";
import { useWindowSize } from "../../hooks";
import { LLProps } from "../../_types";
import { getLL, LLTypes } from "../../utils";

const LinkedListPage = () => {
  const [type, setType] = useState<string>(LLTypes[0]);
  const [dataSet, setDataSet] = useState<LLProps[]>([]);
  const [count, setCount] = useState<number>(5);
  const [countMax, setCountMax] = useState<number>(50);
  const [unique, setUnique] = useState<boolean>(false);
  const [btnState, setBtnState] = useState<boolean>(false);

  const size = useWindowSize();

  // handle LL type change
  const handleLLTypeChange = (e: any) => {
    console.log(e.target.value);
    const typeIndex = LLTypes.indexOf(e.target.value);
    setType(() => LLTypes[typeIndex]);
  };

  // handle count of node change
  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log("size : ", e.target.value);

    setCount(() => parseInt(e.target.value));
  };

  // handle generate unique or duplicate values
  const handleNumberChange = (e: any) =>
    e.target.value === "unique"
      ? setUnique(() => true)
      : setUnique(() => false);

  // update max LL node on moble screen
  useEffect(() => {
    size.width > 800
      ? setCountMax(() => 50)
      : size.width > 600
      ? setCountMax(() => 30)
      : setCountMax(() => 20);
  }, [size.width]);

  // update date set on change number type and data
  useEffect(() => {
    const data = getLL(count, unique, type);
    setTimeout(() => setDataSet(() => [...data]), 100);
  }, [count, type, unique]);

  return (
    <div>
      <div className="center wrap ll-header">
        <OptionSelect
          options={LLTypes}
          change={handleLLTypeChange}
          disabled={btnState}
        />
        <p>size & speed</p>
        <input
          disabled={btnState}
          type="range"
          min={0}
          max={countMax}
          step={1}
          value={count}
          onChange={handleSizeChange}
        />
        <OptionSelect
          options={["duplicate", "unique"]}
          change={handleNumberChange}
          disabled={btnState}
        />
      </div>
      <div className="center wrap ll-body">
        {dataSet.map((item) => (
          <LLSNode {...item} />
        ))}
      </div>
      <div className="center wrap ll-footer">sdf</div>
    </div>
  );
};

export default LinkedListPage;
