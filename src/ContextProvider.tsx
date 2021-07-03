import { createContext, useState } from "react";
import Counter from "./Counter";

export const MyContext = createContext<ContextProviderStateType>({
  state: {},
  setState: () => {},
});

interface ContextProviderPropsType {
  children: React.ReactNode;
}

export interface StateType {
  [key: string]: any;
}

interface ContextProviderStateType {
  state: StateType;
  setState: (arg0: any) => any;
}

const ContextProvider = (props: ContextProviderPropsType) => {
  const [state, setState] = useState<StateType>({});
  state.p1 = "asdf";

  return (
    <MyContext.Provider value={{ state, setState }}>
      {props.children}
    </MyContext.Provider>
  );
};

export default ContextProvider;
