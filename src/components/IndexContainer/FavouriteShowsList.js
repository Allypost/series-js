import React, { Component } from 'react';

import { ShowCard } from './ShowCard';
import { container } from './ShowsList';

export class FavouriteShowsList extends Component {

  render() {
    const { favourites, shows: allShows } = this.props;
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
