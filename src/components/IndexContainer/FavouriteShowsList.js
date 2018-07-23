import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import { ShowCard } from './ShowCard';
import { container } from './ShowsList';

@inject('state')
@observer
export class FavouriteShowsList extends Component {

  showFavourites() {
    const { state } = this.props;
    const { shows, favourites } = state;
    const showFavourites = favourites.length && shows.length;

    return showFavourites;
  }

  render() {
    const { state } = this.props;
    const { favourites, shows: allShows } = state;
    const shows = allShows.filter(({ _id }) => favourites.includes(_id));

    return (
      <div className={container}>
        {
          shows.map((show) => (
            <ShowCard
              hideFavouriteBadge
              key={show._id}
              show={show}
            />
          ))
        }
      </div>
    );
  }

}
