import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { css } from 'emotion';
import defaultPoster from '../../img/placeholder.png';

const cssImage = css`
  width: 100%;
  border-radius: .5em;
`;

const cssTitle = css`
  font-size: 1.2em;
  color: #424242;
`;

export class ShowCard extends Component {

  containerClass() {
    const { show, hideFavouriteBadge } = this.props;

    if (hideFavouriteBadge) {
      return null;
    }

    if (!show.isFavourite) {
      return null;
    }

    return css`
      position: relative;

      &::after {
        content: '★';
        display: inline-block;
        position: absolute;
        top: 0;
        left: 0;
        padding: .1em .5em;
        background-color: rgba(0, 0, 0, .3);
        border-radius: .4em 0;
        color: #ffc107;
        text-shadow: 0 0 2px rgba(0, 0, 0, .6);
      }
    `;
  }

  render() {
    const { show } = this.props;
    const imageUrl = show.imageUrl ? `https://api.infinum.academy${show.imageUrl}` : defaultPoster;

    return (
      <div className={this.containerClass()}>
        <img
          alt={`${show.title} poster`}
          className={cssImage}
          src={imageUrl}
        />
        <span
          className={cssTitle}
        >
          <Link to={`/show/${show._id}`}>
            {show.title}
          </Link>
        </span>
      </div>
    );
  }

}
