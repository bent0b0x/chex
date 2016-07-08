import { combineReducers } from 'redux';
import game from './game/gameReducer';
import initialState from './initialState';

const config = (state = initialState.config, action) => {
  return state;
};

export default combineReducers(
  {
    game,
    config
  }
);