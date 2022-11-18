import * as React from 'react';
import { Link } from 'react-router-dom';
import "./NavBar.css";
export default function Navbar() {
  return (
    <div className="nav-items">
      <li>
        <Link className="nav-links" to="/">
          HOME
        </Link>
      </li>
      <li>
        <Link className="nav-links" to="/score">
          PLAY
        </Link>
      </li>
      <li>
        <Link className="nav-links" to="/stats">
          STATS
        </Link>
      </li>
      <li>
        <Link className="nav-links" to="/profile">
          PROFILE
        </Link>
      </li>
    </div>
  );
}