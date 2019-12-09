import React, { useState, useEffect, useRef, PureComponent, createRef } from 'react';
import { View, TouchableOpacity, Image, ScrollView } from 'react-native';
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
import Camera from '../../components/molecules/Camera';

interface Props extends NavigationStackScreenProps {
  navigation: NavigationStackProp;
}

type Post = {
  id: number,
  title: string,
  address: string,
  description: string,
  photo: string,
}

const PostAddScreen: NavigationStackScreenComponent<Props> = (props) => {
  const formRef = useRef(null);
  const cameraRef = useRef(null);
  const [post, setPost] = useState<Post>((
    props.navigation.state.params && props.navigation.state.params.post)
    ? props.navigation.state.params.post : {});
  const [openCamera, setOpenCamera] = useState(false);

  useEffect(() => {
    props.navigation.setParams({ onSubmit });
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

  const onSubmit = () => {
    formRef.current.submit(handleDone);
  };

  const handleDone = (err, values) => {
    if (!err) {
      if (post.id) {
        REST.put('posts', {...post, ...values})
          .then(res => {
            props.navigation.navigate('PostManage');
          })
          .catch(err => {
            console.log(err.response.data);
          });
      } else {
        REST.post('posts', values)
          .then(res => {
            props.navigation.navigate('PostManage');
          })
          .catch(err => {
            console.log(err.response.data);
          });
      }
    }
  };

  const handleOpenCamera = () => {
    cameraRef.current.openCamera();
  };

  const getFile = file => {
    setPost({
      ...post,
      photo: file,
    });
  };

  return (
    <ScrollView>
      <View style={styles.main}>
        <Form
          ref={formRef}
          initialForm={{
            title: { value: post.title ? post.title : '', validate:[{isRequired: true, message: 'Title is required!'}] },
            address: { value: post.address ? post.address : ''},
            description: {value: post.description ? post.description : '', validate: [{isRequired: true, message: 'Description is required!'}]}
          }}
        >
          {(form, setFormKeys, onPress) => (
            <>
              <View style={styles.title}>
                <Input
                  label="Title"
                  style={{
                    height: 60,
                  }}
                  value={form['title'].value}
                  error={form['title'].error}
                  onChangeText={setFormKeys['title']}
                />
              </View>

              <View style={styles.title}>
                <Input
                  label="Address"
                  style={{
                    height: 60,
                  }}
                  value={form['address'].value}
                  error={form['address'].error}
                  onChangeText={setFormKeys['address']}
                />
              </View>
        
              <View>
                <Input
                  label="Write SomeThing About This Description..."
                  multiline={true}
                  numberOfLines={8}
                  style={{
                    height: 240,
                  }}
                  value={form['description'].value}
                  error={form['description'].error}
                  onChangeText={setFormKeys['description']}
                />
              </View>

              <TouchableOpacity style={styles.photo} onPress={handleOpenCamera}>
                {post.id ? (
                  <Image style={{width: '100%', height: '100%'}} source={{uri: post.photo}} />
                ) : (
                  <SimpleLineIcons size={48} color="rgba(0,0,0,0.4)" name='picture' />
                )}
              </TouchableOpacity>

              <Camera ref={cameraRef} getFile={getFile} />
            </>
          )}
        </Form>
      </View>
    </ScrollView>
  );
};

PostAddScreen.navigationOptions = ({ navigation }) => {
  const params = navigation.state.params || {};
  const post = params.post || {};

  const onSubmit = () => {
    if (navigation.state.params.onSubmit) {
      navigation.state.params.onSubmit();
    }
  };

  return {
    title: post.id ? 'Edit Post' : 'Add Post',
    headerLeft: () => (
      <GoBackArrow onPress={() => navigation.goBack()} />
    ),
    headerRight: () => (
      <View>
        <Button color={primary} onPress={onSubmit}>DONE</Button>
      </View>
    ),
    headerStyle: {
      borderBottomColor: 'rgba(0,0,0,0.1)',
    }
  };
};

export default PostAddScreen;