import initialState from '../../../src/js/app/initialState';
import gameReducer from '../../../src/js/app/game/gameReducer';
import * as SpaceActionCreators from '../../../src/js/app/game/board/space/SpaceActionCreators';
import chai from 'chai';

const expect = chai.expect;

const attemptMove = (state, {fromRow, fromCol}, {toRow, toCol})  => {
  state = gameReducer(state, SpaceActionCreators.select(fromRow, fromCol));
  state = gameReducer(state, SpaceActionCreators.select(toRow, toCol));
};  

let state;

describe('game', () => {
  describe('reducer', () => {
    it('should set the initial state when handed undefined', () => {
      state = gameReducer(undefined, {});
      expect(state).to.deep.equal(initialState.game);
    });
    it('should activate a space', () => {
      state = gameReducer(state, SpaceActionCreators.select(0, 0));
      expect(state.active_space).to.have.property('row', 0);
      expect(state.active_space).to.have.property('col', 0);
      expect(state.board[0][0].active).to.be.true;
    });
    it('should deactivate a space', () => {
      state = gameReducer(state, SpaceActionCreators.select(0, 0));
      expect(state.active_space).to.be.false;
      expect(state.board[0][0].active).to.be.false;
    });
    it('should not activate a space with no piece', () => {
      state = gameReducer(state, SpaceActionCreators.select(3, 3));
      expect(state.active_space).to.be.false;
      expect(state.board[3][3].active).to.be.false;
    });
    it('should move a piece to a new position', () => {
      const piece = state.board[1][0].piece;
      attemptMove(state, {fromRow: 1, fromCol: 0}, {toRow: 2, toCol: 0});
      expect(state.board[2][0].piece).to.deep.equal(piece);
      expect(state.board[1][0].piece).to.be.undefined;
    });
    it('should not move a piece to a space where its teammate already is', () => {
      const movingPiece = state.board[2][0].piece;
      const teammatePiece = state.board[0][0].piece;
      attemptMove(state, {fromRow: 2, fromCol: 0}, {toRow: 0, toCol: 0});
      expect(state.board[2][0].piece).to.deep.equal(movingPiece);
      expect(state.board[0][0].piece).to.deep.equal(teammatePiece);
    });
  });
});
