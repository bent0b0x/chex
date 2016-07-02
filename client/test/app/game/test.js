import initialState from '../../../src/js/app/initialState';
import gameReducer from '../../../src/js/app/game/gameReducer';
import * as SpaceActionCreators from '../../../src/js/app/game/board/space/SpaceActionCreators';
import generateBoard from '../../../src/js/util/generateBoard';
import chai from 'chai';

const expect = chai.expect;

const attemptMove = (state, fromRow, fromCol, toRow, toCol)  => {
  state = gameReducer(state, SpaceActionCreators.select(fromRow, fromCol));
  state = gameReducer(state, SpaceActionCreators.select(toRow, toCol));
};  

let state;

describe('game', () => {
  describe('reducer', () => {
    beforeEach(() => {
      if (!state) {
        return;
      }
      state.board = generateBoard();
      state.active_space = false;
    });
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
      attemptMove(state, 1, 0, 2, 0);
      expect(state.board[2][0].piece).to.deep.equal(piece);
      expect(state.board[1][0].piece).to.be.undefined;
    });
    it('should not move a piece to a space where its teammate already is', () => {
      const movingPiece = state.board[1][0].piece;
      const teammatePiece = state.board[0][0].piece;
      attemptMove(state, 1, 0, 0, 0);
      expect(state.board[1][0].piece).to.deep.equal(movingPiece);
      expect(state.board[0][0].piece).to.deep.equal(teammatePiece);
    });
    describe('move validators', () => {
      describe('pawns', () => {
        it('should permit a pawn to move one space, vertically', () => {
          const piece = state.board[1][0].piece;
          attemptMove(state, 1, 0, 2, 0);
          expect(state.board[2][0].piece).to.deep.equal(piece);
          expect(state.board[1][0].piece).to.be.undefined;
        });
        it ('should not permit a pawn to move more than one space, vertically', () => {
          const piece = state.board[1][0].piece;
          attemptMove(state, 1, 0, 4, 0);
          expect(state.board[1][0].piece).to.deep.equal(piece);
          expect(state.board[4][0].piece).to.be.undefined;
        });
        it('should not permit a pawn to move horizontally', () => {
          const piece = state.board[3][0].piece;
          attemptMove(state, 3, 0, 3, 1);
          expect(state.board[3][0].piece).to.deep.equal(piece);
          expect(state.board[3][1].piece).to.be.undefined;
        });
        it('should permit a pawn to move diagonally if an opponent is in the destination', () => {
          const piece = state.board[1][0].piece;
          state.board[2][1].piece = Object.assign({}, state.board[7][7].piece);
          attemptMove(state, 1, 0, 2, 1);
          expect(state.board[2][1].piece).to.deep.equal(piece);
          expect(state.board[1][0].piece).to.be.undefined;
        });
      });
    });
  });
});
