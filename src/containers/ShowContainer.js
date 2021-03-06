import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { css } from 'emotion';
import { action } from 'mobx';
import queryString from 'query-string';

import defaultPoster from '../img/placeholder.png';

import { BackButton } from '../components/ShowContainer/Buttons/BackButton';

import { get as getShowData, like as likeShow, dislike as dislikeShow } from '../services/show';
import { getAll as getShowEpisodes, add as addEpisode, get as getEpisodeData } from '../services/episode';
import { ShowTitle } from '../components/ShowContainer/Show/ShowTitle';
import { ShowActions } from '../components/ShowContainer/Show/ShowActions';
import { ShowDescription } from '../components/ShowContainer/Show/ShowDescription';
import { EpisodeList } from '../components/ShowContainer/Show/EpisodeList';
import { EpisodePages } from '../components/ShowContainer/Show/EpisodePages';
import { Episode } from '../components/ShowContainer/Episodes/Episode';


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

const backgroundFader = css`
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .45);
`;

const episodesPagesContainer = css`
  width: 100%;
  text-align: center;
`;

const episodesPages = css`
  margin: 1em auto;
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
    this.timer = setInterval(this.dataChecker, 3000);
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

  get chunkSize() {
    return 10;
  }

  get chunk() {
    const { location } = this.props;
    const { search } = location;
    const query = queryString.parse(search);

    return Number(query.page || 1);
  }

  @observer
  get pages() {
    const { state } = this.props;
    const { episodes } = state;
    const showId = this.getShowId();

    const chunks = episodes.length / this.chunkSize;
    const pagesCount = Math.ceil(chunks);

    const emptyArray = Array.from(' '.repeat(pagesCount));

    const pages =
      emptyArray
        .map((_, i) => i + 1)
        .map((i) => `/show/${showId}?page=${i}`);

    return pages;
  }

  @observer
  get episodesChunk() {
    const { state } = this.props;

    const { chunk = 1 } = this;
    const { sortedEpisodes: episodes } = state;

    const startPosition = (chunk - 1) * this.chunkSize;
    const endPosition = chunk * this.chunkSize;

    return episodes.slice(startPosition, endPosition);
  }

  @action.bound
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

  get backgroundFaderClass() {
    const { state } = this.props;
    const { modalStates } = state;
    const { addEpisode: show } = modalStates;

    if (!show) {
      return css`
        ${backgroundFader}
        display: none;
      `;
    }

    return backgroundFader;
  }

  @action.bound
  handleCloseAddEpisodeModal(evt) {
    evt.preventDefault();

    this.closeAddEpisodeModal();
  }

  @action
  closeAddEpisodeModal() {
    const { state } = this.props;
    const { modalStates } = state;

    modalStates.addEpisode = !modalStates.addEpisode;
  }

  @action.bound
  handleAddEpisode(evt, formData) {
    evt.preventDefault();
    const { state } = this.props;
    const { isLoggedIn } = state;

    if (!isLoggedIn) {
      alert('You have to be logged in to do that!');
      return;
    }

    const { showData } = state;
    const { _id: showId } = showData;
    const {
      title, description, episode, season,
    } = formData;
    const data = {
      showId, title, description, episodeNumber: String(episode), season: String(season),
    };

    const { user } = state;
    const { token } = user;

    addEpisode(state, token, data)
      .then(() => this.closeAddEpisodeModal());
  }

  get showAddEpisodeModal() {
    const { state } = this.props;
    const { modalStates } = state;
    const { addEpisode: showModal } = modalStates;

    return showModal;
  }

  @action.bound
  handleAddEpisodeClick(evt) {
    evt.preventDefault();

    const { history } = this.props;
    const { location } = this.props;

    // Just to keep me sane
    const { pathname: pathName } = location;

    const trimmedPathName = pathName.replace(/\/$/, '');

    history.push(`${trimmedPathName}/add-episode`);
  }

  get isFavourite() {
    const { state } = this.props;
    const { showData } = state;

    return showData.isFavourite;
  }

  getNewFavouritesList() {
    const { state } = this.props;
    const { showData, favourites: oldFavourites } = state;

    if (this.isFavourite) {
      return oldFavourites.slice().filter((id) => id !== showData._id);
    }

    return [showData._id, ...oldFavourites];
  }

  @action.bound
  handleFavouritesClick(evt) {
    evt.preventDefault();
    const newFavourites = this.getNewFavouritesList();

    const { state } = this.props;
    state.favourites.replace(newFavourites);
  }

  @action.bound
  handleShowAction(type) {
    const { state } = this.props;
    const { showData } = state;
    const { user } = state;
    const { token } = user;

    switch (type) {
      case 'like':
        return likeShow(state, showData._id, token);
      case 'dislike':
        return dislikeShow(state, showData._id, token);
      default:
        return null;
    }
  }

  @action.bound
  getEpisodeData(episodeId) {
    const { state } = this.props;

    getEpisodeData(state, episodeId);
  }

  get imageUrl() {
    const { state } = this.props;

    const { loadingStates, errorStates } = state;
    const { showData: isLoading } = loadingStates;
    const { showData: hasErrors } = errorStates;

    if (isLoading || hasErrors) {
      return defaultPoster;
    }

    const { showData } = state;
    const { imageUrl } = showData;

    if (imageUrl) {
      return `https://api.infinum.academy${imageUrl}`;
    }

    return defaultPoster;
  }

  render() {
    const { state } = this.props;
    const { showData } = state;
    const { episodes } = state;

    const { isLoggedIn } = state;
    const { loadingStates, errorStates } = state;

    const { showData: isLoading } = loadingStates;
    const { showData: hasErrors } = errorStates;

    const { episodes: episodesLoading } = loadingStates;
    const { episodes: episodesErrors } = errorStates;

    const { showLike } = loadingStates;

    const showActions = isLoggedIn && !isLoading && !hasErrors;
    const showEpisodePages = !isLoading && !episodesLoading && !hasErrors && !episodesErrors && (episodes.length > this.chunkSize);

    if (this.pages.length > 10 && this.chunk > this.pages.length) {
      const { history } = this.props;

      history.push(this.pages.pop());

      return null;
    }

    return (
      <div
        className={pageContainer}
        data-favourite={showData.isFavourite}
      >
        <BackButton />
        <div className={showContainer}>
          <ShowTitle
            hasErrors={hasErrors}
            isLiking={showLike}
            isLoading={isLoading}
            isLoggedIn={isLoggedIn}
            likesCount={showData.likesCount}
            onAction={this.handleShowAction}
          >
            {showData.title}
          </ShowTitle>
          <ShowActions
            isFavourite={showData.isFavourite}
            onAddEpisode={this.handleAddEpisodeClick}
            onFavourite={this.handleFavouritesClick}
            show={showActions}
          />

          <div className={leftSide}>
            <ShowDescription
              description={showData.description}
              hasErrors={hasErrors}
              isLoading={isLoading}
            />

            <h3 className={episodesHeader}>
              Seasons & episodes
            </h3>

            <div className={spacer} />

            {
              showEpisodePages &&
              (
                <div className={episodesPagesContainer}>
                  <EpisodePages
                    chunkSize={this.chunkSize}
                    className={episodesPages}
                    currentElement={this.chunk}
                    linkList={this.pages}
                  />
                </div>
              )
            }

            <EpisodeList
              hasErrors={episodesErrors}
              isLoading={isLoading || episodesLoading}
            >
              {
                this
                  .episodesChunk
                  .map((episode) => {
                    const { [episode._id]: isLoading = true } = loadingStates.episodesData;

                    return (
                      <Episode
                        episode={episode}
                        getEpisodeData={this.getEpisodeData}
                        isLoading={isLoading}
                        key={episode._id}
                      />
                    );
                  })
              }
            </EpisodeList>

            {
              showEpisodePages &&
              (
                <div className={episodesPagesContainer}>
                  <EpisodePages
                    chunkSize={this.chunkSize}
                    className={episodesPages}
                    currentElement={this.chunk}
                    linkList={this.pages}
                  />
                </div>
              )
            }
          </div>

          <div className={rightSide}>
            <img
              alt={`${showData.title} poster`}
              className={showImage}
              src={this.imageUrl}
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
