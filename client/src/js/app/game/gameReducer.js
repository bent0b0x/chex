import initialState from '../../app/initialState';
import { combineReducers } from 'redux';
import clock from './clock/clockReducer';
import * as Pieces from './util/Pieces';
import validator from './util/moveValidator';
import * as checkValidator from './util/checkValidator';
import * as SpaceActions from './board/space/SpaceActions';
import * as colors from './util/PieceColors';

const handleSelect = (state, { row, col }) => {
  if (!state.active_space) {
    if (state.board[row][col].piece && state.board[row][col].piece.color === state.turn) {
      state.active_space = state.board[row][col];
      state.active_space.active = true;
    }
  } else {
    if (state.active_space.row === row && state.active_space.col === col) {
      state.board[row][col] = Object.assign({}, state.board[row][col], { active: false });
      state.active_space = false;
    } else {
      if ((!state.board[row][col].piece || state.board[row][col].piece.color !== state.active_space.piece.color) && state.turn === state.active_space.piece.color) {
        const validatorResult = validator(state.active_space, state.board[row][col], state);
        if (validatorResult) {
          const checks = checkValidator.preMove(state, state.active_space, state.board[row][col]);
          if (!checks.find((check) => check.color === state.active_space.piece.color)) {
            state.board[row][col] = Object.assign({}, state.board[row][col]);
            state.board[row][col].piece = state.active_space.piece;
            state.board[row][col].piece.hasMoved = true;
            if (state.board[row][col].piece.type === Pieces.KING) {
              state.board.kings[state.board[row][col].piece.color] = { row, col };
            }
            state.board[state.active_space.row][state.active_space.col] = Object.assign({}, state.active_space, { piece: undefined, active: false });
            state.active_space = false;
            state.turn = state.turn === colors.WHITE ? colors.BLACK : colors.WHITE;
            if (typeof validatorResult === 'object') {
              state.board[validatorResult.destSpace.row][validatorResult.destSpace.col].piece = validatorResult.rookSpace.piece;
              state.board[validatorResult.destSpace.row][validatorResult.destSpace.col].piece.hasMoved = true;
              state.board[validatorResult.rookSpace.row][validatorResult.rookSpace.col].piece = undefined;
            }
            checkValidator.postMove(state);
          }
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