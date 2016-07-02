import * as Pieces from './Pieces';

export default (origSpace, destSpace, game) => {
  switch (origSpace.piece.type) {
    case Pieces.PAWN:
      //Vertical move
      if (origSpace.col !== destSpace.col) {
        if (!destSpace.piece ||  destSpace.piece.color === origSpace.piece.color) {
          return false;          
        }
      }
      let diff = game.top === origSpace.piece.color ? 1 : -1;
      if (origSpace.row + diff !== destSpace.row) {
        return false; 
      }
    default: 
      return true;
  }
  return true;
}