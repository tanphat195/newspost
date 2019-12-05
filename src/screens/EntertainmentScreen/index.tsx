import React, { useState, useEffect } from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { NavigationStackProp, NavigationStackScreenProps, NavigationStackScreenComponent, createStackNavigator } from 'react-navigation-stack';
import { Button } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { primary } from '../../styles/color';
import styles from './styles';
import REST from '../../utils/api';
import PostCard from '../../components/molecules/PostCard';
import HeaderRightCartNotification from '../../components/molecules/HeaderRightCartNotification';

interface Props extends NavigationStackScreenProps {
  navigation: NavigationStackProp;
}

const EntertainmentScreen: NavigationStackScreenComponent<Props> = (props) => {
  const [posts, setPosts] = useState([]);
  const [isRefreshing, setRefreshing] = useState(false);

  useEffect(() => {
    REST.get('posts')
      .then(res => {
        setPosts(res.data.posts);
      })
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    REST.get('posts')
      .then(res => {
        setPosts(res.data.posts);
        setRefreshing(false);
      })
  };

  return (
    <View style={styles.main}>
      {posts.length > 0 ? (
        <FlatList
          style={styles.list}
          data={posts}
          renderItem={({ item: post }) => (
            <View style={{marginVertical: 15}}>
              <PostCard post={post} navigation={props.navigation} />
            </View>
          )}
          keyExtractor={item => `${item.id}`}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
            />
          }
          ItemSeparatorComponent={renderSeparator}
        />
      ) : (
        <View style={styles.loading}>
          <ActivityIndicator size="large" ></ActivityIndicator>
        </View>
      )}
    </View>
  );
}

const renderSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.05)'
      }}
    />
  );
};

EntertainmentScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'Entertainment',
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

export default createStackNavigator({
  Entertainment: EntertainmentScreen
})