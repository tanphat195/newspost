import { StyleSheet } from 'react-native';
import { primary } from '../../../styles/color';

export default StyleSheet.create({
  main: {
    position: "relative",
    paddingBottom: 24,
  },
  input: {
    height: 46,
    paddingLeft: 9,
    borderWidth: 0.5,
    borderColor: 'rgba(240,240,240,1)',
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0,0,0,0.15)',
    color: 'rgba(0,0,0,0.6)',
    fontSize: 16,
    zIndex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 6,
  },
  focusBorder: {
    borderBottomColor: primary,
  },
  errorBorder: {
    borderBottomColor: '#f4115d',
  },
  errorText: {
    position: "absolute",
    color: '#f4115d',
    marginLeft: 3,
    bottom: 0,
    marginBottom: 6,
  },
  viewText: {
    top: '30%',
    left: 9,
    zIndex: 2,
    position: 'absolute',
  },
  viewText_hover: {
    top: 0,
  },
  labelText: {
    color: 'rgba(0,0,0,0.2)',
  },
  labelText_hover: {
    fontSize: 12,
    color: primary,
  },
});