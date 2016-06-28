import initialState from '../app/initialState';
import { combineReducers } from 'redux';
import board from './board/boardReducer';
import clock from './clock/clockReducer';
import * as SpaceActions from './board/space/SpaceActions';

const active_piece = (state = initialState.game.active_space, action) => {
  let newState;
  switch (action.type) {
    case SpaceActions.SELECT:
      if (state && action.row === state.row && action.col === state.col) {
        newState = false;
      } else {
        newState = {
          row: action.row,
          col: action.col
        }
      }
      console.log(newState);
      return newState;
    default:
      return state;
  }
};

export default combineReducers({
  active_piece,
  board,
  clock
})