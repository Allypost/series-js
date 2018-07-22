import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { css } from 'emotion';
import { observer } from 'mobx-react';
import state from '../../../state';

const prettyLink = css`
  color: #ff758c;
  text-decoration: none;
`;

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
      Object.keys(state.user)
        .forEach((key) => {
          delete state.user[key];
        });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  renderLoginLink() {
    return (
      <Link
        className={prettyLink}
        to="/login"
      >
        Log in
      </Link>
    );
  }

  renderUserLink() {
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

  renderUser() {
    const { user } = state;
    const userData = Object.assign({}, user);

    if (!userData.token) {
      return this.renderLoginLink();
    }

    return this.renderUserLink();
  }

  render() {
    return (
      <div>
        {this.renderUser()}
      </div>
    );
  }

}
