import { PatternDataProps } from "../../pages/pattern";
import { selected, wait } from "../utils";

interface PatternProps {
  data: PatternDataProps[][];
  symbol: number;
  stepData: (data: PatternDataProps[][]) => void;
}

const TopTriangle = async (props: PatternProps) => {
  const { data, stepData, symbol } = props;

  const len = data.length;

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      data[i][j] = { ...data[i][j], symbol, color: selected };
      stepData(data);
      await wait(20);
      if (j <= i) {
        data[i][j] = {
          ...data[i][j],
          symbol: symbol === -1 ? 0 : symbol,
          color: "",
        };
        stepData(data);
        await wait(50);
      } else {
        data[i][j] = { ...data[i][j], symbol: -1, color: "" };
        stepData(data);
        await wait(20);
      }
    }
  }
};

const BottomTriangle = async (props: PatternProps) => {
  const { data, stepData, symbol } = props;

  const len = data.length;

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      data[i][j] = { ...data[i][j], symbol, color: selected };
      stepData(data);
      await wait(20);
      if (j >= i) {
        data[i][j] = {
          ...data[i][j],
          symbol: symbol === -1 ? 0 : symbol,
          color: "",
        };
        stepData(data);
        await wait(50);
      } else {
        data[i][j] = { ...data[i][j], symbol: -1, color: "" };
        stepData(data);
        await wait(20);
      }
    }
  }
};

export { TopTriangle, BottomTriangle };
