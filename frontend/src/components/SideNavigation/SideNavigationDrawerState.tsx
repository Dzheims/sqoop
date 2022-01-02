import React, { Dispatch, SetStateAction, useContext, useState } from 'react';

export interface NavDrawerState {
  isOpen: boolean;
  current: string;
}

export const NavDrawerContext = React.createContext({
  drawerState: {} as NavDrawerState,
  setDrawerState: {} as Dispatch<SetStateAction<NavDrawerState>>,
});

export const NavDrawerStateProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: NavDrawerState;
}) => {
  const [drawerState, setDrawerState] = useState(value);
  return (
    <NavDrawerContext.Provider value={{ drawerState, setDrawerState }}>
      {children}
    </NavDrawerContext.Provider>
  );
};

export const useNavDrawerState = () => {
  const context = useContext(NavDrawerContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateContext');
  }
  return context;
};
