import React, { Component } from 'react';
import EpisodesList from './ShowsListItemEpisodesList';

export default class ShowsListItemDetails extends Component {

  constructor(args) {
    super(args);

    const showData = Object.assign({}, args.showData);
    this.state = {
      showData,
      isLoadingData: false,
    };
  }

  async componentDidMount() {
    this.fetchDetails()
      .then((data) => this.setState({ showData: data }));
  }

  async fetchDetails() {
    const { showId } = this.props;
    const url = `https://api.infinum.academy/api/shows/${showId}`;

    this._toggleLoading(true);

    return fetch(url)
      .then((resp) => resp.json())
      .then((resp) => resp.data || {})
      .catch((err) => console.warn(err))
      .finally(() => this._toggleLoading(false));
  }

  _toggleLoading(forceState = null) {
    if (forceState !== null) {
      // eslint-disable-next-line react/no-set-state
      this.setState({ isLoadingData: !!forceState });
      return;
    }

    const { isLoadingData } = this.state;

    // Forgive me Father, for I have sinned...
    // eslint-disable-next-line react/no-set-state
    this.setState({ isLoadingData: !isLoadingData });
  }

  renderDescriptionContent() {
    const { showData, isLoadingData } = this.state;
    const { description } = showData;

    if (isLoadingData) {
      return (
        <em>
          Loading...
        </em>
      );
    }

    if (description) {
      return description;
    }

    return (
      <em>
        No description...
      </em>
    );
  }

  renderDescription() {
    const { showData } = this.state;
    return (
      <div className="description-container">
        Description:
        <ul>
          <li>
            {this.renderDescriptionContent(showData.description)}
          </li>
        </ul>
      </div>
    );
  }

  renderEpisodeList() {
    const { showData } = this.state;
    return (
      <div className="episodes-container">
        Episodes:
        <EpisodesList showID={showData._id} />
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderDescription()}
        {this.renderEpisodeList()}
      </div>
    );
  }

}
