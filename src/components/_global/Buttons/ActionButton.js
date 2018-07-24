import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { css } from 'emotion';
import PropTypes from 'prop-types';

import { containerStyle as defaultContainerStyle, iconStyle as defaultIconStyle } from './ActionButtonStyles';

import { LikeButtonImage } from './LikeButtonImage';

export const containerStyle = css`
  & {
    ${defaultContainerStyle}
    padding: .5em 1em !important;
  }
`;

export const containerActions = css`
  & {
    transition: border .15s ease-out, color .15s ease-out, fill .15s ease-out, background-color .5s cubic-bezier(.25, .45, .45, .95);
  }

  &:hover {
    border-color: #2e7d32;
    color: #2e7d32;
    fill: #2e7d32;
  }

  &:active {
    background-color: #e8f5e9;
    border-color: #1b5e20;
    fill: #1b5e20;
    color: #1b5e20;
    transition: background-color .05s;
  }
`;

export const textStyle = css`
  grid-row: 1;
  margin-left: .6em;
  font-size: 1.2em;
  font-weight: 100;
  color: #2e7d32;
  float: right;
`;

export const iconStyle = css`
  ${defaultIconStyle}
  display: inline-block;
  height: 1.3em;
  width: 1.2em;
  background-color: transparent;
  padding: 0 .1em;
`;

@inject('state')
@observer
export class ActionButton extends Component {

  get containerClass() {
    const { loading: isLoading } = this.props;
    const { disabled: isDisabled } = this.props;
    const { classes } = this.props;

    if (isLoading) {
      return css`
        ${classes.container}
        cursor: wait !important;
        background: rgba(0, 0, 0, .1);
      `;
    }

    if (isDisabled) {
      return css`
        ${classes.container}
        cursor: default !important;
      `;
    }

    return css`
      ${classes.container}
      ${classes.containerActions}
    `;
  }

  render() {
    const { likesCount } = this.props;
    const { onClick } = this.props;
    const { classes } = this.props;

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
      <div
        className={this.containerClass}
        onClick={onClick}
      >
        <span className={classes.icon}>
          <LikeButtonImage alt="Like" />
        </span>
        {
          likesCount >= 0 &&
          (
            <span className={classes.text}>
              {likesCount || 0}
            </span>
          )
        }
      </div>
    );
  }

}

ActionButton.propTypes = {
  classes: PropTypes.shape({
    icon: PropTypes.string,
    text: PropTypes.string,
    container: PropTypes.string,
    containerActions: PropTypes.string,
  }),
  disabled: PropTypes.bool,
  likesCount: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

ActionButton.defaultProps = {
  classes: {
    icon: iconStyle,
    text: textStyle,
    container: containerStyle,
    containerActions,
  },
  disabled: false,
  loading: false,
};
