import { combineReducers, createStore } from 'redux';
import * as GameActions from '../game/GameActions';
import { reduceTime, updateScore } from '../game/gameReducer';
import { tick, score } from '../game/Game';


const initialState = {
  home_team: 'New York Islanders',
  away_team: 'New York Rangers',
  home_score: '0',
  away_score: '0',
  period: 1,
  time_remaining: '20:00'
};

const app = (state = initialState, action) => {
  switch(action.type) {
    case GameActions.TICK:
      return Object.assign({}, state, reduceTime(state, action));
    case GameActions.GOAL:
      return Object.assign({}, state, updateScore(state, action));
    default:
      return state;
  } 
};

let store = createStore(app);

console.log(store.getState());

let unsubscribe = store.subscribe(() => {
    let state = store.getState();
    console.log(state.time_remaining, state.period);
});

store.dispatch(score('New York Islanders'));
store.dispatch(score('New York Rangers'));

store.dispatch(tick());


store.dispatch(score());

unsubscribe();

