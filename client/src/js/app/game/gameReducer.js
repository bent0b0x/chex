import initialState from '../../app/initialState';
import { combineReducers } from 'redux';
import clock from './clock/clockReducer';
import validator from './util/moveValidator';
import * as SpaceActions from './board/space/SpaceActions';

const handleSelect = (state, {row, col}) => {
  console.log(row, col);
  if (!state.active_space) {
    state.active_space = state.board[row][col];
    state.active_space.active = true;
  } else {
    if (state.active_space.row === row && state.active_space.col === col) {
      state.active_space.active = false;
      state.active_space = false;
    }
  }
  return state;
};


export default (state = initialState.game, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case SpaceActions.SELECT:
      return handleSelect(newState, action);
    default:
      return newState;
  }
};