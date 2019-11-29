import React from 'react';
import { Provider } from 'react-redux';
import store from './src/stores';
import AppContainer from './src/navigations/index';

export default () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};