import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  main: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    position: 'relative',
  },
  title: {
  },
  action: {
    width: '100%',
    height: 180,
    position: 'absolute',
    bottom: 0,
  },
  photo: {
    backgroundColor: 'rgba(245,245,245,1)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});