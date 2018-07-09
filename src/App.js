import React, { Component } from 'react';
import ShowsList from './components/ShowsList.js';
import LoadingButton from './components/LoadingButton.js';

export default class App extends Component {

  constructor(...args) {
    super(...args);

    this.state = {
      shows: [],
      isLoading: false,
    };

    this.handleLoadingButtonClick = this.handleLoadingButtonClick.bind(this);
  }

  handleLoadingButtonClick() {
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

    // FORGIVE ME
    // eslint-disable-next-line react/no-set-state
    this.setState({ shows: data });
  }

  _toggleLoading(forceState = null) {
    if (forceState !== null) {
      // eslint-disable-next-line react/no-set-state
      this.setState({ isLoading: !!forceState });
      return;
    }

    const { isLoading } = this.state;

    // Forgive me Father, for I have sinned...
    // eslint-disable-next-line react/no-set-state
    this.setState({ isLoading: !isLoading });
  }

  render() {
    const { isLoading, shows } = this.state;
    return (
      <div>
        <h1 className="title">
          S3RI3S
        </h1>
        <ShowsList shows={shows} />
        <LoadingButton
          isLoading={isLoading}
          onClick={this.handleLoadingButtonClick}
        />
      </div>
    );
  }

}
