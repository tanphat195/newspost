import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { NavigationStackScreenComponent, createStackNavigator } from 'react-navigation-stack';
import TopPost from './components/TopPost';
import NewPosts from './components/NewPosts';
import styles from './styles';
import { connect } from 'react-redux';

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
  )
};

HomeScreen.navigationOptions = () => {
  return {
    headerStyle: {
      height: 0,
      borderBottomWidth: 0,
    },
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
  Home: connect(mapState, mapDispatch)(HomeScreen),
});