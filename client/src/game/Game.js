import * as GameActions from './GameActions';

export const score = (team) => {
  return {
    type: GameActions.GOAL,
    team: team
  }
}