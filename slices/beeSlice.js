import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const makeHive = createAsyncThunk(
  'beeSlice/makeHive',
  async (args, thunkAPI) => {
    console.log('args ' + JSON.stringify(args, null, 2));
    try {
      console.log('call transaction');
    } catch (error) {
      console.error('Error calling transaction:', error);
    }
  },
);

const beeSlice = createSlice({
  name: 'beeSlice',
  initialState: {
    beeHiveAddress: undefined,
    makeHiveCall: 'idle',
  },
  reducers: {
    setBeeHiveAddress(state, action) {
      state.beeHiveAddress = action.payload;
    },
  },
  extraReducers: {
    [makeHive.pending]: (state, action) => {},
    [makeHive.fulfilled]: (state, action) => {
      console.log('action.payload ' + JSON.stringify(action.payload, null, 2));
    },
    [makeHive.rejected]: (state, action) => {},
  },
});

export const {setBeeHiveAddress} = beeSlice.actions;

export default beeSlice;
