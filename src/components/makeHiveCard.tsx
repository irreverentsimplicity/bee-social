import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {BLACK, RED, WHITE} from '../utils/colors';
import ArrowDownTray from '../../assets/icons/arrow-down-tray.svg';
import PaperAirplane from '../../assets/icons/paper-airplane.svg';

type Props = {
  onReceive: () => void;
  onSend: () => void;
};

export const MakeHiveCard: React.FunctionComponent<Props> = ({
  onReceive,
  onSend,
}) => {
  return (
    <View style={styles.currencyCard}>
      <View style={styles.actionPanel}>
        <Pressable style={styles.iconButtonContainer} onPress={onReceive}>
          <View style={styles.iconButton}>
            <ArrowDownTray width={24} height={24} color={BLACK} />
          </View>
          <Text style={styles.iconText}>Receive</Text>
        </Pressable>
        <Pressable style={styles.iconButtonContainer} onPress={onSend}>
          <View style={styles.iconButton}>
            <PaperAirplane width={24} height={24} color={BLACK} />
          </View>
          <Text style={styles.iconText}>Send</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  currencyCard: {
    paddingVertical: 24,
    paddingHorizontal: 32,
    width: '90%',
    height: '90%',
    backgroundColor: RED,
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
