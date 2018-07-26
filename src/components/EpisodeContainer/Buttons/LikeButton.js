import React, { Component } from 'react';
import { css } from 'emotion';
import { action } from 'mobx';

import { ActionButton, containerStyle as defaultContainerStyle, iconStyle as defaultIconStyle, textStyle as defaultTextStyle } from '../../_global/Buttons/ActionButton';

const containerStyle = css`
  ${defaultContainerStyle}
  background-color: #ffffff;
  transition: background .3s;

  .${defaultIconStyle} {
    transition: fill .3s;
  }

  .${defaultIconStyle} {
    transition: color .3s;
  }
`;

const containerActions = css`
  &:hover {
    background-color: #ff758c;
    transition: background .1s;

    .${defaultTextStyle} {
      transition: color .1s;
      color: #ffffff;
    }

    .${defaultIconStyle} {
      transition: fill .1s;
      fill: #ffffff;
    }
  }
`;

export class LikeButton extends Component {

  @action.bound
  handleClick(evt) {
    evt.preventDefault();
  }

  render() {
    const { likesCount } = this.props;
    const { loading: isLoading } = this.props;
    const { disabled: isDisabled } = this.props;

    const classes = {
      container: containerStyle,
      containerActions,
      icon: defaultIconStyle,
      text: defaultTextStyle,
    };

    const showText = likesCount >= 0;

    return (
      <ActionButton
        classes={classes}
        disabled={isDisabled}
        likesCount={likesCount}
        loading={isLoading}
        onClick={this.handleClick}
        showText={showText}
      />
    );
  }
}
