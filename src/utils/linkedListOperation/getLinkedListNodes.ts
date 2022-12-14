import { v4 as uuidv4 } from "uuid";
import { LLProps } from "../../_types";
import { LLTypes } from "../utils";

const getLL = (count: number, unique: boolean, type: string): LLProps[] => {
  // create data set
  let tempDataSet: any[] = [];
  let data = Math.floor(Math.random() * 123) + 1;
  if (unique) {
    while (tempDataSet.length < count) {
      tempDataSet.indexOf(data) === -1 && tempDataSet.push(data);
      data = Math.floor(Math.random() * 123) + 1;
    }
  } else {
    for (let i = 0; i < count; i++) {
      tempDataSet.push(data);
      data = Math.floor(Math.random() * 123) + 1;
    }
  }
  if (type === LLTypes[0]) {
    return tempDataSet.map((_, index) => {
      if (index === 0) {
        if (count === 1) {
          return {
            second: index + 1,
            value: _,
            next: true,
            key: uuidv4(),
            head: true,
            prev: false,
            circular: false,
            tail: false,
            only: true,
          };
        }
        return {
          second: index + 1,
          value: _,
          next: true,
          key: uuidv4(),
          head: true,
          prev: false,
          circular: false,
          tail: false,
        };
      }
      if (index === count - 1) {
        return {
          second: index + 1,
          value: _,
          next: true,
          key: uuidv4(),
          head: false,
          prev: false,
          circular: false,
          tail: true,
        };
      }
      return {
        second: index + 1,
        value: _,
        next: true,
        key: uuidv4(),
        head: false,
        prev: false,
        circular: false,
        tail: false,
      };
    });
  }
  if (type === LLTypes[1]) {
    return tempDataSet.map((_, index) => {
      if (index === 0) {
        if (count === 1) {
          return {
            second: index + 1,
            value: _,
            next: true,
            key: uuidv4(),
            head: true,
            prev: false,
            circular: true,
            tail: false,
            only: true,
          };
        }
        return {
          second: index + 1,
          value: _,
          next: true,
          key: uuidv4(),
          head: true,
          prev: false,
          circular: true,
          tail: false,
        };
      }
      if (index === count - 1) {
        return {
          second: index + 1,
          value: _,
          next: true,
          key: uuidv4(),
          head: false,
          prev: false,
          circular: true,
          tail: true,
        };
      }
      return {
        second: index + 1,
        value: _,
        next: true,
        key: uuidv4(),
        head: false,
        prev: false,
        circular: true,
        tail: false,
      };
    });
  }
  if (type === LLTypes[2]) {
    return tempDataSet.map((_, index) => {
      if (index === 0) {
        if (count === 1) {
          return {
            second: index + 1,
            value: _,
            next: true,
            key: uuidv4(),
            head: true,
            prev: true,
            circular: false,
            tail: false,
            only: true,
          };
        }
        return {
          second: index + 1,
          value: _,
          next: true,
          key: uuidv4(),
          head: true,
          prev: true,
          circular: false,
          tail: false,
        };
      }
      if (index === count - 1) {
        return {
          second: index + 1,
          value: _,
          next: true,
          key: uuidv4(),
          head: false,
          prev: true,
          circular: false,
          tail: true,
        };
      }
      return {
        second: index + 1,
        value: _,
        next: true,
        key: uuidv4(),
        head: false,
        prev: true,
        circular: false,
        tail: false,
      };
    });
  }
  if (type === LLTypes[3]) {
    return tempDataSet.map((_, index) => {
      if (index === 0) {
        if (count === 1) {
          return {
            second: index + 1,
            value: _,
            next: true,
            key: uuidv4(),
            head: true,
            prev: true,
            circular: true,
            tail: false,
            only: true,
          };
        }
        return {
          second: index + 1,
          value: _,
          next: true,
          key: uuidv4(),
          head: true,
          prev: true,
          circular: true,
          tail: false,
        };
      }
      if (index === count - 1) {
        return {
          second: index + 1,
          value: _,
          next: true,
          key: uuidv4(),
          head: false,
          prev: true,
          circular: true,
          tail: true,
        };
      }
      return {
        second: index + 1,
        value: _,
        next: true,
        key: uuidv4(),
        head: false,
        prev: true,
        circular: true,
        tail: false,
      };
    });
  }
  return [];
};

export { getLL };
