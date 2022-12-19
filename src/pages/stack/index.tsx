import React, { useState } from "react";

const DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Stack = () => {
  const [size, setSize] = useState<number>(10);
  const [maxSize, setMaxSize] = useState<number>(20);
  const [btnState, setBtnState] = useState<boolean>(false);
  const [dataSet, setDataSet] = useState(() => DATA);

  const handleSizeChange = (e: any) => setSize(() => parseInt(e.target.value));

  const data = new Array(11).fill(123);

  const handlePushOperation = () =>
    setDataSet((prev) => [...prev, Math.round(Math.random() * 123)]);

  const handlePopOperation = () => {
    let val = [...dataSet];
    val.pop();
    setDataSet(() => [...val]);
  };

  return (
    <div className="center col">
      <div className="center">
        {/* <p>size</p>
        <input
          disabled={btnState}
          type="range"
          min={1}
          max={maxSize}
          step={1}
          value={size}
          onChange={handleSizeChange}
        /> */}
        <div className="center" style={{ padding: 10 }}>
          <button className="btn" onClick={handlePopOperation}>
            pop
          </button>
          <button className="btn" onClick={handlePushOperation}>
            push
          </button>
          <p>Size - {dataSet.length}</p>
        </div>
      </div>
      <div
        className="center"
        style={{
          minHeight: "600px",
          padding: "0 10px",
        }}
      >
        <div
          style={{
            border: "3px solid black",
            padding: "5px",
            borderTop: "none",
            display: "flex",
            flexDirection: "column-reverse",
            minHeight: 400,
            minWidth: "50px",
          }}
        >
          {dataSet.map((_, index) => {
            return (
              <>
                <div
                  key={index}
                  className="center slide-down"
                  style={{
                    width: 50,
                    height: 20,
                    border: "1px dotted black",
                    marginTop: "1px",
                    position: "relative",
                  }}
                >
                  {_}
                  {index === dataSet.length - 1 ? (
                    <div
                      style={{
                        position: "absolute",
                        right: 50,
                        fontSize: 20,
                        fontWeight: "bolder",
                        height: 25,
                        width: 140,
                      }}
                    >{`Top <-----------`}</div>
                  ) : null}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Stack;
