import React, { Component } from 'react';

export default class App extends Component {

  constructor(...args) {
    super(...args);

    this.state = {
      shows: [],
    };

    this.handleLoadButtonClick = this.handleLoadButtonClick.bind(this);
  }

  handleLoadButtonClick() {
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
    const { shows } = this.state;
    return (
      <div>
        <h1>
          S3RI3S
        </h1>
        <ul>
          {
            shows.map((show) => (
              <li key={show._id}>
                {show.title}
              </li>))
          }
        </ul>
        <button
          onClick={this.handleLoadButtonClick}
          type="button"
        >
          Load data
        </button>
      </div>
    );
  }

}
