import { StyleSheet } from 'react-native';
import { primary } from '../../styles/color';

export default StyleSheet.create({
  keyboard: {
    flex: 1,
    justifyContent: 'center'
  },
  main: {
    padding: 30,
  },
  title: {
    fontSize: 24,
    color: 'rgba(0,0,0,0.5)',
    fontWeight: '600',
    textAlign: 'center',
  },
  form: {
    marginTop: 20,
  },
  registerWrapText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  dontHaveAccountText: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.5)',
  },
  registerText: {
    fontSize: 13,
    color: primary,
  },
});