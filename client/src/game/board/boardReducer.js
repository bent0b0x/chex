import initialState from '../../app/initialState';
import spaceReducer from './space/spaceReducer';

export default (state = initialState.game.board, action) => {
  let newState = [];
  state.forEach(row => {
    const newRow = [];
    newState.push(newRow);
    row.forEach(space => {
      newRow.push(spaceReducer(space, action));
    });
  });
  return newState;
};