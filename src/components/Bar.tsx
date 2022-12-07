import React, { useEffect, useState } from "react";

interface BarProps {
  size: number;
  color: string;
  number: number;
}

const Bar = (props: BarProps) => {
  const { number, size, color } = props;
  const [hover, setHover] = useState(false);
  // size * step = 600
  // 600 / size = step

  const onHover = () => setHover((prev) => !prev);

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
