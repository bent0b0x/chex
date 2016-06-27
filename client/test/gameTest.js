import * as GameActions from '../src/game/GameActions';
import { createStore } from 'redux';
import { appReducer } from '../src/app/appReducer';
import * as gameReducers from '../src/game/gameReducer.js';
import chai from 'chai';
import { initialState } from '../src/app/initialState';


const expect = chai.expect;

let state = initialState;

describe('games', () => {

  describe('reducers', () => {
    it('should return the initial state', () => {
      state = appReducer(undefined, {});
      expect(state).to.deep.equal(initialState);
    });

    it('should score a goal for the home team', () => {
      state.scoreboard = gameReducers.scoreboard(state.scoreboard, {
        type: GameActions.GOAL,
        team: state.scoreboard.home_team
      });
      expect(state.scoreboard.home_score).to.equal(1);
      expect(state.scoreboard.away_score).to.equal(0);
    });

    it('should score a goal for the away team', () => {
      state.scoreboard = gameReducers.scoreboard(state.scoreboard, {
        type: GameActions.GOAL,
        team: state.scoreboard.away_team
      });
      expect(state.scoreboard.home_score).to.equal(1);
      expect(state.scoreboard.away_score).to.equal(1);
    });

    it('should make the clock run', () => {
      state.clock = gameReducers.clock(state.clock, {
        type: GameActions.TOGGLE
      });
      expect(state.clock.running).to.be.true;
    });

    it('should tick to the end of a period', () => {
      for (let j = 0; j < 1200; j++) {
        state.clock = gameReducers.clock(state.clock, {
          type: GameActions.TICK
        });
      }
      expect(state.clock.time_remaining).to.equal('00:00');

      state.clock = gameReducers.clock(state.clock, {
        type: GameActions.TICK
      });
      expect(state.clock.running).to.be.false;
    });
  });
});