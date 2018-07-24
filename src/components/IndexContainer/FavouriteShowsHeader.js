import React, { Component } from 'react';
import { observer } from 'mobx-react';

import state from '../../state';

import { header } from './ShowsHeader';

@observer
export class FavouriteShowsHeader extends Component {

  showFavourites() {
    const { shows, favourites } = state;
    const showFavourites = favourites.length && shows.length;

    return showFavourites;
  }

  render() {
    const showFavourites = this.showFavourites();

    if (!showFavourites) {
      return null;
    }

    return (
      <h2 className={header}>
        Favourite shows
      </h2>
    );
  }

}
