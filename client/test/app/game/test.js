import initialState from '../../../src/js/app/initialState';
import gameReducer from '../../../src/js/app/game/gameReducer';
import chai from 'chai';

const expect = chai.expect;

describe('game', () => {
  describe('reducer', () => {
    it('should set the initial state when handed undefined', () => {
      expect(gameReducer(undefined, {})).to.deep.equal(initialState.game);
    });
  });
});
