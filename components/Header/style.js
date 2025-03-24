import {StyleSheet} from 'react-native';
import {scaleFontsSize} from '../../assets/styles/scaling';

const style = StyleSheet.create({
  title1: {
    fontFamily: 'Inter',
    fontSize: scaleFontsSize(24),
    fontWeight: 600,
    lineHeight: scaleFontsSize(29),
    letterSpacing: 0.02,
  },
  title2: {
    fontFamily: 'Inter',
    fontSize: scaleFontsSize(18),
    fontWeight: 600,
    lineHeight: scaleFontsSize(21),
    letterSpacing: 0.02,
  },
  title3: {
    fontFamily: 'Inter',
    fontSize: scaleFontsSize(16),
    fontWeight: 600,
    lineHeight: scaleFontsSize(19),
    letterSpacing: 0.02,
  },
});

export default style;
