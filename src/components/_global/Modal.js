import React, { Component } from 'react';
import { css, cx } from 'emotion';
import { action } from 'mobx';

const container = css`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  z-index: 9999;
  justify-content: center;
  padding: .8em;
  background-color: rgba(0, 0, 0, .7);
  overflow: auto;
`;

const content = css`
  position: relative;
  align-self: center;
  padding: 1.5em;
  border-radius: 4px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 24px 38px 3px rgba(0, 0, 0, .14), 0 9px 46px 8px rgba(0, 0, 0, .12), 0 11px 15px -7px rgba(0, 0, 0, .2);
`;

export class Modal extends Component {

  @action.bound
  handleClick(evt) {
    if (evt.currentTarget !== evt.target) {
      return;
    }

    const { onClose } = this.props;

    onClose(evt);
  }

  render() {
    const { children } = this.props;
    const { className } = this.props;

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
      <div
        className={cx(container, className)}
        onClick={this.handleClick}
      >
        <div className={content}>
          {children}
        </div>
      </div>
    );
  }

}
