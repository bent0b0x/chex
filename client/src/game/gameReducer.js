import { GOAL } from './GameActions';

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

  return state;
}

