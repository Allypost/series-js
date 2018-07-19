import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { css } from 'emotion';

const prettyLink = css`
  color: #ff758c;
  text-decoration: none;
`;

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
      window.location.href = '/logout';
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

  renderUser() {
    const { user } = this.props;

    if (!user._id) {
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
