import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {SafeArea} from '../components/safeArea';
import {BottomTabParamList} from '../navigation/bottomTab';
import {BROWN} from '../utils/colors';
import {Pager} from '../components/pager';
import {MakeHiveCard} from '../components/makeHiveCard';
import {useAccountState} from '../hooks/useAccountState';
import {CurrencyTypes} from '../hooks/useConfig';

type Props = {
  navigation: NativeStackNavigationProp<BottomTabParamList, 'MakeHive'>;
};

export const MakeHiveScreen: React.FunctionComponent<Props> = ({}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const {state} = useAccountState();

  const [isSendOpen, setSendOpen] = useState(false);

  const _setActiveCurrency = (active: number) => {
    setSendOpen(false);
    setSelectedIndex(active);
  };

  const data = Object.keys(state).map(acc => ({
    name: acc as CurrencyTypes,
    account: state[acc]?.account ?? null,
    balance: state[acc]?.balance ?? '',
    history: state[acc]?.history ?? [],
    postfix: state[acc]?.currencyPostfix,
  }));

  const isLoading = Object.values(state).some(value => value.isBalanceLoading);

  return (
    <SafeArea>
      <View style={styles.container}>
        <View style={styles.content}>
          {isLoading ? (
            <ActivityIndicator size={'small'} color={BROWN} />
          ) : (
            <>
              <Pager onPageSelected={_setActiveCurrency}>
                <MakeHiveCard key={1} />
              </Pager>
            </>
          )}
        </View>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 12,
  },
  content: {
    flex: 1,
    paddingVertical: 24,
  },
});
