import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Icon from './Icon';
import commonStyles from '../styles/commonStyles';

import {colors, textColor} from '../configs/colors';
import {scale} from '../configs/size';

const Tag = ({type}) => {
  return (
    <View style={[styles.tag, {backgroundColor: colors[type]}]}>
      <Icon
        style={{paddingHorizontal: scale(0)}}
        name={type}
        width={scale(14)}
        height={scale(15)}
      />
      <Text style={styles.typeName}> {type}</Text>
    </View>
  );
};

export default Tag;

const styles = StyleSheet.create({
  tag: {
    ...commonStyles.row,
    borderRadius: scale(3),
    marginRight: scale(5),
    padding: scale(5),
    marginTop: scale(5),
  },
  typeName: {
    color: textColor.white,
    marginLeft: scale(2),
    textTransform: 'capitalize',
  },
});
