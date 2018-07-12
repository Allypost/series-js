import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LoadingButton from './components/LoadingButton';

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
      return;
    }

    this._toggleLoading(true);

    fetch('https://api.infinum.academy/api/shows')
      .then((resp) => resp.json())
      .then((resp) => this._updateShows(resp.data))
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
          {show.title}
        </Link>
      </li>
    );

    return shows.map(mapper);
  }

  render() {
    const { isLoading, shows } = this.state;
    return (
      <div>
        <ul className="shows-container collection">
          {this._renderShows()}
        </ul>
        <LoadingButton
          dataName="Series"
          hasData={!!shows.length}
          isLoading={isLoading}
          onClick={this.handleLoadingButtonClick}
        />
      </div>
    );
  }
}
