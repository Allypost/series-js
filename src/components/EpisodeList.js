import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Util from '../helpers/Util';

export class EpisodeList extends Component {

  _renderEpisodes() {
    const { episodes } = this.props;

    if (episodes.length > 0) {
      return this._renderEpisodeList();
    }

    return this._renderNoEpisodes();
  }

  _renderEpisodeList() {
    const { showId, episodes } = this.props;

    const mapper = (episode) => (
      <li
        className="collection-item"
        key={episode._id}
      >
        <Link to={`/show/${showId}/episode/${episode._id}`}>
          {episode.title}
        </Link>
      </li>
    );

    return episodes.map(mapper);
  }

  // eslint-disable-next-line class-methods-use-this
  _renderNoEpisodes() {
    return (
      <li className="collection-item">
        <em>
          Show has no episodes...
        </em>
      </li>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  _renderErrors() {
    return (
      <li className="collection-item">
        <em>
          Error feching episodes. Trying again...&nbsp;
          {Util.spinnerComponent('small', 'red')}
        </em>
      </li>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  _renderLoading() {
    return (
      <li className="collection-item">
        Loading episodes...&nbsp;
        {Util.spinnerComponent('small')}
      </li>
    );
  }

  _render() {
    const { hasErrors, isLoading } = this.props;

    if (hasErrors) {
      return this._renderErrors();
    }

    if (isLoading) {
      return this._renderLoading();
    }

    return this._renderEpisodes();
  }

  render() {
    return (
      <div className="col s12 l6">
        <h4 className="episodes-list-header show-on-large">
          Episodes
        </h4>
        <ul className="collection episode-list">
          {this._render()}
        </ul>
      </div>
    );
  }

}

EpisodeList.propTypes = {
  episodes: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })),
  hasErrors: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
  showId: PropTypes.string.isRequired,
};

EpisodeList.defaultProps = {
  episodes: [],
  hasErrors: false,
};

