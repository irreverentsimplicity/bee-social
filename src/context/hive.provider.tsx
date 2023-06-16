import React, {createContext, useContext, PropsWithChildren} from 'react';
import Hexagon from '../../assets/images/hexagon.svg';

export interface hiveContext {
  title: string | null;
  description: string | null;
  mainImage: Object;
}

// Ignoring missing initialValue, because there's always a provider and value is provided
//
// @ts-ignore - value is provided in index.tsx
export const hiveState = createContext<hiveContext>();

export const useHiveState = () => useContext(hiveState);

export type hiveProviderProps = {
  //
};

export const hiveProvider = ({
  children,
}: PropsWithChildren<hiveProviderProps>) => {
  //const type = CardTypes.hive;
  const title = 'Hi, Bee!';
  const description = 'Keep moving!';
  const mainImage = <Hexagon />;

  const state: hiveContext = {
    title,
    description,
    mainImage,
  };

  return <hiveState.Provider value={state}>{children}</hiveState.Provider>;
};
