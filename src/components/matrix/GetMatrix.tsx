import { Animation } from "../../utils";

interface MatrixProps {
  total: number;
  data: any[][];
}

const GetMatrix = (props: MatrixProps) => {
  const { data, total } = props;

  if (data.length < 1) return <p>Increase row or column</p>;
  return (
    <div
      className={` ${Animation[parseInt(JSON.stringify(Math.random() * 10))]}`}
      style={{
        maxHeight: "600px",
        overflow: "hidden",
        border: "1px solid black",
      }}
    >
      {data.map((_, r) => (
        <div key={`${r}`} className="center col">
          <div className="center">
            {_.map((val, c) => {
              return (
                <div
                  key={`${r}${c}`}
                  className={` center
                   ${Animation[parseInt(JSON.stringify(Math.random() * 10))]} `}
                  style={{
                    border: ".5px solid rgb(185, 172, 172)",
                    fontSize: "12px",
                    width: 30,
                    height: 30,
                    animationDelay: `${
                      (_.length * r + c) /
                      (total / (_.length * val.length > 500 ? 5 : 3))
                    }s`,
                    backgroundColor: val.color,
                  }}
                >
                  {val.number}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GetMatrix;
