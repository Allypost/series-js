import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
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

@inject('state')
@observer
export class ShowTitle extends Component {

  getText() {
    const { state } = this.props;
    const { showData: isLoading = true } = state.loadingStates;
    const { showData: hasErrors = true } = state.errorStates;
    const { showData } = state;

    if (isLoading) {
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

    return showData.title;
  }

  render() {
    const { state } = this.props;
    const { showData } = state;
    const { likesCount = 0 } = showData;
    const { isLoggedIn } = state;

    return (
      <div className={showTitleContainer}>
        <h1 className={showTitle}>
          {this.getText()}
        </h1>
        {
          isLoggedIn &&
          (
            <div className={showLikeContainer}>
              <LikeButton
                disabled={!isLoggedIn}
                likesCount={likesCount}
              />
              <div className={likeButtonSpacer} />
              <DislikeButton
                disabled={!isLoggedIn}
                dislikesCount={-likesCount}
              />
            </div>
          )
        }
      </div>
    );
  }

}
