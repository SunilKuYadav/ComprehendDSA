import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./Binary.css";

class Node<T> {
  data: T;
  left: Node<T> | null;
  right: Node<T> | null;
  key: string;
  constructor(val: T) {
    this.data = val;
    this.left = null;
    this.right = null;
    this.key = uuidv4();
  }
}

const BinaryTree = () => {
  return (
    <div className="center" style={{ minHeight: "600px" }}>
      <div className="tree">
        <ul>
          <li>
            <a href="#">1</a>
            <ul>
              <li>
                <a href="#">2</a>
                <ul>
                  <li>
                    <a href="#">2.1</a>
                  </li>
                  <li>
                    <a href="#">2.2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">3</a>
                <ul>
                  <ul>
                    <li>
                      <a href="#">3.1</a>
                    </li>
                    <li>
                      <a href="#">3.2</a>
                    </li>
                  </ul>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BinaryTree;

// // by lavel
// const DrawBinaryTree = (props: { data: Node<number> }) => {
//   const [dataSet, setDataSet] = useState<any[]>([[]]);

//   /* function to print level order traversal of tree */
//   function printLevelOrder(root: Node<number> | null) {
//     const h = height(root);
//     let i;
//     const twoDarr = new Array(h - 1).map((_, index) => new Array(2 ** index));

//     for (i = 1; i <= h; i++) {
//       let d: any[] = [];
//       printCurrentLevel(root, i, d);
//       // if (d.length !== 2 ** (i - 1)) {
//       //   for (let k = 0; k < 2 ** (i - 1) - d.length; k++) {
//       //     d.push({ data: null, left: true, right: true, key: uuidv4() });
//       //   }
//       // }
//       twoDarr[i] = d;
//     }
//     console.log(twoDarr);
//     setDataSet(() => twoDarr);
//   }
//   /* Print nodes at the current level */
//   function printCurrentLevel(
//     root: Node<number> | null,
//     level: number,
//     d: any[]
//   ) {
//     if (root == null) return;
//     if (level == 1) {
//       d.push({
//         key: root.key,
//         data: root.data,
//         left: root.left !== null,
//         right: root.right !== null,
//         level,
//       });
//     } else if (level > 1) {
//       printCurrentLevel(root.left, level - 1, d);
//       printCurrentLevel(root.right, level - 1, d);
//     }
//   }
//   function height(root: Node<number> | null) {
//     if (root == null) return 0;
//     else {
//       /* compute height of each subtree */
//       const lheight: number = height(root.left);
//       const rheight: number = height(root.right);

//       /* use the larger one */
//       if (lheight > rheight) return lheight + 1;
//       else return rheight + 1;
//     }
//   }

//   useEffect(() => {
//     printLevelOrder(props.data);
//   }, []);
//   return (
//     <div>
//       <div>
//         {dataSet?.map((item, i) => {
//           return item.length < 1 ? null : (
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-around",
//                 width: 30 * 2 ** (dataSet.length - 1),
//               }}
//             >
//               {item.map((node: any) => {
//                 return (
//                   <NodeRepresent
//                     key={node.key}
//                     data={node.data}
//                     left={node.left}
//                     right={node.right}
//                     widthDivider={i}
//                     totaleWidth={30 * 2 ** (dataSet.length - 1)}
//                   />
//                 );
//               })}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// const NodeRepresent = (props: {
//   data: number;
//   left: boolean;
//   right: boolean;
//   widthDivider: number;
//   totaleWidth: number;
// }) => {
//   return (
//     <div
//       style={{
//         width: 30,
//         height: 40,
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//       }}
//     >
//       {props.data !== null ? (
//         <div
//           className="center"
//           style={{
//             width: 30,
//             height: 30,
//             border: "1px solid red",
//             borderRadius: "50%",
//             fontSize: 20,
//           }}
//         >
//           {props.data}
//         </div>
//       ) : (
//         <div
//           className="center"
//           style={{
//             width: 30,
//             height: 30,
//             borderRadius: "50%",
//             fontSize: 20,
//           }}
//         >
//           Nulls
//         </div>
//       )}
//       {props.data !== null ? (
//         <>
//           <div
//             style={{ height: "10px", width: "5px", backgroundColor: "grey" }}
//           />
//           <div
//             style={{
//               display: "flex",
//               width: props.totaleWidth / props.widthDivider / 2 - 15,
//             }}
//           >
//             {props.left && (
//               <div style={{ display: "flex", position: "relative" }}>
//                 <div
//                   style={{
//                     height: "10px",
//                     width: "5px",
//                     backgroundColor: "grey",
//                   }}
//                 />
//                 <div
//                   style={{
//                     height: "5px",
//                     width: props.totaleWidth / props.widthDivider / 4 - 7.5,
//                     backgroundColor: "grey",
//                   }}
//                 />
//                 {/* {!props.left && (
//                 <p style={{ position: "absolute", top: 10, left: -5 }}>Null</p>
//               )} */}
//               </div>
//             )}
//             {props.right && (
//               <div style={{ display: "flex", position: "relative" }}>
//                 <div
//                   style={{
//                     height: "5px",
//                     width: props.totaleWidth / props.widthDivider / 4 - 7.5,
//                     backgroundColor: "grey",
//                   }}
//                 />
//                 <div
//                   style={{
//                     height: "10px",
//                     width: "5px",
//                     backgroundColor: "grey",
//                   }}
//                 />
//                 {/* {!props.right && (
//                 <p
//                   style={{
//                     position: "absolute",
//                     top: 10,
//                     left: props.totaleWidth / props.widthDivider / 4 - 15,
//                   }}
//                 >
//                   Null
//                 </p>
//               )} */}
//               </div>
//             )}
//           </div>
//         </>
//       ) : null}
//     </div>
//   );
// };
