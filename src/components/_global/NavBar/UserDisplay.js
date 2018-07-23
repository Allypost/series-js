import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { css } from 'emotion';
import { observer, inject } from 'mobx-react';
import { runInAction } from 'mobx';

const prettyLink = css`
  color: #ff758c;
  text-decoration: none;
`;

@inject('state')
@observer
export class UserDisplay extends Component {

  constructor(...args) {
    super(...args);

    this.handleLogout = this.handleLogout.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  handleLogout(evt) {
    evt.preventDefault();

    const confirm = window.confirm('Do you want to log out?');

    if (confirm) {
      const { state } = this.props;
      Object.keys(state.user)
        .forEach((key) => {
          runInAction(() => {
            delete state.user[key];
          });
        });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getLoginLink() {
    return (
      <Link
        className={prettyLink}
        to="/login"
      >
        Log in
      </Link>
    );
  }

  getLogoutLink() {
    const { state } = this.props;
    const { user } = state;

    return (
      <Link
        className={prettyLink}
        onClick={this.handleLogout}
        to="/logout"
      >
        Hi,
        &nbsp;
        {user.username}
      </Link>
    );
  }

  render() {
    const { state } = this.props;
    const { isLoggedIn } = state;

    if (isLoggedIn) {
      return this.getLogoutLink();
    }

    return this.getLoginLink();
  }

}
