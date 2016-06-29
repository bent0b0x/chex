import React from 'react';

export default ({ color, content, active, onClick }) => (
    <div 
      className={
        `
        space ${color} 
        ${(active ? ' active' : '')}
        ${content ? content.type + '-' + content.color : ''}
        `
      }
      onClick={onClick}
    >
    </div>
);
