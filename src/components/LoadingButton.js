import PropTypes from 'prop-types';
import classNames from 'classnames/dedupe';
import React, { Component } from 'react';

export const LoadingButtonProp = {
  dataName: PropTypes.string,
  hasData: PropTypes.bool,
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
    const { isLoading, hasData, dataName = 'data' } = this.props;

    if (isLoading) {
      return 'Loading...';
    }

    if (hasData) {
      return `Re-Load ${dataName}`;
    }

    return `Load ${dataName}`;
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
  dataName: 'data',
  hasData: true,
  onClick() { },
};
