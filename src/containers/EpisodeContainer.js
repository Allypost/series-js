import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Util from '../helpers/Util';

import { DetailsDisplay } from '../components/DetailsDisplay';

export class EpisodeContainer extends Component {

  constructor(...args) {
    super(...args);

    this.state = {
      showData: {},
      episodeData: {},
      comments: [],
      loading: {
        showData: false,
        episodeData: false,
        comments: false,
      },
      errors: {},
      timeout: null,
    };
  }

  componentDidMount() {
    this._fetchAllData();
    const timer = setInterval(() => {
      const { errors } = this.state;

      Object.entries(errors)
        .filter(([_key, value]) => value)
        .forEach(([key]) => this._fetch(key));
    }, 3000);

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ timeout: timer });
  }

  componentWillUnmount() {
    const { timer } = this.state;
    if (timer) {
      clearInterval(timer);
    }
  }

  _fetchAllData() {
    return this._fetch('episode data', 'show data', 'comments');
  }

  _fetch(...keys) {
    const { flattenArray, camelCase } = Util;

    const stateKeys = Object.keys(this.state);

    const fetchArray =
      flattenArray(keys)
        .map(camelCase)
        .filter((key) => stateKeys.includes(key))
        .map((key) => this._doFetch(key));

    const arrToObj = (arr) =>
      arr.reduce((acc, el) => {
        if (!el) {
          return acc;
        }

        const [key, value] = Object.entries(el).pop();

        acc[key] = value;

        return acc;
      }, {});

    return (
      Promise
        .all(fetchArray)
        .then((data) => arrToObj(data))
    );
  }

  _doFetch(key) {
    const url = this._getApiUrl(key);

    if (!url) {
      return Promise.resolve(null);
    }

    this._toggleLoading(key, true);

    return (
      fetch(url)
        .then((resp) => resp.json())
        .then((resp) => resp.data)
        .then((data) => {
          const dataObj = { [key]: data };
          this.setState(dataObj);
          return dataObj;
        })
        .catch((err) => {
          const { errors } = this.state;
          console.warn(`Couldn't fetch ${key}:`, '\t', err);
          errors[key] = true;
          this.setState({ errors });
        })
        .finally(() => this._toggleLoading(key, false))
    );
  }

  _getApiUrl(key) {
    const { showId, episodeId } = this._getParams();
    const apiEndpoints = {
      episodeData: `https://api.infinum.academy/api/episodes/${episodeId}`,
      comments: `https://api.infinum.academy/api/episodes/${episodeId}/comments`,
      showData: `https://api.infinum.academy/api/shows/${showId}`,
    };

    return apiEndpoints[key];
  }

  _toggleLoading(key, forceState) {
    const { loading } = this.state;

    //  eslint-disable-next-line no-undefined
    if (forceState !== undefined) {
      return this.setState({ loading: Object.assign(loading, { [key]: !!forceState }) });
    }

    const isKeyLoading = loading[key];

    return this.setState({ loading: Object.assign(loading, { [key]: !!isKeyLoading }) });
  }

  _getParams() {
    const { match = {} } = this.props;
    const { params = {} } = match;

    return params;
  }

  _renderShowTitle() {
    const { showId } = this._getParams();
    const { showData } = this.state;

    return (
      <Link to={`/show/${showId}`}>
        <h1 className="col s12">
          &larr;&nbsp;
          {showData.title || 'Loading...'}
        </h1>
      </Link>
    );
  }

  _renderEpisodeData() {
    const { episodeData } = this.state;

    return (
      <div className="col s12 l6">
        <h1>
          {episodeData.title}
        </h1>
      </div>
    );
  }

  _renderComments() {
    return (
      <div className="col s12 l6">
        <h4 className="episodes-list-header">
          Comments
        </h4>
        <ul className="collection">
          {
            this
              ._getCommentsList()
              .map((comment) => (
                <li
                  className="collection-item"
                  key={comment._id}
                >
                  {comment.text}
                </li>
              ))
          }
        </ul>
      </div>
    );
  }

  _getCommentsList() {
    const { loading, comments, errors } = this.state;
    const { comments: isLoading } = loading;
    const { comments: hasErrors } = errors;

    if (hasErrors) {
      return [
        {
          _id: '_',
          text: (
            <span>
              <em>
                Error fetching comments. Trying again...
              </em>
              &nbsp;
              {Util.spinnerComponent('small', 'red')}
            </span>
          ),
        },
      ];
    }

    if (isLoading) {
      return [
        {
          _id: '_',
          text: (
            <em>
              Loading...
            </em>
          ),
        },
      ];
    }

    if (!comments.length) {
      comments.push({
        _id: '_',
        text: (
          <em>
            No comments...
          </em>
        ),
      });
    }

    return comments;
  }

  render() {
    const { loading, errors, episodeData } = this.state;

    return (
      <div>
        <div className="row">
          {this._renderShowTitle()}
        </div>
        <div className="row">
          <DetailsDisplay
            data={episodeData}
            hasErrors={errors.episodeData}
            isLoading={loading.episodeData}
          />
          {this._renderComments()}
        </div>
      </div>
    );
  }

}
