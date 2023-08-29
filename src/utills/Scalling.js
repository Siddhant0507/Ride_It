import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
// const screenSize = Math.sqrt(width * height) / 100;

const heightMobileUI = 896;
const widthMobileUI = 414;

const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const responsiveWidth = width => {
  return (Dimensions.get('window').width * width) / widthMobileUI;
};
const responsiveHeight = height => {
  return (Dimensions.get('window').height * height) / heightMobileUI;
};

const responsiveVerticalScale = size => (height / heightMobileUI) * size;
const responsiveBaseScale = size => (width / widthMobileUI) * size;
const responsiveModerateScale = (size, factor = 0.5) =>
  size + (responsiveBaseScale(size) - size) * factor;


  const marginHalf = height/2;

export {
  scale,
  marginHalf,
  verticalScale,
  moderateScale,
  responsiveWidth,
  responsiveHeight,
  responsiveVerticalScale,
  responsiveBaseScale,
  responsiveModerateScale,
  // screenSize
};
