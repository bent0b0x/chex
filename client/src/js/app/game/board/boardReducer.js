import initialState from '../../../app/initialState';
import * as SpaceActions from './space/SpaceActions';
import spaceReducer from './space/spaceReducer';

const handleSelect = (space, action) => {
  if (!space.piece || !space.selected && (space.row !== action.row || space.col !== action.col)) {
    return space;
  }
  return spaceReducer(space, action);
};

export default (state = initialState.game.board, action) => {
  return state.map(row => (
    row.map(space => {
      switch (action.type) {
        case SpaceActions.SELECT:
          return handleSelect(space, action);
        default:
          return space;
      }
    })
  ));
};