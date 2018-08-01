import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { css, cx } from 'emotion';

const container = css`
  display: inline-grid;
  grid-auto-flow: column dense;
  grid-template-columns: auto auto auto;
  grid-column-gap: .5em;
`;

const buttonContainer = css`
  display: inline-block;
  line-height: 2rem;
  align-self: center;
  vertical-align: middle;
`;

const button = css`
  background-color: #fff;
  cursor: pointer;
  color: #424242;
  outline: none;
  border: 1px solid #e0e0e0;
  border-radius: 50em;
  width: 2.75rem;
  height: 2.75rem;
  text-align: center;
  transition: all .3s cubic-bezier(.25,.45,.45,.95);

  &:disabled {
    cursor: default;
    border-color: #f5f5f5;
    color: #9e9e9e;
  }

  &:not(:disabled):hover {
    border-color: #9e9e9e;
  }

  & > i.material-icons {
    line-height: 24px;
    vertical-align: middle;
  }
`;

const selectedButton = css`
  background-color: #ff758c;
  border-color: none;
  color: #fff;
`;

const disabledButton = css`
  cursor: default;
`;

const pageNumberContainer = css`
  display: inline-block;
`;

export class EpisodePages extends Component {

  get allowNext() {
    const { currentElement, linkList } = this.props;

    return currentElement >= linkList.length;
  }

  get allowPrev() {
    const { currentElement } = this.props;

    return currentElement < 2;
  }

  get linkList() {
    const { linkList = [] } = this.props;
    const { currentElement } = this.props;
    const { chunkSize = 10 } = this.props;
    const chunkBoundary = Math.floor(chunkSize / 2) + 1;

    if (linkList.length <= chunkSize || currentElement < chunkBoundary) {
      return linkList.slice(0, chunkSize).map((el, i) => [i, el]);
    }

    const startIndex = Math.max(0, currentElement - chunkBoundary);
    const endIndex = Math.min(currentElement + 4, linkList.length);
    const slicedList = linkList.slice(startIndex, endIndex);

    if (slicedList.length === chunkSize) {
      return slicedList.map((el, i) => [i + (currentElement - chunkBoundary), el]);
    }

    const fillCount = chunkSize - slicedList.length;
    const rest = linkList.slice(linkList.length - slicedList.length - fillCount, linkList.length - slicedList.length);

    return [...rest, ...slicedList].map((el, i) => [linkList.length - (chunkSize - i), el]);
  }

  render() {
    const { currentElement } = this.props;
    const { linkList: fullLinkList } = this.props;
    const { linkList } = this;

    if (linkList.length < 2) {
      return null;
    }

    const backLink = fullLinkList[Math.max(0, currentElement - 2)];
    const forwardLink = fullLinkList[Math.min(fullLinkList.length - 1, currentElement)];

    const { className } = this.props;

    return (
      <div className={cx(container, className)}>
        <Link
          className={cx(buttonContainer, { [disabledButton]: this.allowNext })}
          to={backLink}
        >
          <button
            className={button}
            disabled={this.allowPrev}
            type="button"
          >
            <i className="material-icons">
              keyboard_arrow_left
            </i>
          </button>
        </Link>
        <div className={pageNumberContainer}>
          {
            linkList.map(([i, url]) => (
              <Link
                className={buttonContainer}
                key={url}
                to={url}
              >
                <button
                  className={cx(button, { [selectedButton]: currentElement === i + 1 })}
                  type="button"
                >
                  {i + 1}
                </button>
              </Link>))
          }
        </div>
        <Link
          className={cx(buttonContainer, { [disabledButton]: this.allowNext })}
          to={forwardLink}
        >
          <button
            className={button}
            disabled={this.allowNext}
            type="button"
          >
            <i className="material-icons">
              keyboard_arrow_right
            </i>
          </button>
        </Link>
      </div>
    );
  }

}
