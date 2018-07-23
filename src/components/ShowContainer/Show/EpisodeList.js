import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { css } from 'emotion';

import { Episode } from '../Episodes/Episode';

const noEpisodesHeader = css`
  margin: 0;
  font-weight: 100;
`;

@inject('state')
@observer
export class EpisodeList extends Component {

  hideEpisodes() {
    const { state } = this.props;
    const { episodes: isLoading, showData: showLoading } = state.loadingStates;
    const { episodes: hasErrors } = state.errorStates;
    const { episodes = [] } = state;

    return hasErrors || showLoading || isLoading || !episodes.length;
  }

  errorText() {
    const { state } = this.props;
    const { episodes: isLoading, showData: showLoading } = state.loadingStates;
    const { episodes: hasErrors } = state.errorStates;
    const { episodes } = state;

    if (hasErrors) {
      return 'Could not get the episode list. Trying again soon...';
    }

    if (showLoading || isLoading) {
      return 'Loading...';
    }

    if (!episodes.length) {
      return 'Show has no episodes...';
    }

    return '';
  }

  render() {
    const hideEpisodes = this.hideEpisodes();
    const { state } = this.props;
    const { episodes } = state;

    if (hideEpisodes) {
      return (
        <h2 className={noEpisodesHeader}>
          <em>
            {this.errorText()}
          </em>
        </h2>
      );
    }

    return episodes.map((episode) => (
      <Episode
        episode={episode}
        key={episode._id}
      />
    ));
  }

}
