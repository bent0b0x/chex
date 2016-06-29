import * as Actions from './SpaceActions';

export const select = (row, col) => (
  {
    type: Actions.SELECT,
    row,
    col
  }
) 