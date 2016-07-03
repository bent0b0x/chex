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

before(() => {
  state = initialState.game;
});

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
    it('should mark a piece as having moved', () => {
      const piece = state.board[1][0].piece;
      attemptMove(state, 1, 0, 2, 0);
      expect(piece.hasMoved).to.be.true;
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
        it('should not permit a pawn to move one space, vertically, if a piece is in the destination', () => {
          const piece = state.board[1][0].piece;
          state.board[2][0].piece = state.board[7][7].piece;
          attemptMove(state, 1, 0, 2, 0);
          expect(state.board[1][0].piece).to.equal(piece);
          expect(state.board[2][0].piece).to.equal(state.board[7][7].piece);
        });
        it ('should not permit a pawn to move more than one space, vertically', () => {
          const piece = state.board[1][0].piece;
          attemptMove(state, 1, 0, 4, 0);
          expect(state.board[1][0].piece).to.equal(piece);
          expect(state.board[4][0].piece).to.be.undefined;
        });
        it ('should not permit a pawn to move backwards, vertically', () => {
          const piece = state.board[1][0].piece;
          state.board[4][0].piece = piece;
          attemptMove(state, 4, 0, 2, 0);
          expect(state.board[4][0].piece).to.equal(piece);
          expect(state.board[2][0].piece).to.be.undefined;
        });
        it('should not permit a pawn to move horizontally', () => {
          const piece = state.board[3][0].piece;
          attemptMove(state, 3, 0, 3, 1);
          expect(state.board[3][0].piece).to.equal(piece);
          expect(state.board[3][1].piece).to.be.undefined;
        });
        it('should permit a pawn to move diagonally if an opponent is in the destination', () => {
          const piece = state.board[1][0].piece;
          state.board[2][1].piece = Object.assign({}, state.board[7][7].piece);
          attemptMove(state, 1, 0, 2, 1);
          expect(state.board[2][1].piece).to.deep.equal(piece);
          expect(state.board[1][0].piece).to.be.undefined;
        });
        it('should permit a pawn to move two vertical spaces if it has not moved before', () => {
          let piece = state.board[1][0].piece;
          attemptMove(state, 1, 0, 3, 0);
          expect(state.board[3][0].piece).to.deep.equal(piece);
          expect(state.board[1][0].piece).to.be.undefined;
          piece = state.board[6][0].piece;
          attemptMove(state, 6, 0, 4, 0);
          expect(state.board[4][0].piece).to.deep.equal(piece);
          expect(state.board[6][0].piece).to.be.undefined;

        });
        it('should not permit a pawn to move two vertical spaces if it has moved before', () => {
          const piece = state.board[1][0].piece;
          piece.hasMoved = true;
          attemptMove(state, 1, 0, 3, 0);
          expect(state.board[1][0].piece).to.equal(piece);
          expect(state.board[3][0].piece).to.be.undefined;
        });
        it('should not permit a pawn to move two vertical spaces if there is a piece on the way', () => {
          const piece = state.board[1][0].piece;
          state.board[2][0].piece = Object.assign({}, state.board[7][7].piece);
          attemptMove(state, 1, 0, 3, 0);
          expect(state.board[1][0].piece).to.equal(piece);
          expect(state.board[3][0].piece).to.be.undefined;
        });
        it('should not permit a pawn to move one space, vertically, if a piece is in the destination', () => {
          const piece = state.board[1][0].piece;
          state.board[3][0].piece = state.board[7][7].piece;
          attemptMove(state, 1, 0, 3, 0);
          expect(state.board[1][0].piece).to.equal(piece);
          expect(state.board[3][0].piece).to.equal(state.board[7][7].piece);
        });
      });
      describe('bishops', () => {
        beforeEach(() => {
          state.board[6].forEach((pawn, index) => {
            state.board[6][index].piece = undefined;
          });
          state.board[1].forEach((pawn, index) => {
            state.board[1][index].piece = undefined;
          });
        });
        it('should not permit a vertical move', () => {
          const piece = state.board[7][2].piece;
          attemptMove(state, 7, 2, 4, 2);
          expect(state.board[7][2].piece).to.equal(piece);
          expect(state.board[4][2].piece).to.be.undefined;
        });
        it('should not be permit a horizontal move', () => {
          state.board[4][0].piece = state.board[7][2].piece;
          const piece = state.board[4][0].piece;
          attemptMove(state, 4, 0, 4, 6);
          expect(state.board[4][0].piece).to.equal(piece);
          expect(state.board[4][6].piece).to.be.undefined;
        });
        it('should permit a diagnoal move', () => {
          const piece = state.board[7][2].piece;
          attemptMove(state, 7, 2, 6, 1);
          expect(state.board[6][1].piece).to.deep.equal(piece);
          expect(state.board[7][2].piece).to.be.undefined;
        });
        it('should not permit a diagnoal move at the wrong angle', () => {
          const piece = state.board[7][2].piece;
          attemptMove(state, 7, 2, 6, 0);
          expect(state.board[7][2].piece).to.equal(piece);
          expect(state.board[6][0].piece).to.be.undefined;
        });
        it('should not permit a move when a piece is in the way', () => {
          const piece = state.board[7][2].piece;
          state.board[3][6].piece = state.board[7][7].piece;
          attemptMove(state, 7, 2, 2, 7);
          expect(state.board[7][2].piece).to.equal(piece);
          expect(state.board[2][7].piece).to.be.undefined;
        });
        it('should permit a move when an opposing piece is at the destination', () => {
          const piece = state.board[7][2].piece;
          state.board[6][3].piece = state.board[0][0].piece;
          attemptMove(state, 7, 2, 6, 3);
          expect(state.board[6][3].piece).to.equal(piece);
          expect(state.board[7][2].piece).to.be.undefined;
        });
        it('should not permit a move when a teammate piece is at the destination', () => {
          const piece = state.board[7][2].piece;
          state.board[6][3].piece = state.board[7][7].piece;
          attemptMove(state, 7, 2, 6, 3);
          expect(state.board[7][2].piece).to.equal(piece);
          expect(state.board[6][3].piece).to.equal(state.board[7][7].piece);
        });
      });
      describe('rooks', () => {
        beforeEach(() => {
          state.board[1].forEach((space, index) => {
            state.board[1][index].piece = undefined;
          });
          state.board[0].forEach((space, index) => {
            if (index !== 0 && index !== state.board[0].length - 1) {
              state.board[0][index].piece = undefined;
            }
          });
        });
        it('should permit a horizontal move', () => {
          const piece = state.board[0][0].piece;
          attemptMove(state, 0, 0, 0, 6);
          expect(state.board[0][6].piece).to.deep.equal(piece);
          expect(state.board[0][0].piece).to.be.undefined;
        });
        it('should not permit a horizontal move if a piece is in the way', () => {
          const piece = state.board[0][0].piece;
          state.board[0][2].piece = state.board[7][7].piece;
          attemptMove(state, 0, 0, 0, 6);
          expect(state.board[0][0].piece).to.equal(piece);
          expect(state.board[0][6].piece).to.be.undefined;
        });
        it('should permit a vertical move', () => {
          const piece = state.board[0][0].piece;
          attemptMove(state, 0, 0, 5, 0);
          expect(state.board[5][0].piece).to.deep.equal(piece);
          expect(state.board[0][0].piece).to.be.undefined;
        });
        it('should not permit a vertical move if a piece is in the way', () => {
          const piece = state.board[0][0].piece;
          state.board[2][0].piece = state.board[7][7].piece;
          attemptMove(state, 0, 0, 4, 0);
          expect(state.board[0][0].piece).to.equal(piece);
          expect(state.board[0][6].piece).to.be.undefined;
        });
        it('should not permit a diagonal move', () => {
          const piece = state.board[0][0].piece;
          attemptMove(state, 0, 0, 1, 5);
          expect(state.board[0][0].piece).to.equal(piece);
          expect(state.board[1][5].piece).to.be.undefined;
        });
        it('should not permit a move if a teammate is at the destination', () => {
          const piece = state.board[0][0].piece;
          const destPiece = state.board[0][7].piece;
          attemptMove(state, 0, 0, 0, 7);
          expect(state.board[0][0].piece).to.equal(piece);
          expect(state.board[0][7].piece).to.equal(destPiece);
        });
        it('should permit a move if an opposing piece is at the destination', () => {
          const piece = state.board[0][0].piece;
          state.board[1][0].piece = state.board[7][7].piece;
          attemptMove(state, 0, 0, 1, 0);
          expect(state.board[1][0].piece).to.deep.equal(piece);
          expect(state.board[0][0].piece).to.be.undefined;
        });
      });
      describe('knights', () => {
        it('should permit a move in an L shape', () => {
          const piece = state.board[0][1].piece;
          attemptMove(state, 0, 1, 2, 2);
          expect(state.board[2][2].piece).to.deep.equal(piece);
          expect(state.board[0][1].piece).to.be.undefined;

          attemptMove(state, 2, 2, 3, 0);
          expect(state.board[3][0].piece).to.deep.equal(piece);
          expect(state.board[2][2].piece).to.be.undefined;
        });
        it('should not permit a horizontal move', () => {
          const piece = state.board[0][1].piece;
          state.board[0][0].piece = undefined;
          attemptMove(state, 0, 1, 0, 0);
          expect(state.board[0][1].piece).to.equal(piece);
          expect(state.board[0][0].piece).to.be.undefined;
        });
        it('should not permit a vertical move', () => {
          const piece = state.board[0][1].piece;
          state.board[1][1].piece = undefined;
          attemptMove(state, 0, 1, 1, 1);
          expect(state.board[0][1].piece).to.equal(piece);
          expect(state.board[1][1].piece).to.be.undefined;
        });
        it('should not permit a diagnoal, non-L move', () => {
          const piece = state.board[0][1].piece;
          attemptMove(state, 0, 1, 4, 2);
          expect(state.board[0][1].piece).to.equal(piece);
          expect(state.board[4][2].piece).to.be.undefined;
        });
        it('should not permit an L-shaped move if a teammate is at the destination', () => {
          const piece = state.board[0][1].piece;
          state.board[2][2].piece = state.board[0][0].piece;
          const destPiece = state.board[2][2].piece;
          attemptMove(state, 0, 1, 2, 2);
          expect(state.board[0][1].piece).to.equal(piece);
          expect(state.board[2][2].piece).to.equal(destPiece);
        });
      })
    });
  });
});
