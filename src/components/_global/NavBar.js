import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { css } from 'emotion';
import { UserDisplay } from './NavBar/UserDisplay';

import logoImg from '../../img/img-logo-horizontal@3x.png';
import Util from '../../helpers/Util';

const nav = css`
  display: grid;
  grid-column-start: 1;
  grid-column-end: -1;
  grid-row: nav;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 3.5em;
  background-color: #fff;
  // font-size: .8em;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
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
  // font-size: .8em;
`;

export class NavBar extends Component {

  constructor(...args) {
    super(...args);

    this.state = {
      user: {},
      token: '',
    };
  }

  componentDidMount() {
    this.updateState();
  }

  componentDidUpdate(_oldProps, oldState) {
    const { token } = this.state;
    const { token: oldToken } = oldState;

    if (token !== oldToken) {
      this.updateState();
    }
  }

  updateState() {
    const { token, username: storeUsername } = Util.getUserData();
    const parsedToken = Util.decodeJWT(token);

    if (!parsedToken) {
      return;
    }

    const { _id, username = storeUsername } = parsedToken;

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ token, user: { _id, username: username || _id } });
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
              src={logoImg}
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
