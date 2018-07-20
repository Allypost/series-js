import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { css } from 'emotion';

import { observer } from 'mobx-react';

import { getAll as getAllShows } from './services/show.js';

// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import state from './state';
import { ShowCard } from './components/ShowCard';

const showPageContainer = css`
  display: grid;
  grid-row: body;
  grid-column: 1 / span 12;
  grid-template-columns: repeat(12, 1fr);
  padding: 2em 0;
  background-color: #eeeeee;
`;

const showsContainer = css`
  display: grid;
  grid-column: 2 / span 10;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1em 2em;
`;

const allShows = css`
  grid-column: 2 / span 10;
`;

@observer
export class IndexContainer extends Component {
  constructor(...args) {
    super(...args);
  }

  componentDidMount() {
    getAllShows(state);
  }

  render() {
    const { shows } = state;
    return (
      <div className={showPageContainer}>
        <h2 className={allShows}>
          All shows
        </h2>
        <div className={showsContainer}>
          {shows.map((show) => (<ShowCard key={show._id} show={show} />))}
        </div>
      </div>
    );
  }
}
