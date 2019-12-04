import { StyleSheet } from 'react-native';
import { primary } from '../../../styles/color';

export default StyleSheet.create({
  container: {
    position: "relative",
    paddingBottom: 24,
  },
  main: {
    height: 42,
    paddingLeft: 9,
    borderWidth: 1.5,
    borderRadius: 6,
    borderColor: 'rgba(0,0,0,0.1)',
    color: 'rgba(0,0,0,0.55)',
    fontSize: 16,
    zIndex: 10,
  },
  focusBorder: {
    borderColor: primary,
    // shadowOffset: {
    //   width: 0, height: 0
    // },
    // shadowOpacity: 1,
    // shadowColor: "#41BAEE",
    // shadowRadius: 0.5,
  },
  errorBorder: {
    borderColor: "#f4115d",
    // shadowOffset: {
    //   width: 0, height: 0
    // },
    // shadowOpacity: 1,
    // shadowColor: "red",
    // shadowRadius: 0.5,
  },
  errorText: {
    position: "absolute",
    color: '#f4115d',
    marginLeft: 3,
    bottom: 0,
    marginBottom: 6,
  },
  labelText: {
    marginLeft: 4,
    marginBottom: 2,
    color: 'rgba(0,0,0,0.4)',
  },
});