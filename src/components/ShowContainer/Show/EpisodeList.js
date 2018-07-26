import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { css } from 'emotion';

import { Episode } from '../Episodes/Episode';

const noEpisodesHeader = css`
  margin: 0;
  font-weight: 100;
`;

@observer
export class EpisodeList extends Component {

  get hide() {
    const { isLoading, hasErrors, episodes } = this.props;

    return hasErrors || isLoading || !episodes.length;
  }

  errorText() {
    const { isLoading, hasErrors, episodes } = this.props;

    if (hasErrors) {
      return 'Could not get the episode list. Trying again soon...';
    }

    if (isLoading) {
      return 'Loading...';
    }

    if (!episodes.length) {
      return 'Show has no episodes...';
    }

    return '';
  }

  render() {
    const { episodes } = this.props;

    if (this.hide) {
      return (
        <h2 className={noEpisodesHeader}>
          <em>
            {this.errorText()}
          </em>
        </h2>
      );
    }

    const { episodeLoading } = this.props;
    return episodes.map((episode) => {
      const { [episode._id]: isLoading = true } = episodeLoading;
      
      return (
        <Episode
          episode={episode}
          isLoading={isLoading}
          key={episode._id}
        />
      );
    });
  }

}
