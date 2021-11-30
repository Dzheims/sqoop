import React, { Dispatch, SetStateAction, useContext, useState } from 'react';

export interface CollectionsListState {
  collectionId: number;
}

export const CollectionsListContext = React.createContext({
  collectionListState: {} as CollectionsListState,
  collectionListSetState: {} as Dispatch<SetStateAction<CollectionsListState>>,
});

export const CollectionsListStateProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: CollectionsListState;
}) => {
  const [collectionListState, collectionListSetState] = useState(value);
  return (
    <CollectionsListContext.Provider
      value={{ collectionListState, collectionListSetState }}
    >
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
