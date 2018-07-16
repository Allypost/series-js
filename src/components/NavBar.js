import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { css } from 'emotion';

const nav = css`
  display: grid;
  grid-column-start: 1;
  grid-column-end: -1;
  grid-row: nav;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 3.5em;
  background-color: #fff;
`;

const logoContainer = css`
  display: inline-block;
  grid-column: 2;
  padding: 1em;
`;

const logo = css`
  height: 100%;
`;

export class NavBar extends Component {

  render() {
    return (
      <nav className={nav}>
        <Link
          // eslint-disable-next-line react/forbid-component-props
          className={logoContainer}
          to="/"
        >
          <img
            alt="Shows - Logo"
            className={logo}
            src="/img/img-logo-horizontal@3x.png"
          />
        </Link>
      </nav>
    );
  }

}
