import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { css } from 'emotion';

import { dislike as dislikeShow } from '../services/show';

import { LikeButtonImage } from './LikeButtonImage';
import { likeContainer, likeContainerActions, likeImage } from './LikeButton';
import state from '../state';

const dislikeContainer = css`
  ${likeContainer}
  & {
    width: 3em;
  }
`;

const dislikeContainerActions = css`
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

const dislikeImage = css`
  ${likeImage}
  transform: rotateZ(180deg) translateY(-.1em);
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
        ${dislikeContainer}
        cursor: wait !important;
        background: rgba(0, 0, 0, .1);
      `;
    }

    return css`
      ${dislikeContainer}
      ${dislikeContainerActions}
    `;
  }

  render() {
    return (
      <div
        className={this.getContainerClass()}
        onClick={this.handleClick}
      >
        <span className={dislikeImage}>
          <LikeButtonImage alt="Dislke" />
        </span>
      </div>
    );
  }

}
