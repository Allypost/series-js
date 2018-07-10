import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ShowsListItem, { ShowProp } from './ShowsListItem.js';

export const ShowsProp = PropTypes.arrayOf(ShowProp);

export default class ShowsList extends Component {

  static renderItem(entry) {
    return (
      <ShowsListItem
        key={entry._id}
        show={entry}
      />
    );
  }

  renderItems(entries = []) {
    return entries.map((entry) => this.constructor.renderItem(entry));
  }

  render() {
    const { shows } = this.props;
    return (
      <ul className="shows-container collection">
        {this.renderItems(shows)}
      </ul>
    );
  }

}

ShowsList.propTypes = {
  shows: ShowsProp.isRequired,
};