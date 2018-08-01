import React, { Component } from 'react';
import { css } from 'emotion';

import { ShowCard } from './ShowCard';

const errorHeader = css`
  grid-column: 2 / -2;
  font-weight: bold;
`;

export const container = css`
  display: grid;
  grid-column: 2 / span 10;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1em 2em;
  align-items: baseline;
`;

export class ShowsList extends Component {

  get hideShows() {
    const { isLoading, hasErrors } = this.props;

    return isLoading || hasErrors;
  }

  get errorText() {
    const { isLoading, hasErrors } = this.props;

    if (isLoading) {
      return 'Loading...';
    }

    if (hasErrors) {
      return 'Could not get shows. Trying again soon...';
    }

    return '';
  }

  render() {
    const { shows } = this.props;

    if (this.hideShows) {
      return (
        <h2 className={errorHeader}>
          <em>
            {this.errorText}
          </em>
        </h2>
      );
    }

    return (
      <div className={container}>
        {
          shows.map((show) => (
            <ShowCard
              key={show._id}
              show={show}
            />
          ))
        }
      </div>
    );
  }

}
