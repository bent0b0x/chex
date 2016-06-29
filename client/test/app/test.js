import initialState from '../../src/js/app/initialState';
import appReducer from '../../src/js/app/appReducer';
import chai from 'chai';

const expect = chai.expect;

describe('app', () => {
  describe('reducer', () => {
    it('should set the initial state when handed undefined', () => {
      expect(appReducer(undefined, {})).to.deep.equal(initialState);
    });
  });
});
