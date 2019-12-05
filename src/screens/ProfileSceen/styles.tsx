import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  main: {

  },
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    minHeight: 500,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowRadius: 5,
  },
  banner: {
    width: '100%',
    height: 120,
  },
  avatar: {
    marginTop: -75,
    marginBottom: 20,
  },
  infomation: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    flexDirection: 'column',
  },
  full_name: {
    fontSize: 24,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.6)'
  },
  email: {
    fontSize: 18,
    color: 'rgba(0,0,0,0.4)',
    marginVertical: 12,
  },
  formWaraper: {
    paddingHorizontal: 20,
    width: '100%',
    flexDirection: 'column',
  },
  action: {
    flexDirection: 'row',
    marginTop: 24,
  },
});