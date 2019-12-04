import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Image, Alert } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import ImagePicker from 'react-native-image-picker';
import {
  NavigationStackProp,
  NavigationStackScreenProps,
  NavigationStackScreenComponent
} from 'react-navigation-stack';
import Form from '../../components/molecules/Form';
import Input from '../../components/atoms/Input';
import GoBackArrow from '../../components/atoms/GoBackArrow';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Button } from 'react-native-paper';
import { primary } from '../../styles/color';
import REST from '../../utils/api';
import styles from './styles';

interface Props extends NavigationStackScreenProps {
  navigation: NavigationStackProp;
}

type Post = {
  id: number,
  title: string,
  description: string,
  photo: string,
}

const PostAddScreen: NavigationStackScreenComponent<Props> = (props) => {
  const [post, setPost] = useState<Post>((
    props.navigation.state.params && props.navigation.state.params.post) ? props.navigation.state.params.post : {});

  useEffect(() => {
    props.navigation.setParams({ handleDone })
  }, []);

  // const launchImageLibrary = () => {
  //   let options = {
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };
  //   ImagePicker.launchImageLibrary(options, (response) => {
  //     console.log('Response = ', response);

  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);
  //       alert(response.customButton);
  //     } else {
  //       const source = { uri: response.uri };
  //       console.log('response', JSON.stringify(response));
  //       this.setState({
  //         filePath: response,
  //         fileData: response.data,
  //         fileUri: response.uri
  //       });
  //     }
  //   });
  // };

  const handleDone = () => {
    if (post.id) {
      REST.put('posts', {abc: 123, def: 456, id: "1"})
        .then(res => {
          console.log(res.data);
          Alert.alert('dsada', 'fdsfs')
        })
        .catch(err => {
          console.log(err.response.data);
        });
    } else {
      REST.post('posts', {abc: 'dfsfs', def: 'hghfhj  fdg fdgd'})
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err.response.data);
        });
    }
  };

  return (
    <View style={styles.main}>
      <Form
        initialForm={{
          title: { value: post.id ? post.title : '', validate:[{isRequired: true, message: 'Title is required!'}] },
          description: {value: post.id ? post.description : '', validate: [{isRequired: true, message: 'Description is required!'}]}
        }}
        onPressTrigger={() => {}}
      >
        {(form, setFormKeys, onPress) => (
          <>
            <View style={styles.title}>
              <Input
                placeholder="Input Title"
                style={{
                  borderWidth: 0,
                  borderBottomWidth: 1,
                  borderRadius: 0,
                  height: 60,
                }}
                value={form['title'].value}
                error={form['title'].error}
                onChangeText={setFormKeys['title']}
              />
            </View>
      
            <View>
              <Input
                placeholder="Write SomeThing About This Description..."
                multiline={true}
                numberOfLines={8}
                style={{
                  height: 240,
                  borderWidth: 0,
                  borderRadius: 0,
                }}
                value={form['description'].value}
                error={form['description'].error}
                onChangeText={setFormKeys['description']}
              />
            </View>

            <View style={styles.action}>
              <TouchableOpacity style={styles.photo} onPress={() => {}}>
                {post.id ? (
                  <Image style={{width: '100%', height: '100%'}} source={{uri: post.photo}} />
                ) : (
                  <SimpleLineIcons size={48} color="rgba(0,0,0,0.4)" name='picture' />
                )}
              </TouchableOpacity>
            </View>
          </>
        )}
      </Form>
    </View>
  );
}

PostAddScreen.navigationOptions = ({ navigation }) => {
  const params = navigation.state.params || {};
  const post = params.post || {};

  const handleDone = () => {
    if (navigation.state.params.handleDone) {
      navigation.state.params.handleDone();
    }
  };

  return {
    title: post.id ? 'Edit Post' : 'Add Post',
    headerLeft: () => (
      <GoBackArrow onPress={() => navigation.goBack()} />
    ),
    headerRight: () => (
      <View>
        <Button color={primary} onPress={handleDone}>DONE</Button>
      </View>
    ),
    headerStyle: {
      borderBottomColor: 'rgba(0,0,0,0.1)',
    }
  }
};

export default PostAddScreen;