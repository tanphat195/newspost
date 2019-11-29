import React, { useState, useEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import {
  NavigationStackProp,
  NavigationStackScreenProps,
  NavigationStackScreenComponent,
  createStackNavigator
} from 'react-navigation-stack';
import { connect } from 'react-redux';
import Button from '../../components/atoms/Button';
import styles from './styles';

interface Props extends NavigationStackScreenProps {
  navigation: NavigationStackProp;
}

const ProfileSceen: NavigationStackScreenComponent<Props> = (props) => {
  const handleLogout = async () => {
    await props.logout(() => {
      props.navigation.navigate('Auth');
    });
  };

  return (
    <View style={styles.main}>
      <Button style={{marginTop: 20}} onPress={handleLogout}>Logout</Button>
    </View>
  );
}

ProfileSceen.navigationOptions = () => ({
  title: 'Profile',
  // headerStyle: {
  //   height: 0,
  //   borderBottomWidth: 0,
  // }
});

const mapState = state => ({
  user: state.user,
});

const matDispatch = dispatch => ({
  logout: callback => dispatch({
    type: 'WATCH_SIGN_OUT',
    callback,
  })
});

export default createStackNavigator({
  Profile: connect(mapState, matDispatch)(ProfileSceen),
});