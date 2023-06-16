import React, {createContext, useContext, PropsWithChildren} from 'react';
import HexagonImage from '../../assets/images/hive-hexagon.svg';

export interface makeHiveContext {
  title: string | null;
  description: string | null;
  mainImage: Object;
}

// Ignoring missing initialValue, because there's always a provider and value is provided
//
// @ts-ignore - value is provided in index.tsx
export const makeHiveState = createContext<makeHiveContext>();

export const useMakeHiveState = () => useContext(makeHiveState);

export type makeHiveProviderProps = {
  //
};

export const makeHiveProvider = ({
  children,
}: PropsWithChildren<makeHiveProviderProps>) => {
  //const type = CardTypes.hive;
  const title = 'Get social!';
  const description = 'Make a hive!';
  const mainImage = <HexagonImage />;

  const state: makeHiveContext = {
    title,
    description,
    mainImage,
  };

  return (
    <makeHiveState.Provider value={state}>{children}</makeHiveState.Provider>
  );
};
