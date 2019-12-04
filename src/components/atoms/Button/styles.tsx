import { StyleSheet } from 'react-native';
import { primary } from '../../../styles/color';

export default StyleSheet.create({
  main: {
    height: 48,
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  border: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
  }
});