import { connect } from 'react-redux';
import Game from './GameView';
import { tick, toggle } from './Game';


const mapStateToProps = (state) => {
  return {
    teams: state.teams,
    clock: state.clock,
    scoreboard: state.scoreboard
  };
};

let calledTick = false;

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleClick: () => {
      dispatch(toggle());
      if (calledTick) {
        return;
      }
      setInterval(() => {
        dispatch(tick());
      });
      calledTick = true;
    }
  };
};


const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);

export default GameContainer