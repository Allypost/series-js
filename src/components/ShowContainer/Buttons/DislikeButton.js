import React, { Component } from 'react';
import { css } from 'emotion';
import { action } from 'mobx';

import { containerStyle, containerActions as defaultContainerActions, iconStyle as defaultIconStyle, textStyle as defaultTextStyle, ActionButton } from '../../_global/Buttons/ActionButton';

const containerActions = css`
  ${defaultContainerActions}
  &:hover {
    border-color: #f44336;
    color: #f44336;
    fill: #f44336;
  }

  &:active {
    background-color: #ffebef;
    border-color: #b71c1c;
    color: #b71c1c;
    fill: #b71c1c;
  }
`;

const textStyle = css`
  ${defaultTextStyle}
  color: #b71c1c;
  float: left;
  margin-right: .6em;
  margin-left: 0;
`;

const iconStyle = css`
  ${defaultIconStyle}
  transform: rotateZ(180deg);
`;

export class DislikeButton extends Component {

  @action.bound
  handleClick(evt) {
    evt.preventDefault();

    const { isLoading, isDisabled } = this.props;

    if (isDisabled || isLoading) {
      return null;
    }

    const { onClick } = this.props;

    return onClick('dislike');
  }

  render() {
    const classes = {
      container: containerStyle,
      containerActions,
      text: textStyle,
      icon: iconStyle,
    };

    const { isDisabled, isLoading } = this.props;

    const { dislikesCount } = this.props;
    const showText = dislikesCount > 0;

    return (
      <ActionButton
        classes={classes}
        disabled={isDisabled}
        likesCount={dislikesCount}
        loading={isLoading}
        onClick={this.handleClick}
        showText={showText}
      />
    );
  }

}
