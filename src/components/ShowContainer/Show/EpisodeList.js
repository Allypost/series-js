import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { css } from 'emotion';

const noEpisodesHeader = css`
  margin: 0;
  font-weight: 100;
`;

@observer
export class EpisodeList extends Component {

  get hide() {
    const { isLoading, hasErrors, children } = this.props;

    return hasErrors || isLoading || !children.length;
  }

  errorText() {
    const { isLoading, hasErrors, children } = this.props;

    if (hasErrors) {
      return 'Could not get the episode list. Trying again soon...';
    }

    if (isLoading) {
      return 'Loading...';
    }

    if (!children.length) {
      return 'Show has no episodes...';
    }

    return '';
  }

  render() {
    if (this.hide) {
      return (
        <h2 className={noEpisodesHeader}>
          <em>
            {this.errorText()}
          </em>
        </h2>
      );
    }

    const { children } = this.props;
    return children;
  }

}
