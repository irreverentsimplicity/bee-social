import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {SafeArea} from '../components/safeArea';
import {BottomTabParamList} from '../navigation/bottomTab';
import {Pager} from '../components/pager';
import {HiveCard} from '../components/hiveCard';
import {useHiveCardState} from '../hooks/useHiveCardsState';
import {CardTypes} from '../hooks/useConfig';

type Props = {
  navigation: NativeStackNavigationProp<BottomTabParamList, 'Home'>;
};

export const HomeScreen: React.FunctionComponent<Props> = ({}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const {state} = useHiveCardState();

  const _setActiveCurrency = (active: number) => {
    setSelectedIndex(active);
  };

  const data = Object.keys(state).map(card => ({
    card: card as CardTypes,
  }));

  const onReceive = () => {};
  const onSend = () => {};

  return (
    <SafeArea>
      <View style={styles.container}>
        <View style={styles.content}>
          <>
            <Pager onPageSelected={_setActiveCurrency}>
              {selectedIndex === 0 && (
                <HiveCard
                  onSend={onSend}
                  onReceive={onReceive}
                  key={CardTypes.hive}
                />
              )}
              {selectedIndex === 1 && (
                <HiveCard
                  onSend={onSend}
                  onReceive={onReceive}
                  key={CardTypes.makeHive}
                />
              )}
            </Pager>
          </>
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
