import initialState from '../../../src/js/app/initialState';
import gameReducer from '../../../src/js/app/game/gameReducer';
import * as SpaceActionCreators from '../../../src/js/app/game/board/space/SpaceActionCreators';
import generateBoard from '../../../src/js/util/generateBoard';
import * as colors from '../../../src/js/app/game/util/PieceColors';
import * as checkValidator from '../../../src/js/app/game/util/checkValidator';
import Game from '../../../src/js/app/game/Game';
import Board from '../../../src/js/app/game/board/Board';
import Clock from '../../../src/js/app/game/clock/Clock';
import chai from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

const expect = chai.expect;

let state;

const attemptMove = (currState, fromRow, fromCol, toRow, toCol)  => {
  state = gameReducer(currState, SpaceActionCreators.select(fromRow, fromCol));
  state = gameReducer(state, SpaceActionCreators.select(toRow, toCol));
};

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
    it('should not activate a space with it is not the piece\'s turn', () => {
      state.turn = colors.BLACK;
      state = gameReducer(state, SpaceActionCreators.select(0, 0));
      expect(state.active_space).to.be.false;
      expect(state.board[3][3].active).to.be.false;
    });
    it('should move a piece to a new position', () => {
      state.turn = colors.WHITE;
      const piece = state.board[1][0].piece;
      attemptMove(state, 1, 0, 2, 0);
      expect(state.board[2][0].piece).to.deep.equal(piece);
      expect(state.board[1][0].piece).to.be.undefined;
    });
    it('should update a board\'s kings index when kings move', () => {
      state.turn = colors.WHITE;
      const king = state.board[0][4].piece;
      state.board[1][4].piece = undefined;
      attemptMove(state, 0, 4, 1, 4);
      expect(state.board.kings[colors.WHITE]).to.deep.equal({ row: 1, col: 4 });

      state.turn = colors.WHITE;
      attemptMove(state, 1, 4, 2, 5);
      expect(state.board.kings[colors.WHITE]).to.deep.equal({ row: 2, col: 5 });

      state.turn = colors.BLACK;
      state.board[6][4].piece = undefined;
      attemptMove(state, 7, 4, 6, 4);
      expect(state.board.kings[colors.BLACK]).to.deep.equal({ row: 6, col: 4 });

    });
    it('should mark a piece as having moved', () => {
      state.turn = colors.WHITE;
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
      beforeEach(() => {
        state.turn = colors.WHITE;
      });
      describe('turns', () => {
        it('should permit a move when it is your turn', () => {
          let piece = state.board[1][0].piece;
          attemptMove(state, 1, 0, 2, 0);
          expect(state.board[2][0].piece).to.deep.equal(piece);
          expect(state.board[1][0].piece).to.be.undefined;

          state.turn = colors.BLACK;
          piece = state.board[6][0].piece;
          attemptMove(state, 6, 0, 5, 0);
          expect(state.board[5][0].piece).to.deep.equal(piece);
          expect(state.board[6][0].piece).to.be.undefined;
        });
        it('should not permit a move when it is not your turn', () => {
          let piece = state.board[6][0].piece;
          attemptMove(state, 6, 0, 5, 0);
          expect(state.board[6][0].piece).to.equal(piece);
          expect(state.board[5][0].piece).to.be.undefined;

          state.turn = colors.BLACK;
          piece = state.board[1][0].piece;
          attemptMove(state, 1, 0, 2, 0);
          expect(state.board[1][0].piece).to.equal(piece);
          expect(state.board[2][0].piece).to.be.undefined;
        });
        it('should switch whose turn it is when a move is completed', () => {
          let piece = state.board[1][0].piece;
          attemptMove(state, 1, 0, 2, 0);
          expect(state.turn).to.equal(colors.BLACK);

          state.turn = colors.BLACK;
          piece = state.board[6][0].piece;
          attemptMove(state, 6, 0, 5, 0);
          expect(state.turn).to.equal(colors.WHITE);
        });
        it('should not switch whose turn it is when a move fails', () => {
          state.turn = colors.WHITE;
          let piece = state.board[1][0].piece;
          attemptMove(state, 1, 0, 0, 0);
          expect(state.turn).to.equal(colors.WHITE);

          state.turn = colors.BLACK;
          piece = state.board[6][0].piece;
          attemptMove(state, 6, 0, 7, 0);
          expect(state.turn).to.equal(colors.BLACK);
        });
      });
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
        it('should not permit a pawn to move diagonally if it is at the wrong angle', () => {
          const piece = state.board[1][0].piece;
          state.board[2][3].piece = Object.assign({}, state.board[7][7].piece);
          const destPiece = state.board[2][3].piece;
          attemptMove(state, 1, 0, 2, 3);
          expect(state.board[1][0].piece).to.equal(piece);
          expect(state.board[2][3].piece).to.equal(destPiece);
        });
        it('should permit a pawn to move two vertical spaces if it has not moved before', () => {
          let piece = state.board[1][0].piece;
          attemptMove(state, 1, 0, 3, 0);
          expect(state.board[3][0].piece).to.deep.equal(piece);
          expect(state.board[1][0].piece).to.be.undefined;
          piece = state.board[6][0].piece;
          state.turn = colors.BLACK;
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
          state.turn = colors.BLACK;
          const piece = state.board[7][2].piece;
          attemptMove(state, 7, 2, 4, 2);
          expect(state.board[7][2].piece).to.equal(piece);
          expect(state.board[4][2].piece).to.be.undefined;
        });
        it('should not be permit a horizontal move', () => {
          state.turn = colors.BLACK;
          state.board[4][0].piece = state.board[7][2].piece;
          const piece = state.board[4][0].piece;
          attemptMove(state, 4, 0, 4, 6);
          expect(state.board[4][0].piece).to.equal(piece);
          expect(state.board[4][6].piece).to.be.undefined;
        });
        it('should permit a diagnoal move', () => {
          state.turn = colors.BLACK;
          const piece = state.board[7][2].piece;
          attemptMove(state, 7, 2, 6, 1);
          expect(state.board[6][1].piece).to.deep.equal(piece);
          expect(state.board[7][2].piece).to.be.undefined;
        });
        it('should not permit a diagnoal move at the wrong angle', () => {
          state.turn = colors.BLACK;
          const piece = state.board[7][2].piece;
          attemptMove(state, 7, 2, 6, 0);
          expect(state.board[7][2].piece).to.equal(piece);
          expect(state.board[6][0].piece).to.be.undefined;
        });
        it('should not permit a move when a piece is in the way', () => {
          state.turn = colors.BLACK;
          const piece = state.board[7][2].piece;
          state.board[3][6].piece = state.board[7][7].piece;
          attemptMove(state, 7, 2, 2, 7);
          expect(state.board[7][2].piece).to.equal(piece);
          expect(state.board[2][7].piece).to.be.undefined;
        });
        it('should permit a move when an opposing piece is at the destination', () => {
          state.turn = colors.BLACK;
          const piece = state.board[7][2].piece;
          state.board[6][3].piece = state.board[0][0].piece;
          attemptMove(state, 7, 2, 6, 3);
          expect(state.board[6][3].piece).to.equal(piece);
          expect(state.board[7][2].piece).to.be.undefined;
        });
        it('should not permit a move when a teammate piece is at the destination', () => {
          state.turn = colors.BLACK;
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

          state.turn = colors.WHITE;
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
        it('should permit an L-shaped move if an opposing piece is at the destination', () => {
          const piece = state.board[0][1].piece;
          state.board[2][2].piece = state.board[7][7].piece;
          attemptMove(state, 0, 1, 2, 2);
          expect(state.board[2][2].piece).to.equal(piece);
          expect(state.board[0][1].piece).to.be.undefined;
        });
      });
      describe('queens', () => {
        beforeEach(() => {
          state.board[1].forEach((space, index) => {
            state.board[1][index].piece = undefined;
          });
          state.board[6].forEach((space, index) => {
            state.board[6][index].piece = undefined;
          });
          state.board[0].forEach((space, index) => {
            if (index !== 3) {
              state.board[0][index].piece = undefined;
            }
          });
        });
        it('should permit a horizontal move', () => {
          const piece = state.board[0][3].piece;
          attemptMove(state, 0, 3, 0, 0);
          expect(state.board[0][0].piece).to.deep.equal(piece);
          expect(state.board[0][3].piece).to.be.undefined;
        });
        it('should not permit a horizontal move if a piece is in the way', () => {
          const piece = state.board[0][3].piece;
          state.board[0][2].piece = state.board[7][7];
          attemptMove(state, 0, 3, 0, 0);
          expect(state.board[0][3].piece).to.equal(piece);
          expect(state.board[0][0].piece).to.be.undefined;
        });
        it('should permit a vertical move', () => {
          state.turn = colors.BLACK;
          const piece = state.board[7][3].piece;
          attemptMove(state, 7, 3, 5, 3);
          expect(state.board[5][3].piece).to.deep.equal(piece);
          expect(state.board[7][3].piece).to.be.undefined;
        });
        it('should not permit a vertical move if a piece is in the way', () => {
          state.turn = colors.BLACK;
          const piece = state.board[7][3].piece;
          state.board[6][3].piece = state.board[7][7];
          attemptMove(state, 7, 3, 5, 3);
          expect(state.board[7][3].piece).to.equal(piece);
          expect(state.board[5][3].piece).to.be.undefined;
        });
        it('should permit a diagonal move', () => {
          state.turn = colors.BLACK;
          const piece = state.board[7][3].piece;
          attemptMove(state, 7, 3, 5, 1);
          expect(state.board[5][1].piece).to.deep.equal(piece);
          expect(state.board[7][3].piece).to.be.undefined;
        });
        it('should not permit a diagonal move if a piece is in the way', () => {
          state.turn = colors.BLACK;
          const piece = state.board[7][3].piece;
          state.board[6][2].piece = state.board[7][7].piece;
          attemptMove(state, 7, 3, 5, 1);
          expect(state.board[7][3].piece).to.equal(piece);
          expect(state.board[5][1].piece).to.be.undefined;
        });
        it('should not permit a diagonal move at the incorrect angle', () => {
          state.turn = colors.BLACK;
          const piece = state.board[7][3].piece;
          attemptMove(state, 7, 3, 5, 0);
          expect(state.board[7][3].piece).to.equal(piece);
          expect(state.board[5][0].piece).to.be.undefined;
        });
      });
      describe('kings', () => {
        beforeEach(() => {
          state.board[1].forEach((space, index) => {
            state.board[1][index].piece = undefined;
          });
          state.board[6].forEach((space, index) => {
            state.board[6][index].piece = undefined;
          });
          state.board[0].forEach((space, index) => {
            if (index !== 4 && index !== 0 && index !== 7) {
              state.board[0][index].piece = undefined;
            }
          });
        });
        it('should permit a horizontal move of length 1', () => {
          const piece = state.board[0][4].piece;
          attemptMove(state, 0, 4, 0, 5);
          expect(state.board[0][5].piece).to.deep.equal(piece);
          expect(state.board[0][4].piece).to.be.undefined;
        });
        it('should not permit a horizontal move greater than length 1', () => {
          const piece = state.board[0][4].piece;
          state.board[0][0].piece.hasMoved = true;
          attemptMove(state, 0, 4, 0, 2);
          expect(state.board[0][4].piece).to.equal(piece);
          expect(state.board[0][2].piece).to.be.undefined;
        });
        it('should permit a vertical move of length 1', () => {
          const piece = state.board[0][4].piece;
          attemptMove(state, 0, 4, 1, 4);
          expect(state.board[1][4].piece).to.deep.equal(piece);
          expect(state.board[0][4].piece).to.be.undefined;
        });
        it('should not permit a vertical move greater than length 1', () => {
          const piece = state.board[0][4].piece;
          attemptMove(state, 0, 4, 2, 4);
          expect(state.board[0][4].piece).to.equal(piece);
          expect(state.board[2][4].piece).to.be.undefined;
        });
        it('should permit a diagonal move of length 1', () => {
          const piece = state.board[0][4].piece;
          attemptMove(state, 0, 4, 1, 5);
          expect(state.board[1][5].piece).to.deep.equal(piece);
          expect(state.board[0][4].piece).to.be.undefined;
        });
        it('should not permit a diagonal move greater than length 1', () => {
          const piece = state.board[0][4].piece;
          attemptMove(state, 0, 4, 2, 6);
          expect(state.board[0][4].piece).to.equal(piece);
          expect(state.board[2][6].piece).to.be.undefined;
        });
        it('should not permit a diagonal move at the wrong angle', () => {
          const piece = state.board[0][4].piece;
          attemptMove(state, 0, 4, 2, 3);
          expect(state.board[0][4].piece).to.equal(piece);
          expect(state.board[2][3].piece).to.be.undefined;
        });
        it('should permit a move where an opposing piece is at the destination', () => {
          const piece = state.board[0][4].piece;
          state.board[0][5].piece = state.board[7][7].piece;
          attemptMove(state, 0, 4, 0, 5);
          expect(state.board[0][5].piece).to.deep.equal(piece);
          expect(state.board[0][4].piece).to.be.undefined;
        });
        it('should not permit a move where a teammate piece is at the destination', () => {
          const piece = state.board[0][4].piece;
          const destPiece = state.board[0][5].piece = state.board[0][7].piece;
          attemptMove(state, 0, 4, 0, 5);
          expect(state.board[0][4].piece).to.equal(piece);
          expect(state.board[0][5].piece).to.equal(destPiece);
        });
        describe('castling', () => {
          it('should permit a short castle', () => {
            const king = state.board[0][4].piece;
            const rook = state.board[0][7].piece;
            attemptMove(state, 0, 4, 0, 6);
            expect(state.board[0][6].piece).to.deep.equal(king);
            expect(state.board[0][5].piece).to.deep.equal(rook);
            expect(state.board[0][4].piece).to.be.undefined;
            expect(state.board[0][7].piece).to.be.undefined;
          });
          it('should permit a long castle', () => {
            const king = state.board[0][4].piece;
            const rook = state.board[0][0].piece;
            state.board[6][3].piece = state.board[7][1].piece;
            attemptMove(state, 0, 4, 0, 2);
            expect(state.board[0][2].piece).to.deep.equal(king);
            expect(state.board[0][3].piece).to.deep.equal(rook);
            expect(state.board[0][4].piece).to.be.undefined;
            expect(state.board[0][0].piece).to.be.undefined;
          });
          it('should permit a castle when the rook or king has moved', () => {
            const king = state.board[0][4].piece;
            king.hasMoved = true;
            const rook = state.board[0][0].piece;
            attemptMove(state, 0, 4, 0, 2);
            expect(state.board[0][4].piece).to.deep.equal(king);
            expect(state.board[0][0].piece).to.deep.equal(rook);

            king.hasMoved = false;
            rook.hasMoved = true;
            attemptMove(state, 0, 4, 0, 2);
            expect(state.board[0][4].piece).to.deep.equal(king);
            expect(state.board[0][0].piece).to.deep.equal(rook);
          });
          it('should not permit a castle when a piece is in the way', () => {
            const king = state.board[0][4].piece;
            const rook = state.board[0][0].piece;
            state.board[0][1].piece = state.board[7][1].piece;
            attemptMove(state, 0, 4, 0, 2);
            expect(state.board[0][4].piece).to.equal(king);
            expect(state.board[0][0].piece).to.equal(rook);
          });
          it('should not permit a castle when the king is in check', () => {
            const king = state.board[0][4].piece;
            const rook = state.board[0][0].piece;
            state.board[1][4].piece = state.board[7][5].piece;
            state.board.check = colors.WHITE;
            attemptMove(state, 0, 4, 0, 2);
            expect(state.board[0][4].piece).to.equal(king);
            expect(state.board[0][0].piece).to.equal(rook);
          });
          it('should not permit a castle when the king would pass through a checked space', () => {
            const king = state.board[0][4].piece;
            const rook = state.board[0][7].piece;
            state.board[1][5].piece = state.board[7][7].piece;
            attemptMove(state, 0, 4, 0, 6);
            expect(state.board[0][4].piece).to.equal(king);
            expect(state.board[0][7].piece).to.equal(rook);
          });
          it('should not permit a castle when the king would end up in a checked space', () => {
            const king = state.board[0][4].piece;
            const rook = state.board[0][7].piece;
            state.board[1][6].piece = state.board[7][7].piece;
            attemptMove(state, 0, 4, 0, 6);
            expect(state.board[0][4].piece).to.equal(king);
            expect(state.board[0][7].piece).to.equal(rook);
          });
        });
      });
    });
    describe('check', () => {
      beforeEach(() => {
        state.board[1].forEach((space) => {
          space.piece = undefined;
        });
      });
      describe('move prevention', () => {
        it('should prevent a piece from moving if it would put its king in check', () => {
          state.board[1][4].piece = state.board[0][0].piece;
          const piece = state.board[1][4].piece;
          state.board[0][0].piece = undefined;
          state.board[2][4].piece = state.board[7][7].piece;
          state.turn = colors.WHITE;
          attemptMove(state, 1, 4, 1, 3);
          expect(state.board[1][4].piece).to.equal(piece);
          expect(state.board[1][3].piece).to.be.undefined;
        });
        it('should not prevent a piece from moving if it would only put the opposing king in check', () => {
          state.board[1][4].piece = state.board[0][0].piece;
          state.board[0][0].piece = undefined;
          state.board[2][4].piece = state.board[7][3].piece;
          const piece = state.board[2][4].piece;
          state.turn = colors.BLACK;
          attemptMove(state, 2, 4, 1, 4);
          expect(state.board[1][4].piece).to.deep.equal(piece);
          expect(state.board[2][4].piece).to.be.undefined;
        });
        it('should prevent a king from moving if it would put itself in check', () => {
          state.board[1][4].piece = state.board[7][3].piece;
          state.board[0][3].piece = undefined;
          state.turn = colors.WHITE;
          const king = state.board[0][4].piece;
          attemptMove(state, 0, 4, 0, 3);
          expect(state.board[0][4].piece).to.equal(king);
          expect(state.board[0][3].piece).to.be.undefined;
        });
      });
      describe('check validator', () => {
        it('should detect a check when threatened by one piece', () => {
          state.board[1][3].piece = state.board[6][0].piece;
          state.board[6][0].piece = undefined;
          state = checkValidator.postMove(state);
          expect(state.check).to.equal(colors.WHITE);
        });
        it('should not detect a check when threatened by no piece', () => {
          state.board[1][4].piece = state.board[6][0].piece;
          state.board[6][0].piece = undefined;
          state = checkValidator.postMove(state);
          expect(state.check).to.be.false;
        });
        it('should detect a check when threatened by multiple pieces', () => {
          state.board[0][3].piece = state.board[6][0].piece;
          state.board[2][3].piece = state.board[7][1].piece;
          state.board[6][0].piece = undefined;
          state.board[7][1].piece = undefined
          state = checkValidator.postMove(state);
          expect(state.check).to.equal(colors.WHITE);
        });
      });
      xit('should set check when a king is in check', () => {
        state.board[2][3].piece = state.board[6][0].piece;
        attemptMove(state, 2, 3, 1, 3);
        expect(state.check).to.equal(colors.WHITE);
      });
      xit('should unset check when a king is no longer in check', () => {
        state.check = colors.WHITE;
        state.board[2][3].piece = state.board[6][0].piece;
        attemptMove(state, 2, 3, 1, 3);
        attemptMove(state, 0, 2, 1, 3);
        expect(state.check).to.be.false;
      });
    });
  });
  describe('components', () => {
    let props;
    let output;
    let renderer;
    beforeEach(() => {
      props = {
        board: initialState.game.board
      };

      renderer = TestUtils.createRenderer();
      renderer.render(<Game {...props} />);
      output = renderer.getRenderOutput();
    });
    it('should render correctly', () => {
      expect(output.type).to.equal('div');
      expect(output.props.className).to.equal('game');

      let [turn, board, clock] = output.props.children;

      expect(turn.type).to.equal('div');
      expect(turn.props.className).to.equal('turn');

      expect(board.type).to.equal(Board);
      expect(board.props.board).to.equal(props.board);

      expect(clock.type).to.equal(Clock);
    });
  });
});
