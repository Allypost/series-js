import React, { Component } from 'react';
import { css } from 'emotion';
import defaultPoster from '../img/placeholder.png';

const cssImage = css`
  width: 100%;
  border-radius: .5em;
`;

const cssTitle = css`
  font-size: 1.2em;
  color: #424242;
`;

export class ShowCard extends Component {

  render() {
    const { show } = this.props;

    return (
      <div>
        <img
          alt={`${show.title} poster`}
          className={cssImage}
          src={show.poster || defaultPoster}
        />
        <span
          className={cssTitle}
        >
          {show.title}
        </span>
      </div>
    );
  }

}
