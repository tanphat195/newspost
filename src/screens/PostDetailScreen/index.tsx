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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import REST from '../../utils/api';
import styles from './styles';
import MapView, { Marker } from 'react-native-maps';
<<<<<<< HEAD
import { connect } from 'react-redux';
=======
>>>>>>> 2ffd8995bf16a76d300a2e7e8bf3aa71217b7031

type Location = {
  lat: number,
  lng: number,
  latitudeDelta?: number,
  longitudeDelta?: number,
};

interface Post {
  id: string;
  title: string;
  description: string;
  photo: string;
  created_at: string;
  creator: string;
  location?: Location;
}

interface Props extends NavigationStackScreenProps {
  navigation: NavigationStackProp
  post: Post
}

const PostDetailScreen: NavigationStackScreenComponent<Props> = (props) => {
  const scrollViewRef = useRef<ImperativeScrollViewHandles>(null);
  const [post, setPost] = useState({});
  const [related_posts, setRelatedPosts] = useState<Post[]>([]);

  useEffect(() => {
    scrollViewRef.current.scrollToStart();
    setPost(props.navigation.getParam('post'));
  }, [props.navigation.getParam('post')]);

  useEffect(() => {
    REST.get('posts?start=3&end=5')
      .then(res => {
        setRelatedPosts(res.data.posts);
      });
  }, []);

  const handleAddToCart = () => {
<<<<<<< HEAD
    props.addCart(post);
  };

  const handleRemoveCart = () => {
    props.removeCart(post.id);
=======

>>>>>>> 2ffd8995bf16a76d300a2e7e8bf3aa71217b7031
  };

  return (
    <ImperativeScrollView ref={scrollViewRef}>
      <View style={styles.main}>
        <Image style={styles.photo} source={{uri: post.photo}} />
        <View style={styles.content}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.creator}>{post.creator}</Text>
          <Text style={styles.created_at}>{moment(post.created_at).fromNow()}</Text>
          <Text style={styles.description}>{post.description}</Text>
<<<<<<< HEAD

          {props.carts.map(item => item.id).includes(post.id) ? (
            <Button
              style={{marginVertical: 20}}
              type='secondary'
              onPress={handleRemoveCart}
            >
              Remove Cart
            </Button>
          ) : (
            <Button
              style={{marginVertical: 20}}
              type='primary'
              onPress={handleAddToCart}
            >
              Add to Cart
            </Button>
          )}
=======
          <Button
            style={{marginVertical: 20}}
            type='primary'
            onPress={handleAddToCart}
          >
            Add to Cart
          </Button>
>>>>>>> 2ffd8995bf16a76d300a2e7e8bf3aa71217b7031
        </View>

        <View style={styles.addressWrapper}>
          <MaterialIcons size={20} color='#fd5068' name='location-on' />
          <Text style={styles.address}>: {post.address}</Text>
        </View>

        {post.location && (
          <View style={styles.mapsWrapper}>
            <RenderMap
              location={post.location}
              creator={post.creator}
              address={post.address}
            />
          </View>
        )}

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
};

interface MapProps {
  location: Location;
  address: string;
  creator: string;
}

const RenderMap: React.FC<MapProps> = React.memo((props) => {
  const [region, setRegion] = useState({
    latitude: 1,
    longitude: 1,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });
  const [address, setAddress] = useState('');
  const [creator, setCreator] = useState('');

  useEffect(() => {
    setRegion({
      latitude: props.location.lat || 0,
      longitude: props.location.lng || 0,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    });
    setAddress(props.address);
    setCreator(props.creator);
  }, [props.location]);

  return (
    <MapView
      style={styles.maps}
      region={region}
    >
      <Marker
        coordinate={{
          latitude: region.latitude,
          longitude: region.longitude,
        }}
        title={creator}
        description={address}
      >
        <MaterialIcons size={32} color='#fd5068' name='location-on' />
      </Marker>
    </MapView>
  );
});

PostDetailScreen.navigationOptions = (props) => ({
  title: 'Post Detail',
  headerStyle: {
    borderBottomWidth: 0,
  },
  headerLeft: () => (
    <GoBackArrow onPress={() => props.navigation.goBack()} />
  ),
});

const mapState = state => ({
  carts: state.carts,
});

const mapDispatch = dispatch => ({
  addCart: (cart) => dispatch({
    type: 'WATCH_ADD_CART',
    payload: cart,
  }),
  removeCart: id => dispatch({
    type: 'WATCH_REMOVE_CART',
    payload: id,
  }),
});

export default connect(mapState, mapDispatch)(PostDetailScreen);