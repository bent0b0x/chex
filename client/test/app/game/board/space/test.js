import chai from 'chai';
import * as creators from '../../../../../src/js/app/game/board/space/SpaceActionCreators';
import * as actions from '../../../../../src/js/app/game/board/space/SpaceActions';
import reducer from '../../../../../src/js/app/game/board/space/spaceReducer';

const expect = chai.expect;

const mockSpace = {
  row: 0,
  col: 0,
  selected: false,
  piece: undefined
};

describe('space', () => {
  describe('action creators', () => {
    it('should successfully create a select action', () => {
      expect(creators.select(0, 0)).to.deep.equal({
        type: actions.SELECT,
        row: 0,
        col: 0
      });
    });
  });

  describe('reducer', () => {
    it('should select a space', () => {
      expect(reducer(mockSpace, {
        type: actions.SELECT
      }).selected).to.be.true;
    });
    it('should deselect a space', () => {
      mockSpace.selected = true;
      expect(reducer(mockSpace, {
        type: actions.SELECT
      }).selected).to.be.false;
    });
  });
});
