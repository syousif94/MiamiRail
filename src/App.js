import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '~/store';
import MapView from '~/containers/MapView';

export default () =>
  <Provider store={store}>
    <MapView />
  </Provider>;
