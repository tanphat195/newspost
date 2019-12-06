import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { View, ScrollView, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
=======
import { View, ScrollView, FlatList, RefreshControl } from 'react-native';
>>>>>>> 2ffd8995bf16a76d300a2e7e8bf3aa71217b7031
import { createStackNavigator } from 'react-navigation-stack';
import { NavigationStackProp, NavigationStackScreenProps, NavigationStackScreenComponent } from 'react-navigation-stack';
import PostCard from '../../components/molecules/PostCard';
import REST from '../../utils/api';
import styles from './styles';
import { connect } from 'react-redux';
import { Button } from 'react-native-paper';
import { primary, secondary } from '../../styles/color';
import Swipeout from 'react-native-swipeout';

interface Props extends NavigationStackScreenProps {
  navigation: NavigationStackProp;
}

const PostManageScreen: NavigationStackScreenComponent<Props> = (props) => {
  const [posts, setPosts] = useState([]);
  const [isRefreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPostsByEmail();
  }, []);

  const getPostsByEmail = async () => {
    setLoading(true);
    return REST.get(`users/${props.user.email}/posts`)
      .then(res => {
        setPosts(res.data.posts);
        setLoading(false);
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

  return (
<<<<<<< HEAD
    <>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size='large' />
        </View>
      ) : (
        <ScrollView>
          <View style={styles.main}>
            {posts.map(post => (
              <View key={post.id} style={styles.list}>
                <RenderRow id={post.id} onEdit={onEdit} onDelete={onDelete}>
                  <PostCard post={post} navigation={props.navigation} />
                </RenderRow>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </>
=======
    <ScrollView>
      <View style={styles.main}>
        {posts.map(post => (
          <View key={post.id} style={styles.list}>
            <RenderRow id={post.id} onEdit={onEdit} onDelete={onDelete}>
              <PostCard post={post} navigation={props.navigation} />
            </RenderRow>
          </View>
        ))}
      </View>
    </ScrollView>
>>>>>>> 2ffd8995bf16a76d300a2e7e8bf3aa71217b7031
  );
}

const RenderRow = ({ children, onEdit, onDelete, id }) => {
  let swipeBtns = [
    {
      text: 'Edit',
      backgroundColor: secondary,
      onPress: () => onEdit(id),
    },
    {
      text: 'Delete',
      backgroundColor: primary,
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

PostManageScreen.navigationOptions = ({ navigation }) => ({
  title: 'Post Manage',
  headerRight: () => (
    <View>
      <Button color={primary} onPress={() => navigation.navigate('PostAdd')}>+ Add</Button>
    </View>
  ),
  headerStyle: {
    borderBottomWidth: 0,
  }
});

const mapState = state => ({
  user: state.user,
});

export default createStackNavigator({
  PostManage: connect(mapState)(PostManageScreen),
});