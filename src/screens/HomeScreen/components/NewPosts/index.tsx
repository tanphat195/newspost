import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import moment from 'moment';
import PostCard from '../../../../components/molecules/PostCard';
import Divider from '../../../../components/atoms/Divider';
import REST from '../../../..//utils/api';
import styles from './styles';

interface Props {
  navigation: NavigationStackProp
}

const NewPosts: React.FC<Props> = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    REST.get('posts?start=1&end=-1')
      .then(res => {
        setPosts(res.data.posts);
      })
  }, []);

  return (
    <View style={styles.main}>
      {posts.map(post => (
        <View key={post.id} style={styles.wrap}>
          <Divider />
          <PostCard style={{paddingBottom: 15}} post={post} navigation={props.navigation} />
        </View>
      ))}
    </View>
  );
}

export default NewPosts;