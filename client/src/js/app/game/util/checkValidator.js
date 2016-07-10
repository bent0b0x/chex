import validator from './moveValidator';

export default (game) => {
  let checkedGame = game;
  const board = game.board;
  const checks = [];
  let checkedColor = false;
  board.forEach((origR, origRow) => {
    origR.forEach((origC, origCol) => {
      if (!game.board[origRow][origCol].piece) {
        return;
      }
      Object.keys(game.board.kings).forEach((kingColor) => {
        validator(board[origRow][origCol], board[game.board.kings[kingColor].row][game.board.kings[kingColor].col], game, (color, enemySpace) => {
          checks.push({ color, enemySpace });
        });
      });
    });
    if (!checks.length) {
      checkedGame.check = false;
    } else {
      checkedGame.check = checks[0].color;
    }
  });
  return checkedGame;
}