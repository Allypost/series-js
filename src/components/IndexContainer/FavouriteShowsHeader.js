import React, { Component } from 'react';

import { header } from './ShowsHeader';

export class FavouriteShowsHeader extends Component {

  render() {
    const { show } = this.props;

    if (!show) {
      return null;
    }

    return (
      <h2 className={header}>
        Favourite shows
      </h2>
    );
  }

}
