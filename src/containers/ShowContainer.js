import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { css } from 'emotion';

// eslint-disable-next-line
import state from '../state';
import defaultPoster from '../img/placeholder.png';

import { Episode } from '../components/Episode';
import { BackButton } from '../components/BackButton';
import { LikeButton } from '../components/LikeButton';
import { DislikeButton } from '../components/DislikeButton';
import { AddEpisodeButton } from '../components/AddEpisodeButton';
import { FavouriteButton } from '../components/FavouriteButton';

import { get as getShowData } from '../services/show';
import { getAll as getShowEpisodes } from '../services/episode';

const pageContainer = css`
  display: inline-grid;
  grid-template-columns: repeat(10,1fr);
  grid-template-rows: 6em auto;
  grid-row: body;
  grid-column: 2 / -2;
  align-items: center;
`;

const showContainer = css`
  display: inline-grid;
  grid-template-columns: 6fr 2fr;
  grid-column-gap: 1em;
  grid-row-gap: 1.5em;
  grid-row: 2;
  grid-column: 2 / -2;
`;

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
  margin-right: 1.2em;
`;

const likeButtonSpacer = css`
  display: inline-block;
  padding: .6em;
`;

const showDescription = css`
  grid-row: 2;
  grid-column: 1 / -3;
  font-size: 1.2em;
  text-rendering: optimizeLegibility;
  color: #616161;
`;

const episodesHeader = css`
  margin: 1em 0 .8em;
  grid-row: 3;
  grid-column: 1 / -3;
  text-transform: uppercase;
  font-weight: 100;
  color: #ff758c;
`;

const episodesContainer = css`
  display: grid;
  grid-row-gap: 1em;
  grid-row: 4;
  grid-column: 1 / -3;
  margin-top: 1.8em;
`;

const spacer = css`
  width: 100%;
  margin: 1em 0;
  border-top: 1px solid #e0e0e0;
`;

const showActionsContainer = css`
  display: inline-grid;
  grid-auto-flow: column dense;
  grid-column-gap: .8em;
  grid-column: 2;
  grid-row: 1;
  align-items: center;
  justify-items: center;
`;

const leftSide = css`
  grid-column: 1;
`;

const rightSide = css`
  grid-column: 2;
`;

const showLinks = css`
  display: block;
  margin: .5em 0;
`;

@observer
export class ShowContainer extends Component {

  getShowId() {
    const { match = {} } = this.props;
    const { params = {} } = match;
    const { showId } = params;

    return showId;
  }

  componentDidMount() {
    const showId = this.getShowId();

    getShowData(state, showId);
    getShowEpisodes(state, showId);
  }

  renderLoading() {
    return (
      <h1>Loading...</h1>
    );
  }

  renderShowData() {
    const showData = state.showData;
    const episodeList = state.episodes;

    return (
      <div className={pageContainer}>
        <BackButton />
        <div className={showContainer}>
          <div className={showTitleContainer}>
            <h1 className={showTitle}>{showData.title}</h1>
            <LikeButton likesCount={showData.likesCount} />
            <div className={likeButtonSpacer} />
            <DislikeButton likesCount={showData.likesCount} />
          </div>

          <div className={showActionsContainer}>
            <AddEpisodeButton />
            <FavouriteButton />
          </div>

          <div className={leftSide}>
            <div className={showDescription}>
              {showData.description || (<em>Show has no description...</em>)}
            </div>

            <h3 className={episodesHeader}>
              Seasons & episodes
            </h3>

            <div className={spacer} />

            <div className={episodesContainer}>
              {
                episodeList.map((episode) => (
                  <Episode
                    episode={episode}
                    key={episode._id}
                  />
                ))
              }
            </div>
          </div>

          <div className={rightSide}>
            <img
              alt={`${showData.title} poster`}
              src={showData.poster || defaultPoster}
            />

            <div className={spacer} />

            <div>
              <a href="#website" className={showLinks}>Official Website</a>
              <a href="#wikipedia" className={showLinks}>Wikipedia</a>
              <a href="#IMDB" className={showLinks}>IMDB</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { loadingStates = {} } = state;
    const { showData: isLoading = true } = loadingStates;

    return (
      isLoading ? this.renderLoading() : this.renderShowData()
    );
  }

}
