import React, { useCallback } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import moment from 'moment';
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
  navigation: NavigationStackProp;
  post: Post;
}

const TopPost: React.FC<Props> = (props) => {
  const goToPostDetail = useCallback(() => {
    props.navigation.navigate('PostDetail', { post: props.post })
  }, [props.post]);

  return (
    <TouchableOpacity style={styles.main} onPress={goToPostDetail}>
      <Image style={styles.photo} source={{uri: props.post.photo}} />
      <Text style={styles.title}>{props.post.title}</Text>
      <Text style={styles.description}>{props.post.description && props.post.description.substring(0, 150)}</Text>
      <View style={styles.createGroup}>
        <Text style={styles.created_at}>{moment(props.post.created_at).fromNow()}</Text>
        <Text style={styles.creator}> - Post by: {props.post.creator}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TopPost;