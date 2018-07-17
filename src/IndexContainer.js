import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { css } from 'emotion';

import { ShowCard } from './components/ShowCard';

const showPageContainer = css`
  display: grid;
  grid-row: body;
  grid-column: 1 / span 12;
  grid-template-columns: repeat(12, 1fr);
  padding: 2em 0;
  background-color: #eeeeee;
`;

const showsContainer = css`
  display: grid;
  grid-column: 2 / span 10;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1em 2em;
`;

export class IndexContainer extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      shows: [],
      isLoading: false,
    };

    this.handleLoadingButtonClick = this.handleLoadingButtonClick.bind(this);
  }

  componentDidMount() {
    this._fetchShows();
  }

  handleLoadingButtonClick() {
    this._fetchShows();
  }

  _fetchShows() {
    const { isLoading } = this.state;

    if (isLoading) {
      return Promise.resolve([]);
    }

    this._toggleLoading(true);

    return fetch('https://api.infinum.academy/api/shows')
      .then((resp) => resp.json())
      .then((resp) => resp.data || [])
      .then((data) => {
        this._updateShows(data);

        data.forEach(({ _id }) => this._fetchShowData(_id));

        return data;
      })
      .catch((err) => console.warn(err))
      .finally(() => this._toggleLoading(false));
  }

  _fetchShowData(showId) {
    if (!showId) {
      return {};
    }

    return fetch(`https://api.infinum.academy/api/shows/${showId}`)
      .then((resp) => resp.json())
      .then((resp) => resp.data || {})
      .then((data) => {
        const { shows = [] } = this.state;

        shows
          .slice()
          .map((show) => {
            if (show._id === showId) {
              return Object.assign(show, data);
            }

            return show;
          });

        this.setState({ shows });

        return data;
      })
      .catch((err) => console.warn(err))
      .finally(() => this._toggleLoading(false));
  }

  _updateShows(data) {
    this.setState({ shows: data });
  }

  _toggleLoading(forceState = null) {
    if (forceState !== null) {
      return this.setState({ isLoading: !!forceState });
    }

    const { isLoading } = this.state;

    return this.setState({ isLoading: !isLoading });
  }

  _renderShows() {
    const { shows } = this.state;
    const mapper = (show) => (
      <li
        className="collection-item"
        key={show._id}
      >
        <Link to={`/show/${show._id}`}>
          <h6>
            {show.title}
          </h6>
        </Link>
      </li>
    );

    return shows.map(mapper);
  }

  render() {
    const { shows } = this.state;
    return (
      <div className={showPageContainer}>
        <h2 className={css`grid-column: 2 / span 10;`}>
          All shows
        </h2>
        <div className={showsContainer}>
          {shows.map((show) => (<ShowCard key={show._id} show={show} />))}
        </div>
      </div>
    );
  }
}
