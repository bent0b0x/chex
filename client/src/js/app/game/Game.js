import React from 'react';
import Board from './board/Board';
import Clock from './clock/Clock';

export default ({ board, turn }) => {
  return <div className="game">
      <div className="turn">
        { turn }
      </div>
      <Board board={board} />
      <Clock />
    </div>
}
