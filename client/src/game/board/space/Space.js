import React from 'react';

export default ({ color, content, selected, onClick }) => (
    <div 
      className={`space ${color}` + (selected ? ' selected' : '')}
      onClick={onClick}
    >
    </div>
);
