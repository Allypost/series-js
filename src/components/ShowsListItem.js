import PropTypes from 'prop-types';
import React, { Component } from 'react';

export const ShowProp = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
});

export default class ShowsListItem extends Component {

  constructor(...args) {
    super(...args);

    this.state = {
      selected: false,
      showData: {},
    };

    this.handleItemClick = this.handleItemClick.bind(this);
  }

  async componentDidMount() {
    const details = await this.fetchDetails();

    // I'm really sorry about this one too
    // eslint-disable-next-line react/no-set-state,react/no-did-mount-set-state
    this.setState({ showData: details });
  }

  async fetchDetails() {
    const { show } = this.props;
    const id = show._id;

    const fetcher =
      (url) => fetch(url)
        .then((resp) => resp.json())
        .then((resp) => resp.data);

    try {
      return await fetcher(`https://api.infinum.academy/api/shows/${id}`);
    } catch (e) {
      return {};
    }
  }

  handleItemClick() {
    const { selected } = this.state;

    // :(
    // eslint-disable-next-line react/no-set-state
    this.setState({ selected: !selected });
  }

  getClassList() {
    const { selected } = this.state;
    const classList = { selected };

    return Object.entries(classList)
      .filter(([, display]) => display)
      .map(([className]) => className);
  }

  render() {
    const { show } = this.props;
    const { showData } = this.state;
    return (
      <li
        className={this.getClassList().join(' ')}
        title={showData.description}
      >
        <a
          href={`#show:${show._id}`}
          onClick={this.handleItemClick}
        >
          {show.title}
        </a>
      </li>
    );
  }

}

ShowsListItem.propTypes = {
  show: ShowProp.isRequired,
};
