import React, { Component } from 'react';
import { css } from 'emotion';

import { containerStyle as defaultContainerStyle, containerActions as defaultContainerActions, iconStyle as defaultIconStyle, textStyle as defaultTextStyle } from './Bases/SeriesActionButton';


const containerStyle = css`
  ${defaultContainerStyle}
  ${defaultContainerActions}
`;

const iconStyle = css`
  ${defaultIconStyle}
  padding: 0 .385em .175em;
  vertical-align: baseline;
`;


export class AddEpisodeButton extends Component {

  render() {
    return (
      <div className={containerStyle}>
        <span className={iconStyle}>
          ✚
        </span>
        <span className={defaultTextStyle}>
          Add Episode
        </span>
      </div>
    );
  }

}
