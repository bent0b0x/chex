import React from 'react';
import SpaceContainer from './space/SpaceContainer';
import * as colors from '../util/Colors';

export default ({ board }) => (
    <div className="board">
      {
        board.map((row, i) => (
          <div className="row" key={i}>
            {
              row.map((space, j) => {
                const color = i % 2 !== j % 2 ? colors.BLACK : colors.WHITE;
                return <SpaceContainer 
                          key={`${i},${j}`} 
                          color={color} 
                          row={i}
                          col={j} 
                        />
              })
            }
          </div>
        ))
      }
    </div>
);
