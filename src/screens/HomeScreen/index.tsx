import React, { useEffect } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { NavigationStackScreenComponent, createStackNavigator } from 'react-navigation-stack';
import TopPost from './components/TopPost';
import NewPosts from './components/NewPosts';
import styles from './styles';
import { connect } from 'react-redux';

const HomeScreen: NavigationStackScreenComponent = (props) => {
  useEffect(() => {
    props.getPosts();
  }, []);

  return (
    <>
      {props.posts_home.length > 0 ? (
        <ScrollView>
          <View style={styles.main}>
            <TopPost navigation={props.navigation} post={props.posts_home[0] || {}} />
            <NewPosts navigation={props.navigation} posts={props.posts_home} />
          </View>
        </ScrollView>
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
  getPosts: () => dispatch({
    type: 'WATCH_GET_POSTS',
  }),
});

export default createStackNavigator({
  Home: connect(mapState, mapDispatch)(HomeScreen),
});