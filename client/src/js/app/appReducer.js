import { combineReducers } from 'redux';
import game from './game/gameReducer';
import initialState from './initialState';

const menu = (state = initialState.menu, action) => {
  return state;
};

const config = (state = initialState.config, action) => {
  return state;
};

export default combineReducers(
  {
    game,
    menu,
    config
  }
);