import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {SafeArea} from '../components/safeArea';
import {BottomTabParamList} from '../navigation/bottomTab';
import {Pager} from '../components/pager';
import {HiveCard} from '../components/hiveCard';
import {CardTypes} from '../hooks/useConfig';

type Props = {
  navigation: NativeStackNavigationProp<BottomTabParamList, 'Home'>;
};

export const HomeScreen: React.FunctionComponent<Props> = ({}) => {
  const [, setSelectedIndex] = useState<number>(0);
  const [hiveLevel, setHiveLevel] = useState<number>(1);

  const _setActiveCurrency = (active: number) => {
    setSelectedIndex(active);
  };

  const onAdd = () => {
    console.log('hiveLevel ' + hiveLevel);
    if (hiveLevel === 1) {
      setHiveLevel(11);
    } else if (hiveLevel === 11) {
      setHiveLevel(12);
    } else if (hiveLevel === 12) {
      setHiveLevel(13);
    } else if (hiveLevel === 13) {
      setHiveLevel(1);
    }
  };

  return (
    <SafeArea>
      <View style={styles.container}>
        <View style={styles.content}>
          <>
            <Pager onPageSelected={_setActiveCurrency}>
              <HiveCard
                title="Hello, Bee"
                description="How active were you today?"
                buttonCTA="Add test honey"
                mainImage={hiveLevel}
                onAdd={onAdd}
                key={CardTypes.hive}
              />
              <HiveCard
                title="Get social!"
                description="Who's going to win?"
                buttonCTA="Make a hive"
                mainImage={2}
                onAdd={onAdd}
                key={CardTypes.makeHive}
              />
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
