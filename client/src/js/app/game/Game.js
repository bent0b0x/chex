import React from 'react';
import Board from './board/Board';
import Clock from './clock/Clock';

export default ({ board, turn, check }) => {
  return <div className="game">
      <div className="turn">
        Turn: { turn }
      </div>
      <div className="check">
        { check ? `${check} is in check` : ''}
      </div>
      <Board board={board} />
      <Clock />
    </div>
}
