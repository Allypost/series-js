import React, { Component } from 'react';
import { css } from 'emotion';

import { containerStyle as defaultContainerStyle, containerActions as defaultContainerActions, iconStyle as defaultIconStyle, textStyle as defaultTextStyle } from './Bases/SeriesActionButton';


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
    return (
      <div className={containerStyle}>
        <span className={iconStyle}>
          ♥
        </span>
        <span className={defaultTextStyle}>
          Favourite
        </span>
      </div>
    );
  }

}
