import React, { Component } from 'react';
import { css } from 'emotion';

import { LikeButton } from '../Buttons/LikeButton';
import { DislikeButton } from '../Buttons/DislikeButton';

const showTitleContainer = css`
  grid-column: 1 / -3;
  grid-row: 1;
  letter-spacing: -0.0468em;
`;

const showTitle = css`
  display: inline-block;
  font-size: 2.5em;
  font-weight: 300;
  margin: 0;
`;

const likeButtonSpacer = css`
  display: inline-block;
  padding: .6em;
`;

const showLikeContainer = css`
  display: inline-block;
  margin-left: 2em;
`;

export class ShowTitle extends Component {

  get text() {
    const { loading, hasErrors } = this.props;
    const { children } = this.props;

    if (loading) {
      return (
        <em>
          Loading...
        </em>
      );
    }

    if (hasErrors) {
      return (
        <em>
          Something went wrong...
        </em>
      );
    }

    return children;
  }

  render() {
    const { likesCount = 0 } = this.props;
    const { isLoggedIn } = this.props;
    const { isLiking } = this.props;
    const { onAction } = this.props;

    return (
      <div className={showTitleContainer}>
        <h1 className={showTitle}>
          {this.text}
        </h1>
        {
          isLoggedIn &&
          (
            <div className={showLikeContainer}>
              <LikeButton
                isDisabled={!isLoggedIn}
                isLoading={isLiking}
                likesCount={likesCount}
                onClick={onAction}
              />
              <div className={likeButtonSpacer} />
              <DislikeButton
                dislikesCount={-likesCount}
                isDisabled={!isLoggedIn}
                isLoading={isLiking}
                onClick={onAction}
              />
            </div>
          )
        }
      </div>
    );
  }

}
