import {CardTypes} from './useConfig';
import Hexagon from '../../assets/images/hexagon.svg';
import HexagonImage from '../../assets/images/hive-hexagon.svg';

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
  const state: State = {
    [CardTypes.hive]: {
      title: 'Hi, Bee!',
      description: 'Keep moving!',
      mainImage: Hexagon,
    },
    [CardTypes.makeHive]: {
      title: 'Get social!',
      description: 'Start a hive!',
      mainImage: HexagonImage,
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
