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
    fetch('https://api.infinum.academy/api/shows')
      .then((resp) => resp.json())
      .then((resp) => this._updateShows(resp.data))
      .catch((err) => console.warn(err));
  }

  _updateShows(data) {

    // FORGIVE ME
    // eslint-disable-next-line react/no-set-state
    this.setState({ shows: data });
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
