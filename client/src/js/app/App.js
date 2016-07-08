import React from 'react';
import GameContainer from './game/GameContainer';

export default ({ app_name }) => (
    <div className="app">
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">{ app_name }</a>
        </div>
      </nav>
      App
      <GameContainer />
    </div>
);





