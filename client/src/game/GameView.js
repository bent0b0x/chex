import React, { PropTypes } from 'react';
import { tick } from './Game';
import { connect } from 'react-redux';


const Game = ({ game, onStartClick }) => {
  return (
    <div class="game">
      <button 
        class="start"
        onClick={onStartClick}
      >
        Start
      </button>
      <h2>Home Team: { game.home_team }</h2>
      <h2>Away Team: { game.away_team }</h2>

      <div>
        Home Score: { game.home_score }
      </div>

      <div>
        Away Score: { game.away_score }
      </div>

      <div> Period: { game.period } </div>
      <div> { game.time_remaining } </div>
    </div>
  );
}

Game.propTypes = {
  game: PropTypes.object.isRequired
};

export default Game