import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { css } from 'emotion';

import { like as likeShow } from '../../../services/show';

import { containerStyle as defaultContainerStyle, iconStyle as defaultIconStyle, textStyle as defaultTextStyle } from './Bases/SeriesActionButton';

import { LikeButtonImage } from './Bases/LikeButtonImage';
import state from '../../../state';

export const containerStyle = css`
  & {
    ${defaultContainerStyle}
    padding: .5em 1em !important;
  }
`;

export const containerActions = css`
  & {
    transition: border .15s ease-out, color .15s ease-out, fill .15s ease-out, background-color .5s cubic-bezier(.25, .45, .45, .95);
  }

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

export const textStyle = css`
  grid-row: 1;
  margin-left: .6em;
  font-size: 1.2em;
  font-weight: 100;
  color: #2e7d32;
`;

export const iconStyle = css`
  ${defaultIconStyle}
  display: inline-block;
  height: 1.3em;
  width: 1.2em;
  background-color: transparent;
  padding: 0 .1em;
`;

@observer
export class LikeButton extends Component {

  constructor(...args) {
    super(...args);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    evt.preventDefault();

    const { disabled: isDisabled } = this.props;

    if (isDisabled) {
      return;
    }

    const { showData = {} } = state;

    likeShow(state, showData._id);
  }

  getContainerClass() {
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
      <div
        className={this.getContainerClass()}
        onClick={this.handleClick}
      >
        <span className={iconStyle}>
          <LikeButtonImage alt="Like" />
        </span>
        {
          likesCount >= 0
          && (
            <span className={textStyle}>
              {likesCount || 0}
            </span>
          )
        }
      </div>
    );
  }

}
