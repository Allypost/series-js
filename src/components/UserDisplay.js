import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { css } from 'emotion';

const prettyLink = css`
  color: #ff758c;
  text-decoration: none;
`;

export class UserDisplay extends Component {
  renderUser() {
    const { user } = this.props;

    if (!user._id) {
      return (
        <Link
          className={prettyLink}
          to="/login"
        >
          Log in
        </Link>
      );
    }

    return (
      <Link
        className={prettyLink}
        to="/"
      >
        Hi,
        &nbsp;
        {user.username}
      </Link>
    );
  }

  render() {
    return (
      <div>
        {this.renderUser()}
      </div>
    );
  }

}
