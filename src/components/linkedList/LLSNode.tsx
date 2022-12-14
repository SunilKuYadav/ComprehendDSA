import { LLProps } from "../../_types";
import "./LLNode.css";

const LLSNode = (props: LLProps) => {
  const { next, value, circular, prev, head, tail, only } = props;
  const second = props.second / 3;

  return (
    <div
      className="ll-node-wrapper slide-in-left"
      style={{
        animationDelay: `${(second + 3) / 10 + second / 2}s`,
      }}
    >
      {/* handle base condition for head */}
      {circular && head && prev && !only && (
        <>
          <div className="box bold">tail</div>
          <div
            className="ll-pointer-right"
            style={{
              animationDelay: `${(second + 1) / 10 + second / 2}s`,
            }}
          />
        </>
      )}
      {/* show text head or tail on head or tail node */}
      <div className={`ll-node-value center ${(head || tail) && "bold"}`}>
        {(head || tail) && (
          <div style={{ position: "absolute", bottom: 40 }}>
            {head && "Head"}
            {tail && "Tail"}
          </div>
        )}
        {value}
      </div>
      {/* handle pointer to next node */}
      {next && !tail && !only ? (
        <div
          className={`ll-pointer-left-wrapper slide-in-left ${
            prev ? "around col" : "center"
          }`}
        >
          <div
            className="ll-pointer-left"
            style={{
              animationDelay: `${(second + 1) / 10 + second / 2}s`,
            }}
          />
          {prev && (
            <div
              className="ll-pointer-right"
              style={{
                animationDelay: `${(second + 1) / 10 + second / 2}s`,
              }}
            />
          )}
        </div>
      ) : null}
      {/* handle circulat linkedList pointer to head */}
      {circular && tail && (
        <>
          <div
            className="ll-pointer-left"
            style={{
              animationDelay: `${(second + 1) / 10 + second / 2}s`,
            }}
          />
          <div className="box bold">head</div>
        </>
      )}
    </div>
  );
};

export default LLSNode;
