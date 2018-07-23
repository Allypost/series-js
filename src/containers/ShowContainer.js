import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { css } from 'emotion';

import defaultPoster from '../img/placeholder.png';

import { BackButton } from '../components/ShowContainer/Buttons/BackButton';

import { get as getShowData } from '../services/show';
import { getAll as getShowEpisodes } from '../services/episode';
import { ShowTitle } from '../components/ShowContainer/Show/ShowTitle';
import { ShowActions } from '../components/ShowContainer/Show/ShowActions';
import { ShowDescription } from '../components/ShowContainer/Show/ShowDescription';
import { EpisodeList } from '../components/ShowContainer/Show/EpisodeList';

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
  grid-template-columns: 4fr 2fr;
  grid-column-gap: 1em;
  grid-row-gap: 1.5em;
  grid-row: 2;
  grid-column: 2 / -2;
  align-items: stretch;
`;

const episodesHeader = css`
  margin: 1em 0 .8em;
  grid-row: 3;
  grid-column: 1 / -3;
  text-transform: uppercase;
  font-weight: 100;
  color: #ff758c;
`;

const spacer = css`
  width: 100%;
  margin: 1em 0;
  border-top: 1px solid #e0e0e0;
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

const showImage = css`
  width: 100%;
`;

@inject('state')
@observer
export class ShowContainer extends Component {

  constructor(...args) {
    super(...args);

    this.timer = null;
  }

  componentDidMount() {
    const showId = this.getShowId();
    const { state } = this.props;

    getShowData(state, showId);
    getShowEpisodes(state, showId);
    this.timer = setInterval(this.dataChecker.bind(this), 3000);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  getShowId() {
    const { match = {} } = this.props;
    const { params = {} } = match;
    const { showId } = params;

    return showId;
  }

  dataChecker() {
    const showId = this.getShowId();
    const { state } = this.props;
    const { episodes: episodeErrors, showData: showErrors } = state.errorStates;

    if (showErrors) {
      getShowData(state, showId);
    }

    if (episodeErrors) {
      getShowEpisodes(state, showId);
    }
  }

  render() {
    const { state } = this.props;
    const { showData } = state;
    const imageUrl = showData.imageUrl ? `https://api.infinum.academy${showData.imageUrl}` : defaultPoster;

    return (
      <div
        className={pageContainer}
        data-favourite={showData.isFavourite}
      >
        <BackButton />
        <div className={showContainer}>
          <ShowTitle />
          <ShowActions />

          <div className={leftSide}>
            <ShowDescription />

            <h3 className={episodesHeader}>
              Seasons & episodes
            </h3>

            <div className={spacer} />

            <EpisodeList />
          </div>

          <div className={rightSide}>
            <img
              alt={`${showData.title} poster`}
              className={showImage}
              src={imageUrl}
            />

            <div className={spacer} />

            <div>
              <a
                className={showLinks}
                href="#website"
              >
                Official Website
              </a>
              <a
                className={showLinks}
                href="#wikipedia"
              >
                Wikipedia
              </a>
              <a
                className={showLinks}
                href="#IMDB"
              >
                IMDB
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
