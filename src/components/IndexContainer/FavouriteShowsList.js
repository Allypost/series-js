import React, { Component } from 'react';
import { observer } from 'mobx-react';

import state from '../../state';
import { ShowCard } from './ShowCard';
import { container } from './ShowsList';

@observer
export class FavouriteShowsList extends Component {

  showFavourites() {
    const { shows, favourites } = state;
    const showFavourites = favourites.length && shows.length;

    return showFavourites;
  }

  render() {
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
