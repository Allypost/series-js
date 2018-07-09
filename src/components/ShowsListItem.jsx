import PropTypes from 'prop-types';
import React, { Component } from 'react';

export const ShowProp = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
});

export default class ShowsListItem extends Component {

  render() {
    const { show } = this.props;
    return (
      <li>
        {show.title}
      </li>
    );
  }

}

ShowsListItem.propTypes = {
  show: ShowProp.isRequired,
};
