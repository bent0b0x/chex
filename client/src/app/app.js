import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import { App } from './AppView';
import { render } from 'react-dom';
import * as GameActions from '../game/GameActions';
import { appReducer } from './appReducer';
import { tick, score } from '../game/Game';


let store = createStore(appReducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);






