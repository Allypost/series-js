import React, { Component } from 'react';
import { css } from 'emotion';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';

const modalHeader = css`
  font-size: 2.4em;
  text-align: center;
  margin-top: 0;
  color: #ff758c;
`;

const container = css`
  position: fixed;
  z-index: 9999;
  top: 20vh;
  left: 50%;
  width: 50%;
  margin-left: -25%;
  padding: 2em;
  border: 1px solid #e0e0e0;
  border-radius: .5em;
  background-color: #ffffff;
  box-shadow: 0 24px 38px 3px rgba(0, 0, 0, .14), 0 9px 46px 8px rgba(0, 0, 0, .12), 0 11px 15px -7px rgba(0, 0, 0, .2);
`;

const inputHeader = css`
  margin-bottom: 0;

  &:first-child {
    margin-top: 0;
  }
`;

const input = css`
  border: none;
  outline: none;
  color: #ff758c;
  background-color: transparent;
  border-bottom: 2px solid #ff758c;
  font-kerning: normal;
  font-size: 1em;
`;

const titleStyle = css`
  ${input}
  font-size: 1.5em;
`;

const descriptionStyle = css`
  ${input}
  width: 31.7vw;
  height: 4.5em;
  resize: none;
`;

const numbersStyle = css`
  ${input}
  width: 2.5em;
`;

const actionsContainer = css`
  margin-top: 2em;
`;

const button = css`
  border: 1px solid #e0e0e0;
  background: #ffffff;
  font-size: 1.2em;
  padding: .8em 1.4em .7em;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, .15);
`;

const submitButton = css`
  ${button}
  color: #2e7d32;
`;

const cancelButton = css`
  ${button}
  color: #ff6f00;
`;

export class AddEpisode extends Component {

  @observable
  componentState = {
    title: '',
    description: '',
    season: 1,
    episode: 1,
  }

  get containerClass() {
    const { show } = this.props;

    if (!show) {
      return css`
        ${container}
        display: none;
      `;
    }

    return container;
  }

  @action.bound
  handleTitleChange(evt) {
    this.componentState.title = evt.target.value;
  }

  @action.bound
  handleDescriptionChange(evt) {
    this.componentState.description = evt.target.value;
  }

  @action.bound
  handleEpisodeChange(evt) {
    this.componentState.episode = evt.target.value;
  }

  @action.bound
  handleSeasonChange(evt) {
    this.componentState.season = evt.target.value;
  }

  @action.bound
  handleAddEpisode(evt) {
    const { onAdd } = this.props;

    return onAdd(evt, this.componentState);
  }

  @observer
  render() {
    const {
      title, description, episode, season,
    } = this.componentState;

    const { onClose } = this.props;

    return (
      <div className={this.containerClass}>
        <form
          action="#"
          method="POST"
        >
          <h1 className={modalHeader}>
            Add episode
          </h1>
          <h1 className={inputHeader}>
            Title
          </h1>
          <div>
            <input
              className={titleStyle}
              onChange={this.handleTitleChange}
              required
              type="text"
              value={title}
            />
          </div>
          <h1 className={inputHeader}>
            Description
          </h1>
          <div>
            <textarea
              className={descriptionStyle}
              onChange={this.handleDescriptionChange}
              required
              value={description}
            />
          </div>
          <h1 className={inputHeader}>
            Season and Episode
          </h1>
          <div>
            <span>
              S
            </span>
            <input
              className={numbersStyle}
              onChange={this.handleSeasonChange}
              required
              type="number"
              value={season}
            />
            <span>
              Ep
            </span>
            <input
              className={numbersStyle}
              onChange={this.handleEpisodeChange}
              required
              type="number"
              value={episode}
            />
          </div>
          <div className={actionsContainer}>
            <button
              className={submitButton}
              onClick={this.handleAddEpisode}
              type="button"
            >
              Save
            </button>
            <button
              className={cancelButton}
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

}