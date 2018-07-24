import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { css } from 'emotion';
import { action } from 'mobx';

import { dislike as dislikeShow } from '../../../services/show';

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

@inject('state')
@observer
export class DislikeButton extends Component {

  @action.bound
  handleClick(evt) {
    evt.preventDefault();

    const { state } = this.props;
    const { loadingStates } = state;
    const { showLike: isLoading } = loadingStates;
    const { disabled: isDisabled } = this.props;

    if (isDisabled || isLoading) {
      return;
    }

    const { showData = {} } = state;

    dislikeShow(state, showData._id);
  }

  render() {
    const { likesCount } = this.props;
    const dislikeCount = likesCount < 0 ? -likesCount : -1;
    const classes = {
      container: containerStyle,
      containerActions,
      text: textStyle,
      icon: iconStyle,
    };

    const { state } = this.props;
    const { loadingStates } = state;
    const { showLike: isLoading } = loadingStates;
    const { disabled: isDisabled } = this.props;

    return (
      <ActionButton
        classes={classes}
        disabled={isDisabled}
        likesCount={dislikeCount}
        loading={isLoading}
        onClick={this.handleClick}
      />
    );
  }

}
