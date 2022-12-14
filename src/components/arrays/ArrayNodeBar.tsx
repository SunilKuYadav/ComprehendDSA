import { useEffect, useState } from "react";

import { useWindowSize } from "../../hooks";
import { BarProps } from "../../_types";

const ArrayNode = (props: BarProps) => {
  const { number, size, color, maxHeightCount } = props;

  const [hover, setHover] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const screenSize = useWindowSize();

  // check for mobile view
  useEffect(() => {
    if (screenSize.width < 600) {
      setIsMobile(() => true);
    } else {
      setIsMobile(() => false);
    }
  }, [screenSize.width]);

  // handle mouse hover
  const onHover = () => setHover((prev) => !prev);

  return (
    <div
      style={{
        width: isMobile
          ? 2
          : size < 100
          ? (100 / size) * 4 < 30
            ? (100 / size) * 4
            : 30
          : 3,
        height: isMobile
          ? number * (400 / maxHeightCount)
          : number * (600 / maxHeightCount),
        backgroundColor: color,
        margin: 2,
        color: "white",
      }}
      onMouseEnter={onHover}
      onMouseLeave={onHover}
    >
      {size < 20 && !isMobile ? (
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

export default ArrayNode;
