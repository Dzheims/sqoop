import React, { Dispatch, SetStateAction, useContext, useState } from 'react';

interface SuccessAlertState {
  type: string;
  feedTitle: string;
  success: boolean;
}
export const SuccessAlertContext = React.createContext({
  snackbarState: {} as SuccessAlertState,
  setSnackbarState: {} as Dispatch<SetStateAction<SuccessAlertState>>,
});

export const SuccessAlertProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: SuccessAlertState;
}) => {
  const [snackbarState, setSnackbarState] = useState(value);
  return (
    <SuccessAlertContext.Provider value={{ snackbarState, setSnackbarState }}>
      {children}
    </SuccessAlertContext.Provider>
  );
};

export const useSuccessAlertState = () => {
  const context = useContext(SuccessAlertContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateContext');
  }
  return context;
};
