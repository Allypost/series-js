import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { runInAction } from 'mobx';
import { css } from 'emotion';

import { containerStyle as defaultContainerStyle, containerActions as defaultContainerActions, iconStyle as defaultIconStyle, textStyle as defaultTextStyle } from './Bases/SeriesActionButton';
import state from '../../../state';


const containerStyle = css`
  ${defaultContainerStyle}
  ${defaultContainerActions}
`;

const iconStyle = css`
  ${defaultIconStyle}
  padding: 0.12em .38em 0;
`;

@observer
export class FavouriteButton extends Component {

  constructor(...args) {
    super(...args);

    this.handleClick = this.handleClick.bind(this);
  }

  isFavourite() {
    const { favourites, showData } = state;

    return favourites.includes(showData._id);
  }

  getNewFavouritesList() {
    const { showData, favourites: oldFavourites } = state;

    if (this.isFavourite()) {
      return oldFavourites.slice().filter((id) => id !== showData._id);
    }

    return [showData._id, ...oldFavourites];
  }

  handleClick(evt) {
    evt.preventDefault();
    const newFavourites = this.getNewFavouritesList();

    runInAction(() => {
      state.favourites.replace(newFavourites);
    });
  }

  render() {
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
      <div
        className={containerStyle}
        onClick={this.handleClick}
      >
        <span className={iconStyle}>
          ♥
        </span>
        <span className={defaultTextStyle}>
          {this.isFavourite() ? 'Un-Favourite' : 'Favourite'}
        </span>
      </div>
    );
  }

}
