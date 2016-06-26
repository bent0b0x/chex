import { combineReducers, createStore } from 'redux';
import { updateScore } from '../game/gameReducer';
import { score } from '../game/Game';


const initialState = {
  home_team: 'New York Islanders',
  away_team: 'New York Rangers',
  home_score: '0',
  away_score: '0'
};

const app = (state = initialState, action) => {
  return updateScore(state, action);
};

let store = createStore(app);

console.log(store.getState());

let unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(score('New York Islanders'));
store.dispatch(score('New York Rangers'));

store.dispatch(score());

