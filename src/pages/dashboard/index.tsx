import { useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const CARD_DATA = [
  {
    name: "Arrays",
    operation: ["Searching", "Sorting"],
    link: "/array",
  },
  {
    name: "Linked List",
    operation: [],
    link: "",
  },
  {
    name: "Matrix/Grid",
    operation: [],
    link: "",
  },
  {
    name: "Stack",
    operation: [],
    link: "",
  },
  {
    name: "Queue",
    operation: [],
    link: "",
  },
  {
    name: "Graph",
    operation: [],
    link: "",
  },
  {
    name: "Other Tree",
    operation: [],
    link: "",
  },
  {
    name: "Recursion",
    operation: [],
    link: "",
  },
  {
    name: "Searching Algorithm",
    operation: [],
    link: "",
  },
  {
    name: "Sorting Algorithm",
    operation: [],
    link: "",
  },
  {
    name: "Divide and Conquer Algorithm",
    operation: [],
    link: "",
  },
  {
    name: "Greedy Mehtodology",
    operation: [],
    link: "",
  },
  {
    name: "Backtracking Algorithm",
    operation: [],
    link: "",
  },
  {
    name: "Dynamic Programming",
    operation: [],
    link: "",
  },
  {
    name: "Pattern Searching",
    operation: [],
    link: "",
  },
  {
    name: "Mathematical Algorithms",
    operation: [],
    link: "",
  },
  {
    name: "Geometric Algorithms",
    operation: [],
    link: "",
  },
  {
    name: "Bitwise Algorithms",
    operation: [],
    link: "",
  },
  {
    name: "Randomized Algorithms",
    operation: [],
    link: "",
  },
  {
    name: "Branch and Bound Algorithm",
    operation: [],
    link: "",
  },
];
const Shape: string[] = [
  "nine-c",
  "nine-c",
  "eight-c",
  "eight-c",
  "seven-c",
  "seven-c",
  "six-c",
  "five-c",
  "four-c",
  "three-c",
];

const Animation: string[] = [
  "slide-up",
  "slide-down",
  "slide-in-left",
  "slide-in-right",
  "slide-in-right",
  "flip-in-x",
  "flip-in-x",
  "fade-in",
  "pop-in",
  "pop-in",
];

const Dashboard = () => {
  return (
    <div>
      <div className="around wrap">
        {CARD_DATA.map((item) => (
          <div
            key={item.name}
            className={`${
              item.operation.length > 0 ? "between" : "center"
            } card-wrapper col ${
              Animation[parseInt(JSON.stringify(Math.random() * 10))]
            } ${Shape[parseInt(JSON.stringify(Math.random() * 10))]}`}
          >
            <div className="card-header">
              <h2>{item.name}</h2>
            </div>
            <div className="card-body">
              {item.operation.length ? (
                <ul>
                  {item.operation.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p style={{ fontSize: "10px" }}>Coming soon...</p>
              )}
            </div>
            {item.operation.length ? (
              <div className="card-footer">
                <Link className="link-btn" to={item.link}>
                  Play
                </Link>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
