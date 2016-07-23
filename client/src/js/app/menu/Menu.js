import React from 'react';
import { Link } from 'react-router';

export default ({ menu }) => (
    <div class="row">
      <div className="menu">
        <div className="collection">
          {
            menu.map(menuItem => (
              <Link
                className="collection-item"
                to={menuItem.url}
              >
                {menuItem.title}
              </Link>
            ))
          }
        </div>
      </div>
    </div>
);