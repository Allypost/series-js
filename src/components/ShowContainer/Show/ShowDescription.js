import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { css } from 'emotion';

const showDescription = css`
  grid-row: 2;
  grid-column: 1 / -3;
  font-size: 1.2em;
  text-rendering: optimizeLegibility;
  color: #616161;
`;

@inject('state')
@observer
export class ShowDescription extends Component {

  getText() {
    const { state } = this.props;
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
