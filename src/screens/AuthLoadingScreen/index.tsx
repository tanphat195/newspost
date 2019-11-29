import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, ActivityIndicator } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import styles from './styles';

const AuthLoadingScreen: NavigationStackScreenComponent = (props) => {
  useEffect(() => {
    props.fetchUser((err, user) => {
      if (!err || user.email) {
        props.navigation.navigate('App');
      } else {
        props.navigation.navigate('Auth');
      }
    });
  }, []);

  return (
    <View style={styles.main}>
      <ActivityIndicator size="large" ></ActivityIndicator>
    </View>
  );
}

AuthLoadingScreen.navigationOptions = () => ({
  header: null,
});

const mapState = state => ({
  user: state.user,
});

const mapDispatch = dispatch => ({
  fetchUser: callback => dispatch({
    type: 'WATCH_FETCH_USER',
    callback,
  }),
});

export default connect(mapState, mapDispatch)(AuthLoadingScreen);