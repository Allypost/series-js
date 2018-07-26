import React, { Component } from 'react';
import { css } from 'emotion';
import { action } from 'mobx';

import { containerStyle as defaultContainerStyle, iconStyle as defaultIconStyle, textStyle as defaultTextStyle, ActionButton } from '../../_global/Buttons/ActionButton';

const textStyle = css`
  ${defaultTextStyle}
  float: left;
  margin-right: .6em;
  margin-left: 0;
  color: #b71c1c;
  transition: color .3s;
`;

const iconStyle = css`
  ${defaultIconStyle}
  transform: rotateZ(180deg);
  transition: fill .3s;
`;

const containerStyle = css`
  ${defaultContainerStyle}
  background-color: #ffffff;
  transition: background .3s;
`;

const containerActions = css`
  &:hover {
    background-color: #ff758c;
    transition: background .1s;

    .${textStyle} {
      transition: color .1s;
      color: #ffffff;
    }

    .${iconStyle} {
      transition: fill .1s;
      fill: #ffffff;
    }
  }
`;

export class DislikeButton extends Component {

  @action.bound
  handleClick(evt) {
    evt.preventDefault();
  }

  render() {
    const classes = {
      container: containerStyle,
      containerActions,
      text: textStyle,
      icon: iconStyle,
    };

    const { showLike: isLoading } = this.props;
    const { disabled: isDisabled } = this.props;

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
