import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import { header } from './ShowsHeader';

@inject('state')
@observer
export class FavouriteShowsHeader extends Component {

  showFavourites() {
    const { state } = this.props;
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
