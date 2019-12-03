import React, { useState, useEffect } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { NavigationStackProp, NavigationStackScreenProps, NavigationStackScreenComponent } from 'react-navigation-stack';
import PostCard from '../../components/molecules/PostCard';
import REST from '../../utils/api';
import styles from './styles';
import { connect } from 'react-redux';
import { Button } from 'react-native-paper';
import Swipeout from 'react-native-swipeout';

interface Props extends NavigationStackScreenProps {
  navigation: NavigationStackProp;
}

const PostManageScreen: NavigationStackScreenComponent<Props> = (props) => {
  const [posts, setPosts] = useState([]);
  const [isRefreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getPostsByEmail();
  }, []);

  const getPostsByEmail = async () => {
    return REST.get(`users/${props.user.email}/posts`)
      .then(res => {
        setPosts(res.data.posts)
      });
  };

  const onEdit = (id) => {
    props.navigation.navigate('PostAdd', { post: posts.find(item => item.id === id)})
  };

  const onDelete = (id) => {
    REST.delete(`posts/${id}`)
      .then(res => {
        if (res.data) {
          setPosts(posts.filter(item => item.id !== id))
        }
      })
  };

  const onRefresh = () => {
    setRefreshing(true);
    return REST.get(`users/${props.user.email}/posts`)
    .then(res => {
      setPosts(res.data.posts);
      setRefreshing(false);
    })
    .catch(err => setRefreshing(false))
  };

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

  return (
    <View style={styles.main}>
      <FlatList
        data={posts}
        renderItem={({item: post}) => (
          <View style={{marginVertical: 15}}>
            <RenderRow id={post.id} onEdit={onEdit} onDelete={onDelete}>
              <PostCard post={post} navigation={props.navigation} />
            </RenderRow>
          </View>
        )}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        }
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
}

const RenderRow = ({ children, onEdit, onDelete, id }) => {
  let swipeBtns = [
    {
      text: 'Edit',
      backgroundColor: '#1a5ef2',
      onPress: () => onEdit(id),
    },
    {
      text: 'Delete',
      backgroundColor: 'tomato',
      onPress: () => onDelete(id),
    }
  ];

  return (
    <Swipeout right={swipeBtns}
      autoClose={true}
      backgroundColor={'transparent'}
    >
      {children}
    </Swipeout>
  );
}

PostManageScreen.navigationOptions = ({ navigation }) => ({
  title: 'Post Manage',
  headerRight: () => (
    <View>
      <Button color='#41BAEE' onPress={() => navigation.navigate('PostAdd')}>+ Add</Button>
    </View>
  )
});

const mapState = state => ({
  user: state.user,
});

export default createStackNavigator({
  PostManage: connect(mapState)(PostManageScreen),
});