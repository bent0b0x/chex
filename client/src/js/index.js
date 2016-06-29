import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import App from './app/App';
import { render } from 'react-dom';
import appReducer from './app/appReducer';

let store = createStore(appReducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

