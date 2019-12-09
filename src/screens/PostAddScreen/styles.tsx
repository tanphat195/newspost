import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  main: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    position: 'relative',
    padding: 15,
    marginBottom: 210,
  },
  title: {
  },
  action: {
    width: '100%',
    height: 160,
    // position: 'absolute',
    // bottom: 0,
    shadowOffset: {width: 0, height: -1},
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  photo: {
    backgroundColor: 'rgba(250,250,250,1)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 210,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.05)',
    borderRadius: 4,
  },
});