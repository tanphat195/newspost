import React, { useState } from 'react';
import { View, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import ImagePicker from 'react-native-image-picker';
import {
  NavigationStackProp,
  NavigationStackScreenProps,
  NavigationStackScreenComponent
} from 'react-navigation-stack';
import Form from '../../components/molecules/Form';
import Input from '../../components/atoms/Input';
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

  return (
    <View style={styles.main}>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
        <ScrollView style={{flex: 1}}>
          <Form
            initialForm={{
              title: { value: post.id ? post.title : '', validate:[{isRequired: true, message: 'Title is required!'}] },
              description: {value: post.id ? post.description : '', validate: [{isRequired: true, message: 'Description is required!'}]}
            }}
            onPressTrigger={() => {}}
          >
            {(form, setFormKeys, onPress) => (
              <View style={styles.form}>
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
              </View>
            )}
          </Form>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

export default PostAddScreen;