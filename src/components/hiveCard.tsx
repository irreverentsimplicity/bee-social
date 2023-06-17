import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {BROWN, YELLOW, WHITE} from '../utils/colors';
import {CardHeader} from './cardHeader';
import ArrowDownTray from '../../assets/icons/arrow-down-tray.svg';

type Props = {
  onAdd: () => void;
  title: string;
  description: string;
  buttonCTA: string;
  mainImage: number;
};

export const HiveCard: React.FunctionComponent<Props> = ({
  title,
  description,
  buttonCTA,
  mainImage,
  onAdd,
}) => {
  return (
    <View style={styles.currencyCard}>
      <CardHeader
        title={title}
        description={description}
        mainImage={mainImage}
      />
      <View style={styles.actionPanel}>
        <Pressable style={styles.iconButtonContainer} onPress={onAdd}>
          <View style={styles.iconButton}>
            <ArrowDownTray width={24} height={24} color={BROWN} />
          </View>
          <Text style={styles.iconText}>{buttonCTA}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  currencyCard: {
    flexDirection: 'column',
    paddingVertical: 24,
    paddingHorizontal: 32,
    width: '90%',
    height: '90%',
    backgroundColor: YELLOW,
    marginLeft: 12,
    borderRadius: 12,
    gap: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  actionPanel: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
  },
  iconButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    padding: 8,
    borderRadius: 100,
    backgroundColor: WHITE,
  },
  iconText: {
    color: WHITE,
  },
});
