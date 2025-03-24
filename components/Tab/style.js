import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontsSize,
  verticalScale,
} from '../../assets/styles/scaling';

const style = StyleSheet.create({
  tab: {
    backgroundColor: '#2979f2',
    height: verticalScale(50),
    borderRadius: horizontalScale(50),
    justifyContent: 'center',
  },
  inactiveTab: {
    backgroundColor: '#f3f5f9',
  },
  title: {
    fontFamily: 'Inter',
    fontSize: scaleFontsSize(14),
    fontWeight: 500,
    lineHeight: scaleFontsSize(17),
    color: '#ffffff',
    textAlign: 'center',
  },
  inactiveTitle: {
    color: '#79869f',
  },
});

export default style;
