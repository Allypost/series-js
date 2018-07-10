import PropTypes from 'prop-types';
import classNames from 'classnames/dedupe';
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

    const staticClasses = [
      'btn-large', 'purple', 'darken-3', 'waves', 'waves-light', 'load-button',
    ];
    const dynamicClasses = {
      'is-loading': isLoading,
      pulse: isLoading,
    };

    return classNames(staticClasses, dynamicClasses);
  }

  render() {
    return (
      <button
        className={this.getClasses()}
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
