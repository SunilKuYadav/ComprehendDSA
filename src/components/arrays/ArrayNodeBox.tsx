import { swapped, selected } from "../../utils";
import { BarProps } from "../../_types";

const ArrayNodeBox = (props: BarProps) => {
  const { color, number } = props;

  return (
    <div
      className="center"
      style={{
        position: `${
          color === swapped || color === selected ? "relative" : "relative"
        }`,
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
