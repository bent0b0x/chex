import * as app from '../src/app/app';
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
      state = gameReducers.updateScore(state, {
        type: GameActions.GOAL,
        team: state.home_team
      });
      expect(state.home_score).to.equal(1);
      expect(state.away_score).to.equal(0);
    });

    it('should score a goal for the away team', () => {
      state = gameReducers.updateScore(state, {
        type: GameActions.GOAL,
        team: state.away_team
      });
      expect(state.home_score).to.equal(1);
      expect(state.away_score).to.equal(1);
    });

    it('should tick down the clock appropriately', () => {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 1200; j++) {
          state = gameReducers.reduceTime(state, {
            type: GameActions.TICK
          });
        }
        expect(state.time_remaining).to.equal('00:00');
        expect(state.period).to.equal(i + 1);
        state = gameReducers.reduceTime(state, {
            type: GameActions.TICK
          });
      }
    });
  });
});