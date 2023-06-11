// store/reducers/index.js
import {combineReducers} from 'redux';
import beeSlice from './beeSlice';

const rootReducer = combineReducers({
  beeSlice: beeSlice,
});

export default rootReducer;
