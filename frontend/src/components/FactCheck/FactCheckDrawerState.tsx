import React, { Dispatch, SetStateAction, useContext, useState } from 'react';

export interface DrawerState {
  suggestedKeyWords: Array<string>;
  open: boolean;
}

export const GlobalDrawerContext = React.createContext({
  state: {} as DrawerState,
  setState: {} as Dispatch<SetStateAction<DrawerState>>,
});

export const DrawerStateProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: DrawerState;
}) => {
  const [state, setState] = useState(value);
  return (
    <GlobalDrawerContext.Provider value={{ state, setState }}>
      {children}
    </GlobalDrawerContext.Provider>
  );
};

export const useDrawerState = () => {
  const context = useContext(GlobalDrawerContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateContext');
  }
  return context;
};
