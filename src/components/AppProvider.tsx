import React, { createContext, Dispatch, ReactNode, useReducer } from 'react';
import { guestReducer, initialState } from '../reducers';
import { RsvpData } from './Interfaces';

const AppContext = createContext<{ state: RsvpData, dispatch: Dispatch<any> }>({
  state: initialState,
  dispatch: () => ({}),
});

const AppProvider = ({ children }: ({children: ReactNode})) => {
  const [state, dispatch] = useReducer(guestReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };