import React, { Component } from 'react';
import { css } from 'emotion';
import { action } from 'mobx';
import { observer } from 'mobx-react';

import userImagePlaceholder from '../../img/placeholder.user.png';

const container = css`
  display: grid;
  padding: 1.4em;
  grid-template-columns: 2.4em auto;
  grid-column-gap: 1em;
  align-items: center;
  border-bottom: 1px solid #eeeeee;

  &:last-child {
    border-bottom: none;
  }
`;

const image = css`
  width: 100%;
`;

const content = css`
  display: grid;
  grid-row-gap: .5em;
`;

const username = css`
  color: #ff758c;
  font-weight: 600;
`;

const deleteButton = css`
  float: right;
  background: #d32f2f;
  color: #ffffff;
  border: none;
  padding: .3em .5em .1em;
  border-radius: 5px;
  line-height: 1.2em;
  cursor: pointer;
`;

export class Comment extends Component {

  get canDelete() {
    const { comment } = this.props;
    const { user } = this.props;

    return user.username === comment.userEmail;
  }

  @action.bound
  handleDelete(evt) {
    evt.preventDefault();

    const { comment } = this.props;
    const { onDelete } = this.props;

    return onDelete(comment._id);
  }

  @observer
  render() {
    const { comment } = this.props;

    return (
      <div
        className={container}
        data-deletable={this.canDelete}
      >
        <img
          alt={`${comment.userEmail}'s profile pic`}
          className={image}
          src={userImagePlaceholder}
        />
        <div className={content}>
          <div className={username}>
            <span>
              {comment.userEmail}
            </span>
            {
              this.canDelete && (
                <button
                  className={deleteButton}
                  onClick={this.handleDelete}
                  type="button"
                >
                  <span type="img">
                    🗑
                  </span>
                </button>
              )
            }
          </div>
          <span>
            {comment.text}
          </span>
        </div>
      </div>
    );
  }

}
