import React, { useState, useRef } from 'react';
import { View, Text, ScrollView } from 'react-native';
import {
  NavigationStackProp,
  NavigationStackScreenProps,
  NavigationStackScreenComponent,
} from 'react-navigation-stack';
import { connect } from 'react-redux';
import Form from '../../components/molecules/Form';
import Button from '../../components/atoms/Button';
import Input from '../../components/atoms/Input';
import Switch from '../../components/atoms/Switch';
import Avatar from '../../components/atoms/Avatar';
import { primary } from '../../styles/color';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';

interface Props extends NavigationStackScreenProps {
  navigation: NavigationStackProp;
}

const ProfileSceen: NavigationStackScreenComponent<Props> = (props) => {
  const [enableEdit, setEnableEdit] = useState(false);

  const onEdit = () => {
    setEnableEdit(true);
  };

  return (
    <LinearGradient
      style={styles.main}
      colors={[primary, '#FFF']}
      start={{x: 0, y: 0}}
      end={{x:0.5, y: 1}}
    >
      <ScrollView>
        <View style={styles.banner} />
        <View style={styles.content}>
          <View style={styles.avatar}>
            <Avatar border={{width: 6, color: '#FFF'}} source={{uri: props.user.avatar}} size={150} />
          </View>

          {enableEdit ? (
            <RenderForm
              user={props.user}
              updateProfile={props.updateProfile}
              setEnableEdit={setEnableEdit}
            />
          ) : (
            <RenderInfo
              navigation={props.navigation}
              logout={props.logout}
              user={props.user}
              onEdit={onEdit}
            />
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

interface InfoProps {
  navigation: NavigationStackProp;
  logout: (any) => void;
  user: {
    full_name: string,
    email: string,
  };
  onEdit: () => void;
}

const RenderInfo: React.FC<InfoProps> = ({ navigation, logout, user, onEdit }) => {
  const handleLogout = () => {
    logout(() => {
      navigation.navigate('Auth')
    });
  };

  return (
    <View style={styles.infomation}>
      <Text style={styles.full_name}>{user.full_name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <View>
        <Button
          style={{
            borderRadius: 24,
            width: 130,
          }}
          type="default"
          onPress={onEdit}
        >
          Edit
        </Button>
      </View>

      <Button
        style={{
          borderRadius: 24,
          width: 130,
          marginTop: 15
        }}
        type="primary"
        onPress={handleLogout}
      >
        Logout
      </Button>
    </View>
  );
};

interface FormProps {
  user: {};
  updateProfile: Function;
  setEnableEdit: any;
}

const RenderForm: React.FC<FormProps> = ({ user, updateProfile, setEnableEdit }) => {
  const formRef = useRef(null);

  const onSubmit = () => {
    formRef.current.submit(onUpdate);
  };

  const onUpdate = (err, values) => {
    if (!err) {
      const newValues = {
        ...values,
        gender: values.gender ? 'male' : 'female'
      }
      updateProfile(newValues, (user) => {
        if (user.email) {
          setEnableEdit(false);
        }
      })
    }
  };

  const onCancel = () => {
    setEnableEdit(false);
  };

  return (
    <View style={styles.form}>
      <Form
        ref={formRef}
        initialForm={{
          full_name: {value: user.full_name ? user.full_name : '', validate: [{isRequired: true, message: 'Full name is required!'}]},
          gender: {value: user.gender === 'male' },
          phone_number: {value: user.phone_number ? user.phone_number : ''},
        }}
      >
        {(form, setFormKeys) => (
          <View style={styles.formWaraper}>
            <Input
              error={form['full_name'].error}
              value={form['full_name'].value}
              onChangeText={setFormKeys['full_name']}
              label={'Full Name'}
            />
            <Input
              error={form['phone_number'].error}
              value={form['phone_number'].value}
              onChangeText={setFormKeys['phone_number']}
              label={'Phone Number'}
            />
            <Switch
              label={'Gender:'}
              checkedText='Male'
              uncheckedText='Female'
              value={form['gender'].value}
              onChange={setFormKeys['gender']}
            />
            <View style={styles.action}>
              <Button type='primary' onPress={onSubmit}>Update</Button>
              <Button style={{marginLeft: 20}} onPress={onCancel}>Cancel</Button>
            </View>
          </View>
        )}
      </Form>
    </View>
  );
};

ProfileSceen.navigationOptions = () => ({
});

const mapState = state => ({
  user: state.user,
});

const matDispatch = dispatch => ({
  logout: callback => dispatch({
    type: 'WATCH_SIGN_OUT',
    callback,
  }),
  updateProfile: (payload, callback) => dispatch({
    type: 'WATCH_UPDATE_PROFILE',
    payload,
    callback,
  }),
});

export default connect(mapState, matDispatch)(ProfileSceen);