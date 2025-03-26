import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontsSize,
  verticalScale,
} from '../../assets/styles/scaling';

const style = StyleSheet.create({
  container: {
    marginHorizontal: horizontalScale(24),
    flex: 1,
    justifyContent: 'center',
  },
  registerButton: {
    alignItems: 'center',
  },
  error: {
    color: '#ff0000',
    fontFamily: 'Inter',
    fontSize: scaleFontsSize(16),
    marginBottom: verticalScale(24),
  },
  success: {
    color: '#28a745',
    fontFamily: 'Inter',
    fontSize: scaleFontsSize(16),
    marginBottom: verticalScale(24),
  },
});

export default style;
