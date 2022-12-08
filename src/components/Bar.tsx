import React, { useEffect, useState } from "react";

interface BarProps {
  size: number;
  color: string;
  number: number;
  maxHeightCount: number;
}

const Bar = (props: BarProps) => {
  const { number, size, color, maxHeightCount } = props;
  const [hover, setHover] = useState(false);
  // size * step = 600
  // 600 / size = step

  const onHover = () => setHover((prev) => !prev);

  return (
    <div
      style={{
        width: size < 100 ? ((100 / size) * 4 < 30 ? (100 / size) * 4 : 30) : 3,
        height: number * (600 / maxHeightCount),
        backgroundColor: color,
        margin: 2,
        color: "white",
      }}
      onMouseEnter={onHover}
      onMouseLeave={onHover}
    >
      {size < 20 ? (
        number
      ) : hover ? (
        <span
          style={{
            position: "absolute",
            color: "red",
            backgroundColor: "aliceblue",
            padding: 5,
            borderRadius: "50%",
          }}
        >
          {number}
        </span>
      ) : null}
    </div>
  );
};

export default Bar;
