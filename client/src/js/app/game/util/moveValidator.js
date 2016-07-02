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
      if (origSpace.row + diff !== destSpace.row) {
        if (origSpace.piece.hasMoved || destSpace.row - origSpace.row > diff * 2 || game.board[origSpace.row + diff][origSpace.col].piece) {
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
      break;
    default: 
      return true;
  }
  return true;
}