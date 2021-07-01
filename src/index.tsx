import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Square = (props: { value: number }) => {
  return <button className="square">{props.value}</button>;
};

const Board = () => {
  const status = "Next player: X";

  const renderSquare = (i: number) => {
    return <Square value={i} />;
  };

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
      </div>
      <div className="board-row">
        {renderSquare(7)}
        {renderSquare(8)}
        {renderSquare(9)}
      </div>
    </div>
  );
};

const Game = () => {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>
          {
            // status
          }
        </div>
        <ol>{/* todo */}</ol>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
