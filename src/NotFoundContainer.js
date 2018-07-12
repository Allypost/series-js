import React, { Component } from 'react';

import { Link } from 'react-router-dom';

export class NotFoundContainer extends Component {

  render() {
    return (
      <div>
        <h1>
          Page Not Found...
        </h1>
        <h3>
          <Link to='/'>
            Go to homepage
          </Link>
        </h3>
      </div>
    );
  }
}
