import * as Actions from './SpaceActions';

export default (state, action) => {
  console.log(state, action);
  switch (action.type) {
    case Actions.SELECT:
      if (!state.selected && (action.row !== state.row || action.col !== state.col)) {
        return state;
      }
      return Object.assign({}, state, {selected: !state.selected});
    default:
      return state;
  }
}