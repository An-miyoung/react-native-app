import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontsSize,
  verticalScale,
} from '../../assets/styles/scaling';

const style = StyleSheet.create({
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(16),
    backgroundColor: '#f3f5f9',
    height: verticalScale(50),
    borderRadius: horizontalScale(50),
  },
  searchInput: {
    flex: 1,
    marginLeft: horizontalScale(6),
    height: '100%',
    fontFamily: 'Inter',
    fontWeight: 400,
    fontSize: scaleFontsSize(14),
    lineHeight: scaleFontsSize(14),
    color: '#686c7a',
  },
});

export default style;
