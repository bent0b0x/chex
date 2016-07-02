import * as Pieces from './Pieces';

export default (origSpace, destSpace, game) => {
  switch (origSpace.piece.type) {
    case Pieces.PAWN:
      if (origSpace.col !== destSpace.col) {
        if (!destSpace.piece ||  destSpace.piece.color === origSpace.piece.color) {
          return false;          
        }
      } else {
        if (destSpace.piece) {
          return false;
        }
      }
      let diff = game.top === origSpace.piece.color ? 1 : -1;
      if (origSpace.row + diff > destSpace.row + 1) {
        return false;
      }
      if (origSpace.row + diff !== destSpace.row) {
        if (origSpace.piece.hasMoved || Math.abs(destSpace.row - origSpace.row) > Math.abs(diff * 2) || game.board[origSpace.row + diff][origSpace.col].piece) {
          return false;             
        }
      }
      break;
    case Pieces.BISHOP:
      if (origSpace.col === destSpace.col || origSpace.row === destSpace.row) {
        return false;
      }
      if (Math.abs(origSpace.col - destSpace.col) !== Math.abs(origSpace.row - destSpace.row)) {
        return false;
      }
      const rowDir = destSpace.row - origSpace.row > 0 ? 1 : -1;
      const colDir = destSpace.col - origSpace.col > 0 ? 1 : -1;

      let row = origSpace.row + rowDir;
      let col = origSpace.col + colDir;

      let checkSpace = game.board[row][col];

      while (Math.abs(checkSpace.row - destSpace.row) >= 1) {
        if (checkSpace.piece) {
          return false;
        }

        row += rowDir;
        col += colDir;

        checkSpace = game.board[row][col];

      }

      break;
    case Pieces.ROOK:
      if (origSpace.row !== destSpace.row && origSpace.col !== destSpace.col) {
        return false;
      }
      if (origSpace.row === destSpace.row) {
        const dir = origSpace.col < destSpace.col ? 1 : -1; 
        for (let i = origSpace.col + dir; i !== destSpace.col; i += dir) {
          if (game.board[origSpace.row][i].piece) {
            return false;
          }
        }
      }
      if (origSpace.col === destSpace.col) {
        const dir = origSpace.row < destSpace.row ? 1 : -1; 
        for (let i = origSpace.row + dir; i !== destSpace.row; i += dir) {
          if (game.board[i][origSpace.col].piece) {
            return false;
          }
        }
      }
      break;
    default: 
      return true;
  }
  return true;
}