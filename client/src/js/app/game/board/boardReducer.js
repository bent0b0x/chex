import initialState from '../../../app/initialState';
import * as SpaceActions from './space/SpaceActions';
import spaceReducer from './space/spaceReducer';

const handleSelect = (space, action) => {
  if (!space.piece || (!space.selected && (space.row !== action.row || space.col !== action.col))) {
    return space;
  }
  return Object.assign({}, space, { selected: !space.selected });
};

const handleMove = (space, action, board) => {
  const piece = board.active_space.piece;
  if (space.selected) {
    return Object.assign({}, space, { piece: undefined });
  }
  return Object.assign({}, space, { piece });
};

export default (state = initialState.game.board, action) => {
  return state.map(row => (
    row.map(space => {
      switch (action.type) {
        case SpaceActions.SELECT:
          return handleSelect(space, action);
        case SpaceActions.MOVE_PIECE:
          return handleMove(space, action, state);
        default:
          return space;
      }
    })
  ));
};