import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { css, cx } from 'emotion';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';

import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import Option from 'muicss/lib/react/option';
import Select from 'muicss/lib/react/select';
import Button from 'muicss/lib/react/button';

const container = css`
  postition: relative;
  display: grid;
  min-width: 400px;
  grid-row-gap: 1em;
`;

const modalHeader = css`
  font-size: 1.63em !important;
  font-weight: 300;
  color: #212121;
`;

const submitButton = css`
  justify-self: center;
  border-radius: 6px;
  background-color: #ff758c;
  font-size: 1em;
  padding: .3em 1.8em;
  box-sizing: content-box;

  &:hover {
    background-color: #ff6680;
  }
`;

const selectInput = css`
  padding: 0 .5em;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 0;

  & > select {
    color: #ff758c;
  }

  &:focus > select {
    border-color: #ff758c;
  }
`;

const selectLabel = css`
  line-height: 1.1em;
  vertical-align: middle;
`;

const inputStyle = css`
  & > input:focus {
    border-color: #ff758c;

    & ~ label {
      color: #ff758c;
    }
  }
`;

const seasonEpisodeContainer = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const selectContainer = css`
  display: grid;
  align-items: baseline;
  justify-items: center;
  grid-auto-flow: column;
  grid-template-columns: fit-content(0) auto;
`;

const descriptionStyle = css`
  & > textarea:focus {
    border-color: #ff758c;

    & ~ label {
      color: #ff758c;
    }
  }
`;

const cancelButton = css`
  position: absolute;
  top: .3em;
  right: .63em;
  width: 3.141592em;
  height: 3.141592em;
  line-height: 3.3em;
`;

const cancelButtonIcon = css`
  line-height: inherit;
`;

export class AddEpisode extends Component {

  @observable
  componentState = {
    title: '',
    description: '',
    season: 1,
    episode: 1,
    seasons: [...Array(8).keys()].map((i) => i + 1),
    episodes: [...Array(40).keys()].map((i) => i + 1),
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
  handleInputChange(inputName) {
    return action((evt) => {
      const { value } = evt.target;
      this.componentState[inputName] = value;
    });
  }

  @action.bound
  handleAddEpisode(evt) {
    const { onAdd } = this.props;
    const { isLoading } = this.props;

    if (isLoading) {
      return null;
    }

    return onAdd(evt, this.componentState);
  }

  @observer
  render() {
    const {
      title, description, episode, season,
    } = this.componentState;

    const {
      episodes, seasons,
    } = this.componentState;

    const { onClose } = this.props;
    const { isLoading } = this.props;

    return (
      <div>
        <Form
          className={container}
          onSubmit={this.handleAddEpisode}
        >
          <legend className={modalHeader}>
            Add new episode
          </legend>
          <Input
            className={inputStyle}
            disabled={isLoading}
            floatingLabel
            label="Episode title"
            onChange={this.handleInputChange('title')}
            required
            value={title}
          />
          <div className={seasonEpisodeContainer}>
            <div className={selectContainer}>
              <span className={selectLabel}>
                Season:
              </span>
              <Select
                className={selectInput}
                defaultValue={season}
                disabled={isLoading}
                onChange={this.handleInputChange('season')}
                required
              >
                {
                  seasons
                    .map((i) => (
                      <Option
                        key={i}
                        label={i}
                        value={i}
                      />
                    ))
                }
              </Select>
            </div>
            <div className={selectContainer}>
              <span className={selectLabel}>
                Episode:
              </span>
              <Select
                className={selectInput}
                defaultValue={episode}
                disabled={isLoading}
                onChange={this.handleInputChange('episode')}
                required
              >
                {
                  episodes
                    .map((i) => (
                      <Option
                        key={i}
                        label={i}
                        value={i}
                      />
                    ))
                }
              </Select>
            </div>
          </div>
          <Textarea
            className={descriptionStyle}
            disabled={isLoading}
            floatingLabel
            label="Episode description"
            onChange={this.handleInputChange('description')}
            value={description}
          />
          <Button
            className={submitButton}
            color="accent"
            disabled={isLoading}
          >
            {
              isLoading ?
                'Adding episode...' :
                'Add new episode'
            }
          </Button>
        </Form>
        <Link
          onClick={onClose}
          to="/"
        >
          <Button
            className={cancelButton}
            variant="fab"
          >
            <i className={cx('material-icons', cancelButtonIcon)}>
              close
            </i>
          </Button>
        </Link>
      </div>
    );
  }

}
