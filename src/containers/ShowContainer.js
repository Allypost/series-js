import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { css } from 'emotion';

// eslint-disable-next-line
import state from '../state';

import { Episode } from '../components/Episode';
import { BackButton } from '../components/BackButton';
import { LikeButton } from '../components/LikeButton';
import { DislikeButton } from '../components/DislikeButton';

import { get as getShowData } from '../services/show';
import { getAll as getShowEpisodes } from '../services/episode';

const pageContainer = css`
  display: inline-grid;
  grid-template-columns: repeat(10, 1fr);
  grid-row: body;
  grid-column: 2 / -2;
`;

const showContainer = css`
  display: inline-grid;
  grid-template-columns: repeat(8, 1fr);
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
  margin-top: 0;
  margin-right: 1.2em;
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
  border-top: 1px solid #E0E0E0;
  padding-top: 1em;
`;

const spacer = css`
  display: inline-block;
  margin: 0 .6em;
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
            <div className={spacer}></div>
            <DislikeButton />
          </div>

          <div className={showDescription}>
            {showData.description || (<em>Show has no description...</em>)}
          </div>
          
          <h3 className={episodesHeader}>
            Seasons & episodes
          </h3>
          
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
