import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { css } from 'emotion';
import { action, observable, runInAction } from 'mobx';
import { observer } from 'mobx-react';

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

export class CommentInput extends Component {

  @observable
  componentState = {
    comment: '',
  };

  @action.bound
  handleCommentInputChange(evt) {
    this.componentState.comment = evt.target.value;
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
    const { onSubmit } = this.props;
    const { comment } = this.componentState;

    onSubmit(comment)
      .then(() => runInAction(() => {
        this.componentState.comment = '';
      }))
      .catch(() => alert('Something went wrong. Please try again.'));
  }

  get placeholderText() {
    const { canComment } = this.props;

    if (canComment) {
      return 'Post a comment...';
    }

    return 'Log in to comment.';
  }

  @observer
  render() {
    const { comment } = this.componentState;

    const { canComment } = this.props;
    const { isLoading } = this.props;

    const disabled = isLoading || !canComment;

    return (
      <div className={commentsFormContainer}>
        <textarea
          className={input}
          disabled={disabled}
          onChange={this.handleCommentInputChange}
          onKeyPress={this.handleCommentInputType}
          placeholder={this.placeholderText}
          value={comment}
        />
        <button
          className={submit}
          disabled={disabled}
          onClick={this.handleButtonPress}
          type="button"
        >
          Comment
        </button>
      </div>
    );
  }

}

CommentInput.propTypes = {
  canComment: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func,
};

CommentInput.defaultProps = {
  onSubmit: () => { },
};
