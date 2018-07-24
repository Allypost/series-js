import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { css } from 'emotion';

import { getAll as getAllShows } from '../services/show';

import state from '../state';
import { FavouriteShowsHeader } from '../components/IndexContainer/FavouriteShowsHeader';
import { FavouriteShowsList } from '../components/IndexContainer/FavouriteShowsList';
import { ShowsList } from '../components/IndexContainer/ShowsList';
import { ShowsHeader } from '../components/IndexContainer/ShowsHeader';

const showPageContainer = css`
  display: grid;
  grid-row: body;
  grid-column: 1 / span 12;
  grid-template-columns: repeat(12, 1fr);
  padding: 2em 0;
  background-color: #eeeeee;
`;

@observer
export class IndexContainer extends Component {

  constructor(...args) {
    super(...args);

    this.timer = null;
  }

  componentDidMount() {
    getAllShows(state);
    this.timer = setInterval(this.dataChecker.bind(this), 3000);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  dataChecker() {
    const { shows: hasErrors } = state.errorStates;

    if (hasErrors) {
      getAllShows(state);
    }
  }

  render() {
    return (
      <div className={showPageContainer}>
        <FavouriteShowsHeader />
        <FavouriteShowsList />
        <ShowsHeader />
        <ShowsList />
      </div>
    );
  }

}