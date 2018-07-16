import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { css } from 'emotion';
import { UserDisplay } from './UserDisplay';

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

const userContainer = css`
  display: grid;
  grid-column: -3 / span 3;
  justify-self: left;
  align-items: center;
`;

const decodeJWT = (token) => {
  if (!token) {
    return null;
  }

  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');

  return JSON.parse(window.atob(base64));
};


export class NavBar extends Component {

  constructor(...args) {
    super(...args);

    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    const rawToken = window.localStorage.getItem('token');
    const token = decodeJWT(rawToken);

    if (!token) {
      return;
    }

    const { _id, username } = token;

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ user: { _id, username: username || _id } });
  }

  render() {
    const { user } = this.state;

    return (
      <nav className={nav}>
        <div className={logoContainer}>
          <Link to="/">
            <img
              alt="Shows - Logo"
              className={logo}
              src="/img/img-logo-horizontal@3x.png"
            />
          </Link>
        </div>
        <div className={userContainer}>
          <UserDisplay user={user} />
        </div>
      </nav>
    );
  }

}
