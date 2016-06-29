import * as colors from '../app/game/util/PieceColors';

export default () => {
  let clock = {};
  clock[colors.BLACK] = 0.0;
  clock[colors.WHITE] = 0.0;

  return clock;
};