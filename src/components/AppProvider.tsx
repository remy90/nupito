import React, { createContext, useReducer } from 'react';
import { guestReducer, initialState } from '../reducers';

const AppContext = createContext<{ state: any; dispatch: any; }>({
  state: initialState,
  dispatch: () => null
});

const AppProvider: React.FC = ({ children }: any) => {
  const [state, dispatch] = useReducer(guestReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };