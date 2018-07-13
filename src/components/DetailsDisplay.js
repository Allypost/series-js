import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Util from '../helpers/Util';

export class DetailsDisplay extends Component {

  _renderData() {
    const { data } = this.props;
    const defaultData = {
      title: 'No show here...',
      description: 'The ID provided matches no show in our records.',
    };
    const show = Object.assign(defaultData, data);

    return (
      <div>
        <h1>
          {show.title}
        </h1>
        <h5>
          {show.description || 'No description...'}
        </h5>
      </div>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  _renderLoading() {
    return (
      <div>
        <h1>
          Loading description...
        </h1>
        {Util.spinnerComponent()}
      </div>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  _renderErrors() {
    return (
      <div>
        <h1>
          Error loading description. Trying again...
        </h1>
        {Util.spinnerComponent()}
      </div>
    );
  }

  _render() {
    const { hasErrors, isLoading } = this.props;

    if (hasErrors) {
      return this._renderErrors();
    }

    if (isLoading) {
      return this._renderLoading();
    }

    return this._renderData();
  }

  render() {
    return (
      <div className="col s12 l6">
        {this._render()}
      </div>
    );
  }

}


DetailsDisplay.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    type: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  hasErrors: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
};

DetailsDisplay.defaultProps = {
  data: {},
  hasErrors: false,
};
