import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, RefreshControl, Image } from 'react-native';
import { NavigationStackProp, NavigationStackScreenProps, NavigationStackScreenComponent } from 'react-navigation-stack';
import styles from './styles';
import GoBackArrow from '../../components/atoms/GoBackArrow';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props extends NavigationStackScreenProps {
  navigation: NavigationStackProp;
}

const ShoppingCartScreen: NavigationStackScreenComponent<Props> = (props) => {

  return (
    <View style={styles.main}>
      <FlatList
        data={props.carts}
        renderItem={({ item: cart }) => (
          <RenderItem
            cart={cart}
            removeCart={props.removeCart}
            navigation={props.navigation}
          />
        )}
        keyExtractor={item => `${item.id}`}
        ListEmptyComponent={(
          <View style={styles.emptyCart}>
            <MaterialCommunityIcons size={60} color='rgba(0,0,0,0.2)' name='cart-remove' />
          </View>
        )}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
};

type Cart = {
  id: number,
  photo: string,
}

interface ItemProps {
  cart: Cart;
  removeCart: (id: number) => void;
  navigation: NavigationStackProp;
}

const RenderItem: React.FC<ItemProps> = (props) => {
  const onRemove = () => {
    props.removeCart(props.cart.id);
  }

  return (
    <View style={styles.cartItem}>
      <TouchableOpacity style={styles.imageWrapper} onPress={() => {}}>
        <Image style={styles.cartImage} source={{uri: props.cart.photo}} />
      </TouchableOpacity>
      <View style={styles.rightItemContent}>
        <TouchableOpacity style={{padding: 6}} onPress={onRemove}>
          <AntDesign size={24} color='#fd5068' name='delete' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const renderSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.05)',
      }}
    />
  );
};
ShoppingCartScreen.navigationOptions = ({ navigation }) => ({
  title: 'Shopping Cart',
  headerLeft: () => (
    <GoBackArrow onPress={() => navigation.goBack()} />
  ),
  headerStyle: {
    borderBottomColor: 'rgba(0,0,0,0.1)',
  }
});

const mapState = state => ({
  carts: state.carts,
});

const mapDispath = dispatch => ({
  removeCart: id => dispatch({
    type: 'WATCH_REMOVE_CART',
    payload: id,
  }),
});

export default connect(mapState, mapDispath)(ShoppingCartScreen);