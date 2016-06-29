import * as Pieces from './Pieces';

export default (orig, dest, piece, game) => {
  switch (piece.type) {
    case Pieces.PAWN:
      //Vertical move
      if (game.top === piece.color) {
        if (orig.col === dest.col - 1 && !dest.piece) {
          return true;
        } else if (orig.col === dest.col + 1 && !dest.piece) {
          return true;
        }
      }
    default: 
      return false;
  }
}