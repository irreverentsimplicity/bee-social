import React, {PropsWithChildren} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BROWN, YELLOW} from '../utils/colors';

type Props = {};

export const Chip: React.FunctionComponent<PropsWithChildren<Props>> = ({
  children,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: YELLOW,
    borderRadius: 100,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: BROWN,
  },
});
