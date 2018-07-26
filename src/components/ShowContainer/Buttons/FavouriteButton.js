import React, { Component } from 'react';
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

export class FavouriteButton extends Component {

  render() {
    const classes = {
      container: containerStyle,
      icon: iconStyle,
      text: textStyle,
    };

    const { onClick, isFavourite } = this.props;
    const favouriteText = isFavourite ? 'Un-Favourite' : 'Favourite';

    return (
      <ActionButton
        classes={classes}
        icon="♥"
        likesCount={favouriteText}
        onClick={onClick}
      />
    );
  }

}
