import { useState } from "react";
import Modal from "react-modal";
import { inactive } from "../../utils";

import { ArrayBarProps } from "../../_types";

interface ArrayElementModalProps {
  isOpen: boolean;
  closeModal: () => void;
  data: ArrayBarProps[];
  maxNumber: number;
  operation: string;
  dataReturn: (element: ArrayBarProps, type: string, position?: number) => void;
}
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ArrayElementModal = (props: ArrayElementModalProps) => {
  const { isOpen, closeModal, data, maxNumber, operation, dataReturn } = props;

  const [element, setElement] = useState<number>(-1);
  const [position, setPosition] = useState<number>(-1);

  const updateDataToModify = () => {
    dataReturn({ number: element, color: inactive }, operation, position);
    closeModal();
  };
  const handleClickElement = (data: ArrayBarProps) => {
    dataReturn(data, operation);
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
    >
      <button onClick={closeModal}>Close</button>
      {/* <h2>Add new Element</h2> */}
      <div>
        <h3>Array</h3>
        {operation === "search" ? <h2>Select a item to be found</h2> : null}
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {data.map((item) => (
            <span
              key={item.number}
              onClick={() => handleClickElement(item)}
              style={{
                border: "1px solid black",
                margin: "3px",
                padding: "3px",
                cursor: "pointer",
              }}
            >
              {item.number}
            </span>
          ))}
        </div>
      </div>
      {/* <div>
        <h3>Enter Element</h3>
        <input
          type="number"
          min={1}
          max={maxNumber}
          value={element}
          onChange={(e) => setElement(() => parseInt(e.target.value))}
        />
        <span>{`Enter element between ${0} - ${maxNumber}`}</span>
      </div>
      <div>
        <h3>Enter Position</h3>
        <input
          type="number"
          min={0}
          max={data.length}
          value={position}
          onChange={(e) => setPosition(() => parseInt(e.target.value))}
        />
        <span>{`Enter position between ${0} - ${data.length}`}</span>
      </div> */}
      {/* <div>
        <button onClick={updateDataToModify}>Done</button>
      </div> */}
    </Modal>
  );
};

export default ArrayElementModal;
