import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { css } from 'emotion';
import { action } from 'mobx';

import { dislike as dislikeShow } from '../../../services/show';

import { LikeButtonImage } from './Bases/LikeButtonImage';
import { containerStyle, containerActions as likeContainerActions, iconStyle as defaultIconStyle, textStyle as defaultTextStyle } from './LikeButton';

const containerActions = css`
  ${likeContainerActions}
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

  getContainerClass() {
    const { state } = this.props;
    const { loadingStates } = state;
    const { showLike: isLoading } = loadingStates;
    const { disabled: isDisabled } = this.props;

    if (isLoading) {
      return css`
        ${containerStyle}
        cursor: wait !important;
        background: rgba(0, 0, 0, .1);
      `;
    }

    if (isDisabled) {
      return css`
        ${containerStyle}
        cursor: default !important;
      `;
    }

    return css`
      ${containerStyle}
      ${containerActions}
    `;
  }

  render() {
    const { likesCount } = this.props;

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
      <div
        className={this.getContainerClass()}
        onClick={this.handleClick}
      >
        {
          likesCount < 0 &&
          (
            <span className={textStyle}>
              {-likesCount}
            </span>
          )
        }
        <span className={iconStyle}>
          <LikeButtonImage alt="Dislke" />
        </span>
      </div>
    );
  }

}
