import React, { Component } from 'react';
import EpisodesList from './ShowsListItemEpisodesList';

export default class ShowsListItemDetails extends Component {

  constructor(args) {
    super(args);

    const showData = Object.assign({}, args.showData);
    this.state = {
      showData,
    };
  }

  async componentDidMount() {
    const details = await this.fetchDetails();

    // I'm really sorry about this one too
    // eslint-disable-next-line react/no-set-state,react/no-did-mount-set-state
    this.setState({ showData: details });
  }

  async fetchDetails() {
    const { showId } = this.props;

    const fetcher =
      (url) => fetch(url)
        .then((resp) => resp.json())
        .then((resp) => resp.data);

    try {
      return await fetcher(`https://api.infinum.academy/api/shows/${showId}`);
    } catch (e) {
      return {};
    }
  }

  renderDescriptionContent() {
    const { showData } = this.state;
    const { description } = showData;

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
            {
              this.renderDescriptionContent(showData.description)
            }
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
