import React, { Component } from 'react';
import { css } from 'emotion';

const showDescription = css`
  grid-row: 2;
  grid-column: 1 / -3;
  font-size: 1.2em;
  text-rendering: optimizeLegibility;
  color: #616161;
`;

export class ShowDescription extends Component {

  get text() {
    const { isLoading, hasErrors } = this.props;
    const { description } = this.props;

    if (isLoading) {
      return (
        <em>
          Loading...
        </em>
      );
    }

    if (hasErrors) {
      return (
        <em>
          Could not get the show data. Trying again soon...
        </em>
      );
    }

    if (!description) {
      return (
        <em>
          Show has no description...
        </em>
      );
    }

    return description;
  }

  render() {
    return (
      <div className={showDescription}>
        {this.text}
      </div>
    );
  }

}
