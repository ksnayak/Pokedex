import React, {useState, useRef, useEffect} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';

import commonStyles from '../styles/commonStyles';
import {scale} from '../configs/size';
import {colors, customColor, textColor} from '../configs/colors';

const Progress = ({step, steps, height, type}) => {
  const [width, setWidth] = useState(0);
  const animatedValue = useRef(new Animated.Value(-1000)).current;
  const reactivate = useRef(new Animated.Value(-1000)).current;

  // steps = steps ?? 100;
  height = height ?? 5;
  steps = step >= 100 ? 120 : 100;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactivate,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    reactivate.setValue(-width + (width * step) / steps);
  }, [step, steps, width]);

  return (
    <View
      onLayout={e => {
        const newWidth = e.nativeEvent.layout.width;
        setWidth(newWidth);
      }}
      style={{
        height,
        backgroundColor: '#fff',
        borderRadius: height,
        overflow: 'hidden',
        width: '50%',
      }}>
      <Animated.View
        style={{
          height,
          width: '100%',
          backgroundColor: colors[type],
          borderRadius: height,
          position: 'absolute',
          left: 0,
          top: 0,
          transform: [{translateX: animatedValue}],
        }}
      />
    </View>
  );
};

const Stat = ({name, value, type, isTotal}) => {
  isTotal = isTotal
    ? value.stats.reduce((acc, stat) => acc + stat.base_stat, 0)
    : false;
  value = isTotal ? isTotal : value;
  return (
    <View style={styles.statContainer}>
      <Text style={styles.statsName}>{name}</Text>
      <View style={{...commonStyles.row}}>
        <Text
          style={[styles.statsNumber, {fontWeight: isTotal ? '700' : '400'}]}>
          {value}
        </Text>
        <Progress step={value} type={type} />
      </View>
    </View>
  );
};

const Stats = ({index, pokemonData, data}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const type = data.types[0].type.name;

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  }, []);

  return index === 1 && isLoaded ? (
    <View style={{...commonStyles.detailsContainer}}>
      <Text style={[styles.headerText, {color: colors[type]}]}>Base Stats</Text>
      <Stat name="HP" value={pokemonData.stats[0]?.base_stat} type={type} />
      <Stat name="Attack" value={pokemonData.stats[1]?.base_stat} type={type} />
      <Stat
        name="Defense"
        value={pokemonData.stats[2]?.base_stat}
        type={type}
      />
      <Stat
        name="Sp. Attack"
        value={pokemonData.stats[3]?.base_stat}
        type={type}
      />
      <Stat
        name="Sp. Defense"
        value={pokemonData.stats[4]?.base_stat}
        type={type}
      />
      <Stat name="Speed" value={pokemonData.stats[5]?.base_stat} type={type} />
      <Stat name="Total" value={pokemonData} type={type} isTotal={true} />
    </View>
  ) : null;
};

export default Stats;

const styles = StyleSheet.create({
  headerText: {
    fontSize: scale(16),
    fontWeight: '700',
    lineHeight: scale(19),
    marginVertical: scale(20),
  },
  statContainer: {
    ...commonStyles.row,
    justifyContent: 'space-between',
    marginVertical: scale(8),
  },
  statsName: {
    fontSize: scale(12),
    fontWeight: '500',
    lineHeight: scale(14),
    color: textColor.black,
  },
  statsNumber: {
    fontSize: scale(16),
    lineHeight: scale(19),
    color: textColor.grey,
    marginRight: scale(20),
  },
});
