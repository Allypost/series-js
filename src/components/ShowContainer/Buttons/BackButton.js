import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { css } from 'emotion';

const backBtnContainer = css`
  grid-row: 1;
  grid-column: 1 / -1;
`;

const backBtnLink = css`
  display: inline-block;
  margin: 1.3em 0;
`;

const backBtnActions = css`
  &:hover {
    border-color: #616161;
    transition: border .1s ease-out;
  }
`;

const backBtn = css`
  & {
    display: inline-grid;
    cursor: pointer;
    font-size: 3em;
    font-family: monospace;
    line-height: 1.1em;
    padding: 0 .3005em .12em;
    outline: none;
    border: 1px solid #ddd;
    border-radius: 100%;
    background-color: #fff;
    color: #ff758c;
    transition: border .3s ease-in-out;
  }
  ${backBtnActions}
`;

export class BackButton extends PureComponent {

  render() {
    return (
      <div className={backBtnContainer}>
        <Link
          className={backBtnLink}
          to="/"
        >
          <button
            className={backBtn}
            type="button"
          >
            &larr;
          </button>
        </Link>
      </div>
    );
  }

}
