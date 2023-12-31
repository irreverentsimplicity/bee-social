import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
// import Lottie from 'lottie-react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {Button} from '../components/button';
import {SafeArea} from '../components/safeArea';
import * as secureStore from '../libs/secureStore';
import {RootStackParamList} from '../navigation';
//import StarterAnimation from '../../assets/starter-animation.json';
import {useAccountState} from '../hooks/useAccountState';
import Logo from '../../assets/images/bee-logo.png';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

export const LoginScreen: React.FunctionComponent<Props> = ({navigation}) => {
  const {loadWallet} = useAccountState();

  const onLogin = async () => {
    try {
      const walletKey = await secureStore.loadData();

      if (walletKey) {
        loadWallet(walletKey.password);
      } else {
        // recover your wallet based on the mnemonics
        // or create a new one
        navigation.navigate('RestoreWallet');
      }
    } catch (error) {
      console.log('onLogin#error', (error as Error).message);
    }
  };

  return (
    <SafeArea>
      <View style={styles.container}>
        <View style={styles.animationView}>
          {/*<Lottie source={StarterAnimation} autoPlay loop />*/}
          <Image source={Logo} style={styles.logo} />
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={onLogin}>Login</Button>
          <Button
            type="secondary"
            onPress={() => navigation.navigate('CreateHive')}>
            Get Hive
          </Button>
        </View>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  animationView: {
    flexGrow: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    gap: 12,
  },
  logo: {
    width: 300,
    height: 300,
  },
});
