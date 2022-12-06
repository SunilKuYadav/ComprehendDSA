import React, { useEffect, useState } from "react";

interface BarProps {
  size: number;
  color: string;
  number: number;
}

const Bar = (props: BarProps) => {
  const { number, size, color } = props;
  // size * step = 600
  // 600 / size = step

  return (
    <div
      style={{
        width: (100 / size) * 4 < 30 ? (100 / size) * 4 : 30,
        height: number * 6,
        backgroundColor: color,
        margin: 2,
        color: "white",
        marginTop: 600 - number * 6,
      }}
    >
      {size < 20 ? number : ""}
    </div>
  );
};

export default Bar;
