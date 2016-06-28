import React from 'react';
import Board from './board/Board';
import Clock from './clock/Clock';

export default ({ board }) => {
  return <div class="game">
      Game
      <Board board={board} />
      <Clock />
    </div>
}
