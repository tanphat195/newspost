import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {
  NavigationStackProp,
  NavigationStackScreenProps,
  NavigationStackScreenComponent
} from 'react-navigation-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { primary } from '../../styles/color';
import moment from 'moment';
import ImperativeScrollView, { ImperativeScrollViewHandles } from '../../components/atoms/ImperativeScrollView';
import PostCard from '../../components/molecules/PostCard';
import Divider from '../../components/atoms/Divider';
import GoBackArrow from '../../components/atoms/GoBackArrow';
import REST from '../../utils/api';
import styles from './styles';

interface Post {
  id: string,
  title: string,
  description: string,
  photo: string,
  created_at: string,
  creator: string,
}

interface Props extends NavigationStackScreenProps {
  navigation: NavigationStackProp
  post: Post
}

const PostDetailScreen: NavigationStackScreenComponent<Props> = (props) => {
  const scrollViewRef = useRef<ImperativeScrollViewHandles>(null);
  const [post, setPost] = useState<Post>({})
  const [related_posts, setRelatedPosts] = useState<Post[]>([])

  useEffect(() => {
    scrollViewRef.current.scrollToStart()
    setPost(props.navigation.getParam('post'))
  }, [props.navigation.getParam('post')])

  useEffect(() => {
    REST.get('posts?start=3&end=5')
      .then(res => {
        setRelatedPosts(res.data.posts)
      })
  }, [])

  return (
    <ImperativeScrollView ref={scrollViewRef}>
      <View style={styles.main}>
        <Image style={styles.photo} source={{uri: post.photo}} />
        <View style={styles.content}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.creator}>{post.creator}</Text>
          <Text style={styles.created_at}>{moment(post.created_at).fromNow()}</Text>
          <Text style={styles.description}>{post.description}</Text>
        </View>

        <View style={styles.relatedPosts}>
          <Text style={styles.relatedText}>You may be interested</Text>
          {related_posts.map(post => (
            <View key={post.id} style={styles.wrap}>
              <Divider />
              <PostCard post={post} navigation={props.navigation} />
            </View>
          ))}
        </View>
      </View>
    </ImperativeScrollView>
  );
}

PostDetailScreen.navigationOptions = (props) => ({
  title: 'Post Detail',
  headerStyle: {
    borderBottomWidth: 0,
  },
  headerLeft: () => (
    <GoBackArrow onPress={() => props.navigation.goBack()} />
  ),
});

export default PostDetailScreen;