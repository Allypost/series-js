import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { css } from 'emotion';
import { action } from 'mobx';
import { PropTypes } from 'prop-types';

const prettyLink = css`
  color: #ff758c;
  text-decoration: none;
`;

export class UserDisplay extends Component {

  @action.bound
  // eslint-disable-next-line class-methods-use-this
  handleLogout(evt) {
    evt.preventDefault();

    const confirm = window.confirm('Do you want to log out?');

    if (confirm) {
      const { user } = this.props;
      Object.keys(user)
        .forEach((key) => {
          delete user[key];
        });
    }
  }

  @action.bound
  handleLogin(evt) {
    evt.preventDefault();

    const { onLogin } = this.props;

    onLogin();
  }

  // eslint-disable-next-line class-methods-use-this
  getLoginLink() {
    return (
      <Link
        className={prettyLink}
        onClick={this.handleLogin}
        to="/login"
      >
        Log in
      </Link>
    );
  }

  getLogoutLink() {
    const { user } = this.props;

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
    const { isLoggedIn } = this.props;

    if (isLoggedIn) {
      return this.getLogoutLink();
    }

    return this.getLoginLink();
  }

}

UserDisplay.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    token: PropTypes.string,
    username: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};
