import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../assets/styles/scaling';

const style = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    width: horizontalScale(44),
    height: horizontalScale(44),
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default style;
