import { StyleSheet } from 'react-native';
import { primary } from '../../../styles/color';

export default StyleSheet.create({
  main: {
    height: 42,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
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