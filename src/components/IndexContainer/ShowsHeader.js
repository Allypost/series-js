import React, { PureComponent } from 'react';
import { css } from 'emotion';

export const header = css`
  grid-column: 2 / span 10;
`;

export class ShowsHeader extends PureComponent {

  render() {
    return (
      <h2 className={header}>
        All Shows
      </h2>
    );
  }

}
