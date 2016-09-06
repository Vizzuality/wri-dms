import React from 'react';
import { Link } from 'react-router';

function Header() {
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li className="menu-text">WRI DMS</li>
          <li>
            <Link activeClassName="active" to="/dataset">Datasets</Link>
          </li>
          <li>
            <Link activeClassName="active" to="/layer">Layers</Link>
          </li>
          <li>
            <Link activeClassName="active" to="/widget">Widgets</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
