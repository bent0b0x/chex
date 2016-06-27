import { GOAL, TICK, TOGGLE } from './GameActions';
import { initialState } from '../app/initialState';

export const scoreboard  = (state = initialState.scoreboard, action) => {
  switch (action.type) {
    case GOAL:
      let scoreboard = {
        home_score: state.home_score,
        away_score: state.away_score
      };
      if (action.team === state.home_team) {
        scoreboard.home_score++;
      } else if (action.team === state.away_team) {
        scoreboard.away_score++;
      }
      return Object.assign({}, state, scoreboard);
    default:
      return state;
  }

  return state;
}


const tick = (state = initialState.clock, action) => {
  if (!state.running) {
    return state;
  }
  let time_remaining = state.time_remaining;
  let period = state.period;
  let running = state.running;
  let minutes = parseInt(time_remaining.split(':')[0]);
  let seconds = parseInt(time_remaining.split(':')[1]);
  if (seconds === 0) {
    if (minutes === 0) {
      running = false;
      if (period !== 3) {
        period++;
        seconds = '00';
        minutes = '20';
      }
    } else {
      minutes--;
      seconds = '59'
    }
  } else {
    seconds--;
  }
  minutes = '' + minutes;
  seconds = '' + seconds;
  if (minutes.length === 1) {
    minutes = '0' + minutes;
  }
  if (seconds.length === 1) {
    seconds = '0' + seconds;
  }

  return Object.assign({}, state, {
      period,
      running,
      time_remaining: `${minutes}:${seconds}`
  });
};

export const clock = (state = initialState.clock, action) => {
  switch (action.type) {
    case TICK:
      return tick(state, action);
    case TOGGLE:
      return Object.assign({}, state, {running: !state.running});
    default:
      return state;
  }

  return state;
}

