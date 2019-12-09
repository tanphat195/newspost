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
  photoError: {
    color: '#f4115d',
    marginTop: 3,
    marginLeft: 3,
  }
});