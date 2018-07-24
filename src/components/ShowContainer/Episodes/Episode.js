import React, { Component } from 'react';
import { css } from 'emotion';
import { observer } from 'mobx-react';

import defaultPoster from '../../../img/placeholder.episode.png';

import { get as getEpisodeData } from '../../../services/episode';
// eslint-disable-next-line
import state from "../../../state";

const episodeImage = css`
  grid-column: 1;
  width: 100%;
`;

const episodeDetails = css`
  grid-column: 2;
  display: inline-grid;
  grid-template-rows: 2em auto;
  align-items: center;
  color: #212121;
`;

const episodeTitleContainer = css`
  font-size: 1.1em;
`;

const episodeTitle = css`
  margin-left: 1em;
  transition: color .2s ease-out;
`;

const episodeSeason = css`
  color: #ff758c;
`;

const episodeDescription = css`
  align-self: baseline;
`;

const episodeContainer = css`
  & {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: 12em auto;
    grid-column-gap: 1em;
    padding: .5em;
    background-color: #fff;
    transition: background .2s ease-out;
  }

  &:hover {
    background-color: #f5f5f5;

    .${episodeTitle} {
      color: #ff758c;
    }
  }
`;

@observer
export class Episode extends Component {

  componentDidMount() {
    const { episode } = this.props;

    getEpisodeData(state, episode._id);
  }

  getTrimmedDescription() {
    const { episode } = this.props;
    const { description = '' } = episode;

    const trimToLength = 240;

    if (description.length < trimToLength) {
      return (
        <span>
          {description}
        </span>
      );
    }
    const simpleTrimmedDescription = description.substr(0, trimToLength - 1);
    const lastSpace = simpleTrimmedDescription.lastIndexOf(' ');
    const trimmedDescription = simpleTrimmedDescription.substr(0, lastSpace);

    return (
      <span>
        {trimmedDescription}
        &hellip;
      </span>
    );
  }

  getSeasonText() {
    const { episode } = this.props;
    const { loadingStates } = state;
    const { episodeData = {} } = loadingStates;
    const isLoadingSet = episodeData[episode._id];
    // eslint-disable-next-line no-undefined
    const isLoading = isLoadingSet === undefined || isLoadingSet;

    if (isLoading) {
      return '...';
    }

    return `S${episode.season} Ep${episode.episodeNumber}`;
  }

  render() {
    const { episode } = this.props;
    const imageUrl = episode.imageUrl ? `https://api.infinum.academy${episode.imageUrl}` : defaultPoster;

    return (
      <div className={episodeContainer}>
        <img
          alt={`${episode.title} poster`}
          className={episodeImage}
          src={imageUrl}
        />
        <div className={episodeDetails}>
          <div className={episodeTitleContainer}>
            <span className={episodeSeason}>
              {this.getSeasonText()}
            </span>
            <span className={episodeTitle}>
              {episode.title}
            </span>
          </div>
          <div className={episodeDescription}>
            {this.getTrimmedDescription()}
          </div>
        </div>
      </div>
    );
  }

}
