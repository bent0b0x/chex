import initialState from '../../../../src/js/app/initialState';
import Board from '../../../../src/js/app/game/board/Board';
import SpaceContainer from '../../../../src/js/app/game/board/space/SpaceContainer';
import chai from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

const expect = chai.expect;

describe('board', () => {
  describe('components', () => {
    let props;
    let output;
    let renderer;
    beforeEach(() => {
      props = {
        board: initialState.game.board
      };

      renderer = TestUtils.createRenderer();
      renderer.render(<Board {...props} />);
      output = renderer.getRenderOutput();
    });
    it('should render correctly', () => {
      expect(output.type).to.equal('div');
      expect(output.props.className).to.equal('board');

      let rows = output.props.children;

      expect(rows.length).to.equal(8);

      rows.forEach((row) => {
        expect(row.props.children.length).to.equal(8);
        let spaces = row.props.children;
        spaces.forEach((space) => {
          expect(space.type).to.equal(SpaceContainer);
        });
      });
    });
  });
});
