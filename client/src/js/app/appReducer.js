import { combineReducers } from 'redux';
import game from './game/gameReducer';
import { initialState } from './initialState';

export default combineReducers(
  { game }
);