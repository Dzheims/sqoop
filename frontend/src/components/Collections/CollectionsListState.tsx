import React, { Dispatch, SetStateAction, useContext, useState } from 'react';

export interface CollectionsListState {
  collectionId: number;
}

export const CollectionsListContext = React.createContext({
  state: {} as CollectionsListState,
  setState: {} as Dispatch<SetStateAction<CollectionsListState>>,
});

export const CollectionsListStateProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: CollectionsListState;
}) => {
  const [state, setState] = useState(value);
  return (
    <CollectionsListContext.Provider value={{ state, setState }}>
      {children}
    </CollectionsListContext.Provider>
  );
};

export const useCollectionsListState = () => {
  const context = useContext(CollectionsListContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateContext');
  }
  return context;
};
