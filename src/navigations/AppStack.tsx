import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import ProfileSceen from '../screens/ProfileSceen';
import PostManageScreen from '../screens/PostManageScreen';
import PostAddScreen from '../screens/PostAddScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

const BottomStack = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => {
          return (
            <Ionicons
              size={24}
              name="ios-home"
              color={focused ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.3)'}
            />
          );
        },
      }
    },
    PostManage: {
      screen: PostManageScreen,
      navigationOptions: {
        tabBarLabel: 'Post Manage',
        tabBarIcon: ({ tintColor, focused }) => {
          return (
            <Ionicons
              size={24}
              name="md-albums"
              color={focused ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.3)'}
            />
          );
        },
        tabBarColor: 'red'
      }
    },
    Profile: {
      screen: ProfileSceen,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => {
          return (
            <Ionicons
              size={24}
              name="md-person"
              color={focused ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.3)'}
            />
          );
        },
      }
    },
  },
  {
    initialRouteName: 'Home',
    barStyle: {
      backgroundColor: '#fff',
    },
  }
);

export default createStackNavigator({
  BottomStack: {
    screen: BottomStack,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
  PostDetail: {
    screen: PostDetailScreen,
  },
  PostAdd: {
    screen: PostAddScreen,
    navigationOptions: ({ navigation }) => {
      const params = navigation.state.params || {};
      const post = params.post || {}
      return {
        title: post.id ? 'Edit Post' : 'Add Post',
        headerRight: () => (
          <View>
            <Button color='#41BAEE' onPress={() => navigation.navigate('PostAddDone')}>DONE</Button>
          </View>
        ),
        headerStyle: {
          borderBottomWidth: 0,
        }
      }
    },
  }
});