import React from 'react';
import {Provider} from 'react-redux';
import {store} from '../store/store.js';
// web3js is not entirely compatible with RN
import './utils/base64';

import {SafeAreaProvider} from 'react-native-safe-area-context';

import {PolygonAccountProvider} from './context/polygon.provider';
import {GnosisAccountProvider} from './context/gnosis.provider';
import {NavigationRoot} from './navigation';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <GnosisAccountProvider>
          <PolygonAccountProvider>
            <NavigationRoot />
          </PolygonAccountProvider>
        </GnosisAccountProvider>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
