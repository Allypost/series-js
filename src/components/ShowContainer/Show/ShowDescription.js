import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { css } from 'emotion';

import state from '../../../state';

const showDescription = css`
  grid-row: 2;
  grid-column: 1 / -3;
  font-size: 1.2em;
  text-rendering: optimizeLegibility;
  color: #616161;
`;

@observer
export class ShowDescription extends Component {

  getText() {
    const { showData: isLoading = true } = state.loadingStates;
    const { showData: hasErrors = true } = state.errorStates;
    const { showData } = state;

    if (isLoading) {
      return (
        <em>
          Loading...
        </em>
      );
    }

    if (hasErrors) {
      return (
        <em>
          Could not get the show data. Trying again soon...
        </em>
      );
    }

    if (!showData.description) {
      return (
        <em>
          Show has no description...
        </em>
      );
    }

    return showData.description;
  }

  render() {
    return (
      <div className={showDescription}>
        {this.getText()}
      </div>
    );
  }

}
