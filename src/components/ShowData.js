import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Util from '../helpers/Util';

export class ShowData extends Component {

  renderData() {
    const { showData } = this.props;
    const defaultData = {
      title: 'No show here...',
      description: 'The ID provided matches no show in our records.',
    };
    const show = Object.assign(defaultData, showData);

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
  renderLoading() {
    return (
      <div>
        <h1>
          Loading show...
        </h1>
        {Util.spinnerComponent()}
      </div>
    );
  }

  render() {
    const { isLoading } = this.props;

    return (
      <div className="col s12 l6">
        {
          isLoading ? this.renderLoading() : this.renderData()
        }
      </div>
    );
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
