import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Navigation.scss';

export const Navigation = () => (
  <nav className="Navigation">
    <div className="Navigation__wrapper">
      <div className="Navigation__content">
        <div className="Navigation__brand">
          <Link to="/" className="Navigation__image-link">
            <img
              src={logo}
              alt="Logo"
              className="Navigation__image"
            />
          </Link>
        </div>
        <ul className="Navigation__list">
          <li className="Navigation__item">
            <Link to="/">
              Characters
            </Link>
          </li>
          <li className="Navigation__item">
            <Link to="/episodes">
              Episodes
            </Link>
          </li>
          <li className="Navigation__item">
            <Link to="/locations">
              Locations
            </Link>
          </li>
          <li className="Navigation__item">
            <Link to="/my-list">
              My watch
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);
