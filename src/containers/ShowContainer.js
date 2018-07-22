import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { css } from 'emotion';

// eslint-disable-next-line
import state from '../state';
import defaultPoster from '../img/placeholder.png';

import { Episode } from '../components/ShowContainer/Episodes/Episode';
import { BackButton } from '../components/ShowContainer/Buttons/BackButton';
import { LikeButton } from '../components/ShowContainer/Buttons/LikeButton';
import { DislikeButton } from '../components/ShowContainer/Buttons/DislikeButton';
import { AddEpisodeButton } from '../components/ShowContainer/Buttons/AddEpisodeButton';
import { FavouriteButton } from '../components/ShowContainer/Buttons/FavouriteButton';

import { get as getShowData } from '../services/show';
import { getAll as getShowEpisodes } from '../services/episode';
import Util from '../helpers/Util';

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

const noEpisodesHeader = css`
  margin: 0;
  font-weight: 100;
`;

@observer
export class ShowContainer extends Component {

  constructor(...args) {
    super(...args);

    this.timer = null;
  }

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
    this.timer = setInterval(this.dataChecker.bind(this), 3000);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  dataChecker() {
    const showId = this.getShowId();
    const { episodes: episodeErrors, showData: showErrors } = state.errorStates;

    if (showErrors) {
      getShowData(state, showId);
    }

    if (episodeErrors) {
      getShowEpisodes(state, showId);
    }
  }

  renderLoading() {
    return (
      <h1>Loading...</h1>
    );
  }

  isLoggedIn() {
    const userToken = Util.getUserToken();

    return !!userToken.length;
  }

  renderDescription() {
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
          Couln't get the show data. Trying again soon...
        </em>
      );
    }

    if (!showData.description) {
      return (
        <em>
          Show has no description...
        </em>
      );
    }

    return showData.description;
  }

  renderEpisodes() {
    const { episodes: isLoading, showData: showLoading } = state.loadingStates;
    const { episodes: hasErrors } = state.errorStates;
    const { episodes } = state;

    if (hasErrors) {
      return (
        <h2 className={noEpisodesHeader}>
          <em>
            Couldn't get the episode list. Trying again soon...
          </em>
        </h2>
      );
    }

    if (showLoading || isLoading) {
      return (
        <h2 className={noEpisodesHeader}>
          <em>
            Loading...
          </em>
        </h2>
      );
    }

    if (!episodes.length) {
      return (
        <h2 className={noEpisodesHeader}>
          <em>
            Show has no episodes...
          </em>
        </h2>
      );
    }

    return (
      episodes.map((episode) => (
        <Episode
          episode={episode}
          key={episode._id}
        />
      ))
    );
  }

  renderShowTitle() {
    const { showData: isLoading = true } = state.loadingStates;
    const { showData: hasErrors = true } = state.errorStates;
    const { showData } = state;
    const isLoggedIn = this.isLoggedIn();

    const { likesCount = 0 } = showData;

    if (isLoading) {
      return (
        <div className={showTitleContainer}>
          <h1 className={showTitle}>Loading...</h1>
        </div>
      );
    }

    if (hasErrors) {
      return (
        <div className={showTitleContainer}>
          <h1 className={showTitle}>
            <em>
              Something went wrong...
            </em>
          </h1>
        </div>
      );
    }

    return (
      <div className={showTitleContainer}>
        <h1 className={showTitle}>{showData.title}</h1>
        <LikeButton likesCount={likesCount} disabled={!isLoggedIn} />
        <div className={likeButtonSpacer} />
        <DislikeButton likesCount={likesCount} disabled={!isLoggedIn} />
      </div>
    )
  }

  renderEpisodeActions() {
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

  render() {
    const { showData } = state;

    return (
      <div className={pageContainer} data-favourite={showData.isFavourite}>
        <BackButton />
        <div className={showContainer}>
          {this.renderShowTitle()}

          {this.renderEpisodeActions()}

          <div className={leftSide}>
            <div className={showDescription}>
              {this.renderDescription()}
            </div>

            <h3 className={episodesHeader}>
              Seasons & episodes
            </h3>

            <div className={spacer} />

            <div className={episodesContainer}>
              {this.renderEpisodes()}
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

}
