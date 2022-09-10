import React from "react";
import Knight from "./Knight";

function Block(props: any) {
  let { piece, index, blockName, handleMove, color, isHighlight } = props;
  return (
    <div
      className={`block ${blockName} ${color} ${
        isHighlight && "highlight-border"
      }`}
      onClick={() => handleMove(index)}
    >
      <div className="square-meta">
        <span className="chess-id">{blockName}</span>
      </div>
      {piece && <Knight />}
    </div>
  );
}

export default Block;
