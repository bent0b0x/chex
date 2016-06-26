import { GOAL, TICK } from './GameActions';

export const updateScore  = (state, action) => {
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
}

export const reduceTime = (state, action) => {
  switch (action.type) {
    case TICK:
      let time_remaining = state.time_remaining;
      let period = state.period;
      let minutes = parseInt(time_remaining.split(':')[0]);
      let seconds = parseInt(time_remaining.split(':')[1]);
      if (seconds === 0) {
        if (minutes === 0) {
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
        period: period,
        time_remaining: `${minutes}:${seconds}`
      });
    default:
      return state;
  }
}

