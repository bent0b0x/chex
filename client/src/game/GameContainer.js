import { connect } from 'react-redux';
import Game from './Game';


const mapStateToProps = (state) => {
  return {
    board: state.game.board
  };
};


const GameContainer = connect(
  mapStateToProps
)(Game);

export default GameContainer