import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

const guidelineBaseWidth = 360;
const guidelineBaseHeight = 640;

export const scale = size => (shortDimension / guidelineBaseWidth) * size;
export const verticalScale = size =>
  (longDimension / guidelineBaseHeight) * size;
export const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export const deviceWidth = width;
export const deviceHeight = height;

export default {
  scale,
  moderateScale,
  verticalScale,
  deviceWidth,
  deviceHeight,
};
