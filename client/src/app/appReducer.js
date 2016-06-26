import * as GameActions from '../game/gameActions';
import { reduceTime, updateScore } from '../game/gameReducer';
import { initialState } from './initialState';

export const appReducer = (state = initialState, action) => {
  switch(action.type) {
    case GameActions.TICK:
      return Object.assign({}, state, reduceTime(state, action));
    case GameActions.GOAL:
      return Object.assign({}, state, updateScore(state, action));
    default:
      return state;
  } 
};