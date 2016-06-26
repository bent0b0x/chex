import * as GameActions from './GameActions';

export const score = (team) => {
  return {
    type: GameActions.GOAL,
    team: team
  }
}

export const tick = () => {
  return {
    type: GameActions.TICK
  }
}