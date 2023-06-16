import {useHiveState} from '../context/hive.provider';
import {useMakeHiveState} from '../context/makeHive.provider';
import {CardTypes} from './useConfig';

type Slice = {
  title: string | null;
  description: string | null;
  mainImage: Object;
};

type State = {
  [key: string]: Slice;
};

type UseHiveCardState = () => {
  state: State;
  getStateSlice: (key: CardTypes) => Slice;
};

export const useHiveCardState: UseHiveCardState = () => {
  const hiveState = useHiveState();
  const makeHiveState = useMakeHiveState();

  const state: State = {
    [CardTypes.hive]: {
      title: hiveState.title,
      description: hiveState.description,
      mainImage: hiveState.mainImage,
    },
    [CardTypes.makeHive]: {
      title: makeHiveState.title,
      description: makeHiveState.description,
      mainImage: makeHiveState.mainImage,
    },
  };

  const getStateSlice = (key: CardTypes): Slice => {
    return state[key];
  };

  return {
    state,
    getStateSlice,
  };
};
