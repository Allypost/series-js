import React, { Component } from 'react';
import { css } from 'emotion';

const cssImage = css`
  width: 100%;
  border-radius: .5em;
`;

const cssTitle = css`
  font-size: 1.2em;
  color: #424242;
`;

export class ShowCard extends Component {

  constructor(...args) {
    super(...args);

    this.defaultPoster = '/img/placeholder.png';
  }

  render() {
    const { show } = this.props;

    return (
      <div>
        <img
          alt={`${show.title} poster`}
          className={cssImage}
          src={show.poster || this.defaultPoster}
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
