import React, { Component } from 'react';
import { css } from 'emotion';

import { observer } from 'mobx-react';

import { getAll as getAllShows } from '../services/show.js';

// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import state from '../state.js';
import { ShowCard } from '../components/IndexContainer/ShowCard.js';

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

const showsError = css`
  grid-column: 1 / -1;
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

  renderFavouritesHeader() {
    return (
      <h2 className={allShows}>
        Favourite shows
      </h2>
    );
  }

  renderFavouritesBody() {
    const { favourites, shows: allShows } = state;
    const shows = allShows.filter(({ _id }) => favourites.includes(_id));

    return (
      <div className={showsContainer}>
        {shows.map((show) => (<ShowCard key={show._id} show={show} hideFavouriteBadge={true} />))}
      </div>
    );
  }

  renderAllShows() {
    const { shows } = state;
    const { shows: isLoading } = state.loadingStates;
    const { shows: hasErrors } = state.errorStates;

    if (isLoading) {
      return (
        <h2 className={showsError}>
          <em>
            Loading...
          </em>
        </h2>
      );
    }

    if (hasErrors) {
      return (
        <h2 className={showsError}>
          <em>
            Couln't get shows. Trying again soon...
          </em>
        </h2>
      );
    }

    return shows.map((show) => (<ShowCard key={show._id} show={show} />));
  }

  render() {
    const { shows, favourites } = state;
    const showFavourites = favourites.length && shows.length;
    return (
      <div className={showPageContainer}>
        {showFavourites ? this.renderFavouritesHeader() : null}
        {showFavourites ? this.renderFavouritesBody() : null}
        <h2 className={allShows}>
          All shows
        </h2>
        <div className={showsContainer}>
          {this.renderAllShows()}
        </div>
      </div>
    );
  }

}
