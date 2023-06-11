import {configureStore, combineReducers} from '@reduxjs/toolkit';

import beeSlice from '../slices/beeSlice.js';

const combinedReducer = combineReducers({
  beeSlice: beeSlice.reducer,
});

const rootReducer = (state, action) => {
  //console.warn("action.type " + action.type)
  //if (action.type === 'user/logoutReset/fulfilled') {
  //  state = initialState;
  //}
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
