import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import moment from 'moment';
import REST from '../../../../utils/api';
import styles from './styles';

interface Post {
  id: string,
  title: string,
  description: string,
  photo: string,
  created_at: string,
  creator: string,
}

interface Props {
  navigation: NavigationStackProp
}

const TopPost: React.FC<Props> = (props) => {
  const [post, setPost] = useState<Post>({});

  useEffect(() => {
    REST.get('posts?start=0&end=0')
      .then(res => {
        setPost(res.data.posts[0] || {});
      })
  }, []);

  const goToPostDetail = useCallback(() => {
    props.navigation.navigate('PostDetail', { post })
  }, [post]);

  return (
    <TouchableOpacity style={styles.main} onPress={goToPostDetail}>
      <Image style={styles.photo} source={{uri: post.photo}} />
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.description}>{post.description && post.description.substring(0, 150)}</Text>
      <View style={styles.createGroup}>
        <Text style={styles.created_at}>At: {moment(post.created_at).fromNow()}</Text>
        <Text style={styles.creator}> - Post by: {post.creator}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default TopPost;