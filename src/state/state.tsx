import React, { useReducer } from 'react';
import { CodeRequest } from '../types';
import { Action } from './reducer';

export type State = {
  token: string | undefined,
  uid: string | undefined,
  request: CodeRequest | undefined
}

const initialState: State = {
  token: undefined,
  uid: undefined,
  request: undefined
};

// https://reactjs.org/docs/context.html#api
export const AppContext = React.createContext<[State, React.Dispatch<Action>]>([initialState, () => initialState]);

export function AppStateProvider({ reducer, children }: { reducer: React.Reducer<State, Action>, children: React.ReactElement }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
}

// https://reactjs.org/docs/hooks-reference.html#usecontext
// export const value = useContext(AppContext);
