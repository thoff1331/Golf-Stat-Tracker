import * as React from 'react';
import { Link } from 'react-router-dom';
import "./NavBar.css";
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";
function Navbar({signOut}) {
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
        <Link className="nav-links" to="/pictures">
          My Pictures
        </Link>
      </li>
      <li>
        <Link className="nav-links" to="/profile">
        Profile
        </Link>
      </li>
      <Button className='sign-out' onClick={signOut}>Sign Out</Button>
    </div>
  );
}

export default withAuthenticator(Navbar)