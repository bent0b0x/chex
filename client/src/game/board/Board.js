import React from 'react';
import Space from './space/Space';
import * as colors from '../util/Colors';

export default ({ board }) => (
    <div className="board">
      {
        board.map((row, i) => (
          <div className="row" key={i}>
            {
              row.map((space, j) => {
                const color = i % 2 !== j % 2 ? colors.BLACK : colors.WHITE;
                return <Space key={`${i},${j}`} color={color} />
              })
            }
          </div>
        ))
      }
    </div>
);
