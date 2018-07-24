import React, { Component } from 'react';
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
  padding: 0 .385em .175em;
  vertical-align: baseline;
`;


export class AddEpisodeButton extends Component {

  @action.bound
  handleClick(evt) {
    evt.preventDefault();
  }

  render() {
    const classes = {
      container: containerStyle,
      icon: iconStyle,
      text: textStyle,
    };

    return (
      <ActionButton
        classes={classes}
        icon="✚"
        likesCount="Add Episode"
        onClick={this.handleClick}
      />
    );
  }

}
