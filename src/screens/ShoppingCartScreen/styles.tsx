import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: 15,
  },
  emptyCart: {
    height: 300,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    paddingVertical: 15,
  },
  imageWrapper: {
  },
  cartImage: {
    width: 160,
    height: 96,
    borderRadius: 4,
  },
  rightItemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});