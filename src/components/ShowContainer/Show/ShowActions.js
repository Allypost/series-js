import React, { Component } from 'react';
import { css } from 'emotion';

import { AddEpisodeButton } from '../Buttons/AddEpisodeButton';
import { FavouriteButton } from '../Buttons/FavouriteButton';

const showActionsContainer = css`
  display: inline-grid;
  grid-auto-flow: column dense;
  grid-column-gap: .8em;
  grid-column: 2;
  grid-row: 1;
  align-items: center;
  justify-items: center;
`;

export class ShowActions extends Component {

  render() {
    const { isFavourite, show } = this.props;
    const { onAddEpisode, onFavourite } = this.props;

    if (!show) {
      return (
        null
      );
    }

    return (
      <div className={showActionsContainer}>
        <AddEpisodeButton onClick={onAddEpisode} />
        <FavouriteButton
          isFavourite={isFavourite}
          onClick={onFavourite}
        />
      </div>
    );
  }

}
