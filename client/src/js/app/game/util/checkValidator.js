import validator from './moveValidator';
import * as Pieces from './Pieces';

const validate = (game, callback) => {
  const board = game.board;
  const checks = [];
  let checkedColor = false;
  board.forEach((origR, origRow) => {
    origR.forEach((origC, origCol) => {
      if (!game.board[origRow][origCol].piece) {
        return;
      }
      Object.keys(game.board.kings).forEach((kingColor) => {
        validator(board[origRow][origCol], board[game.board.kings[kingColor].row][game.board.kings[kingColor].col], game, callback);
      });
    }); 
  });
  return game;
};

export const postMove = (game) => {

  const checks = [];
  let checkedColor = false;
  validate(game, (color, enemySpace) => {
    checks.push({ color, enemySpace });
  });
  if (!checks.length) {
    game.check = false;
  } else {
    game.check = checks[0].color;
  }
  return game;

};

export const preMove = (game, orig, dest) => {
  const clonedGame = Object.assign({}, game);
  const kings = {};
  clonedGame.board = game.board.map((row, rowI) => {
    return row.map((space, colI) => {
      if (space.piece && space.piece.type === Pieces.KING) {
        kings[space.piece.color] = { row: rowI, col: colI };
      }
      return Object.assign({}, space);
    });
  });
  clonedGame.board.kings = kings;
  if (orig.piece.type === Pieces.KING) {
    clonedGame.board.kings[orig.piece.color] = { row: dest.row, col: dest.col };
  }
  clonedGame.board[dest.row][dest.col].piece = clonedGame.board[orig.row][orig.col].piece;
  clonedGame.board[orig.row][orig.col].piece = undefined;
  const checks = [];
  let checkedColor = false;
  validate(clonedGame, (color, enemySpace) => {
    checks.push({ color, enemySpace });
  });
  return checks;
};

