import initialState from '../../app/initialState';
import { combineReducers } from 'redux';
import board from './board/boardReducer';
import clock from './clock/clockReducer';
import * as SpaceActions from './board/space/SpaceActions';

const active_space = (state = initialState.game.active_space, action) => {
  let newState;
  switch (action.type) {
    case SpaceActions.SELECT:
      if (state && action.row === state.row && action.col === state.col) {
        newState = false;
      } else {
          newState = {
            row: action.row,
            col: action.col
          };
      }
      return newState;
    default:
      return state;
  }
};

const started = (state = initialState.game.started, action) => {
  return state;
};

const turn = (state = initialState.game.turn, action) => {
  return state;
};

const top = (state = initialState.game.top, action) => {
  return state;
};

export default combineReducers({
  active_space,
  started,
  turn,
  top,
  board,
  clock
});