import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { css } from 'emotion';

import { dislike as dislikeShow } from '../../../services/show';

import { LikeButtonImage } from './Bases/LikeButtonImage';
import { containerStyle, containerActions as likeContainerActions, iconStyle as defaultIconStyle, textStyle as defaultTextStyle } from './LikeButton';

import state from '../../../state';

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


@observer
export class DislikeButton extends Component {

  constructor(...args) {
    super(...args);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    evt.preventDefault();

    const { showData = {} } = state;

    dislikeShow(state, showData._id);
  }

  getContainerClass() {
    const { loadingStates } = state;
    const { showLike: isLoading } = loadingStates;

    if (isLoading) {
      return css`
        ${containerStyle}
        cursor: wait !important;
        background: rgba(0, 0, 0, .1);
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
      <div
        className={this.getContainerClass()}
        onClick={this.handleClick}
      >
        {
          likesCount < 0
          && (
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
