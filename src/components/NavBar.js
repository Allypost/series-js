import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class NavBar extends Component {

  render() {
    /* eslint-disable react/jsx-max-depth */
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper purple darken-3">
            <Link
              // eslint-disable-next-line react/forbid-component-props
              className="brand-logo center"
              to="/"
            >
              S3RI3S
            </Link>
            <ul
              className="right hide-on-med-and-down"
              id="nav-mobile"
            >
              <li>
                <a href="/">
                  Series List
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
    /* eslint-enable react/jsx-max-depth */
  }

}
