import * as Actions from './SpaceActions';

export const select = (row, col) => (
  {
    type: Actions.SELECT,
    row,
    col
  }
);

export const move_piece = (row, col) => (
  {
    type: Actions.MOVE_PIECE,
    row,
    col
  }
);