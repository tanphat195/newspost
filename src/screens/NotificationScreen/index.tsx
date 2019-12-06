import React, { useState, useEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import { NavigationStackProp, NavigationStackScreenProps, NavigationStackScreenComponent } from 'react-navigation-stack';
import styles from './styles';
import GoBackArrow from '../../components/atoms/GoBackArrow';

interface Props extends NavigationStackScreenProps {
  navigation: NavigationStackProp;
}

const NotificationScreen: NavigationStackScreenComponent<Props> = (props) => {

  return (
    <View style={styles.main}>
      <Text>This is NotificationScreen</Text>
    </View>
  );
}

NotificationScreen.navigationOptions = ({ navigation }) => ({
  title: 'Notification',
  headerLeft: () => (
    <GoBackArrow onPress={() => navigation.goBack()} />
  ),
});

export default NotificationScreen