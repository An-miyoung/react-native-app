import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontsSize,
  verticalScale,
} from '../../assets/styles/scaling';

const style = StyleSheet.create({
  button: {
    backgroundColor: '#2979f2',
    height: verticalScale(55),
    borderRadius: horizontalScale(50),
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  title: {
    fontFamily: 'Inter',
    fontSize: scaleFontsSize(16),
    fontWeight: 500,
    lineHeight: scaleFontsSize(19),
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default style;
