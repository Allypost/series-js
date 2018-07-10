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

    this.state = {
      isLoading: false,
      episodes: [],
    };
  }

  componentDidMount() {
    this.fetchEpisodes();
  }

  componentDidUpdate(oldProps) {
    const { showId } = this.props;

    if (!showId) {
      return;
    }

    if (oldProps.showId !== showId) {
      this.fetchEpisodes();
    }
  }

  fetchEpisodes() {
    const { isLoading } = this.state;
    const { showId } = this.props;

    if (isLoading || !showId) {
      return;
    }

    this._toggleLoading(true);

    fetch(`https://api.infinum.academy/api/shows/${showId}/episodes`)
      .then((resp) => resp.json())
      .then((resp) => resp.data)
      .then((data) => this.setState({ episodes: data }))
      .catch((e) => console.warn(e))
      .finally(() => this._toggleLoading(false));
  }

  _toggleLoading(forceState = null) {
    if (forceState !== null) {
      return this.setState({ isLoading: !!forceState });
    }

    const { isLoading } = this.state;

    return this.setState({ isLoading: !isLoading });
  }

  renderItems(episodes = []) {
    return episodes.map((episode) => this.constructor.renderItem(episode));
  }

  render() {
    const { isLoading, episodes } = this.state;
    const renderedEpisodes = this.renderItems(episodes);
    const loadingElement = (
      <li key="__loading">
        <em>
          Loading...
        </em>
      </li>
    );
    const noEpisodesElement = (
      <li key="__no_episodes">
        <em>
          No episodes...
        </em>
      </li>
    );

    if (!renderedEpisodes.length) {
      renderedEpisodes.push(noEpisodesElement);
    }

    return (
      <ul>
        {isLoading ? loadingElement : renderedEpisodes}
      </ul>
    );
  }

}