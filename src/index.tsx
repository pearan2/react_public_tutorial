import { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

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

const Board = () => {
  const [boardState, setBoardState] = useState(
    Array<string | null>(9).fill(null)
  );
  const handleClick = (i: number) => {
    console.log("handleclicked called!");
    setSquares(prev => {
      const next = prev.slice(); // prev 의 불변을 위해 복사함
      next[i] = "X"; // 복사한결 변경함
      return next; // 변경된 것으로 prev 를 대체함
      // 도대체 왜 이런 짓을 하는걸까? 그냥
      // prev[i] = "X" 로 해도 되는데?

      // 불변성은 복잡한 특징들을 구현하기 쉽게 만듭니다.
      // 1. 직접적인 데이터변이를 피하는 것은 이전버전의 게임이력(squres) 를 유지하고 나중에 재사용 할수 있게 만듭니다.
      // 2. 객체가 직접적으로 수정되기 때문에 복제가 가능한 객체에서 변화를 감지하는 것은 어렵습니다.
      //    감지는 복제가 가능한 객체를 이전 사본과 비교하고, 전체 객체 트리를 돌아야 합니다.
      //    불변 객체에서 변화를 감지하는 것은 상당히 쉽습니다. 참조하고 있는 불변객체가 이전 객체와 다르다면 객체는 변한 것입니다.

      // 불변성의 가장 큰 장점은 React에서 순수컴포넌트를 만드는데 도움을 준다는 것입니다.
      // 변하지 않는 데이터는 변경이 이루어졌는지 쉽게 판단 할 수 있으며 이를 바탕으로 컴포넌트가 다시 렌더링 할지를 결정할 수 있습니다.
    });
  };

  const status = "Next player: X";

  const renderSquare = (i: number) => {
    return <Square value={squares[i]} handleClick={() => handleClick(i)} />;
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
