const wait = (timer: number) => new Promise((res) => setTimeout(res, timer));
const active = "#808080",
  done = "#00ff00",
  selected = "#0000ff",
  inactive = "#00E7FF",
  swapped = "#ff0000";

const LLTypes: string[] = ["SLL", "SCLL", "DLL", "DCLL"];
const CARD_DATA = [
  {
    name: "Arrays",
    operation: ["Searching", "Sorting"],
    link: "/array",
  },
  {
    name: "Linked List",
    operation: ["create"],
    link: "/linkedList",
  },
  {
    name: "Matrix/Grid",
    operation: ["create"],
    link: "/matrix",
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
export {
  wait,
  active,
  done,
  inactive,
  selected,
  swapped,
  LLTypes,
  Animation,
  CARD_DATA,
  Shape,
};
