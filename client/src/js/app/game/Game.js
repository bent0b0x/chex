import React from 'react';
import Board from './board/Board';
import Clock from './clock/Clock';

export default ({ board, turn }) => {
  return <div class="game">
      Game
      <div class="turn">
        { turn }
      </div>
      <Board board={board} />
      <Clock />
    </div>
}
