import genBoard from '../util/generateBoard';
import genClock from '../util/generateClock';
import * as colors from '../game/Colors';

export default  {
  game: {
    started: false,
    board: genBoard(),
    turn: colors.WHITE,
    top: colors.WHITE,
    clock: genClock()
  }
}
