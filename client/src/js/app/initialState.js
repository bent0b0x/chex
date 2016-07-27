import board from '../util/generateBoard';
import clock from '../util/generateClock';
import menu from '../util/generateMenu';
import * as colors from './game/util/PieceColors';

export default {
  game: {
    started: false,
    active_space: false,
    board: board(),
    turn: colors.WHITE,
    check: false,
    top: colors.WHITE,
    clock: clock()
  },
  menu: menu(),
  config: {
    app_name: 'Chex'
  },
  signup: {
    submitting: false,
    fail: false,
    success: false,
    gamertag: undefined,
    email: undefined,
    password: undefined
  },
  login: {
    submitting: false,
    fail: false,
    success: false,
    email: undefined,
    password: undefined
  },
  user: {
    gamertag: localStorage.getItem('gamertag'),
    email: undefined,
    token: localStorage.getItem('token')
  }
};