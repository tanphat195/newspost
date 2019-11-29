import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  main: {
    flexDirection: 'column',
  },
  photo: {
    width: '100%',
    height: 210,
    borderRadius: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 6,
  },
  description: {
    color: 'rgba(0,0,0,0.7)',
    fontSize: 15,
  },
  createGroup: {
    marginTop: 12,
    marginBottom: 4,
    flexDirection: 'row',
  },
  created_at: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.5)',
  },
  creator: {
    fontSize: 13,
    color: 'rgba(0,0,0,0.5)',
  },
});