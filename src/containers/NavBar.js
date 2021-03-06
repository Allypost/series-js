import { observer, inject } from 'mobx-react';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { action } from 'mobx';
import { css } from 'emotion';
import { UserDisplay } from '../components/_global/NavBar/UserDisplay';

import logoImg from '../img/img-logo-horizontal@3x.png';

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

@inject('state')
@observer
export class NavBar extends Component {

  @action.bound
  handleLogin() {
    const { state } = this.props;
    const { modalStates } = state;

    modalStates.login = true;
  }

  render() {
    const { state } = this.props;
    const { user, isLoggedIn } = state;

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
          <UserDisplay
            isLoggedIn={isLoggedIn}
            onLogin={this.handleLogin}
            user={user}
          />
        </div>
      </nav>
    );
  }

}
