import React from 'react';
import GameContainer from './game/GameContainer';

export default ({ app_name, gamertag, children }) => (
    <div className="app">
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">{app_name}</a>
          {
            gamertag ?
            <span className="right">{gamertag}</span>
            : null
          }
        </div>
      </nav>
      <div className="container">
        {children}
      </div>
    </div>
);