import * as Actions from './SpaceActions';

export default (state, action) => {
  console.log('reducing space');
  switch (action.type) {
    case Actions.SELECT:
      return Object.assign({}, state, {selected: !state.selected});
    default:
      return state;
  }
}