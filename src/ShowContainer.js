import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Util from './helpers/Util';

import { ShowData } from './components/ShowData';
import { EpisodeList } from './components/EpisodeList';

export class ShowContainer extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      showData: {},
      episodes: [],
      loading: {
        showData: false,
        episodes: false,
      },
    };

    this.handleLoadingButtonClick = this.handleLoadingButtonClick.bind(this);
  }

  componentDidMount() {
    this._fetchAllData();
  }

  handleLoadingButtonClick() {
    this._fetchAllData();
  }

  _fetchAllData() {
    return this._fetch('show data', 'episodes');
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
        .catch((err) => console.warn('Couldn\'t fetch episodes', err))
        .finally(() => this._toggleLoading(key, false))
    );
  }

  _getApiUrl(key) {
    const showId = this._getShowId();
    const apiEndpoints = {
      episodes: `https://api.infinum.academy/api/shows/${showId}/episodes`,
      showData: `https://api.infinum.academy/api/shows/${showId}`,
    };

    return apiEndpoints[key];
  }

  _getShowId() {
    const { match = {} } = this.props;
    const { params = {} } = match;
    const { showId } = params;

    return showId;
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

  render() {
    const showId = this._getShowId();
    const { loading, showData, episodes } = this.state;

    /* eslint-disable react/jsx-max-depth */
    return (
      <div>
        <div className="row">
          <Link to="/">
            <h1 className="col s12">
              &larr; Back to series
            </h1>
          </Link>
        </div>
        <div className="row">
          <ShowData
            isLoading={loading.showData}
            showData={showData}
          />
          <EpisodeList
            episodes={episodes}
            isLoading={loading.episodes}
            showId={showId}
          />
        </div>
      </div>
    );
    /* eslint-enable react/jsx-max-depth */
  }
}
