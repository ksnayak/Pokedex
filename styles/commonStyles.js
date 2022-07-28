import {StyleSheet} from 'react-native';
import {textColor} from '../configs/colors';
import {scale} from '../configs/size';

const fontFamily = StyleSheet.create({
  bold: {
    fontFamily: 'SF-Pro-Display-Bold',
  },
});

export default StyleSheet.create({
  container: {
    padding: scale(20),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    fontSize: scale(32),
    color: textColor.black,
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: scale(16),
    color: textColor.grey,
  },
  title: {
    fontSize: scale(26),
    lineHeight: scale(31),
    fontWeight: '700',
    color: textColor.white,
    textTransform: 'capitalize',
  },
  number: {
    fontSize: scale(12),
    lineHeight: scale(14.32),
    fontWeight: '700',
    color: textColor.number,
  },
  detailsContainer: {
    flex: scale(1),
    backgroundColor: 'white',
    padding: scale(30),
    borderTopEndRadius: scale(20),
    borderTopStartRadius: scale(20),
  },
});
