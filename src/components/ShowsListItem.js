import PropTypes from 'prop-types';
import classNames from 'classnames/dedupe';
import React, { Component } from 'react';
import ShowsListItemDetails from './ShowsListItemData';

export const ShowProp = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
});

export default class ShowsListItem extends Component {

  constructor(...args) {
    super(...args);

    this.state = {
      selected: false,
    };

    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick() {
    const { selected } = this.state;

    this.setState({ selected: !selected });
  }

  getClassList() {
    const { selected } = this.state;

    const staticClasses = [
      'show-link-container', 'collection-item',
    ];
    const dynamicClasses = {
      selected,
    };

    return classNames(staticClasses, dynamicClasses);
  }

  render() {
    const { show } = this.props;
    const { selected } = this.state;
    return (
      <li
        className={this.getClassList()}
      >
        <a
          className="show-link"
          href={`#show:${show._id}`}
          onClick={this.handleItemClick}
        >
          {show.title}
        </a>
        {selected && <ShowsListItemDetails showId={show._id} />}
      </li>
    );
  }

}

ShowsListItem.propTypes = {
  show: ShowProp.isRequired,
};
