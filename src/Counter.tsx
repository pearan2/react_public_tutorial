import { type } from "os";
import { createContext, useContext, useReducer, useState } from "react";
import { MyContext, StateType } from "./ContextProvider";

interface CounterStateType {
  value: number;
}

enum ActionTypeEnum {
  CHANGE,
}

interface ActionType {
  type: ActionTypeEnum;
  amountOfChange: number;
}

const counterReducer = (
  prev: CounterStateType,
  action: ActionType
): CounterStateType => {
  switch (action.type) {
    case ActionTypeEnum.CHANGE: {
      return { value: prev.value + action.amountOfChange };
    }
    default:
      throw new Error("unhandled!");
  }
};

const Counter = () => {
  const context = useContext(MyContext);

  const initialState: CounterStateType = {
    value: 0,
  };
  const [state, dispatch] = useReducer(counterReducer, initialState);

  const decreaseAction: ActionType = {
    type: ActionTypeEnum.CHANGE,
    amountOfChange: -1,
  };

  const increaseAction: ActionType = {
    type: ActionTypeEnum.CHANGE,
    amountOfChange: +1,
  };

  const tempOnClick = () => {
    console.log(context.state);
    context.setState((prev: StateType) => {
      console.log(prev.hello);
      return { ...prev, fdf: 123 };
    });
  };

  return (
    <div>
      <p>{state.value}</p>
      <button
        onClick={() => {
          dispatch(decreaseAction);
        }}
      >
        -
      </button>
      <button
        onClick={() => {
          dispatch(increaseAction);
        }}
      >
        +
      </button>
      <button onClick={tempOnClick}>setState</button>
    </div>
  );
};
export default Counter;
