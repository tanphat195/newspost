import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { NavigationStackProp, NavigationStackScreenProps, NavigationStackScreenComponent } from 'react-navigation-stack';
import PostCard from '../../components/molecules/PostCard';
import Divider from '../../components/atoms/Divider';
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

  useEffect(() => {
    REST.get(`users/${props.user.email}/posts`)
      .then(res => {
        setPosts(res.data.posts)
      });
  }, []);

  const onEdit = (id) => {

  };

  const onDelete = (id) => {
    REST.delete(`posts/${id}`)
      .then(res => {
        if (res.data) {
          setPosts(posts.filter(item => item.id !== id))
        }
      })
  };

  return (
    <ScrollView>
      <View style={styles.main}>
        {posts.map((post, index) => (
          <View key={post.id}>
            <RenderRow id={post.id} onEdit={onEdit} onDelete={onDelete}>
              <PostCard post={post} navigation={props.navigation} />
            </RenderRow>
            {index !== posts.length - 1 && <Divider />}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const RenderRow = ({ children, onEdit, onDelete, id }) => {
  let swipeBtns = [
    {
      text: 'Edit',
      backgroundColor: '#1a5ef2',
      onPress: onEdit,
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