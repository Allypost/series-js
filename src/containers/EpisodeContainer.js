import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { css } from 'emotion';

import { get as getEpisodeData } from '../services/episode';
import { getAll as getEpisodeComments } from '../services/comment';

import { Comment } from '../components/EpisodeContainer/Comment';
import { LikeButton } from '../components/EpisodeContainer/Buttons/LikeButton';
import { DislikeButton } from '../components/EpisodeContainer/Buttons/DislikeButton';
import { BackButton } from '../components/ShowContainer/Buttons/BackButton';

import defaultPoster from '../img/placeholder.episode.png';
import { CommentInput } from '../components/EpisodeContainer/CommentInput';

const episodeContainer = css`
  display: grid;
  grid-column: 2 / -2;
  grid-template-rows: [header] auto [body] auto;
`;

const headerContainer = css`
  display: grid;
  height: 50vh;
  grid-template-columns: repeat(6,1fr);
  background-color: #ffd1e2;
`;

const episodeData = css`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
`;

const episodeTitle = css`
`;

const episodeDescription = css`
`;

const commentsInputContainer = css`
`;

const commentsHeader = css`
  margin-bottom: .8em;
`;

const commentsHeaderText = css`
  color: #ff758c;
  text-transform: uppercase;
`;

const commentsHeaderNum = css`
  color: #bdbdbd;
  padding: 0 .314159em;
`;

const commentsListContainer = css`
  display: grid;
`;

const backButtonContainer = css`
  display: grid;
  grid-column: 1 / -1;
  align-content: baseline;
  justify-content: left;
  padding: 0 1.6em;
`;

const likeButtonContainer = css`
  display: grid;
  grid-auto-flow: column dense;
  grid-column: 2 / -1;
  align-content: end;
  justify-content: left;
  padding: 1em 0;
`;

const spacer = css`
  display: inline-block;
  padding: .6em;
`;

const episodeDataContainer = css`
  grid-column: 2 / -3;
`;

@inject('state')
@observer
export class EpisodeContainer extends Component {

  constructor(...args) {
    super(...args);

    const likesMax = 20;
    const likesMin = -likesMax;
    const likes = Math.floor(Math.random() * ((likesMax - likesMin) + 1)) + likesMin;

    this.likes = likes;
  }

  componentDidMount() {
    const { state } = this.props;
    getEpisodeData(state, this.episodeId, false);
    getEpisodeComments(state, this.episodeId);
  }

  get episodeId() {
    const { match } = this.props;
    const { params } = match;

    return params.episodeId;
  }

  get headerImage() {
    const { state } = this.props;
    const { episodeData } = state;
    const { imageUrl } = episodeData;

    if (imageUrl) {
      return `https://api.infinum.academy${imageUrl}`;
    }

    return defaultPoster;
  }

  get headerContainer() {
    const image = this.headerImage;

    return css`
      ${headerContainer}
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      background-image: url(${image});
    `;
  }

  render() {
    const { state } = this.props;
    const { episodeData: episode } = state;
    const { episodeData: isLoading } = state.loadingStates;
    const { comments } = state;

    const { likes } = this;

    if (isLoading) {
      return 'Loading...';
    }

    return (
      <div className={episodeContainer}>
        <div className={this.headerContainer}>
          <div className={backButtonContainer}>
            <BackButton
              text="Back to TV show"
              to={`/show/${episode.showId}`}
            />
          </div>
          <div className={likeButtonContainer}>
            <LikeButton likesCount={likes} />
            <div className={spacer} />
            <DislikeButton dislikesCount={-likes} />
          </div>
        </div>
        <div className={episodeData}>
          <div className={episodeDataContainer}>
            <h2 className={episodeTitle}>
              {episode.title}
            </h2>
            <div className={episodeDescription}>
              {episode.description}
            </div>
            <div className={commentsInputContainer}>
              <h4 className={commentsHeader}>
                <span className={commentsHeaderText}>
                  Comments
                </span>
                <span className={commentsHeaderNum}>
                  (
                  {comments.length}
                  )
                </span>
              </h4>
              <CommentInput episodeId={this.episodeId} />
            </div>
            <div className={commentsListContainer}>
              {
                comments.map((comment) => (
                  <Comment
                    comment={comment}
                    key={comment._id}
                  />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    );
  }

}
