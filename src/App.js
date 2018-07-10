import React, { Component } from 'react';
import ShowsList from './components/ShowsList';
import LoadingButton from './components/LoadingButton';

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
    this.setState({ shows: data });
  }

  _toggleLoading(forceState = null) {
    if (forceState !== null) {
      return this.setState({ isLoading: !!forceState });
    }

    const { isLoading } = this.state;

    return this.setState({ isLoading: !isLoading });
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
