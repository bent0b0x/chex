import React from 'react';
import GameContainer from './game/GameContainer';

export default ({ app_name }) => (
    <div class="app">
      <nav>
        <div class="nav-wrapper">
          <a href="#" class="brand-logo">{ app_name }</a>
        </div>
      </nav>
      App
      <GameContainer />
    </div>
);





