import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { css } from 'emotion';

import state from '../../state';
import { ShowCard } from './ShowCard';

const errorHeader = css`
  grid-column: 1 / -1;
`;

export const container = css`
  display: grid;
  grid-column: 2 / span 10;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1em 2em;
  align-items: baseline;
`;

@observer
export class ShowsList extends Component {

  hideShows() {
    const { shows: isLoading } = state.loadingStates;
    const { shows: hasErrors } = state.errorStates;

    return isLoading || hasErrors;
  }

  errorText() {
    const { shows: isLoading } = state.loadingStates;
    const { shows: hasErrors } = state.errorStates;

    if (isLoading) {
      return 'Loading...';
    }

    if (hasErrors) {
      return 'Could not get shows. Trying again soon...';
    }

    return '';
  }

  render() {
    const { shows } = state;
    const hideShows = this.hideShows();

    if (hideShows) {
      return (
        <h2 className={errorHeader}>
          <em>
            {this.errorText()}
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
