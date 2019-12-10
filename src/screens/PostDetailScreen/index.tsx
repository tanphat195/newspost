import React, { useState, useEffect, useRef, useMemo } from 'react';
import { View, Text, Image, Alert, Linking } from 'react-native';
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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import REST from '../../utils/api';
import styles from './styles';
import MapView, { Marker, Polyline, Polygon } from 'react-native-maps';
import { connect } from 'react-redux';
import { getDistance } from '../../utils';

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
  const [post, setPost] = useState<Post>({});
  const [related_posts, setRelatedPosts] = useState<Post[]>([]);
  const [deviceLocation, setDeviceLocation] = useState({latitude: 0, longitude: 0});

  useEffect(() => {
    scrollViewRef.current.scrollToStart();
    getDeviceLocation();
    setPost(props.navigation.getParam('post'));
  }, [props.navigation.getParam('post')]);

  useEffect(() => {
    REST.get('posts?start=3&end=5')
      .then(res => {
        setRelatedPosts(res.data.posts);
      });
  }, []);

  const getDeviceLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setDeviceLocation(position.coords);
      },
      error => {
        Alert.alert(
          error.message,
          '',
          [
            {text: 'None'},
            {text: 'Go to Setting', onPress: () => {
              Linking.openURL('App-prefs:root=Privacy');
            }},
          ],
        );
      },
      // { enableHighAccuracy: true, timeout: 20000, maximumAge: 200 }
    );
  }

  const handleAddToCart = () => {
    props.addCart(post);
  };

  const handleRemoveCart = () => {
    props.removeCart(post.id);
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
        </View>

        {post.location && (
          <RenderMap
            location={post.location}
            creator={post.creator}
            address={post.address}
            deviceLocation={deviceLocation}
          />
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
  deviceLocation: {
    latitude: number,
    longitude: number,
  };
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

  const distance = useMemo(() => getDistance(
    {lat1: props.deviceLocation.latitude, long1: props.deviceLocation.longitude},
    {lat2: region.latitude, long2: region.longitude},
    'K',
  ), [props.deviceLocation, region]);

  useEffect(() => {
    setRegion({
      latitude: props.location.lat || 0,
      longitude: props.location.lng || 0,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    });
    setAddress(props.address);
    setCreator(props.creator);
  }, [props.location, props.address, props.creator]);

  return (
    <View style={styles.mapsWrapper}>
      <View style={styles.addressWrapper}>
        <MaterialIcons size={20} color='#fd5068' name='location-on' />
        <Text style={styles.address}> {address}</Text>
      </View>
      <View style={styles.addressWrapper}>
        <MaterialCommunityIcons size={20} color='#fd5068' name='map-marker-distance' />
        <Text style={styles.address}> Distance to you {parseFloat(distance.toFixed(1))} km</Text>
      </View>
      <MapView
        style={styles.maps}
        region={region}
      >
        {props.deviceLocation.latitude !== 0 && props.deviceLocation.longitude !== 0 && (
          <Polyline
            coordinates={[
              { latitude: props.deviceLocation.latitude, longitude: props.deviceLocation.longitude },
              { latitude: region.latitude, longitude: region.longitude },
            ]}
            strokeColor="#000"
            strokeColors={[
              '#41BAEE',
              '#f4115d',
            ]}
            strokeWidth={3}
          />
        )}
        <Marker
          coordinate={{
            latitude: props.deviceLocation.latitude,
            longitude: props.deviceLocation.longitude,
          }}
          title={creator}
          description={address}
        >
          <FontAwesome5 size={20} color='#41BAEE' name='user-alt' />
        </Marker>
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          title={creator}
          description={address}
        >
          <MaterialIcons size={28} color='red' name='location-on' />
        </Marker>
      </MapView>
    </View>
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