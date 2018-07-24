import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { css } from 'emotion';

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

@inject('state')
@observer
export class Comment extends Component {

  render() {
    const { comment } = this.props;

    return (
      <div className={container}>
        <img
          alt={`${comment.userEmail}'s profile pic`}
          className={image}
          src={userImagePlaceholder}
        />
        <div className={content}>
          <span className={username}>
            {comment.userEmail}
          </span>
          <span>
            {comment.text}
          </span>
        </div>
      </div>
    );
  }

}
