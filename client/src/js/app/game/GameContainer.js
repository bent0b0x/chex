import { connect } from 'react-redux';
import Game from './Game';

const mapStateToProps = (state) => {
  return {
    board: state.game.board,
    turn: state.game.turn[0] + state.game.turn.toLowerCase().substr(1),
    check: state.game.check ? state.game.check[0] + state.game.check.toLowerCase().substr(1) : false
  };
};

const GameContainer = connect(
  mapStateToProps
)(Game);

export default GameContainer