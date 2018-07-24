import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { action } from 'mobx';
import { css } from 'emotion';

import { containerStyle as defaultContainerStyle, containerActions as defaultContainerActions, iconStyle as defaultIconStyle, textStyle } from '../../_global/Buttons/ActionButtonStyles';
import { ActionButton } from '../../_global/Buttons/ActionButton';

const containerStyle = css`
  ${defaultContainerStyle}
  ${defaultContainerActions}
`;

const iconStyle = css`
  ${defaultIconStyle}
  padding: 0.12em .38em 0;
`;

@inject('state')
@observer
export class FavouriteButton extends Component {

  isFavourite() {
    const { state } = this.props;
    const { showData } = state;

    return showData.isFavourite;
  }

  getNewFavouritesList() {
    const { state } = this.props;
    const { showData, favourites: oldFavourites } = state;

    if (this.isFavourite()) {
      return oldFavourites.slice().filter((id) => id !== showData._id);
    }

    return [showData._id, ...oldFavourites];
  }

  @action.bound
  handleClick(evt) {
    evt.preventDefault();
    const newFavourites = this.getNewFavouritesList();

    const { state } = this.props;
    state.favourites.replace(newFavourites);
  }

  render() {
    const classes = {
      container: containerStyle,
      icon: iconStyle,
      text: textStyle,
    };

    const favouriteText = this.isFavourite() ? 'Un-Favourite' : 'Favourite';

    return (
      <ActionButton
        classes={classes}
        icon="♥"
        likesCount={favouriteText}
        onClick={this.handleClick}
      />
    );
  }

}
