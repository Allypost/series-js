import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { css } from 'emotion';
import { action } from 'mobx';

import { get as getEpisodeData } from '../services/episode';
import { getAll as getEpisodeComments } from '../services/comment';

import { Comment } from '../components/EpisodeContainer/Comment';
import { LikeButton } from '../components/EpisodeContainer/Buttons/LikeButton';
import { DislikeButton } from '../components/EpisodeContainer/Buttons/DislikeButton';
import { BackButton } from '../components/ShowContainer/Buttons/BackButton';

import defaultPoster from '../img/placeholder.episode.png';

const episodeContainer = css`
  display: grid;
  grid-column: 2 / -2;
  grid-template-rows: [header] 2fr [body] 3fr;
`;

const headerContainer = css`
  display: grid;
  min-height: 50vh;
  grid-template-columns: repeat(6,1fr);
  background-color: #000000;
`;

const episodeData = css`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 4em auto auto;
`;

const episodeTitle = css`
  grid-column: 2 / -3;
  grid-row: 1;
`;

const episodeDescription = css`
  grid-column: 2 / -3;
  grid-row: 2;
`;

const commentsInputContainer = css`
  grid-column: 2 / -3;
  grid-row: 3;
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

const commentsFormContainer = css`
  text-align: right;
`;

const submit = css`
  cursor: pointer;
  font-size: .9em;
  margin-top: .65em;
  padding: 1.1em 1.75em .9em;
  background-color: #ff758c;
  text-transform: uppercase;
  color: #fff;
  font-weight: 600;
  outline: none;
  border: none;
  border-radius: 8px;
  opacity: .85;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, .15);
  transition: opacity .15s ease-out, box-shadow .1s ease-in, background-color .05s ease-out;

  &:hover {
    opacity: 1;
    transition: opacity .1s ease-out;
  }

  &:disabled {
    background-color: #bababa;
    cursor: progress;
  }
`;

const input = css`
  width: 100%;
  min-height: 8em;
  box-sizing: border-box;
  padding: 1.5em 1em;
  outline: none;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #ffffff;
  resize: none;
  transition: box-shadow .1s ease-in, background-color .05s ease-out;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, .05);

  &:empty {
    background-color: #fafafa;
    box-shadow: none;
  }

  &:focus {
    background-color: #ffffff;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, .1);
    transition: box-shadow .2s ease-out, background-color .15s ease-out;
  }

  &:focus + .${submit} {
    transition: box-shadow .2s ease-out, background-color .15s ease-out;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, .3);
  }

  &:empty + .${submit} {
    box-shadow: none;
  }

  &:empty + .${submit} {
    opacity: .4 !important;
    cursor: not-allowed;
  }
`;

const commentsListContainer = css`
  display: grid;
  grid-column: 2 / -3;
  grid-row: 4;
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

@inject('state')
@observer
export class EpisodeContainer extends Component {

  constructor(...args) {
    super(...args);

    this.state = {
      comment: '',
    };

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

  @action.bound
  handleCommentInputChange(evt) {
    this.setState({ comment: evt.target.value });
  }

  @action.bound
  handleCommentInputType(evt) {
    if (evt.key !== 'Enter') {
      return true;
    }

    if (evt.shiftKey) {
      return true;
    }

    evt.preventDefault();

    this.postComment();

    return false;
  }

  @action.bound
  handleButtonPress(evt) {
    evt.preventDefault();

    this.postComment();
  }

  postComment() {
    const { comment } = this.state;

    console.log('|>', comment);
  }

  render() {
    const { state } = this.props;
    const { episodeData: episode } = state;
    const { episodeData: isLoading } = state.loadingStates;
    const { comments } = state;
    const { comment } = this.state;

    const isSubmitting = false;
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
            <div className={commentsFormContainer}>
              <textarea
                className={input}
                onChange={this.handleCommentInputChange}
                onKeyPress={this.handleCommentInputType}
                placeholder="Post a comment..."
                value={comment}
              />
              <button
                className={submit}
                disabled={isSubmitting}
                onClick={this.handleButtonPress}
                type="button"
              >
                Comment
              </button>
            </div>
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
    );
  }

}
