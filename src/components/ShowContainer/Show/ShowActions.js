import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { css } from 'emotion';

import { AddEpisodeButton } from '../Buttons/AddEpisodeButton';
import { FavouriteButton } from '../Buttons/FavouriteButton';
import { AddEpisode } from './AddEpisode';

const showActionsContainer = css`
  display: inline-grid;
  grid-auto-flow: column dense;
  grid-column-gap: .8em;
  grid-column: 2;
  grid-row: 1;
  align-items: center;
  justify-items: center;
`;

@inject('state')
@observer
export class ShowActions extends Component {

  render() {
    const { state } = this.props;
    const { showData: isLoading = true } = state.loadingStates;
    const { showData: hasErrors = true } = state.errorStates;
    const { isLoggedIn } = state;

    if (!isLoggedIn || isLoading || hasErrors) {
      return (
        null
      );
    }

    return (
      <div className={showActionsContainer}>
        <AddEpisodeButton />
        <FavouriteButton />
        <AddEpisode />
      </div>
    );
  }

}
