import React, { Component } from 'react';

export default class EpisodesList extends Component {

  static renderItem(episode) {
    return (
      <li
        key={episode._id}
        title={episode.description}
      >
        {episode.title}
      </li>);
  }

  constructor(args) {
    super(args);

    const { showID } = args;

    this.state = {
      showID,
      isLoading: false,
      episodes: [],
    };
  }

  componentDidMount() {
    this.fetchEpisodes();
  }

  fetchEpisodes() {
    const { isLoading, showID } = this.state;

    if (isLoading) {
      return;
    }

    this._toggleLoading(true);

    fetch(`https://api.infinum.academy/api/shows/${showID}/episodes`)
      .then((resp) => resp.json())
      .then((resp) => resp.data)
      // eslint-disable-next-line react/no-set-state
      .then((data) => this.setState({ episodes: data }))
      .catch((e) => console.warn(e))
      .finally(() => this._toggleLoading(false));
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

  renderItems(episodes = []) {
    return episodes.map((episode) => this.constructor.renderItem(episode));
  }

  render() {
    const { isLoading, episodes } = this.state;

    if (isLoading) {
      return (
        <ul>
          <li>
            <em>
              Loading...
            </em>
          </li>
        </ul>
      );
    }

    if (!episodes.length) {
      return (
        <ul>
          <li title="Yet...">
            <em>
              No episodes...
            </em>
          </li>
        </ul>
      );
    }

    return (
      <ul className="episodes-container">
        {this.renderItems(episodes)}
      </ul>
    );
  }

}
