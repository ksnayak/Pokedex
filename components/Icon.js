import React from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';

import {textColor} from '../configs/colors';
import {scale} from '../configs/size';

const Icon = ({children, onPress, name, style, width, height, ...props}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress} style={[styles.icon, style]}>
      {children}
    </TouchableWithoutFeedback>
  );
};

export default Icon;

const styles = StyleSheet.create({
  icon: {
    paddingHorizontal: scale(10),
  },
});
