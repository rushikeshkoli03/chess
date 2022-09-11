import React, { useState, useEffect } from "react";
import Block from "./Block";
import update from "react-addons-update";

function Chessboard() {
  const [knightPosition, setKnightPosition] = useState({ location: 10 });
  const [squares, setSquares] = useState<ISquare[]>([]);
  const [rows, setRows] = useState<ISquare[][]>([]);
  const [moveInProgress, setMoveInProgress] = useState(false);
  const [validMoves, setValidMoves] = useState<number[] | null>();

  function initBoard() {
    const squares: ISquare[] = [];
    const rows: ISquare[][] = [];
    const colNames: string[] = ["a", "b", "c", "d", "e", "f", "g", "h"];

    for (let i = 0; i < 8; i++) {
      rows[i] = [];
    }

    for (let counter = 0, i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let square = {
          index: counter,
          chessId: String(colNames[j] + (8 - i)),
          row: i,
          col: j,
          piece: null,
        };
        squares[counter] = square;
        rows[i][j] = square;
        counter++;
      }
    }

    squares[10].piece = {
      location: 10,
      type: "Knight",
    };

    setRows(rows);
    setSquares(squares);
  }

  useEffect(() => {
    initBoard();
  }, []);

  const completeMove = (index: number) => {
    console.log(index);
    console.log(knightPosition.location);
    let source = squares[knightPosition.location];
    source.piece = null;
    let destination = squares[index];
    destination.piece = { location: index, type: "Knight" };
    setKnightPosition({ location: index });
    setMoveInProgress(false);
    setValidMoves(null);
    setSquares(update(squares, { [source.index]: { $set: source } }));
    setSquares(update(squares, { [destination.index]: { $set: destination } }));
  };

  const cancelMove = () => {
    setMoveInProgress(false);
    setValidMoves(null);
  };

  const handleMove = (index: number) => {
    const target = squares[index];
    if (moveInProgress) {
      if (!validMoves?.includes(target.index)) {
        cancelMove();
        return; // cancel move
      } else {
        completeMove(index);
        return; //complete move
      }
    } else {
      if (!target.piece) return;
      let validMoves = determineValidMoves(target, rows);
      console.log(validMoves);
      if (!validMoves.length) {
        return;
      } else {
        setMoveInProgress(true);
        setValidMoves(validMoves);
      }
    }
  };

  const determineValidMoves = (start: ISquare, rows: ISquare[][]): number[] => {
    let validMoves: number[] = [];
    let possibleMoves = [];

    if (rows[start.row + 1]) {
      possibleMoves.push(rows[start.row + 1][start.col + 2]);
      possibleMoves.push(rows[start.row + 1][start.col - 2]);
    }
    if (rows[start.row - 1]) {
      possibleMoves.push(rows[start.row - 1][start.col + 2]);
      possibleMoves.push(rows[start.row - 1][start.col - 2]);
    }
    if (rows[start.row + 2]) {
      possibleMoves.push(rows[start.row + 2][start.col + 1]);
      possibleMoves.push(rows[start.row + 2][start.col - 1]);
    }
    if (rows[start.row - 2]) {
      possibleMoves.push(rows[start.row - 2][start.col + 1]);
      possibleMoves.push(rows[start.row - 2][start.col - 1]);
    }

    for (let move of possibleMoves) {
      if (move) addMove(move);
    }

    function addMove(target: ISquare) {
      validMoves.push(target.index);
    }

    return validMoves;
  };

  return (
    <div className="chessboard">
      {[...squares].map((square: ISquare, index: number) => {
        return (
          <Block
            key={index}
            index={index}
            blockName={square.chessId}
            color={
              Math.floor(index / 8) % 2
                ? index % 2
                  ? "white"
                  : "black"
                : index % 2
                ? "black"
                : "white"
            }
            piece={square.piece}
            handleMove={handleMove}
            isHighlight={moveInProgress && validMoves?.includes(index)}
          />
        );
      })}
    </div>
  );
}

export default Chessboard;

interface ISquare {
  index: number;
  chessId: string;
  row: number;
  col: number;
  piece: IPiece | null;
}

interface IPiece {
  location: number;
  type: string;
}
