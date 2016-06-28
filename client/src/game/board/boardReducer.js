import initialState from '../../app/initialState';
import * as SpaceActions from './space/spaceActions';
import spaceReducer from './space/spaceReducer';

export default (state = initialState.game.board, action) => {
  return state.map(row => (
    row.map(space => {
      switch (action.type) {
        case SpaceActions.SELECT:
          if (!space.selected && (space.row !== action.row || space.col !== action.col)) {
            return space;
          }
          return spaceReducer(space, action);
        default:
          return space;
      }
    })
  ))
};