import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Util from '../helpers/Util';

export class ShowData extends Component {

  renderData() {
    const { showData } = this.props;

    if (!showData.title) {
      return (
        <div className="showData">
          <h1>
            No show here...
          </h1>
          <h4>
            The ID you provided matches no show in our records.
          </h4>
        </div>
      );
    }

    return (
      <div className="showData">
        <h1>
          {showData.title}
        </h1>
        <h4>
          {showData.description}
        </h4>
      </div>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderLoading() {
    return (
      <div className="showData">
        <h1>
          Loading show...
        </h1>
        {Util.spinnerComponent()}
      </div>
    );
  }

  render() {
    const { isLoading } = this.props;

    if (isLoading) {
      return this.renderLoading();
    }

    return this.renderData();
  }

}


ShowData.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  showData: PropTypes.shape({
    _id: PropTypes.string,
    type: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};

ShowData.defaultProps = {
  showData: {},
};
