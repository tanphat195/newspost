import React from 'react';
import { View } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import PostCard from '../../../../components/molecules/PostCard';
import Divider from '../../../../components/atoms/Divider';
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
  posts: Post[]
}

const NewPosts: React.FC<Props> = (props) => {
  return (
    <View style={styles.main}>
      {props.posts.map(post => (
        <View key={post.id} style={styles.wrap}>
          <Divider />
          <PostCard style={{paddingBottom: 15}} post={post} navigation={props.navigation} />
        </View>
      ))}
    </View>
  );
}

export default NewPosts;