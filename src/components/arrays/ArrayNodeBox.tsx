import React from "react";
import { swapped, selected } from "../../utils";

interface BoxProps {
  size: number;
  color: string;
  number: number;
  maxHeightCount: number;
}

const ArrayNodeBox = (props: BoxProps) => {
  const { color, maxHeightCount, number, size } = props;
  return (
    <div
      style={{
        display: "flex",
        position: `${
          color === swapped || color === selected ? "relative" : "relative"
        }`,
        justifyContent: "center",
        alignItems: "center",
        color: `${color === swapped || color === selected ? "black" : "red"}`,
        fontWeight: `${
          color === swapped || color === selected ? "bolder" : "normal"
        }`,
        border: "1px solid black",
        height: "30px",
        width: "50px",
        backgroundColor: `${color}`,
        top: `${color === swapped || color === selected ? 30 : 0}px`,
      }}
    >
      {number}
    </div>
  );
};

export default ArrayNodeBox;
