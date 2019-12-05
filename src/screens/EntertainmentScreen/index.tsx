import React, { useState, useEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import { NavigationStackProp, NavigationStackScreenProps, NavigationStackScreenComponent, createStackNavigator } from 'react-navigation-stack';
import { Button } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { primary } from '../../styles/color';
import styles from './styles';

interface Props extends NavigationStackScreenProps {
  navigation: NavigationStackProp;
}

const EntertainmentScreen: NavigationStackScreenComponent<Props> = (props) => {

  return (
    <View style={styles.main}>
      <Text>This is EntertainmentScreen</Text>
    </View>
  );
}

EntertainmentScreen.navigationOptions = ({ navigation }) => {
  return {
    headerStyle: {
      borderBottomWidth: 0,
    },
    headerLeft: () => (
      <Button onPress={() => navigation.toggleDrawer()}>
        <AntDesign color={primary} size={24} name='menu-fold' />
      </Button>
    ),
    headerRight: () => (
      <Button onPress={() => navigation.navigate('Notification')}>
        <FontAwesome5 color={primary} size={24} name='bell' />
      </Button>
    ),
  };
};

export default createStackNavigator({
  Entertainment: EntertainmentScreen
})