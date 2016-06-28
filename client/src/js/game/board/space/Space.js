import React from 'react';

export default ({ color, content, selected, onClick }) => (
    <div 
      className={
        `
        space ${color} 
        ${(selected ? ' selected' : '')}
        ${content ? content.type + '-' + content.color : ''}
        `
      }
      onClick={onClick}
    >
    </div>
);
