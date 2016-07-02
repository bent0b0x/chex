import initialState from '../../app/initialState';
import { combineReducers } from 'redux';
import clock from './clock/clockReducer';
import validator from './util/moveValidator';
import * as SpaceActions from './board/space/SpaceActions';
import cloneBoard from './util/cloneBoard';


const handleSelect = (state, {row, col}) => {
  if (!state.active_space) {
    if (state.board[row][col].piece) {
      state.active_space = state.board[row][col];
      state.active_space.active = true;
    }
  } else {
    if (state.active_space.row === row && state.active_space.col === col) {
      state.board[row][col] = Object.assign({}, state.board[row][col], {active: false});
      state.active_space = false;
    } else {
      if (!state.board[row][col].piece || state.board[row][col].piece.color !== state.active_space.piece.color) {
        if (validator(state.active_space, state.board[row][col], state)) {
          state.board[row][col] = Object.assign({}, state.board[row][col]);
          state.board[row][col].piece = state.active_space.piece;
          state.board[state.active_space.row][state.active_space.col] = Object.assign({}, state.active_space, {piece: undefined, active: false});
          state.active_space = false;
        }
      }
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