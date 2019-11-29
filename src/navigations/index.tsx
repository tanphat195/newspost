import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import createAnimatedSwitchNavigator  from 'react-navigation-animated-switch';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

const SwitchNavigator = createAnimatedSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

export default createAppContainer(SwitchNavigator);