import {StyleSheet} from 'react-native';
import {scaleFontsSize, verticalScale} from '../../assets/styles/scaling';

const style = StyleSheet.create({
  label: {
    color: '#36455a',
    fontFamily: 'Inter',
    fontWeight: 400,
    fontSize: scaleFontsSize(12),
    lineHeight: scaleFontsSize(14.52),
  },
  input: {
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    // borderBottomColor: 'rgba(167,167,167,0.5)',
    borderBottomColor: 'black',
  },
});

export default style;
