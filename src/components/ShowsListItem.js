import PropTypes from 'prop-types';
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

    // :(
    // eslint-disable-next-line react/no-set-state
    this.setState({ selected: !selected });
  }

  getClassList() {
    const { selected } = this.state;
    const classList = {
      'show-link-container': true,
      selected,
    };

    return Object.entries(classList)
      .filter(([, display]) => display)
      .map(([className]) => className);
  }

  render() {
    const { show } = this.props;
    const { selected } = this.state;
    return (
      <li
        className={this.getClassList().join(' ')}
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
