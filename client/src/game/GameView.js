import React, { PropTypes } from 'react';
import { tick } from './Game';
import { connect } from 'react-redux';


const Game = ({ teams, scoreboard, clock, onStartClick }) => {
  return (
    <div class="game">
      <button 
        class="start"
        onClick={onStartClick}
      >
        Start
      </button>
      <h2>Home Team: { teams.home_team }</h2>
      <h2>Away Team: { teams.away_team }</h2>

      <div>
        Home Score: { scoreboard.home_score }
      </div>

      <div>
        Away Score: { scoreboard.away_score }
      </div>

      <div> Period: { clock.period } </div>
      <div> { clock.time_remaining } </div>
    </div>
  );
}

Game.propTypes = {
  teams: PropTypes.object.isRequired,
  scoreboard: PropTypes.object.isRequired,
  clock: PropTypes.object.isRequired,
  onStartClick: PropTypes.func.isRequired
};

export default Game