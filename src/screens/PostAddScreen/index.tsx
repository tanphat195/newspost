import React, { useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
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

const PostAddScreen: NavigationStackScreenComponent<Props> = (props) => {

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
      <View style={styles.title}>
        <Input
          placeholder="Input Title"
          style={{
            borderWidth: 0,
            borderBottomWidth: 1,
            borderRadius: 0,
            height: 60,
          }}
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
        />
      </View>

      <TouchableOpacity style={styles.photo} onPress={() => {}}>
        <SimpleLineIcons size={48} color="rgba(0,0,0,0.4)" name='picture' />
      </TouchableOpacity>
    </View>
  );
}

export default PostAddScreen;