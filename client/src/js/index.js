import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import AppContainer from './app/AppContainer';
import { render } from 'react-dom';
import appReducer from './app/appReducer';

let store = createStore(appReducer);

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);

