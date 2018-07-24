import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { css } from 'emotion';

import state from '../../../state';
import { AddEpisodeButton } from '../Buttons/AddEpisodeButton';
import { FavouriteButton } from '../Buttons/FavouriteButton';

const showActionsContainer = css`
  display: inline-grid;
  grid-auto-flow: column dense;
  grid-column-gap: .8em;
  grid-column: 2;
  grid-row: 1;
  align-items: center;
  justify-items: center;
`;

@observer
export class ShowActions extends Component {

  isLoggedIn() {
    const { user = {} } = state;

    return !!user.token;
  }

  getText() {
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
    const { showData: isLoading = true } = state.loadingStates;
    const { showData: hasErrors = true } = state.errorStates;
    const isLoggedIn = this.isLoggedIn();

    if (!isLoggedIn || isLoading || hasErrors) {
      return (
        null
      );
    }

    return (
      <div className={showActionsContainer}>
        <AddEpisodeButton />
        <FavouriteButton />
      </div>
    );
  }

}