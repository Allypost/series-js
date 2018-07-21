import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { css } from 'emotion';

import { like as likeShow } from '../services/show';

import { LikeButtonImage } from './LikeButtonImage';
import state from '../state';

export const likeContainer = css`
  & {
    display: inline-grid;
    height: 3em;
    width: 6em;
    cursor: pointer;
    align-items: center;
    justify-items: center;
    padding: .5em;
    border: 1px solid #e0e0e0;
    border-radius: 2em;
    color: #616161;
    fill: #616161;
    user-select: none;
    transition: border .15s ease-out, color .15s ease-out, fill .15s ease-out, background-color .5s cubic-bezier(.25, .45, .45, .95);
  }
`;

export const likeContainerActions = css`
  &:hover {
    border-color: #2e7d32;
    color: #2e7d32;
    fill: #2e7d32;
  }

  &:active {
    background-color: #e8f5e9;
    border-color: #1b5e20;
    fill: #1b5e20;
    color: #1b5e20;
    transition: background-color .05s;
  }
`;

export const likeImage = css`
  width: 1.8em;
  grid-row: 1;
  padding: .2em .5em;
`;

export const likeText = css`
  grid-row: 1;
  padding: .62em .4em .3em;
  font-size: 1.2em;
  font-weight: 100;
`;

@observer
export class LikeButton extends Component {

  constructor(...args) {
    super(...args);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    evt.preventDefault();

    const { showData = {} } = state;

    likeShow(state, showData._id);
  }

  getContainerClass() {
    const { loadingStates } = state;
    const { showLike: isLoading } = loadingStates;

    if (isLoading) {
      return css`
        ${likeContainer}
        cursor: wait !important;
        background: rgba(0, 0, 0, .1);
      `;
    }

    return css`
      ${likeContainer}
      ${likeContainerActions}
    `;
  }

  render() {
    const { likesCount } = this.props;

    return (
      <div
        className={this.getContainerClass()}
        onClick={this.handleClick}
      >
        <span className={likeImage}>
          <LikeButtonImage alt="Like" />
        </span>
        {
          likesCount >= 0
          && (
            <span className={likeText}>
              {likesCount || 0}
            </span>
          )
        }
      </div>
    );
  }

}
