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

const backBtnHover = css`
  position: relative;
  &::after {
    content: "";
    display: none;
    position: absolute;
    top: .85em;
    right: -11.28em;
    padding: .5em .8em;
    line-height: 1.1em;
    border-radius: 4px;
    font-size: .34em;
    background-color: rgba(0, 0, 0, .8);
    color: #fff;
    letter-spacing: -.5px;
  }

  &::before {
    content: " ";
    position: absolute;
    display: none;
    top: 1.85em;
    right: -1.1em;
    border: solid transparent;
    border-right-color: rgba(0, 0, 0, .8);
    height: 0;
    width: 0;
    font-size: .34em;
    border-width: .45em;
    margin-top: -.45em;
  }
`;

export class BackButton extends PureComponent {

  get backBtn() {
    const { text = '' } = this.props;

    if (!text) {
      return backBtn;
    }

    return css`
      ${backBtn}
      ${backBtnHover}

      &::after {
        content: "${text}";
      }

      &:hover {
        &::before,
        &::after {
          display: inline-block;
          opacity: 1;
        }
      }
    `;
  }

  render() {
    const { to = '/' } = this.props;

    return (
      <div className={backBtnContainer}>
        <Link
          className={backBtnLink}
          to={to}
        >
          <button
            className={this.backBtn}
            type="button"
          >
            &larr;
          </button>
        </Link>
      </div>
    );
  }

}
