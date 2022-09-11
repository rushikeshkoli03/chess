import React from "react";
import Knight from "./Knight";

function Block(props: IProps) {
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

interface IProps {
  index: number;
  blockName: string;
  color: "white" | "black";
  piece: IPiece | null;
  handleMove: (arg0: number) => void;
  isHighlight: boolean | undefined;
}

interface IPiece {
  location: number;
  type: string;
}
