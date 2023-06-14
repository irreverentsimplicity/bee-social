import React from 'react';

// web3js is not entirely compatible with RN
import './utils/base64';

import {SafeAreaProvider} from 'react-native-safe-area-context';

import {PolygonAccountProvider} from './context/polygon.provider';
import {GnosisAccountProvider} from './context/gnosis.provider';
import {NavigationRoot} from './navigation';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <GnosisAccountProvider>
        <PolygonAccountProvider>
          <NavigationRoot />
        </PolygonAccountProvider>
      </GnosisAccountProvider>
    </SafeAreaProvider>
  );
}

export default App;
