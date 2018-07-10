import PropTypes from 'prop-types';
import React, { Component } from 'react';

export const LoadingButtonProp = {
  isLoading: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

export default class LoadingButton extends Component {

  constructor(...args) {
    super(...args);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(...args) {
    const { onClick } = this.props;

    const fn = onClick || (() => { });

    fn.apply(this, args);
  }

  displayText() {
    const { isLoading } = this.props;

    if (isLoading) {
      return 'Loading...';
    }

    return 'Load data';
  }

  getClasses() {
    const { isLoading } = this.props;

    const classList = {
      'btn-large': true,
      'purple darken-3': true,
      'waves waves-light': true,
      'load-button': true,
      'is-loading': isLoading,
      pulse: isLoading,
    };

    return Object.entries(classList)
      .filter(([_k, v]) => v)
      .map(([k, _v]) => k);
  }

  render() {
    return (
      <button
        className={this.getClasses().join(' ')}
        onClick={this.handleClick}
        type="button"
      >
        {this.displayText()}
      </button>
    );
  }

}

LoadingButton.propTypes = LoadingButtonProp;
LoadingButton.defaultProps = {
  onClick() { },
};
