import { useState } from "react";
import ReactDOM from "react-dom";
import Counter from "./Counter";
import "./index.css";
import ContextProvider from "./ContextProvider";

interface SquarePropsType {
  value: string | null;
  handleClick: () => void;
}

const Square = (props: SquarePropsType) => {
  return (
    <button className="square" onClick={props.handleClick}>
      {props.value}
    </button>
  );
};

interface BoardPropsType {
  squares: Array<string | null>;
  handleClick: (arg0: number) => void;
}

const Board = (props: BoardPropsType) => {
  const renderSquare = (i: number) => {
    return (
      <Square
        value={props.squares[i]}
        handleClick={() => {
          props.handleClick(i);
        }}
      />
    );
  };

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

interface GameStateType {
  history: Array<Array<string | null>>;
  xIsNext: boolean;
  stepNumber: number;
}

const Game = () => {
  const [gameStatus, setGameStatus] = useState<GameStateType>({
    history: [Array<string | null>(9).fill(null)],
    xIsNext: true,
    stepNumber: 0,
  });

  const handleClick = (i: number) => {
    const nextHistory = gameStatus.history.slice(0, gameStatus.stepNumber + 1);
    const currentSquares = gameStatus.history[gameStatus.stepNumber];
    const nextSquares = currentSquares.slice(0);

    if (calculateWinner(currentSquares) || currentSquares[i]) return;
    nextSquares[i] = gameStatus.xIsNext ? "X" : "O";

    setGameStatus((prevStatus) => {
      return {
        history: nextHistory.concat([nextSquares]),
        xIsNext: !prevStatus.xIsNext,
        stepNumber: prevStatus.stepNumber + 1,
      };
    });
  };

  const calculateWinner = (squares: Array<string | null>): string | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const jumpTo = (step: number) => {
    setGameStatus((prev) => {
      return {
        ...prev,
        stepNumber: step,
        xIsNext: step % 2 === 0 ? true : false,
      };
    });
  };

  const calcStatus = (): string => {
    const currentSquares = gameStatus.history[gameStatus.history.length - 1];
    const winner = calculateWinner(currentSquares);
    if (winner) {
      return `Winner: ${winner}`;
    } else {
      return `Next Player: ${gameStatus.xIsNext ? "X" : "O"}`;
    }
  };

  const moves = gameStatus.history.map((square, idx) => {
    const desc = idx ? `Go to move #${idx}` : "Go to game start";
    return (
      <li key={idx}>
        <button onClick={() => jumpTo(idx)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={gameStatus.history[gameStatus.stepNumber]}
          handleClick={handleClick}
        />
      </div>
      <div className="game-info">
        <div>{calcStatus()}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(
  <ContextProvider>
    <Counter></Counter>
  </ContextProvider>,
  document.getElementById("root")
);
