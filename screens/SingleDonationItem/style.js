import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontsSize,
  verticalScale,
} from '../../assets/styles/scaling';

const style = StyleSheet.create({
  container: {
    marginTop: verticalScale(7),
    marginHorizontal: horizontalScale(20),
  },
  image: {
    marginTop: verticalScale(12),
    marginBottom: verticalScale(25),
    width: '100%',
    height: verticalScale(240),
    borderRadius: horizontalScale(5),
  },
  badge: {
    marginBottom: verticalScale(16),
  },
  description: {
    marginTop: verticalScale(7),
    marginHorizontal: horizontalScale(7),
    fontFamily: 'Inter',
    fontWeight: 400,
    fontSize: scaleFontsSize(14),
    lineHeight: scaleFontsSize(22),
  },
  button: {
    marginHorizontal: horizontalScale(20),
  },
});

export default style;
