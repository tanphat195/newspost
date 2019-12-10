import React, { useRef } from 'react';
import { View, Text, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import { NavigationStackProp, NavigationStackScreenComponent } from 'react-navigation-stack';
import styles from './styles';
import Form, { } from '../../components/molecules/Form';
import Input from '../../components/atoms/Input';
import Button from '../../components/atoms/Button';
import { connect } from 'react-redux';

const SignInScreen: NavigationStackScreenComponent = (props) => {
  const redirectRegisterScreen = () => {
    props.navigation.navigate('SignUp');
  }

  return (
    <KeyboardAvoidingView behavior="padding" enabled style={styles.keyboard}>
      <View style={styles.main}>
        <Text style={styles.title}>WELLCOME</Text>
        
        <View style={styles.form}>
          <RenderForm navigation={props.navigation} login={props.login} />
          
          <View style={styles.registerWrapText}>
            <Text style={styles.dontHaveAccountText}>Dont have an account? </Text>
            <TouchableOpacity onPress={redirectRegisterScreen}>
              <Text style={styles.registerText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}
interface FormProps {
  navigation: NavigationStackProp;
  login: Function
}

const RenderForm: React.FC<FormProps> = (props) => {
  const formRef = useRef(null);

  const onSubmit = () => {
    formRef.current.submit(handleLogin);
  }

  const handleLogin = (err, values) => {
    if (!err) {
      props.login(values, (error, msg) => {
        if (error) {
          Alert.alert(
            'Login Fail',
            msg,
            [
              {text: 'Forgot password', onPress: () => console.log('Ask me later pressed')},
              {text: 'Sign up', onPress: () => { props.navigation.navigate('SignUp') }},
              {text: 'Retry', onPress: () => {}, style: 'cancel'},
            ],
          );
        } else {
          props.navigation.navigate('App');
        }
      });
    }
  };

  return (
    <Form
      ref={formRef}
      initialForm={{
        email: {value: '', validate: [{isEmail: true, message: 'Email invalid!'}]},
        password: {value: '', validate: [{ min: 6, message: 'Min 6 characters!'}]},
      }}
    >
      {(form, setFormKeys) => (
        <>
          <Input
            label='Email'
            error={form['email'].error}
            value={form['email'].value}
            onChangeText={setFormKeys['email']}
            keyboardType='email-address'
          />
          <Input
            label='Password'
            secureTextEntry={true}
            error={form['password'].error}
            value={form['password'].value}
            onChangeText={setFormKeys['password']}
          />
          <Button style={{height: 46}} type='primary' onPress={onSubmit}>Login</Button>
        </>
      )}
    </Form>
  );
}

SignInScreen.navigationOptions = () => ({
  header: null,
});

const mapDispatch = dispatch => ({
  login: (user, callback) => dispatch({
    type: 'WATCH_SIGN_IN',
    payload: user,
    callback,
  }),
});

export default connect(null, mapDispatch)(SignInScreen);