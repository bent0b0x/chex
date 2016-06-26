import { connect } from 'react-redux';
import Game from './GameView';
import { tick } from './Game';


const mapStateToProps = (state) => {
  return {
    game: state
  };
};



const mapDispatchToProps = (dispatch) => {
  const clock = (e) => {
    setTimeout(() => {
      dispatch(tick());
      clock();
    }, 1000);
  };
  return {
    onStartClick: clock
  };
};


const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);

export default GameContainer