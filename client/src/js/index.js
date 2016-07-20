import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import AppContainer from './app/AppContainer';
import GameContainer from './app/game/GameContainer';
import MenuContainer from './app/menu/MenuContainer';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import appReducer from './app/appReducer';

let store = createStore(appReducer);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/" component={AppContainer}>
          <IndexRoute component={MenuContainer}/>
          <Route path="game" component={GameContainer}/>
        </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);

