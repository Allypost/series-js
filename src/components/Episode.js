import React, { Component } from "react";
import { observer } from "mobx-react";

import { get as getEpisodeData } from '../services/episode';
// eslint-disable-next-line
import state from "../state";

@observer
export class Episode extends Component {

  componentDidMount() {
    const { episode } = this.props;

    getEpisodeData(state, episode._id);
  }

  render() {
    const { episode } = this.props;

    return (
      <li>
        <span>
          {episode.title}
        </span>
        &nbsp;
        <span>
          s{episode.season}
          &nbsp;
          e{episode.episodeNumber}
        </span>
      </li>
    );
  }

}