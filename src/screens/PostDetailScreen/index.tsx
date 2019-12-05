import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image } from 'react-native';
import {
  NavigationStackProp,
  NavigationStackScreenProps,
  NavigationStackScreenComponent
} from 'react-navigation-stack';
import moment from 'moment';
import ImperativeScrollView, { ImperativeScrollViewHandles } from '../../components/atoms/ImperativeScrollView';
import PostCard from '../../components/molecules/PostCard';
import Divider from '../../components/atoms/Divider';
import Button from '../../components/atoms/Button';
import GoBackArrow from '../../components/atoms/GoBackArrow';
import REST from '../../utils/api';
import styles from './styles';
import MapView from 'react-native-maps';

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
          <Button
            style={{marginTop: 20, width: 150, borderRadius: 9}}
            type='primary'
          >
            Add to Cart
          </Button>
        </View>
        <View style={styles.mapsWrapper}>
          <RenderMap />
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

const RenderMap = () => {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <MapView
      style={styles.maps}
      region={region}
    />
  );
};

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