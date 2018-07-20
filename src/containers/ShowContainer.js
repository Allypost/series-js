import React, { Component } from 'react';
import { observer } from 'mobx-react';

// eslint-disable-next-line
import state from '../state';

import { Episode } from '../components/Episode';

import { get as getShowData } from '../services/show';
import { getAll as getShowEpisodes } from '../services/episode';

@observer
export class ShowContainer extends Component {

  getShowId() {
    const { match = {} } = this.props;
    const { params = {} } = match;
    const { showId } = params;

    return showId;
  }

  componentDidMount() {
    const showId = this.getShowId();

    getShowData(state, showId);
    getShowEpisodes(state, showId);
  }

  renderLoading() {
    return (
      <h1>Loading...</h1>
    );
  }

  renderShowData() {
    const showData = state.showData;
    const episodeList = state.episodes;

    return (
      <div>
        <h1>{showData.title}</h1>
        <ul>
          {
            episodeList.map((episode) => (
              <Episode
                episode={episode}
                key={episode._id}
              />
            ))
          }
        </ul>
      </div>
    );
  }

  render() {
    const { loadingStates = {} } = state;
    const { showData: isLoading } = loadingStates;

    return (
      isLoading ? this.renderLoading() : this.renderShowData()
    );
  }

}
