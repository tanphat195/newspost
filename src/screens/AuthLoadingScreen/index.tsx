import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, ActivityIndicator, NetInfo, Linking, Platform, NativeModules } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import styles from './styles';

const AuthLoadingScreen: NavigationStackScreenComponent = (props) => {
  useEffect(() => {
    checkInternet();

    props.fetchUser(async (err, user) => {
      if (!err || user.email) {
        props.navigation.navigate('App');
      } else {
        props.navigation.navigate('Auth');
      }
    });
  }, []);

  const checkInternet = () => {
    NetInfo.getConnectionInfo()
      .then(res => {
        const IOSWifiManager = NativeModules.IOSWifiManager;
        if (res.type === 'none') {
          Linking.openURL('app-settings:');
        }
      })
      .catch(err => {
        Linking.openURL('app-settings:');
      });
  };

  return (
    <View style={styles.main}>
      <ActivityIndicator size="large" />
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