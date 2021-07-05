import React, { createContext, useContext, useReducer } from "react";
import ReactDOM from "react-dom";
import "./index.css";

interface GameStateType {
  history: Array<Array<string | null>>;
  xIsNext: boolean;
  stepNumber: number;
}

enum ActionTypeType {
  BOARDCLICK,
  ROLLBACKCLICK
}

interface ActionType {
  type: ActionTypeType;
  data: number;
}

interface SquarePropsType {
  index: number;
  value: string | null;
}

const Square = (props: SquarePropsType) => {
  const gamedispatch = useContext(GameDispatchContext);

  const buttonOnClick = () => {
    gamedispatch({
      type: ActionTypeType.BOARDCLICK,
      data: props.index
    });
  };

  return (
    <button className="square" onClick={buttonOnClick}>
      {props.value}
    </button>
  );
};

interface BoardPropsType {
  squares: Array<string | null>;
}

const Board = (props: BoardPropsType) => {
  const renderSquare = (i: number) => {
    return <Square index={i} value={props.squares[i]} />;
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

const calculateWinner = (squares: Array<string | null>): string | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const gameReducer = (
  state: GameStateType,
  action: ActionType
): GameStateType => {
  switch (action.type) {
    case ActionTypeType.BOARDCLICK: {
      const newHistory = state.history.slice(0, state.stepNumber + 1);
      const newSquares = newHistory[newHistory.length - 1].slice();
      if (newSquares[action.data] || calculateWinner(newSquares)) return state;
      newSquares[action.data] = state.xIsNext ? "X" : "O";

      return {
        history: newHistory.concat([newSquares]),
        xIsNext: !state.xIsNext,
        stepNumber: state.stepNumber + 1
      };
    }
    case ActionTypeType.ROLLBACKCLICK: {
      return {
        ...state,
        stepNumber: action.data,
        xIsNext: action.data % 2 === 0 ? true : false
      };
    }
    default: {
      throw new Error("unhandled ActionType");
    }
  }
};

const GameDispatchContext = createContext<React.Dispatch<ActionType> | any>(
  null
);

const Game = () => {
  const gameStateTypeInit: GameStateType = {
    history: [Array<string | null>(9).fill(null)],
    xIsNext: true,
    stepNumber: 0
  };

  const [gameStatus, gameDispatch] = useReducer(gameReducer, gameStateTypeInit);

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
        <button
          onClick={() =>
            gameDispatch({ type: ActionTypeType.ROLLBACKCLICK, data: idx })
          }
        >
          {desc}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <GameDispatchContext.Provider value={gameDispatch}>
          <Board squares={gameStatus.history[gameStatus.stepNumber]} />
        </GameDispatchContext.Provider>
      </div>
      <div className="game-info">
        <div>{calcStatus()}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Game></Game>, document.getElementById("root"));
