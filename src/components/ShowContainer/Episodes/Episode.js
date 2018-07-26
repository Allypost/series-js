import React, { Component } from 'react';
import { css } from 'emotion';
import { Link } from 'react-router-dom';
import { inject } from 'mobx-react';

import defaultPoster from '../../../img/placeholder.episode.png';

import { get as getEpisodeData } from '../../../services/episode';

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

@inject('state')
export class Episode extends Component {

  componentDidMount() {
    const { episode } = this.props;
    const { state } = this.props;

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
    const { isLoading } = this.props;

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
              <Link to={`/episode/${episode._id}`}>
                {episode.title}
              </Link>
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
