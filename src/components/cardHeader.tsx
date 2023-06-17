import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BROWN} from '../utils/colors';
import Hexagon from '../../assets/images/hexagon.svg';
import HexagonOneThird from '../../assets/images/hexagon-one-third.svg';
import HexagonTwoThirds from '../../assets/images/hexagon-two-thirds.svg';
import HexagonFull from '../../assets/images/hexagon-full.svg';
import Hexagonhive from '../../assets/images/hive-hexagon.svg';

type Props = {
  title: string;
  description: string;
  mainImage: number;
};

export const CardHeader: React.FunctionComponent<Props> = ({
  title,
  description,
  mainImage,
}) => {
  return (
    <View style={styles.container}>
      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.imageContainer}>
        {mainImage === 1 && <Hexagon width={170} height={170} />}
        {mainImage === 11 && <HexagonOneThird width={170} height={170} />}
        {mainImage === 12 && <HexagonTwoThirds width={170} height={170} />}
        {mainImage === 13 && <HexagonFull width={170} height={170} />}
        {mainImage === 2 && <Hexagonhive width={170} height={170} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 2,
  },
  imageContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 10,
    height: 170,
  },
  balanceRow: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 12,
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    color: BROWN,
    maxWidth: '100%',
  },
  description: {
    fontSize: 14,
    fontWeight: '500',
    color: BROWN,
    maxWidth: '60%',
  },
});
