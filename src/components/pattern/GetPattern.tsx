import { PatternDataProps } from "../../pages/pattern";
import { Animation, inactive, symboles } from "../../utils";

interface PatternProps {
  total: number;
  data: PatternDataProps[][];
}

const GetPattern = (props: PatternProps) => {
  const { data, total } = props;

  if (data.length < 1) return <p>Increase row or column</p>;
  return (
    <div
      className="slide-up"
      style={{
        maxHeight: "600px",
        overflow: "hidden",
        border: "1px dotted black",
      }}
    >
      {data.map((_, r) => (
        <div key={`${r}`} className="center col slide-down">
          <div className="center">
            {_.map((val, c) => {
              return (
                <div
                  key={val.key}
                  className={`center ${Animation[r % 10]}`}
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    width: 30,
                    height: 30,
                    animationDelay: `${
                      (_.length * r + c) /
                      (total / (_.length * _.length > 500 ? 5 : 3))
                    }s`,
                    backgroundColor: val.color,
                    border: `${
                      val.color === inactive ? "1px dotted black" : ""
                    }`,
                  }}
                >
                  {symboles[val.symbol]}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GetPattern;
