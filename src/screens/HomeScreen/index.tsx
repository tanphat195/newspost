import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { NavigationStackScreenComponent, createStackNavigator } from 'react-navigation-stack';
import { Button } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import TopPost from './components/TopPost';
import NewPosts from './components/NewPosts';
import styles from './styles';
import { connect } from 'react-redux';
import { primary } from '../../styles/color';
import NotificationScreen from '../NotificationScreen';

const HomeScreen: NavigationStackScreenComponent = (props) => {
  const [isRefreshing, setRefreshing] = useState(false);

  useEffect(() => {
    props.getPosts();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    props.getPosts(() => {
      setRefreshing(false);
    });
  };

  return (
    <>
      {props.posts_home.length > 0 ? (
        <FlatList
          data={[<View style={styles.main}>
            <TopPost navigation={props.navigation} post={props.posts_home[0] || {}} />
            <NewPosts navigation={props.navigation} posts={props.posts_home} />
          </View>]}
          renderItem={({ item }) => item}
          keyExtractor={item => `${item}`}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
            />
          }
        />
      ) : (
        <View style={styles.loading}>
          <ActivityIndicator size="large" ></ActivityIndicator>
        </View>
      )}
    </>
  );
};

HomeScreen.navigationOptions = ({ navigation }) => {
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
      <View style={{flexDirection:'row'}}>
        <Button onPress={() => navigation.navigate('Notification')}>
          <FontAwesome5 color={primary} size={24} name='bell' />
        </Button>
        <Button onPress={() => navigation.navigate('ShoppingCart')}>
          <FontAwesome5 color={primary} size={24} name='opencart' />
        </Button>
      </View>
    ),
  };
};

const mapState = state => ({
  posts_home: state.post.posts_home,
});

const mapDispatch = dispatch => ({
  getPosts: callback => dispatch({
    type: 'WATCH_GET_POSTS',
    callback,
  }),
});

export default createStackNavigator({
  Home: connect(mapState, mapDispatch)(HomeScreen)
});