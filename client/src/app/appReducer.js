import * as GameActions from '../game/gameActions';
import { combineReducers } from 'redux';
import * as gameReducers from '../game/gameReducer';
import { reduceTime, updateScore } from '../game/gameReducer';
import { initialState } from './initialState';

export const appReducer = combineReducers(gameReducers);