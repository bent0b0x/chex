import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import { App } from './AppView';
import { render } from 'react-dom';
import { appReducer } from './appReducer';


let store = createStore(appReducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);






