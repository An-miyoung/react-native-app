import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontsSize,
  verticalScale,
} from '../../assets/styles/scaling';

const style = StyleSheet.create({
  badge: {
    backgroundColor: '#145855',
    height: verticalScale(22),
    borderRadius: horizontalScale(50),
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Inter',
    fontSize: scaleFontsSize(10),
    fontWeight: 600,
    lineHeight: scaleFontsSize(12),
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default style;
