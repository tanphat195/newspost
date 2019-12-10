import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { NavigationStackScreenComponent, createStackNavigator } from 'react-navigation-stack';
import { Button } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TopPost from './components/TopPost';
import NewPosts from './components/NewPosts';
import styles from './styles';
import { connect } from 'react-redux';
import { primary } from '../../styles/color';
import HeaderRightCartNotification from '../../components/molecules/HeaderRightCartNotification';

const HomeScreen: NavigationStackScreenComponent = (props) => {
  const [isRefreshing, setRefreshing] = useState(false);
  const [current_page, setCurrentPage] = useState(1);
  const [per_page, setPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [allowLoadMore, setAllowLoadMore] = useState(false);

  useEffect(() => {
    props.getPosts({ page: current_page, per_page }, (data) => {
      if (current_page > data.total_pages) {
        setAllowLoadMore(false);
      } else {
        setTimeout(() => {
          setAllowLoadMore(true);
        }, 500);
      }
    });
    props.getCarts();
  }, []);

  const onRefresh = () => {
    const new_current_page = 1
    setRefreshing(true);
    setCurrentPage(new_current_page);
    props.getPosts({ page: new_current_page, per_page }, (data) => {
      setRefreshing(false);
      if (new_current_page > data.total_pages) {
        setAllowLoadMore(false);
      } else {
        setAllowLoadMore(true);
      }
    });
  };

  const handleLoadMore = e => {
    if (!loading && allowLoadMore) {
      setLoading(true);
      const new_current_page = current_page + 1;
      setCurrentPage(new_current_page);
      props.loadMorePosts({ page: new_current_page, per_page }, (data) => {
        setLoading(false);
        if (new_current_page > data.total_pages) {
          setAllowLoadMore(false);
        } else {
          setAllowLoadMore(true);
        }
      });
    }
  };

  return (
    <>
      {props.posts_home.length > 0 ? (
        <FlatList
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0}
          data={[(
            <View style={styles.main}>
              <TopPost navigation={props.navigation} post={props.posts_home[0] || {}} />
              <NewPosts navigation={props.navigation} posts={props.posts_home.filter((item, index) => index > 0)} />
            </View>
          )]}
          renderItem={({ item }) => item}
          keyExtractor={item => `${item}`}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
            />
          }
          ListFooterComponent={() => (
            loading ? <ActivityIndicator /> : null
          )}
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
    headerRight: () => <HeaderRightCartNotification navigation={navigation} />,
  };
};

const mapState = state => ({
  posts_home: state.post.posts_home,
});

const mapDispatch = dispatch => ({
  getPosts: ({page, per_page}, callback) => dispatch({
    type: 'WATCH_GET_POSTS',
    payload: {page, per_page},
    callback,
  }),
  loadMorePosts: ({page, per_page}, callback) => dispatch({
    type: 'WATCH_LOAD_MORE_POSTS',
    payload: {page, per_page},
    callback,
  }),
  getCarts: () => dispatch({
    type: 'WATCH_GET_CARTS',
  }),
});

export default createStackNavigator({
  Home: connect(mapState, mapDispatch)(HomeScreen)
});