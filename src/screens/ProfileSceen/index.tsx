import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native';
import {
  NavigationStackProp,
  NavigationStackScreenProps,
  NavigationStackScreenComponent,
} from 'react-navigation-stack';
import { connect } from 'react-redux';
import Button from '../../components/atoms/Button';
import Avatar from '../../components/atoms/Avatar';
import { primary } from '../../styles/color';
import styles from './styles';

interface Props extends NavigationStackScreenProps {
  navigation: NavigationStackProp;
}

const ProfileSceen: NavigationStackScreenComponent<Props> = (props) => {
  const handleLogout = async () => {
    await props.logout(() => {
      props.navigation.navigate('Auth')
    });
  };

  return (
    <ScrollView style={{backgroundColor: primary}}>
      <View style={styles.banner} />
      <View style={styles.main}>
        <View style={styles.avatar}>
          <Avatar border={{width: 6, color: '#FFF'}} source={{uri: props.user.avatar}} size={150} />
        </View>
        <Text style={styles.full_name}>{props.user.full_name}</Text>
        <Text style={styles.email}>{props.user.email}</Text>
        <View>
          <Button
            style={{
              borderRadius: 24,
              width: 150,
            }}
            type="default"
          >
            Edit
          </Button>
        </View>

        <Button
          style={{
            borderRadius: 24,
            width: 150,
            marginTop: 15
          }}
          type="primary"
          onPress={handleLogout}
        >
          Logout
        </Button>
      </View>
    </ScrollView>
  );
}

ProfileSceen.navigationOptions = () => ({
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

export default connect(mapState, matDispatch)(ProfileSceen);