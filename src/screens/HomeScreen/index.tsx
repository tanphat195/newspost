import React from 'react';
import { View, ScrollView } from 'react-native';
import { NavigationStackScreenComponent, createStackNavigator } from 'react-navigation-stack';
import TopPost from './components/TopPost';
import NewPosts from './components/NewPosts';
import styles from './styles';

const HomeScreen: NavigationStackScreenComponent = (props) => {
  return (
    <ScrollView>
      <View style={styles.main}>
        <TopPost navigation={props.navigation} />
        <NewPosts navigation={props.navigation} />
      </View>
    </ScrollView>
  )
}

HomeScreen.navigationOptions = () => ({
  headerStyle: {
    height: 0,
    borderBottomWidth: 0,
  },
});

export default createStackNavigator({
  Home: HomeScreen,
});