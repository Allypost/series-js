import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { css } from 'emotion';

const prettyLink = css`
  color: #ff758c;
  text-decoration: none;
`;

export class UserDisplay extends Component {

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
        to="/"
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
